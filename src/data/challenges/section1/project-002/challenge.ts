import { PracticeProject } from '@/types/challenge';

export const challenge_project_002: PracticeProject = {
    id: 'project-002',
    title: 'Learn Functions by Building a Calculator',
    section: 1,
    type: 'practice',
    estimated_time: 60,
    difficulty: 'beginner',
    concepts_taught: ['functions', 'parameters', 'return_types', 'match', 'arithmetic', 'command_line_args'],
    project_overview: `In this project, you'll build a command-line calculator. You'll practice writing functions, passing parameters, returning values, and selecting behavior with \`match\`.`,
    why_this_project: `A calculator is small enough to finish quickly, but it forces you to design clean function signatures and handle user input safely.`,
    prerequisites: [
      'Completed: Learn Variables by Building a Temperature Converter',
      'Understanding of basic arithmetic operations',
    ],
    preview: {
      mode: 'onLoad',
      title: 'Calculator',
      description: 'Build a CLI calculator that supports +, -, *, and / and reports errors clearly.',
      example_output: `$ cargo run -- 10 + 5\n10 + 5 = 15.00\n\n$ cargo run -- 10 / 4\n10 / 4 = 2.50\n\n$ cargo run -- 10 / 0\nError: Division by zero.\n\n$ cargo run -- 5 ^ 2\nError: Invalid operation '^'. Use +, -, *, or /.\n\n$ cargo run\nUsage: calculator <num1> <operator> <num2>`,
    },
    steps: [
      {
        id: 'step-0',
        step: 0,
        title: 'Understand what you\'re building',
        instruction: `Welcome! In this project, you'll build a command-line calculator that performs basic arithmetic operations.

**What you're building:**
A Rust program that reads two numbers and an operator from the command line, performs the calculation, and prints the result. For example:
- Input: \`cargo run -- 10 + 5\` â†’ Output: \`10 + 5 = 15.00\`
- Input: \`cargo run -- 20 / 4\` â†’ Output: \`20 / 4 = 5.00\`
- Input: \`cargo run -- 10 / 0\` â†’ Output: \`Error: Division by zero.\`

**Why this project?**
Functions are the building blocks of Rust programs. By building a calculator, you'll learn how to define functions, organize code, use pattern matching, and handle errors gracefully.

**Calculator operations:**
Your calculator will support four basic operations:

| Operation | Symbol | Example | Result |
|-----------|--------|---------|--------|
| Addition | + | 10 + 5 | 15.00 |
| Subtraction | - | 20 - 8 | 12.00 |
| Multiplication | * | 6 * 7 | 42.00 |
| Division | / | 20 / 4 | 5.00 |

**Special cases:**
- Division by zero returns an error (not a crash)
- Invalid operators show a helpful error message
- Missing arguments show usage instructions

Don't worry about memorizing everything. You'll build this step by step, and each step will explain the concepts as you use them.`,
        task: `Read through this introduction to understand what you'll build. When you're ready, click "Next" to start creating your project!`,
        starterCode: `// Welcome to your calculator project!
// You'll build a functional calculator step by step.
// Click "Next" when you're ready to begin.`,
        test: ['Introduction read'],
        what_you_learned: `You understand what you're building: a practical calculator that will teach you Rust functions and pattern matching.`,
      },
      {
        id: 'step-1',
        step: 1,
        title: 'Create the project',
        instruction: `Cargo is Rust's standard build tool. It creates a working project layout so you can focus on code instead of setup.\n\nWhen you run \`cargo new\`, Cargo creates \`src/main.rs\` (your program) and \`Cargo.toml\` (project metadata).`,
        task: `Run \`cargo new calculator\` in the terminal.`,
        starterCode: `fn main() {\n\n}`,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo new',
              projectSpecific: 'calculator',
              hints: ['Run: cargo new calculator'],
            },
          ],
          message: 'Create the calculator project',
        },
        test: ['Project directory created'],
        what_you_learned: `Cargo scaffolds a Rust project with a standard structure.`,
      },
      {
        id: 'step-2',
        step: 2,
        title: 'Enter the project folder',
        instruction: `Cargo commands run against the nearest \`Cargo.toml\`. Entering the project folder ensures \`cargo run\` builds the right code.`,
        task: `Run \`cd calculator\` in the terminal to enter the project directory.`,
        starterCode: `fn main() {\n\n}`,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cd calculator',
              hints: ['Run: cd calculator'],
            },
          ],
          message: 'Enter the calculator folder',
        },
        test: ['Terminal in calculator directory'],
        what_you_learned: `Cargo uses your current directory to find the project it should build.`,
      },
      {
        id: 'step-3',
        step: 3,
        title: 'Run the starter program',
        instruction: `Rust starts executing in the \`main\` function. The \`cargo run\` command compiles your program and then runs it so you can see output immediately.`,
        task: `Run \`cargo run\` in the terminal to compile and execute the starter program.`,
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
        what_you_learned: `cargo run builds and executes your program from main.`,
      },
      {
        id: 'step-4',
        step: 4,
        title: 'Print a header',
        instruction: `CLI programs often print a short header so output is easy to recognize.\n\nExample:\n\n\`\`\`rust\nprintln!("My Tool");\n\`\`\`\n\nThis is especially helpful once your program prints multiple lines.`,
        task: `In \`main\`, print the text "Calculator" using \`println!\`.`,
        starterCode: `fn main() {\n\n}`,
        highlightLine: 2,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['println!'],
              allRequired: true,
              hints: ['Add a println! statement'],
            },
            {
              type: 'code_contains',
              patterns: ['"Calculator"'],
              allRequired: true,
              hints: [
                'Print the text "Calculator"',
                'Check spelling: should be "Calculator" (capital C)',
              ],
            },
            {
              type: 'code_matches',
              regex: 'println!("Calculator");',
              hints: [
                'Add: println!("Calculator");',
                'Make sure you have quotes around Calculator and a semicolon at the end',
              ],
            },
          ],
          message: 'Add the header line',
        },
        test: ['Header is printed'],
        what_you_learned: `println! writes a line of text to stdout.`,
      },
      {
        id: 'step-5',
        step: 5,
        title: 'Define an add function',
        instruction: `Functions let you name a piece of logic and reuse it. In Rust, you define a function with \`fn\` followed by a name.\n\nExample:\n\n\`\`\`rust\nfn greet() {\n    println!("Hello!");\n}\n\`\`\`\n\nWe'll start with an \`add\` function and grow it into a real calculator. Functions help organize code and make it easier to test and maintain.`,
        task: `Above \`main\`, add an empty function named \`add\`.`,
        starterCode: `fn main() {\n    println!("Calculator");\n\n}`,
        highlightLine: 1,
        validation: {
          rules: [
            {
              type: 'code_matches',
              regex: 'fn\\s+add\\s*\\(\\s*\\)\\s*\\{',
              hints: ['Add: fn add() { } above main'],
            },
          ],
          message: 'Define add()',
        },
        test: ['add() exists'],
        what_you_learned: `Functions help you organize code into reusable pieces.`,
      },
      {
        id: 'step-6',
        step: 6,
        title: 'Add parameters (a and b)',
        instruction: `Parameters are inputs to a function. In Rust, every parameter has a name and a type.\n\nExample:\n\n\`\`\`rust\nfn full_name(first: &str, last: &str) {\n    println!("{} {}", first, last);\n}\n\`\`\`\n\nWe'll use \`f64\` (64-bit floating-point) so operations like division can produce decimals. This lets you calculate things like 10 / 3 = 3.33 instead of just 3.`,
        task: `Update \`add\` to accept two parameters: \`a: f64\` and \`b: f64\`.`,
        starterCode: `fn add() {\n\n}\n\nfn main() {\n    println!("Calculator");\n}`,
        highlightLine: 1,
        validation: {
          rules: [
            {
              type: 'code_matches',
              regex: 'fn\\s+add\\s*\\(\\s*a\\s*:\\s*f64\\s*,\\s*b\\s*:\\s*f64\\s*\\)',
              hints: [
                'Update the signature to: fn add(a: f64, b: f64)',
                'Check spacing: a: f64 (space after colon) or a:f64 (no space) both work',
              ],
            },
          ],
          message: 'Add parameters to add()',
        },
        test: ['add takes parameters'],
        what_you_learned: `Parameter types let Rust validate function calls at compile time.`,
      },
      {
        id: 'step-7',
        step: 7,
        title: 'Return a value from add()',
        instruction: `Rust function return types use \`->\` followed by the type. Inside the body, the last expression becomes the return value if it does not end with a semicolon.\n\nYou can return values in two common ways:\n- **Implicit return:** the last expression without a semicolon is returned.\n- **Explicit return:** use the \`return\` keyword to exit early.\n\nExample:\n\n\`\`\`rust\nfn is_positive(n: i32) -> bool {\n    if n <= 0 {\n        return false;\n    }\n\n    true\n}\n\`\`\`\n\nNotice the last line \`true\` has no semicolon, so it returns implicitly. That is Rust's expression-based syntax.`,
        task: `Make \`add\` return an \`f64\`, and return \`a + b\` from the function body.`,
        starterCode: `fn add(a: f64, b: f64) {\n\n}\n\nfn main() {\n    println!("Calculator");\n}`,
        highlightLine: 2,
        validation: {
          rules: [
            {
              type: 'code_matches',
              regex: 'fn\\s+add\\s*\\(\\s*a\\s*:\\s*f64\\s*,\\s*b\\s*:\\s*f64\\s*\\)\\s*->\\s*f64',
              hints: [
                'Add return type -> f64 to the function signature',
                'Function should be: fn add(a: f64, b: f64) -> f64',
                'Check spacing: a: f64 (space after colon) or a:f64 (no space) both work',
              ],
            },
            {
              type: 'code_contains',
              patterns: ['a + b'],
              allRequired: true,
              hints: [
                'Return a + b from the function body',
                'Make sure the last expression is a + b (no semicolon)',
                'Check: should be a + b, not a+b or a+b;',
              ],
            },
            {
              type: 'code_matches',
              regex: 'fn\\s+add[^}]*a\\s*\\+\\s*b[^}]*\\}',
              flags: 's',
              hints: [
                'Function should return a + b as the last expression',
                'Make sure a + b is in the function body and has no semicolon',
              ],
            },
          ],
          message: 'Return a value from add()',
        },
        test: ['add returns a + b'],
        what_you_learned: `Rust can return the last expression in a function without the return keyword.`,
      },
      {
        id: 'step-8',
        step: 8,
        title: 'Add subtract and multiply',
        instruction: `Once you have one operation working, you can repeat the same pattern to build a small toolbox of functions. Keeping the same signature (same parameter types and return type) makes the functions easy to swap and combine.\n\nExample:\n\n\`\`\`rust\nfn double(x: f64) -> f64 {\n    x * 2.0\n}\n\`\`\``,
        task: `Add two functions above \`main\`: \`subtract\` and \`multiply\`. Each should take \`(a: f64, b: f64)\` and return an \`f64\`.`,
        starterCode: `fn add(a: f64, b: f64) -> f64 {\n    a + b\n}\n\nfn main() {\n    println!("Calculator");\n}`,
        highlightLine: 5,
        validation: {
          rules: [
            {
              type: 'function_exists',
              functionName: 'subtract',
              hints: [
                'Make sure you created a function named subtract',
                'Place subtract() above main, like add()',
              ],
            },
            {
              type: 'code_matches',
              regex: 'fn\\s+subtract\\s*\\(\\s*a\\s*:\\s*f64\\s*,\\s*b\\s*:\\s*f64\\s*\\)\\s*->\\s*f64\\s*\\{',
              flags: 's',
              hints: [
                'subtract() should take a: f64 and b: f64',
                'Check the colon after each parameter name: a: f64, b: f64',
                'Return type should be -> f64',
              ],
            },
            {
              type: 'function_exists',
              functionName: 'multiply',
              hints: [
                'Make sure you created a function named multiply',
                'Place multiply() above main, like add()',
              ],
            },
            {
              type: 'code_matches',
              regex: 'fn\\s+multiply\\s*\\(\\s*a\\s*:\\s*f64\\s*,\\s*b\\s*:\\s*f64\\s*\\)\\s*->\\s*f64\\s*\\{',
              flags: 's',
              hints: [
                'multiply() should take a: f64 and b: f64',
                'Check the colon after each parameter name: a: f64, b: f64',
                'Return type should be -> f64',
              ],
            },
          ],
          message: 'Add subtract() and multiply()',
        },
        test: ['subtract and multiply exist'],
        what_you_learned: `A consistent function signature makes functions easy to swap and combine.`,
      },
      {
        id: 'step-9',
        step: 9,
        title: 'Add a divide function',
        instruction: `Division is another operation that fits the same function pattern you already used for add and subtract.\n\nExample:\n\n\`\`\`rust\nfn half(value: f64) -> f64 {\n    value / 2.0\n}\n\`\`\`\n\nFor now, we will return an \`f64\` directly, just like the other operations.`,
        task: `Add \`divide\` that takes \`(a: f64, b: f64)\` and returns \`f64\`.`,
        starterCode: `fn add(a: f64, b: f64) -> f64 {\n    a + b\n}\n\nfn subtract(a: f64, b: f64) -> f64 {\n    a - b\n}\n\nfn multiply(a: f64, b: f64) -> f64 {\n    a * b\n}\n\nfn main() {\n    println!("Calculator");\n}`,
        highlightLine: 13,
        validation: {
          rules: [
            {
              type: 'function_exists',
              functionName: 'divide',
              hints: [
                'Make sure the function name is divide (check spelling)',
                'Place divide() above main, like add()',
              ],
            },
            {
              type: 'code_matches',
              regex: 'fn\\s+divide\\s*\\(\\s*a\\s*:\\s*f64\\s*,\\s*b\\s*:\\s*f64\\s*\\)\\s*->\\s*f64\\s*\\{',
              flags: 's',
              hints: [
                'divide() should take a: f64 and b: f64',
                'Check the colon after each parameter name: a: f64, b: f64',
                'Return type should be -> f64',
              ],
            },
          ],
          message: 'Add divide()',
        },
        test: ['divide exists'],
        what_you_learned: `Division follows the same function signature pattern as add and subtract.`,
      },
      {
        id: 'step-10',
        step: 10,
        title: 'Refactor divide for safety',
        instruction: `Division has an extra edge case: dividing by zero is mathematically undefined. In Rust, dividing by zero with floating-point numbers produces inf (infinity) or NaN (not a number). These values are misleading because they look like valid numbers but represent errors. If your code continues with inf or NaN, calculations become meaningless and bugs can silently propagate.\n\n**What is Option<T>?**\n\n\`Option<T>\` is Rust's built-in way to represent "a value that might not exist." It's an enum with exactly two variants:\n- \`Some(value)\` when you have a valid value of type T\n- \`None\` when there's no valid value\n\nThe T is a type parameter. For \`Option<f64>\`, T is f64, meaning "an optional floating-point number."\n\n**When to use Option<T>?**\n\nUse \`Option<T>\` whenever a function might not be able to return a valid result. Common cases include:\n- Operations that can fail (like division by zero)\n- Looking up values that might not exist (like finding an item in a list)\n- Parsing input that might be invalid\n- Any situation where "no result" is a valid, expected outcome\n\n**Why use Option<T>?**\n\nIn many languages, functions return special "sentinel" values (like -1, null, or NaN) to indicate failure. This is error-prone because:\n1. Sentinel values look like valid data, so bugs slip through\n2. You can forget to check for the error case\n3. The compiler can't help you remember to handle failures\n\n\`Option<T>\` solves these problems:\n- **Type safety:** \`None\` is not the same type as f64, so you can't accidentally treat it as a number\n- **Forced handling:** Rust won't compile code that uses an \`Option\` value without checking which variant it is\n- **Clear intent:** The return type explicitly says "this might fail," making the code self-documenting\n\n**What problems does Option<T> prevent?**\n\n1. **Silent failures:** You can't ignore \`None\`â€”the compiler forces you to handle it\n2. **Type confusion:** You can't accidentally use \`None\` as if it were a number\n3. **Forgotten error checks:** The type system reminds you to check for the error case\n4. **Invalid state propagation:** Errors are caught at the source, not spread through calculations\n\nExample:\n\n\`\`\`rust\nfn safe_ratio(top: f64, bottom: f64) -> Option<f64> {\n    if bottom == 0.0 {\n        None\n    } else {\n        Some(top / bottom)\n    }\n}\n\`\`\`\n\nThis function makes it impossible to get an invalid result. The caller must check if they got \`Some(value)\` or \`None\` before using the result. For now, we're just updating the function signature and return values. Later steps will show how to handle the \`Option\` result when calling divide.`,
        task: `Update \`divide\` to return \`Option<f64>\` instead of \`f64\`. Check if \`b == 0.0\`. If true, return \`None\`. Otherwise, return \`Some(a / b)\`.`,
        starterCode: `fn add(a: f64, b: f64) -> f64 {\n    a + b\n}\n\nfn subtract(a: f64, b: f64) -> f64 {\n    a - b\n}\n\nfn multiply(a: f64, b: f64) -> f64 {\n    a * b\n}\n\nfn divide(a: f64, b: f64) -> f64 {\n    a / b\n}\n\nfn main() {\n    println!("Calculator");\n}`,
        highlightLine: 13,
        validation: {
          rules: [
            {
              type: 'function_exists',
              functionName: 'divide',
              hints: [
                'Make sure divide() still exists',
                'Do not remove divide() when refactoring',
              ],
            },
            {
              type: 'code_contains',
              patterns: ['if b == 0.0', 'None', 'Some('],
              allRequired: true,
              hints: [
                'Return None when b == 0.0',
                'Return Some(a / b) or Some(a/b) for normal division',
              ],
            },
            {
              type: 'code_matches',
              regex: 'fn\\s+divide\\s*\\(\\s*a\\s*:\\s*f64\\s*,\\s*b\\s*:\\s*f64\\s*\\)\\s*->\\s*Option<f64>',
              hints: [
                'Update the return type to Option<f64>',
                'Function signature should be: fn divide(a: f64, b: f64) -> Option<f64>',
                'Check spacing: a: f64 (space after colon) or a:f64 (no space) both work',
              ],
            },
            {
              type: 'code_matches',
              regex: 'Some\\(a\\s*/\\s*b\\)',
              hints: [
                'Return Some(a / b) or Some(a/b) for normal division',
                'Make sure you return Some(...) with the division result a / b',
              ],
            },
          ],
          message: 'Refactor divide() for safety',
        },
        test: ['divide returns Option<f64>'],
        what_you_learned: `Option is a lightweight way to represent "might not have a value".`,
      },
      {
        id: 'step-11',
        step: 11,
        title: 'Choose an operation with match',
        instruction: `Your calculator needs to pick which operation to run based on the operator string from the user. \`match\` is Rust's way to check a value against multiple possibilities and run different code for each case.\n\nThe syntax is:\n\n\`\`\`rust\nmatch value {\n    pattern1 => expression1,\n    pattern2 => expression2,\n    _ => default_expression,\n}\n\`\`\`\n\nEach line is called an "arm." The pattern on the left is compared to the value. If it matches, the expression on the right runs. The \`_\` pattern matches anything that hasn't been matched yet, so it's perfect for handling unknown or default cases.\n\nExample:\n\n\`\`\`rust\nfn get_status_code(status: &str) -> u32 {\n    match status {\n        "ok" => 200,\n        "not_found" => 404,\n        "error" => 500,\n        _ => 0,\n    }\n}\n\`\`\`\n\nThis matches a status string and returns the corresponding HTTP code. The \`_\` arm handles any status not listed.\n\n**What you need to do:**\n\nCreate a \`calculate\` function that takes \`op: &str\` and two numbers. Use \`match\` on op to call the right function:\n- "+" â†’ call \`add(a, b)\`\n- "-" â†’ call \`subtract(a, b)\`\n- "*" â†’ call \`multiply(a, b)\`\n- "/" â†’ call \`divide(a, b)\`\n- \`_\` â†’ return \`None\` for unknown operators\n\n**Important:** \`calculate\` must return \`Option<f64>\`. Since \`divide\` already returns \`Option<f64>\`, call it directly. But add, subtract, and multiply return f64, so wrap their results in \`Some(...)\` to convert them to \`Option<f64>\`.`,
        task: `Add \`calculate(op: &str, a: f64, b: f64) -> Option<f64>\` above \`main\`. Use \`match op\` with four arms: \`"+"\` calls \`add(a, b)\` wrapped in \`Some(...)\`, \`"-"\` calls \`subtract(a, b)\` wrapped in \`Some(...)\`, \`"*"\` calls \`multiply(a, b)\` wrapped in \`Some(...)\`, and \`"/"\` calls \`divide(a, b)\` directly. Add a \`_\` arm that returns \`None\`.`,
        starterCode: `fn add(a: f64, b: f64) -> f64 {\n    a + b\n}\n\nfn subtract(a: f64, b: f64) -> f64 {\n    a - b\n}\n\nfn multiply(a: f64, b: f64) -> f64 {\n    a * b\n}\n\nfn divide(a: f64, b: f64) -> Option<f64> {\n    if b == 0.0 {\n        None\n    } else {\n        Some(a / b)\n    }\n}\n\nfn main() {\n    println!("Calculator");\n}`,
        highlightLine: 17,
        validation: {
          rules: [
            {
              type: 'function_exists',
              functionName: 'calculate',
              hints: [
                'Create a function named calculate',
                'Make sure the function name is calculate (check spelling)',
              ],
            },
            {
              type: 'code_matches',
              regex: 'fn\\s+calculate\\s*\\(\\s*op\\s*:\\s*&str\\s*,\\s*a\\s*:\\s*f64\\s*,\\s*b\\s*:\\s*f64\\s*\\)\\s*->\\s*Option<f64>',
              hints: [
                'Function signature should be: fn calculate(op: &str, a: f64, b: f64) -> Option<f64>',
                'Check spacing: a: f64 (space after colon) or a:f64 (no space) both work',
                'Return type should be -> Option<f64>',
              ],
            },
            {
              type: 'code_contains',
              patterns: ['match op'],
              allRequired: true,
              hints: [
                'Use match on op',
                'Add: match op { ... }',
              ],
            },
            {
              type: 'code_contains',
              patterns: ['"+"'],
              allRequired: true,
              hints: [
                'Add a match arm for "+"',
                'Handle the "+" operator case',
              ],
            },
            {
              type: 'code_contains',
              patterns: ['"-"'],
              allRequired: true,
              hints: [
                'Add a match arm for "-"',
                'Handle the "-" operator case',
              ],
            },
            {
              type: 'code_contains',
              patterns: ['"*"'],
              allRequired: true,
              hints: [
                'Add a match arm for "*"',
                'Handle the "*" operator case',
              ],
            },
            {
              type: 'code_contains',
              patterns: ['"/"'],
              allRequired: true,
              hints: [
                'Add a match arm for "/"',
                'Handle the "/" operator case',
              ],
            },
            {
              type: 'code_contains',
              patterns: ['_ =>'],
              allRequired: true,
              hints: [
                'Add a catch-all arm with _ =>',
                'Handle unknown operators with _ => None',
              ],
            },
            {
              type: 'code_contains',
              patterns: ['Some(add(', 'Some(subtract(', 'Some(multiply('],
              allRequired: false,
              hints: [
                'Wrap add, subtract, and multiply results in Some(...)',
                'Since these return f64, wrap them: Some(add(a, b))',
              ],
            },
            {
              type: 'code_contains',
              patterns: ['divide(a, b)'],
              allRequired: true,
              hints: [
                'Call divide(a, b) directly (it already returns Option<f64>)',
                'For division, just call divide(a, b) without wrapping',
              ],
            },
          ],
          message: 'Add calculate() with match',
        },
        test: ['calculate uses match'],
        what_you_learned: `match makes branching explicit and easy to extend.`,
      },
      {
        id: 'step-12',
        step: 12,
        title: 'Import env and process',
        instruction: `We'll read inputs from the command line and exit cleanly on errors.\n\nExample:\n\n\`\`\`rust\nuse std::cmp::Ordering;\nuse std::fmt;\n\`\`\`\n\n- \`std::env\` provides \`args()\` for reading command-line arguments.\n- \`std::process\` provides \`exit()\` for terminating the program with an exit code.`,
        task: `Add \`use std::env;\` and \`use std::process;\` at the top of the file, above your function definitions.`,
        starterCode: `fn add(a: f64, b: f64) -> f64 {\n    a + b\n}\n\nfn subtract(a: f64, b: f64) -> f64 {\n    a - b\n}\n\nfn multiply(a: f64, b: f64) -> f64 {\n    a * b\n}\n\nfn divide(a: f64, b: f64) -> Option<f64> {\n    if b == 0.0 {\n        None\n    } else {\n        Some(a / b)\n    }\n}\n\nfn calculate(op: &str, a: f64, b: f64) -> Option<f64> {\n    match op {\n        "+" => Some(add(a, b)),\n        "-" => Some(subtract(a, b)),\n        "*" => Some(multiply(a, b)),\n        "/" => divide(a, b),\n        _ => None,\n    }\n}\n\nfn main() {\n    println!("Calculator");\n}`,
        highlightLine: 1,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['use std::env;', 'use std::process;'],
              allRequired: true,
              hints: ['Add: use std::env; and use std::process; at the top'],
            },
          ],
          message: 'Add imports',
        },
        test: ['Imports added'],
        what_you_learned: `Imports bring modules into scope so you can use their functions.`,
      },
      {
        id: 'step-13',
        step: 13,
        title: 'Collect command-line arguments',
        instruction: `\`env::args()\` returns an iterator of strings. Collecting into a \`Vec<String>\` stores them so you can access by index.\n\nExample:\n\n\`\`\`rust\nlet parts: Vec<String> = env::args().collect();\n\`\`\`\n\nIndex 0 is the program name (like "calculator"). User input starts at index 1. So \`args[1]\` is the first number, \`args[2]\` is the operator, and \`args[3]\` is the second number.`,
        task: `In \`main\`, collect the args into a \`Vec<String>\` named \`args\`.`,
        starterCode: `use std::env;\nuse std::process;\n\nfn add(a: f64, b: f64) -> f64 {\n    a + b\n}\n\nfn subtract(a: f64, b: f64) -> f64 {\n    a - b\n}\n\nfn multiply(a: f64, b: f64) -> f64 {\n    a * b\n}\n\nfn divide(a: f64, b: f64) -> Option<f64> {\n    if b == 0.0 {\n        None\n    } else {\n        Some(a / b)\n    }\n}\n\nfn calculate(op: &str, a: f64, b: f64) -> Option<f64> {\n    match op {\n        "+" => Some(add(a, b)),\n        "-" => Some(subtract(a, b)),\n        "*" => Some(multiply(a, b)),\n        "/" => divide(a, b),\n        _ => None,\n    }\n}\n\nfn main() {\n    println!("Calculator");\n\n\n}`,
        highlightLine: 39,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let args'],
              allRequired: true,
              hints: ['Add a variable named args'],
            },
            {
              type: 'code_contains',
              patterns: ['Vec<String>'],
              allRequired: true,
              hints: [
                'args should be type Vec<String>',
                'Check: let args: Vec<String> = ...',
              ],
            },
            {
              type: 'code_contains',
              patterns: ['env::args().collect()'],
              allRequired: true,
              hints: [
                'Call env::args().collect() to collect the arguments',
                'Add: env::args().collect()',
              ],
            },
            {
              type: 'code_matches',
              regex: 'let\\s+args\\s*:\\s*Vec<String>\\s*=\\s*env::args\\(\\)\\.collect\\(\\);',
              hints: [
                'Add: let args: Vec<String> = env::args().collect();',
                'Make sure you have the semicolon at the end',
              ],
            },
          ],
          message: 'Collect args',
        },
        test: ['Args collected'],
        what_you_learned: `Collecting args into a Vec makes positional access possible.`,
      },
      {
        id: 'step-14',
        step: 14,
        title: 'Add a usage guard',
        instruction: `Before indexing args, guard against missing input. If the user does not provide 3 values (num1, operator, num2), print a usage line and exit with a non-zero code.\n\nExample:\n\n\`\`\`rust\nif args.len() < 3 {\n    println!("Usage: app <a> <b>");\n    process::exit(1);\n}\n\`\`\`\n\nThis prevents an "index out of bounds" panic and gives the user a clear fix. Good CLI programs always validate input before using it. Add this guard in \`main\`, right after collecting the args.`,
        task: `In \`main\`, right after collecting \`args\`, add an \`if\` statement. If \`args.len() < 4\`, print this usage message and exit with \`process::exit(1)\`:\n\n\`\`\`text\nUsage: calculator <num1> <operator> <num2>\n\`\`\`\n\nThen run \`cargo run\` to test the guard.`,
        starterCode: `use std::env;\nuse std::process;\n\nfn add(a: f64, b: f64) -> f64 {\n    a + b\n}\n\nfn subtract(a: f64, b: f64) -> f64 {\n    a - b\n}\n\nfn multiply(a: f64, b: f64) -> f64 {\n    a * b\n}\n\nfn divide(a: f64, b: f64) -> Option<f64> {\n    if b == 0.0 {\n        None\n    } else {\n        Some(a / b)\n    }\n}\n\nfn calculate(op: &str, a: f64, b: f64) -> Option<f64> {\n    match op {\n        "+" => Some(add(a, b)),\n        "-" => Some(subtract(a, b)),\n        "*" => Some(multiply(a, b)),\n        "/" => divide(a, b),\n        _ => None,\n    }\n}\n\nfn main() {\n    println!("Calculator");\n\n    let args: Vec<String> = env::args().collect();\n\n\n}`,
        highlightLine: 41,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['if args.len() < 4'],
              allRequired: true,
              hints: ['Add an if statement checking args.len() < 4'],
            },
            {
              type: 'code_contains',
              patterns: ['println!("Usage: calculator'],
              allRequired: true,
              hints: [
                'Missing usage message. Print: "Usage: calculator <num1> <operator> <num2>"',
                'Check spacing: the message should have spaces between <num1> <operator> <num2>',
                'The usage message should be: Usage: calculator <num1> <operator> <num2>',
              ],
            },
            {
              type: 'code_matches',
              regex: 'println!\\("Usage: calculator <num1> <operator> <num2>"\\)',
              hints: [
                'Usage message format incorrect. Should be: "Usage: calculator <num1> <operator> <num2>"',
                'Check spacing: there should be spaces between <num1> <operator> <num2>',
                'The exact message should be: Usage: calculator <num1> <operator> <num2>',
              ],
            },
            {
              type: 'code_contains',
              patterns: ['process::exit(1);'],
              allRequired: true,
              hints: ['Add process::exit(1); after printing the usage message'],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Run: cargo run'],
            },
          ],
          message: 'Add a usage guard and test it',
        },
        test: ['Usage guard exists', 'Program was run'],
        what_you_learned: `Guards prevent panics and improve error messages.`,
      },
      {
        id: 'step-15',
        step: 15,
        title: 'Parse the first number',
        instruction: `Command-line arguments arrive as strings. To use them for math, you need to convert them to numbers.\n\nThe \`parse()\` method converts a string into a number type. We'll use f64 for floating-point numbers so division works correctly. Use \`expect("Invalid number")\` to handle parsing errorsâ€”this message will be shown if the user provides a non-numeric value.\n\nExample:\n\n\`\`\`rust\nlet amount: f64 = args[2].parse().expect("Invalid amount");\n\`\`\`\n\nNotice the error message "Invalid amount" in the example. For your code, use the message "Invalid number".`,
        task: `Parse \`args[1]\` into an \`f64\` and store it in \`num1\`. Use \`parse().expect("Invalid number")\` to handle parsing errors.`,
        starterCode: `use std::env;\nuse std::process;\n\nfn add(a: f64, b: f64) -> f64 {\n    a + b\n}\n\nfn subtract(a: f64, b: f64) -> f64 {\n    a - b\n}\n\nfn multiply(a: f64, b: f64) -> f64 {\n    a * b\n}\n\nfn divide(a: f64, b: f64) -> Option<f64> {\n    if b == 0.0 {\n        None\n    } else {\n        Some(a / b)\n    }\n}\n\nfn calculate(op: &str, a: f64, b: f64) -> Option<f64> {\n    match op {\n        "+" => Some(add(a, b)),\n        "-" => Some(subtract(a, b)),\n        "*" => Some(multiply(a, b)),\n        "/" => divide(a, b),\n        _ => None,\n    }\n}\n\nfn main() {\n    println!("Calculator");\n\n    let args: Vec<String> = env::args().collect();\n\n    if args.len() < 4 {\n        println!("Usage: calculator <num1> <operator> <num2>");\n        process::exit(1);\n    }\n\n\n}`,
        highlightLine: 41,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let num1'],
              allRequired: true,
              hints: ['Add a variable named num1'],
            },
            {
              type: 'code_contains',
              patterns: ['args[1]'],
              allRequired: true,
              hints: [
                'Use args[1] to get the first number',
                'Check the index: should be args[1], not args[0]',
              ],
            },
            {
              type: 'code_contains',
              patterns: ['.parse()'],
              allRequired: true,
              hints: ['Call .parse() to convert the string to a number'],
            },
            {
              type: 'code_contains',
              patterns: ['.expect('],
              allRequired: true,
              hints: [
                'Call .expect() after .parse()',
                'Add: .parse().expect("...")',
              ],
            },
            {
              type: 'code_contains',
              patterns: ['expect("Invalid number")'],
              allRequired: true,
              hints: [
                'Error message should be "Invalid number"',
                'Use: .expect("Invalid number")',
                'Check: the exact message should be "Invalid number"',
              ],
            },
            {
              type: 'code_matches',
              regex: 'let\\s+num1\\s*:\\s*f64',
              hints: [
                'Missing type annotation. Add : f64 after num1',
                'Should be: let num1: f64 = ...',
                'The type annotation : f64 is required',
              ],
            },
            {
              type: 'code_matches',
              regex: 'let\\s+num1\\s*:\\s*f64\\s*=\\s*args\\[1\\]\\.parse\\(\\)\\.expect\\("Invalid number"\\)',
              hints: [
                'Full line should be: let num1: f64 = args[1].parse().expect("Invalid number");',
                'Check: type annotation : f64 is present',
                'Check: using args[1] (index 1, not 0)',
                'Check: error message is exactly "Invalid number"',
              ],
            },
          ],
          message: 'Parse the first number',
        },
        test: ['First number parsed'],
        what_you_learned: `parse() converts strings into numbers. expect() handles errors by printing a message and exiting.`,
      },
      {
        id: 'step-16',
        step: 16,
        title: 'Read the operator',
        instruction: `The operator is a string that tells us which calculation to perform. We don't need to parse it since \`match\` works with strings.\n\nExample:\n\n\`\`\`rust\nlet operation = &args[1];\n\`\`\`\n\nWe'll read it directly from \`args[2]\` as a string slice. Notice that we don't need to write a type annotation hereâ€”Rust can infer that op is \`&str\` from the \`&args[2]\` expression.`,
        task: `Read the operator from \`args[2]\` and store it in \`op\`. Use \`&args[2]\` to get a string slice. No type annotation is neededâ€”Rust will infer the type.`,
        starterCode: `use std::env;\nuse std::process;\n\nfn add(a: f64, b: f64) -> f64 {\n    a + b\n}\n\nfn subtract(a: f64, b: f64) -> f64 {\n    a - b\n}\n\nfn multiply(a: f64, b: f64) -> f64 {\n    a * b\n}\n\nfn divide(a: f64, b: f64) -> Option<f64> {\n    if b == 0.0 {\n        None\n    } else {\n        Some(a / b)\n    }\n}\n\nfn calculate(op: &str, a: f64, b: f64) -> Option<f64> {\n    match op {\n        "+" => Some(add(a, b)),\n        "-" => Some(subtract(a, b)),\n        "*" => Some(multiply(a, b)),\n        "/" => divide(a, b),\n        _ => None,\n    }\n}\n\nfn main() {\n    println!("Calculator");\n\n    let args: Vec<String> = env::args().collect();\n\n    if args.len() < 4 {\n        println!("Usage: calculator <num1> <operator> <num2>");\n        process::exit(1);\n    }\n\n    let num1: f64 = args[1].parse().expect("Invalid number");\n\n\n}`,
        highlightLine: 43,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let op'],
              allRequired: true,
              hints: ['Add a variable named op'],
            },
            {
              type: 'code_contains',
              patterns: ['args[2]'],
              allRequired: true,
              hints: [
                'Use args[2] to get the operator',
                'Check the index: should be args[2], not args[1]',
              ],
            },
            {
              type: 'code_contains',
              patterns: ['&args[2]'],
              allRequired: true,
              hints: [
                'Use &args[2] to get a string slice',
                'Add the & reference operator: &args[2]',
              ],
            },
            {
              type: 'code_matches',
              regex: 'let\\s+op\\s*=\\s*&args\\[2\\];',
              hints: [
                'Add: let op = &args[2];',
                'Check: use args[2] (index 2, not 1)',
                'Make sure you have the & reference operator',
              ],
            },
          ],
          message: 'Read the operator',
        },
        test: ['Operator read'],
        what_you_learned: `String slices (&str) work directly with match expressions.`,
      },
      {
        id: 'step-17',
        step: 17,
        title: 'Parse the second number',
        instruction: `Just like the first number, we need to parse the second number from a string into an f64. Use the same error message "Invalid number" as you did for num1.\n\nExample:\n\n\`\`\`rust\nlet price: f64 = args[3].parse().expect("Invalid price");\n\`\`\`\n\nNotice the example uses "Invalid price". For your code, use "Invalid number" (the same message you used for num1).`,
        task: `Parse \`args[3]\` into an \`f64\` and store it in \`num2\`. Use \`parse().expect("Invalid number")\` to handle parsing errors.`,
        starterCode: `use std::env;\nuse std::process;\n\nfn add(a: f64, b: f64) -> f64 {\n    a + b\n}\n\nfn subtract(a: f64, b: f64) -> f64 {\n    a - b\n}\n\nfn multiply(a: f64, b: f64) -> f64 {\n    a * b\n}\n\nfn divide(a: f64, b: f64) -> Option<f64> {\n    if b == 0.0 {\n        None\n    } else {\n        Some(a / b)\n    }\n}\n\nfn calculate(op: &str, a: f64, b: f64) -> Option<f64> {\n    match op {\n        "+" => Some(add(a, b)),\n        "-" => Some(subtract(a, b)),\n        "*" => Some(multiply(a, b)),\n        "/" => divide(a, b),\n        _ => None,\n    }\n}\n\nfn main() {\n    println!("Calculator");\n\n    let args: Vec<String> = env::args().collect();\n\n    if args.len() < 4 {\n        println!("Usage: calculator <num1> <operator> <num2>");\n        process::exit(1);\n    }\n\n    let num1: f64 = args[1].parse().expect("Invalid number");\n    let op = &args[2];\n\n\n}`,
        highlightLine: 45,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let num2'],
              allRequired: true,
              hints: ['Add a variable named num2'],
            },
            {
              type: 'code_contains',
              patterns: ['args[3]'],
              allRequired: true,
              hints: [
                'Use args[3] to get the second number',
                'Check the index: should be args[3], not args[2]',
              ],
            },
            {
              type: 'code_contains',
              patterns: ['.parse()'],
              allRequired: true,
              hints: ['Call .parse() to convert the string to a number'],
            },
            {
              type: 'code_contains',
              patterns: ['.expect('],
              allRequired: true,
              hints: [
                'Call .expect() after .parse()',
                'Add: .parse().expect("...")',
              ],
            },
            {
              type: 'code_contains',
              patterns: ['expect("Invalid number")'],
              allRequired: true,
              hints: [
                'Error message should be "Invalid number"',
                'Use: .expect("Invalid number")',
                'Check: the exact message should be "Invalid number"',
              ],
            },
            {
              type: 'code_matches',
              regex: 'let\\s+num2\\s*:\\s*f64',
              hints: [
                'Missing type annotation. Add : f64 after num2',
                'Should be: let num2: f64 = ...',
                'The type annotation : f64 is required',
              ],
            },
            {
              type: 'code_matches',
              regex: 'let\\s+num2\\s*:\\s*f64\\s*=\\s*args\\[3\\]\\.parse\\(\\)\\.expect\\("Invalid number"\\)',
              hints: [
                'Full line should be: let num2: f64 = args[3].parse().expect("Invalid number");',
                'Check: type annotation : f64 is present',
                'Check: using args[3] (index 3, not 2)',
                'Check: error message is exactly "Invalid number"',
              ],
            },
          ],
          message: 'Parse the second number',
        },
        test: ['Second number parsed'],
        what_you_learned: `Parsing follows the same pattern for both numbers.`,
      },
      {
        id: 'step-18',
        step: 18,
        title: 'Call calculate with the inputs',
        instruction: `Now that you have all three inputs parsed, you can call your \`calculate\` function.\n\nExample:\n\n\`\`\`rust\nlet answer = calculate(op, left, right);\n\`\`\`\n\nPass the operator and both numbers to calculate, and store the result in a variable.`,
        task: `Call \`calculate(op, num1, num2)\` and store the result in \`result\`.`,
        starterCode: `use std::env;\nuse std::process;\n\nfn add(a: f64, b: f64) -> f64 {\n    a + b\n}\n\nfn subtract(a: f64, b: f64) -> f64 {\n    a - b\n}\n\nfn multiply(a: f64, b: f64) -> f64 {\n    a * b\n}\n\nfn divide(a: f64, b: f64) -> Option<f64> {\n    if b == 0.0 {\n        None\n    } else {\n        Some(a / b)\n    }\n}\n\nfn calculate(op: &str, a: f64, b: f64) -> Option<f64> {\n    match op {\n        "+" => Some(add(a, b)),\n        "-" => Some(subtract(a, b)),\n        "*" => Some(multiply(a, b)),\n        "/" => divide(a, b),\n        _ => None,\n    }\n}\n\nfn main() {\n    println!("Calculator");\n\n    let args: Vec<String> = env::args().collect();\n\n    if args.len() < 4 {\n        println!("Usage: calculator <num1> <operator> <num2>");\n        process::exit(1);\n    }\n\n    let num1: f64 = args[1].parse().expect("Invalid number");\n    let op = &args[2];\n    let num2: f64 = args[3].parse().expect("Invalid number");\n\n\n}`,
        highlightLine: 47,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let result'],
              allRequired: true,
              hints: ['Add a variable named result'],
            },
            {
              type: 'code_contains',
              patterns: ['calculate('],
              allRequired: true,
              hints: ['Call the calculate function'],
            },
            {
              type: 'code_contains',
              patterns: ['op, num1, num2'],
              allRequired: true,
              hints: [
                'Pass op, num1, and num2 to calculate',
                'Check the order: calculate(op, num1, num2)',
              ],
            },
            {
              type: 'code_matches',
              regex: 'let\\s+result\\s*=\\s*calculate\\s*\\(\\s*op\\s*,\\s*num1\\s*,\\s*num2\\s*\\);',
              hints: [
                'Add: let result = calculate(op, num1, num2);',
                'Check: pass op, num1, num2 in that order',
                'Make sure you have the semicolon at the end',
              ],
            },
          ],
          message: 'Call calculate() with the inputs',
        },
        test: ['calculate() called'],
        what_you_learned: `Functions let you organize logic and reuse it with different inputs.`,
      },
      {
        id: 'step-19',
        step: 19,
        title: 'Print the result',
        instruction: `You have the calculation result in result, but it's wrapped in \`Option<f64>\`. You need to check if it's \`Some(value)\` and then print it.\n\nAdd a \`match\` statement right after \`let result = ...\`. Match on result with two arms:\n- \`Some(value) => println!("{} {} {} = {:.2}", num1, op, num2, value)\`\n- \`None => {}\` (empty for now)\n\n**Important:** Don't put a semicolon after \`println!\` in the match arm. Match arms are expressions, not statements.\n\n**How the println! format string works:**\n\nThe format string \`"{} {} {} = {:.2}"\` has four placeholders:\n- First \`{}\` prints num1 (the first number)\n- Second \`{}\` prints op (the operator like "+" or "-")\n- Third \`{}\` prints num2 (the second number)\n- \`{:.2}\` prints value formatted to exactly 2 decimal places\n\nThe colon starts format options, and .2 means "show 2 decimal places". So 42.0 becomes 42.00, and 10.5 stays 10.50. This makes division results look consistent.\n\nExample output: 25 + 17 = 42.00 or 10 / 3 = 3.33`,
        task: `Add a \`match result\` statement. In the \`Some(value)\` arm, print: \`println!("{} {} {} = {:.2}", num1, op, num2, value)\` (no semicolon after it). In the \`None\` arm, write an empty block \`{}\`. Then run \`cargo run -- 25 + 17\` to test it.`,
        starterCode: `use std::env;\nuse std::process;\n\nfn add(a: f64, b: f64) -> f64 {\n    a + b\n}\n\nfn subtract(a: f64, b: f64) -> f64 {\n    a - b\n}\n\nfn multiply(a: f64, b: f64) -> f64 {\n    a * b\n}\n\nfn divide(a: f64, b: f64) -> Option<f64> {\n    if b == 0.0 {\n        None\n    } else {\n        Some(a / b)\n    }\n}\n\nfn calculate(op: &str, a: f64, b: f64) -> Option<f64> {\n    match op {\n        "+" => Some(add(a, b)),\n        "-" => Some(subtract(a, b)),\n        "*" => Some(multiply(a, b)),\n        "/" => divide(a, b),\n        _ => None,\n    }\n}\n\nfn main() {\n    println!("Calculator");\n\n    let args: Vec<String> = env::args().collect();\n\n    if args.len() < 4 {\n        println!("Usage: calculator <num1> <operator> <num2>");\n        process::exit(1);\n    }\n\n    let num1: f64 = args[1].parse().expect("Invalid number");\n    let op = &args[2];\n    let num2: f64 = args[3].parse().expect("Invalid number");\n\n    let result = calculate(op, num1, num2);\n\n\n}`,
        highlightLine: 55,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['match result'],
              allRequired: true,
              hints: ['Match on the result variable'],
            },
            {
              type: 'code_contains',
              patterns: ['Some(value)'],
              allRequired: true,
              hints: [
                'Handle the Some(value) case',
                'Add an arm for Some(value) => ...',
              ],
            },
            {
              type: 'code_contains',
              patterns: ['println!'],
              allRequired: true,
              hints: ['Print the result in the Some(value) case'],
            },
            {
              type: 'code_contains',
              patterns: ['{:.2}'],
              allRequired: true,
              hints: [
                'Format the result to two decimal places using {:.2}',
                'Use {:.2} in the println! format string',
              ],
            },
            {
              type: 'code_contains',
              patterns: ['num1', 'op', 'num2', 'value'],
              allRequired: true,
              hints: [
                'Print num1, op, num2, and value',
                'Include all four values in the println! statement',
              ],
            },
            {
              type: 'code_matches',
              regex: 'Some\\(\\s*value\\s*\\)\\s*=>\\s*println!\\("\\{\\}\\s+\\{\\}\\s+\\{\\}\\s+=\\s+\\{:\\.2\\}"\\s*,\\s*num1\\s*,\\s*op\\s*,\\s*num2\\s*,\\s*value\\s*\\)\\s*[,\\}]',
              hints: [
                'Match arm should be: Some(value) => println!("{} {} {} = {:.2}", num1, op, num2, value)',
                'Do not put a semicolon after println! in the match arm',
                'Check: should end with ) followed by comma or closing brace, not semicolon',
                'If you have a semicolon, remove it: Some(value) => println!(...); should be Some(value) => println!(...)',
              ],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              projectSpecific: '25 + 17',
              hints: ['Run: cargo run -- 25 + 17'],
            },
          ],
          message: 'Print the result and test it',
        },
        test: ['Result is printed', 'Program was run'],
        what_you_learned: `Formatting output makes CLI programs easier to read.`,
      },
      {
        id: 'step-20',
        step: 20,
        title: 'Handle errors and exit',
        instruction: `When \`calculate\` returns \`None\`, something went wrong. It could be division by zero or an invalid operator.\n\nThe \`None\` variant from \`Option<f64>\` means the calculation couldn't produce a valid result. Understanding why this happens and how to handle it properly is crucial for building robust CLI applications.\n\n**Why Option<T> for error handling?**\n\nWhen \`calculate\` returns \`None\`, it's telling you "I couldn't compute a valid answer." This is different from returning a number like \`-1\` or \`0\` to indicate an error, because those are still valid numbers. With \`Option<f64>\`, the type system forces you to check whether you got a value or notâ€”you can't accidentally treat an error as a valid result.\n\n**The two error cases:**\n\n1. **Division by zero:** When the user tries to divide by zero (e.g., \`100 / 0\`), the \`divide\` function detects this and returns \`None\` instead of producing invalid values. In Rust, dividing by zero with floating-point numbers produces \`inf\` (infinity) or \`NaN\` (not a number), which are misleading because they look like valid numbers but represent errors. By returning \`None\`, we prevent these invalid values from propagating through calculations and causing silent bugs.\n\n2. **Invalid operator:** When the user provides an operator that isn't +, -, *, or / (e.g., \`%\` or \`^\`), the \`calculate\` function's \`_\` pattern matches and returns \`None\`. This is the "catch-all" case for unknown operators.\n\n**Why distinguish between the cases?**\n\nDifferent error cases deserve different error messages. A user who types \`100 / 0\` made a logical error (dividing by zero), while a user who types \`100 % 3\` made a different kind of error (using an unsupported operator). Clear, specific error messages help users understand what went wrong and how to fix it.\n\n**Error handling structure:**\n\nYou'll use an \`if\` statement inside the \`None\` arm to check the specific error condition. First, check if it's division by zero by verifying both conditions: \`op == "/"\` (the operator is division) AND \`num2 == 0.0\` (the divisor is zero). Both must be true for it to be a division-by-zero error. If this condition is true, print the division-by-zero error message. Otherwise, handle it as an invalid operator case in the \`else\` branch.\n\n**Exiting with error codes:**\n\nAfter printing the error message, call \`process::exit(1)\` to exit the program with a non-zero exit code. Exit codes are a standard way for programs to communicate success or failure to the shell and other programs:\n\n- Exit code \`0\` means success\n- Non-zero exit codes (like \`1\`) mean failure\n\nThis is important because scripts and other programs can check the exit code to determine if your program succeeded. For example, a shell script might run your calculator and only continue if it succeeds: \`calculator 5 + 3 && echo "Success!"\`. If your program exits with code \`1\`, the shell knows it failed and won't run the next command.\n\n**CLI error handling best practices:**\n\nGood CLI programs follow these principles:\n- Print clear, actionable error messages that tell users what went wrong\n- Use specific messages for different error types (don't just say "error occurred")\n- Exit with appropriate exit codes so other programs can detect failures\n- Print errors to standard error (stderr) in production, though \`println!\` to stdout is fine for learning\n\nBy handling errors explicitly and providing clear feedback, you're building a professional-quality tool that users can trust and rely on.`,
        task: `In the \`None\` arm, add an \`if\` statement. If \`op == "/"\` and \`num2 == 0.0\`, print:\n\n\`\`\`text\nError: Division by zero.\n\`\`\`\n\nOtherwise, print:\n\n\`\`\`text\nError: Invalid operation '{}'. Use +, -, *, or /.\n\`\`\`\n\n(Use \`op\` in the format string to show the invalid operator.)\n\nAfter printing, call \`process::exit(1)\`. Then run \`cargo run -- 100 / 0\` to test division by zero, and \`cargo run -- 5 % 3\` to test invalid operator.`,
        starterCode: `use std::env;\nuse std::process;\n\nfn add(a: f64, b: f64) -> f64 {\n    a + b\n}\n\nfn subtract(a: f64, b: f64) -> f64 {\n    a - b\n}\n\nfn multiply(a: f64, b: f64) -> f64 {\n    a * b\n}\n\nfn divide(a: f64, b: f64) -> Option<f64> {\n    if b == 0.0 {\n        None\n    } else {\n        Some(a / b)\n    }\n}\n\nfn calculate(op: &str, a: f64, b: f64) -> Option<f64> {\n    match op {\n        "+" => Some(add(a, b)),\n        "-" => Some(subtract(a, b)),\n        "*" => Some(multiply(a, b)),\n        "/" => divide(a, b),\n        _ => None,\n    }\n}\n\nfn main() {\n    println!("Calculator");\n\n    let args: Vec<String> = env::args().collect();\n\n    if args.len() < 4 {\n        println!("Usage: calculator <num1> <operator> <num2>");\n        process::exit(1);\n    }\n\n    let num1: f64 = args[1].parse().expect("Invalid number");\n    let op = &args[2];\n    let num2: f64 = args[3].parse().expect("Invalid number");\n\n    let result = calculate(op, num1, num2);\n\n    match result {\n        Some(value) => println!("{} {} {} = {:.2}", num1, op, num2, value),\n        None => {\n\n        }\n    }\n}`,
        highlightLine: 54,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['None =>'],
              allRequired: true,
              hints: ['Handle the None case in the match statement'],
            },
            {
              type: 'code_contains',
              patterns: ['op == "/"'],
              allRequired: true,
              hints: [
                'Check if op equals "/"',
                'Add: if op == "/" && num2 == 0.0',
              ],
            },
            {
              type: 'code_contains',
              patterns: ['num2 == 0.0'],
              allRequired: true,
              hints: [
                'Check if num2 equals 0.0',
                'Add: if op == "/" && num2 == 0.0',
              ],
            },
            {
              type: 'code_contains',
              patterns: ['println!("Error: Division by zero.")'],
              allRequired: true,
              hints: [
                'Print: "Error: Division by zero." (with a period at the end)',
                'Check spelling and punctuation: Error: Division by zero.',
                'The exact message should be: println!("Error: Division by zero.")',
              ],
            },
            {
              type: 'code_contains',
              patterns: ['println!("Error: Invalid operation'],
              allRequired: true,
              hints: [
                'Print an error message for invalid operations',
                'Message should start with "Error: Invalid operation',
              ],
            },
            {
              type: 'code_contains',
              patterns: ['Use +, -, *, or /'],
              allRequired: true,
              hints: [
                'Include the list of valid operators in the error message',
                'Message should include: Use +, -, *, or /',
              ],
            },
            {
              type: 'code_contains',
              patterns: ['Error: Invalid operation', 'Use +, -, *, or /'],
              allRequired: true,
              hints: [
                'Error message should include: "Error: Invalid operation" and "Use +, -, *, or /"',
                'Make sure the message includes the operator variable (use {} placeholder)',
                'Check: println!("Error: Invalid operation \'{}\'. Use +, -, *, or /.", op)',
                'Don\'t forget to include op as the second argument: println!(..., op)',
              ],
            },
            {
              type: 'code_contains',
              patterns: ['println!("Error: Invalid operation', ', op)'],
              allRequired: true,
              hints: [
                'Include op variable in the println! call',
                'Should be: println!("Error: Invalid operation \'{}\'. Use +, -, *, or /.", op)',
                'The format string needs {} placeholder and op as the second argument',
              ],
            },
            {
              type: 'code_contains',
              patterns: ['process::exit(1);'],
              allRequired: true,
              hints: [
                'Exit with process::exit(1); after printing errors',
                'Add process::exit(1); in the None case',
              ],
            },
            {
              type: 'code_matches',
              regex: 'None\\s*=>\\s*\\{[\\s\\S]*?process::exit\\(1\\)\\s*;',
              flags: 's',
              hints: [
                'Make sure the None arm calls process::exit(1);',
                'The None case should print an error and then exit with process::exit(1);',
              ],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              projectSpecific: '100 / 0',
              hints: ['Run: cargo run -- 100 / 0'],
            },
          ],
          message: 'Handle errors and test / 0',
        },
        test: ['Errors handled', 'Program was run'],
        what_you_learned: `Non-zero exits and clear messages make your program predictable.`,
      },
      {
        id: 'step-21',
        step: 21,
        title: 'Test invalid operators',
        instruction: `Error paths are part of normal program behavior. Testing them makes sure your messages and exits stay correct. Try using an invalid operator like ^ (power) to see how your program handles unknown operations.`,
        task: `Run \`cargo run -- 5 ^ 2\` to test how your program handles an invalid operator.`,
        starterCode: `use std::env;\nuse std::process;\n\nfn add(a: f64, b: f64) -> f64 {\n    a + b\n}\n\nfn subtract(a: f64, b: f64) -> f64 {\n    a - b\n}\n\nfn multiply(a: f64, b: f64) -> f64 {\n    a * b\n}\n\nfn divide(a: f64, b: f64) -> Option<f64> {\n    if b == 0.0 {\n        None\n    } else {\n        Some(a / b)\n    }\n}\n\nfn calculate(op: &str, a: f64, b: f64) -> Option<f64> {\n    match op {\n        "+" => Some(add(a, b)),\n        "-" => Some(subtract(a, b)),\n        "*" => Some(multiply(a, b)),\n        "/" => divide(a, b),\n        _ => None,\n    }\n}\n\nfn main() {\n    println!("Calculator");\n\n    let args: Vec<String> = env::args().collect();\n\n    if args.len() < 4 {\n        println!("Usage: calculator <num1> <operator> <num2>");\n        process::exit(1);\n    }\n\n    let num1: f64 = args[1].parse().expect("Invalid number");\n    let op = &args[2];\n    let num2: f64 = args[3].parse().expect("Invalid number");\n\n    let result = calculate(op, num1, num2);\n\n    match result {\n        Some(value) => println!("{} {} {} = {:.2}", num1, op, num2, value),\n        None => {\n            if op == "/" && num2 == 0.0 {\n                println!("Error: Division by zero.");\n            } else {\n                println!("Error: Invalid operation '{}'. Use +, -, *, or /.", op);\n            }\n            process::exit(1);\n        }\n    }\n}`,
        highlightLine: 1,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo run',
              projectSpecific: '5 ^ 2',
              hints: ['Run: cargo run -- 5 ^ 2'],
            },
          ],
          message: 'Test invalid operator behavior',
        },
        test: ['Invalid operator tested'],
        what_you_learned: `Testing error paths keeps your CLI user-friendly.`,
      },
      {
        id: 'step-22',
        step: 22,
        title: 'Use your calculator in real life',
        instruction: `Your calculator is ready! It's a real command-line tool you can use.

Try these real-world scenarios:
- Calculate a tip: \`cargo run -- 50 '*' 0.15\` (15% tip on $50)
- Split a bill: \`cargo run -- 120 / 4\` (split $120 among 4 people)
- Convert units: \`cargo run -- 100 '*' 1.609\` (100 miles to kilometers)
- Calculate discounts: \`cargo run -- 200 - 50\` (original price minus discount)

You've built something useful. That's what programming is all about!`,
        task: `Run your program with a few different real-world inputs. For example, try calculating a 15% tip on $50 using \`cargo run -- 50 '*' 0.15\`.`,
        starterCode: `// Your completed calculator code is here!
// Feel free to experiment with it.`,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo run',
              projectSpecific: "50 '*' 0.15",
              hints: ["Run: cargo run -- 50 '*' 0.15"],
            },
          ],
          message: 'Run your program with a real-world input.',
        },
        test: ['Real-world usage tested'],
        what_you_learned: `You've built a practical tool that can be used in everyday life.`,
      },
    ],
    completion_message: `ðŸŽ‰ Congratulations! You've built your first Rust calculator!

You've transformed from someone who writes simple programs to someone who organizes code into reusable functions.

What you accomplished:
âœ“ Created a Rust project with Cargo
âœ“ Learned about functions, parameters, and return types
âœ“ Used pattern matching with \`match\` expressions
âœ“ Handled edge cases with \`Option<T>\`
âœ“ Parsed command-line arguments
âœ“ Built error handling that's user-friendly

This calculator is now YOURS. Use it whenever you need quick calculationsâ€”you built it, you understand it, you own it.

Ready for the next challenge? Let's build a text adventure next!`,
    extensions: `Try extending your calculator:\n- Add a modulo operator (and decide how it should behave for floats)\n- Improve error handling by returning Result instead of Option\n- Add a --help flag and more detailed usage\n- Support multi-step expressions (requires parsing)`,
  };

