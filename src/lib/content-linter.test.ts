/**
 * Ensures Section 1 practice steps have validation and tests.
 * Run with: bun test src/lib/content-linter.test.ts
 */

import { describe, test, expect } from 'bun:test';
import { lintSection, formatLintResults } from './content-linter';
import { section1Challenges } from '@/data/challenges/section1';

describe('content-linter (section1)', () => {
  test('all section1 challenges pass lint (no errors)', () => {
    const results = lintSection(section1Challenges);
    const errors = results.flatMap((r) =>
      r.issues.filter((i) => i.severity === 'error').map((i) => ({ challenge: r.challengeId, ...i }))
    );
    if (errors.length > 0) {
      const msg = formatLintResults(results);
      expect(errors, msg).toHaveLength(0);
    }
  });

  test('every practice step has validation config', () => {
    const results = lintSection(section1Challenges);
    const noValidation = results.flatMap((r) =>
      r.issues
        .filter((i) => i.field === 'validation' && i.step != null)
        .map((i) => `${r.challengeId} step ${i.step}`)
    );
    expect(noValidation, `Steps missing validation: ${noValidation.join(', ')}`).toHaveLength(0);
  });
});
