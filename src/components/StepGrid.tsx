import { useState, useEffect } from 'react';
import { PracticeProject } from '@/types/challenge';
import { loadProgress, isStepAccessible, getOrderedSteps, getOrderedStepIds } from '@/lib/progress';
import { cn } from '@/lib/utils';
import { CheckCircle2, Lock } from 'lucide-react';

interface StepGridProps {
  challenge: PracticeProject;
  currentStep: number;
  onStepClick: (stepIndex: number) => void;
  className?: string;
  progressKey?: string; // Key to force re-render when progress changes
}

/**
 * Renders a responsive grid of steps for a practice project, visually indicating completed, active, locked, and available states.
 *
 * @param challenge - The practice project whose steps are displayed.
 * @param currentStep - Index of the currently active step.
 * @param onStepClick - Callback invoked with the step index when a non-locked step is clicked.
 * @param className - Optional additional CSS classes applied to the container.
 * @param progressKey - Optional value that, when changed, forces the component to reload progress.
 * @returns The rendered step grid element.
 */
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
  const orderedSteps = getOrderedSteps(challenge);
  const orderedStepIds = getOrderedStepIds(challenge);

  const isStepCompleted = (stepId: string) => {
    return completedSteps.includes(stepId);
  };

  const isStepLocked = (stepIndex: number) => {
    // Use helper function to check if ALL previous steps are completed
    return !isStepAccessible(challenge, stepIndex, completedSteps);
  };

  const getStepStatus = (stepIndex: number) => {
    const stepId = orderedStepIds[stepIndex];
    const isCompleted = stepId ? isStepCompleted(stepId) : false;
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
        {orderedSteps.map((step, index) => {
          const status = getStepStatus(index);
          const isCompleted = status === 'completed';
          const isActive = status === 'active';
          const isLocked = status === 'locked';
          const stepNumber = typeof step.step === 'number' ? step.step : index + 1;
          const stepId = orderedStepIds[index] ?? `step-${stepNumber}`;

          return (
            <button
              key={stepId}
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
                  ? `Step ${stepNumber}: ${step.title} (Locked - Complete previous step first)`
                  : `Step ${stepNumber}: ${step.title}`
              }
            >
              <span className="text-base font-semibold">{stepNumber}</span>
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