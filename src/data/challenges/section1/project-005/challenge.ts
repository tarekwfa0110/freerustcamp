import { PracticeProject } from '@/types/challenge';

export const challenge_project_005: PracticeProject = {
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
        id: 'step-1',
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
        id: 'step-2',
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
        id: 'step-3',
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
        id: 'step-4',
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
        id: 'step-5',
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
        id: 'step-6',
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
        id: 'step-7',
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
        id: 'step-8',
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
        id: 'step-9',
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
        id: 'step-10',
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
        id: 'step-11',
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
        id: 'step-12',
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
        id: 'step-13',
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
        id: 'step-14',
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
        id: 'step-15',
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
  };

