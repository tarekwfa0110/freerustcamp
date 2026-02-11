import { CertificationProject } from '@/types/challenge';

export const challenge_cert_004: CertificationProject = {
    id: 'cert-004',
    title: 'Build a File Backup Tool Project',
    section: 1,
    type: 'certification',
    estimated_time: 360,
    difficulty: 'intermediate',
    concepts: ['file_io', 'directories', 'recursion', 'error_handling', 'progress'],
    description: `**Objective:** Build a tool that creates backups of files and directories. The tool should support recursive directory copying, progress reporting, error recovery, and resume capability.

**What This Tests:**

This project tests your mastery of:
- Recursive directory traversal
- File I/O operations
- Progress reporting
- Error recovery strategies
- State management for resume functionality

**Why This Is Challenging:**

Unlike practice projects, you must:
- Handle deeply nested directory structures
- Provide real-time progress feedback
- Design a resume mechanism
- Handle partial failures gracefully
- Optimize for large file operations

**Strategy Hints:**

Think about:
1. How will you traverse directories recursively?
2. How will you track progress across many files?
3. How will you implement resume (what state to save)?
4. How will you handle errors without stopping the entire backup?`,
    requirements: {
      functional: [
        'Copy files from source to destination',
        'Recursively copy directories',
        'Preserve file permissions and timestamps (if possible)',
        'Show progress during copy operation',
        'Handle errors gracefully (continue on non-critical errors)',
        'Support resume (skip already-copied files)',
        'Create destination directory if it doesn\'t exist',
        'Show summary of copied files and errors',
      ],
      technical: [
        'Recursive directory traversal',
        'Progress reporting (files copied, bytes copied)',
        'Error recovery (continue on errors)',
        'Resume capability',
        'Handle large files efficiently',
        'Zero compiler warnings',
      ],
    },
    tests: [
      {
        name: 'compiles_without_errors',
        type: 'compilation',
        description: 'Code must compile without errors',
      },
      {
        name: 'copies_files',
        type: 'functional',
        description: 'Copies files correctly',
      },
      {
        name: 'copies_directories_recursively',
        type: 'functional',
        description: 'Recursively copies directories',
      },
      {
        name: 'shows_progress',
        type: 'functional',
        description: 'Shows progress during copy',
      },
      {
        name: 'handles_errors_gracefully',
        type: 'functional',
        description: 'Continues on non-critical errors',
      },
      {
        name: 'supports_resume',
        type: 'functional',
        description: 'Skips already-copied files on resume',
      },
      {
        name: 'creates_destination_directory',
        type: 'functional',
        description: 'Creates destination if it doesn\'t exist',
      },
      {
        name: 'shows_summary',
        type: 'functional',
        description: 'Shows summary of operation',
      },
    ],
    evaluation: [
      'All tests must pass',
      'Zero compiler warnings',
      'Error handling is robust',
      'Progress reporting is clear',
    ],
  };

