import { UserProgress, ChallengeProgress } from '@/types/progress';
import type { PracticeProject, ProjectStep } from '@/types/challenge';
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

  let progress: UserProgress;
  try {
    progress = JSON.parse(stored);
  } catch {
    return getDefaultProgress();
  }

  if (progress.challengeProgress == null) {
    progress.challengeProgress = {};
  } else if (typeof progress.challengeProgress !== 'object' || Array.isArray(progress.challengeProgress)) {
    return getDefaultProgress();
  }

  // Migrate legacy terminalCommands (string[]) to step-based Record<string, string[]> once per load
  let changed = false;
  for (const challengeId of Object.keys(progress.challengeProgress)) {
    const existing = progress.challengeProgress[challengeId];
    const tc = existing?.terminalCommands;
    if (Array.isArray(tc)) {
      progress.challengeProgress[challengeId] = {
        ...existing,
        challengeId,
        terminalCommands: { 'step-1': [...tc] },
      };
      changed = true;
    }
    if (Array.isArray(existing?.completedSteps) && existing.completedSteps.some(step => typeof step === 'number')) {
      const migrated = (existing.completedSteps as Array<string | number>).map(step =>
        typeof step === 'number' ? `step-${step}` : step
      );
      progress.challengeProgress[challengeId] = {
        ...progress.challengeProgress[challengeId],
        challengeId,
        completedSteps: migrated,
      };
      changed = true;
    }
  }
  if (changed) {
    progress.lastActivity = new Date().toISOString();
    saveProgress(progress);
  }
  return progress;
}

/**
 * Persist progress to localStorage. Swallows storage errors (e.g. quota exceeded)
 * so callers never crash; progress is simply not persisted when storage fails.
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
    // Do not rethrow: avoid crashing callers; progress just won't persist
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

/** Default ChallengeProgress so required fields are never undefined when existing is falsy. */
function defaultChallengeProgress(challengeId: string): ChallengeProgress {
  return {
    challengeId,
    completed: false,
    attempts: 0,
    timeSpent: 0,
    completedSteps: [],
    terminalCommands: {},
  };
}

export function getStepId(step: ProjectStep, index: number): string {
  if (step.id) return step.id;
  if (step.step != null) return `step-${step.step}`;
  return `step-${index + 1}`;
}

export function getOrderedStepIds(challenge: PracticeProject): string[] {
  if (Array.isArray(challenge.order) && challenge.order.length > 0) {
    return challenge.order;
  }
  return challenge.steps.map((step, index) => getStepId(step, index));
}

export function getOrderedSteps(challenge: PracticeProject): ProjectStep[] {
  const stepEntries = challenge.steps.map((step, index) => ({
    id: getStepId(step, index),
    step,
  }));
  const stepById = new Map(stepEntries.map(entry => [entry.id, entry.step]));

  const orderedIds = getOrderedStepIds(challenge);
  const orderedSteps: ProjectStep[] = [];
  const usedIds = new Set<string>();
  orderedIds.forEach((id) => {
    const step = stepById.get(id);
    if (step) {
      orderedSteps.push(step);
      usedIds.add(id);
    }
  });

  // Fallback: if order is invalid or missing steps, append remaining
  if (orderedSteps.length !== challenge.steps.length) {
    stepEntries.forEach((entry) => {
      if (!usedIds.has(entry.id)) {
        orderedSteps.push(entry.step);
        usedIds.add(entry.id);
      }
    });
  }

  return orderedSteps;
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
    ...defaultChallengeProgress(challengeId),
    ...existing,
    challengeId,
    attempts: (existing?.attempts ?? 0) + 1,
    code,
    completedSteps: existing?.completedSteps ?? [],
    terminalCommands: existing?.terminalCommands ?? {},
  };

  progress.challengeProgress[challengeId] = challengeProgress;
  progress.lastActivity = new Date().toISOString();

  saveProgress(progress);
}

export function saveChallengeCode(challengeId: string, code: string): void {
  const progress = loadProgress();
  const existing = progress.challengeProgress[challengeId];

  const challengeProgress: ChallengeProgress = {
    ...defaultChallengeProgress(challengeId),
    ...existing,
    challengeId,
    code,
    completedSteps: existing?.completedSteps ?? [],
    terminalCommands: existing?.terminalCommands ?? {},
  };

  progress.challengeProgress[challengeId] = challengeProgress;
  progress.lastActivity = new Date().toISOString();

  saveProgress(progress);
}

export function markStepComplete(challengeId: string, stepId: string): void {
  const progress = loadProgress();
  const existing = progress.challengeProgress[challengeId];

  const completedSteps = existing?.completedSteps ?? [];
  const nextSteps = completedSteps.includes(stepId) ? completedSteps : [...completedSteps, stepId];

  const challengeProgress: ChallengeProgress = {
    ...defaultChallengeProgress(challengeId),
    ...existing,
    challengeId,
    completedSteps: nextSteps,
    terminalCommands: existing?.terminalCommands ?? {},
  };

  progress.challengeProgress[challengeId] = challengeProgress;
  progress.lastActivity = new Date().toISOString();

  saveProgress(progress);
}

export function addTerminalCommand(challengeId: string, stepId: string, command: string): void {
  const progress = loadProgress();
  const existing = progress.challengeProgress[challengeId];

  const terminalCommands = { ...(existing?.terminalCommands ?? {}) };
  const stepCommands = terminalCommands[stepId] ?? [];
  if (!stepCommands.includes(command)) {
    terminalCommands[stepId] = [...stepCommands, command];
  }

  const challengeProgress: ChallengeProgress = {
    ...defaultChallengeProgress(challengeId),
    ...existing,
    challengeId,
    terminalCommands,
    completedSteps: existing?.completedSteps ?? [],
  };

  progress.challengeProgress[challengeId] = challengeProgress;
  progress.lastActivity = new Date().toISOString();

  saveProgress(progress);
}

export function getTerminalCommandsForStep(challengeId: string, stepId: string): string[] {
  const progress = loadProgress();
  const existing = progress.challengeProgress[challengeId];
  const terminalCommands = existing?.terminalCommands;

  // Already migrated: step-based shape
  if (terminalCommands && typeof terminalCommands === 'object' && !Array.isArray(terminalCommands)) {
    return terminalCommands[stepId] || [];
  }

  // Legacy array format: in-memory conversion only for return value (no mutation, no save)
  if (Array.isArray(terminalCommands)) {
    return stepId === 'step-1' ? [...terminalCommands] : [];
  }

  return [];
}

export function addCreatedDirectory(challengeId: string, directoryPath: string): void {
  const progress = loadProgress();
  const existing = progress.challengeProgress[challengeId];

  const createdDirectories = existing?.createdDirectories ?? [];
  if (!createdDirectories.includes(directoryPath)) {
    const challengeProgress: ChallengeProgress = {
      ...defaultChallengeProgress(challengeId),
      ...existing,
      challengeId,
      createdDirectories: [...createdDirectories, directoryPath],
      terminalCommands: existing?.terminalCommands ?? {},
      completedSteps: existing?.completedSteps ?? [],
    };

    progress.challengeProgress[challengeId] = challengeProgress;
    progress.lastActivity = new Date().toISOString();
    saveProgress(progress);
  }
}

export function getCreatedDirectories(challengeId: string): string[] {
  const progress = loadProgress();
  const existing = progress.challengeProgress[challengeId];
  return existing?.createdDirectories ?? [];
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

  const result = getChallenge(challengeId);
  const sectionId = result?.section.id;

  progress.completedChallenges = progress.completedChallenges.filter(id => id !== challengeId);
  delete progress.challengeProgress[challengeId];
  progress.lastActivity = new Date().toISOString();

  saveProgress(progress);

  if (sectionId && result) {
    const total = result.section.challenges.length;
    updateSectionProgress(sectionId, total);
  }
}

/**
 * Check if a step is accessible (all previous steps are completed)
 * @param challenge - The challenge/project
 * @param stepIndex - The step index (0-based) to check
 * @param completedSteps - Array of completed step ids
 * @returns true if step is accessible, false if locked
 */
export function isStepAccessible(
  challenge: { steps: Array<ProjectStep>; order?: string[] },
  stepIndex: number,
  completedSteps: string[]
): boolean {
  // First step is always accessible
  if (stepIndex === 0) return true;
  
  // Check if ALL previous steps (by index) are completed
  const orderedStepIds = Array.isArray(challenge.order) && challenge.order.length > 0
    ? challenge.order
    : challenge.steps.map((step, index) => getStepId(step, index));
  for (let i = 0; i < stepIndex; i++) {
    const prevStepId = orderedStepIds[i];
    if (!completedSteps.includes(prevStepId)) {
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
