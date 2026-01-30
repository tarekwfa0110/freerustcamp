export type ChallengeType = 'practice' | 'certification';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type TestType = 'compilation' | 'functional' | 'code_quality' | 'performance' | 'architecture';

export interface Test {
  name: string;
  type: TestType;
  description: string;
  command?: string;
  expectedOutput?: string;
  expectedExitCode?: number;
  check?: string; // For code quality checks like "contains 'mut count'"
  hidden?: boolean;
}

import type { StepValidationConfig } from './validation';

export interface ProjectStep {
  step: number;
  title: string;
  instruction: string;
  explanation?: string; // Educational explanation of concepts
  task?: string; // Fun, experimental task related to the step
  starterCode?: string; // Code that should appear in editor for this step (like FCC's --seed--)
  test: string[]; // Test descriptions
  what_you_learned: string; // Summary of what was learned
  validation?: StepValidationConfig; // Data-driven validation rules (replaces hardcoded logic)
}

export interface ProjectPreview {
  mode: 'onLoad' | 'onClick'; // Whether to auto-show before step 1
  title: string; // e.g., "Temperature Converter"
  description?: string; // Brief explanation of what the project does
  example_output?: string; // For CLI projects: terminal session transcript showing actual execution
}

export interface PracticeProject {
  id: string;
  title: string;
  section: number;
  type: 'practice';
  estimated_time: number; // in minutes
  difficulty: Difficulty;
  concepts_taught: string[];
  project_overview: string;
  why_this_project: string;
  prerequisites: string[];
  steps: ProjectStep[];
  completion_message: string;
  extensions?: string;
  preview?: ProjectPreview; // Project preview shown before step 1
}

export interface CertificationProject {
  id: string;
  title: string;
  section: number;
  type: 'certification';
  estimated_time: number; // in minutes
  difficulty: Difficulty;
  concepts: string[];
  description: string;
  requirements: {
    functional: string[];
    technical: string[];
    quality?: string[];
  };
  example_output?: string;
  tests: Test[]; // Comprehensive test suite
  evaluation: string[]; // Evaluation criteria
  // No steps, hints, or solution for certification projects
}

export type Challenge = PracticeProject | CertificationProject;

export interface Section {
  id: number;
  title: string;
  description: string;
  estimated_hours: string;
  challenges: Challenge[];
}
