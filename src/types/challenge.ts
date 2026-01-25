export type ChallengeType = 'micro' | 'practice' | 'certification';
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

export interface Hint {
  text: string;
  order: number;
}

export interface MicroChallenge {
  id: string;
  title: string;
  section: number;
  subsection: string;
  estimated_time: number; // in minutes
  difficulty: Difficulty;
  concepts: string[];
  explanation: string;
  task: string;
  starter_code: string;
  tests: Test[];
  hints?: Hint[];
  solution: string;
}

export interface PracticeProject {
  id: string;
  title: string;
  section: number;
  type: 'practice';
  estimated_time: number; // in minutes
  difficulty: Difficulty;
  concepts: string[];
  description: string;
  user_stories: string[];
  milestones: string[];
  starter_code: string;
  tests: Test[];
  hints: Hint[];
  reference_solution: string;
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
  };
  test_suite: {
    compilation: string[];
    functional: string[];
    code_quality?: string[];
    performance?: string[];
    architecture?: string[];
  };
  // No hints or solution for certification projects
}

export type Challenge = MicroChallenge | PracticeProject | CertificationProject;

export interface Section {
  id: number;
  title: string;
  description: string;
  estimated_hours: string;
  challenges: Challenge[];
}
