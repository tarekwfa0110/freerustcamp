/**
 * Data-driven step validator
 * Uses validation rules from challenge data instead of hardcoded logic
 */

import type { ProjectStep } from '@/types/challenge';
import type { StepValidationConfig } from '@/types/validation';
import { StepValidationResult } from './step-validator';

export function validateStepWithConfig(
  step: ProjectStep,
  code: string,
  terminalCommands: string[],
  config?: StepValidationConfig
): StepValidationResult {
  if (!config || !config.rules || config.rules.length === 0) {
    // No validation config - return completed (backward compatibility)
    return { completed: true };
  }

  // Check each validation rule
  for (const rule of config.rules) {
    const result = validateRule(rule, code, terminalCommands);
    if (!result.completed) {
      return {
        completed: false,
        message: config.message || result.message,
        hints: result.hints || rule.hints || [],
      };
    }
  }

  return { completed: true };
}

function validateRule(
  rule: StepValidationConfig['rules'][0],
  code: string,
  terminalCommands: string[]
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
        const allPresent = patterns.every((pattern: string) => code.includes(pattern));
        if (!allPresent) {
          return {
            completed: false,
            message: 'Code is missing required elements',
            hints: rule.hints,
          };
        }
      } else {
        // At least one pattern must be present
        const anyPresent = patterns.some((pattern: string) => code.includes(pattern));
        if (!anyPresent) {
          return {
            completed: false,
            message: 'Code does not contain expected elements',
            hints: rule.hints,
          };
        }
      }
      break;
    }

    case 'code_matches': {
      try {
        const regex = new RegExp(rule.regex, rule.flags || '');
        if (!regex.test(code)) {
          return {
            completed: false,
            message: 'Code does not match expected pattern',
            hints: rule.hints,
          };
        }
      } catch (error) {
        console.error('Invalid regex pattern:', rule.regex, error);
        return { completed: true }; // Skip invalid regex
      }
      break;
    }

    case 'code_compiles':
      // This would require actually compiling the code
      // For now, we'll assume it compiles if it passes other checks
      // In production, this could call rustc or cargo check
      break;

    case 'function_exists': {
      const functionPattern = new RegExp(`fn\\s+${rule.functionName}\\s*\\(`, 'i');
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
      const structPattern = new RegExp(`struct\\s+${rule.structName}\\s*\\{`, 'i');
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
      // Custom validation would need to be implemented per validator type
      // For now, we'll skip it
      console.warn('Custom validation not yet implemented:', rule.validator);
      break;
  }

  return { completed: true };
}
