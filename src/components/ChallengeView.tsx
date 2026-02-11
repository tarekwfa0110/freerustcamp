import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Challenge, PracticeProject, CertificationProject } from '@/types/challenge';
import { CodeEditor } from './CodeEditor';
import { TestPanel } from './TestPanel';
import { Terminal } from './Terminal';
import { StepGrid } from './StepGrid';
import { ProjectPreviewModal } from './ProjectPreviewModal';
import { CompletionModal } from './CompletionModal';
import { triggerConfetti } from '@/lib/confetti';
import { runTests } from '@/lib/test-runner';
import {
  markChallengeComplete,
  updateChallengeAttempt,
  loadProgress,
  addTerminalCommand,
  markStepComplete,
  resetChallengeProgress,
  saveChallengeCode,
  getTerminalCommandsForStep,
  isStepAccessible,
  getOrderedSteps,
  getOrderedStepIds,
} from '@/lib/progress';
import type { ChallengeProgress } from '@/types/progress';
import { validateStep } from '@/lib/step-validator';
import { TestResult } from '@/lib/test-runner';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle2, X, RotateCcw, Lightbulb, Eye, BookOpen, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getMarkdownComponentsWithLink } from '@/lib/markdown-components';

interface ChallengeViewProps {
  challenge: Challenge;
  section: { id: number; title: string };
  initialStepId?: string;
}

// Type guards
function isPracticeProject(challenge: Challenge): challenge is PracticeProject {
  return challenge.type === 'practice';
}

function isCertificationProject(challenge: Challenge): challenge is CertificationProject {
  return challenge.type === 'certification';
}

export function ChallengeView({ challenge, initialStepId }: ChallengeViewProps) {
  const navigate = useNavigate();

  const orderedSteps = useMemo(
    () => (isPracticeProject(challenge) ? getOrderedSteps(challenge) : []),
    [challenge]
  );
  const orderedStepIds = useMemo(
    () => (isPracticeProject(challenge) ? getOrderedStepIds(challenge) : []),
    [challenge]
  );
  
  // Convert step number (1-based) to array index (0-based)
  // Also validates that the step is accessible (not locked)
  const getStepIndex = (stepId: string | undefined): number => {
    if (!stepId) return 0;
    if (isPracticeProject(challenge)) {
      const index = orderedStepIds.indexOf(stepId);
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
  
  // Get starter code based on step index (0-based) and challenge
  const getStarterCode = (stepIndex: number) => {
    if (isPracticeProject(challenge)) {
      const step = orderedSteps[stepIndex];
      // Use starterCode from step data if available (data-driven, like FCC's --seed--)
      if (step?.starterCode) {
        return step.starterCode;
      }
    }
    // Default: empty starter code
    return '// Write your code here\n// Follow the steps in the instructions panel';
  };
  
  const initialStepIndex = getStepIndex(initialStepId);
  const [code, setCode] = useState(getStarterCode(initialStepIndex));
  const [currentStep, setCurrentStep] = useState(initialStepIndex);
  const [testResults, setTestResults] = useState<TestResult[] | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isTestSidebarOpen, setIsTestSidebarOpen] = useState(false);
  const [expandedExplanations, setExpandedExplanations] = useState<Map<string, boolean>>(new Map());
  const [terminalHeight, setTerminalHeight] = useState(300); // Default expanded height
  const [isTerminalCollapsed, setIsTerminalCollapsed] = useState(true); // Closed by default
  const [messageBoxWidth, setMessageBoxWidth] = useState(400); // Default message box width
  const [instructionsPanelWidth, setInstructionsPanelWidth] = useState(400); // Default instructions panel width
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
  const prevProgressRef = useRef<ChallengeProgress | undefined>(progress.challengeProgress[challenge.id]);
  const [hintLevels, setHintLevels] = useState<Record<string, number>>({}); // Track hint visibility per step
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isMessageBoxVisible, setIsMessageBoxVisible] = useState(true);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const hasProjectCompletedRef = useRef(false); // Track if we've already shown completion for this project
  const codeBlockScrollRefs = useRef<Map<string, number>>(new Map());

  // Step key for memoizing markdown components (must be at top level for useMemo)
  const stepKey =
    isPracticeProject(challenge) && orderedStepIds[currentStep]
      ? `${challenge.id}-step-${orderedStepIds[currentStep]}`
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
            className="inline font-mono bg-amber-950/60 text-amber-100 px-1 py-0.5 rounded-sm text-sm border border-amber-900/50"
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
    const newProgress = loadProgress();
    setProgress(newProgress);
    
    // Update progress ref
    prevProgressRef.current = newProgress.challengeProgress[challenge.id];
    
    // Also reload terminal commands for current step when progress changes
    // This ensures terminalCommands state stays in sync with progress
    if (isPracticeProject(challenge) && orderedSteps[currentStep]) {
      const stepId = orderedStepIds[currentStep];
      if (stepId) {
        const savedCommands = getTerminalCommandsForStep(challenge.id, stepId);
        setTerminalCommands(savedCommands);
        prevTerminalCommandsRef.current = [...savedCommands];
      }
    }
  }, [challenge, currentStep, orderedStepIds, orderedSteps]);
  
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

  // Handle instructions panel resize (horizontal split with editor)
  const handleInstructionsPanelResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const startX = e.clientX;
    const startWidth = instructionsPanelWidth;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      // Allow up to 60% of viewport width (for very large screens)
      const maxWidth = Math.min(window.innerWidth * 0.6, 1200);
      const newWidth = Math.max(300, Math.min(maxWidth, startWidth + deltaX));
      setInstructionsPanelWidth(newWidth);
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
  }, [instructionsPanelWidth]);

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
      const currentStepId = isPracticeProject(challenge) ? orderedStepIds[currentStep] : undefined;
      lastLoadedStepRef.current = currentStepId ? currentStep : -1;
      
      const saved = progress.challengeProgress[challenge.id]?.code;
      if (saved) {
        setCode(saved);
      } else {
        // Reset to starter code for current step if no saved code
        setCode(getStarterCode(currentStep));
      }
      
      // Load terminal commands for current step
      if (currentStepId) {
        const savedCommands = getTerminalCommandsForStep(challenge.id, currentStepId);
        setTerminalCommands(savedCommands);
        prevTerminalCommandsRef.current = [...savedCommands];
      } else {
        setTerminalCommands([]);
        prevTerminalCommandsRef.current = [];
      }
      
      // Reset terminal to collapsed state when switching challenges
      setIsTerminalCollapsed(true);
      setTerminalHeight(300); // Reset to default expanded height
      
      loadedChallengeIdRef.current = challenge.id;
      // Initialize progress ref for this challenge
      prevProgressRef.current = progress.challengeProgress[challenge.id];
      // Reset flag after a brief delay to allow state to update
      setTimeout(() => {
        isLoadingCodeRef.current = false;
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional: avoid reload on progress save
  }, [challenge.id, currentStep, orderedStepIds]);

  // Reset completion state when challenge changes
  useEffect(() => {
    hasProjectCompletedRef.current = false;
  }, [challenge.id]);

  // Always load saved code when step changes (preserves code across step navigation)
  // Only reload when step or challenge actually changes, NOT when progress updates from saves
  useEffect(() => {
    if (isPracticeProject(challenge)) {
      const stepId = orderedStepIds[currentStep];
      
      // Only reload if step actually changed or challenge changed
      // Don't reload just because progress.challengeProgress was updated (from a save)
      if (lastLoadedStepRef.current === currentStep && loadedChallengeIdRef.current === challenge.id) {
        return; // Same step, same challenge - don't reload
      }
      
      isLoadingCodeRef.current = true;
      lastLoadedStepRef.current = currentStep;
      loadedChallengeIdRef.current = challenge.id; // Track that we've loaded for this challenge
      
      const saved = progress.challengeProgress[challenge.id]?.code;
      if (saved) {
        // Always use saved code if it exists
        setCode(saved);
      } else {
        // Only set starter code if no saved code exists
        setCode(getStarterCode(currentStep));
      }
      
      // Load terminal commands for the new step
      if (stepId) {
        const savedCommands = getTerminalCommandsForStep(challenge.id, stepId);
        setTerminalCommands(savedCommands);
        prevTerminalCommandsRef.current = [...savedCommands];
      } else {
        setTerminalCommands([]);
        prevTerminalCommandsRef.current = [];
      }
      // Initialize progress ref when step changes
      prevProgressRef.current = progress.challengeProgress[challenge.id];
      // Reset flag after a brief delay
      setTimeout(() => {
        isLoadingCodeRef.current = false;
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional: minimal deps to avoid reload on save
  }, [currentStep, challenge.id, orderedStepIds]);

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
    if (isPracticeProject(challenge) && orderedSteps[currentStep]) {
      setCode(getStarterCode(currentStep));
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
      setCode(getStarterCode(0));
      setCurrentStep(0);
      // Load terminal commands for step 0
      if (isPracticeProject(challenge) && orderedStepIds[0]) {
        const stepId = orderedStepIds[0];
        const savedCommands = getTerminalCommandsForStep(challenge.id, stepId);
        setTerminalCommands(savedCommands);
        prevTerminalCommandsRef.current = [...savedCommands];
      } else {
        setTerminalCommands([]);
        prevTerminalCommandsRef.current = [];
      }
      setTestResults(null);
      setStepValidation(null);
      setIsTerminalCollapsed(true);
      loadedChallengeIdRef.current = null; // Force reload on next effect
      // Reset completion tracking state
      hasProjectCompletedRef.current = false;
      setShowCompletionModal(false);
    }
  };


  // Track previous terminal commands to detect changes
  const prevTerminalCommandsRef = useRef<string[]>([]);

  const validateCurrentStep = useCallback((revealHints: boolean) => {
    if (!isPracticeProject(challenge) || !orderedSteps[currentStep]) return;
    const step = orderedSteps[currentStep];
    const stepId = orderedStepIds[currentStep];
    const stepNumber = currentStep + 1;
    const validation = validateStep(step, code, terminalCommands, stepNumber, challenge.id);
    setStepValidation(validation);

    if (validation.completed) {
      const completedSteps = progress.challengeProgress[challenge.id]?.completedSteps || [];
      if (isStepAccessible(challenge, currentStep, completedSteps)) {
        if (stepId && !completedSteps.includes(stepId)) {
          markStepComplete(challenge.id, stepId);
          const newProgress = loadProgress();
          setProgress(newProgress);
          prevProgressRef.current = newProgress.challengeProgress[challenge.id];
        }
      }
    } else if (revealHints) {
      setHintLevels(prev => ({
        ...prev,
        [stepId || `step-${stepNumber}`]: 1,
      }));
    }
  }, [challenge, currentStep, code, terminalCommands, progress, orderedStepIds, orderedSteps]);

  // Validate current step whenever code or terminal commands change (with debouncing)
  useEffect(() => {
    if (validationTimeoutRef.current) {
      clearTimeout(validationTimeoutRef.current);
    }

    const terminalCommandsChanged =
      prevTerminalCommandsRef.current.length !== terminalCommands.length ||
      prevTerminalCommandsRef.current.some((cmd, i) => cmd !== terminalCommands[i]);

    if (terminalCommandsChanged) {
      prevTerminalCommandsRef.current = [...terminalCommands];
    }

    const progressChanged =
      prevProgressRef.current !== progress.challengeProgress[challenge.id];

    if (progressChanged && !terminalCommandsChanged && isPracticeProject(challenge)) {
      const stepId = orderedStepIds[currentStep];
      if (stepId) {
        const savedCommands = getTerminalCommandsForStep(challenge.id, stepId);
        if (
          savedCommands.length !== terminalCommands.length ||
          savedCommands.some((cmd, i) => cmd !== terminalCommands[i])
        ) {
          setTerminalCommands(savedCommands);
          prevTerminalCommandsRef.current = [...savedCommands];
          prevProgressRef.current = progress.challengeProgress[challenge.id];
          return;
        }
      }
      prevProgressRef.current = progress.challengeProgress[challenge.id];
    }

    if (
      currentStep !== prevStepRef.current ||
      challenge.id !== prevChallengeRef.current ||
      terminalCommandsChanged
    ) {
      prevStepRef.current = currentStep;
      prevChallengeRef.current = challenge.id;
      if (progressChanged) {
        prevProgressRef.current = progress.challengeProgress[challenge.id];
      }
      validateCurrentStep(false);
    } else {
      validationTimeoutRef.current = setTimeout(() => validateCurrentStep(false), 300);
    }

    return () => {
      if (validationTimeoutRef.current) {
        clearTimeout(validationTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reloadProgress is stable
  }, [code, terminalCommands, currentStep, challenge, progress.challengeProgress, validateCurrentStep]);

  // Terminal is closed by default - user can open it when needed
  // We don't auto-open it anymore, even for steps that require terminal commands

  // Update URL when step changes
  useEffect(() => {
    if (isPracticeProject(challenge) && orderedStepIds[currentStep]) {
      navigate({
        to: '/challenges/$challengeId',
        params: { challengeId: challenge.id },
        search: { step: orderedStepIds[currentStep] },
        replace: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only sync URL on step/id change
  }, [currentStep, challenge.id, navigate, orderedStepIds]);

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

  // Check if preview should be shown when opening step 1
  useEffect(() => {
    if (isPracticeProject(challenge) && challenge.preview) {
      // Show preview every time step 1 is opened (step number 1, which is index 1)
      const isStep1 = currentStep === 1;
      const shouldShowPreview = 
        challenge.preview.mode === 'onLoad' && 
        isStep1;
      
      if (shouldShowPreview) {
        setShowPreviewModal(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only run on challenge/step change
  }, [challenge.id, currentStep]);

  // Handle preview modal close - don't mark as seen so it shows again next time
  const handlePreviewClose = useCallback(() => {
    setShowPreviewModal(false);
    // Don't mark as seen - we want it to show every time step 1 is opened
  }, []);

  // Handle submit step (Ctrl+Enter / Submit button) - run validation and show hints
  const handleSubmitStep = useCallback(() => {
    validateCurrentStep(true);
  }, [validateCurrentStep]);

  // Handle moving to next step (for Next button)
  const handleNextStep = useCallback(() => {
    if (isPracticeProject(challenge)) {
      if (currentStep < orderedSteps.length - 1 && stepValidation?.completed) {
        const nextStep = currentStep + 1;
        
        // Check if next step is accessible (all previous steps completed)
        const completedSteps = progress.challengeProgress[challenge.id]?.completedSteps || [];
        if (isStepAccessible(challenge, nextStep, completedSteps)) {
          setCurrentStep(nextStep);
          setStepValidation(null);
          // Reset hint visibility for new step
          const stepId = orderedStepIds[currentStep];
          if (stepId) {
            setHintLevels(prev => ({ ...prev, [stepId]: 0 }));
          }
        }
      }
    }
  }, [challenge, currentStep, stepValidation, progress, orderedStepIds, orderedSteps]);

  // Handle terminal command execution
  const handleTerminalCommand = (command: string) => {
    if (isPracticeProject(challenge) && orderedStepIds[currentStep]) {
      const stepId = orderedStepIds[currentStep];
      
      // Check if command already exists to avoid unnecessary updates
      if (!terminalCommands.includes(command)) {
        // Save to progress first (synchronous operation)
        addTerminalCommand(challenge.id, stepId, command);
        
        // Update state with the new command - this will trigger validation effect immediately
        // (no debounce for terminal command changes)
        const updatedCommands = [...terminalCommands, command];
        setTerminalCommands(updatedCommands);
        
        // Update ref immediately to prevent false change detection
        prevTerminalCommandsRef.current = [...updatedCommands];
        
        // Reload progress synchronously to ensure state is in sync
        // This ensures progress state is updated, but we've already updated terminalCommands state
        // so validation will use the correct state
        reloadProgress();
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
                {orderedSteps.length} steps • Click a step to jump to it
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
        {/* Instructions Panel - Resizable */}
        <div 
          className="border-r border-metal-600 bg-metal-800/50 flex flex-col flex-shrink-0"
          style={{ width: `${instructionsPanelWidth}px` }}
        >
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
                {orderedSteps[currentStep] && (() => {
                  const step = orderedSteps[currentStep]!;
                  const stepId = orderedStepIds[currentStep];
                  const stepNumber = currentStep + 1;
                  return (
                <div key={stepKey} className="mb-6 space-y-4">
                  {/* Step Header */}
                  <div>
                    <strong className="text-lg font-bold block mb-3">Step {stepNumber}: {step.title}</strong>
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

                    {/* Explanation - Collapsible */}
                    {step.explanation && (
                      <div className="mt-4 border border-metal-600 rounded-lg overflow-hidden">
                        <button
                          onClick={() => {
                            setExpandedExplanations(prev => {
                              const next = new Map(prev);
                              const current = stepId ? next.get(stepId) || false : false;
                              if (stepId) {
                                next.set(stepId, !current);
                              }
                              return next;
                            });
                          }}
                          className="w-full flex items-center justify-between p-3 bg-metal-800/50 hover:bg-metal-800 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-rust-400" />
                            <span className="font-semibold text-foreground">Learn More</span>
                          </div>
                          {(stepId && expandedExplanations.get(stepId)) || false ? (
                            <ChevronUp className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>
                        {stepId && expandedExplanations.get(stepId) && (
                          <div className="p-4 bg-gradient-to-br from-metal-800/40 to-metal-800/20 markdown-content shadow-md animate-in slide-in-from-top-2 fade-in duration-200">
                            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponentsForStep}>
                              {step.explanation}
                            </ReactMarkdown>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Task as normal text at the end (FCC-style) */}
                    {step.task && (
                      <div className="mt-6 pt-6 border-t-2 border-metal-600/50">
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
                    variant={stepValidation?.completed ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      const isLastStep = currentStep === orderedSteps.length - 1;
                      if (isLastStep && stepValidation?.completed) {
                        // On last step with validation complete - show completion modal if not already shown
                        if (!hasProjectCompletedRef.current) {
                          hasProjectCompletedRef.current = true;
                          markChallengeComplete(challenge.id, code, timeSpent);
                          triggerConfetti();
                          setShowCompletionModal(true);
                        } else {
                          // Already completed - just show modal again
                          setShowCompletionModal(true);
                        }
                      } else if (stepValidation?.completed) {
                        const newStep = Math.min(orderedSteps.length - 1, currentStep + 1);
                        const currentStepId = orderedStepIds[currentStep];
                        const isIntroductionStep = currentStep === 0;
                        
                        // For introduction step (step 0), always allow navigation to step 1
                        if (isIntroductionStep) {
                          // Mark intro step as complete when moving forward
                          if (currentStepId && !progress.challengeProgress[challenge.id]?.completedSteps?.includes(currentStepId)) {
                            markStepComplete(challenge.id, currentStepId);
                            const newProgress = loadProgress();
                            setProgress(newProgress);
                            prevProgressRef.current = newProgress.challengeProgress[challenge.id];
                          }
                          setCurrentStep(newStep);
                          setStepValidation(null);
                        } else {
                          // Check if next step is accessible (all previous steps completed)
                          const completedSteps = progress.challengeProgress[challenge.id]?.completedSteps || [];
                          if (isStepAccessible(challenge, newStep, completedSteps)) {
                            setCurrentStep(newStep);
                            setStepValidation(null);
                          }
                        }
                      } else {
                        handleSubmitStep();
                      }
                    }}
                    disabled={
                      (() => {
                        const isIntroductionStep = currentStep === 0;
                        const currentStepData = orderedSteps[currentStep];
                        const hasNoValidation = !currentStepData?.validation;
                        
                        // For introduction step (step 0), always allow navigation to step 1
                        if (isIntroductionStep) {
                          return false; // Always enabled for step 0
                        }
                        
                        // For steps without validation config, allow navigation if next step is accessible
                        if (hasNoValidation) {
                          if (currentStep === orderedSteps.length - 1) return false; // Last step, allow
                          const nextStep = currentStep + 1;
                          if (nextStep >= orderedSteps.length) return true;
                          const completedSteps = progress.challengeProgress[challenge.id]?.completedSteps || [];
                          return !isStepAccessible(challenge, nextStep, completedSteps);
                        }
                        
                        // For steps with validation, allow submit even if not completed
                        if (!stepValidation?.completed) {
                          return false;
                        }
                        
                        // Check if next step is accessible
                        if (currentStep !== orderedSteps.length - 1) {
                          const nextStep = currentStep + 1;
                          if (nextStep >= orderedSteps.length) return true;
                          const completedSteps = progress.challengeProgress[challenge.id]?.completedSteps || [];
                          return !isStepAccessible(challenge, nextStep, completedSteps);
                        }
                        
                        return false; // Last step, allow
                      })()
                    }
                    className={cn(
                      "flex-1",
                      stepValidation?.completed && "bg-green-600 hover:bg-green-700 text-white border-green-600"
                    )}
                  >
                    {currentStep === orderedSteps.length - 1 ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        {stepValidation?.completed ? 'Complete Project' : 'Submit'}
                      </>
                    ) : (
                      stepValidation?.completed ? (
                        <>
                          Next
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </>
                      ) : (
                        <>
                          Submit
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </>
                      )
                    )}
                  </Button>
                </div>
              </>
            )}

            {/* Certification Project: Show Requirements */}
            {isCertificationProject(challenge) && (
              <div className="space-y-4">
                <div className="font-body text-base font-normal text-foreground leading-relaxed markdown-content">
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
                            <code className="inline font-mono bg-amber-950/60 text-amber-100 px-1.5 py-0.5 rounded text-sm font-semibold border border-amber-900/50" {...rest}>
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
                <div className="space-y-3 font-body text-base font-normal text-foreground">
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

        {/* Resize Handle - Horizontal split between instructions and editor */}
        <div
          onMouseDown={handleInstructionsPanelResizeStart}
          className="w-2 bg-transparent hover:bg-rust-500 cursor-col-resize transition-colors flex-shrink-0 z-10"
        />

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
              canGoNext={isPracticeProject(challenge) && stepValidation?.completed && currentStep < orderedSteps.length - 1}
              canFocus={canFocusEditor}
              highlightLine={isPracticeProject(challenge) ? orderedSteps[currentStep]?.highlightLine : undefined}
              editableRegion={isPracticeProject(challenge) ? orderedSteps[currentStep]?.editableRegion : undefined}
            />
          </div>

          {/* Bottom Section: Terminal and Message Box side by side */}
          <div className="flex border-t border-metal-600 overflow-hidden">
            {/* Terminal - Left side */}
            <div className="flex-1 min-w-0">
              <Terminal
                key={`${challenge.id}-${isPracticeProject(challenge) ? orderedStepIds[currentStep] : 'cert'}`}
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
            {isPracticeProject(challenge) && orderedSteps[currentStep] && isMessageBoxVisible && !isTerminalCollapsed && (
              <div
                onMouseDown={handleMessageBoxResizeStart}
                className="w-1 bg-transparent hover:bg-rust-500 cursor-col-resize transition-colors flex-shrink-0 z-10"
              />
            )}

            {/* Message Box - Right side, resizable */}
            {isPracticeProject(challenge) && orderedSteps[currentStep] && isMessageBoxVisible && (
              <div 
                className="bg-metal-800 border-l border-metal-600 flex flex-col overflow-hidden flex-shrink-0"
                style={{ 
                  width: `${messageBoxWidth}px`,
                  height: `${isTerminalCollapsed ? 40 : Math.max(150, Math.min(600, terminalHeight))}px`
                }}
              >
                {/* Message Box Header */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-metal-600 bg-metal-700 flex-shrink-0">
                  <span className="text-sm font-semibold text-foreground">Checks</span>
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
                  <div className="space-y-2 text-base">
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
                              const stepId = orderedStepIds[currentStep];
                              const hints = stepValidation.hints || [];
                              const shouldShowHints = 
                                (stepId ? hintLevels[stepId] : 0) > 0 && 
                                !stepValidation.completed && 
                                hints.length > 0;
                              
                              if (!shouldShowHints) return null;
                              
                              return (
                                <div className="pt-2 border-t border-metal-600/50">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Lightbulb className="h-3.5 w-3.5 text-yellow-400" />
                                    <span className="text-sm font-semibold text-yellow-200">Hints</span>
                                  </div>
                                  <ul className="list-disc list-inside space-y-0.5 text-sm text-yellow-200/80 ml-5">
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
                    {stepValidation?.completed && orderedSteps[currentStep]?.what_you_learned && (
                      <div className="pt-2 border-t border-metal-600/50">
                        <p className="text-sm text-muted-foreground leading-relaxed italic">
                          {orderedSteps[currentStep].what_you_learned}
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

      {/* Project Completion Modal */}
      {isPracticeProject(challenge) && (
        <CompletionModal
          open={showCompletionModal}
          onOpenChange={setShowCompletionModal}
          title="🎉 Project Complete!"
          message={challenge.completion_message || `Congratulations! You've completed ${challenge.title}!`}
          onContinue={() => {
            navigate({ to: '/' });
          }}
          onClose={() => {
            setShowCompletionModal(false);
          }}
        />
      )}
    </div>
  );
}
