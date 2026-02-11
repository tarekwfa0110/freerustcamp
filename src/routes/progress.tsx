import { createFileRoute, Link } from '@tanstack/react-router';
import { loadProgress } from '@/lib/progress';
import { sections, getChallengeSlug } from '@/data/challenges';
import { StatCard } from '@/components/StatCard';
import { CircularProgress } from '@/components/CircularProgress';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ChallengeCard } from '@/components/ChallengeCard';
import {
  Flame,
  Clock,
  CheckCircle2,
  Trophy,
  ArrowRight,
  BookOpen,
  Code2,
} from 'lucide-react';

export const Route = createFileRoute('/progress')({
  component: ProgressPage,
});

function ProgressPage() {
  const progress = loadProgress();

  const totalChallenges = sections.reduce((sum, section) => sum + section.challenges.length, 0);
  const completedCount = progress.completedChallenges.length;
  const completionPercentage = totalChallenges > 0 ? (completedCount / totalChallenges) * 100 : 0;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  // Get recent challenges
  const recentChallenges = sections
    .flatMap((s) => s.challenges)
    .filter((c) => {
      const challengeProgress = progress.challengeProgress[c.id];
      return challengeProgress && challengeProgress.attempts > 0;
    })
    .slice(0, 3)
    .map((challenge) => {
      const challengeProgress = progress.challengeProgress[challenge.id];
      const isCompleted = progress.completedChallenges.includes(challenge.id);
      return {
        id: challenge.id,
        slug: getChallengeSlug(challenge),
        title: challenge.title,
        difficulty: challenge.difficulty,
        estimatedTime: challenge.estimated_time,
        status: isCompleted
          ? ('completed' as const)
          : challengeProgress && challengeProgress.attempts > 0
          ? ('in-progress' as const)
          : ('not-started' as const),
        progress: challengeProgress ? 50 : undefined,
        type:
          'type' in challenge
            ? challenge.type === 'practice'
              ? ('practice' as const)
              : ('certification' as const)
            : ('micro' as const),
      };
    });

  const sectionProgress = sections.map((section) => {
    const sectionCompleted = section.challenges.filter((c) =>
      progress.completedChallenges.includes(c.id)
    ).length;
    const sectionPercentage =
      section.challenges.length > 0
        ? Math.round((sectionCompleted / section.challenges.length) * 100)
        : 0;
    return {
      name: section.title,
      progress: sectionPercentage,
      completed: sectionCompleted,
      total: section.challenges.length,
    };
  });

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 pb-16 pt-24">
        {/* Welcome Header */}
        <div className="mb-8 flex items-start gap-3">
          <img src="/rustacean-flat-happy.svg" alt="" className="h-10 w-10 shrink-0 object-contain mt-0.5" aria-hidden />
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Welcome back, <span className="text-gradient-rust">Learner</span>
            </h1>
            <p className="mt-2 font-body text-lg text-muted-foreground">
              Continue your Rust journey where you left off.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Flame}
            label="Day Streak"
            value={progress.streakDays}
            subtitle="Keep it going!"
          />
          <StatCard
            icon={Clock}
            label="Time Invested"
            value={formatTime(progress.totalTimeSpent)}
            subtitle="Total time"
          />
          <StatCard
            icon={CheckCircle2}
            label="Challenges Done"
            value={completedCount}
            subtitle={`${totalChallenges - completedCount} remaining`}
          />
          <StatCard
            icon={Trophy}
            label="Overall Progress"
            value={`${Math.round(completionPercentage)}%`}
            subtitle="Curriculum completion"
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            {recentChallenges.length > 0 && (
              <section className="rounded-xl border border-metal-600 bg-gradient-card p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Continue Learning
                  </h2>
                  <Link to="/challenges">
                    <Button variant="ghost" size="sm">
                      View All
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {recentChallenges.map((challenge) => (
                    <ChallengeCard
                      key={challenge.id}
                      slug={challenge.slug}
                      title={challenge.title}
                      difficulty="beginner"
                      estimatedTime={0}
                      status={challenge.status}
                      progress={challenge.progress}
                      type={challenge.type}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Section Progress */}
            <section className="rounded-xl border border-metal-600 bg-gradient-card p-6">
              <h2 className="mb-6 font-display text-xl font-bold text-foreground">
                Curriculum Progress
              </h2>

              <div className="space-y-4">
                {sectionProgress.map((section, index) => (
                  <div key={section.name} className="group">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded bg-metal-600 font-display text-xs font-bold text-metal-200">
                          {index + 1}
                        </span>
                        <span className="font-body text-sm text-foreground">
                          {section.name}
                        </span>
                      </div>
                      <span className="font-body text-xs text-muted-foreground">
                        {section.completed}/{section.total} completed
                      </span>
                    </div>
                    <Progress value={section.progress} variant="rust" className="h-2" />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Overall Progress */}
            <div className="rounded-xl border border-metal-600 bg-gradient-card p-6 text-center">
              <h3 className="mb-4 font-display text-lg font-bold text-foreground">
                Overall Progress
              </h3>
              <CircularProgress value={completionPercentage} size={140} label="Complete" />
              <p className="mt-4 font-body text-sm text-muted-foreground">
                {completedCount} of {totalChallenges} challenges completed
              </p>
            </div>

            {/* Quick Actions */}
            <div className="rounded-xl border border-metal-600 bg-gradient-card p-6">
              <h3 className="mb-4 font-display text-lg font-bold text-foreground">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link to="/challenges" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Code2 className="mr-2 h-4 w-4" />
                    Browse Challenges
                  </Button>
                </Link>
                <Link to="/challenges" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="mr-2 h-4 w-4" />
                    View Curriculum
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
