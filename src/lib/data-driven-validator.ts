/**
 * Data-driven step validator
 * Uses validation rules from challenge data instead of hardcoded logic
 */

import type { ProjectStep } from '@/types/challenge';
import type { StepValidationConfig } from '@/types/validation';
import { StepValidationResult } from './step-validator';

/** Max regex pattern length to mitigate ReDoS (catastrophic backtracking). */
const MAX_REGEX_LENGTH = 2048;

/** Escape regex metacharacters so the string is matched literally. */
function escapeRegExp(s: string): string {
  return s.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
}

/**
 * Detects common missing semicolon patterns in Rust code
 * Returns a specific hint if a missing semicolon is detected, null otherwise
 */
function detectMissingSemicolon(code: string): string | null {
  // Split code into lines for better analysis
  const lines = code.split('\n');
  
  // Check each line for common missing semicolon patterns
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const nextLine = i < lines.length - 1 ? lines[i + 1].trim() : '';
    
    // Skip empty lines, comments, and function signatures
    if (!line || line.startsWith('//') || line.startsWith('/*') || line.startsWith('*') || 
        line.startsWith('fn ') || line.startsWith('struct ') || line.startsWith('enum ') ||
        line.startsWith('impl ') || line.startsWith('use ') || line.startsWith('mod ')) {
      continue;
    }
    
    // Skip lines that already have semicolons (check for semicolon before any comment)
    // Use regex to detect semicolon that appears before comment tokens or end of line
    const hasSemicolonInLine = /;(?=\s*(\/\/|\/\*|$))/.test(line);
    if (hasSemicolonInLine) {
      continue;
    }
    
    // Skip closing braces (they don't need semicolons)
    if (line === '}' || line === '};') {
      continue;
    }
    
    // Pattern 1: let declarations without semicolon
    // Example: "let x = 5" (should be "let x = 5;")
    // Note: let declarations ALWAYS need semicolons (they're statements, not expressions)
    const letMatch = line.match(/^let\s+(\w+)\s*=\s*(.+)$/);
    if (letMatch) {
      // let declarations always need semicolons in Rust
      return `Missing semicolon after \`let ${letMatch[1]} = ...\``;
    }
    
    // Pattern 2: println! without semicolon (when followed by more statements)
    // Note: println! can be the last expression in a function returning (), so no semicolon needed then
    // Also skip match arms - they don't need semicolons
    if (line.includes('println!') && !hasSemicolonInLine) {
      // Skip if this is a match arm (contains =>)
      if (line.includes('=>')) {
        // Match arms are expressions, not statements - they end with comma or closing brace
        continue;
      }
      // Only flag if there's clearly more code after (not just closing brace)
      if (nextLine && !nextLine.startsWith('}') && !nextLine.startsWith('//') && nextLine.trim()) {
        const printlnMatch = line.match(/println!\s*\([^)]+\)/);
        if (printlnMatch) {
          return `Missing semicolon after \`println!(...)\``;
        }
      }
    }
    
    // Pattern 3: Common function calls that need semicolons (when used as statements)
    const functionCallPatterns = [
      { pattern: /process::exit\s*\([^)]+\)/, name: 'process::exit(...)' },
      { pattern: /env::args\s*\(\)/, name: 'env::args()' },
      { pattern: /\.parse\s*\(\)/, name: '.parse()' },
      { pattern: /\.expect\s*\([^)]+\)/, name: '.expect(...)' },
      { pattern: /\.unwrap\s*\(\)/, name: '.unwrap()' },
      { pattern: /\.to_uppercase\s*\(\)/, name: '.to_uppercase()' },
    ];
    
    for (const { pattern, name } of functionCallPatterns) {
      if (pattern.test(line) && !hasSemicolonInLine) {
        // Only flag if there's clearly more code after (not just closing brace)
        if (nextLine && !nextLine.startsWith('}') && !nextLine.startsWith('//') && nextLine.trim()) {
          return `Missing semicolon after \`${name}\``;
        }
      }
    }
    
    // Pattern 4: Variable assignment (not let) without semicolon
    // Example: "x = 5" (should be "x = 5;")
    // Skip match arms - they don't need semicolons (they end with commas)
    if (!line.startsWith('let ') && !line.includes('=>') && /^\w+\s*=\s*[^=]+$/.test(line) && !hasSemicolonInLine) {
      // Only flag if there's clearly more code after (not just closing brace)
      if (nextLine && !nextLine.startsWith('}') && !nextLine.startsWith('//') && nextLine.trim()) {
        const assignMatch = line.match(/^(\w+)\s*=\s*(.+)$/);
        if (assignMatch) {
          return `Missing semicolon after assignment \`${assignMatch[1]} = ...\``;
        }
      }
    }
    
    // Pattern 5: Return statement without semicolon
    // Note: return statements typically need semicolons, but can be last expression
    if (line.startsWith('return ') && !hasSemicolonInLine) {
      // Only flag if there's clearly more code after (not just closing brace)
      if (nextLine && !nextLine.startsWith('}') && !nextLine.startsWith('//') && nextLine.trim()) {
        return `Missing semicolon after \`return ...\``;
      }
    }
  }
  
  return null;
}

/**
 * Validates a regex pattern before use (length limit to mitigate ReDoS) and
 * constructs the RegExp. Returns the RegExp if valid, or throws if invalid.
 */
function validateRegexPattern(pattern: string, flags?: string): RegExp {
  if (typeof pattern !== 'string' || pattern.length === 0) {
    throw new Error('Regex pattern must be a non-empty string');
  }
  if (pattern.length > MAX_REGEX_LENGTH) {
    throw new Error(`Regex pattern exceeds max length (${MAX_REGEX_LENGTH})`);
  }
  return new RegExp(pattern, flags || '');
}

export function validateStepWithConfig(
  step: ProjectStep,
  code: string,
  terminalCommands: string[],
  config?: StepValidationConfig,
  challengeId?: string
): StepValidationResult {
  if (!config || !config.rules || config.rules.length === 0) {
    // No validation config - return completed (backward compatibility)
    return { completed: true };
  }

  // Check each validation rule
  for (const rule of config.rules) {
    const result = validateRule(rule, code, terminalCommands, challengeId);
    if (!result.completed) {
      return {
        completed: false,
        message: result.message ?? 'Validation failed',
        hints: result.hints ?? rule.hints ?? [],
      };
    }
  }

  return { completed: true, ...(config.message && { message: config.message }) };
}

function validateRule(
  rule: StepValidationConfig['rules'][0],
  code: string,
  terminalCommands: string[],
  challengeId?: string
): StepValidationResult {
  switch (rule.type) {
    case 'terminal_command': {
      const hasCommand = terminalCommands.some(cmd => {
        const lowerCmd = cmd.toLowerCase().trim();
        if (rule.projectSpecific) {
          return lowerCmd.includes(rule.command.toLowerCase()) && 
                 lowerCmd.includes(rule.projectSpecific.toLowerCase());
        }
        return lowerCmd.includes(rule.command.toLowerCase());
      });
      
      // For cd commands, also check if the directory was created (via cargo new)
      if (hasCommand && rule.command.toLowerCase().includes('cd ') && challengeId) {
        const cdMatch = rule.command.match(/cd\s+(\S+)/i);
        if (cdMatch) {
          const targetDir = cdMatch[1];
          // Check if directory exists in persisted directories
          try {
            const progress = JSON.parse(localStorage.getItem('freerustcamp-progress') || '{}');
            const challengeProgress = progress.challengeProgress?.[challengeId];
            const persistedDirs = challengeProgress?.createdDirectories || [];
            const dirPath = `/home/user/${targetDir}`;
            if (!persistedDirs.includes(dirPath)) {
              // Directory doesn't exist - check if cargo new was run
              const terminalCommandsAll = challengeProgress?.terminalCommands || {};
              const allCommands = Object.values(terminalCommandsAll).flat();
              const cargoNewRun = allCommands.some(cmd => 
                cmd.toLowerCase().includes('cargo new') && cmd.toLowerCase().includes(targetDir.toLowerCase())
              );
              if (!cargoNewRun) {
                return {
                  completed: false,
                  message: `Directory '${targetDir}' doesn't exist. Run \`cargo new ${targetDir}\` first.`,
                  hints: rule.hints,
                };
              }
            }
          } catch {
            // Ignore errors, fall through to success
          }
        }
      }
      
      if (!hasCommand) {
        return {
          completed: false,
          message: `Run \`${rule.command}${rule.projectSpecific ? ' ' + rule.projectSpecific : ''}\` in the terminal`,
          hints: rule.hints,
        };
      }
      break;
    }

    case 'code_contains': {
      const patterns = rule.patterns || [];
      if (rule.allRequired) {
        // All patterns must be present
        const missingPatterns = patterns.filter((pattern: string) => !code.includes(pattern));
        const allPresent = missingPatterns.length === 0;
        if (!allPresent) {
          return {
            completed: false,
            message: `Missing required element${missingPatterns.length > 1 ? 's' : ''}: ${missingPatterns.join(', ')}`,
            hints: rule.hints,
          };
        }
      } else {
        // At least one pattern must be present
        const anyPresent = patterns.some((pattern: string) => code.includes(pattern));
        if (!anyPresent) {
          return {
            completed: false,
            message: `Code does not contain any of: ${patterns.join(', ')}`,
            hints: rule.hints,
          };
        }
      }
      break;
    }

    case 'code_matches': {
      try {
        const regex = validateRegexPattern(rule.regex, rule.flags);
        if (!regex.test(code)) {
          // Check for semicolon in match arms (common mistake)
          const matchArmSemicolonPattern = /Some\s*\(\s*value\s*\)\s*=>\s*println!.*\)\s*;/;
          if (matchArmSemicolonPattern.test(code)) {
            return {
              completed: false,
              message: 'Remove the semicolon after println! in the match arm',
              hints: rule.hints || [
                'Match arms are expressions, not statements - no semicolon needed',
                'Change: Some(value) => println!(...); to Some(value) => println!(...)',
              ],
            };
          }
          
          // Check for missing semicolon first
          const semicolonHint = detectMissingSemicolon(code);
          if (semicolonHint) {
            return {
              completed: false,
              message: semicolonHint,
              hints: rule.hints,
            };
          }
          
          return {
            completed: false,
            message: rule.hints?.[0] || 'Code does not match the expected pattern',
            hints: rule.hints,
          };
        }
      } catch (error) {
        const details = error instanceof Error ? error.message : String(error);
        console.error('Invalid regex pattern:', rule.regex, details, error);
        return {
          completed: false,
          message: `Invalid regex: ${rule.regex}`,
        };
      }
      break;
    }

    case 'code_compiles':
      return {
        completed: false,
        message: 'code_compiles not implemented',
        hints: rule.hints ?? [],
      };

    case 'function_exists': {
      const functionPattern = new RegExp(`fn\\s+${escapeRegExp(rule.functionName)}\\s*\\(`, 'i');
      if (!functionPattern.test(code)) {
        return {
          completed: false,
          message: `Function \`${rule.functionName}\` not found`,
          hints: rule.hints,
        };
      }
      break;
    }

    case 'struct_exists': {
      const structPattern = new RegExp(`struct\\s+${escapeRegExp(rule.structName)}\\s*\\{`, 'i');
      if (!structPattern.test(code)) {
        return {
          completed: false,
          message: `Struct \`${rule.structName}\` not found`,
          hints: rule.hints,
        };
      }
      
      // Check fields if specified
      if (rule.fields) {
        for (const field of rule.fields) {
          if (!code.includes(field)) {
            return {
              completed: false,
              message: `Struct \`${rule.structName}\` missing field: \`${field}\``,
              hints: rule.hints,
            };
          }
        }
      }
      break;
    }

    case 'custom':
      console.warn('Custom validation not yet implemented:', rule.validator);
      return {
        completed: false,
        message: `Custom validation not implemented: ${rule.validator}`,
        hints: rule.hints ?? [],
      };

    default: {
      const invalidType = (rule as { type: unknown }).type;
      console.warn('Unrecognized validation rule type:', invalidType);
      return {
        completed: false,
        message: `Invalid validation rule type: "${String(invalidType)}". Check step config.`,
        hints: rule.hints,
      };
    }
  }

  return { completed: true };
}
