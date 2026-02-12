import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { getChallengeByIdOrSlug, getChallengeSlug, getSectionById } from '@/data/challenges';
import { ChallengeView } from '@/components/ChallengeView';
import { StepGrid } from '@/components/StepGrid';
import { SectionPreview } from '@/components/SectionPreview';
import { ProjectPreviewModal } from '@/components/ProjectPreviewModal';
import { PracticeProject } from '@/types/challenge';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import { loadProgress, isStepAccessible, hasPreviewBeenSeen, markPreviewSeen, getOrderedSteps, getOrderedStepIds } from '@/lib/progress';

export const Route = createFileRoute('/challenges/$challengeId')({
  component: ChallengePage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      step: typeof search.step === 'string' ? search.step : undefined,
    };
  },
});

/**
 * Render the challenge page for a given challengeId, handling section fallbacks, practice project previews, step grid interaction, and navigation to specific steps.
 *
 * Renders a SectionPreview when the route contains a numeric section id with available challenges, shows a ProjectPreviewModal for practice projects configured to preview on load, presents a StepGrid to select steps for practice projects before starting, and finally renders ChallengeView with an optional initial step when viewing or after starting a challenge.
 *
 * @returns A React element that displays the appropriate challenge-related UI (section preview, project preview modal, step grid, or challenge view) based on the current route, search parameters, and progress state.
 */
function ChallengePage() {
  const { challengeId } = Route.useParams();
  const search = Route.useSearch();
  const navigate = useNavigate();
  const result = getChallengeByIdOrSlug(challengeId);
  const [startedChallenge, setStartedChallenge] = useState(false);
  const [previewDismissed, setPreviewDismissed] = useState(false);

  // Reset preview dismissed when navigating to a different challenge so preview can show again
  useEffect(() => {
    setPreviewDismissed(false);
  }, [challengeId]);

  // Validate step from URL - allow URL navigation even if locked (for direct links)
  // Returns the step number if it exists, regardless of lock status
  const getValidatedStep = (stepId: string | undefined): string | undefined => {
    if (!stepId || !result) return undefined;
    
    const challenge = result.challenge;
    if (challenge.type !== 'practice') return stepId;
    
    // Find step index
    const stepIds = getOrderedStepIds(challenge);
    const stepIndex = stepIds.indexOf(stepId);
    if (stepIndex < 0) return undefined; // Step doesn't exist
    
    // Allow URL navigation to any existing step, even if locked
    // The ChallengeView will handle showing the locked state
    return stepId;
  };
  
  const [initialStepId, setInitialStepId] = useState<string | undefined>(getValidatedStep(search.step));

  // Update initialStep when URL search param changes
  useEffect(() => {
    if (!result) return;
    const validatedStep = getValidatedStep(search.step);
    setInitialStepId(validatedStep);
    if (validatedStep !== undefined) {
      setStartedChallenge(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- getValidatedStep is stable
  }, [search.step, challengeId, result]);

  // If step is specified in URL, start challenge at that step
  useEffect(() => {
    if (initialStepId !== undefined) {
      setStartedChallenge(true);
    }
  }, [initialStepId]);

  // Show section preview if it's a section ID
  const sectionNum = parseInt(challengeId, 10);
  if (!isNaN(sectionNum) && sectionNum.toString() === challengeId && !result) {
    const section = getSectionById(sectionNum);
    if (section && section.challenges.length > 0) {
      return (
        <SectionPreview
          section={section}
          onStart={() => {
            // Navigate to first challenge
            navigate({
              to: '/challenges/$challengeId',
              params: { challengeId: getChallengeSlug(section.challenges[0]) },
              search: { step: undefined },
              replace: true,
            });
          }}
        />
      );
    }
  }

  if (!result) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Challenge Not Found</h1>
          <p className="text-muted-foreground">The challenge you're looking for doesn't exist.</p>
          <Link to="/challenges" className="mt-4 inline-block text-rust-400 hover:text-rust-300">
            ← Back to Challenges
          </Link>
        </div>
      </div>
    );
  }

  const challenge = result.challenge;

  // If it's a practice project and we haven't started, show project preview (step 1) then step grid
  if (challenge.type === 'practice' && !startedChallenge) {
    const practiceChallenge = challenge as PracticeProject;
    const showProjectPreview =
      practiceChallenge.preview?.mode === 'onLoad' &&
      !hasPreviewBeenSeen(challenge.id);

    const showPreviewModal = showProjectPreview && !previewDismissed;

    const handlePreviewClose = () => {
      markPreviewSeen(challenge.id);
      setPreviewDismissed(true);
    };

    // Show project preview modal first when landing on challenge (step 1)
    if (showPreviewModal && practiceChallenge.preview) {
      return (
        <ProjectPreviewModal
          preview={practiceChallenge.preview}
          open={true}
          onClose={handlePreviewClose}
        />
      );
    }

    // Load progress for StepGrid
    const progress = loadProgress();
    const challengeProgress = progress.challengeProgress[challenge.id];
    const completedSteps = challengeProgress?.completedSteps || [];
    const progressKeyValue = `${challenge.id}-${completedSteps.join(',')}`;
    return (
      <div className="fixed inset-0 top-16 bg-background flex flex-col">
        {/* Header */}
        <div className="border-b border-metal-600 bg-metal-800/50 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{challenge.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {getOrderedSteps(challenge as PracticeProject).length} steps • Click a step to begin
            </p>
          </div>
          <Link
            to="/challenges"
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg',
              'border border-metal-600 bg-metal-800/50',
              'hover:bg-metal-700/50 transition-colors',
              'text-foreground'
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>

        {/* Step Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto">
            <StepGrid
              challenge={challenge as PracticeProject}
              currentStep={(() => {
                if (initialStepId === undefined) return 0;
                const stepIds = getOrderedStepIds(challenge as PracticeProject);
                const index = stepIds.indexOf(initialStepId);
                return index >= 0 ? index : 0;
              })()}
              progressKey={progressKeyValue}
              onStepClick={(stepIndex) => {
                const stepIds = getOrderedStepIds(challenge as PracticeProject);
                const stepId = stepIds[stepIndex];
                
                // Re-validate lock status before navigating
                const currentProgress = loadProgress();
                const currentChallengeProgress = currentProgress.challengeProgress[challenge.id];
                const currentCompletedSteps = currentChallengeProgress?.completedSteps || [];
                
                if (!isStepAccessible(challenge as PracticeProject, stepIndex, currentCompletedSteps)) {
                  // Step is locked - don't navigate
                  return;
                }
                
                setInitialStepId(stepId);
                setStartedChallenge(true);
                navigate({
                  to: '/challenges/$challengeId',
                  params: { challengeId: getChallengeSlug(challenge) },
                  search: { step: stepId },
                });
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Show the challenge view (with initial step if specified)
  return (
    <ChallengeView 
      challenge={challenge} 
      section={result.section}
      initialStepId={initialStepId}
    />
  );
}