import { UserProgress, ChallengeProgress } from '@/types/progress';
import { getChallenge } from '@/data/challenges';

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

/**
 * Persist progress to localStorage. May throw on quota exceeded or other storage errors;
 * callers that need to handle failures should wrap in try/catch.
 */
export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save progress:', error);
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.warn('LocalStorage quota exceeded. Progress may not be saved.');
    }
    throw error;
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
    previewSeen: {},
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
    completedSteps: existing?.completedSteps || [],
    terminalCommands: existing?.terminalCommands || {},
  };

  progress.challengeProgress[challengeId] = challengeProgress;
  progress.lastActivity = new Date().toISOString();

  saveProgress(progress);
}

export function saveChallengeCode(challengeId: string, code: string): void {
  const progress = loadProgress();
  const existing = progress.challengeProgress[challengeId];
  
  const challengeProgress: ChallengeProgress = {
    ...existing,
    challengeId,
    code,
    completedSteps: existing?.completedSteps || [],
    terminalCommands: existing?.terminalCommands || {},
  };

  progress.challengeProgress[challengeId] = challengeProgress;
  progress.lastActivity = new Date().toISOString();

  saveProgress(progress);
}

export function markStepComplete(challengeId: string, stepNumber: number): void {
  const progress = loadProgress();
  const existing = progress.challengeProgress[challengeId];
  
  const completedSteps = existing?.completedSteps || [];
  if (!completedSteps.includes(stepNumber)) {
    completedSteps.push(stepNumber);
  }

  const challengeProgress: ChallengeProgress = {
    ...existing,
    challengeId,
    completedSteps,
    terminalCommands: existing?.terminalCommands || {},
  };

  progress.challengeProgress[challengeId] = challengeProgress;
  progress.lastActivity = new Date().toISOString();

  saveProgress(progress);
}

export function addTerminalCommand(challengeId: string, stepNumber: number, command: string): void {
  const progress = loadProgress();
  const existing = progress.challengeProgress[challengeId];
  
  const terminalCommands = existing?.terminalCommands || {};
  const stepCommands = terminalCommands[stepNumber] || [];
  
  // Add command if not already present for this step
  if (!stepCommands.includes(command)) {
    stepCommands.push(command);
    terminalCommands[stepNumber] = stepCommands;
  }

  const challengeProgress: ChallengeProgress = {
    ...existing,
    challengeId,
    terminalCommands,
    completedSteps: existing?.completedSteps || [],
  };

  progress.challengeProgress[challengeId] = challengeProgress;
  progress.lastActivity = new Date().toISOString();

  saveProgress(progress);
}

export function getTerminalCommandsForStep(challengeId: string, stepNumber: number): string[] {
  const progress = loadProgress();
  const existing = progress.challengeProgress[challengeId];
  const terminalCommands = existing?.terminalCommands;
  
  // Handle migration: if terminalCommands is an array (old format), convert it
  if (Array.isArray(terminalCommands)) {
    // Migrate old array format to new step-based format
    // Put all commands in step 1 (since we don't know which step they belonged to)
    const migrated: Record<number, string[]> = { 1: [...terminalCommands] };
    const challengeProgress: ChallengeProgress = {
      ...existing,
      challengeId,
      terminalCommands: migrated,
    };
    progress.challengeProgress[challengeId] = challengeProgress;
    saveProgress(progress);
    // Return commands for step 1 if that's what we're asking for, otherwise empty
    // Use migrated format, not the old array
    return stepNumber === 1 ? migrated[1] : [];
  }
  
  // New format: step-based
  if (terminalCommands && typeof terminalCommands === 'object' && !Array.isArray(terminalCommands)) {
    return terminalCommands[stepNumber] || [];
  }
  
  return [];
}

export function updateSectionProgress(sectionId: number, total: number): void {
  const progress = loadProgress();

  // Count only completed challenges in this specific section
  const completed = progress.completedChallenges.filter(id => {
    const result = getChallenge(id);
    return result && result.section.id === sectionId;
  }).length;

  progress.sectionProgress[sectionId] = {
    sectionId,
    completed,
    total,
    percentage: total > 0 ? (completed / total) * 100 : 0,
  };

  saveProgress(progress);
}

export function resetChallengeProgress(challengeId: string): void {
  const progress = loadProgress();

  // Get the challenge to find its section before deleting
  const result = getChallenge(challengeId);
  const sectionId = result?.section.id;

  // Remove from completed challenges if present
  progress.completedChallenges = progress.completedChallenges.filter(id => id !== challengeId);
  
  // Remove challenge progress entirely
  delete progress.challengeProgress[challengeId];

  // Update section progress if we found the section
  if (sectionId && result) {
    // Get total challenges in this section
    const total = result.section.challenges.length;
    updateSectionProgress(sectionId, total);
  }

  progress.lastActivity = new Date().toISOString();
  saveProgress(progress);
}

/**
 * Check if a step is accessible (all previous steps are completed)
 * @param challenge - The challenge/project
 * @param stepIndex - The step index (0-based) to check
 * @param completedSteps - Array of completed step numbers
 * @returns true if step is accessible, false if locked
 */
export function isStepAccessible(
  challenge: { steps: Array<{ step: number }> },
  stepIndex: number,
  completedSteps: number[]
): boolean {
  // First step is always accessible
  if (stepIndex === 0) return true;
  
  // Check if ALL previous steps (by index) are completed
  for (let i = 0; i < stepIndex; i++) {
    const prevStep = challenge.steps[i];
    if (!completedSteps.includes(prevStep.step)) {
      return false; // Found an incomplete previous step
    }
  }
  
  return true; // All previous steps are completed
}

/**
 * Mark a challenge preview as seen
 */
export function markPreviewSeen(challengeId: string): void {
  const progress = loadProgress();
  if (!progress.previewSeen) {
    progress.previewSeen = {};
  }
  progress.previewSeen[challengeId] = true;
  saveProgress(progress);
}

/**
 * Check if a challenge preview has been seen
 */
export function hasPreviewBeenSeen(challengeId: string): boolean {
  const progress = loadProgress();
  return progress.previewSeen?.[challengeId] === true;
}
