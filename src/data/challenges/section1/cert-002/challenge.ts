import { CertificationProject } from '@/types/challenge';

export const challenge_cert_002: CertificationProject = {
    id: 'cert-002',
    title: 'Build a Log File Analyzer Project',
    section: 1,
    type: 'certification',
    estimated_time: 360,
    difficulty: 'intermediate',
    concepts: ['file_io', 'parsing', 'regex', 'collections', 'error_handling'],
    description: `**Objective:** Build a CLI tool that analyzes log files, parsing different log formats, filtering entries, and generating reports. The tool should handle various log formats and provide useful statistics.

**What This Tests:**

This project tests your mastery of:
- Pattern matching and parsing
- Regular expressions (regex)
- Complex data structures
- Filtering and searching algorithms
- Report generation

**Why This Is Challenging:**

Unlike practice projects, you must:
- Handle multiple input formats
- Design a flexible parsing system
- Implement efficient search and filter operations
- Generate readable reports
- Handle malformed log entries gracefully

**Strategy Hints:**

Think about:
1. How will you detect and parse different log formats?
2. What data structure will store parsed log entries?
3. How will you implement efficient filtering?
4. How will you format reports clearly?`,
    requirements: {
      functional: [
        'Accept log file path as argument',
        'Parse common log formats (Apache, Nginx, or custom)',
        'Count total lines, errors, warnings, info messages',
        'Find top 10 most frequent error messages',
        'Calculate errors per hour',
        'Filter logs by date range (if timestamps present)',
        'Display results in formatted table',
        'Handle missing/corrupt files gracefully',
      ],
      technical: [
        'Use regex for log parsing',
        'Handle files up to 500MB',
        'Process 100K log lines in under 3 seconds',
        'Use proper error handling',
        'Zero compiler warnings',
        'Efficient memory usage',
      ],
      quality: [
        'Clear error messages',
        'Well-organized code',
        'Proper use of Rust patterns',
      ],
    },
    tests: [
      {
        name: 'compiles_without_errors',
        type: 'compilation',
        description: 'Code must compile without errors',
      },
      {
        name: 'compiles_without_warnings',
        type: 'compilation',
        description: 'Code must compile without warnings',
      },
      {
        name: 'parses_log_format',
        type: 'functional',
        description: 'Correctly parses log file format',
      },
      {
        name: 'counts_by_severity',
        type: 'functional',
        description: 'Counts errors, warnings, info correctly',
      },
      {
        name: 'finds_top_errors',
        type: 'functional',
        description: 'Finds top 10 most frequent errors',
      },
      {
        name: 'calculates_errors_per_hour',
        type: 'functional',
        description: 'Calculates errors per hour correctly',
      },
      {
        name: 'handles_missing_file',
        type: 'functional',
        description: 'Shows error for missing file',
        expectedExitCode: 1,
      },
      {
        name: 'uses_regex',
        type: 'code_quality',
        description: 'Uses regex for parsing',
        check: "contains 'Regex'",
      },
      {
        name: 'performance_requirement',
        type: 'performance',
        description: 'Meets performance requirements',
      },
    ],
    evaluation: [
      'All tests must pass',
      'Zero compiler warnings',
      'Code quality is professional',
      'Performance requirements met',
    ],
  };

