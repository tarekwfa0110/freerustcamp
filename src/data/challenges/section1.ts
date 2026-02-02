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
    concepts_taught: ['variables', 'mutability', 'basic_types', 'arithmetic', 'command_line_args'],
    project_overview: `In this project, you'll build a command-line tool that converts temperatures between Fahrenheit and Celsius. This is your first real Rust project, and you'll learn about variables, mutability, basic types, and how to work with command-line arguments.`,
    why_this_project: `Temperature conversion is a practical, real-world task. By building this, you'll understand how Rust handles variables, how to perform calculations, and how to make your program interactive through command-line arguments.`,
    prerequisites: [
      'Rust toolchain installed (rustc, cargo)',
      'Basic understanding of terminal/command line',
      'Familiarity with basic arithmetic',
    ],
    preview: {
      mode: 'onLoad',
      title: 'Temperature Converter',
      description: 'You will build a command-line tool that converts temperatures between Fahrenheit and Celsius.',
      example_output: `$ cargo run -- 32 F
32.0°F is 0.0°C

$ cargo run -- 100 C
100.0°C is 212.0°F

$ cargo run -- 32 K
Error: Invalid unit 'K'. Use 'F' or 'C'.

$ cargo run
Usage: temp_converter <temperature> <unit>
Example: temp_converter 32 F`,
    },
    steps: [
      {
        step: 1,
        title: 'Initialize your project',
        instruction: `Cargo is Rust's build tool and package manager. It automates tasks like creating projects, downloading libraries, and building your code.

Here is an example of creating a new project:

\`\`\`bash
cargo new my_project
\`\`\`

Create a new Rust project called \`temp_converter\` to get started.`,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo new',
              projectSpecific: 'temp_converter',
              hints: [
                'Open the terminal below',
                'Type: cargo new temp_converter',
                'Press Enter to execute',
              ],
            },
          ],
          message: 'Run `cargo new temp_converter` in the terminal',
        },
        test: ['Project directory created'],
        what_you_learned: `Cargo automatically sets up a standard directory structure and a "Hello, world!" program for you.`,
      },
      {
        step: 2,
        title: 'Enter the project folder',
        instruction: `The \`cd\` command (change directory) moves your terminal into a specific folder. You must be inside the project folder to run or build your code.

Move into the \`temp_converter\` directory you just created.`,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cd temp_converter',
              hints: [
                'Type: cd temp_converter',
                'Press Enter to navigate into the folder',
              ],
            },
          ],
          message: 'Run `cd temp_converter`',
        },
        test: ['Terminal in temp_converter directory'],
        what_you_learned: `Navigating to the project root allows Cargo to find the \`Cargo.toml\` file it needs for building.`,
      },
      {
        step: 3,
        title: 'Locate the entry point',
        instruction: `Every Rust program starts at a specific function called \`main\`. Cargo created this for you in \`src/main.rs\`.

Here is a basic function structure:

\`\`\`rust
fn say_hello() {
    // code here
}
\`\`\`

Open \`src/main.rs\` and identify the \`main\` function. It's the entry point where your program will begin execution.`,
        starterCode: 'fn main() {\n    println!("Hello, world!");\n}',
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['fn main()'],
              allRequired: true,
              hints: ['Ensure your code has a main function: fn main() { ... }'],
            },
          ],
          message: 'Verify your main function exists',
        },
        test: ['main function exists'],
        what_you_learned: `The \`main\` function is the starting point for every executable Rust program.`,
      },
      {
        step: 4,
        title: 'Run your first program',
        instruction: `The \`cargo run\` command compiles your code and immediately executes the resulting program. It's the fastest way to test your changes.

Run \`cargo run\` in the terminal to see the default "Hello, world!" message.`,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: [
                'Type: cargo run',
                'Ensure you are still in the temp_converter folder',
              ],
            },
          ],
          message: 'Run the program using cargo',
        },
        test: ['Program executed successfully'],
        what_you_learned: `\`cargo run\` combines compiling and running into a single convenient command.`,
      },
      {
        step: 5,
        title: 'Introduction to macros',
        instruction: `In Rust, \`println!\` is a **macro**, not a regular function. The exclamation mark (\`!\`) tells you it's a macro. Macros are like powerful code generators.

Example of printing a message:

\`\`\`rust
println!("Rust is fun!");
\`\`\`

The text between double quotes is called a **string literal**. It's the exact text you want to display.

Add a second \`println!\` statement below the first one with any message you like.`,
        highlightLine: 3, // Highlight line 3 where user should add the new println!
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['println!', 'println!'],
              allRequired: true,
              hints: ['Add another println!("Your message here"); line'],
            },
          ],
          message: 'Add a second println! macro call',
        },
        test: ['Two println! macros detected'],
        what_you_learned: `Macros like \`println!\` provide powerful shortcuts for complex tasks like formatting output.`,
      },
      {
        step: 6,
        title: 'The importance of semicolons',
        instruction: `Rust is an expression-based language, and semicolons (\`;\`) are used to separate statements. Missing a semicolon is a very common compiler error.

Notice that your \`println!\` statements end with \`;\`. This tells Rust the action is finished.

Run \`cargo run\` again to see both of your messages appear on separate lines.`,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Run: cargo run to confirm the output'],
            },
          ],
          message: 'Confirm the output in the terminal',
        },
        test: ['Successfully printed multiple lines'],
        what_you_learned: `Each \`println!\` appends a newline character, putting subsequent text on a new line.`,
      },
      {
        step: 7,
        title: 'Set the program title',
        instruction: `Now we'll start molding this into a temperature converter. Let's change our first message to be a proper header.

Update the first \`println!\` message literal to say \`"Temperature Converter"\`. Remove the second \`println!\` you added in the previous step.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['println!("Temperature Converter");'],
              allRequired: true,
              hints: ['Change the first message to exactly: "Temperature Converter"'],
            },
            {
              type: 'code_reject_patterns',
              patterns: ['Hello, world!'],
              hints: ['Remove or replace the "Hello, world!" message'],
            },
          ],
          message: 'Change the header message',
        },
        test: ['Prints "Temperature Converter"'],
        what_you_learned: `Modifying string literals directly changes what your program displays to the user.`,
      },
      {
        step: 8,
        title: 'Accessing the system',
        instruction: `To handle inputs, we need to talk to the operating system. Rust's standard library provides a module for this called \`env\` (short for environment).

The full path to this module is \`std::env\`. Modules group related functionality together.

Add \`use std::env;\` at the very top of your file, before the \`main\` function.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['use std::env;'],
              allRequired: true,
              hints: ['Add: use std::env; at line 1'],
            },
          ],
          message: 'Add the module import',
        },
        test: ['std::env is imported'],
        what_you_learned: `The \`use\` keyword brings external definitions into your current scope.`,
      },
      {
        step: 9,
        title: 'Reading arguments',
        instruction: `When you run a program, you can pass it "arguments" (like \`cargo run -- 32 F\`). Rust provides these through a tool called an **iterator**.

We access the arguments iterator by calling \`env::args()\`.

Inside \`main\`, call \`env::args()\` and store it in a variable named \`args\`. You must also "collect" the iterator into a concrete list.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['env::args()'],
              allRequired: true,
              hints: ['Inside main, add: env::args()'],
            },
          ],
          message: 'Call env::args()',
        },
        test: ['args() function called'],
        what_you_learned: `Iterators are a core Rust concept for processing sequences of data.`,
      },
      {
        step: 10,
        title: 'Introducing Vectors',
        instruction: `To easily access arguments by number, we "collect" the iterator into a **Vector** (\`Vec\`). A Vector is a flexible list of items that can grow or shrink.

Example of collecting an iterator:

\`\`\`rust
let items: Vec<String> = iterator.collect();
\`\`\`

The \`: Vec<String>\` is a **type annotation** telling Rust exactly what kind of list we want.

Complete your \`args\` variable by adding the \`: Vec<String>\` type and calling \`.collect()\` on the iterator.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let args: Vec<String> = env::args().collect();'],
              allRequired: true,
              hints: ['Use the exact syntax: let args: Vec<String> = env::args().collect();'],
            },
          ],
          message: 'Collect arguments into a Vec<String>',
        },
        test: ['Arguments collected into a Vector of Strings'],
        what_you_learned: `Vectors are one of the most common data structures in Rust for storing lists of items.`,
      },
      {
        step: 11,
        title: 'Understanding argument order',
        instruction: `Argument lists (Vectors) start at index **0**. Interestingly, the very first argument is always the name of the program itself.

Example of accessing the first item:

\`\`\`rust
let program_name = &args[0];
\`\`\`

We use \`&\` to **borrow** the value from the list without taking ownership.

Use \`println!\` with a placeholder \`{}\` to print the program name found at \`args[0]\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['&args[0]', '{}'],
              allRequired: true,
              hints: ['Add: println!("Running {}", &args[0]);'],
            },
          ],
          message: 'Access and print the program name',
        },
        test: ['Index 0 accessed correctly'],
        what_you_learned: `Indices are 0-based in Rust, and the program name is always the first entry in your arguments.`,
      },
      {
        step: 12,
        title: 'Defensive programming',
        instruction: `If your program expects arguments but doesn't get any, it will crash (panic) when it tries to access an index that doesn't exist. We should check the length first.

The \`.len()\` method returns the number of items in a Vector.

Example of checking length:

\`\`\`rust
if items.len() < 2 {
    // do something
}
\`\`\`

Before accessing any more arguments, use an \`if\` statement to check if \`args.len()\` is less than \`3\`. (We need the program name, a number, and a unit).`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['if args.len() < 3'],
              allRequired: true,
              hints: ['Add: if args.len() < 3 { ... }'],
            },
          ],
          message: 'Check the length of the arguments vector',
        },
        test: ['Length check implemented'],
        what_you_learned: `Defensive programming means anticipating potential errors and handling them gracefully.`,
      },
      {
        step: 13,
        title: 'Explaining errors to users',
        instruction: `When input is missing, a good program tells the user exactly how to fix it. This is often called a **usage message**.

Inside your \`if args.len() < 3\` block, add a \`println!\` that explains the correct usage to the user.

Example: \`Usage: <temp> <unit>\`.`,
        validation: {
          rules: [
            {
              type: 'code_matches',
              regex: 'if\\s+args\\.len\\(\\)\\s*<\\s*3\\s*\\{[^}]*println!',
              hints: ['Put the println! inside the braces of your if statement'],
            },
          ],
          message: 'Add a usage message inside the if block',
        },
        test: ['Usage message exists'],
        what_you_learned: `Providing clear feedback makes your command-line tools much easier to use.`,
      },
      {
        step: 14,
        title: 'Exiting immediately',
        instruction: `Once you've told the user their input is wrong, you should stop the program. We use \`std::process::exit\` for this. Run \`cargo run\` without any arguments to see your usage message and wait for the exit.`,
        validation: {
          rules: [
            {
              type: 'code_matches',
              regex: 'if\\s+args\\.len\\(\\)\\s*<\\s*3\\s*\\{[^}]*println![^}]*exit\\(1\\)',
              hints: ['Call std::process::exit(1) after your println!'],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Test the error handling by running with no arguments'],
            },
          ],
          message: 'Call std::process::exit(1) and verify the error message',
        },
        test: ['Program exits on missing input', 'Program was run'],
        what_you_learned: `Non-zero exit codes signal failure. Running your program now verifies that your defensive check works.`,
      },
      {
        step: 15,
        title: 'Extracting user input',
        instruction: `Now that we know we have enough arguments, we can safely access them. Index 1 will be our temperature value.

Example:

\`\`\`rust
let value = &args[1];
\`\`\`

Below your \`if\` block, create a variable named \`temp_str\` and assign it a reference to index \`1\` of the \`args\` vector.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let temp_str = &args[1];'],
              allRequired: true,
              hints: ['Assign &args[1] to let temp_str; after the if block finishes'],
            },
          ],
          message: 'Store the temperature argument in temp_str',
        },
        test: ['temp_str variable created'],
        what_you_learned: `References (\`&\`) let you access data without copying it or taking ownership of the underlying storage.`,
      },
      {
        step: 16,
        title: 'Getting the unit',
        instruction: `We also need the unit (F or C) provided by the user. This will be at the next index.

Extract the unit from index \`2\` of the \`args\` vector and store it in a variable named \`unit_str\`. Use a reference (\`&\`) just like you did for the temperature.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let unit_str = &args[2];'],
              allRequired: true,
              hints: ['Assign &args[2] to let unit_str;'],
            },
          ],
          message: 'Store the unit argument in unit_str',
        },
        test: ['unit_str variable created'],
        what_you_learned: `Positional arguments rely on the order in which the user types words in the terminal.`,
      },
      {
        step: 17,
        title: 'Strings versus Numbers',
        instruction: `Arguments from the terminal are always strings. We can't do math on the string \`"32"\`. We first need to "parse" it into a real number.

Example of parsing:

\`\`\`rust
let result = value.parse();
\`\`\`

Call the \`.parse()\` method on your \`temp_str\` variable. We'll handle the result in the next few steps.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['temp_str.parse()'],
              allRequired: true,
              hints: ['Call .parse() on temp_str'],
            },
          ],
          message: 'Call the parse method',
        },
        test: ['parse() method initialized'],
        what_you_learned: `The process of converting text to data is called parsing.`,
      },
      {
        step: 18,
        title: 'Handling parse failures',
        instruction: `Parsing can fail (like if the user types "ABC" instead of a number). Rust forces you to handle this possibility. For now, we will use \`.expect()\`.

Example:

\`\`\`rust
let val = text.parse().expect("Darn!");
\`\`\`

If parsing fails, \`.expect()\` will crash the program and print your provided message. Add a helpful error message using \`.expect()\` after your \`.parse()\` call.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['.parse().expect('],
              allRequired: true,
              hints: ['Add .expect("Your message") after .parse()'],
            },
          ],
          message: 'Add an expect call to handle errors',
        },
        test: ['expect() added for error handling'],
        what_you_learned: `\`.expect()\` is a simple but "brutal" way to handle errors by crashing with a message if things go wrong.`,
      },
      {
        step: 19,
        title: 'Specific numeric types',
        instruction: `Rust needs to know exactly what kind of number you want (integer or decimal). For temperatures, we want a 64-bit floating point number, known as \`f64\`.

Example of type annotation:

\`\`\`rust
let x: f64 = 10.5;
\`\`\`

Finish your conversion by assigning the parsed value to a variable named \`temp\` with the type \`: f64\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let temp: f64 = temp_str.parse()'],
              allRequired: true,
              hints: ['Use the type annotation: let temp: f64 = ...'],
            },
          ],
          message: 'Specify the f64 type for your temperature',
        },
        test: ['temp is an f64 number'],
        what_you_learned: `Type annotations tell the compiler exactly how much memory to allocate and what operations are valid.`,
      },
      {
        step: 20,
        title: 'Normalizing text',
        instruction: `Users might type "F" or "f". It's best to convert their input to a standard format to simplify our comparisons.

The \`.to_uppercase()\` method creates a new, all-caps string.

Example:

\`\`\`rust
let upper = lower.to_uppercase();
\`\`\`

Convert \`unit_str\` to uppercase and store the result in a variable named \`unit\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let unit = unit_str.to_uppercase();'],
              allRequired: true,
              hints: ['Use: let unit = unit_str.to_uppercase();'],
            },
          ],
          message: 'Convert the unit to uppercase',
        },
        test: ['unit is converted to uppercase'],
        what_you_learned: `Normalization ensures your program accepts a wider range of user input styles.`,
      },
      {
        step: 21,
        title: 'Choice and Logic',
        instruction: `An \`if\` statement runs code only when a condition is true. We use \`==\` to check if two things are exactly equal.

Example:

\`\`\`rust
if choice == "A" {
    // code
}
\`\`\`

Add an \`if\` statement that checks if the \`unit\` is equal to the string \`"F"\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['if unit == "F"'],
              allRequired: true,
              hints: ['Add: if unit == "F" { ... }'],
            },
          ],
          message: 'Create the first comparison block',
        },
        test: ['Fahrenheit block initialized'],
        what_you_learned: `\`if\` statements are the building blocks of program decision-making.`,
      },
      {
        step: 22,
        title: 'Floating point math',
        instruction: `In Rust, if you divide two integers like \`5 / 9\`, the result is \`0\` because it drops the decimals! To get \`0.55\`, you must use **floats** like \`5.0 / 9.0\`.

Fahrenheit to Celsius Formula: \`(F - 32.0) * 5.0 / 9.0\`.

Inside your \`if\` block, create a variable \`celsius\` and implement this formula using your \`temp\` variable. Use \`.0\` on all your numbers.`,
        validation: {
          rules: [
            {
              type: 'code_matches',
              regex: 'let\\s+\\w+\\s*=\\s*\\(\\s*temp\\s*-\\s*32\\.0\\s*\\)\\s*\\*\\s*5\\.0\\s*\\/\\s*9\\.0',
              hints: [
                'Ensure you use 32.0, 5.0, and 9.0',
                'Use the temp variable in your formula',
              ],
            },
          ],
          message: 'Calculate the Celsius result',
        },
        test: ['Celsius calculation is accurate'],
        what_you_learned: `\`5.0\` is a float, while \`5\` is an integer. Rust does not allow mixing these types without explicit conversion!`,
      },
      {
        step: 23,
        title: 'Dynamic text output',
        instruction: `We can use placeholders \`{}\` inside \`println!\` to insert our variables into a message.

Example:

\`\`\`rust
println!("{} is my name", name);
\`\`\`

Inside the same \`if\` block, print a message showing the original Fahrenheit value and the new Celsius value.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['println!', '{}', '{}'],
              allRequired: true,
              hints: ['Use println!("{}°F is {}°C", temp, celsius);'],
            },
          ],
          message: 'Print the conversion result',
        },
        test: ['Result is printed using placeholders'],
        what_you_learned: `\`println!\` placeholders provide a clean way to build complex messages without manual string concatenation.`,
      },
      {
        step: 24,
        title: 'Test your first conversion',
        instruction: `You've completed the Fahrenheit to Celsius logic! Let's test it before moving on.

Run \`cargo run -- 32 F\` to test the freezing point of water. You should see 0°C.`,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo run',
              projectSpecific: '32 F',
              hints: ['Run: cargo run -- 32 F', 'The double-dash tells Cargo to pass arguments to your program'],
            },
          ],
          message: 'Test your F to C conversion works',
        },
        test: ['Program converts 32 F to 0 C'],
        what_you_learned: `Testing incrementally catches bugs early. If something breaks, you know exactly which change caused it.`,
      },
      {
        step: 25,
        title: 'Handling another case',
        instruction: `When the first \`if\` condition is false, you can check a second condition using \`else if\`.

Example:

\`\`\`rust
if x == 1 { ... }
else if x == 2 { ... }
\`\`\`

Add an \`else if\` block that checks if the \`unit\` is \`"C"\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['else if', 'unit == "C"'],
              allRequired: true,
              hints: [
                'Add: else if unit == "C" { }',
                'Ensure it comes directly after the closing brace of the first if',
              ],
            },
          ],
          message: 'Add an else if block',
        },
        test: ['Celsius unit handler added'],
        what_you_learned: `\`else if\` lets you chain multiple mutually exclusive conditions together.`,
      },
      {
        step: 26,
        title: 'Celsius to Fahrenheit',
        instruction: `The math for the reverse conversion is slightly different.

Celsius to Fahrenheit Formula: \`(C * 9.0 / 5.0) + 32.0\`.

Inside your new \`else if\` block, calculate the Fahrenheit value and print it using placeholders.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['* 9.0', '/ 5.0', '+ 32.0'],
              allRequired: true,
              hints: [
                'Use formula: (temp * 9.0 / 5.0) + 32.0',
                'Ensure all numbers are floats (e.g. 9.0)',
              ],
            },
          ],
          message: 'Calculate and print Fahrenheit',
        },
        test: ['Celsius to Fahrenheit conversion works'],
        what_you_learned: `\`PEMDAS\` rules apply in programming math—parentheses control the order of operations.`,
      },
      {
        step: 27,
        title: 'Test the reverse conversion',
        instruction: `Now test the Celsius to Fahrenheit conversion!

Run \`cargo run -- 100 C\` to test the boiling point of water. You should see 212°F.`,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo run',
              projectSpecific: '100 C',
              hints: ['Run: cargo run -- 100 C'],
            },
          ],
          message: 'Test your C to F conversion works',
        },
        test: ['Program converts 100 C to 212 F'],
        what_you_learned: `Both conversion paths now work! Testing both ensures your logic is complete.`,
      },
      {
        step: 28,
        title: 'Catching mistakes',
        instruction: `If the user types a unit that isn't "F" or "C", none of our previous blocks will run. An \`else\` clause handles any case that wasn't caught yet.

Example:

\`\`\`rust
if ... { }
else if ... { }
else { // everything else }
\`\`\`

Add an \`else block\` to your chain.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['else {'],
              allRequired: true,
              hints: ['Add an else block at the end of the chain'],
            },
          ],
          message: 'Implement the final catch-all',
        },
        test: ['else block exists'],
        what_you_learned: `\`else\` is the ultimate fallback, ensuring your program can respond even when inputs are unexpected.`,
      },
      {
        step: 29,
        title: 'Handling unknown units',
        instruction: `Inside the \`else\` block, we should inform the user that their unit choice was invalid.

We can print variables inside errors too!

Print an error message like: \`Invalid unit 'K'. Use 'F' or 'C'.\`. Use placeholders to show exactly what invalid unit the user typed.`,
        validation: {
          rules: [
            {
              type: 'code_matches',
              regex: 'else\\s*\\{[^}]*println!',
              hints: ['Put a println! inside your else block'],
            },
          ],
          message: 'Notify the user of the invalid unit',
        },
        test: ['Informative error message exists'],
        what_you_learned: `Good error messages show the "bad" data back to the user to prove why it failed.`,
      },
      {
        step: 30,
        title: 'The final exit',
        instruction: `Just like we did when arguments were missing, we should exit the program with an error code if the unit is wrong.

Add \`std::process::exit(1);\` to your \`else\` block.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['exit(1)'],
              allRequired: true,
              hints: ['Add std::process::exit(1); at the end of the else block'],
            },
          ],
          message: 'Perform a clean exit on error',
        },
        test: ['Program terminates on invalid units'],
        what_you_learned: `Consistency in error handling makes your programs behave predictably for other system tools.`,
      },
      {
        step: 31,
        title: 'Test error handling',
        instruction: `Let's verify our error handling works properly.

Run \`cargo run -- 50 K\` to test with an invalid unit. You should see your custom error message.`,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo run',
              projectSpecific: '50 K',
              hints: ['Run: cargo run -- 50 K to test error handling'],
            },
          ],
          message: 'Verify error handling works for invalid units',
        },
        test: ['Invalid unit K triggers error message'],
        what_you_learned: `Always test your error paths. A program that handles errors gracefully is more reliable.`,
      },
      {
        step: 32,
        title: 'The final showcase',
        instruction: `Excellent! Your program is complete. Let's do one final test to show all functionality.

Run \`cargo run -- 32 F\` again to see the full working converter.`,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo run',
              projectSpecific: '32 F',
              hints: ['Run exactly: cargo run -- 32 F'],
            },
          ],
          message: 'Test your converter with arguments!',
        },
        test: ['Final build and run succeeds'],
        what_you_learned: `The \`--\` separator is a common convention for passing flags to underlying programs.`,
      },
    ],
    completion_message: `🎉 Congratulations! You've built your first Rust program - a temperature converter!

You've learned:
✓ How to create a Rust project with Cargo
✓ Variables and basic types (f64, String)
✓ Command-line argument handling
✓ String parsing and conversion
✓ Arithmetic operations
✓ Conditional logic with if/else
✓ Error handling basics
✓ User-friendly error messages

This foundation will serve you in every Rust program you write!`,
    extensions: `**Challenge yourself:**
- Add support for Kelvin (K) temperature scale
- Add a --help flag that shows usage information
- Support decimal temperatures (already works, but test it!)
- Add reverse conversion (automatically detect input unit)
- Format output to 2 decimal places`,
  },

  // Project 2: Learn Functions by Building a Calculator
  {
    id: 'project-002',
    title: 'Learn Functions by Building a Calculator',
    section: 1,
    type: 'practice',
    estimated_time: 60,
    difficulty: 'beginner',
    concepts_taught: ['functions', 'parameters', 'return_types', 'match', 'arithmetic'],
    project_overview: `In this project, you'll build a simple calculator that performs basic arithmetic operations. You'll learn how to define functions, pass parameters, return values, and use Rust's powerful match expression for control flow.`,
    why_this_project: `Functions are the building blocks of Rust programs. By building a calculator, you'll understand how to organize code into reusable functions and how Rust's match expression provides elegant pattern matching.`,
    prerequisites: [
      'Completed: Learn Variables by Building a Temperature Converter',
      'Understanding of basic arithmetic operations',
    ],
    preview: {
      mode: 'onLoad',
      title: 'Calculator',
      description: 'You will build a simple calculator that performs basic arithmetic operations using functions and match expressions.',
      example_output: `$ cargo run -- 10 + 5
10 + 5 = 15.00

$ cargo run -- 20 - 8
20 - 8 = 12.00

$ cargo run -- 6 * 7
6 * 7 = 42.00

$ cargo run -- 10 / 4
10 / 4 = 2.50

$ cargo run -- 10 % 3
10 % 3 = 1.00

$ cargo run -- 5 ^ 2
Error: Invalid operation '^'. Use +, -, *, /, or %.`,
    },
    steps: [
      {
        step: 1,
        title: 'Project initialization',
        instruction: `Create a new Rust project called \`calculator\`.`,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo new',
              projectSpecific: 'calculator',
              hints: ['Run: cargo new calculator'],
            },
          ],
          message: 'Initialize the calculator project',
        },
        test: ['calculator directory created'],
        what_you_learned: `Standard practice for starting new Rust applications.`,
      },
      {
        step: 2,
        title: 'Entering the project',
        instruction: `Move into your new \`calculator\` directory using the terminal.`,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cd calculator',
              hints: ['Run: cd calculator'],
            },
          ],
          message: 'Navigate into the project folder',
        },
        test: ['Terminal in calculator directory'],
        what_you_learned: `You must be in the project root for Cargo commands to work correctly.`,
      },
      {
        step: 3,
        title: 'Function fundamentals',
        instruction: `Functions wrap reusable logic. In Rust, we use the \`fn\` keyword.

Example:
\`\`\`rust
fn say_hi() {
    println!("Hi!");
}
\`\`\`

Define an empty function named \`add\` above your \`main\` function.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['fn add()'],
              allRequired: true,
              hints: ['Add: fn add() { } above main'],
            },
          ],
          message: 'Define the add function',
        },
        test: ['add function detected'],
        what_you_learned: `Functions allow you to break complex problems into smaller, manageable parts.`,
      },
      {
        step: 4,
        title: 'Passing data with parameters',
        instruction: `Parameters allow functions to receive data. You must specify the name and the type.

Example:
\`\`\`rust
fn multiply(x: i32, y: i32)
\`\`\`

Update your \`add\` function to take two parameters: \`a\` and \`b\`, both of type \`f64\` (floating point).`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['add(a: f64, b: f64)'],
              allRequired: true,
              hints: ['Update to: fn add(a: f64, b: f64)'],
            },
          ],
          message: 'Add parameters to the function',
        },
        test: ['Function parameters correctly typed as f64'],
        what_you_learned: `Type-safety starts at the function signature and prevents passing the wrong kind of data.`,
      },
      {
        step: 5,
        title: 'Sending data back',
        instruction: `Functions return values using the \`->\` syntax.

Example:
\`\`\`rust
fn get_number() -> i32 { ... }
\`\`\`

Update \`add\` to return an \`f64\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['-> f64'],
              allRequired: true,
              hints: ['Add -> f64 before the opening brace of the function'],
            },
          ],
          message: 'Specify the return type',
        },
        test: ['Function return type is f64'],
        what_you_learned: `The return type tells the compiler what to expect when the function finishes.`,
      },
      {
        step: 6,
        title: 'Implicit returns',
        instruction: `In Rust, the last line of a function is returned automatically if you omit the semicolon.

Update the body of \`add\` to simply be \`a + b\` with no semicolon.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['a + b'],
              allRequired: true,
              hints: ['Inside the braces, add: a + b'],
            },
            {
              type: 'code_reject_patterns',
              patterns: ['a + b;'],
              hints: ['Remove the semicolon for an implicit return'],
            },
          ],
          message: 'Implement the addition logic',
        },
        test: ['Sum is returned implicitly'],
        what_you_learned: `Implicit returns make Rust code cleaner and more expressive.`,
      },
      {
        step: 7,
        title: 'Implementing subtraction',
        instruction: `Create a \`subtract\` function following the same pattern: two \`f64\` parameters and an \`f64\` return value.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['fn subtract', 'a - b'],
              allRequired: true,
              hints: ['Add: fn subtract(a: f64, b: f64) -> f64 { a - b }'],
            },
          ],
          message: 'Add the subtract function',
        },
        test: ['subtract function implemented'],
         what_you_learned: `Consistent patterns make your codebase easy to read and maintain.`,
      },
      {
        step: 8,
        title: 'Implementing multiplication',
        instruction: `Create a \`multiply\` function that returns \`a * b\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['fn multiply', 'a * b'],
              allRequired: true,
              hints: ['Add: fn multiply(a: f64, b: f64) -> f64 { a * b }'],
            },
          ],
          message: 'Add the multiply function',
        },
        test: ['multiply function implemented'],
        what_you_learned: `Basic arithmetic operators in Rust work similarly to other languages.`,
      },
      {
        step: 9,
        title: 'Setup the main loop',
        instruction: `In \`main\`, import \`std::env\` and collect the arguments into a \`Vec<String>\` called \`args\`, just like you did in the previous project.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['use std::env;', 'let args: Vec<String> = env::args().collect();'],
              allRequired: true,
              hints: ['Import env at the top and collect args in main'],
            },
          ],
          message: 'Prepare argument handling in main',
        },
        test: ['Arguments collected into Vector'],
        what_you_learned: `Reusing setup patterns helps you build programs faster.`,
      },
      {
        step: 10,
        title: 'The length check',
        instruction: `We need exactly 4 arguments (program name, num1, operator, num2). Add an \`if\` statement to check if \`args.len() < 4\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['args.len() < 4'],
              allRequired: true,
              hints: ['Add length check: if args.len() < 4 { ... }'],
            },
          ],
          message: 'Validate argument count',
        },
        test: ['Argument count check implemented'],
        what_you_learned: `Validating length prevents "index out of bounds" panics later.`,
      },
      {
        step: 11,
        title: 'A helpful usage guide',
        instruction: `Inside the \`if\` block, print the usage message: \`Usage: <num1> <operator> <num2>\` and exit with code \`1\`. Run \`cargo run\` to verify the message appears when arguments are missing.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['println!', 'std::process::exit(1)'],
              allRequired: true,
              hints: ['Print usage and then call std::process::exit(1);'],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Test the usage output by running without arguments'],
            },
          ],
          message: 'Inform the user on how to run the program and verify',
        },
        test: ['Usage message and exit call added', 'Program was run'],
        what_you_learned: `Error messages should specify the expected format. Running the program now ensures your validation logic is active.`,
      },
      {
        step: 12,
        title: 'Parsing the first number',
        instruction: `Below the \`if\` block, extract index \`1\` from \`args\`, parse it as an \`f64\`, and store it in a variable named \`num1\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let num1: f64 = args[1].parse().expect('],
              allRequired: true,
              hints: ['Use: let num1: f64 = args[1].parse().expect("Invalid number");'],
            },
          ],
          message: 'Convert the first argument to a float',
        },
        test: ['First number parsed correctly'],
        what_you_learned: `Parsing transforms text data into numerical data ready for math.`,
      },
      {
        step: 13,
        title: 'Getting the operator',
        instruction: `Extract index \`2\` from \`args\` and store it in a variable named \`operator\`. Use a reference (\`&\`).`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let operator = &args[2];'],
              allRequired: true,
              hints: ['Use: let operator = &args[2];'],
            },
          ],
          message: 'Extract the operator string',
        },
        test: ['Operator variable created'],
        what_you_learned: `Positional arguments are accessed by index in the order they were provided.`,
      },
      {
        step: 14,
        title: 'Parsing the second number',
        instruction: `Extract index \`3\` from \`args\`, parse it as an \`f64\`, and store it in a variable named \`num2\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let num2: f64 = args[3].parse().expect('],
              allRequired: true,
              hints: ['Use: let num2: f64 = args[3].parse().expect("Invalid number");'],
            },
          ],
          message: 'Convert the second argument to a float',
        },
        test: ['Second number parsed correctly'],
        what_you_learned: `Every piece of numerical input from a CLI must be parsed before use.`,
      },
      {
        step: 15,
        title: 'Pattern matching',
        instruction: `The \`match\` expression is Rust's most powerful way to handle branching. It matches a value against patterns.

Example:
\`\`\`rust
match operator.as_str() {
    "+" => // do something,
    _ => // catch all,
}
\`\`\`

Create a \`match\` block for \`operator.as_str()\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['match operator.as_str()'],
              allRequired: true,
              hints: ['Use match operator.as_str() { }'],
            },
          ],
          message: 'Start the match expression',
        },
        test: ['Match expression initialized'],
        what_you_learned: `Match expressions are safer than if/else chains because they check for exhaustiveness.`,
      },
      {
        step: 16,
        title: 'Implementing "add"',
        instruction: `Inside the \`match\` block, add a pattern for \`"+"\`. Call your \`add\` function with \`num1\` and \`num2\`, and store the result in a variable named \`result\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['"+" => add(num1, num2),'],
              allRequired: true,
              hints: ['Add pattern: "+" => add(num1, num2)'],
            },
          ],
          message: 'Handle the addition case',
        },
        test: ['Addition case handled in match'],
        what_you_learned: `Blocks of code inside match arms execute based on the pattern match.`,
      },
      {
        step: 17,
        title: 'Subtraction and Multiplication',
        instruction: `Add patterns for \`"-"\` and \`"*"\` that call your \`subtract\` and \`multiply\` functions.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['"-" => subtract(num1, num2)', '"*" => multiply(num1, num2)'],
              allRequired: true,
              hints: ['Add patterns for - and *'],
            },
          ],
          message: 'Handle more operations',
        },
        test: ['Subtraction and Multiplication handled'],
        what_you_learned: `Match arms are separated by commas and map a pattern to an action.`,
      },
      {
        step: 18,
        title: 'Test basic operations',
        instruction: `Let's make sure the basic operations work! Try these commands:

- \`cargo run -- 10 + 5\` should give you 15.00
- \`cargo run -- 20 - 8\` should give you 12.00
- \`cargo run -- 6 * 7\` should give you 42.00

Note: Your code might not compile yet if you haven't added a catch-all (_) arm. Just add a temporary one like \`_ => 0.0,\` to test.`,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo run',
              projectSpecific: '10 + 5',
              hints: ['Run: cargo run -- 10 + 5'],
            },
          ],
          message: 'Test the basic operations',
        },
        test: ['Basic operations tested'],
        what_you_learned: `Testing early and often catches bugs when they are still small and easy to fix.`,
      },
      {
        step: 19,
        title: 'Division by Zero protection',
        instruction: `Create a \`divide\` function that returns \`Option<f64>\`. Use an \`if\` statement: if the divisor is \`0.0\`, return \`None\`, otherwise return \`Some(a / b)\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['Option<f64>', 'None', 'Some(a / b)'],
              allRequired: true,
              hints: ['Define fn divide(a: f64, b: f64) -> Option<f64>'],
            },
          ],
          message: 'Handle potential division by zero safely',
        },
        test: ['Divide function uses Option type'],
        what_you_learned: `The Option type is Rust's way of encouraging you to handle the absence of a value explicitly.`,
      },
      {
        step: 20,
        title: 'Matching nested results',
        instruction: `Add a pattern for \`"/"\` in your \`match\` block. Since \`divide\` returns an \`Option\`, you can't just assign it to \`result\` directly. You need to handle it.

For now, call \`divide(num1, num2).expect("Division by zero")\` inside the match arm to "unwrap" the value or crash with an error.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['"/" => divide(num1, num2).expect('],
              allRequired: true,
              hints: ['Use: "/" => divide(num1, num2).expect("Cannot divide by zero"),'],
            },
          ],
          message: 'Handle division in the match block',
        },
        test: ['Division handled and unwrapped'],
        what_you_learned: `Unwrapping with \`expect\` is a quick way to handle results when you want to terminate on failure.`,
      },
      {
        step: 21,
        title: 'Test division',
        instruction: `Let's test the division logic:

- \`cargo run -- 10 / 4\` should give you 2.50
- \`cargo run -- 10 / 0\` should show your "Cannot divide by zero" error

This verifies both your success and error paths!`,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo run',
              projectSpecific: '10 / 4',
              hints: ['Run: cargo run -- 10 / 4'],
            },
          ],
          message: 'Test division works correctly',
        },
        test: ['Division logic tested'],
        what_you_learned: `Always test both the happy path (valid data) and error paths (invalid data) when dealing with operations that can fail.`,
      },
      {
        step: 22,
        title: 'The catch-all branch',
        instruction: `Match expressions MUST cover all cases. Use the \`_\` pattern as a catch-all to print an "Invalid operator" message and exit.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['_ =>'],
              allRequired: true,
              hints: ['Add: _ => { println!("Error"); std::process::exit(1); }'],
            },
          ],
          message: 'Add the default match case',
        },
        test: ['Default match arm implemented'],
        what_you_learned: `The underscore (_) acts as a wildcard, ensuring your match block always has a path to follow.`,
      },
      {
        step: 23,
        title: 'Formatting the final output',
        instruction: `After the match block, print the final result using \`println!\`. Use \`{:.2}\` in the placeholder to format the number to 2 decimal places. Run \`cargo run -- 10 / 3\` to see it in action!`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['{:.2}', 'result'],
              allRequired: true,
              hints: ['Use: println!("{} {} {} = {:.2}", num1, operator, num2, result);'],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Perform a sample calculation to see the formatted output'],
            },
          ],
          message: 'Display the formatted result and verify',
        },
        test: ['Output is formatted to two decimal places', 'Program was run'],
        what_you_learned: `Advanced formatting strings allow you to control exactly how data is presented. Regular testing ensures your math and formatting are correct.`,
      },
    ],
    completion_message: `🎉 Excellent work! You've built a functional calculator!

You've learned:
✓ How to define functions with parameters and return types
✓ How to organize code into reusable functions
✓ Rust's powerful match expression for pattern matching
✓ The Option type for safe error handling
✓ Input validation and error messages

Functions are the foundation of all Rust programs. You're building real programming skills!`,
    extensions: `**Challenge yourself:**
- Add more operations (modulo, power, square root)
- Support floating-point numbers (f64)
- Add a history feature that remembers last 10 calculations
- Support expressions like "10 + 5 * 2" (requires parsing)
- Add a --help flag`,
  },

  // Project 3: Learn Ownership by Building a Text Adventure
  {
    id: 'project-003',
    title: 'Learn Ownership by Building a Text Adventure',
    section: 1,
    type: 'practice',
    estimated_time: 90,
    difficulty: 'beginner',
    concepts_taught: ['ownership', 'move_semantics', 'String_vs_str', 'borrowing'],
    project_overview: `In this project, you'll build a simple text adventure game where players make choices. Along the way, you'll learn Rust's ownership system - one of its most unique and important features. You'll understand when values are moved, when they're copied, and how borrowing works.`,
    why_this_project: `Ownership is Rust's secret sauce for memory safety. By building a game that moves strings around, you'll experience ownership rules firsthand. This project makes abstract concepts concrete through hands-on practice.`,
    prerequisites: [
      'Completed: Learn Variables by Building a Temperature Converter',
      'Completed: Learn Functions by Building a Calculator',
      'Understanding of basic control flow',
    ],
    preview: {
      mode: 'onLoad',
      title: 'Text Adventure',
      description: 'You will build a simple text adventure game where players make choices, learning Rust\'s ownership system along the way.',
      example_output: `Welcome to the Rust Adventure!

You find yourself in a dark forest. What do you do?
1. Go north
2. Go south
3. Stay put

> 1

You walk north and find a treasure chest! You open it and find gold.
You win! Thanks for playing!`,
    },
    steps: [
      {
        step: 1,
        title: 'Project Setup',
        instruction: `Create a new Rust project called \`text_adventure\`.`,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo new',
              projectSpecific: 'text_adventure',
              hints: ['Run: cargo new text_adventure'],
            },
          ],
          message: 'Initialize the text adventure project',
        },
        test: ['text_adventure directory exists'],
        what_you_learned: `Standard setup for a new Rust command-line application.`,
      },
      {
        step: 2,
        title: 'Entering the Project',
        instruction: `Change into the \`text_adventure\` directory.`,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cd text_adventure',
              hints: ['Run: cd text_adventure'],
            },
          ],
          message: 'Navigate into the project folder',
        },
        test: ['Terminal in text_adventure directory'],
        what_you_learned: `Cargo commands must be run from within the project's root directory.`,
      },
      {
        step: 3,
        title: 'Heap-allocated Strings',
        instruction: `Rust has two main string types. \`String\` is growable and heap-allocated. We create one using \`String::from()\`.

Create a variable named \`player_name\` in \`main\` and initialize it with your name using \`String::from()\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let player_name = String::from("'],
              allRequired: true,
              hints: ['Example: let player_name = String::from("Alice");'],
            },
          ],
          message: 'Create an owned String variable',
        },
        test: ['player_name is a String'],
        what_you_learned: `The String type owns its data and manages it on the heap.`,
      },
      {
        step: 4,
        title: 'Printing owned data',
        instruction: `Print a welcome message that includes the \`player_name\`. Then run \`cargo run\` to see your first output.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['println!', 'player_name'],
              allRequired: true,
              hints: ['Use: println!("Welcome, {}!", player_name);'],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Run the program to see the welcome message'],
            },
          ],
          message: 'Print the player name and verify',
        },
        test: ['Welcome message printed to console', 'Program was run'],
        what_you_learned: `The println! macro can borrow ownership of a variable to display it. Running your code early helps you see progress.`,
      },
      {
        step: 5,
        title: 'Creating a Greeting Function',
        instruction: `Define a function named \`greet\` above \`main\` that takes one parameter named \`name\` of type \`String\`. Leave the body empty for now.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['fn greet(name: String)'],
              allRequired: true,
              hints: ['Add: fn greet(name: String) { }'],
            },
          ],
          message: 'Define a function that takes ownership',
        },
        test: ['greet function exists with correct signature'],
        what_you_learned: `Functions can take full ownership of the data passed to them.`,
      },
      {
        step: 6,
        title: 'Moving Ownership',
        instruction: `Inside \`main\`, call the \`greet\` function and pass \`player_name\` as the argument.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['greet(player_name)'],
              allRequired: true,
              hints: ['Add: greet(player_name); inside main'],
            },
          ],
          message: 'Pass the String to the function',
        },
        test: ['greet function called with player_name'],
        what_you_learned: `When you pass a String to a function, ownership is "moved" to that function.`,
      },
      {
        step: 7,
        title: 'Run and observe',
        instruction: `Try running \`cargo run\` now. Your code should compile fine and print the welcome message.

This works because we're not trying to use \`player_name\` after passing it to \`greet\`.`,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Run: cargo run to see the welcome message'],
            },
          ],
          message: 'Verify the program runs',
        },
        test: ['Program runs and prints welcome message'],
        what_you_learned: `Moving ownership is valid as long as you don't try to use the moved value afterwards.`,
      },
      {
        step: 8,
        title: 'The Move Error',
        instruction: `Try to print \`player_name\` again after the \`greet(player_name)\` call. Notice the compiler error.

Rust prevents you from using data after it has been moved to ensure memory safety. Remove that second print statement to fix the code.`,
        validation: {
          rules: [
            {
              type: 'code_reject_patterns',
              patterns: ['greet(player_name);', 'println!', 'player_name'],
              // We want to ensure they don't have println! after the move if it mentions player_name
              hints: ['If you try to use player_name after greet(player_name), it fails.'],
            },
          ],
          message: 'Fix the move error by removing the invalid usage',
        },
        test: ['Code compiles (invalid usage removed)'],
        what_you_learned: `Rust's borrow checker ensures that data has only one owner at a time.`,
      },
      {
        step: 9,
        title: 'Borrowing with References',
        instruction: `Instead of moving, we can "borrow" data. Use the \`&\` symbol to create a reference.

Change the \`greet\` function signature to take \`name: &String\` instead of \`String\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['fn greet(name: &String)'],
              allRequired: true,
              hints: ['Change to: fn greet(name: &String)'],
            },
          ],
          message: 'Update function to use a reference',
        },
        test: ['greet function now uses a reference'],
        what_you_learned: `References allow you to access data without taking ownership.`,
      },
      {
        step: 10,
        title: 'Passing a Reference',
        instruction: `Update the call in \`main\` to pass a reference by adding \`&\` before \`player_name\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['greet(&player_name)'],
              allRequired: true,
              hints: ['Change to: greet(&player_name);'],
            },
          ],
          message: 'Pass a reference to the function',
        },
        test: ['Function call updated to pass &player_name'],
        what_you_learned: `The & symbol creates a borrow that lasts only for the duration of the function call.`,
      },
      {
        step: 11,
        title: 'Verifying Continued Ownership',
        instruction: `Now that you are borrowing, you can use \`player_name\` again! Add a \`println!\` statement after the \`greet(&player_name)\` call to print the name again. Run \`cargo run\` to prove the code works.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['greet(&player_name);', 'println!', 'player_name'],
              allRequired: true,
              hints: ['Add println! after the call to prove player_name is still valid'],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Run the program to verify borrowing behavior'],
            },
          ],
          message: 'Use the variable after borrowing and verify',
        },
        test: ['Code compiles and name is printed twice', 'Program was run'],
        what_you_learned: `Borrowing keeps the original owner in control, allowing the variable to be reused. Seeing it run proves the borrow checker is happy!`,
      },
      {
        step: 12,
        title: 'The &str Type',
        instruction: `String literals like \`"forest"\` are of type \`&str\` (string slices). They are immutable references to text.

Define a function \`describe_location\` that takes a parameter \`loc: &str\` and returns a \`String\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['fn describe_location(loc: &str) -> String'],
              allRequired: true,
              hints: ['Add: fn describe_location(loc: &str) -> String { ... }'],
            },
          ],
          message: 'Define a function using string slices',
        },
        test: ['describe_location function detected'],
        what_you_learned: `&str is more efficient and flexible than &String for function parameters.`,
      },
      {
        step: 13,
        title: 'Creating Descriptions',
        instruction: `Inside \`describe_location\`, use the \`format!\` macro to return a string like \`"You are in the {}."\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['format!', 'loc'],
              allRequired: true,
              hints: ['Inside the function: format!("You are in the {}.", loc)'],
            },
          ],
          message: 'Implement the location description logic',
        },
        test: ['Function returns a formatted String'],
        what_you_learned: `The format! macro creates a new owned String by interpolating values.`,
      },
      {
        step: 14,
        title: 'Tracking Location',
        instruction: `In \`main\`, create a mutable variable \`current_location\` and initialize it with \`String::from("forest")\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let mut current_location = String::from("forest")'],
              allRequired: true,
              hints: ['Use: let mut current_location = String::from("forest");'],
            },
          ],
          message: 'Initialize the player location',
        },
        test: ['current_location is mutable'],
        what_you_learned: `Variables must be marked as mut if they will change over time.`,
      },
      {
        step: 15,
        title: 'Deref Coercion',
        instruction: `Call \`describe_location\` passing \`&current_location\` and print the result.

Wait, \`describe_location\` takes \`&str\` but we are passing \`&String\`. Rust automatically converts \`&String\` to \`&str\`. This is called deref coercion.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['describe_location(&current_location)'],
              allRequired: true,
              hints: ['Add: println!("{}", describe_location(&current_location));'],
            },
          ],
          message: 'Use deref coercion to pass a String as a slice',
        },
        test: ['Location description printed using &String'],
        what_you_learned: `Deref coercion makes Rust APIs more ergonomic by automatically converting between related types.`,
      },
      {
        step: 16,
        title: 'Capturing Input',
        instruction: `Import \`std::io\` at the top of your file.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['use std::io;'],
              allRequired: true,
              hints: ['Add at line 1: use std::io;'],
            },
          ],
          message: 'Import the I/O module',
        },
        test: ['std::io is imported'],
        what_you_learned: `The standard library provides tools for interacting with the outside world, like the terminal.`,
      },
      {
        step: 17,
        title: 'The Input Buffer',
        instruction: `In \`main\`, create a new empty \`String\` named \`choice\` using \`String::new()\`. Make it mutable.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let mut choice = String::new()'],
              allRequired: true,
              hints: ['Use: let mut choice = String::new();'],
            },
          ],
          message: 'Prepare a buffer for user input',
        },
        test: ['choice variable initialized as empty String'],
        what_you_learned: `An empty String can act as a buffer to receive data from standard input.`,
      },
      {
        step: 18,
        title: 'Reading from Stdin',
        instruction: `Use \`io::stdin().read_line(&mut choice).expect("Failed to read line");\` to get input from the user.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['io::stdin().read_line(&mut choice)'],
              allRequired: true,
              hints: ['Add the read_line call in main'],
            },
          ],
          message: 'Capture user input from the terminal',
        },
        test: ['stdin() is used to read input'],
        what_you_learned: `The read_line method requires a mutable reference because it modifies the string buffer.`,
      },
      {
        step: 19,
        title: 'The Mutable Borrow Rule',
        instruction: `While you have a mutable borrow (\`&mut choice\`), you cannot have any other borrows of that same variable. This prevents data races.
        
        Add a print statement: \`println!("You chose: {}", choice);\` AFTER the \`read_line\` call. Run \`cargo run\` and type something in the terminal!`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['println!', 'choice'],
              allRequired: true,
              hints: ['Print the choice after reading it'],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Test the input by running and typing a value'],
            },
          ],
          message: 'Print the user choice and verify input',
        },
        test: ['User input is printed correctly', 'Program was run'],
        what_you_learned: `Rust ensures that you can't read from a variable while it is being written to elsewhere. Interacting with your program makes it feel real!`,
      },
      {
        step: 20,
        title: 'Cleaning Input Strings',
        instruction: `\`read_line\` includes the newline character (\`\\n\`). Use \`.trim()\` to remove whitespace and store the result in a new variable named \`choice_clean\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let choice_clean = choice.trim()'],
              allRequired: true,
              hints: ['Use: let choice_clean = choice.trim();'],
            },
          ],
          message: 'Trim the whitespace from input',
        },
        test: ['Choice is trimmed of newlines'],
        what_you_learned: `The trim method returns a string slice (&str) that points into the original String.`,
      },
      {
        step: 21,
        title: 'Decision Branching',
        instruction: `Use a \`match\` expression on \`choice_clean\`. Handle \`"1"\` and \`"2"\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['match choice_clean', '"1" =>', '"2" =>'],
              allRequired: true,
              hints: ['Add: match choice_clean { "1" => ..., "2" => ..., _ => ... }'],
            },
          ],
          message: 'Start the decision matching',
        },
        test: ['Match expression added for choices'],
        what_you_learned: `Pattern matching works on string slices just as it does on numbers or enums.`,
      },
      {
        step: 22,
        title: 'Updating the Location',
        instruction: `Inside the match arms, update \`current_location\` to \`"cave"\` for choice "1" and \`"castle"\` for choice "2".`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['current_location = String::from("cave")', 'current_location = String::from("castle")'],
              allRequired: true,
              hints: ['Update the location inside the match arms'],
            },
          ],
          message: 'Update the game state based on choice',
        },
        test: ['Location updates correctly based on input'],
        what_you_learned: `Re-assigning a variable transfers ownership of the new value and drops the old one.`,
      },
      {
        step: 23,
        title: 'Handling the Unknown',
        instruction: `Add a default arm \`_ =>\` to the match block that prints \`"Invalid choice"\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['_ => println!("Invalid choice")'],
              allRequired: true,
              hints: ['Add the catch-all case'],
            },
          ],
          message: 'Handle unexpected user input',
        },
        test: ['Invalid input handled gracefully'],
        what_you_learned: `The underscore (_) is a wildcard pattern that keeps your match expressions exhaustive.`,
      },
      {
        step: 24,
        title: 'String Transformation',
        instruction: `Strings can be appended to. Use \`push_str()\` to add \`" adventure"\` to the end of your \`player_name\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['player_name.push_str(" adventure")'],
              allRequired: true,
              hints: ['Note: player_name must be let mut for this to work'],
            },
          ],
          message: 'Modify the player name string',
        },
        test: ['player_name modified in place'],
        what_you_learned: `push_str appends a string slice effectively into the owned String buffer.`,
      },
      {
        step: 25,
        title: 'Cloning for Resilience',
        instruction: `Sometimes you NEED two owners. Use \`.clone()\` to create a deep copy of \`current_location\` and store it in \`last_location\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let last_location = current_location.clone()'],
              allRequired: true,
              hints: ['Example: let last_location = current_location.clone();'],
            },
          ],
          message: 'Create a deep copy of a String',
        },
        test: ['Both variables coexist independently'],
        what_you_learned: `Cloning duplicates the data on the heap, giving you two independent owners.`,
      },
      {
        step: 26,
        title: 'The Final Description',
        instruction: `Print a final message describing the new location using the \`describe_location\` function. Run \`cargo run\` for the final playthrough of your game!`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['println!', 'describe_location'],
              allRequired: true,
              hints: ['Call describe_location and print the output'],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Perform the final verification run'],
            },
          ],
          message: 'Show the final result and verify the whole game',
        },
        test: ['New location is described to the user', 'Final run successful'],
        what_you_learned: `Combining functions and ownership rules results in a safe, predictable program flow. You've built a real interactive game with ownership!`,
      },
    ],
    completion_message: `🎉 Great job! You've built a text adventure and learned ownership!

You've learned:
✓ The difference between String (owned) and &str (borrowed)
✓ How ownership moves when values are passed
✓ How borrowing lets you use values without taking ownership
✓ When to use &str vs &String in function parameters

Ownership is Rust's superpower - it prevents memory bugs at compile time!`,
    extensions: `**Challenge yourself:**
- Add an inventory system (Vec<String>)
- Add health points that change based on choices
- Save/load game state to a file
- Add more complex branching storylines
- Use enums for locations instead of Strings`,
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
    ],
    project_overview: `Build a student management system where you'll define a Student struct, implement methods for summaries and grade updates, and manage a collection of students to calculate class averages.`,
    why_this_project: `Structs are the foundation of data organization in Rust. This project teaches you how to model real-world entities and encapsulate data with behavior, a critical skill for any Rust developer.`,
    prerequisites: [
      'Completed: Learn Functions by Building a Calculator',
      'Understanding of basic types and ownership',
    ],
    preview: {
      mode: 'onLoad',
      title: 'Student Manager',
      description: 'A tool to manage student records and calculate performance statistics.',
      example_output: `$ cargo run

Student Manager
===============

Student: Alice (ID: 1, Grade: 95.00)
Student: Bob (ID: 2, Grade: 87.50)
Student: Charlie (ID: 3, Grade: 92.10)

Average grade: 91.53`,
    },
    steps: [
      {
        step: 1,
        title: 'Project Setup',
        instruction: `Create a new Rust project called \`student_manager\`.`,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo new',
              projectSpecific: 'student_manager',
              hints: ['Run: cargo new student_manager'],
            },
          ],
          message: 'Initialize the student manager project',
        },
        test: ['student_manager directory exists'],
        what_you_learned: `Setting up a clean workspace for learning data structures.`,
      },
      {
        step: 2,
        title: 'Entering the Project',
        instruction: `Navigate into the \`student_manager\` directory.`,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cd student_manager',
              hints: ['Run: cd student_manager'],
            },
          ],
          message: 'Navigate into the project folder',
        },
        test: ['Terminal in student_manager directory'],
        what_you_learned: `Cargo commands only work from within the project's root folder.`,
      },
      {
        step: 3,
        title: 'Defining a Struct',
        instruction: `Structs let you group related data together. Define an empty struct named \`Student\` above your \`main\` function.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['struct Student { }'],
              allRequired: true,
              hints: ['Add: struct Student { } above main'],
            },
          ],
          message: 'Define the Student struct structure',
        },
        test: ['Student struct exists'],
        what_you_learned: `Structs are the primary way to define custom types in Rust.`,
      },
      {
        step: 4,
        title: 'Name and ID',
        instruction: `Add two fields to \`Student\`: \`name\` as a \`String\` and \`id\` as a \`u32\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['name: String', 'id: u32'],
              allRequired: true,
              hints: ['Example: name: String, id: u32'],
            },
          ],
          message: 'Add identifier fields to the struct',
        },
        test: ['Student struct has name and id'],
        what_you_learned: `Fields give your struct its properties and state.`,
      },
      {
        step: 5,
        title: 'Adding the Grade',
        instruction: `Add one more field: \`grade\` of type \`f64\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['grade: f64'],
              allRequired: true,
              hints: ['Add: grade: f64'],
            },
          ],
          message: 'Add the grade field',
        },
        test: ['Student struct has all three fields'],
        what_you_learned: `You can mix different types within a single struct.`,
      },
      {
        step: 6,
        title: 'Instantiating a Student',
        instruction: `In \`main\`, create a variable \`alice\` and initialize it with your name (as a \`String\`), ID \`1\`, and grade \`95.0\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let alice = Student {'],
              allRequired: true,
              hints: ['Use: let alice = Student { name: String::from("Alice"), id: 1, grade: 95.0 };'],
            },
          ],
          message: 'Create a struct instance',
        },
        test: ['alice variable created properly'],
        what_you_learned: `Creating an instance requires providing values for all defined fields.`,
      },
      {
        step: 7,
        title: 'Accessing Fields',
        instruction: `Print Alice's name and grade using dot notation. Then, run \`cargo run\` to verify the output.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['alice.name', 'alice.grade'],
              allRequired: true,
              hints: ['Use: println!("{} - {}", alice.name, alice.grade);'],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Run the program to see Alice\'s details'],
            },
          ],
          message: 'Access field values and verify by running the program',
        },
        test: ['Fields accessed and printed', 'Program executed'],
        what_you_learned: `The dot (.) operator is used to read individual values from a struct instance. Running your code regularly helps catch errors early.`,
      },
      {
        step: 8,
        title: 'Immutability Error',
        instruction: `Try to update the grade: \`alice.grade = 100.0;\`. You will see a compiler error because variables are immutable by default. Fix this by adding \`mut\` to Alice's declaration.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let mut alice = Student'],
              allRequired: true,
              hints: ['Change to: let mut alice = ...'],
            },
          ],
          message: 'Make the struct instance mutable',
        },
        test: ['Variable is now mutable'],
        what_you_learned: `Mutability in Rust applies to the entire struct, or not at all.`,
      },
      {
        step: 9,
        title: 'The Implementation Block',
        instruction: `To define behavior (methods) for a struct, use an \`impl\` block. Create an \`impl Student { }\` block.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['impl Student { }'],
              allRequired: true,
              hints: ['Add: impl Student { } below the struct definition'],
            },
          ],
          message: 'Create an implementation block',
        },
        test: ['impl block detected'],
        what_you_learned: `Implementation blocks separate the data layout from the logic.`,
      },
      {
        step: 10,
        title: 'Defining a Method',
        instruction: `Inside the \`impl\` block, define a method \`summary\` that takes \`&self\`. Leave the body empty for now.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['fn summary(&self)'],
              allRequired: true,
              hints: ['Add: fn summary(&self) { }'],
            },
          ],
          message: 'Define a method signature',
        },
        test: ['summary method exists'],
        what_you_learned: `\&self allows the method to read from the instance without taking ownership.`,
      },
      {
        step: 11,
        title: 'The self Keyword',
        instruction: `In \`summary\`, print the student's name and grade using the \`self\` keyword.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['self.name', 'self.grade'],
              allRequired: true,
              hints: ['Example: println!("{} has grade {}", self.name, self.grade);'],
            },
          ],
          message: 'Use self to access instance data',
        },
        test: ['Method logic is correct'],
        what_you_learned: `self refers to the specific instance the method was called on.`,
      },
      {
        step: 12,
        title: 'Calling the Method',
        instruction: `In \`main\`, call \`alice.summary()\`. Then run \`cargo run\` to see the method's output.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['alice.summary()'],
              allRequired: true,
              hints: ['Use dot notation to invoke methods'],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Verify the method behavior in the terminal'],
            },
          ],
          message: 'Invoke the method and verify execution',
        },
        test: ['summary method called successfully', 'Program was run'],
        what_you_learned: `Methods feel like field access but execute behavior. Running the code confirms the behavior works as expected.`,
      },
      {
        step: 13,
        title: 'Mutable Methods',
        instruction: `Define a method \`update_grade\` that takes \`&mut self\` and a new grade as an argument.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['fn update_grade(&mut self', 'self.grade ='],
              allRequired: true,
              hints: ['Use &mut self to modify the struct from within a method'],
            },
          ],
          message: 'Create a method that modifies state',
        },
        test: ['update_grade method works'],
        what_you_learned: `\&mut self allows a method to safely mutate the instance's fields.`,
      },
      {
        step: 14,
        title: 'Associated Functions',
        instruction: `Associated functions don't take \`self\`. They are called with \`::\`. Add a function \`new\` to the \`impl\` block.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['fn new(', '-> Student'],
              allRequired: true,
              hints: ['Associated functions are often used as constructors'],
            },
          ],
          message: 'Define an associated function',
        },
        test: ['new function detected'],
        what_you_learned: `Associated functions belong to the type itself, not a specific instance.`,
      },
      {
        step: 15,
        title: 'The Constructor Pattern',
        instruction: `In \`new\`, return a \`Student\` instance initialized with the parameters provided to the function.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['Student {', 'name,', 'id,', 'grade', '}'],
              allRequired: true,
              hints: ['Use field initialization shorthand if names match'],
            },
          ],
          message: 'Implement the constructor logic',
        },
        test: ['new() returns a valid Student'],
        what_you_learned: `Initialization shorthand makes constructors cleaner when parameter names match field names.`,
      },
      {
        step: 16,
        title: 'Simplified Creation',
        instruction: `In \`main\`, replace Alice's initialization with a call to \`Student::new()\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['Student::new('],
              allRequired: true,
              hints: ['Use: let mut alice = Student::new(...)'],
            },
          ],
          message: 'Use the associated function in main',
        },
        test: ['Student::new used for creation'],
        what_you_learned: `Constructor functions centralize how your objects are created.`,
      },
      {
        step: 17,
        title: 'Creating Bob',
        instruction: `Create another student named \`Bob\` using the \`new\` function. Then call \`bob.summary()\` and run \`cargo run\` to see both students.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let bob = Student::new(', 'bob.summary()'],
              allRequired: true,
              hints: ['Example: let bob = Student::new(String::from("Bob"), 2, 87.5);', 'Call bob.summary();'],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Observe both student summaries in the terminal'],
            },
          ],
          message: 'Create a second student, use summary, and verify',
        },
        test: ['Bob instance created', 'Program was run'],
        what_you_learned: `Multiple instances of the same struct can coexist independently.`,
      },
      {
        step: 18,
        title: 'The Student Collection',
        instruction: `Create a mutable \`Vec<Student>\` named \`students\` and add both Alice and Bob to it.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let mut students: Vec<Student> =', 'students.push('],
              allRequired: true,
              hints: ['Use: students.push(alice); students.push(bob);'],
            },
          ],
          message: 'Store students in a vector',
        },
        test: ['Vector contains two students'],
        what_you_learned: `Vectors can store complex custom types like structs.`,
      },
      {
        step: 19,
        title: 'Iterating over Structs',
        instruction: `Use a \`for\` loop to call \`summary()\` on every student in the vector. Hint: borrow with \`&students\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['for student in &students', 'student.summary()'],
              allRequired: true,
              hints: ['Always borrow in loops unless you want to move ownership'],
            },
          ],
          message: 'Loop through the students',
        },
        test: ['All summaries printed'],
        what_you_learned: `Iterating over references allows you to inspect each item without consuming the vector.`,
      },
      {
        step: 20,
        title: 'Grade Calculation',
        instruction: `Calculate the total sum of all grades in the vector using a loop.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let mut total = 0.0', 'total += student.grade'],
              allRequired: true,
              hints: ['Accumulate field values from each struct in the loop'],
            },
          ],
          message: 'Calculate total grades',
        },
        test: ['Total sum is correct'],
        what_you_learned: `You can access fields of items within a collection while iterating.`,
      },
      {
        step: 21,
        title: 'Class Average',
        instruction: `Print the average grade. Note: convert \`students.len()\` to \`f64\` using \`as f64\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['/ students.len() as f64'],
              allRequired: true,
              hints: ['Math in Rust requires both sides to be the same numerical type'],
            },
          ],
          message: 'Compute and print average',
        },
        test: ['Average calculation is accurate'],
        what_you_learned: `Explicit casting with "as" is necessary for math between integers and floats.`,
      },
      {
        step: 22,
        title: 'Efficiency Check',
        instruction: `Add one more student directly into the vector in a single line without using a separate variable. Finally, run \`cargo run\` to see the final output with all students and the average!`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['students.push(Student::new('],
              allRequired: true,
              hints: ['Example: students.push(Student::new(String::from("Charlie"), 3, 92.1));'],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Run for the final project verification'],
            },
          ],
          message: 'Push an anonymous instance and run the final program',
        },
        test: ['Third student added directly', 'Final verification complete'],
        what_you_learned: `You can pass the result of a function directly as an argument without naming it first. Continuous testing leads to robust software!`,
      },
    ],
    completion_message: `🎉 You've mastered structs! They are the primary way you'll model data in all your future Rust programs.`,
    extensions: `**Challenge yourself:**
- Add a field for the student's age
- Create a method to check if a student is passing (grade > 60)
- Add a function to find the top performing student
- Support multiple subjects per student using a Hashmap`,
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
      'debug_trait',
      'methods',
    ],
    project_overview: `You will build a traffic light simulator that cycles through Red, Yellow, and Green states. You'll learn how to represent bounded sets of values using enums and how to implement logic for them using match and methods.`,
    why_this_project: `Enums are one of Rust's most powerful features. They allow you to represent data that can be one of several distinct variants, which is perfect for modelling states like traffic lights, game levels, or network status.`,
    prerequisites: [
      'Completed: Learn Structs by Building a Student Manager',
      'Basic understanding of functions and match',
    ],
    preview: {
      mode: 'onLoad',
      title: 'Traffic Light Simulator',
      description: 'A simulator that cycles through traffic light states using enums and methods.',
      example_output: `$ cargo run

Traffic Light: Red
Duration: 30 seconds
Next state: Green
---
Traffic Light: Green
Duration: 25 seconds
Next state: Yellow`,
    },
    steps: [
      {
        step: 1,
        title: 'Project Initialization',
        instruction: `Create a new Rust project called \`traffic_light\`.`,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo new',
              projectSpecific: 'traffic_light',
              hints: ['Run: cargo new traffic_light'],
            },
          ],
          message: 'Initialize the traffic_light project',
        },
        test: ['traffic_light directory exists'],
        what_you_learned: `Starting a new project workspace for learning enums.`,
      },
      {
        step: 2,
        title: 'Entering the Project',
        instruction: `Navigate into the \`traffic_light\` directory.`,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cd traffic_light',
              hints: ['Run: cd traffic_light'],
            },
          ],
          message: 'Navigate into the project folder',
        },
        test: ['Terminal in traffic_light directory'],
        what_you_learned: `Always ensure you are in the project root before running cargo commands.`,
      },
      {
        step: 3,
        title: 'Defining an Enum',
        instruction: `Enums (short for enumerations) allow you to define a type that can be one of several variants. Define an empty enum named \`TrafficLight\` above your \`main\` function.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['enum TrafficLight { }'],
              allRequired: true,
              hints: ['Add: enum TrafficLight { } above main'],
            },
          ],
          message: 'Define the TrafficLight enum',
        },
        test: ['TrafficLight enum detected'],
        what_you_learned: `Enums are used to represent a value that can be one of several predefined options.`,
      },
      {
        step: 4,
        title: 'The Red Variant',
        instruction: `Add a variant named \`Red\` to your \`TrafficLight\` enum. Variants in Rust are typically UpperCamelCase.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['enum TrafficLight {', 'Red', '}'],
              allRequired: true,
              hints: ['Add Red inside the braces of the enum'],
            },
          ],
          message: 'Add the Red variant',
        },
        test: ['Red variant added to TrafficLight'],
        what_you_learned: `Variants are the different forms an enum can take.`,
      },
      {
        step: 5,
        title: 'The Yellow Variant',
        instruction: `Add the \`Yellow\` variant to the enum, separated by a comma.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['Red,', 'Yellow'],
              allRequired: true,
              hints: ['Add: Yellow, after Red'],
            },
          ],
          message: 'Add the Yellow variant',
        },
        test: ['Yellow variant detected'],
        what_you_learned: `Enum variants are separated by commas.`,
      },
      {
        step: 6,
        title: 'The Green Variant',
        instruction: `Add the final \`Green\` variant to the enum.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['Yellow,', 'Green'],
              allRequired: true,
              hints: ['Add: Green to the enum list'],
            },
          ],
          message: 'Add the Green variant',
        },
        test: ['All three variants (Red, Yellow, Green) exist'],
        what_you_learned: `A complete enum represents all possible states of a system.`,
      },
      {
        step: 7,
        title: 'Instantiating an Enum',
        instruction: `In \`main\`, create a variable named \`light\` and assign it the \`Red\` variant. Use the syntax \`TrafficLight::Red\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let light = TrafficLight::Red;'],
              allRequired: true,
              hints: ['Use: let light = TrafficLight::Red;'],
            },
          ],
          message: 'Create an instance of an enum variant',
        },
        test: ['light variable holds TrafficLight::Red'],
        what_you_learned: `Double colons (::) are used to access the variants defined within an enum's namespace.`,
      },
      {
        step: 8,
        title: 'The Printing Challenge',
        instruction: `Try to print the \`light\` variable using \`println!("{}", light);\`. This will fail because our enum doesn't know how to format itself as text yet. Observe the compiler error.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['println!', 'light'],
              allRequired: true,
              hints: ['Add the println! statement to see the error'],
            },
          ],
          message: 'Experience the need for formatting traits',
        },
        test: ['User added println! for the enum'],
        what_you_learned: `By default, custom types in Rust don't implement the Display trait.`,
      },
      {
        step: 9,
        title: 'The Debug Trait',
        instruction: `Rust provides a special trait called \`Debug\` for developers to inspect values. Add \`#[derive(Debug)]\` immediately above your \`enum TrafficLight\` definition.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['#[derive(Debug)]', 'enum TrafficLight'],
              allRequired: true,
              hints: ['Add the derive attribute on the line before the enum'],
            },
          ],
          message: 'Enable debug printing for the enum',
        },
        test: ['Debug trait derived for TrafficLight'],
        what_you_learned: `Deriving traits automatically implements common functionality for your custom types.`,
      },
      {
        step: 10,
        title: 'Printing with Debug',
        instruction: `Update your \`println!\` to use the debug formatter \`{:?}\` instead of \`{}\`. Then run \`cargo run\` to see the output.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['println!', '{:?}', 'light'],
              allRequired: true,
              hints: ['Change the placeholder to {:?}'],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Run the program to see the result'],
            },
          ],
          message: 'Print the enum variant using debug formatting',
        },
        test: ['Code compiles and prints "Red"', 'Program was run'],
        what_you_learned: `The {:?} formatter uses the Debug trait to display a representation of the value. Running it yourself confirms the trait is working.`,
      },
      {
        step: 11,
        title: 'Enum Logic with impl',
        instruction: `Just like structs, enums can have \`impl\` blocks for methods. Create an \`impl TrafficLight { }\` block.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['impl TrafficLight { }'],
              allRequired: true,
              hints: ['Add: impl TrafficLight { }'],
            },
          ],
          message: 'Create an implementation block for the enum',
        },
        test: ['impl block detected'],
        what_you_learned: `Methods allow you to attach behavior directly to your enum variants.`,
      },
      {
        step: 12,
        title: 'The Duration Method',
        instruction: `Inside the \`impl\` block, define a method named \`duration\` that takes \`&self\` and returns a \`u32\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['fn duration(&self) -> u32'],
              allRequired: true,
              hints: ['Add the method signature inside the block'],
            },
          ],
          message: 'Define a method to get the light duration',
        },
        test: ['duration method signature is correct'],
        what_you_learned: `Methods on enums use &self to refer to the current variant instance.`,
      },
      {
        step: 13,
        title: 'Matching on Self',
        instruction: `Inside \`duration\`, use \`match self { }\` to handle the variants. Match expressions on enums must be exhaustive!`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['match self {'],
              allRequired: true,
              hints: ['Use: match self { ... }'],
            },
          ],
          message: 'Start pattern matching on self',
        },
        test: ['Match expression used inside method'],
        what_you_learned: `Match is the most common way to branch logic based on an enum's variant.`,
      },
      {
        step: 14,
        title: 'Red Duration',
        instruction: `In the match block, handle \`TrafficLight::Red\` and return \`30\`. Since we are matching on \`self\`, we've already imported the name; you can just use \`self::Red\` or if you use the full name \`TrafficLight::Red\`. Usually just \`TrafficLight::Red => 30,\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['TrafficLight::Red => 30'],
              allRequired: true,
              hints: ['Add the Red arm to the match'],
            },
          ],
          message: 'Implement the Red arm',
        },
        test: ['Red duration handled'],
        what_you_learned: `Each arm of a match maps a variant pattern to a return value or expression.`,
      },
      {
        step: 15,
        title: 'Yellow and Green Duration',
        instruction: `Add arms for \`Yellow\` (returning \`5\`) and \`Green\` (returning \`25\`).`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['TrafficLight::Yellow => 5', 'TrafficLight::Green => 25'],
              allRequired: true,
              hints: ['Add arms for Yellow and Green (durations: 5 and 25)'],
            },
          ],
          message: 'Complete the exhaustive match',
        },
        test: ['All variants handled in duration method'],
        what_you_learned: `Exhaustiveness checking ensures that you handle every possible state of your enum.`,
      },
      {
        step: 16,
        title: 'Testing the Method',
        instruction: `In \`main\`, print the duration of your \`light\` variable by calling \`light.duration()\`. Run \`cargo run\` to verify the 30s duration.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['light.duration()'],
              allRequired: true,
              hints: ['Use: println!("Duration: {}s", light.duration());'],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Check the duration output in the terminal'],
            },
          ],
          message: 'Call the method on an enum instance and verify',
        },
        test: ['Method called and duration printed', 'Program was run'],
        what_you_learned: `Methods on enums are called using the same dot notation as methods on structs. Verification in the terminal is key!`,
      },
      {
        step: 17,
        title: 'State Transitions',
        instruction: `Enums are great for state machines. Define a method \`next(&self)\` that returns a new \`TrafficLight\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['fn next(&self) -> TrafficLight'],
              allRequired: true,
              hints: ['Add the next method to the impl block'],
            },
          ],
          message: 'Define a method for state transitions',
        },
        test: ['next method signature detected'],
        what_you_learned: `Methods can return new instances of the same enum to represent transitions.`,
      },
      {
        step: 18,
        title: 'Red to Green',
        instruction: `Inside \`next\`, match on \`self\`. For \`TrafficLight::Red\`, return \`TrafficLight::Green\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['TrafficLight::Red => TrafficLight::Green'],
              allRequired: true,
              hints: ['Transition from Red to Green'],
            },
          ],
          message: 'Implement Red to Green transition',
        },
        test: ['Red transitions to Green'],
        what_you_learned: `Logic flows between enum variants allow you to model real-world cycles.`,
      },
      {
        step: 19,
        title: 'Green to Yellow',
        instruction: `Add the arm to transition \`Green\` to \`Yellow\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['TrafficLight::Green => TrafficLight::Yellow'],
              allRequired: true,
              hints: ['Transition from Green to Yellow'],
            },
          ],
          message: 'Implement Green to Yellow transition',
        },
        test: ['Green transitions to Yellow'],
        what_you_learned: `Sequential logic is naturally expressed using match arms.`,
      },
      {
        step: 20,
        title: 'Yellow to Red',
        instruction: `Complete the cycle by transitioning \`Yellow\` back to \`Red\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['TrafficLight::Yellow => TrafficLight::Red'],
              allRequired: true,
              hints: ['Transition from Yellow back to Red'],
            },
          ],
          message: 'Complete the traffic cycle',
        },
        test: ['All transitions implemented'],
        what_you_learned: `Cycles are completed when the last variant points back to the first.`,
      },
      {
        step: 21,
        title: 'The Simulation Loop',
        instruction: `In \`main\`, use a \`mut\` variable for the light. Inside a \`for _ in 0..3\` loop, update the light to its next state using \`light = light.next();\` and print it.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let mut light', 'for', 'light.next()'],
              allRequired: true,
              hints: ['Make light mutable and call next() inside the loop'],
            },
          ],
          message: 'Simulate a multi-step light cycle',
        },
        test: ['Simulation loop implemented correctly'],
        what_you_learned: `Enum variables must be mutable if you intend to reassign them to different variants.`,
      },
      {
        step: 22,
        title: 'Final Output',
        instruction: `Print \`Cycle complete!\` after the loop. Then run \`cargo run\` for the final simulation check!`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['println!("Cycle complete!")'],
              allRequired: true,
              hints: ['Print the message outside the loop'],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Run for the final simulation verification'],
            },
          ],
          message: 'Add a final notification and verify',
        },
        test: ['Final message printed', 'Final run successful'],
        what_you_learned: `You have successfully built a state machine using Rust enums! Logic cycles point back. You've mastered enums and state transitions in Rust!`,
      },
    ],
    completion_message: `🎉 Great job! You've mastered enums! 

You've learned:
✓ How to define enums and variants
✓ How to use #[derive(Debug)] for easy printing
✓ How to implement methods on enums
✓ How to use exhaustive match expressions
✓ How to model state transitions

Enums are the key to writing concise, safe, and bug-free code in Rust.`,
    extensions: `**Challenge yourself:**
- Add a "BlinkingYellow" variant
- Associate data with variants (e.g., Green(u32) for a specific speed limit)
- Implement the "Display" trait manually instead of using "Debug"
- Add a sleep timer between transitions using "std::thread::sleep"`,
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
      'Option',
      'expect_unwrap',
      'error_propagation',
      'question_mark_operator',
      'match_patterns',
    ],
    project_overview: `You will build a command-line tool that reads a file and processes its text. You'll learn how to handle errors gracefully using Rust's Result and Option types, moving from basic panics to proper error propagation and recovery.`,
    why_this_project: `Real-world programs must deal with failure (missing files, invalid inputs). Rust makes these failures explicit, helping you write robust code that doesn't crash unexpectedly. learning these patterns early is essential.`,
    prerequisites: [
      'Completed: Learn Enums by Building a Traffic Light Simulator',
      'Basic understanding of String and &str',
    ],
    preview: {
      mode: 'onLoad',
      title: 'File Processor',
      description: 'A tool that reads files and handles potential errors using Result and Option.',
      example_output: `$ cargo run -- hello.txt
Reading hello.txt...
File content: Hello Rust!

$ cargo run -- missing.txt
Error: The file "missing.txt" could not be found.`,
    },
    steps: [
      {
        step: 1,
        title: 'Project Setup',
        instruction: `Create a new Rust project called \`file_processor\`.`,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo new',
              projectSpecific: 'file_processor',
              hints: ['Run: cargo new file_processor'],
            },
          ],
          message: 'Initialize the file_processor project',
        },
        test: ['file_processor directory exists'],
        what_you_learned: `Starting a new workspace for learning system interactions and error handling.`,
      },
      {
        step: 2,
        title: 'Entering the Project',
        instruction: `Navigate into the \`file_processor\` directory.`,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cd file_processor',
              hints: ['Run: cd file_processor'],
            },
          ],
          message: 'Navigate into the project folder',
        },
        test: ['Terminal in file_processor directory'],
        what_you_learned: `Ensuring you are in the correct directory for Cargo to find your manifest file.`,
      },
      {
        step: 3,
        title: 'Importing Modules',
        instruction: `To handle files and arguments, we need modules from the standard library. Add \`use std::env;\` and \`use std::fs;\` to the top of \`main.rs\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['use std::env;', 'use std::fs;'],
              allRequired: true,
              hints: ['Add these lines at the very top of main.rs'],
            },
          ],
          message: 'Import necessary modules',
        },
        test: ['std::env and std::fs imported'],
        what_you_learned: `The standard library provides core functionality for environment and file system access.`,
      },
      {
        step: 4,
        title: 'Collecting Arguments',
        instruction: `In \`main\`, collect the command-line arguments into a vector of strings named \`args\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let args: Vec<String> = env::args().collect();'],
              allRequired: true,
              hints: ['Use: let args: Vec<String> = env::args().collect();'],
            },
          ],
          message: 'Collect CLI arguments',
        },
        test: ['args vector contains the program arguments'],
        what_you_learned: `env::args() returns an iterator over arguments, which .collect() turns into a collection like a Vec.`,
      },
      {
        step: 5,
        title: 'The Option Type',
        instruction: `Vectors might not have the index you're looking for. The \`.get(index)\` method returns an \`Option<&T>\`.
        
        Try to get the first argument (index 1) using \`args.get(1)\` and store it in a variable \`filename_option\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let filename_option = args.get(1);'],
              allRequired: true,
              hints: ['Index 0 is the program name, index 1 is the first argument'],
            },
          ],
          message: 'Get an optional argument',
        },
        test: ['filename_option is of type Option<&String>'],
        what_you_learned: `Option represents a value that might be something (Some) or nothing (None).`,
      },
      {
        step: 6,
        title: 'Matching on Option',
        instruction: `Use a \`match\` expression on \`filename_option\` to handle both cases. If it's \`None\`, print "Please provide a filename" and exit the program early using \`return;\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['match filename_option', 'None =>', 'return;'],
              allRequired: true,
              hints: ['Use: match filename_option { None => { println!("..."); return; }, ... }'],
            },
          ],
          message: 'Handle the None case',
        },
        test: ['Program exits gracefully if no argument is provided'],
        what_you_learned: `Pattern matching ensures you handle the case where a value might be missing.`,
      },
      {
        step: 7,
        title: 'Test the error path',
        instruction: `Let's verify our error handling works. Run \`cargo run\` without any arguments.

You should see the error message you just added. This confirms you're properly handling the missing filename case!`,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Run: cargo run without any arguments to see the error message'],
            },
          ],
          message: 'Test the None case error handling',
        },
        test: ['Error message displayed for missing argument'],
        what_you_learned: `Always test your error paths. A program that fails gracefully is more trustworthy.`,
      },
      {
        step: 8,
        title: 'Extracting the Value',
        instruction: `In the \`Some(name)\` arm of your match, simply print "Processing: {name}". Then run \`cargo run -- test.txt\` to see it work.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['Some(name) =>', 'println!'],
              allRequired: true,
              hints: ['Example: Some(name) => println!("Processing: {}", name),'],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Run the program with a filename argument'],
            },
          ],
          message: 'Handle the Some case and verify',
        },
        test: ['Program prints the filename if provided', 'Program was run'],
        what_you_learned: `The Some(value) pattern extracts the inner value from the Option. Running with arguments verifies your logic works for real inputs.`,
      },
      {
        step: 9,
        title: 'Reading a File',
        instruction: `Use \`fs::read_to_string(name)\` to read the file. This function returns a \`Result<String, std::io::Error>\`. Store the result in \`content_result\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let content_result = fs::read_to_string('],
              allRequired: true,
              hints: ['Call this inside the Some arm or after the match (if you assign name to a variable)'],
            },
          ],
          message: 'Perform a fallible file read',
        },
        test: ['File read operation attempted'],
        what_you_learned: `Result is used for operations that can fail due to external factors.`,
      },
      {
        step: 10,
        title: 'Matching on Result',
        instruction: `Just like Option, Result uses \`match\`. Use it on \`content_result\`. If it's \`Ok(text)\`, print the content.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['match content_result', 'Ok(text) =>'],
              allRequired: true,
              hints: ['Follow the same pattern as Option, but use Ok and Err instead'],
            },
          ],
          message: 'Handle the Success case',
        },
        test: ['File content printed on success'],
        what_you_learned: `Result's Ok variant contains the successful output of an operation.`,
      },
      {
        step: 11,
        title: 'Handling the Error',
        instruction: `In the \`Err(e)\` arm of your match, print the error using \`println!("Error: {}", e);\`. Run \`cargo run -- missing.txt\` to verify error handling.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['Err(e) =>', 'println!'],
              allRequired: true,
              hints: ['Example: Err(e) => println!("Failed: {}", e),'],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Test the error case with a missing file'],
            },
          ],
          message: 'Handle the Failure case and verify',
        },
        test: ['Helpful error message printed if file is missing', 'Error case verified'],
        what_you_learned: `The Err variant contains information about why the operation failed. Proper error handling makes your CLI robust.`,
      },
      {
        step: 12,
        title: 'The unwrap Method',
        instruction: `Sometimes you're SURE an operation will succeed. The \`.unwrap()\` method returns the \`Ok\` value or PANICS (crashes) if it's an \`Err\`.
        
        Change your file read to use \`let content = fs::read_to_string(name).unwrap();\`. Be careful!`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['.unwrap()'],
              allRequired: true,
              hints: ['Note: unwrap() should be used sparingly in production code'],
            },
          ],
          message: 'Use unwrap for quick development',
        },
        test: ['Program uses unwrap()'],
        what_you_learned: `unwrap is a shortcut that assumes success but can lead to unhandled crashes.`,
      },
      {
        step: 13,
        title: 'The expect Method',
        instruction: `\`.expect("message")\` is like \`unwrap()\`, but it lets you provide a custom panic message.
        
        Replace \`.unwrap()\` with \`.expect("Failed to read the file")\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['.expect(', 'Failed to read the file'],
              allRequired: true,
              hints: ['Use: .expect("your custom message here")'],
            },
          ],
          message: 'Use expect for better panic messages',
        },
        test: ['Program uses expect() with a custom message'],
        what_you_learned: `expect makes debugging easier by explaining why a panic occurred.`,
      },
      {
        step: 14,
        title: 'Error Propagation',
        instruction: `Handling errors everywhere makes code messy. We can "pass the buck" to the caller.
        
        Define a function \`read_and_process(path: &str) -> Result<String, std::io::Error>\` above \`main\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['fn read_and_process(', '-> Result<String, std::io::Error>'],
              allRequired: true,
              hints: ['The return type tells Rust this function might fail'],
            },
          ],
          message: 'Define a function that returns a Result',
        },
        test: ['Function with Result return type detected'],
        what_you_learned: `Returning a Result allows a function to propagate errors to its caller.`,
      },
      {
        step: 15,
        title: 'The Question Mark Operator',
        instruction: `Inside \`read_and_process\`, use the \`?\` operator: \`let content = fs::read_to_string(path)?;\`.
        
        The \`?\` either returns the \`Ok\` value or immediately returns the \`Err\` from the entire function.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['read_to_string(path)?'],
              allRequired: true,
              hints: ['Add the ? after the function call'],
            },
          ],
          message: 'Use the ? operator for propagation',
        },
        test: ['? operator used correctly'],
        what_you_learned: `The ? operator is the idiomatic way to handle errors in Rust, making propagation concise.`,
      },
      {
        step: 16,
        title: 'Completing the Function',
        instruction: `After reading, use \`.to_uppercase()\` on the content and return it wrapped in \`Ok()\`.
        
        Example: \`Ok(content.to_uppercase())\``,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['to_uppercase()', 'Ok('],
              allRequired: true,
              hints: ['Remember to return the final result at the end of the function'],
            },
          ],
          message: 'Return a successful Result',
        },
        test: ['Function returns processed content wrapped in Ok'],
        what_you_learned: `Successful values must be explicitly wrapped in the Ok variant of the Result.`,
      },
      {
        step: 17,
        title: 'Using the Propagator',
        instruction: `In \`main\`, call \`read_and_process(name)\` and handle its result using \`if let\`. Run \`cargo run\` to see the processed output.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['if let Ok(processed) = read_and_process('],
              allRequired: true,
              hints: ['if let is a concise way to handle only one variant'],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Execute the final logic in main'],
            },
          ],
          message: 'Use if let and verify the results',
        },
        test: ['Processed content printed using if let', 'Program verified'],
        what_you_learned: `if let is literal shorthand for match when you only care about one patterns logic. It makes success handling much cleaner.`,
      },
      {
        step: 18,
        title: 'Handling Errors with if let',
        instruction: `Add an \`else\` block to your \`if let\` or use a separate \`if let Err(e)\` to print "An error occurred".`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['else {', 'println!'],
              allRequired: true,
              hints: ['Example: if let Ok(p) = ... { ... } else { println!("Error!"); }'],
            },
          ],
          message: 'Add an error fallback',
        },
        test: ['Overall program handles success and failure'],
        what_you_learned: `if let with else provides a clean alternative to simple match statements.`,
      },
      {
        step: 19,
        title: 'Default Values with Option',
        instruction: `Option has a \`.unwrap_or()\` method. Use it to get a filename or default to \`"input.txt"\`.
        
        \`let filename = args.get(1).map(|s| s.as_str()).unwrap_or("input.txt");\``,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['.unwrap_or("input.txt")'],
              allRequired: true,
              hints: ['Use: let name = args.get(1).unwrap_or(&default_string);'],
            },
          ],
          message: 'Provide a default value using Option',
        },
        test: ['Program defaults to input.txt if no argument is provided'],
        what_you_learned: `unwrap_or allows you to safely recover from a None value by providing a backup.`,
      },
      {
        step: 20,
        title: 'The Default Trait',
        instruction: `Some types have a default value. \`String::default()\` is an empty string.
        
        Print \`String::default()\` in main just to see it.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['String::default()'],
              allRequired: true,
              hints: ['Example: println!("Default: {:?}", String::default());'],
            },
          ],
          message: 'Use the Default trait',
        },
        test: ['Default string printed'],
        what_you_learned: `Many Rust types implement the Default trait to provide a sensible initial state.`,
      },
      {
        step: 21,
        title: 'Custom Error Messages',
        instruction: `Inside \`main\`, if \`read_and_process\` fails, use \`eprintln!\` instead of \`println!\`. \`eprintln!\` prints to standard error.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['eprintln!'],
              allRequired: true,
              hints: ['eprintln! is for error reporting'],
            },
          ],
          message: 'Use standard error for diagnostics',
        },
        test: ['Error messages sent to stderr'],
        what_you_learned: `Standard error (stderr) is a separate stream meant specifically for diagnostic and error messages.`,
      },
      {
        step: 22,
        title: 'Filtering Content',
        instruction: `In your \`read_and_process\` function, if the file content is empty, return an \`Err\` with a custom message. Wait, returning a custom message requires a different error type. For now, just return the \`Ok\` value regardless.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['if content.is_empty()'],
              allRequired: true,
              hints: ['Check if the content is empty'],
            },
          ],
          message: 'Check for empty file content',
        },
        test: ['Logic accounts for empty files'],
        what_you_learned: `You can use standard control flow (if/else) alongside Result logic.`,
      },
      {
        step: 23,
        title: 'Final Assembly',
        instruction: `Clean up your \`main\` to only: collect args, get filename (with default), call \`read_and_process\`, and print the result or error. Run \`cargo run -- any_file.txt\` for the final project check!`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['read_and_process', 'args.get(1)'],
              allRequired: true,
              hints: ['Assemble the components into a clean final program'],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Final validation run'],
            },
          ],
          message: 'Finalize the file processor and verify',
        },
        test: ['Complete program works as expected', 'Project complete'],
        what_you_learned: `Congratulations! You've built a robust tool using Rust's powerful error handling system. Regular execution is the hallmark of a good developer.`,
      },
    ],
    completion_message: `🎉 You've mastered Error Handling! You now know how to handle Option and Result, use the ? operator, and provide fallback values. These are the tools that make Rust programs incredibly reliable.`,
    extensions: `**Challenge yourself:**
- Add a choice between uppercase and lowercase conversion
- Count the words in the file and return the count
- Create a custom Error enum to represent different failure reasons
- Use the 'anyhow' crate for even easier error handling (look it up!)`,
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
      'HashMap',
      'CRUD_operations',
      'iterators',
      'entry_api',
      'cloning',
    ],
    project_overview: `You will build a contact management system. You'll start with basic vectors to list contacts, then move to HashMaps for lightning-fast lookups, learning how to Create, Read, Update, and Delete data effectively in Rust.`,
    why_this_project: `Almost every program needs to store and search for data. Rust's collections are powerful and safe, but they have unique rules about ownership and borrowing. This project will make you comfortable with the two most used collections: Vec and HashMap.`,
    prerequisites: [
      'Completed: Learn Error Handling by Building a File Processor',
      'Basic understanding of Structs and Enums',
    ],
    preview: {
      mode: 'onLoad',
      title: 'Contact Manager',
      description: 'A system to manage contact information using vectors and hash maps.',
      example_output: `$ cargo run
--- Contact Manager ---
1. Add Contact
2. Look up Phone
3. Remove Contact
4. Exit

> 2
Enter name: Alice
Phone: 555-0199`,
    },
    steps: [
      {
        step: 1,
        title: 'Project Setup',
        instruction: `Create a new Rust project called \`contact_manager\`.`,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cargo new',
              projectSpecific: 'contact_manager',
              hints: ['Run: cargo new contact_manager'],
            },
          ],
          message: 'Initialize the contact_manager project',
        },
        test: ['contact_manager directory exists'],
        what_you_learned: `Standard setup for a new collection-based application.`,
      },
      {
        step: 2,
        title: 'Entering the Project',
        instruction: `Navigate into the \`contact_manager\` directory.`,
        validation: {
          rules: [
            {
              type: 'terminal_command',
              command: 'cd contact_manager',
              hints: ['Run: cd contact_manager'],
            },
          ],
          message: 'Navigate into the project folder',
        },
        test: ['Terminal in contact_manager directory'],
        what_you_learned: `You must be in the package root to perform Cargo operations.`,
      },
      {
        step: 3,
        title: 'The Contact Data',
        instruction: `Define a \`Contact\` struct above \`main\` with fields for \`name\` and \`phone\`, both as \`String\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['struct Contact', 'name: String', 'phone: String'],
              allRequired: true,
              hints: ['Example: struct Contact { name: String, phone: String }'],
            },
          ],
          message: 'Define the data structure',
        },
        test: ['Contact struct exists with required fields'],
        what_you_learned: `Structs are the building blocks that collections will hold.`,
      },
      {
        step: 4,
        title: 'Making it Printable',
        instruction: `Add \`#[derive(Debug)]\` to your \`Contact\` struct so we can easily print it for debugging.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['#[derive(Debug)]', 'struct Contact'],
              allRequired: true,
              hints: ['Place the attribute directly above the struct definition'],
            },
          ],
          message: 'Add Debug derive',
        },
        test: ['Contact implements Debug'],
        what_you_learned: `Deriving Debug is the easiest way to inspect your data during development.`,
      },
      {
        step: 5,
        title: 'The Basic Vector',
        instruction: `In \`main\`, create a mutable vector of \`Contact\` structs named \`contact_list\`. Use \`Vec::new()\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let mut contact_list', 'Vec::new()'],
              allRequired: true,
              hints: ['Example: let mut contact_list: Vec<Contact> = Vec::new();'],
            },
          ],
          message: 'Initialize a vector',
        },
        test: ['contact_list initialized as an empty vector'],
        what_you_learned: `Vec is a growable array that stores items contiguously in memory.`,
      },
      {
        step: 6,
        title: 'Adding Items',
        instruction: `Use the \`.push()\` method to add a new \`Contact\` instance to your \`contact_list\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['contact_list.push('],
              allRequired: true,
              hints: ['Example: contact_list.push(Contact { name: ... })'],
            },
          ],
          message: 'Add data to the collection',
        },
        test: ['Vector contains one or more contacts'],
        what_you_learned: `push() adds an element to the end of the vector, increasing its length.`,
      },
      {
        step: 7,
        title: 'Iterating over Vectors',
        instruction: `Use a \`for\` loop to iterate over \`&contact_list\` and print each contact's name. Then run \`cargo run\` to see the list in the terminal.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['for', '&contact_list', 'println!'],
              allRequired: true,
              hints: ['Iterating over a reference (&) avoids moving the vector.'],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Check the output for the contact names'],
            },
          ],
          message: 'Loop through the collection and verify',
        },
        test: ['Contact names are printed from the loop', 'Program was run'],
        what_you_learned: `Iterating over references allows you to read from a collection without taking ownership. Running the code confirms your data is stored correctly.`,
      },
      {
        step: 8,
        title: 'The Lookup Problem',
        instruction: `Searching a large vector requires checking every element (O(n)). If you have a million contacts, this is slow!
        
        Comment out your vector code and we'll switch to a more efficient collection.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['//'],
              allRequired: false,
              hints: ['Just prepare to move to HashMaps!'],
            },
          ],
          message: 'Acknowledge the O(n) search limitation',
        },
        test: ['Ready for HashMaps'],
        what_you_learned: `Linear search becomes inefficient as the collection size grows.`,
      },
      {
        step: 9,
        title: 'Importing HashMap',
        instruction: `Unlike Vec, \`HashMap\` is not in the default prelude. Add \`use std::collections::HashMap;\` to the top of your file.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['use std::collections::HashMap;'],
              allRequired: true,
              hints: ['Add this at the very top of main.rs'],
            },
          ],
          message: 'Import the HashMap type',
        },
        test: ['HashMap imported correctly'],
        what_you_learned: `Specific collections must be imported from the collections module.`,
      },
      {
        step: 10,
        title: 'Initializing a Map',
        instruction: `In \`main\`, create a new mutable \`HashMap\` called \`contacts\` where keys are \`String\` (names) and values are \`Contact\` structs.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let mut contacts', 'HashMap::new()'],
              allRequired: true,
              hints: ['Example: let mut contacts: HashMap<String, Contact> = HashMap::new();'],
            },
          ],
          message: 'Initialize a hash map',
        },
        test: ['contacts map created'],
        what_you_learned: `HashMaps store key-value pairs and provide logarithmic or near-constant time lookups.`,
      },
      {
        step: 11,
        title: 'Inserting Data',
        instruction: `Use \`.insert(key, value)\` to add a contact. Note that the key must be an owned \`String\`.
        
        Example: \`contacts.insert(String::from("Alice"), Contact { ... });\``,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['contacts.insert(', 'String::from('],
              allRequired: true,
              hints: ['The map takes ownership of both the key and the value.'],
            },
          ],
          message: 'Add data to the map',
        },
        test: ['One contact inserted into the map'],
        what_you_learned: `insert() adds a pair. If the key already exists, the old value is replaced.`,
      },
      {
        step: 12,
        title: 'Retrieving Data',
        instruction: `Use \`.get("Name")\` to look up a contact. This returns an \`Option<&Contact>\`. Store the result in \`found_contact\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let found_contact = contacts.get('],
              allRequired: true,
              hints: ['get() takes a reference to the key, e.g., "Alice"'],
            },
          ],
          message: 'Look up a value by key',
        },
        test: ['found_contact contains the lookup result'],
        what_you_learned: `Map lookups return Options because the key might not exist.`,
      },
      {
        step: 13,
        title: 'Handling the Result',
        instruction: `Use \`match\` on \`found_contact\`. If \`Some(c)\`, print the phone number. If \`None\`, print "Contact not found". Run \`cargo run\` to see the lookup result.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['match found_contact', 'Some(c) =>', 'None =>'],
              allRequired: true,
              hints: ['Standard Option handling pattern'],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Verify the lookup behavior in the terminal'],
            },
          ],
          message: 'Respond to lookup results and verify',
        },
        test: ['Lookup success and failure are handled', 'Program was run'],
        what_you_learned: `Always handle the None case to prevent program crashes on missing keys. Verification with cargo run ensures your match paths are correct.`,
      },
      {
        step: 14,
        title: 'The Entry API',
        instruction: `The \`.entry()\` API is a powerful way to check and modify in one go. Use \`contacts.entry(name).or_insert(new_contact);\` to add a contact ONLY if it doesn't exist.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['.entry(', '.or_insert('],
              allRequired: true,
              hints: ['Example: contacts.entry(String::from("Bob")).or_insert(c);'],
            },
          ],
          message: 'Use the entry API for conditional logic',
        },
        test: ['Entry API used for safe insertion'],
        what_you_learned: `The entry API prevents multiple lookups, making conditional updates more efficient.`,
      },
      {
        step: 15,
        title: 'Updating Values',
        instruction: `To update, simply \`insert\` again with the same key. The old value will be returned by the \`insert\` method.
        
        Update Alice's phone number and print the "Old" number that was returned.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['let old_value = contacts.insert('],
              allRequired: true,
              hints: ['insert() returns Option<V> of the previous value'],
            },
          ],
          message: 'Update an existing entry',
        },
        test: ['Value updated and previous value captured'],
        what_you_learned: `insert() acts as both "add" and "upsert" (update if exists).`,
      },
      {
        step: 16,
        title: 'Removing Data',
        instruction: `Use \`.remove("Name")\` to delete a contact. This also returns the removed value as an \`Option\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['contacts.remove('],
              allRequired: true,
              hints: ['Provide the key to remove from the map'],
            },
          ],
          message: 'Delete an entry from the map',
        },
        test: ['Contact removed from the mapping'],
        what_you_learned: `remove() completely deletes the key and its associated value from the map.`,
      },
      {
        step: 17,
        title: 'Iterating over Maps',
        instruction: `Iterating over a HashMap gives you both the \`(key, value)\`. Use a \`for\` loop to print all contacts in the format: "Name: Phone". Run \`cargo run\` to see the results.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['for (name, contact) in &contacts'],
              allRequired: true,
              hints: ['Note the parentheses for destructuring the (K, V) tuple'],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['See all contacts in the unsorted map'],
            },
          ],
          message: 'Iterate over key-value pairs and verify',
        },
        test: ['All contacts printed in the requested format', 'Program was run'],
        what_you_learned: `HashMaps are unordered; iteration will give results in a seemingly random sequence. Always verify your iteration logic with a test run.`,
      },
      {
        step: 18,
        title: 'Iterating over Values Only',
        instruction: `Sometimes you only need the values. Use \`contacts.values()\` in a loop to print just the contact names.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['.values()'],
              allRequired: true,
              hints: ['Example: for contact in contacts.values() { ... }'],
            },
          ],
          message: 'Access values directly',
        },
        test: ['Loop iterates only over the values'],
        what_you_learned: `Direct value iteration is more efficient if you don't need the keys.`,
      },
      {
        step: 19,
        title: 'Map Size',
        instruction: `Use the \`.len()\` method to print how many contacts are currently in the system.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['contacts.len()'],
              allRequired: true,
              hints: ['Works the same for Vec and HashMap'],
            },
          ],
          message: 'Check collection size',
        },
        test: ['Correct count of contacts is displayed'],
        what_you_learned: `len() gives you the current number of elements (key-value pairs) in the map.`,
      },
      {
        step: 20,
        title: 'Capacity and Reallocation',
        instruction: `Collections grow automatically, but this can be slow. Comment: Explain why you might use \`HashMap::with_capacity(count)\`.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['capacity'],
              allRequired: false,
              hints: ['Informational step'],
            },
          ],
          message: 'Acknowledge performance tuning with capacity',
        },
        test: ['Understanding of capacity confirmed'],
        what_you_learned: `Pre-allocating space prevents expensive memory reallocations as the collection grows.`,
      },
      {
        step: 21,
        title: 'Clearing the Map',
        instruction: `Use \`.clear()\` to remove every contact at once.`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['contacts.clear()'],
              allRequired: true,
              hints: ['This makes the map empty but keeps its capacity'],
            },
          ],
          message: 'Clear all data from the collection',
        },
        test: ['Contacts map is empty after clearing'],
        what_you_learned: `clear() is an efficient way to reset a collection without deallocating the memory.`,
      },
      {
        step: 22,
        title: 'Final Completion',
        instruction: `Add a final \`println!("System Shutdown")\` at the end of \`main\`. Then run \`cargo run\` for the final whole-project verification!`,
        validation: {
          rules: [
            {
              type: 'code_contains',
              patterns: ['System Shutdown'],
              allRequired: true,
              hints: ['The final piece of the logic'],
            },
            {
              type: 'terminal_command',
              command: 'cargo run',
              hints: ['Perform the final verification run'],
            },
          ],
          message: 'Finalize the program structure and verify',
        },
        test: ['Program execution ends with final message', 'Final project run successful'],
        what_you_learned: `You've mastered the primary collections of Rust for managing complex data sets! Regular testing with cargo run is the best way to ensure quality.`,
      },
    ],
    completion_message: `🎉 Success! You've mastered Vec and HashMap. You now know how to store data, perform efficient lookups, handle edge cases with Options, and manage data lifecycle using CRUD operations.`,
    extensions: `**Challenge yourself:**
- Add a category field (Work, Family) to Contact and group them
- Implement a search by phone number (requires iterating or a second map)
- Save the contact list to a file and load it on startup
- Use the 'Index' trait to access contacts (advanced!)`,
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


