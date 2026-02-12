/**
 * Content linter: Validates challenge content against writing rubric
 * Based on FCC_REFERENCE_REVIEW.md recommendations
 */

import { Challenge, PracticeProject, ProjectStep } from '@/types/challenge';
import { getOrderedSteps, getStepId } from '@/lib/progress';

export interface LintIssue {
  severity: 'error' | 'warning' | 'info';
  message: string;
  field?: string;
  step?: string;
}

export interface LintResult {
  challengeId: string;
  issues: LintIssue[];
  passed: boolean;
}

/**
 * Validate a challenge's content against the writing rubric and collect lint issues.
 *
 * For practice challenges this inspects project-level fields and each ordered step;
 * for certification challenges this checks functional requirements. Collected issues
 * include severity, message, and optional field/step locations.
 *
 * @param challenge - The challenge object to lint; behavior depends on `challenge.type`.
 * @returns The lint result for the challenge, containing `challengeId`, an array of detected `issues`, and `passed` set to `true` when there are no error-level issues. 
 */
export function lintChallenge(challenge: Challenge): LintResult {
  const issues: LintIssue[] = [];

  // Check practice projects
  if (challenge.type === 'practice') {
    const practice = challenge as PracticeProject;
    
    // Check project-level fields
    if (!practice.project_overview || practice.project_overview.length < 50) {
      issues.push({
        severity: 'warning',
        message: 'Project overview should be at least 50 characters',
        field: 'project_overview',
      });
    }

    if (!practice.why_this_project || practice.why_this_project.length < 30) {
      issues.push({
        severity: 'warning',
        message: 'Why this project section should explain the value',
        field: 'why_this_project',
      });
    }

    // Check steps
    if (practice.steps.length === 0) {
      issues.push({
        severity: 'error',
        message: 'Practice project must have at least one step',
      });
    }

    const orderedSteps = getOrderedSteps(practice);
    orderedSteps.forEach((step, index) => {
      const stepId = getStepId(step, index);
      const stepIssues = lintStep(step, stepId, challenge.id);
      issues.push(...stepIssues);
    });
  }

  // Check certification projects
  if (challenge.type === 'certification') {
    // Certification projects should have comprehensive requirements
    if (challenge.requirements.functional.length < 5) {
      issues.push({
        severity: 'warning',
        message: 'Certification project should have at least 5 functional requirements',
        field: 'requirements.functional',
      });
    }
  }

  return {
    challengeId: challenge.id,
    issues,
    passed: issues.filter(i => i.severity === 'error').length === 0,
  };
}

/**
 * Lint a single step
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- challengeId reserved for future step-level context
function lintStep(step: ProjectStep, stepId: string, challengeId: string): LintIssue[] {
  const issues: LintIssue[] = [];

  // Instruction should be concise (FCC style: 1-3 sentences)
  const instructionSentences = step.instruction.split(/[.!?]+/).filter(s => s.trim().length > 0);
  if (instructionSentences.length > 5) {
    issues.push({
      severity: 'warning',
      message: `Step ${stepId} instruction is too long (${instructionSentences.length} sentences). FCC style: 1-3 sentences maximum.`,
      step: stepId,
      field: 'instruction',
    });
  }

  // Instruction should be action-focused (start with verb)
  const actionVerbs = ['create', 'add', 'set', 'write', 'implement', 'build', 'define', 'use', 'run', 'print'];
  const firstWord = step.instruction.trim().toLowerCase().split(/\s+/)[0];
  if (!actionVerbs.some(verb => firstWord.startsWith(verb))) {
    issues.push({
      severity: 'info',
      message: `Step ${stepId} instruction should start with an action verb (create, add, set, etc.)`,
      step: stepId,
      field: 'instruction',
    });
  }

  // Explanation should exist for complex steps
  if (!step.explanation && instructionSentences.length > 2) {
    issues.push({
      severity: 'info',
      message: `Step ${stepId} might benefit from an explanation section`,
      step: stepId,
      field: 'explanation',
    });
  }

  // Practice steps must have validation so the step can pass when the learner follows instructions
  if (!step.validation || !step.validation.rules || step.validation.rules.length === 0) {
    issues.push({
      severity: 'warning',
      message: `Step ${stepId} has no validation config; the step will never pass.`,
      step: stepId,
      field: 'validation',
    });
  }

  // Tests should be specific
  if (step.test.length === 0) {
    issues.push({
      severity: 'error',
      message: `Step ${stepId} must have at least one test`,
      step: stepId,
      field: 'test',
    });
  }

  if (step.test.length > 10) {
    issues.push({
      severity: 'warning',
      message: `Step ${stepId} has many tests (${step.test.length}). Consider if all are necessary.`,
      step: stepId,
      field: 'test',
    });
  }

  // What you learned should be specific
  if (!step.what_you_learned || step.what_you_learned.length < 20) {
    issues.push({
      severity: 'warning',
      message: `Step ${stepId} "what you learned" should mention specific tools/concepts by name`,
      step: stepId,
      field: 'what_you_learned',
    });
  }

  // Starter code should be provided when appropriate
  // (No lint for this - it's optional)

  return issues;
}

/**
 * Lint all challenges in a section
 */
export function lintSection(challenges: Challenge[]): LintResult[] {
  return challenges.map(challenge => lintChallenge(challenge));
}

/**
 * Format lint results for display
 */
export function formatLintResults(results: LintResult[]): string {
  const lines: string[] = [];
  
  results.forEach(result => {
    if (result.issues.length === 0) {
      lines.push(`✅ ${result.challengeId}: No issues`);
      return;
    }

    lines.push(`\n📋 ${result.challengeId}:`);
    
    const errors = result.issues.filter(i => i.severity === 'error');
    const warnings = result.issues.filter(i => i.severity === 'warning');
    const infos = result.issues.filter(i => i.severity === 'info');

    if (errors.length > 0) {
      lines.push(`  ❌ Errors (${errors.length}):`);
      errors.forEach(issue => {
        const location = issue.step ? `Step ${issue.step}` : issue.field || 'general';
        lines.push(`    - [${location}] ${issue.message}`);
      });
    }

    if (warnings.length > 0) {
      lines.push(`  ⚠️  Warnings (${warnings.length}):`);
      warnings.forEach(issue => {
        const location = issue.step ? `Step ${issue.step}` : issue.field || 'general';
        lines.push(`    - [${location}] ${issue.message}`);
      });
    }

    if (infos.length > 0) {
      lines.push(`  ℹ️  Suggestions (${infos.length}):`);
      infos.forEach(issue => {
        const location = issue.step ? `Step ${issue.step}` : issue.field || 'general';
        lines.push(`    - [${location}] ${issue.message}`);
      });
    }
  });

  return lines.join('\n');
}