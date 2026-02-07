import { Challenge } from '@/types/challenge';

export const section1Challenges: Challenge[] = [
  // Project 1: Learn Variables by Building a Temperature Converter
  {
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
        step: 0,
        title: 'Understand what you\'re building',
        instruction: `Welcome! In this project, you'll build a command-line temperature converter that converts between Fahrenheit and Celsius.

**What you're building:**
A Rust program that reads a temperature and unit from the command line, converts it to the other scale, and prints the result. For example:
- Input: \`cargo run -- 98.6 F\` → Output: \`98.6°F is 37.0°C\`
- Input: \`cargo run -- 25 C\` → Output: \`25.0°C is 77.0°F\`

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
| Absolute Zero | -459.67°F | -273.15°C | Coldest possible |
| Special Case | -40°F | -40°C | Only point where scales meet |
| Freezing Water | 32°F | 0°C | Water freezes |
| Body Temperature | 98.6°F | 37°C | Normal human body |
| Boiling Water | 212°F | 100°C | Water boils |

**The conversion formulas:**
You'll use two formulas:

1. **Fahrenheit to Celsius:** \`celsius = (fahrenheit - 32) × 5/9\`
   - Subtract 32 to account for different zero points
   - Multiply by 5/9 because Celsius degrees are larger than Fahrenheit degrees

2. **Celsius to Fahrenheit:** \`fahrenheit = (celsius × 9/5) + 32\`
   - Multiply by 9/5 to convert from larger Celsius degrees to smaller Fahrenheit degrees
   - Add 32 to account for different zero points

**Special case:** -40°F equals -40°C. This is the only temperature where both scales meet!

Don't worry about memorizing these formulas. You'll implement them step by step, and each step will explain why the formula works.`,
        task: `Read through this introduction to understand what you'll build. When you're ready, click "Next" to start creating your project!`,
        starterCode: `// Welcome to your first Rust project!
// You'll build a temperature converter step by step.
// Click "Next" when you're ready to begin.`,
        test: ['Introduction read'],
        what_you_learned: `You understand what you're building: a practical temperature converter that will teach you Rust fundamentals.`,
      },
      {
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
              regex: 'let\\s+temp(?:\\s*:\\s*f64)?\\s*=\\s*temp_str\\.parse\\(\\)\\.expect\\(\"Invalid temperature\"\\);',
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
              regex: 'let\\s+temp\\s*:\\s*f64\\s*=\\s*temp_str\\.parse\\(\\)\\.expect\\(\"Invalid temperature\"\\);|let\\s+temp\\s*=\\s*temp_str\\.parse::\\<f64\\>\\(\\)\\.expect\\(\"Invalid temperature\"\\);',
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
        step: 18,
        title: 'Convert Fahrenheit to Celsius',
        instruction: `Convert Fahrenheit temperatures to Celsius using the formula \`(temp - 32) * 5 / 9\`.

**How the formula works:**

The Fahrenheit scale sets water's freezing point at 32°F and boiling at 212°F, while Celsius uses 0°C and 100°C. The ratio between the scales is 5/9 because Celsius degrees are larger than Fahrenheit degrees. We subtract 32 to account for the different zero points, then multiply by 5/9 to convert the scale.

**Example conversion:**

Converting 98.6°F (body temperature) to Celsius:

| Step | Calculation | Result |
|------|-------------|--------|
| Start | 98.6°F | - |
| Subtract 32 | 98.6 - 32 | 66.6 |
| Multiply by 5/9 | 66.6 × (5/9) | 37.0°C |

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

You're converting 98.6°F (normal human body temperature) to Celsius!`,
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
        step: 20,
        title: 'Convert Celsius to Fahrenheit',
        instruction: `Convert Celsius temperatures to Fahrenheit using the inverse formula: \`(temp * 9 / 5) + 32\`.

**How this formula works:**

We multiply by 9/5 to convert from Celsius degrees (larger) to Fahrenheit degrees (smaller), then add 32 to account for the different zero points. This is the reverse of the F-to-C conversion.

**Example conversion:**

Converting 25°C (room temperature) to Fahrenheit:

| Step | Calculation | Result |
|------|-------------|--------|
| Start | 25°C | - |
| Multiply by 9/5 | 25 × (9/5) | 45 |
| Add 32 | 45 + 32 | 77°F |

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

Fun fact: -40°C equals -40°F! This is the only temperature where both scales meet.`,
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
        step: 24,
        title: 'Test edge cases',
        instruction: `Before considering your program complete, test it with various inputs to make sure it handles edge cases correctly. Edge cases are unusual but valid inputs that might reveal bugs.

**Important edge cases for temperature conversion:**
- Negative temperatures (below freezing)
- Zero degrees (freezing point of water)
- Very large numbers
- Decimal temperatures
- Boundary values (like -40°F, which equals -40°C)

Testing helps you catch bugs before users do. Good programs handle both normal and edge case inputs gracefully.


\`\`\`bash
# Test freezing point (water freezes at 0°C / 32°F)
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
        step: 25,
        title: 'Use your tool in real life',
        instruction: `Your converter is complete and ready to use! This isn't just a learning exercise; you've built a real tool that solves a practical problem.

Try using it for real scenarios:
- Check the weather: convert your local temperature between scales
- Cooking: convert oven temperatures (like 350°F for baking)
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
    completion_message: `🎉 Congratulations! You've built your first Rust CLI tool!

You've transformed from someone who runs programs to someone who BUILDS them.

What you accomplished:
✓ Created a Rust project with Cargo
✓ Learned about variables, types, and references
✓ Parsed command-line arguments
✓ Handled errors gracefully
✓ Performed calculations with floating-point math
✓ Formatted beautiful output
✓ Tested edge cases thoroughly

This temperature converter is now YOURS. Use it whenever you need to convert temperatures. You built it, you understand it, you own it.

Ready for the next challenge? Let's build a calculator next!`,
    extensions: `Try extending your converter:
- Format output to 2 decimal places
- Accept lowercase units without normalization
- Add Kelvin support`,
  },

  // Project 2: Learn Functions by Building a Calculator
  {
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
        step: 0,
        title: 'Understand what you\'re building',
        instruction: `Welcome! In this project, you'll build a command-line calculator that performs basic arithmetic operations.

**What you're building:**
A Rust program that reads two numbers and an operator from the command line, performs the calculation, and prints the result. For example:
- Input: \`cargo run -- 10 + 5\` → Output: \`10 + 5 = 15.00\`
- Input: \`cargo run -- 20 / 4\` → Output: \`20 / 4 = 5.00\`
- Input: \`cargo run -- 10 / 0\` → Output: \`Error: Division by zero.\`

**Why this project?**
Functions are the building blocks of Rust programs. By building a calculator, you'll learn:
- How to define functions with parameters and return types
- How to organize code into reusable pieces
- Pattern matching with \`match\` expressions
- Handling edge cases with \`Option<T>\`
- Reading and parsing command-line arguments
- Error handling and user-friendly messages

**What you'll learn:**
- **Functions**: Define reusable code blocks with \`fn\`
- **Parameters**: Pass values into functions with types
- **Return types**: Specify what functions return with \`->\`
- **Match expressions**: Choose behavior based on values
- **Option<T>**: Handle "might not have a value" cases safely
- **Command-line input**: Read user input from terminal arguments
- **Error handling**: Provide clear messages when things go wrong

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
        step: 1,
        title: 'Create the project',
        instruction: `Cargo is Rust's standard build tool. It creates a working project layout so you can focus on code instead of setup.\n\nWhen you run \`cargo new\`, Cargo creates \`src/main.rs\` (your program) and \`Cargo.toml\` (project metadata).`,
        task: `Run:\n\n\`\`\`bash\ncargo new calculator\n\`\`\``,
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
        step: 2,
        title: 'Enter the project folder',
        instruction: `Cargo commands run against the nearest \`Cargo.toml\`. Entering the project folder ensures \`cargo run\` builds the right code.`,
        task: `Run:\n\n\`\`\`bash\ncd calculator\n\`\`\``,
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
        step: 3,
        title: 'Run the starter program',
        instruction: `Rust starts executing in the \`main\` function. The \`cargo run\` command compiles your program and then runs it so you can see output immediately.`,
        task: `Run:\n\n\`\`\`bash\ncargo run\n\`\`\``,
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
        step: 4,
        title: 'Print a header',
        instruction: `CLI programs often print a short header so output is easy to recognize. This is especially helpful once your program prints multiple lines.`,
        task: `In \`main\`, print this line:\n\n\`\`\`text\nCalculator\n\`\`\``,
        starterCode: `fn main() {\n\n}`,
        highlightLine: 2,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['println!("Calculator");'],
              allRequired: true,
              hints: ['Add: println!("Calculator");'],
            },
          ],
          message: 'Add the header line',
        },
        test: ['Header is printed'],
        what_you_learned: `println! writes a line of text to stdout.`,
      },
      {
        step: 5,
        title: 'Define an add function',
        instruction: `Functions let you name a piece of logic and reuse it. In Rust, you define a function with \`fn\` followed by a name.\n\nWe'll start with an \`add\` function and grow it into a real calculator. Functions help organize code and make it easier to test and maintain.`,
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
        step: 6,
        title: 'Add parameters (a and b)',
        instruction: `Parameters are inputs to a function. In Rust, every parameter has a name and a type.\n\nWe'll use \`f64\` (64-bit floating-point) so operations like division can produce decimals. This lets you calculate things like 10 / 3 = 3.33 instead of just 3.`,
        task: `Update \`add\` to accept two parameters: \`a: f64\` and \`b: f64\`.`,
        starterCode: `fn add() {\n\n}\n\nfn main() {\n    println!("Calculator");\n}`,
        highlightLine: 1,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['fn add(a: f64, b: f64)'],
              allRequired: true,
              hints: ['Update the signature to: fn add(a: f64, b: f64)'],
            },
          ],
          message: 'Add parameters to add()',
        },
        test: ['add takes parameters'],
        what_you_learned: `Parameter types let Rust validate function calls at compile time.`,
      },
      {
        step: 7,
        title: 'Return a value from add()',
        instruction: `Rust function return types use \`->\` followed by the type. Inside the body, the last expression becomes the return value if it does not end with a semicolon.\n\nThat means \`a + b\` can be returned directly without a \`return\` keyword. This is Rust's expression-based syntax.`,
        task: `Make \`add\` return an \`f64\`, and return \`a + b\` from the function body.`,
        starterCode: `fn add(a: f64, b: f64) {\n\n}\n\nfn main() {\n    println!("Calculator");\n}`,
        highlightLine: 2,
        validation: {
          rules: [
            {
              type: 'code_matches',
              regex: 'fn\\s+add\\s*\\(\\s*a\\s*:\\s*f64\\s*,\\s*b\\s*:\\s*f64\\s*\\)\\s*->\\s*f64\\s*\\{[^}]*a\\s*\\+\\s*b[^}]*\\}',
              flags: 's',
              hints: ['Return an f64 and make the last expression a + b'],
            },
          ],
          message: 'Return a value from add()',
        },
        test: ['add returns a + b'],
        what_you_learned: `Rust can return the last expression in a function without the return keyword.`,
      },
      {
        step: 8,
        title: 'Add subtract and multiply',
        instruction: `Once you have one operation working, you can repeat the same pattern to build a small toolbox of functions. Keeping the same signature (same parameter types and return type) makes the functions easy to swap and combine.`,
        task: `Add two functions above \`main\`: \`subtract\` and \`multiply\`. Each should take \`(a: f64, b: f64)\` and return an \`f64\`.`,
        starterCode: `fn add(a: f64, b: f64) -> f64 {\n    a + b\n}\n\nfn main() {\n    println!("Calculator");\n}`,
        highlightLine: 5,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['fn subtract(a: f64, b: f64) -> f64', 'fn multiply(a: f64, b: f64) -> f64'],
              allRequired: true,
              hints: ['Add subtract() and multiply() with the same signature style as add()'],
            },
          ],
          message: 'Add subtract() and multiply()',
        },
        test: ['subtract and multiply exist'],
        what_you_learned: `A consistent function signature makes functions easy to swap and combine.`,
      },
      {
        step: 9,
        title: 'Add a safe divide function',
        instruction: `Division has an extra edge case: dividing by zero is mathematically undefined.\n\n\`Option<T>\` is Rust's simple way to represent "a value might be missing". We'll return \`Some(result)\` for normal division and \`None\` when \`b\` is 0. This prevents crashes and lets the caller handle the error gracefully.`,
        task: `Add \`divide\` that returns \`Option<f64>\`. Return \`None\` when \`b == 0.0\`, otherwise return \`Some(a / b)\`.`,
        starterCode: `fn add(a: f64, b: f64) -> f64 {\n    a + b\n}\n\nfn subtract(a: f64, b: f64) -> f64 {\n    a - b\n}\n\nfn multiply(a: f64, b: f64) -> f64 {\n    a * b\n}\n\nfn main() {\n    println!("Calculator");\n}`,
        highlightLine: 13,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['fn divide(a: f64, b: f64) -> Option<f64>', 'if b == 0.0', 'None', 'Some(a / b)'],
              allRequired: true,
              hints: ['Implement divide() using Option: return None for 0.0, otherwise Some(a / b)'],
            },
          ],
          message: 'Add divide() using Option',
        },
        test: ['divide returns Option<f64>'],
        what_you_learned: `Option is a lightweight way to represent "might not have a value".`,
      },
      {
        step: 10,
        title: 'Choose an operation with match',
        instruction: `A calculator needs to pick which operation to run based on user input. \`match\` is Rust's go-to tool for this kind of branching.\n\nWe'll create \`calculate\` that returns \`Option<f64>\`. It returns \`Some(value)\` for known operators (+,-,*,/) and \`None\` for unknown ones. This centralizes the operation selection logic.`,
        task: `Add \`calculate\` that matches \`op\` and calls \`add\`, \`subtract\`, \`multiply\`, or \`divide\`. Return \`None\` for anything else.`,
        starterCode: `fn add(a: f64, b: f64) -> f64 {\n    a + b\n}\n\nfn subtract(a: f64, b: f64) -> f64 {\n    a - b\n}\n\nfn multiply(a: f64, b: f64) -> f64 {\n    a * b\n}\n\nfn divide(a: f64, b: f64) -> Option<f64> {\n    if b == 0.0 {\n        None\n    } else {\n        Some(a / b)\n    }\n}\n\nfn main() {\n    println!("Calculator");\n}`,
        highlightLine: 17,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['fn calculate(op: &str, a: f64, b: f64) -> Option<f64>', 'match op', '"+"', '"-"', '"*"', '"/"'],
              allRequired: true,
              hints: ['Create calculate() and match on op with +, -, *, and /'],
            },
          ],
          message: 'Add calculate() with match',
        },
        test: ['calculate uses match'],
        what_you_learned: `match makes branching explicit and easy to extend.`,
      },
      {
        step: 11,
        title: 'Import env and process',
        instruction: `We'll read inputs from the command line and exit cleanly on errors.\n\n- \`std::env\` provides \`args()\`.\n- \`std::process\` provides \`exit()\`.`,
        task: `Add these imports at the top of the file:\n\n\`\`\`rust\nuse std::env;\nuse std::process;\n\`\`\``,
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
        step: 12,
        title: 'Collect command-line arguments',
        instruction: `\`env::args()\` returns an iterator of strings. Collecting into a \`Vec<String>\` stores them so you can access by index.\n\nIndex 0 is the program name (like "calculator"). User input starts at index 1. So \`args[1]\` is the first number, \`args[2]\` is the operator, and \`args[3]\` is the second number.`,
        task: `In \`main\`, collect the args into a \`Vec<String>\` named \`args\`.`,
        starterCode: `use std::env;\nuse std::process;\n\nfn add(a: f64, b: f64) -> f64 {\n    a + b\n}\n\nfn subtract(a: f64, b: f64) -> f64 {\n    a - b\n}\n\nfn multiply(a: f64, b: f64) -> f64 {\n    a * b\n}\n\nfn divide(a: f64, b: f64) -> Option<f64> {\n    if b == 0.0 {\n        None\n    } else {\n        Some(a / b)\n    }\n}\n\nfn calculate(op: &str, a: f64, b: f64) -> Option<f64> {\n    match op {\n        "+" => Some(add(a, b)),\n        "-" => Some(subtract(a, b)),\n        "*" => Some(multiply(a, b)),\n        "/" => divide(a, b),\n        _ => None,\n    }\n}\n\nfn main() {\n    println!("Calculator");\n\n\n}`,
        highlightLine: 39,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let args: Vec<String> = env::args().collect();'],
              allRequired: true,
              hints: ['Add: let args: Vec<String> = env::args().collect();'],
            },
          ],
          message: 'Collect args',
        },
        test: ['Args collected'],
        what_you_learned: `Collecting args into a Vec makes positional access possible.`,
      },
      {
        step: 13,
        title: 'Add a usage guard',
        instruction: `Before indexing args, guard against missing input. If the user does not provide 3 values (num1, operator, num2), print a usage line and exit with a non-zero code.\n\nThis prevents an "index out of bounds" panic and gives the user a clear fix. Good CLI programs always validate input before using it.`,
        task: `If \`args.len() < 4\`, print this usage line and exit with \`process::exit(1)\`:\n\n\`\`\`text\nUsage: calculator <num1> <operator> <num2>\n\`\`\`\n\nThen run:\n\n\`\`\`bash\ncargo run\n\`\`\``,
        starterCode: `use std::env;\nuse std::process;\n\nfn add(a: f64, b: f64) -> f64 {\n    a + b\n}\n\nfn subtract(a: f64, b: f64) -> f64 {\n    a - b\n}\n\nfn multiply(a: f64, b: f64) -> f64 {\n    a * b\n}\n\nfn divide(a: f64, b: f64) -> Option<f64> {\n    if b == 0.0 {\n        None\n    } else {\n        Some(a / b)\n    }\n}\n\nfn calculate(op: &str, a: f64, b: f64) -> Option<f64> {\n    match op {\n        "+" => Some(add(a, b)),\n        "-" => Some(subtract(a, b)),\n        "*" => Some(multiply(a, b)),\n        "/" => divide(a, b),\n        _ => None,\n    }\n}\n\nfn main() {\n    println!("Calculator");\n\n    let args: Vec<String> = env::args().collect();\n\n\n}`,
        highlightLine: 41,
        validation: {
          rules: [
            {
              type: 'code_matches',
              regex: 'if\\s+args\\.len\\(\\)\\s*<\\s*4\\s*\\{[^}]*println!\\("Usage: calculator <num1> <operator> <num2>"\\);[^}]*process::exit\\(1\\);[^}]*\\}',
              flags: 's',
              hints: ['Add an if args.len() < 4 { println!(...); process::exit(1); }'],
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
        step: 14,
        title: 'Parse the first number',
        instruction: `Command-line arguments arrive as strings. To use them for math, you need to convert them to numbers.\n\nThe \`parse()\` method converts a string into a number type. We'll use \`f64\` for floating-point numbers so division works correctly.`,
        task: `Parse \`args[1]\` into an \`f64\` and store it in \`num1\`. Use \`parse().expect()\` to handle parsing errors.`,
        starterCode: `use std::env;\nuse std::process;\n\nfn add(a: f64, b: f64) -> f64 {\n    a + b\n}\n\nfn subtract(a: f64, b: f64) -> f64 {\n    a - b\n}\n\nfn multiply(a: f64, b: f64) -> f64 {\n    a * b\n}\n\nfn divide(a: f64, b: f64) -> Option<f64> {\n    if b == 0.0 {\n        None\n    } else {\n        Some(a / b)\n    }\n}\n\nfn calculate(op: &str, a: f64, b: f64) -> Option<f64> {\n    match op {\n        "+" => Some(add(a, b)),\n        "-" => Some(subtract(a, b)),\n        "*" => Some(multiply(a, b)),\n        "/" => divide(a, b),\n        _ => None,\n    }\n}\n\nfn main() {\n    println!("Calculator");\n\n    let args: Vec<String> = env::args().collect();\n\n    if args.len() < 4 {\n        println!("Usage: calculator <num1> <operator> <num2>");\n        process::exit(1);\n    }\n\n\n}`,
        highlightLine: 41,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let num1: f64 = args[1].parse().expect'],
              allRequired: true,
              hints: ['Add: let num1: f64 = args[1].parse().expect("Invalid number");'],
            },
          ],
          message: 'Parse the first number',
        },
        test: ['First number parsed'],
        what_you_learned: `parse() converts strings into numbers. expect() handles errors by printing a message and exiting.`,
      },
      {
        step: 15,
        title: 'Read the operator',
        instruction: `The operator is a string that tells us which calculation to perform. We don't need to parse it since \`match\` works with strings.\n\nWe'll read it directly from \`args[2]\` as a string slice.`,
        task: `Read the operator from \`args[2]\` and store it in \`op\`. Use \`&args[2]\` to get a string slice.`,
        starterCode: `use std::env;\nuse std::process;\n\nfn add(a: f64, b: f64) -> f64 {\n    a + b\n}\n\nfn subtract(a: f64, b: f64) -> f64 {\n    a - b\n}\n\nfn multiply(a: f64, b: f64) -> f64 {\n    a * b\n}\n\nfn divide(a: f64, b: f64) -> Option<f64> {\n    if b == 0.0 {\n        None\n    } else {\n        Some(a / b)\n    }\n}\n\nfn calculate(op: &str, a: f64, b: f64) -> Option<f64> {\n    match op {\n        "+" => Some(add(a, b)),\n        "-" => Some(subtract(a, b)),\n        "*" => Some(multiply(a, b)),\n        "/" => divide(a, b),\n        _ => None,\n    }\n}\n\nfn main() {\n    println!("Calculator");\n\n    let args: Vec<String> = env::args().collect();\n\n    if args.len() < 4 {\n        println!("Usage: calculator <num1> <operator> <num2>");\n        process::exit(1);\n    }\n\n    let num1: f64 = args[1].parse().expect("Invalid number");\n\n\n}`,
        highlightLine: 43,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let op = &args[2];'],
              allRequired: true,
              hints: ['Add: let op = &args[2];'],
            },
          ],
          message: 'Read the operator',
        },
        test: ['Operator read'],
        what_you_learned: `String slices (&str) work directly with match expressions.`,
      },
      {
        step: 16,
        title: 'Parse the second number',
        instruction: `Just like the first number, we need to parse the second number from a string into an \`f64\`.\n\nThis follows the same pattern as parsing \`num1\`.`,
        task: `Parse \`args[3]\` into an \`f64\` and store it in \`num2\`.`,
        starterCode: `use std::env;\nuse std::process;\n\nfn add(a: f64, b: f64) -> f64 {\n    a + b\n}\n\nfn subtract(a: f64, b: f64) -> f64 {\n    a - b\n}\n\nfn multiply(a: f64, b: f64) -> f64 {\n    a * b\n}\n\nfn divide(a: f64, b: f64) -> Option<f64> {\n    if b == 0.0 {\n        None\n    } else {\n        Some(a / b)\n    }\n}\n\nfn calculate(op: &str, a: f64, b: f64) -> Option<f64> {\n    match op {\n        "+" => Some(add(a, b)),\n        "-" => Some(subtract(a, b)),\n        "*" => Some(multiply(a, b)),\n        "/" => divide(a, b),\n        _ => None,\n    }\n}\n\nfn main() {\n    println!("Calculator");\n\n    let args: Vec<String> = env::args().collect();\n\n    if args.len() < 4 {\n        println!("Usage: calculator <num1> <operator> <num2>");\n        process::exit(1);\n    }\n\n    let num1: f64 = args[1].parse().expect("Invalid number");\n    let op = &args[2];\n\n\n}`,
        highlightLine: 45,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let num2: f64 = args[3].parse().expect'],
              allRequired: true,
              hints: ['Add: let num2: f64 = args[3].parse().expect("Invalid number");'],
            },
          ],
          message: 'Parse the second number',
        },
        test: ['Second number parsed'],
        what_you_learned: `Parsing follows the same pattern for both numbers.`,
      },
      {
        step: 17,
        title: 'Call calculate with the inputs',
        instruction: `Now that you have all three inputs parsed, you can call your \`calculate\` function.\n\nPass the operator and both numbers to \`calculate\`, and store the result in a variable.`,
        task: `Call \`calculate(op, num1, num2)\` and store the result in \`result\`.`,
        starterCode: `use std::env;\nuse std::process;\n\nfn add(a: f64, b: f64) -> f64 {\n    a + b\n}\n\nfn subtract(a: f64, b: f64) -> f64 {\n    a - b\n}\n\nfn multiply(a: f64, b: f64) -> f64 {\n    a * b\n}\n\nfn divide(a: f64, b: f64) -> Option<f64> {\n    if b == 0.0 {\n        None\n    } else {\n        Some(a / b)\n    }\n}\n\nfn calculate(op: &str, a: f64, b: f64) -> Option<f64> {\n    match op {\n        "+" => Some(add(a, b)),\n        "-" => Some(subtract(a, b)),\n        "*" => Some(multiply(a, b)),\n        "/" => divide(a, b),\n        _ => None,\n    }\n}\n\nfn main() {\n    println!("Calculator");\n\n    let args: Vec<String> = env::args().collect();\n\n    if args.len() < 4 {\n        println!("Usage: calculator <num1> <operator> <num2>");\n        process::exit(1);\n    }\n\n    let num1: f64 = args[1].parse().expect("Invalid number");\n    let op = &args[2];\n    let num2: f64 = args[3].parse().expect("Invalid number");\n\n\n}`,
        highlightLine: 47,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let result = calculate(op, num1, num2);'],
              allRequired: true,
              hints: ['Add: let result = calculate(op, num1, num2);'],
            },
          ],
          message: 'Call calculate() with the inputs',
        },
        test: ['calculate() called'],
        what_you_learned: `Functions let you organize logic and reuse it with different inputs.`,
      },
      {
        step: 18,
        title: 'Print the result',
        instruction: `Printing is where your program becomes usable. Consistent formatting makes it easier to read outputs for different operations.\n\nWe'll print the result with two decimal places so division looks consistent. Try calculating something practical: 25 + 17 (adding two numbers together).`,
        task: `If \`result\` is \`Some(value)\`, print the calculation in this format:\n\n\`\`\`text\n<num1> <op> <num2> = <result>\n\`\`\`\n\nThen run:\n\n\`\`\`bash\ncargo run -- 25 + 17\n\`\`\``,
        starterCode: `use std::env;\nuse std::process;\n\nfn add(a: f64, b: f64) -> f64 {\n    a + b\n}\n\nfn subtract(a: f64, b: f64) -> f64 {\n    a - b\n}\n\nfn multiply(a: f64, b: f64) -> f64 {\n    a * b\n}\n\nfn divide(a: f64, b: f64) -> Option<f64> {\n    if b == 0.0 {\n        None\n    } else {\n        Some(a / b)\n    }\n}\n\nfn calculate(op: &str, a: f64, b: f64) -> Option<f64> {\n    match op {\n        "+" => Some(add(a, b)),\n        "-" => Some(subtract(a, b)),\n        "*" => Some(multiply(a, b)),\n        "/" => divide(a, b),\n        _ => None,\n    }\n}\n\nfn main() {\n    println!("Calculator");\n\n    let args: Vec<String> = env::args().collect();\n\n    if args.len() < 4 {\n        println!("Usage: calculator <num1> <operator> <num2>");\n        process::exit(1);\n    }\n\n    let num1: f64 = args[1].parse().expect("Invalid number");\n    let op = &args[2];\n    let num2: f64 = args[3].parse().expect("Invalid number");\n\n    let result = calculate(op, num1, num2);\n\n\n}`,
        highlightLine: 55,
        validation: {
          rules: [
            {
              type: 'code_matches',
              regex: 'match\\s+result\\s*\\{[^}]*Some\\(\\s*value\\s*\\)\\s*=>\\s*println!\\("\\{\\}\\s+\\{\\}\\s+\\{\\}\\s+=\\s+\\{:\\.{2}\\}"\\s*,\\s*num1\\s*,\\s*op\\s*,\\s*num2\\s*,\\s*value\\s*\\)[^}]*\\}',
              flags: 's',
              hints: ['Match on result and print the Some(value) case with {:.2} for the result'],
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
        step: 19,
        title: 'Handle errors and exit',
        instruction: `When \`calculate\` returns \`None\`, something went wrong. It could be an unknown operator, or it could be division by zero.\n\nClear error messages are part of good CLI UX. Exiting with a non-zero code stops the program and signals failure. Try dividing 100 by 0 to see your error handling in action!`,
        task: `In the \`None\` case, print a message and exit:\n\n- If \`op == "/"\` and \`num2 == 0.0\`, print:\n\n\`\`\`text\nError: Division by zero.\n\`\`\`\n\n- Otherwise, print this pattern (with the actual operator):\n\n\`\`\`text\nError: Invalid operation '^'. Use +, -, *, or /.\n\`\`\`\n\nThen run:\n\n\`\`\`bash\ncargo run -- 100 / 0\n\`\`\``,
        starterCode: `use std::env;\nuse std::process;\n\nfn add(a: f64, b: f64) -> f64 {\n    a + b\n}\n\nfn subtract(a: f64, b: f64) -> f64 {\n    a - b\n}\n\nfn multiply(a: f64, b: f64) -> f64 {\n    a * b\n}\n\nfn divide(a: f64, b: f64) -> Option<f64> {\n    if b == 0.0 {\n        None\n    } else {\n        Some(a / b)\n    }\n}\n\nfn calculate(op: &str, a: f64, b: f64) -> Option<f64> {\n    match op {\n        "+" => Some(add(a, b)),\n        "-" => Some(subtract(a, b)),\n        "*" => Some(multiply(a, b)),\n        "/" => divide(a, b),\n        _ => None,\n    }\n}\n\nfn main() {\n    println!("Calculator");\n\n    let args: Vec<String> = env::args().collect();\n\n    if args.len() < 4 {\n        println!("Usage: calculator <num1> <operator> <num2>");\n        process::exit(1);\n    }\n\n    let num1: f64 = args[1].parse().expect("Invalid number");\n    let op = &args[2];\n    let num2: f64 = args[3].parse().expect("Invalid number");\n\n    let result = calculate(op, num1, num2);\n\n    match result {\n        Some(value) => println!("{} {} {} = {:.2}", num1, op, num2, value),\n        None => {\n\n        }\n    }\n}`,
        highlightLine: 54,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['println!("Error: Division by zero.");'],
              allRequired: true,
              hints: ['Print: Error: Division by zero.'],
            },
            {
              type: 'code_contains',
              patterns: ['println!("Error: Invalid operation', 'Use +, -, *, or /."'],
              allRequired: true,
              hints: ['Print an invalid operation message that includes the operator'],
            },
            {
              type: 'code_contains',
              patterns: ['process::exit(1);'],
              allRequired: true,
              hints: ['Exit with process::exit(1); in the error case'],
            },
            {
              type: 'code_matches',
              regex: 'None\\s*=>\\s*\\{[^}]*process::exit\\(1\\);[^}]*\\}',
              flags: 's',
              hints: ['Make sure the None arm exits (not just prints)'],
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
        step: 20,
        title: 'Test invalid operators',
        instruction: `Error paths are part of normal program behavior. Testing them makes sure your messages and exits stay correct. Try using an invalid operator like ^ (power) to see how your program handles unknown operations.`,
        task: `Run:\n\n\`\`\`bash\ncargo run -- 5 ^ 2\n\`\`\``,
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
        step: 21,
        title: 'Use your calculator in real life',
        instruction: `Your calculator is ready! It's a real command-line tool you can use.

Try these real-world scenarios:
- Calculate a tip: \`cargo run -- 50 * 0.15\` (15% tip on $50)
- Split a bill: \`cargo run -- 120 / 4\` (split $120 among 4 people)
- Convert units: \`cargo run -- 100 * 1.609\` (100 miles to kilometers)
- Calculate discounts: \`cargo run -- 200 - 50\` (original price minus discount)

You've built something useful. That's what programming is all about!`,
        task: `Run your program with a few different real-world inputs. For example, try: \`cargo run -- 50 * 0.15\`.`,
        starterCode: `// Your completed calculator code is here!
// Feel free to experiment with it.`,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo run',
              projectSpecific: '50 * 0.15',
              hints: ['Run: cargo run -- 50 * 0.15'],
            },
          ],
          message: 'Run your program with a real-world input.',
        },
        test: ['Real-world usage tested'],
        what_you_learned: `You've built a practical tool that can be used in everyday life.`,
      },
    ],
    completion_message: `🎉 Congratulations! You've built your first Rust calculator!

You've transformed from someone who writes simple programs to someone who organizes code into reusable functions.

What you accomplished:
✓ Created a Rust project with Cargo
✓ Learned about functions, parameters, and return types
✓ Used pattern matching with \`match\` expressions
✓ Handled edge cases with \`Option<T>\`
✓ Parsed command-line arguments
✓ Built error handling that's user-friendly

This calculator is now YOURS. Use it whenever you need quick calculations—you built it, you understand it, you own it.

Ready for the next challenge? Let's build a text adventure next!`,
    extensions: `Try extending your calculator:\n- Add a modulo operator (and decide how it should behave for floats)\n- Improve error handling by returning Result instead of Option\n- Add a --help flag and more detailed usage\n- Support multi-step expressions (requires parsing)`,
  },
  // Project 3: Learn Ownership by Building a Text Adventure
  {
    id: 'project-003',
    title: 'Learn Ownership by Building a Text Adventure',
    section: 1,
    type: 'practice',
    estimated_time: 90,
    difficulty: 'beginner',
    concepts_taught: ['ownership', 'move_semantics', 'String_vs_str', 'borrowing', 'command_line_args'],
    project_overview: `In this project, you'll build a tiny text adventure that is driven by command-line arguments. Along the way, you'll practice Rust ownership and borrowing in a real program.`,
    why_this_project: `Strings are one of the fastest ways to feel ownership rules. You'll pass text into functions, borrow it safely, and learn when you need to clone.`,
    prerequisites: [
      'Completed: Learn Variables by Building a Temperature Converter',
      'Completed: Learn Functions by Building a Calculator',
    ],
    preview: {
      mode: 'onLoad',
      title: 'Rust Adventure',
      description: 'A tiny CLI story game that uses ownership-friendly String handling.',
      example_output: `$ cargo run -- Alice north\nRust Adventure\nWelcome, Alice!\nYou are in a dark forest. Choose a direction.\nAlice, you walk north and find a treasure chest.\n(debug) consumed name: Alice\nThanks for playing, Alice!\n\n$ cargo run\nUsage: text_adventure <name> <north|south|stay>`,
    },
    steps: [
      {
        step: 1,
        title: 'Create the project',
        instruction: `Use Cargo to create a new project. This gives you a fresh \`src/main.rs\` and a \`Cargo.toml\`.`,
        task: `Run:\n\n\`\`\`bash\ncargo new text_adventure\n\`\`\``,
        starterCode: `fn main() {\n\n}`,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo new',
              projectSpecific: 'text_adventure',
              hints: ['Run: cargo new text_adventure'],
            },
          ],
          message: 'Create the text_adventure project',
        },
        test: ['Project directory created'],
        what_you_learned: `Cargo creates a standard Rust project layout.`,
      },
      {
        step: 2,
        title: 'Enter the project folder',
        instruction: `Move into the project so \`cargo run\` uses the right \`Cargo.toml\`.`,
        task: `Run:\n\n\`\`\`bash\ncd text_adventure\n\`\`\``,
        starterCode: `fn main() {\n\n}`,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cd text_adventure',
              hints: ['Run: cd text_adventure'],
            },
          ],
          message: 'Enter the text_adventure folder',
        },
        test: ['Terminal in text_adventure directory'],
        what_you_learned: `Cargo commands should run from the project root.`,
      },
      {
        step: 3,
        title: 'Run the starter program',
        instruction: `Running early confirms the toolchain works before you add logic.`,
        task: `Run:\n\n\`\`\`bash\ncargo run\n\`\`\``,
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
        what_you_learned: `cargo run compiles and runs your Rust program.`,
      },
      {
        step: 4,
        title: 'Print a header',
        instruction: `A short header makes it obvious when your program starts and helps you read later output.`,
        task: `Print this line at the start of \`main\`:\n\n\`\`\`text\nRust Adventure\n\`\`\``,
        starterCode: `fn main() {\n\n}`,
        highlightLine: 2,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['println!("Rust Adventure");'],
              allRequired: true,
              hints: ['Add: println!("Rust Adventure");'],
            },
          ],
          message: 'Print the header',
        },
        test: ['Header printed'],
        what_you_learned: `Clear output starts with a recognizable header.`,
      },
      {
        step: 5,
        title: 'Import env and process',
        instruction: `This project is driven by command-line arguments.\n\n- \`std::env\` gives you \`args()\`.\n- \`std::process\` lets you exit early on invalid input.`,
        task: `Add these imports at the top of the file:\n\n\`\`\`rust\nuse std::env;\nuse std::process;\n\`\`\``,
        starterCode: `fn main() {\n    println!("Rust Adventure");\n}`,
        highlightLine: 1,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['use std::env;', 'use std::process;'],
              allRequired: true,
              hints: ['Add: use std::env; and use std::process;'],
            },
          ],
          message: 'Add imports',
        },
        test: ['Imports added'],
        what_you_learned: `Imports bring modules into scope.`,
      },
      {
        step: 6,
        title: 'Collect arguments and guard missing input',
        instruction: `\`env::args()\` includes the program name at index 0. We'll expect two user values: a name and a choice.\n\nGuarding missing input prevents out-of-bounds indexing and gives a helpful usage message.`,
        task: `Collect args into \`args\`. If \`args.len() < 3\`, print this usage line and exit with \`process::exit(1)\`:\n\n\`\`\`text\nUsage: text_adventure <name> <north|south|stay>\n\`\`\`\n\nThen run:\n\n\`\`\`bash\ncargo run\n\`\`\``,
        starterCode: `use std::env;\nuse std::process;\n\nfn main() {\n    println!("Rust Adventure");\n\n\n}`,
        highlightLine: 7,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let args: Vec<String> = env::args().collect();'],
              allRequired: true,
              hints: ['Add: let args: Vec<String> = env::args().collect();'],
            },
            {
              type: 'code_matches',
              regex: 'if\\s+args\\.len\\(\\)\\s*<\\s*3\\s*\\{[^}]*println!\\("Usage: text_adventure <name> <north\\|south\\|stay>"\\);[^}]*process::exit\\(1\\);[^}]*\\}',
              flags: 's',
              hints: ['Add the if block with the usage println and process::exit(1)'],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Run: cargo run (with no arguments)'],
            },
          ],
          message: 'Guard missing input and test it',
        },
        test: ['Usage guard added', 'Program was run'],
        what_you_learned: `Length checks prevent panics and make tools easier to use.`,
      },
      {
        step: 7,
        title: 'Create an owned player name',
        instruction: `Command-line args are stored as \`String\` values inside \`Vec<String>\`.\n\nIndexing gives you a reference (\`&String\`). Cloning creates an owned \`String\` you can pass around freely. This is a real example of ownership: you decide when to allocate a new owned value.`,
        task: `Create \`player_name\` as an owned \`String\` by cloning \`args[1]\`.`,
        starterCode: `use std::env;\nuse std::process;\n\nfn main() {\n    println!("Rust Adventure");\n\n    let args: Vec<String> = env::args().collect();\n\n    if args.len() < 3 {\n        println!("Usage: text_adventure <name> <north|south|stay>");\n        process::exit(1);\n    }\n\n\n}`,
        highlightLine: 15,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let player_name = args[1].clone();'],
              allRequired: true,
              hints: ['Add: let player_name = args[1].clone();'],
            },
          ],
          message: 'Create an owned String for the name',
        },
        test: ['player_name created'],
        what_you_learned: `Cloning creates a new owned String when you need ownership.`,
      },
      {
        step: 8,
        title: 'Normalize the choice',
        instruction: `Users might type \`North\`, \`NORTH\`, or \`north\`. Normalizing input to lowercase gives you one consistent value to compare.\n\n\`to_lowercase()\` returns a new \`String\`. That means you still have the original argument if you want it later for error messages.`,
        task: `Create \`choice\` from \`args[2]\` in lowercase.`,
        starterCode: `use std::env;\nuse std::process;\n\nfn main() {\n    println!("Rust Adventure");\n\n    let args: Vec<String> = env::args().collect();\n\n    if args.len() < 3 {\n        println!("Usage: text_adventure <name> <north|south|stay>");\n        process::exit(1);\n    }\n\n    let player_name = args[1].clone();\n\n\n}`,
        highlightLine: 17,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let choice = args[2].to_lowercase();'],
              allRequired: true,
              hints: ['Add: let choice = args[2].to_lowercase();'],
            },
          ],
          message: 'Normalize the choice',
        },
        test: ['choice normalized'],
        what_you_learned: `Normalization reduces the number of cases your logic must handle.`,
      },
      {
        step: 9,
        title: 'Borrow with &str in a function',
        instruction: `Borrowing lets a function use data without taking ownership.\n\nWe'll write \`intro\` to take \`&str\`. When you pass \`&player_name\` (a \`&String\`), Rust automatically coerces it to \`&str\` because String derefs to str.`,
        task: `Add an \`intro\` function above \`main\` with signature \`fn intro(name: &str)\`. Inside, print two lines:\n\n- \`Welcome, <name>!\`\n- \`You are in a dark forest. Choose a direction.\`\n\nCall it from \`main\` using \`&player_name\`.`,
        starterCode: `use std::env;\nuse std::process;\n\nfn main() {\n    println!("Rust Adventure");\n\n    let args: Vec<String> = env::args().collect();\n\n    if args.len() < 3 {\n        println!("Usage: text_adventure <name> <north|south|stay>");\n        process::exit(1);\n    }\n\n    let player_name = args[1].clone();\n    let choice = args[2].to_lowercase();\n\n\n}`,
        highlightLine: 3,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['fn intro(name: &str)', 'println!("Welcome, {}!", name);', 'You are in a dark forest. Choose a direction.'],
              allRequired: true,
              hints: ['Add intro(name: &str) and print the welcome + forest lines'],
            },
            {
              type: 'code_contains',
              patterns: ['intro(&player_name);'],
              allRequired: true,
              hints: ['Call: intro(&player_name);'],
            },
          ],
          message: 'Borrow name in intro()',
        },
        test: ['intro() added and called'],
        what_you_learned: `Borrowing (&str) lets functions read data without taking ownership.`,
      },
      {
        step: 10,
        title: 'Write the story outcome function',
        instruction: `Sometimes your function needs to produce new text. Returning a \`String\` is a common pattern when you build output using \`format!\`.\n\n\`format!\` is like \`println!\`, but instead of printing, it returns a \`String\`.`,
        task: `Add \`outcome(choice: &str, name: &str) -> String\`. Use \`match\` on choice and return a different sentence for \`north\`, \`south\`, and \`stay\`. Each sentence should include \`name\`.`,
        starterCode: `use std::env;\nuse std::process;\n\nfn intro(name: &str) {\n    println!("Welcome, {}!", name);\n    println!("You are in a dark forest. Choose a direction.");\n}\n\nfn main() {\n    println!("Rust Adventure");\n\n    let args: Vec<String> = env::args().collect();\n\n    if args.len() < 3 {\n        println!("Usage: text_adventure <name> <north|south|stay>");\n        process::exit(1);\n    }\n\n    let player_name = args[1].clone();\n    let choice = args[2].to_lowercase();\n\n    intro(&player_name);\n\n\n}`,
        highlightLine: 7,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['fn outcome(choice: &str, name: &str) -> String', 'match choice', '"north"', '"south"', '"stay"', 'format!'],
              allRequired: true,
              hints: ['Add outcome() that returns a String using match and format!'],
            },
          ],
          message: 'Add outcome()',
        },
        test: ['outcome() added'],
        what_you_learned: `format! builds a String you can return from a function.`,
      },
      {
        step: 11,
        title: 'Print the outcome and test',
        instruction: `Now we can connect the pieces. We'll call \`outcome\`, store the returned \`String\`, and print it.`,
        task: `Call \`outcome\` with \`&choice\` and \`&player_name\`. Store it in \`story\` and print it.\n\nThen run:\n\n\`\`\`bash\ncargo run -- Alice north\n\`\`\``,
        starterCode: `use std::env;\nuse std::process;\n\nfn intro(name: &str) {\n    println!("Welcome, {}!", name);\n    println!("You are in a dark forest. Choose a direction.");\n}\n\nfn outcome(choice: &str, name: &str) -> String {\n    match choice {\n        "north" => format!("{}, you walk north and find a treasure chest.", name),\n        "south" => format!("{}, you head south and meet a friendly traveler.", name),\n        "stay" => format!("{}, you decide to stay put and wait.", name),\n        _ => format!("{}, you hesitate.", name),\n    }\n}\n\nfn main() {\n    println!("Rust Adventure");\n\n    let args: Vec<String> = env::args().collect();\n\n    if args.len() < 3 {\n        println!("Usage: text_adventure <name> <north|south|stay>");\n        process::exit(1);\n    }\n\n    let player_name = args[1].clone();\n    let choice = args[2].to_lowercase();\n\n    intro(&player_name);\n\n\n}`,
        highlightLine: 30,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let story = outcome(&choice, &player_name);', 'println!("{}", story);'],
              allRequired: true,
              hints: ['Add: let story = outcome(&choice, &player_name); then println!("{}", story);'],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              projectSpecific: 'alice north',
              hints: ['Run: cargo run -- Alice north'],
            },
          ],
          message: 'Print the outcome and test it',
        },
        test: ['Outcome printed', 'Program was run'],
        what_you_learned: `Returning a String lets you build text in one function and print it elsewhere.`,
      },
      {
        step: 12,
        title: 'Move ownership into a function (with clone)',
        instruction: `Passing a \`String\` into a function moves ownership by default. After a move, you cannot use the original variable.\n\nIf you still need the original value, one option is to \`clone()\` the \`String\`. This copies the heap data, so it has a real cost. Use it intentionally.`,
        task: `Create \`consume_name(name: String)\` that prints:\n\n\`\`\`text\n(debug) consumed name: <name>\n\`\`\`\n\nCall it using \`player_name.clone()\`.`,
        starterCode: `use std::env;\nuse std::process;\n\nfn intro(name: &str) {\n    println!("Welcome, {}!", name);\n    println!("You are in a dark forest. Choose a direction.");\n}\n\nfn outcome(choice: &str, name: &str) -> String {\n    match choice {\n        "north" => format!("{}, you walk north and find a treasure chest.", name),\n        "south" => format!("{}, you head south and meet a friendly traveler.", name),\n        "stay" => format!("{}, you decide to stay put and wait.", name),\n        _ => format!("{}, you hesitate.", name),\n    }\n}\n\nfn main() {\n    println!("Rust Adventure");\n\n    let args: Vec<String> = env::args().collect();\n\n    if args.len() < 3 {\n        println!("Usage: text_adventure <name> <north|south|stay>");\n        process::exit(1);\n    }\n\n    let player_name = args[1].clone();\n    let choice = args[2].to_lowercase();\n\n    intro(&player_name);\n\n    let story = outcome(&choice, &player_name);\n    println!("{}", story);\n\n\n}`,
        highlightLine: 18,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['fn consume_name(name: String)', 'println!("(debug) consumed name: {}", name);', 'consume_name(player_name.clone());'],
              allRequired: true,
              hints: ['Add consume_name(name: String) and call it with player_name.clone()'],
            },
          ],
          message: 'Move ownership using clone()',
        },
        test: ['consume_name added and called'],
        what_you_learned: `clone() creates a new owned String so you can move one copy while keeping another.`,
      },
      {
        step: 13,
        title: 'Use the original String after cloning',
        instruction: `Because you passed a clone into \`consume_name\`, you still own \`player_name\` in \`main\`. This is a good moment to see the difference between moving and borrowing.`,
        task: `After the consume call, print a final line:\n\n\`\`\`text\nThanks for playing, <name>!\n\`\`\``,
        starterCode: `use std::env;\nuse std::process;\n\nfn intro(name: &str) {\n    println!("Welcome, {}!", name);\n    println!("You are in a dark forest. Choose a direction.");\n}\n\nfn outcome(choice: &str, name: &str) -> String {\n    match choice {\n        "north" => format!("{}, you walk north and find a treasure chest.", name),\n        "south" => format!("{}, you head south and meet a friendly traveler.", name),\n        "stay" => format!("{}, you decide to stay put and wait.", name),\n        _ => format!("{}, you hesitate.", name),\n    }\n}\n\nfn consume_name(name: String) {\n    println!("(debug) consumed name: {}", name);\n}\n\nfn main() {\n    println!("Rust Adventure");\n\n    let args: Vec<String> = env::args().collect();\n\n    if args.len() < 3 {\n        println!("Usage: text_adventure <name> <north|south|stay>");\n        process::exit(1);\n    }\n\n    let player_name = args[1].clone();\n    let choice = args[2].to_lowercase();\n\n    intro(&player_name);\n\n    let story = outcome(&choice, &player_name);\n    println!("{}", story);\n\n    consume_name(player_name.clone());\n\n\n}`,
        highlightLine: 41,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['println!("Thanks for playing, {}!", player_name);'],
              allRequired: true,
              hints: ['Add: println!("Thanks for playing, {}!", player_name);'],
            },
          ],
          message: 'Print the final line',
        },
        test: ['Final line printed'],
        what_you_learned: `Cloning allowed you to move one copy while keeping the original.`,
      },
      {
        step: 14,
        title: 'Reject invalid choices',
        instruction: `Now that the game runs, make the input validation user-friendly. If the choice is not one of the expected values, print an error and exit.\n\nThis is the same idea as earlier usage guards: protect your assumptions before the main logic runs.`,
        task: `After creating \`choice\`, add a check. If it is not \`north\`, \`south\`, or \`stay\`, print this pattern and exit:\n\n\`\`\`text\nError: Invalid choice '<choice>'. Use north, south, or stay.\n\`\`\`\n\nThen run:\n\n\`\`\`bash\ncargo run -- Alice sideways\n\`\`\``,
        starterCode: `use std::env;\nuse std::process;\n\nfn intro(name: &str) {\n    println!("Welcome, {}!", name);\n    println!("You are in a dark forest. Choose a direction.");\n}\n\nfn outcome(choice: &str, name: &str) -> String {\n    match choice {\n        "north" => format!("{}, you walk north and find a treasure chest.", name),\n        "south" => format!("{}, you head south and meet a friendly traveler.", name),\n        "stay" => format!("{}, you decide to stay put and wait.", name),\n        _ => format!("{}, you hesitate.", name),\n    }\n}\n\nfn consume_name(name: String) {\n    println!("(debug) consumed name: {}", name);\n}\n\nfn main() {\n    println!("Rust Adventure");\n\n    let args: Vec<String> = env::args().collect();\n\n    if args.len() < 3 {\n        println!("Usage: text_adventure <name> <north|south|stay>");\n        process::exit(1);\n    }\n\n    let player_name = args[1].clone();\n    let choice = args[2].to_lowercase();\n\n    intro(&player_name);\n\n    let story = outcome(&choice, &player_name);\n    println!("{}", story);\n\n    consume_name(player_name.clone());\n\n    println!("Thanks for playing, {}!", player_name);\n}`,
        highlightLine: 35,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['Error: Invalid choice', 'Use north, south, or stay.'],
              allRequired: true,
              hints: ['Print an invalid choice message and exit'],
            },
            {
              type: 'code_contains',
              patterns: ['process::exit(1);'],
              allRequired: true,
              hints: ['Exit with process::exit(1); for invalid choices'],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              projectSpecific: 'alice sideways',
              hints: ['Run: cargo run -- Alice sideways'],
            },
          ],
          message: 'Validate choices and test an error case',
        },
        test: ['Invalid choice handled', 'Program was run'],
        what_you_learned: `Validating inputs early keeps your program predictable.`,
      },
    ],
    completion_message: `Nice work! You built a small story program and used it to practice the most important ownership moves: borrowing with &str, creating owned Strings, and cloning when you truly need another owned copy.`,
    extensions: `Try extending your adventure:\n- Add more choices and locations\n- Add a score variable and update it based on the choice\n- Return a custom enum from outcome instead of a String\n- Replace expect/exit with Result and propagate errors`,
  },
  // Project 4: Learn Structs by Building a Student Manager
  {
    id: 'project-004',
    title: 'Learn Structs by Building a Student Manager',
    section: 1,
    type: 'practice',
    estimated_time: 90,
    difficulty: 'beginner',
    concepts_taught: [
      'structs',
      'methods',
      'associated_functions',
      'field_access',
      'mutability',
      'impl_blocks',
      'Vec',
    ],
    project_overview: `In this project, you will build a tiny student manager program. You will model a student with a struct, attach behavior with methods, store students in a vector, and compute an average grade.`,
    why_this_project: `Structs are Rust's everyday tool for organizing data. Once you can define a struct and write methods for it, you can model real programs (users, settings, records) in a way that stays readable as your code grows.`,
    prerequisites: [
      'Completed: Learn Ownership by Building a Text Adventure',
      'Basic familiarity with functions and types',
    ],
    preview: {
      mode: 'onLoad',
      title: 'Student Manager',
      description: 'Model students with a struct, print summaries, and compute an average grade.',
      example_output: `$ cargo run
Student Manager
Student: Alice (id: 1, grade: 95.0)
Student: Bob (id: 2, grade: 90.0)
Student: Charlie (id: 3, grade: 92.1)
Average grade: 92.37`,
    },
    steps: [
      {
        step: 1,
        title: 'Create the project',
        instruction: `Cargo is Rust's standard build tool. When you start a new project, Cargo creates a \`Cargo.toml\` file (project metadata) and a \`src/main.rs\` file (your program entry point).\n\nEven though you will write everything in one file for this project, the Cargo layout is still the normal way Rust programs are organized.`,
        task: `Run:\n\n\`\`\`bash\ncargo new student_manager\n\`\`\``,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo new',
              projectSpecific: 'student_manager',
              hints: ['Run: cargo new student_manager'],
            },
          ],
          message: 'Create the student_manager project',
        },
        test: ['student_manager directory exists'],
        what_you_learned: `cargo new creates a standard Rust project layout.`,
      },
      {
        step: 2,
        title: 'Enter the project folder',
        instruction: `Most Cargo commands look for a \`Cargo.toml\` in the current folder (or a parent folder). Changing into your project folder keeps Cargo focused on the right project.`,
        task: `Run:\n\n\`\`\`bash\ncd student_manager\n\`\`\``,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cd student_manager',
              hints: ['Run: cd student_manager'],
            },
          ],
          message: 'Change into the student_manager folder',
        },
        test: ['Terminal in student_manager directory'],
        what_you_learned: `Your current folder controls which Cargo project you run.`,
      },
      {
        step: 3,
        title: 'Run the starter program',
        instruction: `Rust starts executing in the \`main\` function. The \`cargo run\` command compiles your program and runs it so you can see output immediately.\n\nRunning early is a quick way to confirm your toolchain is working.`,
        task: `Run:\n\n\`\`\`bash\ncargo run\n\`\`\``,
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
        step: 4,
        title: 'Print a header',
        instruction: `CLI programs often print a short header so the output is easy to recognize. This becomes more helpful as your program grows and prints multiple lines.`,
        task: `In \`main\`, print this line:\n\n\`\`\`text\nStudent Manager\n\`\`\``,
        starterCode: `fn main() {\n\n}`,
        highlightLine: 2,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['println!("Student Manager");'],
              allRequired: true,
              hints: ['Add: println!("Student Manager");'],
            },
          ],
          message: 'Print the header line',
        },
        test: ['Header is printed'],
        what_you_learned: `println! writes a line of text to stdout.`,
      },
      {
        step: 5,
        title: 'Create a Student struct',
        instruction: `A struct lets you group related data under one name. Think of it as a custom type that has named fields.\n\nWe will model each student with a struct named \`Student\`.`,
        task: `Above \`main\`, add an empty struct named \`Student\`.`,
        starterCode: `fn main() {\n    println!("Student Manager");\n\n}`,
        highlightLine: 1,
        validation: {
          rules: [
            {
              type: 'code_matches',
              regex: 'struct\\s+Student\\s*\\{\\s*\\}',
              hints: ['Add: struct Student { } above main'],
            },
          ],
          message: 'Define the Student struct',
        },
        test: ['Student struct exists'],
        what_you_learned: `struct creates a new named type that can hold related fields.`,
      },
      {
        step: 6,
        title: 'Add fields to Student',
        instruction: `Fields describe what data a struct stores. Each field has a name and a type.\n\nUse \`String\` for a name (owned text), \`u32\` for an ID, and \`f64\` for grades so decimals are allowed.`,
        task: `Inside \`Student\`, add these fields:\n\n- \`name: String\`\n- \`id: u32\`\n- \`grade: f64\``,
        starterCode: `struct Student {\n\n}\n\nfn main() {\n    println!("Student Manager");\n}`,
        highlightLine: 2,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['name: String', 'id: u32', 'grade: f64'],
              allRequired: true,
              hints: ['Add name, id, and grade fields inside the struct'],
            },
          ],
          message: 'Add the three fields',
        },
        test: ['Student has name, id, and grade'],
        what_you_learned: `Struct fields have explicit names and types.`,
      },
      {
        step: 7,
        title: 'Add an impl block',
        instruction: `A struct defines data. An \`impl\` block is where you define behavior for that data.\n\nWe will start with an empty \`impl Student\` block, then add methods inside it in the next steps.`,
        task: `Below \`Student\`, add an empty \`impl Student { }\` block.`,
        starterCode: `struct Student {\n    name: String,\n    id: u32,\n    grade: f64,\n}\n\nfn main() {\n    println!("Student Manager");\n}`,
        highlightLine: 6,
        validation: {
          rules: [
            {
              type: 'code_matches',
              regex: 'impl\\s+Student\\s*\\{\\s*\\}',
              hints: ['Add: impl Student { } below the struct'],
            },
          ],
          message: 'Create an impl block for Student',
        },
        test: ['impl block exists'],
        what_you_learned: `impl is where you attach functions and methods to a type.`,
      },
      {
        step: 8,
        title: 'Write a constructor (Student::new)',
        instruction: `Associated functions live inside an \`impl\` block but do not take \`self\`. They are called with \`TypeName::function_name\`.\n\nA common pattern is a \`new\` function that builds and returns an instance. We will accept \`name: &str\` so callers can pass string literals, then we will convert it into an owned \`String\` inside the struct.\n\nExample pattern:\n\n\`\`\`rust\nimpl Thing {\n    fn new(label: &str) -> Thing {\n        Thing { label: label.to_string() }\n    }\n}\n\`\`\``,
        task: `Inside \`impl Student\`, add:\n\n- \`fn new(name: &str, id: u32, grade: f64) -> Student\`\n\nReturn a \`Student\` with \`name: name.to_string()\`, and the provided \`id\` and \`grade\`.`,
        starterCode: `struct Student {\n    name: String,\n    id: u32,\n    grade: f64,\n}\n\nimpl Student {\n\n}\n\nfn main() {\n    println!("Student Manager");\n}`,
        highlightLine: 8,
        validation: {
          rules: [
            {
              type: 'code_matches',
              regex: 'fn\\s+new\\s*\\(\\s*name\\s*:\\s*&str\\s*,\\s*id\\s*:\\s*u32\\s*,\\s*grade\\s*:\\s*f64\\s*\\)\\s*->\\s*(Student|Self)\\s*\\{[\\s\\S]*name\\s*:\\s*name\\.to_string\\(\\)[\\s\\S]*\\}',
              hints: ['Implement Student::new and convert name to String with to_string()'],
            },
          ],
          message: 'Implement Student::new',
        },
        test: ['Student::new exists'],
        what_you_learned: `Associated functions are called with :: and often act as constructors.`,
      },
      {
        step: 9,
        title: 'Create two students',
        instruction: `Calling a constructor keeps your creation logic consistent. You pass the inputs, and \`new\` handles building the struct.\n\nWe will create Alice and Bob in \`main\`.`,
        task: `In \`main\`, create:\n\n- \`let alice = Student::new("Alice", 1, 95.0);\`\n- \`let bob = Student::new("Bob", 2, 87.5);\``,
        starterCode: `struct Student {\n    name: String,\n    id: u32,\n    grade: f64,\n}\n\nimpl Student {\n    fn new(name: &str, id: u32, grade: f64) -> Student {\n        Student {\n            name: name.to_string(),\n            id,\n            grade,\n        }\n    }\n}\n\nfn main() {\n    println!("Student Manager");\n\n}`,
        highlightLine: 18,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let alice = Student::new("Alice", 1, 95.0);', 'let bob = Student::new("Bob", 2, 87.5);'],
              allRequired: true,
              hints: ['Create alice and bob using Student::new(...)'],
            },
          ],
          message: 'Create alice and bob',
        },
        test: ['Two Student values were created'],
        what_you_learned: `Constructor functions keep creation logic in one place.`,
      },
      {
        step: 10,
        title: 'Add a summary method',
        instruction: `Methods are functions that take a \`self\` parameter. When you write \`&self\`, the method borrows the instance instead of taking ownership.\n\nA helpful pattern is to return a formatted \`String\` from a method using \`format!\`, and let the caller decide when to print.\n\nExample pattern:\n\n\`\`\`rust\nimpl Thing {\n    fn describe(&self) -> String {\n        format!("Thing: {}", self.label)\n    }\n}\n\`\`\``,
        task: `Inside \`impl Student\`, add \`fn summary(&self) -> String\`.\n\nUse \`format!\` to return a line like \`Student: Alice (id: 1, grade: 95.0)\` using \`self.name\`, \`self.id\`, and \`self.grade\`.`,
        starterCode: `struct Student {\n    name: String,\n    id: u32,\n    grade: f64,\n}\n\nimpl Student {\n    fn new(name: &str, id: u32, grade: f64) -> Student {\n        Student {\n            name: name.to_string(),\n            id,\n            grade,\n        }\n    }\n\n}\n\nfn main() {\n    println!("Student Manager");\n\n    let alice = Student::new("Alice", 1, 95.0);\n    let bob = Student::new("Bob", 2, 87.5);\n}`,
        highlightLine: 15,
        validation: {
          rules: [
            {
              type: 'code_matches',
              regex: 'fn\\s+summary\\s*\\(\\s*&self\\s*\\)\\s*->\\s*String\\s*\\{[\\s\\S]*format!\\([\\s\\S]*self\\.name[\\s\\S]*self\\.id[\\s\\S]*self\\.grade[\\s\\S]*\\)[\\s\\S]*\\}',
              hints: ['Return a String using format!(...) and self.field access'],
            },
          ],
          message: 'Add summary(&self) -> String',
        },
        test: ['summary method exists'],
        what_you_learned: `&self borrows the struct so methods can read fields without moving values.`,
      },
      {
        step: 11,
        title: 'Print the summaries',
        instruction: `Now that each student can describe itself, you can print those summaries from \`main\`. Keeping the formatting in \`Student\` keeps \`main\` focused on program flow.`,
        task: `In \`main\`, print Alice and Bob summaries on separate lines.`,
        starterCode: `struct Student {\n    name: String,\n    id: u32,\n    grade: f64,\n}\n\nimpl Student {\n    fn new(name: &str, id: u32, grade: f64) -> Student {\n        Student {\n            name: name.to_string(),\n            id,\n            grade,\n        }\n    }\n\n    fn summary(&self) -> String {\n        format!("Student: {} (id: {}, grade: {})", self.name, self.id, self.grade)\n    }\n}\n\nfn main() {\n    println!("Student Manager");\n\n    let alice = Student::new("Alice", 1, 95.0);\n    let bob = Student::new("Bob", 2, 87.5);\n\n}`,
        highlightLine: 23,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['alice.summary()', 'bob.summary()'],
              allRequired: true,
              hints: ['Call summary() on alice and bob and print the returned String'],
            },
          ],
          message: 'Print both summaries',
        },
        test: ['Summaries are printed'],
        what_you_learned: `Dot syntax calls methods: value.method().`,
      },
      {
        step: 12,
        title: 'Run and check the output',
        instruction: `When you print user-facing output, it is worth running the program right away. You should see the header and two student lines.`,
        task: `Run:\n\n\`\`\`bash\ncargo run\n\`\`\``,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Run: cargo run'],
            },
          ],
          message: 'Run the program to confirm output',
        },
        test: ['Program was run'],
        what_you_learned: `Run after visible changes so you can catch formatting issues early.`,
      },
      {
        step: 13,
        title: 'Add an update method',
        instruction: `Some methods need to change a struct field. In Rust, a method that mutates the instance takes \`&mut self\`.\n\nThis makes mutability explicit in the method signature, and the compiler enforces it at call sites.`,
        task: `Inside \`impl Student\`, add \`fn update_grade(&mut self, new_grade: f64)\`.\n\nIn the body, set \`self.grade\` to \`new_grade\`.`,
        starterCode: `struct Student {\n    name: String,\n    id: u32,\n    grade: f64,\n}\n\nimpl Student {\n    fn new(name: &str, id: u32, grade: f64) -> Student {\n        Student {\n            name: name.to_string(),\n            id,\n            grade,\n        }\n    }\n\n    fn summary(&self) -> String {\n        format!("Student: {} (id: {}, grade: {})", self.name, self.id, self.grade)\n    }\n\n}\n\nfn main() {\n    println!("Student Manager");\n\n    let alice = Student::new("Alice", 1, 95.0);\n    let bob = Student::new("Bob", 2, 87.5);\n\n    println!("{}", alice.summary());\n    println!("{}", bob.summary());\n}`,
        highlightLine: 19,
        validation: {
          rules: [
            {
              type: 'code_matches',
              regex: 'fn\\s+update_grade\\s*\\(\\s*&mut\\s+self\\s*,\\s*new_grade\\s*:\\s*f64\\s*\\)\\s*\\{[\\s\\S]*self\\.grade\\s*=\\s*new_grade\\s*;?[\\s\\S]*\\}',
              hints: ['Add update_grade(&mut self, new_grade: f64) and assign self.grade = new_grade'],
            },
          ],
          message: 'Add update_grade(&mut self, new_grade: f64)',
        },
        test: ['update_grade method exists'],
        what_you_learned: `&mut self methods can mutate fields, but require a mutable borrow.`,
      },
      {
        step: 14,
        title: 'Call update_grade',
        instruction: `To call a \`&mut self\` method, the variable binding must be mutable. That means the student must be stored in a \`let mut\` variable.\n\nWe will update Bob grade before printing.`,
        task: `Make \`bob\` mutable and call \`bob.update_grade(90.0);\` before printing Bob summary.`,
        starterCode: `struct Student {\n    name: String,\n    id: u32,\n    grade: f64,\n}\n\nimpl Student {\n    fn new(name: &str, id: u32, grade: f64) -> Student {\n        Student {\n            name: name.to_string(),\n            id,\n            grade,\n        }\n    }\n\n    fn summary(&self) -> String {\n        format!("Student: {} (id: {}, grade: {})", self.name, self.id, self.grade)\n    }\n\n    fn update_grade(&mut self, new_grade: f64) {\n        self.grade = new_grade;\n    }\n}\n\nfn main() {\n    println!("Student Manager");\n\n    let alice = Student::new("Alice", 1, 95.0);\n    let bob = Student::new("Bob", 2, 87.5);\n\n    println!("{}", alice.summary());\n    println!("{}", bob.summary());\n}`,
        highlightLine: 26,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let mut bob = Student::new("Bob", 2, 87.5);', 'bob.update_grade(90.0);'],
              allRequired: true,
              hints: ['Change bob to let mut bob = ... and call bob.update_grade(90.0);'],
            },
          ],
          message: 'Update Bob grade using a &mut self method',
        },
        test: ['bob is mutable and update_grade is called'],
        what_you_learned: `Mutable methods require a mutable binding at the call site.`,
      },
      {
        step: 15,
        title: 'Run and confirm the update',
        instruction: `After a mutation step, run the program to confirm behavior. You should now see Bob grade printed as 90.0 (or whatever value you set).`,
        task: `Run:\n\n\`\`\`bash\ncargo run\n\`\`\``,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Run: cargo run'],
            },
          ],
          message: 'Run after updating a grade',
        },
        test: ['Program was run'],
        what_you_learned: `Run often so code changes stay connected to behavior.`,
      },
      {
        step: 16,
        title: 'Store students in a Vec',
        instruction: `A \`Vec<T>\` is Rust vector type, a growable list of values. It is a good fit when you want an ordered collection you can loop over.\n\nWe will collect students into a \`Vec<Student>\` so we can print them with one loop and compute an average.`,
        task: `Create a mutable vector named \`students\` that contains \`alice\` and \`bob\`.\n\nThen push Charlie into it. Use:\n\n- \`Student::new("Charlie", 3, 92.1)\``,
        starterCode: `struct Student {\n    name: String,\n    id: u32,\n    grade: f64,\n}\n\nimpl Student {\n    fn new(name: &str, id: u32, grade: f64) -> Student {\n        Student {\n            name: name.to_string(),\n            id,\n            grade,\n        }\n    }\n\n    fn summary(&self) -> String {\n        format!("Student: {} (id: {}, grade: {})", self.name, self.id, self.grade)\n    }\n\n    fn update_grade(&mut self, new_grade: f64) {\n        self.grade = new_grade;\n    }\n}\n\nfn main() {\n    println!("Student Manager");\n\n    let alice = Student::new("Alice", 1, 95.0);\n    let mut bob = Student::new("Bob", 2, 87.5);\n    bob.update_grade(90.0);\n\n    println!("{}", alice.summary());\n    println!("{}", bob.summary());\n\n}`,
        highlightLine: 33,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: [
                'let mut students = vec![alice, bob];',
                'students.push(Student::new("Charlie", 3, 92.1));',
              ],
              allRequired: true,
              hints: ['Create students with vec![alice, bob] and push Charlie'],
            },
          ],
          message: 'Create a Vec<Student> and add Charlie',
        },
        test: ['students vector exists and has three pushes'],
        what_you_learned: `vec![...] creates a Vec with initial values, and push adds more.`,
      },
      {
        step: 17,
        title: 'Print students from the vector',
        instruction: `Now that you have a \`Vec<Student>\`, you can loop over it. Borrowing the vector lets you read each student without moving it.\n\nA clean output is easier to read, so replace the two direct prints with a loop that prints every student summary from \`students\`.`,
        task: `Replace the two \`println!\` lines that print Alice and Bob with a \`for\` loop over \`&students\` that prints each summary.`,
        starterCode: `struct Student {\n    name: String,\n    id: u32,\n    grade: f64,\n}\n\nimpl Student {\n    fn new(name: &str, id: u32, grade: f64) -> Student {\n        Student {\n            name: name.to_string(),\n            id,\n            grade,\n        }\n    }\n\n    fn summary(&self) -> String {\n        format!("Student: {} (id: {}, grade: {})", self.name, self.id, self.grade)\n    }\n\n    fn update_grade(&mut self, new_grade: f64) {\n        self.grade = new_grade;\n    }\n}\n\nfn main() {\n    println!("Student Manager");\n\n    let alice = Student::new("Alice", 1, 95.0);\n    let mut bob = Student::new("Bob", 2, 87.5);\n    bob.update_grade(90.0);\n\n    println!("{}", alice.summary());\n    println!("{}", bob.summary());\n\n    let mut students = vec![alice, bob];\n    students.push(Student::new("Charlie", 3, 92.1));\n\n}`,
        highlightLine: 30,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['for student in &students', 'student.summary()'],
              allRequired: true,
              hints: ['Loop over &students and print student.summary()'],
            },
            {
              type: 'code_reject_patterns',
              patterns: ['println!("{}", alice.summary());', 'println!("{}", bob.summary());'],
              hints: ['Replace the two direct prints with the for loop'],
            },
          ],
          message: 'Print student summaries using a for loop',
        },
        test: ['Summaries printed in a loop'],
        what_you_learned: `Looping over &students borrows items so the Vec is not consumed.`,
      },
      {
        step: 18,
        title: 'Compute and print the average grade',
        instruction: `To compute an average, you add up all grades and divide by how many students you have.\n\nOne detail to watch in Rust: \`students.len()\` is a \`usize\` (an integer). To divide an \`f64\` total by it, cast the length to \`f64\` with \`as f64\`.\n\nExample pattern:\n\n\`\`\`rust\nlet average = total / items.len() as f64;\n\`\`\``,
        task: `After the loop, compute the average grade and print it using this label:\n\n\`\`\`text\nAverage grade: \\n\`\`\``,
        starterCode: `struct Student {\n    name: String,\n    id: u32,\n    grade: f64,\n}\n\nimpl Student {\n    fn new(name: &str, id: u32, grade: f64) -> Student {\n        Student {\n            name: name.to_string(),\n            id,\n            grade,\n        }\n    }\n\n    fn summary(&self) -> String {\n        format!("Student: {} (id: {}, grade: {})", self.name, self.id, self.grade)\n    }\n\n    fn update_grade(&mut self, new_grade: f64) {\n        self.grade = new_grade;\n    }\n}\n\nfn main() {\n    println!("Student Manager");\n\n    let alice = Student::new("Alice", 1, 95.0);\n    let mut bob = Student::new("Bob", 2, 87.5);\n    bob.update_grade(90.0);\n\n    let mut students = vec![alice, bob];\n    students.push(Student::new("Charlie", 3, 92.1));\n\n    for student in &students {\n        println!("{}", student.summary());\n    }\n\n}`,
        highlightLine: 38,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['students.len() as f64', 'println!("Average grade:'],
              allRequired: true,
              hints: ['Cast students.len() to f64 and print "Average grade:"'],
            },
            {
              type: 'code_contains',
              patterns: ['total += student.grade'],
              allRequired: true,
              hints: ['Sum grades into a total (for example: total += student.grade)'],
            },
          ],
          message: 'Compute and print the average',
        },
        test: ['Average grade computed and printed'],
        what_you_learned: `Casting with as f64 enables floating-point division with an integer length.`,
      },
      {
        step: 19,
        title: 'Run the finished program',
        instruction: `You now have a small program that models data with a struct, prints formatted summaries, and computes a statistic from a collection.\n\nRun it one last time to see the full output together.`,
        task: `Run:\n\n\`\`\`bash\ncargo run\n\`\`\``,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Run: cargo run'],
            },
          ],
          message: 'Run the finished student manager',
        },
        test: ['Program was run'],
        what_you_learned: `Testing the whole program at the end confirms everything works together.`,
      },
    ],
    completion_message: `Nice work. You modeled real data with a struct, attached behavior with methods, and used a Vec to compute a class statistic.`,
    extensions: `Try extending your student manager:\n- Add an age field and include it in the summary\n- Add a method like is_passing() that returns a bool\n- Find the top student by scanning the Vec\n- Store multiple grades per student using Vec<f64>`,
  },

  // Project 5: Learn Enums by Building a Traffic Light Simulator
  {
    id: 'project-005',
    title: 'Learn Enums by Building a Traffic Light Simulator',
    section: 1,
    type: 'practice',
    estimated_time: 90,
    difficulty: 'beginner',
    concepts_taught: [
      'enums',
      'variants',
      'pattern_matching',
      'impl_enums',
      'methods',
      'match',
      'mutability',
    ],
    project_overview: `In this project, you will build a small traffic light simulator. You will represent the light state with an enum, use match for logic, and write methods to compute the duration and the next state.`,
    why_this_project: `Enums are a natural fit for "one of a few options" data. Traffic lights are a clean example because there are only a few valid states, and each state has its own behavior.`,
    prerequisites: [
      'Completed: Learn Structs by Building a Student Manager',
      'Basic comfort with functions',
    ],
    preview: {
      mode: 'onLoad',
      title: 'Traffic Light Simulator',
      description: 'Model a traffic light with an enum and cycle through states with match.',
      example_output: `$ cargo run
Traffic Light Simulator
Traffic Light: Red
Duration: 30 seconds
Next state: Green
---
Traffic Light: Green
Duration: 25 seconds
Next state: Yellow
---
Traffic Light: Yellow
Duration: 5 seconds
Next state: Red`,
    },
    steps: [
      {
        step: 1,
        title: 'Create the project',
        instruction: `Cargo is the standard tool for building Rust projects. Starting with \`cargo new\` gives you a familiar layout with \`Cargo.toml\` and \`src/main.rs\`.

We will use that layout for this simulator.`,
        task: `Run:

\`\`\`bash
cargo new traffic_light
\`\`\``,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo new',
              projectSpecific: 'traffic_light',
              hints: ['Run: cargo new traffic_light'],
            },
          ],
          message: 'Create the traffic_light project',
        },
        test: ['traffic_light directory exists'],
        what_you_learned: `cargo new creates a new Rust project with a standard layout.`,
      },
      {
        step: 2,
        title: 'Enter the project folder',
        instruction: `Running Cargo commands from the project folder makes sure Cargo can find the correct \`Cargo.toml\`.`,
        task: `Run:

\`\`\`bash
cd traffic_light
\`\`\``,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cd traffic_light',
              hints: ['Run: cd traffic_light'],
            },
          ],
          message: 'Change into the traffic_light folder',
        },
        test: ['Terminal in traffic_light directory'],
        what_you_learned: `Your current folder controls which Cargo project you run.`,
      },
      {
        step: 3,
        title: 'Run the starter program',
        instruction: `Rust starts in \`main\`. The \`cargo run\` command compiles the program and then runs it.

Running now confirms everything is wired up correctly.`,
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
        what_you_learned: `cargo run builds and executes the current program.`,
      },
      {
        step: 4,
        title: 'Print a header',
        instruction: `A short header makes your output easier to scan. We will keep the simulator output consistent across runs.`,
        task: `In \`main\`, print this line:

\`\`\`text
Traffic Light Simulator
\`\`\``,
        starterCode: `fn main() {\n\n}`,
        highlightLine: 2,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['println!("Traffic Light Simulator");'],
              allRequired: true,
              hints: ['Add: println!("Traffic Light Simulator");'],
            },
          ],
          message: 'Print the simulator header',
        },
        test: ['Header is printed'],
        what_you_learned: `println! writes a single line to stdout.`,
      },
      {
        step: 5,
        title: 'Define a TrafficLight enum',
        instruction: `An enum (enumeration) defines a type that can be one of a fixed set of variants. This is perfect for a traffic light because only a few states are valid.

We will create a \`TrafficLight\` enum with three variants.`,
        task: `Above \`main\`, define an enum named \`TrafficLight\` with these variants:

- \`Red\`
- \`Yellow\`
- \`Green\``,
        starterCode: `fn main() {\n    println!("Traffic Light Simulator");\n\n}`,
        highlightLine: 1,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['enum TrafficLight', 'Red', 'Yellow', 'Green'],
              allRequired: true,
              hints: ['Define enum TrafficLight with Red, Yellow, and Green variants'],
            },
          ],
          message: 'Define the TrafficLight enum',
        },
        test: ['TrafficLight enum exists'],
        what_you_learned: `Enums represent one value chosen from a fixed set of valid options.`,
      },
      {
        step: 6,
        title: 'Create a light value',
        instruction: `You create an enum value by using the enum name and a variant, like \`TrafficLight::Red\`. This reads as "TrafficLight in the Red state".

We will store the current state in a variable named \`light\`.`,
        task: `In \`main\`, create a variable named \`light\` and set it to \`TrafficLight::Red\`.`,
        starterCode: `enum TrafficLight {\n    Red,\n    Yellow,\n    Green,\n}\n\nfn main() {\n    println!("Traffic Light Simulator");\n\n}`,
        highlightLine: 9,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let light = TrafficLight::Red;'],
              allRequired: true,
              hints: ['Add: let light = TrafficLight::Red;'],
            },
          ],
          message: 'Create the light variable',
        },
        test: ['light variable exists'],
        what_you_learned: `Enum values are created with TypeName::Variant.`,
      },
      {
        step: 7,
        title: 'Use match to print the state',
        instruction: `A \`match\` expression lets you handle each enum variant explicitly. Rust requires you to cover every possible variant, which prevents forgotten cases.

We will match on \`light\` and print a line that shows the state.`,
        task: `Add a \`match\` on \`light\` that prints one of these lines:

- \`Traffic Light: Red\`
- \`Traffic Light: Yellow\`
- \`Traffic Light: Green\``,
        starterCode: `enum TrafficLight {\n    Red,\n    Yellow,\n    Green,\n}\n\nfn main() {\n    println!("Traffic Light Simulator");\n\n    let light = TrafficLight::Red;\n\n}`,
        highlightLine: 11,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: [
                'match light',
                'TrafficLight::Red',
                'println!("Traffic Light: Red")',
                'TrafficLight::Yellow',
                'println!("Traffic Light: Yellow")',
                'TrafficLight::Green',
                'println!("Traffic Light: Green")',
              ],
              allRequired: true,
              hints: ['Use match light { ... } and print a line for each variant'],
            },
          ],
          message: 'Match on light and print the state',
        },
        test: ['match prints a state line'],
        what_you_learned: `match forces you to handle every enum variant.`,
      },
      {
        step: 8,
        title: 'Derive Debug for printing',
        instruction: `Rust can automatically generate some useful traits for your types. One common trait is \`Debug\`, which allows formatting with \`{:?}\`.

We will use Debug to print the next state later without writing our own formatting code.`,
        task: `Add this attribute directly above the \`TrafficLight\` enum:

\`\`\`rust
#[derive(Debug)]
\`\`\``,
        starterCode: `enum TrafficLight {\n    Red,\n    Yellow,\n    Green,\n}\n\nfn main() {\n    println!("Traffic Light Simulator");\n\n    let light = TrafficLight::Red;\n\n    match light {\n        TrafficLight::Red => println!("Traffic Light: Red"),\n        TrafficLight::Yellow => println!("Traffic Light: Yellow"),\n        TrafficLight::Green => println!("Traffic Light: Green"),\n    }\n}`,
        highlightLine: 1,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['#[derive(Debug)]'],
              allRequired: true,
              hints: ['Add: #[derive(Debug)] above the enum'],
            },
          ],
          message: 'Derive Debug on the enum',
        },
        test: ['Debug is derived'],
        what_you_learned: `#[derive(Debug)] enables {:?} formatting for a type.`,
      },
      {
        step: 9,
        title: 'Add a duration method',
        instruction: `Enums can have methods, just like structs. Inside an \`impl\` block, you can write methods that depend on the current variant.

We will add \`duration_seconds\` so each light state can provide its timing.`,
        task: `Add an \`impl TrafficLight\` block with a method:

- name: \`duration_seconds\`
- signature: \`fn duration_seconds(&self) -> u32\`

Return 30 for Red, 5 for Yellow, and 25 for Green.`,
        starterCode: `#[derive(Debug)]\nenum TrafficLight {\n    Red,\n    Yellow,\n    Green,\n}\n\nfn main() {\n    println!("Traffic Light Simulator");\n\n    let light = TrafficLight::Red;\n\n    match light {\n        TrafficLight::Red => println!("Traffic Light: Red"),\n        TrafficLight::Yellow => println!("Traffic Light: Yellow"),\n        TrafficLight::Green => println!("Traffic Light: Green"),\n    }\n}`,
        highlightLine: 7,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['impl TrafficLight', 'fn duration_seconds(&self) -> u32', 'TrafficLight::Red => 30', 'TrafficLight::Yellow => 5', 'TrafficLight::Green => 25'],
              allRequired: true,
              hints: ['Implement duration_seconds(&self) -> u32 with a match on self'],
            },
          ],
          message: 'Add duration_seconds()',
        },
        test: ['duration_seconds is implemented'],
        what_you_learned: `Methods on enums often use match to handle each variant.`,
      },
      {
        step: 10,
        title: 'Print the duration',
        instruction: `Once you have a method, you can call it with dot syntax. This keeps the logic close to the type it belongs to.

We will print the duration line using the value from \`light.duration_seconds()\`.`,
        task: `After the state print, print this line (with the number filled in):

\`\`\`text
Duration: 30 seconds
\`\`\``,
        starterCode: `#[derive(Debug)]\nenum TrafficLight {\n    Red,\n    Yellow,\n    Green,\n}\n\nimpl TrafficLight {\n    fn duration_seconds(&self) -> u32 {\n        match self {\n            TrafficLight::Red => 30,\n            TrafficLight::Yellow => 5,\n            TrafficLight::Green => 25,\n        }\n    }\n}\n\nfn main() {\n    println!("Traffic Light Simulator");\n\n    let light = TrafficLight::Red;\n\n    match light {\n        TrafficLight::Red => println!("Traffic Light: Red"),\n        TrafficLight::Yellow => println!("Traffic Light: Yellow"),\n        TrafficLight::Green => println!("Traffic Light: Green"),\n    }\n\n}`,
        highlightLine: 31,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['Duration: ', 'light.duration_seconds()'],
              allRequired: true,
              hints: ['Print duration using light.duration_seconds()'],
            },
          ],
          message: 'Print the duration line',
        },
        test: ['Duration is printed'],
        what_you_learned: `Methods make data and behavior travel together.`,
      },
      {
        step: 11,
        title: 'Add a next() method',
        instruction: `A simulator needs a way to transition between states. We will add a \`next\` method that returns the next traffic light state.

This is another place where \`match\` shines: each variant maps to exactly one next variant.`,
        task: `Inside \`impl TrafficLight\`, add a method \`fn next(&self) -> TrafficLight\`.

Return Green after Red, Yellow after Green, and Red after Yellow.`,
        starterCode: `#[derive(Debug)]\nenum TrafficLight {\n    Red,\n    Yellow,\n    Green,\n}\n\nimpl TrafficLight {\n    fn duration_seconds(&self) -> u32 {\n        match self {\n            TrafficLight::Red => 30,\n            TrafficLight::Yellow => 5,\n            TrafficLight::Green => 25,\n        }\n    }\n\n}\n\nfn main() {\n    println!("Traffic Light Simulator");\n\n    let light = TrafficLight::Red;\n\n    match light {\n        TrafficLight::Red => println!("Traffic Light: Red"),\n        TrafficLight::Yellow => println!("Traffic Light: Yellow"),\n        TrafficLight::Green => println!("Traffic Light: Green"),\n    }\n\n    println!("Duration: {} seconds", light.duration_seconds());\n}`,
        highlightLine: 18,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['fn next(&self) -> TrafficLight', 'TrafficLight::Red => TrafficLight::Green', 'TrafficLight::Green => TrafficLight::Yellow', 'TrafficLight::Yellow => TrafficLight::Red'],
              allRequired: true,
              hints: ['Implement next(&self) -> TrafficLight with a match on self'],
            },
          ],
          message: 'Add next()',
        },
        test: ['next method exists'],
        what_you_learned: `Enums make state transitions explicit and compiler-checked.`,
      },
      {
        step: 12,
        title: 'Print the next state',
        instruction: `Because \`TrafficLight\` derives \`Debug\`, you can print a value with \`{:?}\`. This is useful for quick output when you are still building.

We will call \`light.next()\` and print it as the next state.`,
        task: `Print a line that looks like this:

\`\`\`text
Next state: Green
\`\`\`

Use \`{:?}\` and \`light.next()\`.`,
        starterCode: `#[derive(Debug)]\nenum TrafficLight {\n    Red,\n    Yellow,\n    Green,\n}\n\nimpl TrafficLight {\n    fn duration_seconds(&self) -> u32 {\n        match self {\n            TrafficLight::Red => 30,\n            TrafficLight::Yellow => 5,\n            TrafficLight::Green => 25,\n        }\n    }\n\n    fn next(&self) -> TrafficLight {\n        match self {\n            TrafficLight::Red => TrafficLight::Green,\n            TrafficLight::Green => TrafficLight::Yellow,\n            TrafficLight::Yellow => TrafficLight::Red,\n        }\n    }\n}\n\nfn main() {\n    println!("Traffic Light Simulator");\n\n    let light = TrafficLight::Red;\n\n    match light {\n        TrafficLight::Red => println!("Traffic Light: Red"),\n        TrafficLight::Yellow => println!("Traffic Light: Yellow"),\n        TrafficLight::Green => println!("Traffic Light: Green"),\n    }\n\n    println!("Duration: {} seconds", light.duration_seconds());\n}`,
        highlightLine: 41,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['println!("Next state: {:?}", light.next());'],
              allRequired: true,
              hints: ['Add: println!("Next state: {:?}", light.next());'],
            },
          ],
          message: 'Print the next state',
        },
        test: ['Next state is printed'],
        what_you_learned: `Debug formatting ({:?}) is a quick way to print values while developing.`,
      },
      {
        step: 13,
        title: 'Run and inspect the output',
        instruction: `You have enough pieces to print the current state, the duration, and the next state. Run the program to see all three lines together.`,
        task: `Run:

\`\`\`bash
cargo run
\`\`\``,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Run: cargo run'],
            },
          ],
          message: 'Run the program to see the three lines',
        },
        test: ['Program was run'],
        what_you_learned: `Running after adding output helps you catch mistakes early.`,
      },
      {
        step: 14,
        title: 'Cycle through states',
        instruction: `A simulator becomes more useful when it can step through multiple states. We will loop three times and update the state each iteration.

To update the state, \`light\` must be mutable, and you will reassign it with \`light = light.next();\`.`,
        task: `Make \`light\` mutable. Then wrap your printing logic in a \`for\` loop that runs 3 times.

After printing, print \`---\` and update the state with \`light = light.next();\`.`,
        starterCode: `#[derive(Debug)]\nenum TrafficLight {\n    Red,\n    Yellow,\n    Green,\n}\n\nimpl TrafficLight {\n    fn duration_seconds(&self) -> u32 {\n        match self {\n            TrafficLight::Red => 30,\n            TrafficLight::Yellow => 5,\n            TrafficLight::Green => 25,\n        }\n    }\n\n    fn next(&self) -> TrafficLight {\n        match self {\n            TrafficLight::Red => TrafficLight::Green,\n            TrafficLight::Green => TrafficLight::Yellow,\n            TrafficLight::Yellow => TrafficLight::Red,\n        }\n    }\n}\n\nfn main() {\n    println!("Traffic Light Simulator");\n\n    let light = TrafficLight::Red;\n\n    match light {\n        TrafficLight::Red => println!("Traffic Light: Red"),\n        TrafficLight::Yellow => println!("Traffic Light: Yellow"),\n        TrafficLight::Green => println!("Traffic Light: Green"),\n    }\n\n    println!("Duration: {} seconds", light.duration_seconds());\n    println!("Next state: {:?}", light.next());\n}`,
        highlightLine: 31,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let mut light = TrafficLight::Red;', 'for _ in 0..3', 'light = light.next();', 'println!("---")'],
              allRequired: true,
              hints: ['Make light mutable, loop 3 times, print --- and set light = light.next();'],
            },
          ],
          message: 'Loop and transition the state',
        },
        test: ['Simulation loop exists'],
        what_you_learned: `State machines are often a loop plus a transition function like next().`,
      },
      {
        step: 15,
        title: 'Run the simulator',
        instruction: `Your simulator should now print three cycles. Each cycle shows the current state, its duration, and the next state.

Run it to see the full sequence.`,
        task: `Run:

\`\`\`bash
cargo run
\`\`\``,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Run: cargo run'],
            },
          ],
          message: 'Run the finished traffic light simulator',
        },
        test: ['Program was run'],
        what_you_learned: `Enums plus match are a clean way to build a state machine.`,
      },
    ],
    completion_message: `Nice work. You used an enum to model a small set of valid states, and you used match and methods to implement behavior and transitions.`,
    extensions: `Try extending your simulator:
- Add a BlinkingYellow state
- Add a function that converts a string ("red") into a TrafficLight
- Implement Display for nicer printing instead of Debug
- Add a configurable cycle count (read a number from args)`,
  },

  // Project 6: Learn Error Handling by Building a File Processor
  {
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
        step: 10,
        title: 'Count lines and words',
        instruction: `Once you have the file content as a string, you can compute simple statistics.

- \`lines()\` splits by line boundaries.
- \`split_whitespace()\` splits by whitespace and ignores extra spaces.

Both return iterators, and \`count()\` turns them into a number.`,
        task: `Using \`content\`, create two variables:

- \`lines\` set to \`content.lines().count()\`
- \`words\` set to \`content.split_whitespace().count()\``,
        starterCode: `use std::env;\nuse std::fs;\nuse std::process;\n\nfn read_file(path: &str) -> Result<String, std::io::Error> {\n    fs::read_to_string(path)\n}\n\nfn main() {\n    println!("File Processor");\n\n    let args: Vec<String> = env::args().collect();\n\n    if args.len() < 2 {\n        println!("Usage: file_processor <path|demo>");\n        process::exit(1);\n    }\n\n    let path_arg = &args[1];\n\n    let content = match read_file(path_arg) {\n        Ok(content) => content,\n        Err(err) => {\n            eprintln!("Error: Could not read file \"{}\": {}", path_arg, err);\n            process::exit(1);\n        }\n    };\n\n}`,
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
        step: 11,
        title: 'Print the counts',
        instruction: `Once you have the numbers, print them in a predictable format. Keeping output consistent makes testing easier.

These lines are designed to be easy to scan and copy into bug reports if something looks wrong.`,
        task: `Print these two lines (with the numbers filled in):

\`\`\`text
Lines: 2
Words: 3
\`\`\``,
        starterCode: `use std::env;\nuse std::fs;\nuse std::process;\n\nfn read_file(path: &str) -> Result<String, std::io::Error> {\n    fs::read_to_string(path)\n}\n\nfn main() {\n    println!("File Processor");\n\n    let args: Vec<String> = env::args().collect();\n\n    if args.len() < 2 {\n        println!("Usage: file_processor <path|demo>");\n        process::exit(1);\n    }\n\n    let path_arg = &args[1];\n\n    let content = match read_file(path_arg) {\n        Ok(content) => content,\n        Err(err) => {\n            eprintln!("Error: Could not read file \"{}\": {}", path_arg, err);\n            process::exit(1);\n        }\n    };\n\n    let lines = content.lines().count();\n    let words = content.split_whitespace().count();\n\n}`,
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
        step: 12,
        title: 'Add a demo mode',
        instruction: `In a real environment, you would pass a real path. In this learning environment, it is useful to have a built-in demo mode so you can test the success path without creating files manually.

When the argument is \`demo\`, you will create a small file and then process it. This keeps the rest of the program unchanged.`,
        task: `Change \`path_arg\` into an owned \`String\` named \`path\` (clone \`args[1]\`).

If \`path == "demo"\`, write a file named \`demo.txt\` with two lines of text, then set \`path\` to \`"demo.txt"\`.

Use \`fs::write\` and \`expect("Could not write demo file")\`.`,
        starterCode: `use std::env;\nuse std::fs;\nuse std::process;\n\nfn read_file(path: &str) -> Result<String, std::io::Error> {\n    fs::read_to_string(path)\n}\n\nfn main() {\n    println!("File Processor");\n\n    let args: Vec<String> = env::args().collect();\n\n    if args.len() < 2 {\n        println!("Usage: file_processor <path|demo>");\n        process::exit(1);\n    }\n\n    let path_arg = &args[1];\n\n    let content = match read_file(path_arg) {\n        Ok(content) => content,\n        Err(err) => {\n            eprintln!("Error: Could not read file \"{}\": {}", path_arg, err);\n            process::exit(1);\n        }\n    };\n\n    let lines = content.lines().count();\n    let words = content.split_whitespace().count();\n\n    println!("Lines: {}", lines);\n    println!("Words: {}", words);\n}`,
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
  },

  // Project 7: Learn Collections by Building a Contact Manager
  {
    id: 'project-007',
    title: 'Learn Collections by Building a Contact Manager',
    section: 1,
    type: 'practice',
    estimated_time: 120,
    difficulty: 'beginner',
    concepts_taught: [
      'Vec',
      'maps',
      'BTreeMap',
      'Option',
      'match',
      'command_line_args',
      'CRUD_operations',
    ],
    project_overview: `In this project, you will build a small contact manager CLI. You will store contacts in a map, look them up by name, and implement basic commands like list, find, add, and remove.`,
    why_this_project: `Collections are how programs manage more than one piece of data. A contact manager is a practical way to practice storing, looking up, and updating values, while also working with Option and match.`,
    prerequisites: [
      'Completed: Learn Error Handling by Building a File Processor',
      'Comfort with functions and match',
    ],
    preview: {
      mode: 'onLoad',
      title: 'Contact Manager',
      description: 'Store contacts in a map and implement list/find/add/remove commands.',
      example_output: `$ cargo run -- list
Contact Manager
Alice: 555-0100
Bob: 555-0123

$ cargo run -- find Alice
Contact Manager
Found: Alice -> 555-0100

$ cargo run -- add Carol 555-0199
Contact Manager
Added/Updated: Carol
Alice: 555-0100
Bob: 555-0123
Carol: 555-0199

$ cargo run
Usage: contact_manager <command> [args]
Commands:
  list
  find <name>
  add <name> <phone>
  remove <name>`,
    },
    steps: [
      {
        step: 1,
        title: 'Create the project',
        instruction: `This project builds a small command-line tool. Starting with Cargo keeps your setup consistent and gives you a familiar place to write code: \`src/main.rs\`.`,
        task: `Run:

\`\`\`bash
cargo new contact_manager
\`\`\``,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo new',
              projectSpecific: 'contact_manager',
              hints: ['Run: cargo new contact_manager'],
            },
          ],
          message: 'Create the contact_manager project',
        },
        test: ['contact_manager directory exists'],
        what_you_learned: `Cargo makes project creation repeatable and standard.`,
      },
      {
        step: 2,
        title: 'Enter the project folder',
        instruction: `Cargo commands look for a \`Cargo.toml\`. Changing into the project folder keeps commands simple and predictable.`,
        task: `Run:

\`\`\`bash
cd contact_manager
\`\`\``,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cd contact_manager',
              hints: ['Run: cd contact_manager'],
            },
          ],
          message: 'Change into the contact_manager folder',
        },
        test: ['Terminal in contact_manager directory'],
        what_you_learned: `Running from the correct folder avoids confusing Cargo errors.`,
      },
      {
        step: 3,
        title: 'Run the starter program',
        instruction: `Run the starter program once so you know everything is working before you change code.`,
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
        step: 4,
        title: 'Print a header',
        instruction: `A consistent header makes output easier to read, especially when you run different commands.`,
        task: `In \`main\`, print this line:

\`\`\`text
Contact Manager
\`\`\``,
        starterCode: `fn main() {\n\n}`,
        highlightLine: 2,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['println!("Contact Manager");'],
              allRequired: true,
              hints: ['Add: println!("Contact Manager");'],
            },
          ],
          message: 'Print the header',
        },
        test: ['Header is printed'],
        what_you_learned: `A stable header helps you confirm which program produced the output.`,
      },
      {
        step: 5,
        title: 'Import BTreeMap',
        instruction: `A map stores key/value pairs. In Rust, \`BTreeMap\` keeps keys in sorted order, which makes \`list\` output predictable.

The most common map type is \`HashMap\`, but using \`BTreeMap\` here keeps the output stable without extra sorting.`,
        task: `At the top of the file, import \`BTreeMap\`:

\`\`\`rust
use std::collections::BTreeMap;
\`\`\``,
        starterCode: `fn main() {\n    println!("Contact Manager");\n\n}`,
        highlightLine: 1,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['use std::collections::BTreeMap;'],
              allRequired: true,
              hints: ['Add: use std::collections::BTreeMap;'],
            },
          ],
          message: 'Import BTreeMap',
        },
        test: ['BTreeMap import exists'],
        what_you_learned: `use brings a type name into scope so you can refer to it easily.`,
      },
      {
        step: 6,
        title: 'Create a contacts map',
        instruction: `To use a map, you first create an empty one and then insert entries. In a map, the key is how you look up values.

We will map a contact name (String) to a phone number (String).`,
        task: `In \`main\`, create a mutable \`contacts\` map and insert two entries:

- Alice -> 555-0100
- Bob -> 555-0123`,
        starterCode: `use std::collections::BTreeMap;\n\nfn main() {\n    println!("Contact Manager");\n\n}`,
        highlightLine: 6,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: [
                'let mut contacts',
                'BTreeMap::new()',
                'contacts.insert("Alice".to_string()',
                'contacts.insert("Bob".to_string()',
              ],
              allRequired: true,
              hints: ['Create contacts with BTreeMap::new() and insert Alice and Bob'],
            },
          ],
          message: 'Create and populate contacts',
        },
        test: ['contacts map exists'],
        what_you_learned: `Maps store key/value pairs and are built for fast lookups by key.`,
      },
      {
        step: 7,
        title: 'Write a print_contacts function',
        instruction: `When you reuse logic, a function keeps it in one place. We will print contacts in multiple commands, so a helper function is a good fit.

Borrow the map with a reference so the function can read it without taking ownership.`,
        task: `Above \`main\`, add:

\`\`\`rust
fn print_contacts(contacts: &BTreeMap<String, String>) {
    // ...
}
\`\`\`

Inside, loop over the map and print \`Name: Phone\` on each line.`,
        starterCode: `use std::collections::BTreeMap;\n\nfn main() {\n    println!("Contact Manager");\n\n    let mut contacts: BTreeMap<String, String> = BTreeMap::new();\n    contacts.insert("Alice".to_string(), "555-0100".to_string());\n    contacts.insert("Bob".to_string(), "555-0123".to_string());\n}`,
        highlightLine: 3,
        validation: {
          rules: [
            {
              type: 'code_matches',
              regex: 'fn\\s+print_contacts\\s*\\(\\s*contacts\\s*:\\s*&BTreeMap<String,\\s*String>\\s*\\)',
              hints: ['Define print_contacts(contacts: &BTreeMap<String, String>)'],
            },
            {
              type: 'code_contains',
              patterns: ['for (name, phone) in contacts', 'println!("{}: {}", name, phone)'],
              allRequired: true,
              hints: ['Loop over contacts and print "{}: {}"'],
            },
          ],
          message: 'Create the print_contacts helper',
        },
        test: ['print_contacts exists'],
        what_you_learned: `Passing &BTreeMap borrows the map so ownership stays in main.`,
      },
      {
        step: 8,
        title: 'List contacts (no args yet)',
        instruction: `Before you add command parsing, call your helper once so you can see the map printing correctly. This is a small, focused checkpoint.`,
        task: `At the end of \`main\`, call \`print_contacts(&contacts);\`.`,
        starterCode: `use std::collections::BTreeMap;\n\nfn print_contacts(contacts: &BTreeMap<String, String>) {\n    for (name, phone) in contacts {\n        println!("{}: {}", name, phone);\n    }\n}\n\nfn main() {\n    println!("Contact Manager");\n\n    let mut contacts: BTreeMap<String, String> = BTreeMap::new();\n    contacts.insert("Alice".to_string(), "555-0100".to_string());\n    contacts.insert("Bob".to_string(), "555-0123".to_string());\n\n}`,
        highlightLine: 17,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['print_contacts(&contacts);'],
              allRequired: true,
              hints: ['Add: print_contacts(&contacts);'],
            },
          ],
          message: 'Call the helper',
        },
        test: ['Contacts are printed'],
        what_you_learned: `Small checkpoints make debugging easier when you add more logic later.`,
      },
      {
        step: 9,
        title: 'Run and see the list',
        instruction: `Run the program to see the header and the contact list printed from the map.`,
        task: `Run:

\`\`\`bash
cargo run
\`\`\``,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Run: cargo run'],
            },
          ],
          message: 'Run to verify printing',
        },
        test: ['Program was run'],
        what_you_learned: `Running after visible changes keeps output and code aligned.`,
      },
      {
        step: 10,
        title: 'Collect args and import process',
        instruction: `To support commands like \`list\` and \`find\`, your program needs to read command-line arguments.

You will collect args into a \`Vec<String>\` and use \`process::exit(1)\` for error cases.`,
        task: `Import \`std::env\` and \`std::process\`. Then collect args into \`let args: Vec<String> = env::args().collect();\` near the top of \`main\`.`,
        starterCode: `use std::collections::BTreeMap;\n\nfn print_contacts(contacts: &BTreeMap<String, String>) {\n    for (name, phone) in contacts {\n        println!("{}: {}", name, phone);\n    }\n}\n\nfn main() {\n    println!("Contact Manager");\n\n    let mut contacts: BTreeMap<String, String> = BTreeMap::new();\n    contacts.insert("Alice".to_string(), "555-0100".to_string());\n    contacts.insert("Bob".to_string(), "555-0123".to_string());\n\n    print_contacts(&contacts);\n}`,
        highlightLine: 1,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['use std::env;', 'use std::process;', 'let args: Vec<String> = env::args().collect();'],
              allRequired: true,
              hints: ['Import env and process, then collect args into Vec<String>'],
            },
          ],
          message: 'Collect args into a Vec',
        },
        test: ['Args are collected'],
        what_you_learned: `env::args() provides command-line args, and process::exit sets an exit code.`,
      },
      {
        step: 11,
        title: 'Show usage when command is missing',
        instruction: `A CLI tool should explain how to use it when input is missing. This keeps errors friendly and prevents confusing behavior.

You will check for a command argument and print a usage message.`,
        task: `If \`args.len() < 2\`, print this usage block and exit 1:

\`\`\`text
Usage: contact_manager <command> [args]
Commands:
  list
  find <name>
  add <name> <phone>
  remove <name>
\`\`\``,
        starterCode: `use std::collections::BTreeMap;\nuse std::env;\nuse std::process;\n\nfn print_contacts(contacts: &BTreeMap<String, String>) {\n    for (name, phone) in contacts {\n        println!("{}: {}", name, phone);\n    }\n}\n\nfn main() {\n    println!("Contact Manager");\n\n    let mut contacts: BTreeMap<String, String> = BTreeMap::new();\n    contacts.insert("Alice".to_string(), "555-0100".to_string());\n    contacts.insert("Bob".to_string(), "555-0123".to_string());\n\n    let args: Vec<String> = env::args().collect();\n\n}`,
        highlightLine: 20,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['if args.len() < 2', 'println!("Usage: contact_manager <command> [args]")', 'process::exit(1)'],
              allRequired: true,
              hints: ['Check args.len() < 2, print usage, and exit(1)'],
            },
          ],
          message: 'Print usage and exit for missing command',
        },
        test: ['Usage exists'],
        what_you_learned: `Usage messages make CLI tools easier to use and debug.`,
      },
      {
        step: 12,
        title: 'Match on the command',
        instruction: `Command parsing usually starts by reading one word (the command) and branching based on it.

You will store the command in a variable and match on it. Start with a \`list\` branch.`,
        task: `Store the command as \`let command = &args[1];\`.

Then add a \`match\` on \`command.as_str()\` with a \`"list"\` arm that calls \`print_contacts(&contacts);\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let command = &args[1];', 'match command.as_str()', '"list"', 'print_contacts(&contacts)'],
              allRequired: true,
              hints: ['Match on command.as_str() and handle the "list" command'],
            },
          ],
          message: 'Add a match for the list command',
        },
        test: ['list command exists'],
        what_you_learned: `match is a clean way to dispatch behavior based on a command string.`,
      },
      {
        step: 13,
        title: 'Run the list command',
        instruction: `Now test the new command path. Running with \`list\` should print the contact list.`,
        task: `Run:

\`\`\`bash
cargo run -- list
\`\`\``,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo run',
              projectSpecific: 'list',
              hints: ['Run: cargo run -- list'],
            },
          ],
          message: 'Run list',
        },
        test: ['list command was run'],
        what_you_learned: `Testing each command as you add it keeps CLI behavior predictable.`,
      },
      {
        step: 14,
        title: 'Implement find <name>',
        instruction: `Looking up by key is where maps shine. \`contacts.get(name)\` returns an \`Option<&String>\`.

You will match on the Option:

- \`Some(phone)\` means the contact exists.
- \`None\` means it does not.`,
        task: `Add a \`"find"\` match arm.

It should expect a name at \`args[2]\`. If the name is missing, print the usage and exit 1.

If present, print:

- \`Found: Name -> Phone\` when found
- \`No contact named Name\` when not found`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['"find"', 'contacts.get', 'Some', 'None'],
              allRequired: true,
              hints: ['Handle find by using contacts.get(name) and matching on Option'],
            },
          ],
          message: 'Add the find command',
        },
        test: ['find command exists'],
        what_you_learned: `Option forces you to handle missing values instead of crashing.`,
      },
      {
        step: 15,
        title: 'Run find',
        instruction: `Test the \`find\` command on a name you inserted earlier.`,
        task: `Run:

\`\`\`bash
cargo run -- find Alice
\`\`\``,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo run',
              projectSpecific: 'find alice',
              hints: ['Run: cargo run -- find Alice'],
            },
          ],
          message: 'Run find',
        },
        test: ['find command was run'],
        what_you_learned: `Testing the happy path first makes it easier to debug the error path.`,
      },
      {
        step: 16,
        title: 'Implement add <name> <phone>',
        instruction: `Adding and updating a map use the same method: \`insert\`. If the key already exists, \`insert\` overwrites the old value.

After adding, you can print the updated list to confirm the change.`,
        task: `Add an \`"add"\` match arm.

It should expect:

- name at \`args[2]\`
- phone at \`args[3]\`

Insert the pair into \`contacts\`, print \`Added/Updated: <name>\`, then call \`print_contacts(&contacts);\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['"add"', 'contacts.insert', 'Added/Updated'],
              allRequired: true,
              hints: ['Handle add by inserting into the map and printing the updated list'],
            },
          ],
          message: 'Add the add command',
        },
        test: ['add command exists'],
        what_you_learned: `insert can both create and update entries in a map.`,
      },
      {
        step: 17,
        title: 'Run add',
        instruction: `Test the add command by adding a new name and phone number. Your program should print the updated list.`,
        task: `Run:

\`\`\`bash
cargo run -- add Carol 555-0199
\`\`\``,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo run',
              projectSpecific: 'add carol',
              hints: ['Run: cargo run -- add Carol 555-0199'],
            },
          ],
          message: 'Run add',
        },
        test: ['add command was run'],
        what_you_learned: `Running after each new command helps you trust your CLI.`,
      },
      {
        step: 18,
        title: 'Implement remove <name>',
        instruction: `Removing from a map uses \`remove\`, which returns an \`Option\`. That means you can tell whether the key existed.

You will print a different message depending on whether a contact was removed.`,
        task: `Add a \`"remove"\` match arm.

It should expect a name at \`args[2]\`.

Use \`contacts.remove(name)\` and match on the result:

- If Some, print \`Removed: <name>\`
- If None, print \`No contact named <name>\`

Then print the list.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['"remove"', 'contacts.remove', 'Removed:'],
              allRequired: true,
              hints: ['Handle remove by calling contacts.remove(name) and printing the updated list'],
            },
          ],
          message: 'Add the remove command',
        },
        test: ['remove command exists'],
        what_you_learned: `remove returns Option so you can detect missing keys.`,
      },
      {
        step: 19,
        title: 'Run remove',
        instruction: `Test removing a contact that exists.`,
        task: `Run:

\`\`\`bash
cargo run -- remove Bob
\`\`\``,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo run',
              projectSpecific: 'remove bob',
              hints: ['Run: cargo run -- remove Bob'],
            },
          ],
          message: 'Run remove',
        },
        test: ['remove command was run'],
        what_you_learned: `Testing destructive commands helps catch mistakes early.`,
      },
      {
        step: 20,
        title: 'Handle unknown commands',
        instruction: `A CLI should fail clearly when the command is not recognized. In a \`match\`, this is the wildcard arm \`_\`.

Print an error message, then print the usage so the user can recover.`,
        task: `Add a \`_\` arm that prints:

\`\`\`text
Error: Unknown command
\`\`\`

Then print the usage block and exit with code 1.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['_ =>', 'Error: Unknown command', 'process::exit(1)'],
              allRequired: true,
              hints: ['Add a wildcard arm that prints an error, prints usage, and exits 1'],
            },
          ],
          message: 'Add an unknown-command handler',
        },
        test: ['Unknown commands are handled'],
        what_you_learned: `The _ arm is a safe default for unexpected values.`,
      },
      {
        step: 21,
        title: 'Run an unknown command',
        instruction: `Test the error path by running a command your program does not recognize.`,
        task: `Run:

\`\`\`bash
cargo run -- nope
\`\`\``,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo run',
              projectSpecific: 'nope',
              hints: ['Run: cargo run -- nope'],
            },
          ],
          message: 'Run an error case',
        },
        test: ['Unknown command was tested'],
        what_you_learned: `Testing failure cases is part of building a reliable tool.`,
      },
    ],
    completion_message: `Nice work. You used a map to store contacts, handled missing values with Option, and built a small CLI with clear usage and error paths.`,
    extensions: `Try extending your contact manager:
- Add an update command that changes a phone number
- Add a search command that lists names containing a substring
- Replace BTreeMap with HashMap and sort keys before printing
- Save contacts to a file and load them on startup`,
  },

  // Certification Projects (no steps, only requirements and tests)

  // Cert Project 1: Build a Word Frequency Counter Project
  {
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
  },

  // Cert Project 2: Build a Log File Analyzer Project
  {
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
  },

  // Cert Project 3: Build a Configuration File Parser Project
  {
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
  },

  // Cert Project 4: Build a File Backup Tool Project
  {
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
  },

  // Cert Project 5: Build a CLI Task Manager Project
  {
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
  },
];


















