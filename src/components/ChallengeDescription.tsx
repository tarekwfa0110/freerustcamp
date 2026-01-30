import React from 'react';
import { Challenge, PracticeProject, CertificationProject } from '@/types/challenge';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CheckSquare, GraduationCap, BookOpen, ChevronDown, ChevronUp, Lightbulb, CheckCircle2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TaskChecklist } from './TaskChecklist';
import { getMarkdownComponents } from '@/lib/markdown-components';

interface ChallengeDescriptionProps {
  challenge: Challenge;
  currentStep: number;
  stepValidation: { completed: boolean; message?: string; hints?: string[] } | null;
  terminalCommands: string[];
  code: string;
  progress: ReturnType<typeof import('@/lib/progress').loadProgress>;
  isStepAccessible: (challenge: PracticeProject, stepIndex: number, completedSteps: number[]) => boolean;
  isExplanationExpanded: boolean;
  setIsExplanationExpanded: (expanded: boolean) => void;
  onStepChange: (newStep: number) => void;
  onResetProject?: () => void;
}

const markdownComponents = getMarkdownComponents();

export function ChallengeDescription({
  challenge,
  currentStep,
  stepValidation,
  terminalCommands,
  code,
  progress,
  isStepAccessible,
  isExplanationExpanded,
  setIsExplanationExpanded,
  onStepChange,
}: ChallengeDescriptionProps) {
  const isPractice = challenge.type === 'practice';
  const practiceChallenge = challenge as PracticeProject;
  
  if (isPractice && practiceChallenge.steps[currentStep]) {
    const step = practiceChallenge.steps[currentStep];
    
    return (
      <div className="space-y-4">
        {/* Step Header */}
        <div>
          <strong className="text-lg font-bold block mb-3">Step {step.step}: {step.title}</strong>
        </div>

        {/* Instruction */}
        <div className="markdown-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {step.instruction}
          </ReactMarkdown>
        </div>

        {/* Explanation - Collapsible */}
        {step.explanation && (
          <div className="border border-metal-600 rounded-lg overflow-hidden">
            <button
              onClick={() => setIsExplanationExpanded(!isExplanationExpanded)}
              className="w-full flex items-center justify-between p-3 bg-metal-800/50 hover:bg-metal-800 transition-colors"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-rust-400" />
                <span className="font-semibold text-foreground">Learn More</span>
              </div>
              {isExplanationExpanded ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
            {isExplanationExpanded && (
              <div className="p-4 bg-metal-800/30 markdown-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                  {step.explanation}
                </ReactMarkdown>
              </div>
            )}
          </div>
        )}

        {/* Tests/Checks */}
        {step.test && step.test.length > 0 && (
          <div className="border border-metal-600 rounded-lg p-4 bg-metal-800/30">
            <div className="flex items-center gap-2 mb-3">
              <CheckSquare className="h-4 w-4 text-rust-400" />
              <span className="font-semibold text-foreground">Checks</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {step.test.map((test, idx) => (
                <li key={idx}>{test}</li>
              ))}
            </ul>
          </div>
        )}

        {/* What You Learned */}
        {stepValidation?.completed && step.what_you_learned && (
          <div className="border border-green-700 rounded-lg p-4 bg-green-900/20">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="h-4 w-4 text-green-400" />
              <span className="font-semibold text-green-300">What You Learned</span>
            </div>
            <p className="text-sm text-green-200/80">{step.what_you_learned}</p>
          </div>
        )}

        {/* Step Validation Status */}
        {stepValidation && (
          <div className={cn(
            "p-3 rounded-lg border flex items-start gap-2",
            stepValidation.completed 
              ? "bg-green-900/20 border-green-700 text-green-300" 
              : "bg-yellow-900/20 border-yellow-700 text-yellow-300"
          )}>
            {stepValidation.completed ? (
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              {stepValidation.completed ? (
                <p className="font-semibold">Step completed! You can proceed to the next step.</p>
              ) : (
                <div className="space-y-3">
                  {step.task && (
                    <TaskChecklist
                      taskText={step.task}
                      terminalCommands={terminalCommands}
                      code={code}
                    />
                  )}
                  {stepValidation.message && (
                    <p className="font-semibold mb-1">{stepValidation.message}</p>
                  )}
                  {stepValidation.hints && stepValidation.hints.length > 0 && (
                    <div className="border-t border-yellow-800/30 pt-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="h-4 w-4 text-yellow-400" />
                        <span className="font-semibold text-yellow-200">Hints</span>
                      </div>
                      <ul className="list-disc list-inside text-sm space-y-1 text-yellow-200/80">
                        {stepValidation.hints.map((hint: string, idx: number) => (
                          <li key={idx}>{hint}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step Navigation */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onStepChange(Math.max(0, currentStep - 1))}
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
              const newStep = Math.min(practiceChallenge.steps.length - 1, currentStep + 1);
              const completedSteps = progress.challengeProgress[challenge.id]?.completedSteps || [];
              if (isStepAccessible(practiceChallenge, newStep, completedSteps)) {
                onStepChange(newStep);
              }
            }}
            disabled={
              currentStep === practiceChallenge.steps.length - 1 || 
              !stepValidation?.completed ||
              (() => {
                const nextStep = currentStep + 1;
                if (nextStep >= practiceChallenge.steps.length) return true;
                const completedSteps = progress.challengeProgress[challenge.id]?.completedSteps || [];
                return !isStepAccessible(practiceChallenge, nextStep, completedSteps);
              })()
            }
            className="flex-1"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    );
  }
  
  // Certification project
  const certChallenge = challenge as CertificationProject;
  
  return (
    <div className="space-y-4">
      <div className="font-sans text-base font-semibold text-foreground leading-relaxed markdown-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={markdownComponents}
        >
          {certChallenge.description}
        </ReactMarkdown>
      </div>
      <div className="space-y-3 font-sans text-base font-semibold text-foreground">
        {certChallenge.requirements.functional.map((req: string, idx: number) => (
          <div key={idx} className="leading-relaxed">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => <p className="mb-0">{children}</p>,
                code: (props) => {
                  const { className, children, ...rest } = props;
                  const inline = !className || !/language-(\w+)/.exec(className || '');
                  return inline ? (
                    <code className="font-mono bg-metal-700 text-accent px-1.5 py-0.5 rounded text-sm font-semibold border border-metal-600" {...rest}>
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
        {certChallenge.requirements.technical.map((req: string, idx: number) => (
          <div key={`tech-${idx}`} className="leading-relaxed">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => <p className="mb-0">{children}</p>,
                code: (props) => {
                  const { className, children, ...rest } = props;
                  const inline = !className || !/language-(\w+)/.exec(className || '');
                  return inline ? (
                    <code className="font-mono bg-metal-700 text-accent px-1.5 py-0.5 rounded text-sm font-semibold border border-metal-600" {...rest}>
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
        {certChallenge.requirements.quality?.map((req: string, idx: number) => (
          <div key={`qual-${idx}`} className="leading-relaxed">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => <p className="mb-0">{children}</p>,
                code: (props) => {
                  const { className, children, ...rest } = props;
                  const inline = !className || !/language-(\w+)/.exec(className || '');
                  return inline ? (
                    <code className="font-mono bg-metal-700 text-accent px-1.5 py-0.5 rounded text-sm font-semibold border border-metal-600" {...rest}>
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
      {certChallenge.example_output && (
        <pre className="font-mono text-xs bg-metal-900 p-3 rounded border border-metal-700 overflow-x-auto">
          {certChallenge.example_output}
        </pre>
      )}
    </div>
  );
}
