import { CertificationProject } from '@/types/challenge';

export const challenge_cert_005: CertificationProject = {
    id: 'cert-005',
    title: 'Build a CLI Task Manager Project',
    section: 1,
    type: 'certification',
    estimated_time: 360,
    difficulty: 'advanced',
    concepts: [
      'CRUD',
      'persistence',
      'collections',
      'error_handling',
      'CLI_design',
      'data_structures',
    ],
    description: `**Objective:** Build a complete task management system with full CRUD operations, priority system, due dates, filtering, sorting, and persistent storage. This is the capstone project for Section 1.

**What This Tests:**

This project tests your mastery of:
- Complete CRUD operations
- Data persistence
- Complex filtering and sorting
- CLI design and user experience
- Data validation
- Error handling across a full application

**Why This Is Challenging:**

Unlike practice projects, you must:
- Design the entire system architecture
- Implement all CRUD operations correctly
- Create an intuitive CLI interface
- Handle data persistence reliably
- Support complex queries (filter + sort combinations)
- Validate all user input

**Strategy Hints:**

Think about:
1. What data structure best represents tasks?
2. How will you implement filtering and sorting together?
3. What file format will you use for persistence?
4. How will you design the CLI to be intuitive?
5. What validation is needed for dates and priorities?`,
    requirements: {
      functional: [
        'Add tasks with description, priority, and due date',
        'List all tasks with filtering options',
        'Update task properties (description, priority, due date, status)',
        'Delete tasks',
        'Mark tasks as complete/incomplete',
        'Filter by status (all, active, completed)',
        'Filter by priority',
        'Sort by due date, priority, or creation date',
        'Persist tasks to a file (JSON or custom format)',
        'Load tasks from file on startup',
        'Search tasks by description',
      ],
      technical: [
        'Use structs for task representation',
        'Use Vec or HashMap for storage',
        'File-based persistence',
        'Comprehensive error handling',
        'Clean CLI interface with subcommands',
        'Zero compiler warnings',
        'Well-organized code structure',
      ],
      quality: [
        'Intuitive command-line interface',
        'Helpful error messages',
        'Data validation',
        'Code follows Rust idioms',
        'Proper separation of concerns',
      ],
    },
    example_output: `$ cargo run -- add "Buy groceries" --priority high --due 2024-01-30
Task added successfully!

$ cargo run -- list
ID  Description        Priority  Due Date     Status
1   Buy groceries      High      2024-01-30   Active
2   Write report       Medium    2024-02-01   Active

$ cargo run -- complete 1
Task marked as complete!

$ cargo run -- list --filter completed
ID  Description        Priority  Due Date     Status
1   Buy groceries      High      2024-01-30   Completed
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
        name: 'adds_tasks',
        type: 'functional',
        description: 'Can add new tasks',
      },
      {
        name: 'lists_tasks',
        type: 'functional',
        description: 'Can list all tasks',
      },
      {
        name: 'updates_tasks',
        type: 'functional',
        description: 'Can update task properties',
      },
      {
        name: 'deletes_tasks',
        type: 'functional',
        description: 'Can delete tasks',
      },
      {
        name: 'marks_complete',
        type: 'functional',
        description: 'Can mark tasks as complete',
      },
      {
        name: 'filters_by_status',
        type: 'functional',
        description: 'Can filter by status',
      },
      {
        name: 'filters_by_priority',
        type: 'functional',
        description: 'Can filter by priority',
      },
      {
        name: 'sorts_tasks',
        type: 'functional',
        description: 'Can sort tasks by different criteria',
      },
      {
        name: 'persists_to_file',
        type: 'functional',
        description: 'Saves tasks to file',
      },
      {
        name: 'loads_from_file',
        type: 'functional',
        description: 'Loads tasks from file on startup',
      },
      {
        name: 'searches_tasks',
        type: 'functional',
        description: 'Can search tasks by description',
      },
      {
        name: 'validates_input',
        type: 'functional',
        description: 'Validates task data',
      },
      {
        name: 'handles_errors',
        type: 'functional',
        description: 'Handles errors gracefully',
      },
    ],
    evaluation: [
      'All tests must pass',
      'Zero compiler warnings',
      'Complete CRUD functionality',
      'Persistence works correctly',
      'Code quality is professional',
      'CLI is intuitive and well-designed',
    ],
  };

