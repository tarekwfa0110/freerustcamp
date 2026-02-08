import { PracticeProject, ProjectStep } from '@/types/challenge';
import { validateStepWithConfig } from './data-driven-validator';

export interface StepValidationResult {
  completed: boolean;
  message?: string;
  hints?: string[];
}

/**
 * Validates if a step is completed based on code content and terminal commands
 * Uses data-driven validation if available, falls back to hardcoded logic for backward compatibility
 * @param step - The step to validate
 * @param code - The user's code
 * @param terminalCommands - Terminal commands executed for this step
 * @param stepNumber - The step number (1-based)
 * @param challengeId - Optional challenge ID for project-specific validation
 */
export function validateStep(
  step: ProjectStep,
  code: string,
  terminalCommands: string[],
  stepNumber: number,
  challengeId?: string
): StepValidationResult {
  // Try data-driven validation first (if validation config exists)
  if (step.validation) {
    const result = validateStepWithConfig(step, code, terminalCommands, step.validation, challengeId);
    return result; // Use data-driven validation when available
  }
  
  // Fallback to hardcoded validation (backward compatibility)
  // This will be gradually replaced as we add validation configs to challenges
  // Step 1: Check if cargo new was run
  // For project-001, check for temp_converter specifically
  // For other projects, check for any cargo new command
  if (stepNumber === 1) {
    const isProject001 = challengeId === 'project-001';
    // Check for cargo new command (case-insensitive, handles variations)
    const hasCargoNew = terminalCommands.some(cmd => {
      const lowerCmd = cmd.toLowerCase().trim();
      if (isProject001) {
        return lowerCmd.includes('cargo new') && lowerCmd.includes('temp_converter');
      }
      // For other projects, just check for cargo new
      return lowerCmd.includes('cargo new');
    });
    
    // Also check for cd command (optional but helpful) - reserved for future hints
    void terminalCommands.some(cmd => cmd.toLowerCase().trim().includes('cd temp_converter'));

    if (!hasCargoNew) {
      if (isProject001) {
        return {
          completed: false,
          message: 'Run `cargo new temp_converter` in the terminal first',
          hints: [
            'Open the terminal (click the Terminal button at the bottom)',
            'Type: cargo new temp_converter',
            'Press Enter to execute the command',
            'Then type: cd temp_converter (optional but recommended)',
          ],
        };
      }
      return {
        completed: false,
        message: 'Run `cargo new <project-name>` in the terminal first',
        hints: [
          'Open the terminal (click the Terminal button at the bottom)',
          'Type: cargo new <your-project-name>',
          'Press Enter to execute the command',
          'Then navigate into the project directory with: cd <your-project-name>',
        ],
      };
    }
    
    return { completed: true };
  }

  // Step 2: Check if cd command was run
  if (stepNumber === 2) {
    const isProject001 = challengeId === 'project-001';
    const hasCd = terminalCommands.some(cmd => {
      const lowerCmd = cmd.toLowerCase().trim();
      if (isProject001) {
        return lowerCmd.includes('cd temp_converter');
      }
      // For other projects, check for any cd command into a directory
      return /cd\s+\w+/.test(lowerCmd);
    });
    
    if (!hasCd) {
      if (isProject001) {
        return {
          completed: false,
          message: 'Run `cd temp_converter` in the terminal',
          hints: [
            'In the terminal, type: cd temp_converter',
            'Press Enter to execute the command',
            'This moves you into the project directory',
          ],
        };
      }
      return {
        completed: false,
        message: 'Navigate into your project directory with `cd <project-name>`',
        hints: [
          'In the terminal, type: cd <your-project-name>',
          'Press Enter to execute the command',
          'This moves you into the project directory',
        ],
      };
    }
    
    return { completed: true };
  }

  // Step 3: Check if cargo run was executed (for this specific step)
  if (stepNumber === 3) {
    const hasCargoRun = terminalCommands.some(cmd => {
      const lowerCmd = cmd.toLowerCase().trim();
      return lowerCmd === 'cargo run' || 
             lowerCmd.startsWith('cargo run ') ||
             lowerCmd.startsWith('cargo run --');
    });
    
    if (!hasCargoRun) {
      return {
        completed: false,
        message: 'Run `cargo run` in the terminal to execute your program',
        hints: [
          'Open the terminal (click the Terminal button at the bottom)',
          'Type: cargo run',
          'Press Enter to execute the command',
          'Notice how Rust automatically calls the `main` function when the program runs',
        ],
      };
    }
    
    return { completed: true };
  }

  // Step 4: Check if there are at least 2 complete println! statements with different messages
  if (stepNumber === 4) {
    const hasMain = code.includes('fn main()');
    
    if (!hasMain) {
      return {
        completed: false,
        message: 'Your code needs a `main` function',
        hints: [
          'Every Rust program needs a `main` function',
          'It should look like: fn main() { ... }',
        ],
      };
    }
    
    // Match complete println! statements with string literals
    // Pattern: println!("...") or println!("...", ...)
    const printlnPattern = /println!\s*\(\s*"([^"]+)"[^)]*\)/g;
    const matches = Array.from(code.matchAll(printlnPattern));
    const messages = matches.map(m => m[1]).filter(Boolean);
    
    if (messages.length < 2) {
      return {
        completed: false,
        message: 'Add a second complete `println!` statement with a different message',
        hints: [
          'You need at least 2 complete `println!` statements with string messages',
          'Example: println!("Hello, world!");',
          'Then add: println!("Another message");',
          'Make sure both have parentheses and quoted strings',
        ],
      };
    }
    
    // Check that messages are different
    const uniqueMessages = new Set(messages);
    if (uniqueMessages.size < 2) {
      return {
        completed: false,
        message: 'The two `println!` statements must have different messages',
        hints: [
          'Your `println!` statements have the same message',
          'Change one of them to a different message',
          'Example: println!("First message"); and println!("Second message");',
        ],
      };
    }
    
    // Check if cargo run was executed - REQUIRED for step 4
    const hasCargoRun = terminalCommands.some(cmd => {
      const lowerCmd = cmd.toLowerCase().trim();
      // Check for exact "cargo run" or "cargo run -- ..."
      return lowerCmd === 'cargo run' || 
             lowerCmd.startsWith('cargo run ') ||
             lowerCmd.startsWith('cargo run --');
    });
    
    if (!hasCargoRun) {
      return {
        completed: false,
        message: 'Run `cargo run` to see how each `println!` creates a new line',
        hints: [
          'Open the terminal (click the Terminal button at the bottom)',
          'Type: cargo run',
          'Press Enter to execute the command',
          'You should see both messages printed on separate lines',
        ],
      };
    }
    
    return { completed: true };
  }

  // Step 5: Check if println! with "Temperature Converter" exists
  if (stepNumber === 5) {
    const hasMain = code.includes('fn main()');
    const hasPrintln = code.includes('println!');
    // Check for "Temperature Converter" in the code (could be in println! or elsewhere)
    const hasTemperatureConverter = code.includes('Temperature Converter');
    // More specific check: println! with Temperature Converter
    const hasCorrectPrintln = /println!\s*\(\s*"Temperature Converter"\s*\)/.test(code);
    
    if (!hasMain) {
      return {
        completed: false,
        message: 'Your code needs a `main` function',
        hints: [
          'Every Rust program needs a `main` function',
          'It should look like: fn main() { ... }',
          'Cargo already created this for you - check the code editor!',
        ],
      };
    }
    
    if (!hasPrintln) {
      return {
        completed: false,
        message: 'Use `println!` to print a message',
        hints: [
          'The `println!` macro prints text to the console',
          'Cargo already added `println!("Hello, world!")` for you',
          'Change "Hello, world!" to "Temperature Converter"',
        ],
      };
    }
    
    if (!hasTemperatureConverter || !hasCorrectPrintln) {
      return {
        completed: false,
        message: 'Change the message to "Temperature Converter"',
        hints: [
          'Look for the println! statement in your code',
          'Find: println!("Hello, world!")',
          'Change it to: println!("Temperature Converter")',
          'Make sure the quotes and spelling are exactly right!',
        ],
      };
    }
    
    return { completed: true };
  }

  // Step 6: Check if use std::env; is present
  if (stepNumber === 6 && challengeId === 'project-001') {
    // Check for use std::env; (with or without semicolon, flexible whitespace)
    const hasUseEnv = /use\s+std::env\s*;/.test(code);
    
    if (!hasUseEnv) {
      return {
        completed: false,
        message: 'Add `use std::env;` at the top of your file',
        hints: [
          'Add the import statement before your `main` function',
          'Type: use std::env;',
          'This brings the `env` module into scope so you can use it',
        ],
      };
    }
    
    return { completed: true };
  }

  // Step 7: Check if env::args() and Vec<String> are used
  if (stepNumber === 7 && challengeId === 'project-001') {
    // Check for env::args() (with or without std::)
    const hasEnvArgs = /(?:std::)?env::args\(\)/.test(code);
    
    // Check for Vec<String> type annotation
    const hasVecString = /Vec\s*<\s*String\s*>/.test(code);
    
    // Check for .collect() method
    const hasCollect = /\.collect\s*\(\)/.test(code);
    
    if (!hasEnvArgs) {
      return {
        completed: false,
        message: 'Use `env::args()` to get command-line arguments',
        hints: [
          'Add: let args: Vec<String> = env::args().collect();',
          'This collects all command-line arguments into a vector',
        ],
      };
    }
    
    if (!hasVecString) {
      return {
        completed: false,
        message: 'Collect arguments into a `Vec<String>`',
        hints: [
          'Add type annotation: let args: Vec<String> = env::args().collect();',
          'Vec<String> is a vector that holds String values',
        ],
      };
    }
    
    if (!hasCollect) {
      return {
        completed: false,
        message: 'Use `.collect()` to convert the iterator into a vector',
        hints: [
          'Add: let args: Vec<String> = env::args().collect();',
          'The `.collect()` method converts the iterator into a Vec<String>',
        ],
      };
    }
    
    return { completed: true };
  }

  // Step 8: Check if args[1] is accessed
  if (stepNumber === 8 && challengeId === 'project-001') {
    // Check for args[1] access (with or without reference)
    const hasArgs1 = /args\s*\[\s*1\s*\]/.test(code);
    
    if (!hasArgs1) {
      return {
        completed: false,
        message: 'Get the argument at index 1 from the `args` vector',
        hints: [
          'Add: let temp_str = &args[1];',
          'Use square brackets to access vector elements: args[1]',
          'Index 0 is the program name, so index 1 is the first user argument',
        ],
      };
    }
    
    return { completed: true };
  }

  // For other steps, check based on test descriptions
  // This is a simplified validation - can be expanded
  const stepTests = step.test || [];
  const trimmedCode = code.trim();
  const isPlaceholderCode = trimmedCode.length === 0 || 
    trimmedCode === '// Write your code here\n// Follow the steps in the instructions panel' ||
    trimmedCode.includes('// Write your code here');
  
  // If step has a task, require meaningful code (not just placeholder)
  if (step.task) {
    if (isPlaceholderCode) {
      return {
        completed: false,
        message: 'Complete the task for this step to continue',
        hints: ['Follow the instructions and complete the task shown below'],
      };
    }
    // If task exists and code is not placeholder, require more than just comments
    // Check if code has actual Rust code (not just comments)
    const hasActualCode = trimmedCode
      .split('\n')
      .some(line => {
        const trimmed = line.trim();
        return trimmed.length > 0 && 
               !trimmed.startsWith('//') && 
               !trimmed.startsWith('/*') &&
               !trimmed.startsWith('*');
      });
    
    if (!hasActualCode) {
      return {
        completed: false,
        message: 'Complete the task for this step to continue',
        hints: ['Write actual Rust code, not just comments'],
      };
    }
  }
  
  // Check for common patterns based on test descriptions
  if (stepTests.some(t => t.toLowerCase().includes('compile'))) {
    // If step requires compilation, check for basic syntax
    if (isPlaceholderCode) {
      return {
        completed: false,
        message: 'Write some code for this step',
      };
    }
    // For compile tests, require actual code (not just comments)
    const hasActualCode = trimmedCode
      .split('\n')
      .some(line => {
        const trimmed = line.trim();
        return trimmed.length > 0 && 
               !trimmed.startsWith('//') && 
               !trimmed.startsWith('/*') &&
               !trimmed.startsWith('*');
      });
    
    if (!hasActualCode) {
      return {
        completed: false,
        message: 'Write actual Rust code that can compile',
        hints: ['Add code beyond just comments'],
      };
    }
  }

  // Default: Don't auto-complete - require explicit validation
  // Only return true if step has no specific requirements AND has meaningful code
  if (stepTests.length === 0 && !step.task) {
    // No tests and no task - check if code has actual Rust code
    const hasActualCode = trimmedCode
      .split('\n')
      .some(line => {
        const trimmed = line.trim();
        return trimmed.length > 0 && 
               !trimmed.startsWith('//') && 
               !trimmed.startsWith('/*') &&
               !trimmed.startsWith('*') &&
               (trimmed.includes('fn ') || 
                trimmed.includes('let ') || 
                trimmed.includes('println!') ||
                trimmed.includes('use ') ||
                trimmed.includes('struct ') ||
                trimmed.includes('enum ') ||
                trimmed.includes('impl '));
      });
    
    if (!hasActualCode || isPlaceholderCode) {
      return {
        completed: false,
        message: 'Write code for this step to continue',
        hints: ['Add Rust code following the instructions'],
      };
    }
  }
  
  // No validation config: allow progress for backward compatibility
  return { completed: true };
}

/**
 * Get completion status for all steps in a project
 */
export function getStepCompletionStatus(
  project: PracticeProject,
  code: string,
  terminalCommands: string[],
  challengeId?: string
): boolean[] {
  return project.steps.map((step) => {
    const result = validateStep(step, code, terminalCommands, step.step, challengeId);
    return result.completed;
  });
}
