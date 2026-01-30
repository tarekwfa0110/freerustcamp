/**
 * Validation schema for data-driven step validation
 * Replaces hardcoded validation logic in step-validator.ts
 */

export type ValidationType = 
  | 'terminal_command'
  | 'code_contains'
  | 'code_matches'
  | 'code_compiles'
  | 'function_exists'
  | 'struct_exists'
  | 'custom';

export interface TerminalCommandValidation {
  type: 'terminal_command';
  command: string; // Pattern to match (e.g., "cargo new")
  projectSpecific?: string; // For project-specific commands (e.g., "temp_converter")
  hints: string[];
}

export interface CodeContainsValidation {
  type: 'code_contains';
  patterns: string[]; // Strings that must be in code
  allRequired?: boolean; // If true, all patterns must match; if false, any pattern matches
  hints: string[];
}

export interface CodeMatchesValidation {
  type: 'code_matches';
  regex: string; // Regex pattern to match
  flags?: string; // Regex flags (e.g., "i" for case-insensitive)
  hints: string[];
}

export interface CodeCompilesValidation {
  type: 'code_compiles';
  hints: string[];
}

export interface FunctionExistsValidation {
  type: 'function_exists';
  functionName: string;
  hints: string[];
}

export interface StructExistsValidation {
  type: 'struct_exists';
  structName: string;
  fields?: string[]; // Expected fields
  hints: string[];
}

export interface CustomValidation {
  type: 'custom';
  validator: string; // Function name or identifier for custom validation
  hints: string[];
}

export type ValidationRule = 
  | TerminalCommandValidation
  | CodeContainsValidation
  | CodeMatchesValidation
  | CodeCompilesValidation
  | FunctionExistsValidation
  | StructExistsValidation
  | CustomValidation;

export interface StepValidationConfig {
  rules: ValidationRule[];
  message?: string; // Custom completion message
}
