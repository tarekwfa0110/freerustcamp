import { PracticeProject } from '@/types/challenge';

export const challenge_project_001: PracticeProject = {
    id: 'project-001',
    title: 'Learn Variables by Building a Temperature Converter',
    section: 1,
    type: 'practice',
    estimated_time: 60,
    difficulty: 'beginner',
    concepts_taught: ['variables', 'basic_types', 'arithmetic', 'command_line_args'],
    project_overview: `In this project, you'll build a command-line tool that converts temperatures between Fahrenheit and Celsius. You'll practice variables, basic types, arithmetic, and command-line input.`,
    why_this_project: `Temperature conversion is a simple real-world task that forces you to read input, parse strings, and use conditional logic.`,
    prerequisites: [
      'Rust toolchain installed (rustc, cargo)',
      'Basic understanding of terminal/command line',
      'Familiarity with basic arithmetic',
    ],
    preview: {
      mode: 'onLoad',
      title: 'Temperature Converter',
      description: 'Build a CLI tool that converts Fahrenheit and Celsius values and handles invalid input.',
      example_output: `$ cargo run -- 32 F
32.0\u{00b0}F is 0.0\u{00b0}C

$ cargo run -- 100 C
100.0\u{00b0}C is 212.0\u{00b0}F

$ cargo run -- 32 K
Error: Invalid unit 'K'. Use 'F' or 'C'.

$ cargo run
Usage: temp_converter <temperature> <unit>`,
    },
    steps: [
      {
        id: 'step-0',
        step: 0,
        title: 'Understand what you\'re building',
        instruction: `Welcome! In this project, you'll build a command-line temperature converter that converts between Fahrenheit and Celsius.

**What you're building:**
A Rust program that reads a temperature and unit from the command line, converts it to the other scale, and prints the result. For example:
- Input: \`cargo run -- 98.6 F\` â†’ Output: \`98.6Â°F is 37.0Â°C\`
- Input: \`cargo run -- 25 C\` â†’ Output: \`25.0Â°C is 77.0Â°F\`

**Why this project?**
Temperature conversion is practical and real-world. You'll learn:
- How to create Rust projects with Cargo
- Variables, types, and basic arithmetic
- Reading command-line arguments
- Parsing strings into numbers
- Handling errors gracefully
- Formatting output beautifully

**Temperature scale reference:**

| Temperature | Fahrenheit | Celsius | Description |
|------------|------------|---------|-------------|
| Absolute Zero | -459.67Â°F | -273.15Â°C | Coldest possible |
| Special Case | -40Â°F | -40Â°C | Only point where scales meet |
| Freezing Water | 32Â°F | 0Â°C | Water freezes |
| Body Temperature | 98.6Â°F | 37Â°C | Normal human body |
| Boiling Water | 212Â°F | 100Â°C | Water boils |

**The conversion formulas:**
You'll use two formulas:

1. **Fahrenheit to Celsius:** \`celsius = (fahrenheit - 32) Ã— 5/9\`
   - Subtract 32 to account for different zero points
   - Multiply by 5/9 because Celsius degrees are larger than Fahrenheit degrees

2. **Celsius to Fahrenheit:** \`fahrenheit = (celsius Ã— 9/5) + 32\`
   - Multiply by 9/5 to convert from larger Celsius degrees to smaller Fahrenheit degrees
   - Add 32 to account for different zero points

**Special case:** -40Â°F equals -40Â°C. This is the only temperature where both scales meet!

Don't worry about memorizing these formulas. You'll implement them step by step, and each step will explain why the formula works.`,
        task: `Read through this introduction to understand what you'll build. When you're ready, click "Next" to start creating your project!`,
        starterCode: `// Welcome to your first Rust project!
// You'll build a temperature converter step by step.
// Click "Next" when you're ready to begin.`,
        test: ['Introduction read'],
        what_you_learned: `You understand what you're building: a practical temperature converter that will teach you Rust fundamentals.`,
      },
      {
        id: 'step-1',
        step: 1,
        title: 'Create the project',
        instruction: `Cargo is Rust's standard build tool and most projects start with it. It creates a consistent structure so other Rust developers know where to look.

Running \`cargo new\` creates a new crate with \`src/main.rs\` for code and \`Cargo.toml\` for project metadata and dependencies.


\`\`\`bash
cargo new my_tool
\`\`\``,
        task: `Run \`cargo new temp_converter\` in the terminal.`,
        starterCode: `fn main() {
    
}`,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo new temp_converter',
              hints: ['Open the terminal', 'Run: cargo new temp_converter'],
            },
          ],
          message: 'Create the temp_converter project',
        },
        test: ['Project directory created'],
        what_you_learned: `Cargo scaffolds a Rust project with \`src/main.rs\` and \`Cargo.toml\`.`,
      },
      {
        id: 'step-2',
        step: 2,
        title: 'Enter the project folder',
        instruction: `Cargo decides which project to build by locating \`Cargo.toml\` in the current directory. Moving into the project folder keeps every command pointed at the right files.


\`\`\`bash
cd my_tool
\`\`\``,
        task: `Run \`cd temp_converter\` in the terminal.`,
        starterCode: `fn main() {
    
}`,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cd temp_converter',
              hints: ['Run: cd temp_converter'],
            },
          ],
          message: 'Enter the temp_converter folder',
        },
        test: ['Terminal in temp_converter directory'],
        what_you_learned: `Cargo commands must be run from inside the project folder.`,
      },
      {
        id: 'step-3',
        step: 3,
        title: 'Run the starter program',
        instruction: `Rust programs start in the \`main\` function inside \`src/main.rs\`. The \`cargo run\` command compiles that file and then runs the executable, so you see output immediately.

Running the starter program confirms your toolchain works before we add new code.


\`\`\`bash
cargo run
\`\`\``,
        task: `Run \`cargo run\` in the terminal.`,
        starterCode: `fn main() {
    println!("Hello, world!");
}`,
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
        test: ['Program executed successfully'],
        what_you_learned: `\`cargo run\` builds and executes your program from \`main\`.`,
      },
      {
        id: 'step-4',
        step: 4,
        title: 'Set a header message',
        instruction: `When you run a program from the terminal, it helps to print a title at the start so you know what program is running. Think of it like a book title: it tells you what you're reading. Putting it at the top makes it the first line users see when the program prints multiple lines.


\`\`\`rust
println!("My App");
\`\`\``,
        task: `Add a \`println!\` near the top of \`main\` that prints this line:

\`\`\`text
Temperature Converter
\`\`\``,
        starterCode: `fn main() {
    
}`,
        highlightLine: 2,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['println!("Temperature Converter");'],
              allRequired: true,
              hints: ['Add: println!("Temperature Converter");'],
            },
          ],
          message: 'Add the header line',
        },
        test: ['Prints Temperature Converter'],
        what_you_learned: `Changing a string literal changes what the program prints.`,
      },
      {
        id: 'step-5',
        step: 5,
        title: 'Import the env module',
        instruction: `\`std\` is Rust's standard library, organized into modules (namespaces). The \`env\` module contains command-line argument helpers and environment utilities.

Using \`use\` is like creating a shortcut. Instead of writing \`std::env::args()\` every time, you can write \`env::args()\` after importing it once at the top of your file.


\`\`\`rust
use std::path::Path;
\`\`\``,
        task: `Add a use statement for \`std::env\` above \`main\`.`,
        starterCode: `
fn main() {
    println!("Temperature Converter");
}`,
        highlightLine: 1,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['use std::env;'],
              allRequired: true,
              hints: ['Add: use std::env; at the top'],
            },
          ],
          message: 'Add the env import',
        },
        test: ['std::env is imported'],
        what_you_learned: `\`use\` brings a module into scope so you can call it directly.`,
      },
      {
        id: 'step-6',
        step: 6,
        title: 'Create the args iterator',
        instruction: `Command-line arguments are the words you pass after \`--\` when running a program. The \`--\` tells Cargo to pass everything after it as arguments to your program, not to Cargo itself.

\`env::args()\` returns an iterator, which is a sequence you walk through one item at a time. An iterator does not store all values up front; it yields the next value when you ask for it. For example, running \`cargo run -- 32 F\` produces values like ["temp_converter", "32", "F"], where index 0 is the program name.


\`\`\`rust
let inputs = env::args();
\`\`\``,
        task: `Create a variable named \`args\` from \`env::args()\` below the title print.`,
        starterCode: `use std::env;

fn main() {
    println!("Temperature Converter");


}`,
        highlightLine: 5,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let args = env::args();'],
              allRequired: true,
              hints: ['Add: let args = env::args();'],
            },
          ],
          message: 'Create the args iterator',
        },
        test: ['args iterator created'],
        what_you_learned: `\`env::args()\` returns an iterator over command-line arguments.`,
      },
      {
        id: 'step-7',
        step: 7,
        title: 'Collect args into a Vec',
        instruction: `A \`Vec\` (short for vector) is Rust's growable list type. The \`collect()\` method gathers all items from the iterator into a list. Think of it like collecting items from a conveyor belt into a box: once collected, the items are in the box and ready to use.

Right now Rust does not know which collection type to build, so compiling will produce a type annotation error. **This compile error is expected and normal**. We'll fix it in the next step by adding a type annotation.


\`\`\`rust
let inputs: Vec<String> = env::args().collect();
\`\`\``,
        task: `Add \`.collect()\` to the existing \`env::args()\` call. Then run \`cargo run\` and read the type annotation error. If you don't see it, double-check that your \`let args = ...\` line does not have a type annotation yet.`,
        starterCode: `use std::env;

fn main() {
    println!("Temperature Converter");

    let args = env::args();

}
`,
        highlightLine: 7,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let args = env::args().collect();'],
              allRequired: true,
              hints: ['Update the args line to use collect()'],
            },
            {
              type: 'code_reject_patterns',
              patterns: ['let args = env::args();'],
              hints: ['Replace the iterator line instead of keeping it'],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Run: cargo run to see the type annotation error'],
            },
          ],
          message: 'Collect the args and observe the type error',
        },
        test: ['Arguments collected without explicit type', 'Program was run'],
        what_you_learned: `Collecting works, but Rust still needs the target collection type.`,
      },

      {
        id: 'step-8',
        step: 8,
        title: 'Fix the collect type error',
        instruction: `The compiler error from the previous step happens because \`collect()\` needs to know which collection type to build.

**Type inference:** Rust can often figure out types automatically (called "type inference"). For example, if you write \`let x = 5;\`, Rust knows \`x\` is an \`i32\`. However, \`collect()\` can build many different collection types (\`Vec\`, \`HashSet\`, \`BTreeSet\`, etc.), so Rust needs you to specify which one you want.

You fix this by adding a type annotation. Here we want a vector of strings because command-line arguments are strings.


\`\`\`rust
let inputs: Vec<String> = env::args().collect();
\`\`\``,
        task: `Change the line to \`let args: Vec<String> = env::args().collect();\` to fix the error.`,
        starterCode: `use std::env;

fn main() {
    println!("Temperature Converter");

    let args = env::args().collect();

}
`,
        highlightLine: 7,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let args: Vec<String> = env::args().collect();'],
              allRequired: true,
              hints: ['Add the Vec<String> type annotation'],
            },
            {
              type: 'code_reject_patterns',
              patterns: ['let args = env::args().collect();'],
              hints: ['Replace the untyped line with the typed version'],
            },
          ],
          message: 'Add the Vec<String> type annotation',
        },
        test: ['Arguments collected into a typed vector'],
        what_you_learned: `Type annotations tell Rust exactly what type you want when inference isn't enough. Type annotations resolve collect() inference errors.`,
      },
      {
        id: 'step-9',
        step: 9,
        title: 'Add a usage guard',
        instruction: `The \`args\` list always includes the program name at index 0. We need two user inputs (temperature and unit), so the total length must be at least 3 before indexing. We check for 3 because index 0 is the program name, and we need indices 1 and 2 for temperature and unit.

A guard check prevents out-of-bounds panics and tells users how to run the tool.


\`\`\`rust
if items.len() < 3 {
    println!("Usage: my_tool <x> <y>");
}
\`\`\``,
        task: `Add an if block that checks \`args.len() < 3\`. Inside it, print this usage line:

\`\`\`text
Usage: temp_converter <temperature> <unit>
\`\`\`

Then run your program to confirm the message prints:

\`\`\`bash
cargo run
\`\`\``,
        starterCode: `use std::env;

fn main() {
    println!("Temperature Converter");

    let args: Vec<String> = env::args().collect();


}`,
        highlightLine: 7,
        validation: {
          rules: [
            {
              type: 'code_matches',
              regex: 'if\\s+args\\.len\\(\\)\\s*<\\s*3\\s*\\{[^}]*println!\\("Usage: temp_converter <temperature> <unit>"\\);[^}]*\\}',
              flags: 's',
              hints: ['Add the if block with the usage println inside'],
            },
            {
              type: 'code_reject_patterns',
              patterns: ['if args.len() < 3 {}'],
              hints: ['Your if block is empty. Add the usage line inside.'],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Run: cargo run (with no extra arguments)'],
            },
          ],
          message: 'Add the usage guard',
        },
        test: ['Usage guard added'],
        what_you_learned: `Guards prevent out-of-bounds access and improve error messages.`,
      },
      {
        id: 'step-10',
        step: 10,
        title: 'Import the process module',
        instruction: `A process is the running program itself. The \`std::process\` module lets you exit early when inputs are missing or invalid.

Exit codes tell other tools whether the run succeeded (0) or failed (non-zero), which is important for scripts.


\`\`\`rust
use std::process;
\`\`\``,
        task: `Add \`use std::process;\` below your \`use std::env;\` line.`,
        starterCode: `use std::env;

fn main() {
    println!("Temperature Converter");

    let args: Vec<String> = env::args().collect();

    if args.len() < 3 {
        println!("Usage: temp_converter <temperature> <unit>");
    }
}`,
        highlightLine: 2,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['use std::process;'],
              allRequired: true,
              hints: ['Add: use std::process; below use std::env;'],
            },
          ],
          message: 'Import std::process',
        },
        test: ['std::process is imported'],
        what_you_learned: `The process module gives you control over the running program.`,
      },
      {
        id: 'step-11',
        step: 11,
        title: 'Exit on missing input',
        instruction: `After printing usage, the program should stop so it doesn't access missing arguments. Exiting with a non-zero code (like 1) signals an error to the shell and scripts.


\`\`\`rust
process::exit(1);
\`\`\``,
        task: `Add \`process::exit(1);\` inside the usage guard block.`,
        starterCode: `use std::env;
use std::process;

fn main() {
    println!("Temperature Converter");

    let args: Vec<String> = env::args().collect();

    if args.len() < 3 {
        println!("Usage: temp_converter <temperature> <unit>");

    }
}`,
        highlightLine: 11,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['process::exit(1);'],
              allRequired: true,
              hints: ['Add process::exit(1); after the usage line'],
            },
          ],
          message: 'Exit on missing input',
        },
        test: ['Exit added for missing input'],
        what_you_learned: `Exit codes let other tools detect success or failure.`,
      },
      {
        id: 'step-12',
        step: 12,
        title: 'Read the temperature string',
        instruction: `Arguments arrive in order, so index 1 is the first user value. For \`cargo run -- 32 F\`, the string "32" lives at \`args[1]\`.

When you access \`args[1]\`, you get a \`String\` (an owned value). However, we don't need to own this string. We just need to read it. Using \`&\` creates a reference (a borrowed view) instead of taking ownership.

**Why use a reference?** References are lightweight and don't allocate new memory. Since we're only reading the string to parse it, borrowing is more efficient than cloning. The \`&\` operator creates a \`&String\` reference that points to the original string in the vector.


\`\`\`rust
let value_str = &args[1];
\`\`\``,
        task: `Create a variable named \`temp_str\` that references \`args[1]\` using the \`&\` operator.

**Variable naming:** We use \`temp_str\` to indicate this is a string representation of a temperature. Clear, descriptive names make code easier to read and understand.`,
        starterCode: `use std::env;
use std::process;

fn main() {
    println!("Temperature Converter");

    let args: Vec<String> = env::args().collect();

    if args.len() < 3 {
        println!("Usage: temp_converter <temperature> <unit>");
        process::exit(1);
    }


}`,
        highlightLine: 14,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let temp_str = &args[1];'],
              allRequired: true,
              hints: ['Add: let temp_str = &args[1];'],
            },
          ],
          message: 'Read the temperature argument',
        },
        test: ['temp_str variable created'],
        what_you_learned: `References (\`&\`) let you borrow values without taking ownership. Index 0 is the program name; user input starts at index 1.`,
      },
      {
        id: 'step-13',
        step: 13,
        title: 'Read the unit string',
        instruction: `Index 2 holds the unit for the same command (F or C). We keep the raw unit string so we can normalize it later and show it in errors if needed.


\`\`\`rust
let unit_in = &args[2];
\`\`\``,
        task: `Create a variable named \`unit_str\` that references \`args[2]\`.`,
        starterCode: `use std::env;
use std::process;

fn main() {
    println!("Temperature Converter");

    let args: Vec<String> = env::args().collect();

    if args.len() < 3 {
        println!("Usage: temp_converter <temperature> <unit>");
        process::exit(1);
    }

    let temp_str = &args[1];


}`,
        highlightLine: 15,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let unit_str = &args[2];'],
              allRequired: true,
              hints: ['Add: let unit_str = &args[2];'],
            },
            {
              type: 'code_reject_patterns',
              patterns: ['let unit_str = &args[1];', 'let unit_str = &args[0];'],
              hints: ['Use args[2] for the unit (index 2), not args[1] or args[0]'],
            },
          ],
          message: 'Read the unit argument',
        },
        test: ['unit_str variable created'],
        what_you_learned: `Argument positions depend on the input order.`,
      },
      {
        id: 'step-14',
        step: 14,
        title: 'Call parse()',
        instruction: `\`parse()\` attempts to convert a string into another type. It returns a \`Result\` because conversion can fail.

A \`Result\` is Rust's way of representing "either success or failure". Think of it like asking someone to convert text to a number. They might say "Yes, here's the number" (\`Ok(value)\`) or "No, that's not a valid number" (\`Err(error)\`). You have to handle both possibilities.

We'll start by calling \`parse()\` and storing that \`Result\` in a variable. At this moment, the variable is not a number yet. It is a "success or failure" value that we have to handle.


\`\`\`rust
let raw = value_str.parse();
\`\`\``,
        task: `Create a variable named \`temp\` using \`temp_str.parse()\`.`,
        starterCode: `use std::env;
use std::process;

fn main() {
    println!("Temperature Converter");

    let args: Vec<String> = env::args().collect();

    if args.len() < 3 {
        println!("Usage: temp_converter <temperature> <unit>");
        process::exit(1);
    }

    let temp_str = &args[1];
    let unit_str = &args[2];


}`,
        highlightLine: 16,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let temp = temp_str.parse();'],
              allRequired: true,
              hints: ['Add: let temp = temp_str.parse();'],
            },
            {
              type: 'code_reject_patterns',
              patterns: ['temp_str.parse().expect("Invalid temperature")'],
              hints: ['In this step, only call parse() and store the Result. We will unwrap it in the next step.'],
            },
          ],
          message: 'Call parse()',
        },
        test: ['parse() called'],
        what_you_learned: `Parsing is the first step in turning text into a number.`,
      },
      {
        id: 'step-15',
        step: 15,
        title: 'Unwrap with expect()',
        instruction: `A \`Result\` forces you to decide what happens on failure. If the user types a non-number, we do not want to continue and produce nonsense output.

\`expect()\` is like saying "Give me the number, or stop the program and show this error message." If parsing succeeds, you get the number. If it fails, the program stops with your message.

In this project, we'll use \`expect("Invalid temperature")\` so users get a clear reason when parsing fails.

**Note:** If you try to compile right after this step, the compiler will still ask you what numeric type you want. This is expected. We'll fix that in the next step by adding a \`f64\` type annotation.


\`\`\`rust
let n = value_str.parse().expect("Bad input");
\`\`\``,
        task: `Update the existing \`temp\` line by adding \`.expect(...)\` after \`parse()\`. Use this message:

\`\`\`text
Invalid temperature
\`\`\``,
        starterCode: `use std::env;
use std::process;

fn main() {
    println!("Temperature Converter");

    let args: Vec<String> = env::args().collect();

    if args.len() < 3 {
        println!("Usage: temp_converter <temperature> <unit>");
        process::exit(1);
    }

    let temp_str = &args[1];
    let unit_str = &args[2];

    let temp = temp_str.parse();


}`,
        highlightLine: 17,
        validation: {
          rules: [
            {
              type: 'code_matches',
              regex: 'let\\s+temp(?:\\s*:\\s*f64)?\\s*=\\s*temp_str\\.parse\\(\\)\\.expect\\("Invalid temperature"\\);',
              flags: 's',
              hints: ['Add .expect("Invalid temperature") after parse() on the temp line'],
            },
            {
              type: 'code_reject_patterns',
              patterns: ['let temp = temp_str.parse();'],
              hints: ['Make sure you added expect("Invalid temperature") to unwrap the Result.'],
            },
          ],
          message: 'Unwrap with expect()',
        },
        test: ['expect() used to handle parse errors'],
        what_you_learned: `expect() unwraps on success and stops the program with a message on failure.`,
      },
      {
        id: 'step-16',
        step: 16,
        title: 'Add a type annotation (f64)',
        instruction: `Rust still needs to know what kind of number you want out of \`parse()\`.

\`parse()\` is generic. The same string could be parsed into different numeric types (\`i32\`, \`u64\`, \`f64\`, and more). Rust will not guess, because different numeric types change rounding and allowed formats.

We'll choose \`f64\` (a 64-bit floating-point number) so inputs like \`36.6\` work. We use \`f64\` instead of \`f32\` (32-bit) because \`f64\` is Rust's default floating-point type and provides better precision, which is important for accurate temperature conversions.

One common way to tell \`parse()\` the target type is to annotate the variable on the left side. When Rust sees \`let temp: f64 = ...\`, it knows your parse should produce an \`f64\`.


\`\`\`rust
let n: f64 = value_str.parse().expect("Bad input");
\`\`\``,
        task: `Update the existing \`temp\` line by adding a \`f64\` type annotation (so \`parse()\` knows what number type to produce).`,
        starterCode: `use std::env;
use std::process;

fn main() {
    println!("Temperature Converter");

    let args: Vec<String> = env::args().collect();

    if args.len() < 3 {
        println!("Usage: temp_converter <temperature> <unit>");
        process::exit(1);
    }

    let temp_str = &args[1];
    let unit_str = &args[2];

    let temp = temp_str.parse().expect("Invalid temperature");


}`,
        highlightLine: 17,
        validation: {
          rules: [
            {
              type: 'code_matches',
              regex: 'let\\s+temp\\s*:\\s*f64\\s*=\\s*temp_str\\.parse\\(\\)\\.expect\\("Invalid temperature"\\);|let\\s+temp\\s*=\\s*temp_str\\.parse::\\<f64\\>\\(\\)\\.expect\\("Invalid temperature"\\);',
              flags: 's',
              hints: ['Add : f64 to temp on the same line (or use parse::<f64>())'],
            },
            {
              type: 'code_reject_patterns',
              patterns: ['let temp = temp_str.parse().expect("Invalid temperature");'],
              hints: ['Add : f64 so Rust knows what type parse() should produce.'],
            },
          ],
          message: 'Add a type annotation',
        },
        test: ['parse() has an explicit f64 target type'],
        what_you_learned: `Type annotations tell Rust which number type to parse into.`,
      },
      {
        id: 'step-17',
        step: 17,
        title: 'Normalize the unit',
        instruction: `Users might type \`f\`, \`F\`, \`c\`, or \`C\`. Without normalization, you'd need to check for all four possibilities separately. Converting to uppercase means you only check \`"F"\` or \`"C"\`: much simpler!

\`to_uppercase()\` returns a new \`String\`, leaving the original available for error messages.


\`\`\`rust
let unit = unit_in.to_uppercase();
\`\`\``,
        task: `Create a variable named \`unit\` from \`unit_str\` in uppercase.`,
        starterCode: `use std::env;
use std::process;

fn main() {
    println!("Temperature Converter");

    let args: Vec<String> = env::args().collect();

    if args.len() < 3 {
        println!("Usage: temp_converter <temperature> <unit>");
        process::exit(1);
    }

    let temp_str = &args[1];
    let unit_str = &args[2];

    let temp: f64 = temp_str.parse().expect("Invalid temperature");


}`,
        highlightLine: 19,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let unit = unit_str.to_uppercase();'],
              allRequired: true,
              hints: ['Add: let unit = unit_str.to_uppercase();'],
            },
          ],
          message: 'Normalize the unit',
        },
        test: ['unit is converted to uppercase'],
        what_you_learned: `Normalization simplifies comparison logic.`,
      },
      {
        id: 'step-18',
        step: 18,
        title: 'Convert Fahrenheit to Celsius',
        instruction: `Convert Fahrenheit temperatures to Celsius using the formula \`(temp - 32) * 5 / 9\`.

**How the formula works:**

The Fahrenheit scale sets water's freezing point at 32Â°F and boiling at 212Â°F, while Celsius uses 0Â°C and 100Â°C. The ratio between the scales is 5/9 because Celsius degrees are larger than Fahrenheit degrees. We subtract 32 to account for the different zero points, then multiply by 5/9 to convert the scale.

**Example conversion:**

Converting 98.6Â°F (body temperature) to Celsius:

| Step | Calculation | Result |
|------|-------------|--------|
| Start | 98.6Â°F | - |
| Subtract 32 | 98.6 - 32 | 66.6 |
| Multiply by 5/9 | 66.6 Ã— (5/9) | 37.0Â°C |

We use floating-point literals (\`32.0\`, \`5.0\`, \`9.0\`) to avoid integer division. If we used \`32\` instead of \`32.0\`, Rust would perform integer math and lose decimal precision.

This branch only runs when the unit is \`F\`.


\`\`\`rust
if scale == "F" {
    let c = (n - 32.0) * 5.0 / 9.0;
}
\`\`\``,
        task: `Add an \`if unit == "F"\` block that computes \`celsius = (temp - 32.0) * 5.0 / 9.0\`.`,
        starterCode: `use std::env;
use std::process;

fn main() {
    println!("Temperature Converter");

    let args: Vec<String> = env::args().collect();

    if args.len() < 3 {
        println!("Usage: temp_converter <temperature> <unit>");
        process::exit(1);
    }

    let temp_str = &args[1];
    let unit_str = &args[2];

    let temp: f64 = temp_str.parse().expect("Invalid temperature");

    let unit = unit_str.to_uppercase();


}`,
        highlightLine: 21,
        validation: {
          rules: [
            {
              type: 'code_matches',
              regex: 'if\\s+unit\\s*==\\s*"F"\\s*\\{[^}]*let\\s+celsius(?:\\s*:\\s*f64)?\\s*=\\s*\\(temp\\s*-\\s*32\\.0\\)\\s*\\*\\s*(?:5\\.0\\s*/\\s*9\\.0|\\(\\s*5\\.0\\s*/\\s*9\\.0\\s*\\));[^}]*\\}',
              flags: 's',
              hints: ['Add the if block and the celsius formula inside'],
            },
            {
              type: 'code_reject_patterns',
              patterns: ['5/9', 'temp_str - 32', 'temp_str * 5'],
              hints: ['Use temp (f64) and float division like 5.0/9.0'],
            },
          ],
          message: 'Add the F to C conversion',
        },
        test: ['Celsius calculation is present'],
        what_you_learned: `Float math avoids integer division mistakes.`,
      },
      {
        id: 'step-19',
        step: 19,
        title: 'Print the F to C result',
        instruction: `Now print the conversion so the user can see the result. Placeholders let you insert values into a string.

**Format specifiers:** You can use \`{}\` to print a value with default formatting, but \`{:.1}\` gives you control. The \`:\` starts format options, and \`.1\` means "show 1 decimal place". 

Why \`{:.1}\` instead of \`{}\`? \`{}\` prints the full number (like \`0.000000000000001\`), but \`{:.1}\` rounds it to 1 decimal place (like \`0.0\`). For temperatures, 1 decimal place is perfect: readable and precise enough.

Use \`\u{00b0}\` for the degree symbol to match the expected output.


\`\`\`rust
println!("{} -> {}", a, b);
\`\`\``,
        task: `Inside the F branch, print \`temp\` and \`celsius\` using this output format:

\`\`\`text
{:.1}\u{00b0}F is {:.1}\u{00b0}C
\`\`\`

Then run the program with a Fahrenheit input to see the output. Try converting human body temperature:

\`\`\`bash
cargo run -- 98.6 F
\`\`\`

You're converting 98.6Â°F (normal human body temperature) to Celsius!`,
        starterCode: `use std::env;
use std::process;

fn main() {
    println!("Temperature Converter");

    let args: Vec<String> = env::args().collect();

    if args.len() < 3 {
        println!("Usage: temp_converter <temperature> <unit>");
        process::exit(1);
    }

    let temp_str = &args[1];
    let unit_str = &args[2];

    let temp: f64 = temp_str.parse().expect("Invalid temperature");

    let unit = unit_str.to_uppercase();

    if unit == "F" {
        let celsius = (temp - 32.0) * 5.0 / 9.0;

    }
}`,
        highlightLine: 23,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['println!("{:.1}\u{00b0}F is {:.1}\u{00b0}C", temp, celsius);'],
              allRequired: true,
              hints: ['Add: println!("{:.1}\u{00b0}F is {:.1}\u{00b0}C", temp, celsius);'],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              projectSpecific: '98.6 f',
              hints: ['Run: cargo run -- 98.6 F'],
            },
          ],
          message: 'Print the F to C output',
        },
        test: ['Result is printed using placeholders'],
        what_you_learned: `Format specifiers like \`{:.1}\` control how numbers are displayed. Placeholders inject values into strings.`,
      },
      {
        id: 'step-20',
        step: 20,
        title: 'Convert Celsius to Fahrenheit',
        instruction: `Convert Celsius temperatures to Fahrenheit using the inverse formula: \`(temp * 9 / 5) + 32\`.

**How this formula works:**

We multiply by 9/5 to convert from Celsius degrees (larger) to Fahrenheit degrees (smaller), then add 32 to account for the different zero points. This is the reverse of the F-to-C conversion.

**Example conversion:**

Converting 25Â°C (room temperature) to Fahrenheit:

| Step | Calculation | Result |
|------|-------------|--------|
| Start | 25Â°C | - |
| Multiply by 9/5 | 25 Ã— (9/5) | 45 |
| Add 32 | 45 + 32 | 77Â°F |

Using \`else if\` ensures only one branch runs. If the unit is "F", we skip the "C" branch entirely.


\`\`\`rust
else if scale == "C" {
    let f = (n * 9.0 / 5.0) + 32.0;
}
\`\`\``,
        task: `Add an \`else if unit == "C"\` block that computes \`fahrenheit = (temp * 9.0 / 5.0) + 32.0\`.`,
        starterCode: `use std::env;
use std::process;

fn main() {
    println!("Temperature Converter");

    let args: Vec<String> = env::args().collect();

    if args.len() < 3 {
        println!("Usage: temp_converter <temperature> <unit>");
        process::exit(1);
    }

    let temp_str = &args[1];
    let unit_str = &args[2];

    let temp: f64 = temp_str.parse().expect("Invalid temperature");

    let unit = unit_str.to_uppercase();

    if unit == "F" {
        let celsius = (temp - 32.0) * 5.0 / 9.0;
        println!("{:.1}\u{00b0}F is {:.1}\u{00b0}C", temp, celsius);
    }


}`,
        highlightLine: 25,
        validation: {
          rules: [
            {
              type: 'code_matches',
              regex: 'else\\s+if\\s+unit\\s*==\\s*"C"\\s*\\{[^}]*let\\s+fahrenheit(?:\\s*:\\s*f64)?\\s*=\\s*\\(temp\\s*\\*\\s*(?:9\\.0\\s*/\\s*5\\.0|\\(\\s*9\\.0\\s*/\\s*5\\.0\\s*\\))\\)\\s*\\+\\s*32\\.0;[^}]*\\}',
              flags: 's',
              hints: ['Add the else-if block and the fahrenheit formula inside'],
            },
            {
              type: 'code_reject_patterns',
              patterns: ['9/5', 'temp_str * 9'],
              hints: ['Use temp (f64) and float division like 9.0/5.0'],
            },
          ],
          message: 'Add the C to F conversion',
        },
        test: ['Fahrenheit calculation is present'],
        what_you_learned: `A second branch completes the conversion logic.`,
      },
      {
        id: 'step-21',
        step: 21,
        title: 'Print the C to F result',
        instruction: `Print the Celsius-to-Fahrenheit result in the same format. Consistent output makes it easy to read and compare values.

Use \`\u{00b0}\` again for the degree symbol.


\`\`\`rust
println!("{} -> {}", a, b);
\`\`\``,
        task: `Inside the C branch, print \`temp\` and \`fahrenheit\` using this output format:

\`\`\`text
{:.1}\u{00b0}C is {:.1}\u{00b0}F
\`\`\`

Then run the program with a Celsius input to see the output. Try this special case:

\`\`\`bash
cargo run -- -40 C
\`\`\`

Fun fact: -40Â°C equals -40Â°F! This is the only temperature where both scales meet.`,
        starterCode: `use std::env;
use std::process;

fn main() {
    println!("Temperature Converter");

    let args: Vec<String> = env::args().collect();

    if args.len() < 3 {
        println!("Usage: temp_converter <temperature> <unit>");
        process::exit(1);
    }

    let temp_str = &args[1];
    let unit_str = &args[2];

    let temp: f64 = temp_str.parse().expect("Invalid temperature");

    let unit = unit_str.to_uppercase();

    if unit == "F" {
        let celsius = (temp - 32.0) * 5.0 / 9.0;
        println!("{:.1}\u{00b0}F is {:.1}\u{00b0}C", temp, celsius);
    } else if unit == "C" {
        let fahrenheit = (temp * 9.0 / 5.0) + 32.0;

    }
}`,
        highlightLine: 26,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['println!("{:.1}\u{00b0}C is {:.1}\u{00b0}F", temp, fahrenheit);'],
              allRequired: true,
              hints: ['Add: println!("{:.1}\u{00b0}C is {:.1}\u{00b0}F", temp, fahrenheit);'],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              projectSpecific: '-40 c',
              hints: ['Run: cargo run -- -40 C'],
            },
          ],
          message: 'Print the C to F output',
        },
        test: ['C to F result is printed'],
        what_you_learned: `Consistent output formatting improves readability.`,
      },
      {
        id: 'step-22',
        step: 22,
        title: 'Handle invalid units',
        instruction: `Inputs outside \`F\` or \`C\` should produce a clear, helpful error. A final \`else\` branch handles anything unexpected.

**Good error messages:** When users make mistakes, show them exactly what went wrong. Include the invalid input they provided so they can see their error. Also tell them what valid options exist.

**Note:** We use \`unit_str\` (the original input) instead of \`unit\` (the normalized uppercase version) in the error message. This shows users exactly what they typed, making it easier for them to understand the mistake. For example, if they type "k", showing "k" is more helpful than showing "K".

After printing the message, exit with a non-zero status so the program stops.


\`\`\`rust
if mode == "A" {
    println!("Mode A");
} else {
    println!("Unknown mode");
}
\`\`\``,
        task: `Add an \`else\` branch for unexpected units. Print this error line using \`unit_str\` to show the user's exact input, then exit with \`process::exit(1);\`.

\`\`\`text
Error: Invalid unit '{}'. Use 'F' or 'C'.
\`\`\`

Then test the error case by running:

\`\`\`bash
cargo run -- 32 K
\`\`\``,
        starterCode: `use std::env;
use std::process;

fn main() {
    println!("Temperature Converter");

    let args: Vec<String> = env::args().collect();

    if args.len() < 3 {
        println!("Usage: temp_converter <temperature> <unit>");
        process::exit(1);
    }

    let temp_str = &args[1];
    let unit_str = &args[2];

    let temp: f64 = temp_str.parse().expect("Invalid temperature");

    let unit = unit_str.to_uppercase();

    if unit == "F" {
        let celsius = (temp - 32.0) * 5.0 / 9.0;
        println!("{:.1}\u{00b0}F is {:.1}\u{00b0}C", temp, celsius);
    } else if unit == "C" {
        let fahrenheit = (temp * 9.0 / 5.0) + 32.0;
        println!("{:.1}\u{00b0}C is {:.1}\u{00b0}F", temp, fahrenheit);
    } else {

    }
}`,
        highlightLine: 29,
        validation: {
          rules: [
            {
              type: 'code_matches',
              regex: 'else\\s*\\{[^}]*println!\\([^)]*Error: Invalid unit[^)]*Use[^)]*F[^)]*C[^)]*unit_str[^)]*\\);[^}]*process::exit\\(1\\);[^}]*\\}',
              flags: 's',
              hints: ['Make sure the else block prints the error line and then calls process::exit(1);'],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              projectSpecific: '32 k',
              hints: ['Run: cargo run -- 32 K'],
            },
          ],
          message: 'Handle invalid units',
        },
        test: ['Invalid unit message added'],
        what_you_learned: `Fallback branches keep programs user-friendly.`,
      },
      {
        id: 'step-23',
        step: 23,
        title: 'Add comments to explain the code',
        instruction: `Comments help other developers (and future you) understand what your code does. In Rust, comments start with \`//\` for single-line comments or \`/* */\` for multi-line comments.

**Good commenting practices:**
- Explain *why* something is done, not *what* it does (the code shows what)
- Keep comments concise and up-to-date
- Use comments for non-obvious logic or important decisions

For this project, add a comment above the conversion formulas explaining the temperature conversion formulas.


\`\`\`rust
// Convert Fahrenheit to Celsius: subtract 32, then multiply by 5/9
let celsius = (temp - 32.0) * 5.0 / 9.0;
\`\`\``,
        task: `Add a comment above the Fahrenheit-to-Celsius conversion formula explaining how it works. Optionally add a comment above the Celsius-to-Fahrenheit formula as well.`,
        starterCode: `use std::env;
use std::process;

fn main() {
    println!("Temperature Converter");

    let args: Vec<String> = env::args().collect();

    if args.len() < 3 {
        println!("Usage: temp_converter <temperature> <unit>");
        process::exit(1);
    }

    let temp_str = &args[1];
    let unit_str = &args[2];

    let temp: f64 = temp_str.parse().expect("Invalid temperature");

    let unit = unit_str.to_uppercase();

    if unit == "F" {
        let celsius = (temp - 32.0) * 5.0 / 9.0;
        println!("{:.1}\u{00b0}F is {:.1}\u{00b0}C", temp, celsius);
    } else if unit == "C" {
        let fahrenheit = (temp * 9.0 / 5.0) + 32.0;
        println!("{:.1}\u{00b0}C is {:.1}\u{00b0}F", temp, fahrenheit);
    } else {
        println!("Error: Invalid unit '{}'. Use 'F' or 'C'.", unit_str);
        process::exit(1);
    }
}`,
        highlightLine: 19,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['//'],
              allRequired: true,
              hints: ['Add a comment (starting with //) above the conversion formula'],
            },
          ],
          message: 'Add comments explaining the conversion formulas',
        },
        test: ['Comments added to code'],
        what_you_learned: `Comments document your code and help others understand your logic.`,
      },
      {
        id: 'step-24',
        step: 24,
        title: 'Test edge cases',
        instruction: `Before considering your program complete, test it with various inputs to make sure it handles edge cases correctly. Edge cases are unusual but valid inputs that might reveal bugs.

**Important edge cases for temperature conversion:**
- Negative temperatures (below freezing)
- Zero degrees (freezing point of water)
- Very large numbers
- Decimal temperatures
- Boundary values (like -40Â°F, which equals -40Â°C)

Testing helps you catch bugs before users do. Good programs handle both normal and edge case inputs gracefully.


\`\`\`bash
# Test freezing point (water freezes at 0Â°C / 32Â°F)
cargo run -- 0 C
cargo run -- 32 F

# Test body temperature (normal human body temp)
cargo run -- 98.6 F
cargo run -- 37 C

# Test below freezing (cold winter day)
cargo run -- -10 F
cargo run -- -23 C

# Test the special -40 case (same in both scales)
cargo run -- -40 F
cargo run -- -40 C

# Test absolute zero (coldest possible temperature)
cargo run -- -273.15 C
\`\`\``,
        task: `Test your program with various edge cases. Run it with:
- Freezing point: \`0 C\` and \`32 F\` (water freezes at these temperatures)
- Body temperature: \`98.6 F\` and \`37 C\` (normal human body temperature)
- Below freezing: \`-10 F\` and \`-23 C\` (cold winter day)
- The special case: \`-40 F\` and \`-40 C\` (the only temperature where both scales meet)
- Absolute zero: \`-273.15 C\` (the coldest possible temperature)

Verify that all outputs are correct and the program doesn't crash.`,
        starterCode: `use std::env;
use std::process;

fn main() {
    println!("Temperature Converter");

    let args: Vec<String> = env::args().collect();

    if args.len() < 3 {
        println!("Usage: temp_converter <temperature> <unit>");
        process::exit(1);
    }

    let temp_str = &args[1];
    let unit_str = &args[2];

    let temp: f64 = temp_str.parse().expect("Invalid temperature");

    let unit = unit_str.to_uppercase();

    if unit == "F" {
        let celsius = (temp - 32.0) * 5.0 / 9.0;
        println!("{:.1}\u{00b0}F is {:.1}\u{00b0}C", temp, celsius);
    } else if unit == "C" {
        let fahrenheit = (temp * 9.0 / 5.0) + 32.0;
        println!("{:.1}\u{00b0}C is {:.1}\u{00b0}F", temp, fahrenheit);
    } else {
        println!("Error: Invalid unit '{}'. Use 'F' or 'C'.", unit_str);
        process::exit(1);
    }
}`,
        highlightLine: 1,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo run',
              projectSpecific: '0 c',
              hints: ['Test freezing point: cargo run -- 0 C'],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              projectSpecific: '98.6 f',
              hints: ['Test body temperature: cargo run -- 98.6 F'],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              projectSpecific: '-40 f',
              hints: ['Test the special -40 case: cargo run -- -40 F'],
            },
          ],
          message: 'Test edge cases',
        },
        test: ['Edge cases tested'],
        what_you_learned: `Testing edge cases helps ensure your program works correctly for all valid inputs, not just typical ones.`,
      },
      {
        id: 'step-25',
        step: 25,
        title: 'Use your tool in real life',
        instruction: `Your converter is complete and ready to use! This isn't just a learning exercise; you've built a real tool that solves a practical problem.

Try using it for real scenarios:
- Check the weather: convert your local temperature between scales
- Cooking: convert oven temperatures (like 350Â°F for baking)
- Science: understand temperatures in different contexts
- Travel: convert temperatures when planning trips

You've built something useful. That's what programming is all about: creating tools that solve problems.`,
        task: `Try using your converter for real scenarios:
- Convert your local weather: \`cargo run -- 72 F\` (a nice day)
- Check cooking temperatures: \`cargo run -- 350 F\` (oven temperature for baking)
- Understand scientific temps: \`cargo run -- 37 C\` (human body temperature)
- Plan for travel: \`cargo run -- 25 C\` (comfortable room temperature)

Your tool is ready to use whenever you need it!`,
        starterCode: `use std::env;
use std::process;

fn main() {
    println!("Temperature Converter");

    let args: Vec<String> = env::args().collect();

    if args.len() < 3 {
        println!("Usage: temp_converter <temperature> <unit>");
        process::exit(1);
    }

    let temp_str = &args[1];
    let unit_str = &args[2];

    let temp: f64 = temp_str.parse().expect("Invalid temperature");

    let unit = unit_str.to_uppercase();

    if unit == "F" {
        let celsius = (temp - 32.0) * 5.0 / 9.0;
        println!("{:.1}\u{00b0}F is {:.1}\u{00b0}C", temp, celsius);
    } else if unit == "C" {
        let fahrenheit = (temp * 9.0 / 5.0) + 32.0;
        println!("{:.1}\u{00b0}C is {:.1}\u{00b0}F", temp, fahrenheit);
    } else {
        println!("Error: Invalid unit '{}'. Use 'F' or 'C'.", unit_str);
        process::exit(1);
    }
}`,
        highlightLine: 1,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo run',
              projectSpecific: '72 f',
              hints: ['Try: cargo run -- 72 F'],
            },
          ],
          message: 'Use your converter for real scenarios',
        },
        test: ['Converter used for real scenarios'],
        what_you_learned: `You've built a real tool that solves a practical problem. This is what programming is all about: creating useful tools.`,
      },
    ],
    completion_message: `ðŸŽ‰ Congratulations! You've built your first Rust CLI tool!

You've transformed from someone who runs programs to someone who BUILDS them.

What you accomplished:
âœ“ Created a Rust project with Cargo
âœ“ Learned about variables, types, and references
âœ“ Parsed command-line arguments
âœ“ Handled errors gracefully
âœ“ Performed calculations with floating-point math
âœ“ Formatted beautiful output
âœ“ Tested edge cases thoroughly

This temperature converter is now YOURS. Use it whenever you need to convert temperatures. You built it, you understand it, you own it.

Ready for the next challenge? Let's build a calculator next!`,
    extensions: `Try extending your converter:
- Format output to 2 decimal places
- Accept lowercase units without normalization
- Add Kelvin support`,
  };

