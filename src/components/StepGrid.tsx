import { useState, useEffect } from 'react';
import { PracticeProject } from '@/types/challenge';
import { loadProgress, isStepAccessible } from '@/lib/progress';
import { cn } from '@/lib/utils';
import { CheckCircle2, Lock } from 'lucide-react';

interface StepGridProps {
  challenge: PracticeProject;
  currentStep: number;
  onStepClick: (stepIndex: number) => void;
  className?: string;
  progressKey?: string; // Key to force re-render when progress changes
}

export function StepGrid({ challenge, currentStep, onStepClick, className, progressKey }: StepGridProps) {
  // Use useState + useEffect to make progress reactive
  const [progress, setProgress] = useState(() => loadProgress());
  
  useEffect(() => {
    // Reload progress when component mounts or when progressKey changes
    // progressKey can be updated by parent when progress changes
    setProgress(loadProgress());
  }, [progressKey]); // Re-load when progressKey changes
  
  const challengeProgress = progress.challengeProgress[challenge.id];
  const completedSteps = challengeProgress?.completedSteps || [];

  const isStepCompleted = (stepNumber: number) => {
    return completedSteps.includes(stepNumber);
  };

  const isStepLocked = (stepIndex: number) => {
    // Use helper function to check if ALL previous steps are completed
    return !isStepAccessible(challenge, stepIndex, completedSteps);
  };

  const getStepStatus = (stepIndex: number) => {
    const step = challenge.steps[stepIndex];
    const isCompleted = isStepCompleted(step.step);
    const isLocked = isStepLocked(stepIndex);
    const isActive = stepIndex === currentStep;

    if (isCompleted) return 'completed';
    if (isActive) return 'active';
    if (isLocked) return 'locked';
    return 'available';
  };

  return (
    <div className={cn('w-full', className)}>
      <div className="grid grid-cols-10 gap-3">
        {challenge.steps.map((step, index) => {
          const status = getStepStatus(index);
          const isCompleted = status === 'completed';
          const isActive = status === 'active';
          const isLocked = status === 'locked';

          return (
            <button
              key={step.step}
              onClick={() => !isLocked && onStepClick(index)}
              disabled={isLocked}
              className={cn(
                'aspect-square flex items-center justify-center relative',
                'border transition-all duration-200',
                'font-sans font-semibold text-foreground',
                'hover:scale-105 active:scale-95',
                // Status-based styling - design system colors
                isCompleted
                  ? 'border-green-500/50 bg-green-500/20 hover:bg-green-500/30'
                  : isActive
                  ? 'border-primary bg-primary/20 hover:bg-primary/30 ring-2 ring-primary/30'
                  : isLocked
                  ? 'border-border bg-muted cursor-not-allowed opacity-40'
                  : 'border-dotted border-border bg-muted/50 hover:border-metal-400/70 hover:bg-muted',
                // Ensure dotted border style
                !isCompleted && !isActive && !isLocked && 'border-dotted'
              )}
              style={{
                borderStyle: !isCompleted && !isActive && !isLocked ? 'dotted' : 'solid',
              }}
              title={
                isLocked
                  ? `Step ${step.step}: ${step.title} (Locked - Complete previous step first)`
                  : `Step ${step.step}: ${step.title}`
              }
            >
              <span className="text-base font-semibold">{step.step}</span>
              {isCompleted && (
                <CheckCircle2 className="absolute top-1 right-1 h-3 w-3 text-green-400" />
              )}
              {isLocked && (
                <Lock className="absolute top-1 right-1 h-3 w-3 text-muted-foreground" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
