import { Link } from '@tanstack/react-router';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChallengeCardProps {
  id: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  estimatedTime: number; // in minutes
  status: 'not-started' | 'in-progress' | 'completed' | 'locked';
  progress?: number;
  type: 'micro' | 'practice' | 'certification';
}

export function ChallengeCard({
  id,
  title,
  status,
}: ChallengeCardProps) {
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';

  return (
    <Link
      to="/challenges/$challengeId"
      params={{ challengeId: id }}
      search={{ step: undefined }}
      className={cn(
        'group relative overflow-hidden rounded-lg border transition-all duration-300 flex items-center justify-center min-h-[80px]',
        isLocked
          ? 'border-metal-700 bg-metal-800/50 cursor-not-allowed'
          : isCompleted
          ? 'border-success/30 bg-success/5 hover:border-success/50'
          : 'border-metal-600 bg-gradient-card hover:border-rust-500/50 hover:shadow-rust'
      )}
    >
      <div className="p-4 flex items-center justify-center w-full">
        <div className="flex items-center justify-center gap-2">
          <h4
            className={cn(
              'font-display text-sm font-bold text-center',
              isLocked ? 'text-metal-400' : 'text-foreground'
            )}
          >
            {title}
          </h4>
          {isLocked && <Lock className="h-4 w-4 text-metal-500 flex-shrink-0" />}
          {isCompleted && (
            <img src="/rustacean-flat-happy.svg" alt="" className="h-5 w-5 flex-shrink-0 object-contain" aria-hidden />
          )}
        </div>
      </div>
    </Link>
  );
}
