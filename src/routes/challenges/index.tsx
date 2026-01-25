import { createFileRoute } from '@tanstack/react-router';
import { sections } from '@/data/challenges';
import { CheckCircle, Circle, Clock } from 'lucide-react';
import { loadProgress } from '@/lib/progress';

// @ts-expect-error - TanStack Router file-based routing types
export const Route = createFileRoute('/challenges/')({
  component: ChallengesIndex,
});

function ChallengesIndex() {
  const progress = loadProgress();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">All Challenges</h1>
      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.id} className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Section {section.id}: {section.title}
            </h2>
            <p className="text-gray-400 mb-6">{section.description}</p>
            <div className="space-y-2">
              {section.challenges.map((challenge) => {
                const isCompleted = progress.completedChallenges.includes(challenge.id);
                const isProject = 'type' in challenge && (challenge.type === 'practice' || challenge.type === 'certification');
                return (
                  <a
                    key={challenge.id}
                    href={`/challenges/${challenge.id}`}
                    className={`flex items-center gap-4 p-4 rounded hover:bg-gray-750 transition ${
                      isProject ? 'bg-gray-900 border-l-4 border-orange-500' : 'bg-gray-900'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{challenge.title}</h3>
                        {isProject && (
                          <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-xs rounded">
                            {challenge.type === 'practice' ? 'Practice' : 'Certification'}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {challenge.estimated_time} min
                        </span>
                        <span className="capitalize">{challenge.difficulty}</span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
