import { createFileRoute } from '@tanstack/react-router';
import { loadProgress } from '@/lib/progress';
import { sections } from '@/data/challenges';
import { CheckCircle, Clock, TrendingUp } from 'lucide-react';

// @ts-expect-error - TanStack Router file-based routing types
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Your Progress</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div>
              <div className="text-3xl font-bold">{completedCount}</div>
              <div className="text-gray-400 text-sm">Challenges Completed</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-8 h-8 text-orange-500" />
            <div>
              <div className="text-3xl font-bold">{completionPercentage.toFixed(1)}%</div>
              <div className="text-gray-400 text-sm">Overall Progress</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-8 h-8 text-blue-500" />
            <div>
              <div className="text-3xl font-bold">{formatTime(progress.totalTimeSpent)}</div>
              <div className="text-gray-400 text-sm">Time Spent</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Section Progress</h2>
        {sections.map((section) => {
          const sectionCompleted = section.challenges.filter((c) =>
            progress.completedChallenges.includes(c.id)
          ).length;
          const sectionPercentage =
            section.challenges.length > 0
              ? (sectionCompleted / section.challenges.length) * 100
              : 0;

          return (
            <div key={section.id} className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold">
                    Section {section.id}: {section.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">{section.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    {sectionCompleted} / {section.challenges.length}
                  </div>
                  <div className="text-gray-400 text-sm">{sectionPercentage.toFixed(1)}%</div>
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className="bg-orange-500 h-3 rounded-full transition-all"
                  style={{ width: `${sectionPercentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
