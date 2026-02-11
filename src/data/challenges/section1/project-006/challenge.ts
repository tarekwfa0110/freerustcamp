import { PracticeProject } from '@/types/challenge';

export const challenge_project_006: PracticeProject = {
    id: 'project-006',
    title: 'Learn Error Handling by Building a File Processor',
    section: 1,
    type: 'practice',
    estimated_time: 120,
    difficulty: 'beginner',
    concepts_taught: [
      'Result',
      'match',
      'io_errors',
      'expect_unwrap',
      'process_exit',
      'stderr',
      'file_io',
    ],
    project_overview: `In this project, you will build a small CLI tool that reads a text file and prints simple statistics (lines and words). You will handle missing input and file errors in a clear, user-friendly way.`,
    why_this_project: `Real programs interact with the outside world. Reading a file is a simple way to practice Rust error handling because file operations can fail for many reasons (missing file, permissions, invalid path).`,
    prerequisites: [
      'Completed: Learn Enums by Building a Traffic Light Simulator',
      'Comfort with if and match',
    ],
    preview: {
      mode: 'onLoad',
      title: 'File Processor',
      description: 'Read a file, handle errors, and print line/word counts.',
      example_output: `$ cargo run -- demo
File Processor
Lines: 2
Words: 3

$ cargo run
Usage: file_processor <path|demo>

$ cargo run -- missing.txt
Error: Could not read file "missing.txt": No such file or directory (os error 2)`,
    },
    steps: [
      {
        id: 'step-1',
        step: 1,
        title: 'Create the project',
        instruction: `You will build a small command-line program. Starting with Cargo gives you a standard layout and keeps build and run commands consistent across machines.`,
        task: `Run:

\`\`\`bash
cargo new file_processor
\`\`\``,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo new',
              projectSpecific: 'file_processor',
              hints: ['Run: cargo new file_processor'],
            },
          ],
          message: 'Create the file_processor project',
        },
        test: ['file_processor directory exists'],
        what_you_learned: `Cargo creates a runnable Rust project structure.`,
      },
      {
        id: 'step-2',
        step: 2,
        title: 'Enter the project folder',
        instruction: `Changing into the project folder ensures Cargo can find the correct \`Cargo.toml\` when you run commands.`,
        task: `Run:

\`\`\`bash
cd file_processor
\`\`\``,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cd file_processor',
              hints: ['Run: cd file_processor'],
            },
          ],
          message: 'Change into the file_processor folder',
        },
        test: ['Terminal in file_processor directory'],
        what_you_learned: `Cargo uses your current folder to locate a project.`,
      },
      {
        id: 'step-3',
        step: 3,
        title: 'Run the starter program',
        instruction: `Before you add new behavior, run the starter program once. This confirms your setup works and gives you a known-good starting point.`,
        task: `Run:

\`\`\`bash
cargo run
\`\`\``,
        starterCode: `fn main() {\n    println!("Hello, world!");\n}`,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Run: cargo run'],
            },
          ],
          message: 'Run the starter program',
        },
        test: ['Program was run'],
        what_you_learned: `cargo run compiles and executes the program.`,
      },
      {
        id: 'step-4',
        step: 4,
        title: 'Print a header',
        instruction: `A header makes output easier to recognize, especially when you are testing multiple cases.`,
        task: `In \`main\`, print this line:

\`\`\`text
File Processor
\`\`\``,
        starterCode: `fn main() {\n\n}`,
        highlightLine: 2,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['println!("File Processor");'],
              allRequired: true,
              hints: ['Add: println!("File Processor");'],
            },
          ],
          message: 'Print the header line',
        },
        test: ['Header is printed'],
        what_you_learned: `println! is a simple way to confirm the program reached a point in your code.`,
      },
      {
        id: 'step-5',
        step: 5,
        title: 'Collect command-line args',
        instruction: `Command-line arguments are the values typed after \`cargo run --\`. Rust exposes them through \`std::env::args()\`.

You will collect them into a \`Vec<String>\` so you can access positions like \`args[1]\` and \`args[2]\`.

Reminder: \`args[0]\` is the program name. The first user argument starts at \`args[1]\`.`,
        task: `At the top of the file, import \`std::env\`. Then, in \`main\`, create:

\`\`\`rust
let args: Vec<String> = env::args().collect();
\`\`\``,
        starterCode: `fn main() {\n    println!("File Processor");\n\n}`,
        highlightLine: 1,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['use std::env;', 'let args: Vec<String> = env::args().collect();'],
              allRequired: true,
              hints: ['Import env and collect args into Vec<String>'],
            },
          ],
          message: 'Import env and collect args',
        },
        test: ['Args collected'],
        what_you_learned: `Collecting args into a Vec makes them easy to index by position.`,
      },
      {
        id: 'step-6',
        step: 6,
        title: 'Validate input and show usage',
        instruction: `Programs should fail early when required input is missing. Checking argument count lets you stop before you make unsafe assumptions.

A non-zero exit code signals an error to the operating system and to scripts that call your tool.`,
        task: `If the user did not provide a path argument, print this usage line and exit with code 1:

\`\`\`text
Usage: file_processor <path|demo>
\`\`\`

This should run when \`args.len() < 2\`.`,
        starterCode: `use std::env;\n\nfn main() {\n    println!("File Processor");\n\n    let args: Vec<String> = env::args().collect();\n\n}`,
        highlightLine: 8,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['if args.len() < 2', 'println!("Usage: file_processor <path|demo>")'],
              allRequired: true,
              hints: ['Check args.len() < 2 and print the usage line'],
            },
            {
              type: 'code_contains',
              patterns: ['process::exit(1)'],
              allRequired: true,
              hints: ['Call process::exit(1) inside the if block'],
            },
            {
              type: 'code_contains',
              patterns: ['use std::process;'],
              allRequired: true,
              hints: ['Import std::process at the top of the file'],
            },
          ],
          message: 'Print usage and exit when input is missing',
        },
        test: ['Usage and exit for missing input'],
        what_you_learned: `Exit codes communicate success (0) or failure (non-zero).`,
      },
      {
        id: 'step-7',
        step: 7,
        title: 'Store the requested path',
        instruction: `Once you know the argument is present, you can store it in a variable with a clear name. Using \`&args[1]\` borrows the string instead of cloning it.

This keeps the program efficient and avoids unnecessary allocations.`,
        task: `Create a variable named \`path_arg\` set to \`&args[1]\`.`,
        starterCode: `use std::env;\nuse std::process;\n\nfn main() {\n    println!("File Processor");\n\n    let args: Vec<String> = env::args().collect();\n\n    if args.len() < 2 {\n        println!("Usage: file_processor <path|demo>");\n        process::exit(1);\n    }\n\n}`,
        highlightLine: 13,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let path_arg = &args[1];'],
              allRequired: true,
              hints: ['Add: let path_arg = &args[1];'],
            },
          ],
          message: 'Store the path argument',
        },
        test: ['path_arg created'],
        what_you_learned: `Borrowing with & lets you reuse a String without cloning it.`,
      },
      {
        id: 'step-8',
        step: 8,
        title: 'Import fs and create a read function',
        instruction: `Reading a file can fail, so Rust returns a \`Result\`. \`Result<T, E>\` is either \`Ok(T)\` (success) or \`Err(E)\` (failure).

We will put file reading into a helper function so \`main\` stays focused on flow and messaging.`,
        task: `Import \`std::fs\`. Then add a function above \`main\`:

- Name: \`read_file\`
- Parameters: \`path: &str\`
- Return type: \`Result<String, std::io::Error>\`

In the body, return \`fs::read_to_string(path)\`.`,
        starterCode: `use std::env;\nuse std::process;\n\nfn main() {\n    println!("File Processor");\n\n    let args: Vec<String> = env::args().collect();\n\n    if args.len() < 2 {\n        println!("Usage: file_processor <path|demo>");\n        process::exit(1);\n    }\n\n    let path_arg = &args[1];\n}`,
        highlightLine: 3,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['use std::fs;'],
              allRequired: true,
              hints: ['Add: use std::fs;'],
            },
            {
              type: 'code_matches',
              regex:
                'fn\\s+read_file\\s*\\(\\s*path\\s*:\\s*&str\\s*\\)\\s*->\\s*(Result\\s*<\\s*String\\s*,\\s*std::io::Error\\s*>|std::io::Result\\s*<\\s*String\\s*>)',
              hints: ['Define read_file(path: &str) -> Result<String, std::io::Error> (or std::io::Result<String>)'],
            },
            {
              type: 'code_contains',
              patterns: ['fs::read_to_string(path)'],
              allRequired: true,
              hints: ['Return fs::read_to_string(path) from the function'],
            },
          ],
          message: 'Create a helper that returns Result',
        },
        test: ['read_file exists'],
        what_you_learned: `Result makes failures explicit and forces you to handle them.`,
      },
      {
        id: 'step-9',
        step: 9,
        title: 'Handle the Result with match',
        instruction: `To use a \`Result\`, you must decide what to do in both cases. \`match\` is the most direct way to handle \`Ok\` and \`Err\`.

For errors, print a clear message and exit with a non-zero code. Use \`eprintln!\` for error output (stderr).`,
        task: `Call \`read_file(path_arg)\` and \`match\` on the result.

- In \`Ok(content)\`, store the content in a variable.
- In \`Err(err)\`, print this pattern and exit 1:

\`\`\`text
Error: Could not read file "<path>": <error>
\`\`\`

Use \`eprintln!\` and include both \`path_arg\` and \`err\` in the message.`,
        starterCode: `use std::env;\nuse std::fs;\nuse std::process;\n\nfn read_file(path: &str) -> Result<String, std::io::Error> {\n    fs::read_to_string(path)\n}\n\nfn main() {\n    println!("File Processor");\n\n    let args: Vec<String> = env::args().collect();\n\n    if args.len() < 2 {\n        println!("Usage: file_processor <path|demo>");\n        process::exit(1);\n    }\n\n    let path_arg = &args[1];\n\n}`,
        highlightLine: 22,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['match read_file(path_arg)', 'Ok(content)', 'Err(err)', 'eprintln!("Error: Could not read file'],
              allRequired: true,
              hints: ['Match on read_file(path_arg) and handle Ok and Err'],
            },
            {
              type: 'code_contains',
              patterns: ['process::exit(1)'],
              allRequired: true,
              hints: ['Exit with process::exit(1) in the Err branch'],
            },
          ],
          message: 'Handle Ok and Err explicitly',
        },
        test: ['Result is handled with match'],
        what_you_learned: `match forces you to write behavior for both success and failure.`,
      },
      {
        id: 'step-10',
        step: 10,
        title: 'Count lines and words',
        instruction: `Once you have the file content as a string, you can compute simple statistics.

- \`lines()\` splits by line boundaries.
- \`split_whitespace()\` splits by whitespace and ignores extra spaces.

Both return iterators, and \`count()\` turns them into a number.`,
        task: `Using \`content\`, create two variables:

- \`lines\` set to \`content.lines().count()\`
- \`words\` set to \`content.split_whitespace().count()\``,
        starterCode: `use std::env;\nuse std::fs;\nuse std::process;\n\nfn read_file(path: &str) -> Result<String, std::io::Error> {\n    fs::read_to_string(path)\n}\n\nfn main() {\n    println!("File Processor");\n\n    let args: Vec<String> = env::args().collect();\n\n    if args.len() < 2 {\n        println!("Usage: file_processor <path|demo>");\n        process::exit(1);\n    }\n\n    let path_arg = &args[1];\n\n    let content = match read_file(path_arg) {\n        Ok(content) => content,\n        Err(err) => {\n            eprintln!("Error: Could not read file "{}": {}", path_arg, err);\n            process::exit(1);\n        }\n    };\n\n}`,
        highlightLine: 31,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['content.lines().count()', 'content.split_whitespace().count()'],
              allRequired: true,
              hints: ['Create lines and words using lines().count() and split_whitespace().count()'],
            },
          ],
          message: 'Compute line and word counts',
        },
        test: ['Line and word counts exist'],
        what_you_learned: `Iterators let you process text without manual loops for common cases.`,
      },
      {
        id: 'step-11',
        step: 11,
        title: 'Print the counts',
        instruction: `Once you have the numbers, print them in a predictable format. Keeping output consistent makes testing easier.

These lines are designed to be easy to scan and copy into bug reports if something looks wrong.`,
        task: `Print these two lines (with the numbers filled in):

\`\`\`text
Lines: 2
Words: 3
\`\`\``,
        starterCode: `use std::env;\nuse std::fs;\nuse std::process;\n\nfn read_file(path: &str) -> Result<String, std::io::Error> {\n    fs::read_to_string(path)\n}\n\nfn main() {\n    println!("File Processor");\n\n    let args: Vec<String> = env::args().collect();\n\n    if args.len() < 2 {\n        println!("Usage: file_processor <path|demo>");\n        process::exit(1);\n    }\n\n    let path_arg = &args[1];\n\n    let content = match read_file(path_arg) {\n        Ok(content) => content,\n        Err(err) => {\n            eprintln!("Error: Could not read file "{}": {}", path_arg, err);\n            process::exit(1);\n        }\n    };\n\n    let lines = content.lines().count();\n    let words = content.split_whitespace().count();\n\n}`,
        highlightLine: 34,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['println!("Lines: {}", lines)', 'println!("Words: {}", words)'],
              allRequired: true,
              hints: ['Print lines and words with println!("Lines: {}", lines) and println!("Words: {}", words)'],
            },
          ],
          message: 'Print the line and word counts',
        },
        test: ['Counts are printed'],
        what_you_learned: `Clear output is part of good error handling and good tooling.`,
      },
      {
        id: 'step-12',
        step: 12,
        title: 'Add a demo mode',
        instruction: `In a real environment, you would pass a real path. In this learning environment, it is useful to have a built-in demo mode so you can test the success path without creating files manually.

When the argument is \`demo\`, you will create a small file and then process it. This keeps the rest of the program unchanged.`,
        task: `Change \`path_arg\` into an owned \`String\` named \`path\` (clone \`args[1]\`).

If \`path == "demo"\`, write a file named \`demo.txt\` with two lines of text, then set \`path\` to \`"demo.txt"\`.

Use \`fs::write\` and \`expect("Could not write demo file")\`.`,
        starterCode: `use std::env;\nuse std::fs;\nuse std::process;\n\nfn read_file(path: &str) -> Result<String, std::io::Error> {\n    fs::read_to_string(path)\n}\n\nfn main() {\n    println!("File Processor");\n\n    let args: Vec<String> = env::args().collect();\n\n    if args.len() < 2 {\n        println!("Usage: file_processor <path|demo>");\n        process::exit(1);\n    }\n\n    let path_arg = &args[1];\n\n    let content = match read_file(path_arg) {\n        Ok(content) => content,\n        Err(err) => {\n            eprintln!("Error: Could not read file "{}": {}", path_arg, err);\n            process::exit(1);\n        }\n    };\n\n    let lines = content.lines().count();\n    let words = content.split_whitespace().count();\n\n    println!("Lines: {}", lines);\n    println!("Words: {}", words);\n}`,
        highlightLine: 19,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let mut path = args[1].clone()', 'if path == "demo"', 'fs::write', 'expect("Could not write demo file")', 'path = "demo.txt".to_string()'],
              allRequired: true,
              hints: ['Create let mut path = args[1].clone(); add demo write logic and set path = "demo.txt".to_string();'],
            },
          ],
          message: 'Implement demo mode using fs::write',
        },
        test: ['demo mode exists'],
        what_you_learned: `Cloning a String gives you owned data you can reassign.`,
      },
      {
        id: 'step-13',
        step: 13,
        title: 'Read using the new path variable',
        instruction: `Now that the path can change (demo mode), your read call should use the \`path\` variable.

Because \`read_file\` takes \`&str\`, borrow the string with \`&path\`.`,
        task: `Update your \`read_file\` call to use \`&path\` instead of the old \`path_arg\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['read_file(&path)'],
              allRequired: true,
              hints: ['Call read_file(&path)'],
            },
            {
              type: 'code_reject_patterns',
              patterns: ['read_file(path_arg)'],
              hints: ['Use the new path variable, not path_arg'],
            },
          ],
          message: 'Use path for reading',
        },
        test: ['Read uses path'],
        what_you_learned: `Borrowing &String as &str avoids moving the String.`,
      },
      {
        id: 'step-14',
        step: 14,
        title: 'Run the demo',
        instruction: `Test the success path by running demo mode. The program should create \`demo.txt\`, read it, and print the counts.`,
        task: `Run:

\`\`\`bash
cargo run -- demo
\`\`\``,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo run',
              projectSpecific: 'demo',
              hints: ['Run: cargo run -- demo'],
            },
          ],
          message: 'Run demo mode',
        },
        test: ['Demo run executed'],
        what_you_learned: `Testing the success path confirms your Result handling works.`,
      },
      {
        id: 'step-15',
        step: 15,
        title: 'Run an error case',
        instruction: `A good tool should handle failure clearly. Run the program with a path that does not exist.

You should see your error message and the program should exit with a non-zero code.`,
        task: `Run:

\`\`\`bash
cargo run -- missing.txt
\`\`\``,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo run',
              projectSpecific: 'missing.txt',
              hints: ['Run: cargo run -- missing.txt'],
            },
          ],
          message: 'Run an error case',
        },
        test: ['Error run executed'],
        what_you_learned: `Error handling is part of the program behavior, so you should test it directly.`,
      },
    ],
    completion_message: `Nice work. You read from a file, handled errors with Result, and produced clear output for both success and failure cases.`,
    extensions: `Try extending your file processor:
- Count characters and print the total
- Add a mode that prints the file in uppercase
- Create a custom error enum and use it as the Result error type
- Use the ? operator inside read_file and propagate errors`,
  };

