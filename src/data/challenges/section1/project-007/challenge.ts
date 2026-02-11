import { PracticeProject } from '@/types/challenge';

export const challenge_project_007: PracticeProject = {
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
        id: 'step-1',
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
        id: 'step-2',
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
        id: 'step-3',
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
        id: 'step-4',
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
        id: 'step-5',
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
        id: 'step-6',
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
        id: 'step-7',
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
        id: 'step-8',
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
        id: 'step-9',
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
        id: 'step-10',
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
        id: 'step-11',
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
        id: 'step-12',
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
        id: 'step-13',
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
        id: 'step-14',
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
        id: 'step-15',
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
        id: 'step-16',
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
        id: 'step-17',
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
        id: 'step-18',
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
        id: 'step-19',
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
        id: 'step-20',
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
        id: 'step-21',
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
  };

