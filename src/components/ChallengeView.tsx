import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Challenge, PracticeProject, CertificationProject } from '@/types/challenge';
import { CodeEditor } from './CodeEditor';
import { TestPanel } from './TestPanel';
import { Terminal } from './Terminal';
import { StepGrid } from './StepGrid';
import { ProjectPreviewModal } from './ProjectPreviewModal';
import { runTests } from '@/lib/test-runner';
import { markChallengeComplete, updateChallengeAttempt, loadProgress, addTerminalCommand, markStepComplete, resetChallengeProgress, saveChallengeCode, getTerminalCommandsForStep, isStepAccessible, markPreviewSeen, hasPreviewBeenSeen } from '@/lib/progress';
import { validateStep } from '@/lib/step-validator';
import { TestResult } from '@/lib/test-runner';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle2, X, RotateCcw, Lightbulb, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getMarkdownComponentsWithLink } from '@/lib/markdown-components';

interface ChallengeViewProps {
  challenge: Challenge;
  section: { id: number; title: string };
  initialStep?: number;
}

// Type guards
function isPracticeProject(challenge: Challenge): challenge is PracticeProject {
  return challenge.type === 'practice';
}

function isCertificationProject(challenge: Challenge): challenge is CertificationProject {
  return challenge.type === 'certification';
}

export function ChallengeView({ challenge, initialStep }: ChallengeViewProps) {
  const navigate = useNavigate();
  
  // Convert step number (1-based) to array index (0-based)
  // Also validates that the step is accessible (not locked)
  const getStepIndex = (stepNumber: number | undefined): number => {
    if (stepNumber === undefined) return 0;
    if (isPracticeProject(challenge)) {
      const index = challenge.steps.findIndex(s => s.step === stepNumber);
      if (index < 0) return 0; // Step doesn't exist
      
      // Check if step is accessible (all previous steps completed)
      const progress = loadProgress();
      const challengeProgress = progress.challengeProgress[challenge.id];
      const completedSteps = challengeProgress?.completedSteps || [];
      
      if (!isStepAccessible(challenge, index, completedSteps)) {
        // Step is locked - return first step instead
        return 0;
      }
      
      return index;
    }
    return 0;
  };
  
  // Get starter code based on step number (1-based) and challenge
  const getStarterCode = (stepNumber: number) => {
    if (isPracticeProject(challenge)) {
      const step = challenge.steps.find(s => s.step === stepNumber);
      // Use starterCode from step data if available (data-driven, like FCC's --seed--)
      if (step?.starterCode) {
        return step.starterCode;
      }
    }
    // Default: empty starter code
    return '// Write your code here\n// Follow the steps in the instructions panel';
  };
  
  const initialStepIndex = getStepIndex(initialStep);
  const [code, setCode] = useState(getStarterCode(isPracticeProject(challenge) ? challenge.steps[initialStepIndex]?.step || 0 : 0));
  const [currentStep, setCurrentStep] = useState(initialStepIndex);
  const [testResults, setTestResults] = useState<TestResult[] | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isTestSidebarOpen, setIsTestSidebarOpen] = useState(false);
  const [terminalHeight, setTerminalHeight] = useState(300); // Default expanded height
  const [isTerminalCollapsed, setIsTerminalCollapsed] = useState(true); // Closed by default
  const [messageBoxWidth, setMessageBoxWidth] = useState(400); // Default message box width
  const [terminalCommands, setTerminalCommands] = useState<string[]>([]);
  const [testAbortController, setTestAbortController] = useState<AbortController | null>(null);
  const [canFocusEditor, setCanFocusEditor] = useState(true);
  
  // Debounced code save
  const codeSaveTimeoutRef = useRef<number | null>(null);
  // Debounced validation
  const validationTimeoutRef = useRef<number | null>(null);
  // Track previous step/challenge for immediate validation
  const prevStepRef = useRef<number>(initialStepIndex);
  const prevChallengeRef = useRef<string>(challenge.id);
  const [stepValidation, setStepValidation] = useState<{ completed: boolean; message?: string; hints?: string[] } | null>(null);
  const [showStepGrid, setShowStepGrid] = useState(false);
  const [progress, setProgress] = useState(() => loadProgress());
  const [hintLevels, setHintLevels] = useState<Record<number, number>>({}); // Track hint visibility per step
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isMessageBoxVisible, setIsMessageBoxVisible] = useState(true);
  const codeBlockScrollRefs = useRef<Map<string, number>>(new Map());

  // Step key for memoizing markdown components (must be at top level for useMemo)
  const stepKey =
    isPracticeProject(challenge) && challenge.steps[currentStep]
      ? `${challenge.id}-step-${challenge.steps[currentStep].step}`
      : '';

  const markdownComponentsForStep = useMemo(() => {
    const scrollAwareCode = (props: { className?: string; children?: React.ReactNode }) => {
      const { className, children, ...rest } = props;
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      const inline = !className || !match;
      if (inline || !language) {
        return (
          <code
            className="inline font-mono bg-metal-800/50 text-foreground px-1 py-0.5 rounded-sm text-sm border border-metal-700/50"
            style={{ display: 'inline' }}
            {...rest}
          >
            {children}
          </code>
        );
      }
      const codeContent = String(children).replace(/\n$/, '');
      const codeBlockKey = `${stepKey}-code-${codeContent.substring(0, 50).replace(/\s/g, '-')}`;
      return (
        <div
          key={codeBlockKey}
          className="bg-metal-900 border border-metal-700 rounded-lg p-4 my-4 min-w-0"
          style={{ overflowX: 'auto', overflowY: 'visible', overscrollBehaviorX: 'contain' }}
          onScroll={(e) => {
            codeBlockScrollRefs.current.set(codeBlockKey, e.currentTarget.scrollLeft);
          }}
          onWheel={(e) => {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) e.stopPropagation();
          }}
          ref={(el) => {
            if (el) {
              const saved = codeBlockScrollRefs.current.get(codeBlockKey);
              if (saved !== undefined) requestAnimationFrame(() => { el.scrollLeft = saved; });
            }
          }}
        >
          <div style={{ minWidth: 'max-content', width: '100%' }}>
            <SyntaxHighlighter
              key={codeBlockKey}
              language={language}
              style={oneDark as Record<string, React.CSSProperties>}
              PreTag="div"
              customStyle={{ margin: 0, padding: 0, minWidth: 'max-content', overflow: 'visible' }}
            >
              {codeContent}
            </SyntaxHighlighter>
          </div>
        </div>
      );
    };
    const base = getMarkdownComponentsWithLink({ code: scrollAwareCode });
    // Slightly different p class for step content
    base.p = ({ children }: { children?: React.ReactNode }) => <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>;
    return base;
  }, [stepKey]);

  // Reload progress when needed
  const reloadProgress = useCallback(() => {
    setProgress(loadProgress());
  }, []);
  
  // Use ref to track if we've loaded the initial code for this challenge
  const loadedChallengeIdRef = useRef<string | null>(null);
  
  // Ref to prevent saving when loading code from storage
  const isLoadingCodeRef = useRef(false);
  
  // Track the last step we loaded code for to prevent unnecessary reloads
  const lastLoadedStepRef = useRef<number>(-1);
  
  // Ref for instructions panel to scroll to top on step change
  const instructionsPanelRef = useRef<HTMLDivElement>(null);

  // Handle terminal resize (vertical)
  const handleTerminalResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    
    const startY = e.clientY;
    const startHeight = terminalHeight;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaY = startY - moveEvent.clientY; // Inverted: dragging up increases height
      const newHeight = Math.max(150, Math.min(600, startHeight + deltaY));
      setTerminalHeight(newHeight);
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';
  }, [terminalHeight]);

  // Handle message box resize (horizontal split with terminal)
  const handleMessageBoxResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const startX = e.clientX;
    const startWidth = messageBoxWidth;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const newWidth = Math.max(250, Math.min(600, startWidth - deltaX));
      setMessageBoxWidth(newWidth);
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, [messageBoxWidth]);

  // Toggle terminal (expand/collapse)
  const toggleTerminal = useCallback(() => {
    setIsTerminalCollapsed((prev) => !prev);
  }, []);

  useEffect(() => {
    // Load saved code when challenge changes
    if (loadedChallengeIdRef.current !== challenge.id) {
      isLoadingCodeRef.current = true;
      const currentStepNum = isPracticeProject(challenge) ? challenge.steps[currentStep]?.step : undefined;
      lastLoadedStepRef.current = currentStepNum || -1;
      
      const saved = progress.challengeProgress[challenge.id]?.code;
      if (saved) {
        setCode(saved);
      } else {
        // Reset to starter code for current step if no saved code
        setCode(getStarterCode(isPracticeProject(challenge) ? challenge.steps[currentStep]?.step || 0 : 0));
      }
      
      // Load terminal commands for current step
      if (currentStepNum) {
        const savedCommands = getTerminalCommandsForStep(challenge.id, currentStepNum);
        setTerminalCommands(savedCommands);
      } else {
        setTerminalCommands([]);
      }
      
      // Reset terminal to collapsed state when switching challenges
      setIsTerminalCollapsed(true);
      setTerminalHeight(300); // Reset to default expanded height
      
      loadedChallengeIdRef.current = challenge.id;
      // Reset flag after a brief delay to allow state to update
      setTimeout(() => {
        isLoadingCodeRef.current = false;
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional: avoid reload on progress save
  }, [challenge.id, currentStep]);

  // Always load saved code when step changes (preserves code across step navigation)
  // Only reload when step or challenge actually changes, NOT when progress updates from saves
  useEffect(() => {
    if (isPracticeProject(challenge)) {
      const stepNum = challenge.steps[currentStep]?.step;
      
      // Only reload if step actually changed or challenge changed
      // Don't reload just because progress.challengeProgress was updated (from a save)
      if (lastLoadedStepRef.current === stepNum && loadedChallengeIdRef.current === challenge.id) {
        return; // Same step, same challenge - don't reload
      }
      
      isLoadingCodeRef.current = true;
      lastLoadedStepRef.current = stepNum || -1;
      loadedChallengeIdRef.current = challenge.id; // Track that we've loaded for this challenge
      
      const saved = progress.challengeProgress[challenge.id]?.code;
      if (saved) {
        // Always use saved code if it exists
        setCode(saved);
      } else {
        // Only set starter code if no saved code exists
        setCode(getStarterCode(stepNum || 0));
      }
      
      // Load terminal commands for the new step
      if (stepNum) {
        const savedCommands = getTerminalCommandsForStep(challenge.id, stepNum);
        setTerminalCommands(savedCommands);
      } else {
        setTerminalCommands([]);
      }
      // Reset flag after a brief delay
      setTimeout(() => {
        isLoadingCodeRef.current = false;
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional: minimal deps to avoid reload on save
  }, [currentStep, challenge.id]);

  // Auto-save code with debouncing
  useEffect(() => {
    // Don't save if we're currently loading code from storage
    if (isLoadingCodeRef.current) {
      return;
    }
    
    // Clear existing timeout
    if (codeSaveTimeoutRef.current) {
      clearTimeout(codeSaveTimeoutRef.current);
    }
    
    // Don't save if it's just the starter code or empty
    if (code && 
        code !== '// Write your code here\n// Follow the steps in the instructions panel' &&
        !code.includes('// Write your code here')) {
      // Debounce save by 500ms
      codeSaveTimeoutRef.current = setTimeout(() => {
        saveChallengeCode(challenge.id, code);
        // Reload progress to keep it in sync
        reloadProgress();
      }, 500);
    }
    
    return () => {
      if (codeSaveTimeoutRef.current) {
        clearTimeout(codeSaveTimeoutRef.current);
      }
    };
  }, [code, challenge.id, reloadProgress]);

  useEffect(() => {
    // Track time spent
    const startTime = Date.now();
    const interval = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Prevent Monaco content widgets from stealing mouse/touch events (FCC-style fix)
  useEffect(() => {
    const handleContentWidgetEvents = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('.editor-upper-jaw')) {
        e.stopPropagation();
      }
    };

    document.addEventListener('mousedown', handleContentWidgetEvents, true);
    document.addEventListener('contextmenu', handleContentWidgetEvents, true);
    document.addEventListener('touchstart', handleContentWidgetEvents, true);
    document.addEventListener('touchmove', handleContentWidgetEvents, true);
    document.addEventListener('touchend', handleContentWidgetEvents, true);

    return () => {
      document.removeEventListener('mousedown', handleContentWidgetEvents, true);
      document.removeEventListener('contextmenu', handleContentWidgetEvents, true);
      document.removeEventListener('touchstart', handleContentWidgetEvents, true);
      document.removeEventListener('touchmove', handleContentWidgetEvents, true);
      document.removeEventListener('touchend', handleContentWidgetEvents, true);
    };
  }, []);

  const handleRunTests = async () => {
    if (isCertificationProject(challenge)) {
      // Certification projects have tests
      // Cancel any in-flight test run before starting a new one
      if (testAbortController) {
        testAbortController.abort();
      }
      const controller = new AbortController();
      setTestAbortController(controller);
      setIsRunning(true);
      updateChallengeAttempt(challenge.id, code);
      try {
        const result = await runTests(code, challenge.tests, controller.signal);
        // Process results
        setTestResults(result.results);
        if (result.results.every((r) => r.passed)) {
          markChallengeComplete(challenge.id, code, timeSpent);
        }
      } catch (error) {
        // Swallow abort errors (user cancelled the run)
        if (error instanceof DOMException && error.name === 'AbortError') {
          // Do not overwrite existing results on cancellation
          return;
        }
        console.error('Test execution error:', error);
        setTestResults([
          {
            name: 'execution_error',
            passed: false,
            error: 'Failed to run tests. Please try again.',
          },
        ]);
      } finally {
        setIsRunning(false);
        setTestAbortController(null);
      }
      return;
    }

    // For practice projects, we'd test the current step
    // For now, just save the attempt
    updateChallengeAttempt(challenge.id, code);
  };

  const handleCancelTests = () => {
    if (testAbortController) {
      testAbortController.abort();
    }
  };

  const handleReset = () => {
    if (isPracticeProject(challenge) && challenge.steps[currentStep]) {
      setCode(getStarterCode(challenge.steps[currentStep].step));
    } else {
      setCode(getStarterCode(0));
    }
    setTestResults(null);
  };

  const handleResetProject = () => {
    // Temporarily disable editor interaction while the blocking confirm dialog is open
    setCanFocusEditor(false);
    const confirmed = window.confirm(
      `Are you sure you want to reset "${challenge.title}"?\n\nThis will:\n- Clear all your code\n- Reset all completed steps\n- Clear terminal command history\n- Remove completion status\n\nThis action cannot be undone.`
    );
    setCanFocusEditor(true);

    if (confirmed) {
      resetChallengeProgress(challenge.id);
      reloadProgress();
      
      // Reset local state
      setCode(getStarterCode(isPracticeProject(challenge) ? challenge.steps[0]?.step || 0 : 0));
      setCurrentStep(0);
      // Load terminal commands for step 0
      if (isPracticeProject(challenge) && challenge.steps[0]) {
        const stepNum = challenge.steps[0].step;
        const savedCommands = getTerminalCommandsForStep(challenge.id, stepNum);
        setTerminalCommands(savedCommands);
      } else {
        setTerminalCommands([]);
      }
      setTestResults(null);
      setStepValidation(null);
      setIsTerminalCollapsed(true);
      loadedChallengeIdRef.current = null; // Force reload on next effect
    }
  };


  // Validate current step whenever code or terminal commands change (with debouncing)
  useEffect(() => {
    // Clear existing timeout
    if (validationTimeoutRef.current) {
      clearTimeout(validationTimeoutRef.current);
    }
    
    const performValidation = () => {
      if (isPracticeProject(challenge) && challenge.steps[currentStep]) {
        const step = challenge.steps[currentStep];
        // Use terminal commands for this specific step
        const stepCommands = terminalCommands;
        const validation = validateStep(step, code, stepCommands, step.step, challenge.id);
        setStepValidation(validation);
        
        // Auto-mark step as complete if validation passes AND all previous steps are completed
        if (validation.completed) {
          const completedSteps = progress.challengeProgress[challenge.id]?.completedSteps || [];
          
          // Check if all previous steps are completed before marking this step complete
          if (isStepAccessible(challenge, currentStep, completedSteps)) {
            // All prerequisites met - can mark step complete
            if (!completedSteps.includes(step.step)) {
              markStepComplete(challenge.id, step.step);
              reloadProgress();
            }
          }
          // If prerequisites not met, don't mark complete (step is locked)
        }
      } else {
        setStepValidation(null);
      }
    };

    // Debounce validation for code/terminal command changes (300ms delay)
    // But run immediately for step/challenge changes
    if (currentStep !== prevStepRef.current || challenge.id !== prevChallengeRef.current) {
      // Step or challenge changed - validate immediately
      prevStepRef.current = currentStep;
      prevChallengeRef.current = challenge.id;
      performValidation();
    } else {
      // Code or terminal commands changed - debounce
      validationTimeoutRef.current = setTimeout(performValidation, 300);
    }

    return () => {
      if (validationTimeoutRef.current) {
        clearTimeout(validationTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reloadProgress is stable
  }, [code, terminalCommands, currentStep, challenge, progress.challengeProgress]);

  // Terminal is closed by default - user can open it when needed
  // We don't auto-open it anymore, even for steps that require terminal commands

  // Update URL when step changes
  useEffect(() => {
    if (isPracticeProject(challenge) && challenge.steps[currentStep]) {
      navigate({
        to: '/challenges/$challengeId',
        params: { challengeId: challenge.id },
        search: { step: challenge.steps[currentStep].step },
        replace: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only sync URL on step/id change
  }, [currentStep, challenge.id, navigate]);

  // Scroll instructions panel to top and show message box when step changes
  useEffect(() => {
    if (instructionsPanelRef.current) {
      instructionsPanelRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    // Show message box when step changes
    setIsMessageBoxVisible(true);
    // Clear code block scroll positions when step changes (they'll be restored per-block)
    // Don't clear all - let each block manage its own
  }, [currentStep]);

  // Check if preview should be shown on mount
  useEffect(() => {
    if (isPracticeProject(challenge) && challenge.preview) {
      const isFirstStep = currentStep === 0;
      const shouldShowPreview = 
        challenge.preview.mode === 'onLoad' && 
        isFirstStep && 
        !hasPreviewBeenSeen(challenge.id);
      
      if (shouldShowPreview) {
        setShowPreviewModal(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only run on challenge/step change
  }, [challenge.id, currentStep]);

  // Handle preview modal close - mark as seen when user closes it
  const handlePreviewClose = useCallback(() => {
    setShowPreviewModal(false);
    if (isPracticeProject(challenge) && challenge.preview) {
      markPreviewSeen(challenge.id);
      reloadProgress();
    }
  }, [challenge, reloadProgress]);

  // Handle submit step (Ctrl+Enter / Submit button) - FCC-style hint reveal
  const handleSubmitStep = useCallback(() => {
    if (isPracticeProject(challenge) && challenge.steps[currentStep]) {
      const step = challenge.steps[currentStep];
      
      if (stepValidation?.completed) {
        // Step is complete - advance to next step
        if (currentStep < challenge.steps.length - 1) {
          const nextStep = currentStep + 1;
          const completedSteps = progress.challengeProgress[challenge.id]?.completedSteps || [];
          if (isStepAccessible(challenge, nextStep, completedSteps)) {
            setCurrentStep(nextStep);
            setStepValidation(null);
            // Reset hint visibility for new step
            setHintLevels(prev => ({ ...prev, [step.step]: 0 }));
          }
        }
      } else {
        // Step is not complete - reveal hints (contextual to current failure)
        setHintLevels(prev => ({
          ...prev,
          [step.step]: 1, // Show hints for this step
        }));
      }
    }
  }, [challenge, currentStep, stepValidation, progress]);

  // Handle moving to next step (for Next button)
  const handleNextStep = useCallback(() => {
    if (isPracticeProject(challenge)) {
      if (currentStep < challenge.steps.length - 1 && stepValidation?.completed) {
        const nextStep = currentStep + 1;
        
        // Check if next step is accessible (all previous steps completed)
        const completedSteps = progress.challengeProgress[challenge.id]?.completedSteps || [];
        if (isStepAccessible(challenge, nextStep, completedSteps)) {
          setCurrentStep(nextStep);
          setStepValidation(null);
          // Reset hint visibility for new step
          const step = challenge.steps[currentStep];
          setHintLevels(prev => ({ ...prev, [step.step]: 0 }));
        }
      }
    }
  }, [challenge, currentStep, stepValidation, progress]);

  // Handle terminal command execution
  const handleTerminalCommand = (command: string) => {
    if (isPracticeProject(challenge) && challenge.steps[currentStep]) {
      const stepNumber = challenge.steps[currentStep].step;
      
      // Check if command already exists to avoid unnecessary updates
      if (!terminalCommands.includes(command)) {
        // Save to progress first (synchronous operation)
        addTerminalCommand(challenge.id, stepNumber, command);
        
        // Update state with the new command - this will trigger validation effect
        setTerminalCommands((prev) => {
          if (!prev.includes(command)) {
            return [...prev, command];
          }
          return prev;
        });
        
        // Reload progress after state update is queued
        // Use requestAnimationFrame to ensure state update is processed first
        requestAnimationFrame(() => {
          reloadProgress();
        });
      }
    }
  };


  return (
    <div className="fixed inset-0 top-16 flex flex-col bg-background overflow-hidden">
      {/* Step Grid Overlay */}
      {showStepGrid && isPracticeProject(challenge) && (
        <div className="fixed inset-0 top-16 bg-background z-50 flex flex-col">
          <div className="border-b border-metal-600 bg-metal-800/50 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground">{challenge.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {challenge.steps.length} steps • Click a step to jump to it
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowStepGrid(false)}
              className="hover:bg-metal-700"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-5xl mx-auto">
            <StepGrid
              challenge={challenge}
              currentStep={currentStep}
              progressKey={`${challenge.id}-${progress.challengeProgress[challenge.id]?.completedSteps?.join(',') || ''}`}
              onStepClick={(stepIndex) => {
                // Validate that step is accessible before navigating
                const completedSteps = progress.challengeProgress[challenge.id]?.completedSteps || [];
                if (isStepAccessible(challenge, stepIndex, completedSteps)) {
                  setCurrentStep(stepIndex);
                  setShowStepGrid(false);
                }
                // If step is locked, don't navigate (StepGrid button should be disabled anyway)
              }}
            />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Instructions Panel - Only scrollbar here */}
        <div className="w-full max-w-md border-r border-metal-600 bg-metal-800/50 lg:w-[400px] flex flex-col">
          {/* Instructions Panel Header */}
          <div className="border-b border-metal-600 bg-metal-800/70 px-4 py-3 flex items-center justify-between flex-shrink-0">
            <h2 className="text-sm font-semibold text-foreground truncate flex-1">
              {challenge.title}
            </h2>
            {isPracticeProject(challenge) && challenge.preview && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPreviewModal(true)}
                className="ml-2 h-8 px-2 text-muted-foreground hover:text-foreground flex-shrink-0"
                title="Preview Project"
              >
                <Eye className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetProject}
              className="ml-2 h-8 px-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
              title="Reset Project"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Instructions Panel Content */}
          <div 
            ref={instructionsPanelRef}
            className="flex-1 overflow-y-auto overflow-x-hidden"
          >
            <div className="p-6">

            {/* Practice Project: Show Steps */}
            {isPracticeProject(challenge) && (
              <>
                {/* Current Step Content - Clean instructions only */}
                {challenge.steps[currentStep] && (() => {
                  const step = challenge.steps[currentStep]!;
                  return (
                <div key={stepKey} className="mb-6 space-y-4">
                  {/* Step Header */}
                  <div>
                    <strong className="text-lg font-bold block mb-3">Step {step.step}: {step.title}</strong>
                  </div>

                  {/* Instruction - What to Do (FCC's --description--) */}
                  <div className="markdown-content">
                    <ReactMarkdown
                      key={`${stepKey}-instruction`}
                      remarkPlugins={[remarkGfm]}
                      components={markdownComponentsForStep}
                    >
                      {step.instruction}
                    </ReactMarkdown>

                    {/* Task as normal text at the end (FCC-style) */}
                    {step.task && (
                      <div className="mt-4 pt-4 border-t border-metal-700/30">
                        <ReactMarkdown
                          key={`${stepKey}-task`}
                          remarkPlugins={[remarkGfm]}
                          components={markdownComponentsForStep}
                        >
                          {step.task}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
                  );
                })()}

                {/* Step Navigation Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newStep = Math.max(0, currentStep - 1);
                      setCurrentStep(newStep);
                      setStepValidation(null);
                    }}
                    disabled={currentStep === 0}
                    className="flex-1"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newStep = Math.min(challenge.steps.length - 1, currentStep + 1);
                      
                      // Check if next step is accessible (all previous steps completed)
                      const completedSteps = progress.challengeProgress[challenge.id]?.completedSteps || [];
                      if (isStepAccessible(challenge, newStep, completedSteps)) {
                        setCurrentStep(newStep);
                        setStepValidation(null);
                      }
                    }}
                    disabled={
                      currentStep === challenge.steps.length - 1 || 
                      !stepValidation?.completed ||
                      (() => {
                        // Also disable if next step is locked
                        const nextStep = currentStep + 1;
                        if (nextStep >= challenge.steps.length) return true;
                        const completedSteps = progress.challengeProgress[challenge.id]?.completedSteps || [];
                        return !isStepAccessible(challenge, nextStep, completedSteps);
                      })()
                    }
                    className="flex-1"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </>
            )}

            {/* Certification Project: Show Requirements */}
            {isCertificationProject(challenge) && (
              <div className="space-y-4">
                <div className="font-sans text-base font-semibold text-foreground leading-relaxed markdown-content">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
                      code: (props) => {
                        const { className, children, ...rest } = props;
                        const match = /language-(\w+)/.exec(className || '');
                        const language = match ? match[1] : '';
                        const inline = !className || !match;
                        
                        if (inline || !language) {
                          return (
                            <code className="inline font-mono bg-metal-700 text-accent px-1.5 py-0.5 rounded text-sm font-semibold border border-metal-600" {...rest}>
                              {children}
                            </code>
                          );
                        }
                        
                        return (
                          <div 
                            className="bg-metal-900 border border-metal-700 rounded-lg p-4 my-4 min-w-0"
                            style={{ 
                              overflowX: 'auto',
                              overflowY: 'visible',
                              overscrollBehaviorX: 'contain'
                            }}
                            onWheel={(e) => {
                              // Prevent vertical scroll from interfering with horizontal scroll
                              if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                                e.stopPropagation();
                              }
                            }}
                          >
                            <div style={{ minWidth: 'max-content', width: '100%' }}>
                              <SyntaxHighlighter
                                language={language}
                                style={oneDark as Record<string, React.CSSProperties>}
                                PreTag="div"
                                customStyle={{
                                  margin: 0,
                                  padding: 0,
                                  minWidth: 'max-content',
                                  overflow: 'visible'
                                }}
                              >
                                {String(children).replace(/\n$/, '')}
                              </SyntaxHighlighter>
                            </div>
                          </div>
                        );
                      },
                      pre: ({ children }) => <>{children}</>,
                    }}
                  >
                    {challenge.description}
                  </ReactMarkdown>
                </div>
                <div className="space-y-3 font-sans text-base font-semibold text-foreground">
                  {challenge.requirements.functional.map((req: string, idx: number) => (
                    <div key={idx} className="leading-relaxed">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => <p className="mb-0">{children}</p>,
                          code: (props) => {
                            const { className, children, ...rest } = props;
                            const inline = !className || !/language-(\w+)/.exec(className || '');
                            return inline ? (
                              <code className="font-mono bg-metal-800/50 text-foreground px-1 py-0.5 rounded-sm text-sm border border-metal-700/50" {...rest}>
                                {children}
                              </code>
                            ) : null;
                          },
                        }}
                      >
                        {req}
                      </ReactMarkdown>
                    </div>
                  ))}
                  {challenge.requirements.technical.map((req: string, idx: number) => (
                    <div key={`tech-${idx}`} className="leading-relaxed">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => <p className="mb-0">{children}</p>,
                          code: (props) => {
                            const { className, children, ...rest } = props;
                            const inline = !className || !/language-(\w+)/.exec(className || '');
                            return inline ? (
                              <code className="font-mono bg-metal-800/50 text-foreground px-1 py-0.5 rounded-sm text-sm border border-metal-700/50" {...rest}>
                                {children}
                              </code>
                            ) : null;
                          },
                        }}
                      >
                        {req}
                      </ReactMarkdown>
                    </div>
                  ))}
                  {challenge.requirements.quality?.map((req: string, idx: number) => (
                    <div key={`qual-${idx}`} className="leading-relaxed">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => <p className="mb-0">{children}</p>,
                          code: (props) => {
                            const { className, children, ...rest } = props;
                            const inline = !className || !/language-(\w+)/.exec(className || '');
                            return inline ? (
                              <code className="font-mono bg-metal-800/50 text-foreground px-1 py-0.5 rounded-sm text-sm border border-metal-700/50" {...rest}>
                                {children}
                              </code>
                            ) : null;
                          },
                        }}
                      >
                        {req}
                      </ReactMarkdown>
                    </div>
                  ))}
                </div>
                {challenge.example_output && (
                  <pre className="font-mono text-xs bg-metal-900 p-3 rounded border border-metal-700 overflow-x-auto">
                    {challenge.example_output}
                  </pre>
                )}
              </div>
            )}
            </div>
          </div>
        </div>

        {/* Editor Panel with Terminal */}
        <div className="flex flex-1 flex-col overflow-hidden min-w-0">
          {/* Editor Section - Takes remaining space */}
          <div className="flex-1 p-4 overflow-hidden min-h-0">
            <CodeEditor 
              code={code} 
              onChange={setCode} 
              language="rust"
              onRun={isCertificationProject(challenge) ? handleRunTests : undefined}
              onReset={handleReset}
              onSubmitStep={isPracticeProject(challenge) ? handleSubmitStep : undefined}
              onNextStep={isPracticeProject(challenge) ? handleNextStep : undefined}
              canGoNext={isPracticeProject(challenge) && stepValidation?.completed && currentStep < challenge.steps.length - 1}
              canFocus={canFocusEditor}
            />
          </div>

          {/* Bottom Section: Terminal and Message Box side by side */}
          <div className="flex border-t border-metal-600 overflow-hidden">
            {/* Terminal - Left side */}
            <div className="flex-1 min-w-0">
              <Terminal
                key={`${challenge.id}-${isPracticeProject(challenge) ? challenge.steps[currentStep]?.step : 'cert'}`}
                code={code}
                projectName={challenge.id.replace('project-', '').replace('cert-', '')}
                height={terminalHeight}
                isCollapsed={isTerminalCollapsed}
                onToggle={toggleTerminal}
                onResizeStart={handleTerminalResizeStart}
                onCommandExecuted={handleTerminalCommand}
              />
            </div>

            {/* Resize Handle - Horizontal split between terminal and message box */}
            {isPracticeProject(challenge) && challenge.steps[currentStep] && isMessageBoxVisible && !isTerminalCollapsed && (
              <div
                onMouseDown={handleMessageBoxResizeStart}
                className="w-1 bg-transparent hover:bg-rust-500 cursor-col-resize transition-colors flex-shrink-0 z-10"
              />
            )}

            {/* Message Box - Right side, resizable */}
            {isPracticeProject(challenge) && challenge.steps[currentStep] && isMessageBoxVisible && !isTerminalCollapsed && (
              <div 
                className="bg-metal-800 border-l border-metal-600 flex flex-col overflow-hidden flex-shrink-0"
                style={{ 
                  width: `${messageBoxWidth}px`,
                  height: `${isTerminalCollapsed ? 40 : Math.max(150, Math.min(600, terminalHeight))}px`
                }}
              >
                {/* Message Box Header */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-metal-600 bg-metal-700 flex-shrink-0">
                  <span className="text-xs font-semibold text-foreground">Checks</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMessageBoxVisible(false)}
                    className="h-5 w-5 flex-shrink-0 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>

                {/* Message Box Content */}
                <div className="flex-1 overflow-y-auto p-3">
                  <div className="space-y-2 text-sm">
                    {/* Validation/Completion Status - Only show the message, not test items */}
                    {stepValidation && (
                      <>
                        {stepValidation.completed ? (
                          <div className="flex items-center gap-2 text-green-400">
                            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                            <p className="text-foreground">Step completed! You can proceed to the next step.</p>
                          </div>
                        ) : (
                          <>
                            {stepValidation.message && (
                              <p className="text-foreground leading-relaxed">{stepValidation.message}</p>
                            )}
                            
                            {/* Hints - Only show after submit */}
                            {(() => {
                              const step = challenge.steps[currentStep];
                              const hints = stepValidation.hints || [];
                              const shouldShowHints = 
                                hintLevels[step.step] > 0 && 
                                !stepValidation.completed && 
                                hints.length > 0;
                              
                              if (!shouldShowHints) return null;
                              
                              return (
                                <div className="pt-2 border-t border-metal-600/50">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Lightbulb className="h-3.5 w-3.5 text-yellow-400" />
                                    <span className="text-xs font-semibold text-yellow-200">Hints</span>
                                  </div>
                                  <ul className="list-disc list-inside space-y-0.5 text-xs text-yellow-200/80 ml-5">
                                    {hints.map((hint: string, idx: number) => (
                                      <li key={idx}>{hint}</li>
                                    ))}
                                  </ul>
                                </div>
                              );
                            })()}
                          </>
                        )}
                      </>
                    )}

                    {/* What You Learned - Show when completed, subtle */}
                    {stepValidation?.completed && challenge.steps[currentStep].what_you_learned && (
                      <div className="pt-2 border-t border-metal-600/50">
                        <p className="text-xs text-muted-foreground leading-relaxed italic">
                          {challenge.steps[currentStep].what_you_learned}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Test Results Sidebar - Only for certification projects */}
        {isCertificationProject(challenge) && (
          <>
            {/* Toggle Button */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsTestSidebarOpen(!isTestSidebarOpen)}
                className="rounded-l-lg rounded-r-none border border-metal-600 border-r-0 bg-metal-800 hover:bg-metal-700"
              >
                {isTestSidebarOpen ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Sidebar */}
            <div
              className={cn(
                "w-0 overflow-hidden border-l border-metal-600 bg-metal-800/50 transition-all duration-300",
                isTestSidebarOpen && "w-[400px]"
              )}
            >
              <div className="h-full overflow-y-auto p-6">
                <TestPanel
                  tests={challenge.tests}
                  results={testResults}
                  isRunning={isRunning}
                  onRunTests={handleRunTests}
                  onCancelTests={handleCancelTests}
                  onReset={handleReset}
                />
                {challenge.evaluation && challenge.evaluation.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-metal-700">
                    <ul className="space-y-2 font-body text-sm text-secondary-foreground">
                      {challenge.evaluation.map((criteria, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-rust-400 mt-1">•</span>
                          <span>{criteria}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Project Preview Modal */}
      {isPracticeProject(challenge) && challenge.preview && (
        <ProjectPreviewModal
          preview={challenge.preview}
          open={showPreviewModal}
          onClose={handlePreviewClose}
        />
      )}
    </div>
  );
}
