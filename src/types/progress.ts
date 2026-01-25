export interface ChallengeProgress {
  challengeId: string;
  completed: boolean;
  attempts: number;
  timeSpent: number; // in seconds
  completedAt?: string; // ISO date string
  code?: string; // Last submitted code
}

export interface SectionProgress {
  sectionId: number;
  completed: number;
  total: number;
  percentage: number;
}

export interface UserProgress {
  userId: string;
  completedChallenges: string[];
  completedProjects: string[];
  currentChallenge?: string;
  sectionProgress: Record<number, SectionProgress>;
  totalTimeSpent: number; // in seconds
  streakDays: number;
  lastActivity: string; // ISO date string
  challengeProgress: Record<string, ChallengeProgress>;
}
