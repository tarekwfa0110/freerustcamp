import { UserProgress, ChallengeProgress } from '@/types/progress';

const STORAGE_KEY = 'freerustcamp-progress';

export function loadProgress(): UserProgress {
  if (typeof window === 'undefined') {
    return getDefaultProgress();
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return getDefaultProgress();
  }

  try {
    return JSON.parse(stored);
  } catch {
    return getDefaultProgress();
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
}

export function getDefaultProgress(): UserProgress {
  return {
    userId: 'local-user',
    completedChallenges: [],
    completedProjects: [],
    sectionProgress: {},
    totalTimeSpent: 0,
    streakDays: 0,
    lastActivity: new Date().toISOString(),
    challengeProgress: {},
  };
}

export function markChallengeComplete(
  challengeId: string,
  code: string,
  timeSpent: number
): void {
  const progress = loadProgress();

  if (!progress.completedChallenges.includes(challengeId)) {
    progress.completedChallenges.push(challengeId);
  }

  const challengeProgress: ChallengeProgress = {
    challengeId,
    completed: true,
    attempts: (progress.challengeProgress[challengeId]?.attempts || 0) + 1,
    timeSpent: (progress.challengeProgress[challengeId]?.timeSpent || 0) + timeSpent,
    completedAt: new Date().toISOString(),
    code,
  };

  progress.challengeProgress[challengeId] = challengeProgress;
  progress.totalTimeSpent += timeSpent;
  progress.lastActivity = new Date().toISOString();

  saveProgress(progress);
}

export function updateChallengeAttempt(challengeId: string, code: string): void {
  const progress = loadProgress();

  const existing = progress.challengeProgress[challengeId];
  const challengeProgress: ChallengeProgress = {
    challengeId,
    completed: existing?.completed || false,
    attempts: (existing?.attempts || 0) + 1,
    timeSpent: existing?.timeSpent || 0,
    completedAt: existing?.completedAt,
    code,
  };

  progress.challengeProgress[challengeId] = challengeProgress;
  progress.lastActivity = new Date().toISOString();

  saveProgress(progress);
}

export function updateSectionProgress(sectionId: number, total: number): void {
  const progress = loadProgress();

  const completed = progress.completedChallenges.length;

  progress.sectionProgress[sectionId] = {
    sectionId,
    completed,
    total,
    percentage: total > 0 ? (completed / total) * 100 : 0,
  };

  saveProgress(progress);
}
