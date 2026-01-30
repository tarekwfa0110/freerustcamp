import { Section, PracticeProject, CertificationProject } from '@/types/challenge';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Clock, Code2, CheckCircle2 } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import { loadProgress } from '@/lib/progress';

interface SectionPreviewProps {
  section: Section;
  onStart: () => void;
}

function isPracticeProject(challenge: Section['challenges'][0]): challenge is PracticeProject {
  return challenge.type === 'practice';
}

function isCertificationProject(challenge: Section['challenges'][0]): challenge is CertificationProject {
  return challenge.type === 'certification';
}

export function SectionPreview({ section, onStart }: SectionPreviewProps) {
  const progress = loadProgress();
  const completedChallenges = progress.completedChallenges || [];
  
  const completedCount = section.challenges.filter(c => completedChallenges.includes(c.id)).length;
  const totalCount = section.challenges.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
      <div className="fixed inset-0 top-16 bg-background overflow-y-auto">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/challenges"
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-lg',
              'border border-metal-600 bg-metal-800/50',
              'hover:bg-metal-700/50 transition-colors',
              'text-foreground'
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sections
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <img src="/rustacean-flat-noshadow.svg" alt="" className="h-12 w-12 shrink-0 object-contain" aria-hidden />
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">
                Section {section.id}: {section.title}
              </h1>
              <p className="font-body text-lg text-muted-foreground mt-1">
                {section.description}
              </p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-body text-sm text-muted-foreground">
                Progress: {completedCount} of {totalCount} projects completed
              </span>
              <span className="font-body text-sm font-semibold text-foreground">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <div className="h-2 bg-metal-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-rust-500 to-rust-600 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* What You'll Build Section */}
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Here's What You'll Build
          </h2>
          <p className="font-body text-base text-muted-foreground mb-6">
            In this section, you'll work through {totalCount} projects that will teach you Rust fundamentals through hands-on practice. Each project builds on the previous one, gradually increasing in complexity.
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-4 mb-8">
          {section.challenges.map((challenge, index) => {
            const isCompleted = completedChallenges.includes(challenge.id);
            
            return (
              <div
                key={challenge.id}
                className={cn(
                  "rounded-xl border p-6 transition-all duration-200",
                  isCompleted
                    ? "border-green-700/50 bg-green-900/10"
                    : "border-metal-600 bg-metal-800/30 hover:border-rust-500/50 hover:bg-metal-800/50"
                )}
              >
                <div className="flex items-start gap-4">
                  {/* Project Number */}
                  <div className={cn(
                    "flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg font-display text-lg font-bold",
                    isCompleted
                      ? "bg-green-500/20 text-green-300"
                      : "bg-rust-500/20 text-rust-300"
                  )}>
                    {isCompleted ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : (
                      index + 1
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-display text-lg font-bold text-foreground mb-1">
                          {challenge.title}
                        </h3>
                        {isPracticeProject(challenge) && (
                          <p className="font-body text-sm text-muted-foreground mb-3">
                            {challenge.project_overview}
                          </p>
                        )}
                        {isCertificationProject(challenge) && (
                          <p className="font-body text-sm text-muted-foreground mb-3">
                            {challenge.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        ~{challenge.estimated_time} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Code2 className="h-3 w-3" />
                        {isPracticeProject(challenge) 
                          ? `${challenge.steps.length} steps`
                          : 'Certification Project'
                        }
                      </span>
                      <span className={cn(
                        "px-2 py-0.5 rounded text-xs font-semibold",
                        challenge.difficulty === 'beginner' && "bg-blue-500/20 text-blue-300",
                        challenge.difficulty === 'intermediate' && "bg-yellow-500/20 text-yellow-300",
                        challenge.difficulty === 'advanced' && "bg-orange-500/20 text-orange-300",
                        challenge.difficulty === 'expert' && "bg-red-500/20 text-red-300"
                      )}>
                        {challenge.difficulty}
                      </span>
                    </div>

                    {/* Concepts Learned */}
                    {isPracticeProject(challenge) && challenge.concepts_taught.length > 0 && (
                      <div className="mt-3">
                        <p className="font-body text-xs text-muted-foreground mb-2">
                          Concepts you'll learn:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {challenge.concepts_taught.map((concept, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 rounded bg-metal-700/50 text-xs font-mono text-accent border border-metal-600"
                            >
                              {concept}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Start Button */}
        <div className="flex items-center justify-center gap-4 pt-6 border-t border-metal-600">
          <Button
            onClick={onStart}
            size="lg"
            className="px-8 py-6 text-lg font-semibold"
          >
            Start Learning
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
