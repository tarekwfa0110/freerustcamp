import { CertificationProject } from '@/types/challenge';

export const challenge_cert_001: CertificationProject = {
    id: 'cert-001',
    title: 'Build a Word Frequency Counter Project',
    section: 1,
    type: 'certification',
    estimated_time: 360,
    difficulty: 'intermediate',
    concepts: ['file_io', 'collections', 'iterators', 'error_handling', 'performance'],
    description: `**Objective:** Build a CLI tool that analyzes text files and counts word frequencies. The tool should handle large files efficiently, generate statistics, and provide formatted output.

**What This Tests:**

This project tests your mastery of:
- File I/O with error handling
- HashMap for efficient data storage
- Iterator chains for processing
- Performance optimization
- Professional error handling

**Why This Is Challenging:**

Unlike practice projects, you must:
- Design the architecture yourself
- Choose appropriate data structures
- Handle edge cases you discover through testing
- Meet performance requirements
- Write production-quality error handling

**Strategy Hints:**

Think about:
1. How will you store word counts efficiently?
2. How will you handle punctuation and case?
3. How will you find the top 10 without sorting everything?
4. How will you handle files that don't fit in memory?

Don't worry if you don't get it perfect first try - debugging and iteration are part of the process!`,
    requirements: {
      functional: [
        'Accept a file path as a command-line argument',
        'Count the frequency of each word in the file',
        'Ignore case when counting (treat "Hello" and "hello" as the same)',
        'Remove punctuation from words',
        'Display the top 10 most frequent words',
        'Show total word count and unique word count',
        'Handle files that don\'t exist with a clear error message',
        'Handle empty files gracefully',
      ],
      technical: [
        'Use HashMap for word counting',
        'Use iterators for processing (not manual loops)',
        'Handle files up to 100MB efficiently',
        'Process 1 million words in under 5 seconds',
        'Use proper error handling (Result, not unwrap)',
        'Zero compiler warnings',
        'Clean, readable code organization',
      ],
      quality: [
        'Helpful error messages',
        'Proper use of Rust idioms',
        'Efficient memory usage',
        'Code is well-commented where necessary',
      ],
    },
    example_output: `$ cargo run -- document.txt

Word Frequency Analysis
======================
Total words: 15,234
Unique words: 2,456

Top 10 Most Frequent Words:
  1. the      - 1,234 occurrences
  2. and      - 987 occurrences
  3. to       - 756 occurrences
  ...
`,
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
        name: 'accepts_file_argument',
        type: 'functional',
        description: 'Accepts file path as command-line argument',
        command: 'cargo run -- test.txt',
        expectedExitCode: 0,
      },
      {
        name: 'counts_words_correctly',
        type: 'functional',
        description: 'Counts word frequencies accurately',
      },
      {
        name: 'ignores_case',
        type: 'functional',
        description: 'Treats uppercase and lowercase as same word',
      },
      {
        name: 'removes_punctuation',
        type: 'functional',
        description: 'Removes punctuation from words before counting',
      },
      {
        name: 'shows_top_10',
        type: 'functional',
        description: 'Displays top 10 most frequent words',
      },
      {
        name: 'shows_total_count',
        type: 'functional',
        description: 'Shows total word count',
      },
      {
        name: 'shows_unique_count',
        type: 'functional',
        description: 'Shows unique word count',
      },
      {
        name: 'handles_missing_file',
        type: 'functional',
        description: 'Shows error for missing file',
        command: 'cargo run -- nonexistent.txt',
        expectedExitCode: 1,
      },
      {
        name: 'handles_empty_file',
        type: 'functional',
        description: 'Handles empty files gracefully',
      },
      {
        name: 'uses_hashmap',
        type: 'code_quality',
        description: 'Uses HashMap for word counting',
        check: "contains 'HashMap'",
      },
      {
        name: 'uses_iterators',
        type: 'code_quality',
        description: 'Uses iterator methods (not manual loops)',
      },
      {
        name: 'proper_error_handling',
        type: 'code_quality',
        description: 'Uses Result type, not unwrap/expect in main logic',
      },
      {
        name: 'performance_large_file',
        type: 'performance',
        description: 'Processes 1M words in under 5 seconds',
      },
    ],
    evaluation: [
      'All tests must pass',
      'Zero compiler warnings',
      'Code quality is professional',
      'Performance requirements met',
      'Error handling is robust',
      'Code follows Rust idioms',
    ],
  };

