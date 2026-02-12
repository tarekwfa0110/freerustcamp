export interface ChallengeProgress {
  challengeId: string;
  completed: boolean;
  attempts: number;
  timeSpent: number; // in seconds
  completedAt?: string; // ISO date string
  code?: string; // Last submitted code
  completedSteps?: string[]; // Array of completed step ids
  terminalCommands?: Record<string, string[]>; // Terminal commands per step: step id -> commands array
  createdDirectories?: string[]; // Directories created via cargo new (persists across terminal remounts)
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
  previewSeen?: Record<string, boolean>; // Track which challenge previews have been seen: challengeId -> true
}
