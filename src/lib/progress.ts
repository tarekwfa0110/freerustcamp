import { UserProgress, ChallengeProgress } from '@/types/progress';
import type { PracticeProject, ProjectStep } from '@/types/challenge';
import { getChallenge } from '@/data/challenges';

const STORAGE_KEY = 'freerustcamp-progress';

/**
 * Loads user progress from localStorage, returning a usable progress object.
 *
 * If not running in a browser, if no stored data exists, or if stored data is invalid, returns a fresh default progress object.
 * Performs one-time-per-load migrations: converts legacy `terminalCommands` arrays into a step-keyed map (`{ "step-1": [...] }`) and converts numeric completed step entries into string step IDs (e.g., `1` -> `step-1`). If any migration occurs, the progress is persisted with an updated `lastActivity`.
 *
 * @returns The loaded (and possibly migrated) UserProgress object, or a default progress object when no valid stored data is available.
 */
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

/**
 * Create a default ChallengeProgress object with sensible initial values.
 *
 * @param challengeId - The identifier of the challenge
 * @returns A ChallengeProgress for `challengeId` with `completed` false, zeroed counters, empty `completedSteps`, and an empty `terminalCommands` map
 */
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

/**
 * Derives a stable string identifier for a project step.
 *
 * @param step - The step object which may include an explicit `id` or numeric `step` property
 * @param index - The zero-based position of `step` within its containing list; used as a fallback when no `id` or `step` is present
 * @returns The step identifier (explicit `id` if present, otherwise `step-<n>` using `step` or `index + 1`)
 */
export function getStepId(step: ProjectStep, index: number): string {
  if (step.id) return step.id;
  if (step.step != null) return `step-${step.step}`;
  return `step-${index + 1}`;
}

/**
 * Produce an ordered array of step identifiers for a practice project.
 *
 * If the project defines a non-empty `order` array, that array is returned.
 * Otherwise, identifiers are derived from the project's `steps` using `getStepId`.
 *
 * @param challenge - The practice project to derive ordered step IDs from
 * @returns An array of step identifier strings in the order the steps should be presented
 */
export function getOrderedStepIds(challenge: PracticeProject): string[] {
  if (Array.isArray(challenge.order) && challenge.order.length > 0) {
    return challenge.order;
  }
  return challenge.steps.map((step, index) => getStepId(step, index));
}

/**
 * Return the project's steps arranged according to the challenge's explicit order, appending any missing steps.
 *
 * If the challenge defines an `order`, steps listed there are returned first (unknown ids are ignored).
 * Any steps not referenced in the `order` are appended in their original definition order.
 *
 * @param challenge - The practice project containing `steps` and an optional `order` of step ids
 * @returns The array of `ProjectStep` objects in the resolved order
 */
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

/**
 * Record a challenge as completed and persist the updated progress.
 *
 * Updates the user's progress for `challengeId` by marking it completed, incrementing attempts,
 * adding `timeSpent` to the challenge and total time, storing the provided `code`, setting a
 * completion timestamp, updating `lastActivity`, and saving the progress to storage.
 *
 * @param challengeId - The identifier of the completed challenge
 * @param code - The final/submitted code for the challenge
 * @param timeSpent - Time spent on this completion (numeric duration added to the challenge and total)
 */
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

/**
 * Store the latest solution code for a challenge in the user's progress, preserving existing progress details.
 *
 * Preserves any existing completed steps and terminal commands for the challenge, updates the last-activity timestamp, and persists the change to storage.
 *
 * @param challengeId - ID of the challenge to update
 * @param code - The user's latest solution code to store for the challenge
 */
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

/**
 * Mark a specific step as completed for a challenge and persist the updated progress.
 *
 * Updates the challenge's completed steps (adds `stepId` if not already present), ensures
 * a ChallengeProgress record exists for `challengeId`, updates last activity, and saves progress to storage.
 *
 * @param challengeId - The identifier of the challenge to update
 * @param stepId - The step identifier to mark completed (e.g., `"step-1"` or a step's `id`)
 */
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

/**
 * Records a terminal command for a specific challenge step and persists the update.
 *
 * Adds `command` to the stored terminal commands for `challengeId` under `stepId` if it is not already present,
 * preserves existing challenge progress fields, updates `lastActivity`, and saves the progress.
 *
 * @param challengeId - The identifier of the challenge
 * @param stepId - The string step identifier (e.g., `step-1` or a custom step id)
 * @param command - The terminal command to record
 */
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

/**
 * Retrieve the recorded terminal commands for a specific challenge step.
 *
 * If progress stores commands in the current step-keyed form, returns the array for `stepId`.
 * If progress uses the legacy array form, returns a copy of that array only when `stepId` is `"step-1"`.
 *
 * @param challengeId - The challenge identifier
 * @param stepId - The step identifier (e.g., `"step-1"`)
 * @returns The array of terminal commands for the specified step, or an empty array if none exist
 */
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
 * Determine whether a step is accessible based on completion of all preceding steps.
 *
 * Considers `challenge.order` when present to establish step ordering; otherwise derives step ids from `challenge.steps`.
 *
 * @param challenge - The challenge or project object containing `steps` and an optional `order` of step ids
 * @param stepIndex - Zero-based index of the step to check
 * @param completedSteps - Array of completed step ids (e.g., `"step-1"`, custom `step.id` values)
 * @returns `true` if every step before `stepIndex` is present in `completedSteps`, `false` otherwise
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