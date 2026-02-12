import { PracticeProject } from '@/types/challenge';

export const challenge_project_004: PracticeProject = {
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
        id: 'step-1',
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
        id: 'step-2',
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
        id: 'step-3',
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
        id: 'step-4',
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
        id: 'step-5',
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
        id: 'step-6',
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
        id: 'step-7',
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
        id: 'step-8',
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
        id: 'step-9',
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
        id: 'step-10',
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
        id: 'step-11',
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
        id: 'step-12',
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
        id: 'step-13',
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
        id: 'step-14',
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
        id: 'step-15',
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
        id: 'step-16',
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
        id: 'step-17',
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
        id: 'step-18',
        step: 18,
        title: 'Compute and print the average grade',
        instruction: `To compute an average, you add up all grades and divide by how many students you have.\n\nOne detail to watch in Rust: \`students.len()\` is a \`usize\` (an integer). To divide an \`f64\` total by it, cast the length to \`f64\` with \`as f64\`.\n\nExample pattern:\n\n\`\`\`rust\nlet average = total / items.len() as f64;\n\`\`\``,
        task: `After the loop, compute the average grade and print it using this label:\n\n\`\`\`text\nAverage grade:\n\`\`\``,
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
        id: 'step-19',
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
  };

