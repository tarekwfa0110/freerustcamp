/**
 * Tests for progress (load, save, markStepComplete, isStepAccessible, etc.)
 * Uses a mock localStorage so tests don't touch real browser storage.
 */

import { describe, test, expect, beforeEach, afterEach } from 'bun:test';
import {
  getDefaultProgress,
  loadProgress,
  saveProgress,
  markStepComplete,
  markChallengeComplete,
  addTerminalCommand,
  getTerminalCommandsForStep,
  isStepAccessible,
  getValidStepNumber,
  resetChallengeProgress,
  markPreviewSeen,
  hasPreviewBeenSeen,
} from './progress';

function createMockStorage(): { store: Record<string, string>; mock: Storage } {
  const store: Record<string, string> = {};
  const mock: Storage = {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => {
      store[k] = v;
    },
    removeItem: (k: string) => {
      delete store[k];
    },
    clear: () => {
      for (const k of Object.keys(store)) delete store[k];
    },
    get length() {
      return Object.keys(store).length;
    },
    key: () => null,
  };
  return { store, mock };
}

describe('progress', () => {
  let mockStorage: ReturnType<typeof createMockStorage>;
  let originalLocalStorage: Storage | undefined;
  let originalWindow: typeof globalThis | undefined;

  beforeEach(() => {
    mockStorage = createMockStorage();
    if (typeof globalThis !== 'undefined') {
      originalLocalStorage = (globalThis as unknown as { localStorage?: Storage }).localStorage;
      originalWindow = (globalThis as unknown as { window?: typeof globalThis }).window;
      (globalThis as unknown as { localStorage: Storage }).localStorage = mockStorage.mock;
      (globalThis as unknown as { window: typeof globalThis }).window = globalThis;
    }
  });

  afterEach(() => {
    if (typeof globalThis !== 'undefined') {
      if (originalLocalStorage !== undefined) {
        (globalThis as unknown as { localStorage: Storage }).localStorage = originalLocalStorage;
      } else {
        delete (globalThis as unknown as { localStorage?: Storage }).localStorage;
      }
      if (originalWindow !== undefined) {
        (globalThis as unknown as { window: typeof globalThis }).window = originalWindow;
      } else {
        delete (globalThis as unknown as { window?: typeof globalThis }).window;
      }
    }
  });

  test('getDefaultProgress returns valid shape', () => {
    const progress = getDefaultProgress();
    expect(progress.userId).toBe('local-user');
    expect(Array.isArray(progress.completedChallenges)).toBe(true);
    expect(progress.completedChallenges.length).toBe(0);
    expect(progress.challengeProgress).toEqual({});
    expect(progress.lastActivity).toBeDefined();
  });

  test('loadProgress with empty storage returns default', () => {
    const progress = loadProgress();
    expect(progress.userId).toBe('local-user');
    expect(progress.completedChallenges).toEqual([]);
    expect(progress.challengeProgress).toEqual({});
  });

  test('saveProgress then loadProgress round-trips', () => {
    const progress = getDefaultProgress();
    progress.completedChallenges.push('project-001');
    saveProgress(progress);
    const loaded = loadProgress();
    expect(loaded.completedChallenges).toContain('project-001');
  });

  test('markStepComplete adds step to completedSteps', () => {
    const progress = getDefaultProgress();
    saveProgress(progress);
    markStepComplete('project-001', 1);
    markStepComplete('project-001', 2);
    const loaded = loadProgress();
    const cp = loaded.challengeProgress['project-001'];
    expect(cp).toBeDefined();
    expect(cp?.completedSteps).toContain(1);
    expect(cp?.completedSteps).toContain(2);
  });

  test('markStepComplete does not duplicate step number', () => {
    const progress = getDefaultProgress();
    saveProgress(progress);
    markStepComplete('project-001', 1);
    markStepComplete('project-001', 1);
    const loaded = loadProgress();
    const cp = loaded.challengeProgress['project-001'];
    const ones = cp?.completedSteps?.filter((s) => s === 1) ?? [];
    expect(ones.length).toBe(1);
  });

  test('addTerminalCommand appends command for step', () => {
    const progress = getDefaultProgress();
    saveProgress(progress);
    addTerminalCommand('project-001', 1, 'cargo new foo');
    addTerminalCommand('project-001', 1, 'cargo run');
    const commands = getTerminalCommandsForStep('project-001', 1);
    expect(commands).toContain('cargo new foo');
    expect(commands).toContain('cargo run');
  });

  test('addTerminalCommand does not duplicate same command', () => {
    const progress = getDefaultProgress();
    saveProgress(progress);
    addTerminalCommand('project-001', 1, 'cargo run');
    addTerminalCommand('project-001', 1, 'cargo run');
    const commands = getTerminalCommandsForStep('project-001', 1);
    expect(commands.filter((c) => c === 'cargo run').length).toBe(1);
  });

  test('getTerminalCommandsForStep returns empty for unknown challenge', () => {
    const progress = getDefaultProgress();
    saveProgress(progress);
    const commands = getTerminalCommandsForStep('unknown-challenge', 1);
    expect(commands).toEqual([]);
  });

  test('isStepAccessible: step 0 always accessible', () => {
    const challenge = { steps: [{ step: 1 }, { step: 2 }, { step: 3 }] };
    expect(isStepAccessible(challenge, 0, [])).toBe(true);
    expect(isStepAccessible(challenge, 0, [1, 2])).toBe(true);
  });

  test('isStepAccessible: step 1 requires step 0 completed', () => {
    const challenge = { steps: [{ step: 1 }, { step: 2 }, { step: 3 }] };
    expect(isStepAccessible(challenge, 1, [])).toBe(false);
    expect(isStepAccessible(challenge, 1, [1])).toBe(true);
    expect(isStepAccessible(challenge, 1, [1, 2])).toBe(true);
  });

  test('isStepAccessible: step 2 requires steps 0 and 1 completed', () => {
    const challenge = { steps: [{ step: 1 }, { step: 2 }, { step: 3 }] };
    expect(isStepAccessible(challenge, 2, [1])).toBe(false);
    expect(isStepAccessible(challenge, 2, [1, 2])).toBe(true);
  });

  test('markPreviewSeen and hasPreviewBeenSeen', () => {
    const progress = getDefaultProgress();
    saveProgress(progress);
    expect(hasPreviewBeenSeen('project-001')).toBe(false);
    markPreviewSeen('project-001');
    expect(hasPreviewBeenSeen('project-001')).toBe(true);
  });

  test('markChallengeComplete adds to completedChallenges and challengeProgress', () => {
    const progress = getDefaultProgress();
    saveProgress(progress);
    markChallengeComplete('project-001', 'fn main() {}', 60);
    const loaded = loadProgress();
    expect(loaded.completedChallenges).toContain('project-001');
    const cp = loaded.challengeProgress['project-001'];
    expect(cp?.completed).toBe(true);
    expect(cp?.code).toBe('fn main() {}');
  });

  test('getValidStepNumber returns step if it exists on challenge', () => {
    const challenge = { steps: [{ step: 1 }, { step: 2 }, { step: 3 }] };
    expect(getValidStepNumber(challenge, 1)).toBe(1);
    expect(getValidStepNumber(challenge, 2)).toBe(2);
    expect(getValidStepNumber(challenge, 3)).toBe(3);
    expect(getValidStepNumber(challenge, 99)).toBeUndefined();
    expect(getValidStepNumber(challenge, undefined)).toBeUndefined();
  });

  test('resetChallengeProgress removes challenge from completed and challengeProgress', () => {
    const progress = getDefaultProgress();
    progress.completedChallenges.push('project-001');
    progress.challengeProgress['project-001'] = {
      challengeId: 'project-001',
      completed: true,
      attempts: 1,
      timeSpent: 60,
      completedSteps: [1, 2],
      terminalCommands: { 1: ['cargo run'] },
    };
    saveProgress(progress);
    resetChallengeProgress('project-001');
    const loaded = loadProgress();
    expect(loaded.completedChallenges).not.toContain('project-001');
    expect(loaded.challengeProgress['project-001']).toBeUndefined();
  });
});
