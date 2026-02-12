import { createFileRoute } from '@tanstack/react-router';
import { sections, getChallengeSlug } from '@/data/challenges';
import { loadProgress } from '@/lib/progress';
import { ChallengeCard } from '@/components/ChallengeCard';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronDown, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/challenges/')({
  component: ChallengesIndex,
});

/**
 * Renders the Rust curriculum challenges index with collapsible sections, per-section progress, and individual challenge cards.
 *
 * @returns The React element for the challenges index page.
 */
function ChallengesIndex() {
  const progress = loadProgress();
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([1]));

  const toggleSection = (sectionId: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 pb-16 pt-24">
        {/* Header */}
        <div className="mb-8 flex items-start gap-3">
          <img src="/rustacean-flat-noshadow.svg" alt="" className="h-10 w-10 shrink-0 object-contain mt-0.5" aria-hidden />
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Rust <span className="text-gradient-rust">Curriculum</span>
            </h1>
            <p className="mt-2 font-body text-lg text-muted-foreground">
              410+ hours of content across 5 comprehensive sections
            </p>
          </div>
        </div>


        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section) => {
            const sectionCompleted = section.challenges.filter((c) =>
              progress.completedChallenges.includes(c.id)
            ).length;
            const sectionProgress =
              section.challenges.length > 0
                ? Math.round((sectionCompleted / section.challenges.length) * 100)
                : 0;
            const isExpanded = expandedSections.has(section.id);

            return (
              <div
                key={section.id}
                className={cn(
                  'overflow-hidden rounded-xl border transition-all duration-300',
                  'border-metal-600 bg-gradient-card hover:border-rust-500/30'
                )}
              >
                {/* Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-muted/30"
                >
                  {/* Expand/Collapse Icon */}
                  <div className="flex-shrink-0">
                    {isExpanded ? (
                      <ChevronDown className="h-5 w-5 text-rust-300" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-display text-lg font-bold text-foreground">
                        Section {section.id}: {section.title}
                      </h3>
                      {sectionProgress === 100 && (
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      )}
                    </div>
                    <p className="font-body text-sm text-muted-foreground">
                      {section.description}
                    </p>
                  </div>

                  {/* Progress */}
                  <div className="flex-shrink-0 text-right">
                    <div className="mb-2 flex items-center gap-3">
                      <span className="font-body text-sm text-muted-foreground">
                        {sectionCompleted}/{section.challenges.length}
                      </span>
                      <Badge
                        variant={
                          sectionProgress === 100
                            ? 'completed'
                            : sectionProgress > 0
                            ? 'in-progress'
                            : 'secondary'
                        }
                      >
                        {sectionProgress}%
                      </Badge>
                    </div>
                    <Progress value={sectionProgress} variant="rust" className="h-2 w-32" />
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="border-t border-metal-600 p-5">
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {section.challenges.map((challenge) => {
                          const isCompleted = progress.completedChallenges.includes(challenge.id);
                          const challengeProgress = progress.challengeProgress[challenge.id];
                          const status = isCompleted
                            ? 'completed'
                            : challengeProgress && challengeProgress.attempts > 0
                            ? 'in-progress'
                            : 'not-started';

                          return (
                            <ChallengeCard
                              key={challenge.id}
                              slug={getChallengeSlug(challenge)}
                              title={challenge.title}
                              difficulty="beginner"
                              estimatedTime={0}
                              status={status}
                              progress={
                                challengeProgress && challengeProgress.attempts > 0 ? 50 : undefined
                              }
                              type={
                                'type' in challenge
                                  ? challenge.type === 'practice'
                                    ? 'practice'
                                    : 'certification'
                                  : 'practice'
                              }
                            />
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}