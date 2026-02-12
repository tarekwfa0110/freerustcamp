import { CertificationProject } from '@/types/challenge';

export const challenge_cert_003: CertificationProject = {
    id: 'cert-003',
    title: 'Build a Configuration File Parser Project',
    section: 1,
    type: 'certification',
    estimated_time: 360,
    difficulty: 'intermediate',
    concepts: ['parsing', 'error_handling', 'validation', 'type_conversion'],
    description: `**Objective:** Build a parser for a custom configuration file format. The parser should validate input, convert types, and provide helpful error messages with line numbers.

**What This Tests:**

This project tests your mastery of:
- Serialization/deserialization
- Type conversion and validation
- Error message design
- Multiple format support
- Configuration management patterns

**Why This Is Challenging:**

Unlike practice projects, you must:
- Support multiple file formats
- Design a unified configuration interface
- Create clear, actionable error messages
- Handle type mismatches gracefully
- Validate configuration completeness

**Strategy Hints:**

Think about:
1. How will you abstract different formats behind a common interface?
2. What validation rules are needed?
3. How will you convert between types safely?
4. What makes an error message helpful?`,
    requirements: {
      functional: [
        'Parse key=value format',
        'Support comments (lines starting with #)',
        'Support sections [section_name]',
        'Validate required keys are present',
        'Convert string values to appropriate types (int, float, bool)',
        'Show error messages with line numbers',
        'Handle duplicate keys (error or override)',
        'Support quoted strings with spaces',
      ],
      technical: [
        'Custom parsing logic (no external parsing libraries)',
        'Comprehensive error messages',
        'Type conversion with validation',
        'Zero compiler warnings',
        'Proper error types',
      ],
    },
    tests: [
      {
        name: 'compiles_without_errors',
        type: 'compilation',
        description: 'Code must compile without errors',
      },
      {
        name: 'parses_key_value',
        type: 'functional',
        description: 'Parses key=value pairs correctly',
      },
      {
        name: 'handles_comments',
        type: 'functional',
        description: 'Ignores comment lines',
      },
      {
        name: 'handles_sections',
        type: 'functional',
        description: 'Parses section headers correctly',
      },
      {
        name: 'validates_required_keys',
        type: 'functional',
        description: 'Validates required keys are present',
      },
      {
        name: 'converts_types',
        type: 'functional',
        description: 'Converts string values to correct types',
      },
      {
        name: 'shows_line_numbers_in_errors',
        type: 'functional',
        description: 'Error messages include line numbers',
      },
      {
        name: 'handles_quoted_strings',
        type: 'functional',
        description: 'Supports quoted strings with spaces',
      },
    ],
    evaluation: [
      'All tests must pass',
      'Zero compiler warnings',
      'Error messages are helpful',
      'Code is well-organized',
    ],
  };

