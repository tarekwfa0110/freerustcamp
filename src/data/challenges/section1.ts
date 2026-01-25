import { Challenge } from '@/types/challenge';

export const section1Challenges: Challenge[] = [
  {
    id: 'challenge-001',
    title: 'Understanding Mutability',
    section: 1,
    subsection: 'Syntax Basics',
    estimated_time: 5,
    difficulty: 'beginner',
    concepts: ['mutability', 'variables'],
    explanation: `In Rust, variables are immutable by default. To change a variable's value, you must declare it with 'mut'.`,
    task: `Make the variable 'count' mutable so the code compiles and runs correctly.`,
    starter_code: `fn main() {
    let count = 0;
    count = count + 1;  // This won't compile!
    println!("Count: {}", count);
}`,
    tests: [
      {
        name: 'code_compiles',
        type: 'compilation',
        description: 'Code must compile without errors',
      },
      {
        name: 'variable_is_mutable',
        type: 'code_quality',
        description: "Variable 'count' must be declared with 'mut'",
        check: "contains 'mut count'",
      },
      {
        name: 'output_correct',
        type: 'functional',
        description: "Output must be 'Count: 1'",
        expectedOutput: 'Count: 1',
      },
    ],
    hints: [
      {
        text: 'Variables in Rust are immutable by default',
        order: 1,
      },
      {
        text: "Add 'mut' keyword after 'let'",
        order: 2,
      },
      {
        text: "The syntax is: let mut variable_name = value;",
        order: 3,
      },
    ],
    solution: `fn main() {
    let mut count = 0;
    count = count + 1;
    println!("Count: {}", count);
}`,
  },
  {
    id: 'challenge-002',
    title: 'Basic Function Syntax',
    section: 1,
    subsection: 'Syntax Basics',
    estimated_time: 5,
    difficulty: 'beginner',
    concepts: ['functions', 'return_types'],
    explanation: `Functions in Rust use the 'fn' keyword. The return type is specified after an arrow (->). If no return type is specified, the function returns unit type '()'.`,
    task: `Complete the function 'add' to return the sum of two numbers.`,
    starter_code: `fn add(a: i32, b: i32) -> i32 {
    // Your code here
    0
}

fn main() {
    let result = add(5, 3);
    println!("5 + 3 = {}", result);
}`,
    tests: [
      {
        name: 'code_compiles',
        type: 'compilation',
        description: 'Code must compile without errors',
      },
      {
        name: 'function_returns_sum',
        type: 'functional',
        description: 'Function should return the sum of a and b',
        expectedOutput: '5 + 3 = 8',
      },
      {
        name: 'works_with_other_values',
        type: 'functional',
        description: 'Function should work with different values',
        command: 'cargo run --quiet',
        expectedOutput: '5 + 3 = 8',
      },
    ],
    hints: [
      {
        text: 'Use the + operator to add two numbers',
        order: 1,
      },
      {
        text: 'Return the result directly, no semicolon needed',
        order: 2,
      },
    ],
    solution: `fn add(a: i32, b: i32) -> i32 {
    a + b
}

fn main() {
    let result = add(5, 3);
    println!("5 + 3 = {}", result);
}`,
  },
  {
    id: 'challenge-003',
    title: 'Ownership: Move Semantics',
    section: 1,
    subsection: 'Ownership Fundamentals',
    estimated_time: 8,
    difficulty: 'beginner',
    concepts: ['ownership', 'move_semantics'],
    explanation: `In Rust, when you assign a value to another variable, ownership is moved. After a move, the original variable can no longer be used.`,
    task: `Fix the code so that 'name' is moved to 'greeting' and the code compiles.`,
    starter_code: `fn main() {
    let name = String::from("Rust");
    let greeting = name;
    println!("Hello, {}!", name);  // This won't compile!
}`,
    tests: [
      {
        name: 'code_compiles',
        type: 'compilation',
        description: 'Code must compile without errors',
      },
      {
        name: 'uses_greeting',
        type: 'code_quality',
        description: 'Should use the moved variable',
        check: "contains 'greeting'",
      },
      {
        name: 'output_correct',
        type: 'functional',
        description: "Output must be 'Hello, Rust!'",
        expectedOutput: 'Hello, Rust!',
      },
    ],
    hints: [
      {
        text: 'After moving, the original variable cannot be used',
        order: 1,
      },
      {
        text: 'Use the variable that now owns the value',
        order: 2,
      },
    ],
    solution: `fn main() {
    let name = String::from("Rust");
    let greeting = name;
    println!("Hello, {}!", greeting);
}`,
  },
  {
    id: 'challenge-004',
    title: 'Control Flow: If Expressions',
    section: 1,
    subsection: 'Syntax Basics',
    estimated_time: 5,
    difficulty: 'beginner',
    concepts: ['control_flow', 'if_expressions'],
    explanation: `Rust's if expressions work like expressions in other languages, but they can return values. The condition must be a bool type.`,
    task: `Complete the function to return "positive" if the number is greater than 0, "negative" if less than 0, and "zero" if equal to 0.`,
    starter_code: `fn classify_number(n: i32) -> &'static str {
    // Your code here
    ""
}

fn main() {
    println!("{}", classify_number(5));
    println!("{}", classify_number(-3));
    println!("{}", classify_number(0));
}`,
    tests: [
      {
        name: 'code_compiles',
        type: 'compilation',
        description: 'Code must compile without errors',
      },
      {
        name: 'positive_number',
        type: 'functional',
        description: 'Should return "positive" for positive numbers',
        expectedOutput: 'positive',
      },
      {
        name: 'negative_number',
        type: 'functional',
        description: 'Should return "negative" for negative numbers',
      },
      {
        name: 'zero',
        type: 'functional',
        description: 'Should return "zero" for zero',
      },
    ],
    hints: [
      {
        text: 'Use if-else if-else chain',
        order: 1,
      },
      {
        text: 'Remember: if is an expression, so you can return its value directly',
        order: 2,
      },
    ],
    solution: `fn classify_number(n: i32) -> &'static str {
    if n > 0 {
        "positive"
    } else if n < 0 {
        "negative"
    } else {
        "zero"
    }
}

fn main() {
    println!("{}", classify_number(5));
    println!("{}", classify_number(-3));
    println!("{}", classify_number(0));
}`,
  },
  {
    id: 'challenge-005',
    title: 'Pattern Matching with Match',
    section: 1,
    subsection: 'Syntax Basics',
    estimated_time: 6,
    difficulty: 'beginner',
    concepts: ['pattern_matching', 'match_expressions'],
    explanation: `The match expression is Rust's most powerful control flow construct. It allows you to compare a value against a series of patterns and execute code based on which pattern matches.`,
    task: `Use a match expression to return the day name for numbers 1-7 (1 = Monday, 7 = Sunday). Return "invalid" for any other number.`,
    starter_code: `fn day_name(day: u32) -> &'static str {
    // Your code here
    ""
}

fn main() {
    println!("{}", day_name(1));
    println!("{}", day_name(5));
    println!("{}", day_name(10));
}`,
    tests: [
      {
        name: 'code_compiles',
        type: 'compilation',
        description: 'Code must compile without errors',
      },
      {
        name: 'monday',
        type: 'functional',
        description: 'Should return "Monday" for 1',
      },
      {
        name: 'friday',
        type: 'functional',
        description: 'Should return "Friday" for 5',
      },
      {
        name: 'invalid',
        type: 'functional',
        description: 'Should return "invalid" for numbers outside 1-7',
      },
    ],
    hints: [
      {
        text: 'Use match with number patterns: 1 => "Monday", 2 => "Tuesday", etc.',
        order: 1,
      },
      {
        text: 'Use _ as the catch-all pattern for invalid numbers',
        order: 2,
      },
    ],
    solution: `fn day_name(day: u32) -> &'static str {
    match day {
        1 => "Monday",
        2 => "Tuesday",
        3 => "Wednesday",
        4 => "Thursday",
        5 => "Friday",
        6 => "Saturday",
        7 => "Sunday",
        _ => "invalid",
    }
}

fn main() {
    println!("{}", day_name(1));
    println!("{}", day_name(5));
    println!("{}", day_name(10));
}`,
  },
  {
    id: 'challenge-006',
    title: 'Working with Vectors',
    section: 1,
    subsection: 'Collections & Iterators',
    estimated_time: 7,
    difficulty: 'beginner',
    concepts: ['vectors', 'collections'],
    explanation: `Vec<T> is Rust's growable array type. You can create vectors, push elements, and iterate over them.`,
    task: `Complete the function to calculate the sum of all numbers in a vector.`,
    starter_code: `fn sum_numbers(numbers: Vec<i32>) -> i32 {
    // Your code here
    0
}

fn main() {
    let nums = vec![1, 2, 3, 4, 5];
    println!("Sum: {}", sum_numbers(nums));
}`,
    tests: [
      {
        name: 'code_compiles',
        type: 'compilation',
        description: 'Code must compile without errors',
      },
      {
        name: 'sums_correctly',
        type: 'functional',
        description: 'Should return the sum of all numbers',
        expectedOutput: 'Sum: 15',
      },
      {
        name: 'handles_empty',
        type: 'functional',
        description: 'Should return 0 for empty vector',
      },
    ],
    hints: [
      {
        text: 'You can iterate over a vector with a for loop',
        order: 1,
      },
      {
        text: 'Or use the .iter() method with .sum()',
        order: 2,
      },
    ],
    solution: `fn sum_numbers(numbers: Vec<i32>) -> i32 {
    let mut sum = 0;
    for num in numbers {
        sum += num;
    }
    sum
}

fn main() {
    let nums = vec![1, 2, 3, 4, 5];
    println!("Sum: {}", sum_numbers(nums));
}`,
  },
  {
    id: 'challenge-007',
    title: 'Using Option Type',
    section: 1,
    subsection: 'Error Handling',
    estimated_time: 8,
    difficulty: 'beginner',
    concepts: ['option', 'error_handling'],
    explanation: `Option<T> represents an optional value: either Some(value) or None. It's Rust's way of handling values that might not exist.`,
    task: `Complete the function to find the first even number in a vector. Return None if no even number exists.`,
    starter_code: `fn find_first_even(numbers: Vec<i32>) -> Option<i32> {
    // Your code here
    None
}

fn main() {
    match find_first_even(vec![1, 3, 4, 5, 6]) {
        Some(n) => println!("Found: {}", n),
        None => println!("No even number found"),
    }
}`,
    tests: [
      {
        name: 'code_compiles',
        type: 'compilation',
        description: 'Code must compile without errors',
      },
      {
        name: 'finds_even',
        type: 'functional',
        description: 'Should return Some(4) for vec![1, 3, 4, 5, 6]',
        expectedOutput: 'Found: 4',
      },
      {
        name: 'returns_none',
        type: 'functional',
        description: 'Should return None if no even numbers exist',
      },
    ],
    hints: [
      {
        text: 'Iterate through the vector and check if each number is even (n % 2 == 0)',
        order: 1,
      },
      {
        text: 'Return Some(value) when found, None when the loop completes without finding',
        order: 2,
      },
    ],
    solution: `fn find_first_even(numbers: Vec<i32>) -> Option<i32> {
    for num in numbers {
        if num % 2 == 0 {
            return Some(num);
        }
    }
    None
}

fn main() {
    match find_first_even(vec![1, 3, 4, 5, 6]) {
        Some(n) => println!("Found: {}", n),
        None => println!("No even number found"),
    }
}`,
  },
  {
    id: 'challenge-008',
    title: 'Immutable References',
    section: 1,
    subsection: 'Borrowing & References',
    estimated_time: 8,
    difficulty: 'beginner',
    concepts: ['borrowing', 'references'],
    explanation: `References allow you to refer to a value without taking ownership. Immutable references (&T) allow reading but not modifying.`,
    task: `Fix the function to use a reference instead of taking ownership, so the code compiles.`,
    starter_code: `fn print_length(s: String) {
    println!("Length: {}", s.len());
}

fn main() {
    let text = String::from("Hello, Rust!");
    print_length(text);
    println!("Text: {}", text);  // This won't compile!
}`,
    tests: [
      {
        name: 'code_compiles',
        type: 'compilation',
        description: 'Code must compile without errors',
      },
      {
        name: 'uses_reference',
        type: 'code_quality',
        description: 'Function parameter should be a reference',
        check: "contains '&String'",
      },
      {
        name: 'output_correct',
        type: 'functional',
        description: 'Should print both length and text',
      },
    ],
    hints: [
      {
        text: 'Change the parameter type from String to &String',
        order: 1,
      },
      {
        text: 'Pass a reference when calling: &text instead of text',
        order: 2,
      },
    ],
    solution: `fn print_length(s: &String) {
    println!("Length: {}", s.len());
}

fn main() {
    let text = String::from("Hello, Rust!");
    print_length(&text);
    println!("Text: {}", text);
}`,
  },
  {
    id: 'challenge-009',
    title: 'Mutable References',
    section: 1,
    subsection: 'Borrowing & References',
    estimated_time: 8,
    difficulty: 'beginner',
    concepts: ['mutable_references', 'borrowing'],
    explanation: `Mutable references (&mut T) allow you to modify a value without taking ownership. You can only have one mutable reference at a time.`,
    task: `Complete the function to add an exclamation mark to the end of a string using a mutable reference.`,
    starter_code: `fn add_exclamation(s: &mut String) {
    // Your code here
}

fn main() {
    let mut text = String::from("Hello");
    add_exclamation(&mut text);
    println!("{}", text);
}`,
    tests: [
      {
        name: 'code_compiles',
        type: 'compilation',
        description: 'Code must compile without errors',
      },
      {
        name: 'adds_exclamation',
        type: 'functional',
        description: 'Should add "!" to the string',
        expectedOutput: 'Hello!',
      },
    ],
    hints: [
      {
        text: 'Use the .push_str() method to add to a String',
        order: 1,
      },
      {
        text: 'The parameter should be &mut String',
        order: 2,
      },
    ],
    solution: `fn add_exclamation(s: &mut String) {
    s.push_str("!");
}

fn main() {
    let mut text = String::from("Hello");
    add_exclamation(&mut text);
    println!("{}", text);
}`,
  },
  {
    id: 'challenge-010',
    title: 'Using Result Type',
    section: 1,
    subsection: 'Error Handling',
    estimated_time: 8,
    difficulty: 'beginner',
    concepts: ['result', 'error_handling'],
    explanation: `Result<T, E> is used for operations that can fail. It's either Ok(value) for success or Err(error) for failure.`,
    task: `Complete the function to divide two numbers. Return an error if dividing by zero.`,
    starter_code: `fn divide(a: f64, b: f64) -> Result<f64, String> {
    // Your code here
    Ok(0.0)
}

fn main() {
    match divide(10.0, 2.0) {
        Ok(result) => println!("Result: {}", result),
        Err(e) => println!("Error: {}", e),
    }
}`,
    tests: [
      {
        name: 'code_compiles',
        type: 'compilation',
        description: 'Code must compile without errors',
      },
      {
        name: 'divides_correctly',
        type: 'functional',
        description: 'Should return Ok(5.0) for 10.0 / 2.0',
        expectedOutput: 'Result: 5',
      },
      {
        name: 'handles_zero',
        type: 'functional',
        description: 'Should return Err for division by zero',
      },
    ],
    hints: [
      {
        text: 'Check if b == 0.0, return Err if true',
        order: 1,
      },
      {
        text: 'Otherwise return Ok(a / b)',
        order: 2,
      },
    ],
    solution: `fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("Cannot divide by zero"))
    } else {
        Ok(a / b)
    }
}

fn main() {
    match divide(10.0, 2.0) {
        Ok(result) => println!("Result: {}", result),
        Err(e) => println!("Error: {}", e),
    }
}`,
  },
  {
    id: 'challenge-011',
    title: 'Iterator Methods',
    section: 1,
    subsection: 'Collections & Iterators',
    estimated_time: 7,
    difficulty: 'beginner',
    concepts: ['iterators', 'functional_programming'],
    explanation: `Iterators provide a way to process sequences of elements. Methods like map, filter, and collect are powerful tools for data transformation.`,
    task: `Use iterator methods to double all numbers in a vector and collect them into a new vector.`,
    starter_code: `fn double_numbers(numbers: Vec<i32>) -> Vec<i32> {
    // Your code here
    vec![]
}

fn main() {
    let nums = vec![1, 2, 3, 4, 5];
    let doubled = double_numbers(nums);
    println!("{:?}", doubled);
}`,
    tests: [
      {
        name: 'code_compiles',
        type: 'compilation',
        description: 'Code must compile without errors',
      },
      {
        name: 'doubles_correctly',
        type: 'functional',
        description: 'Should return [2, 4, 6, 8, 10] for input [1, 2, 3, 4, 5]',
      },
    ],
    hints: [
      {
        text: 'Use .iter() to create an iterator, .map() to transform, and .collect() to create a Vec',
        order: 1,
      },
      {
        text: 'The pattern is: numbers.iter().map(|n| n * 2).collect()',
        order: 2,
      },
    ],
    solution: `fn double_numbers(numbers: Vec<i32>) -> Vec<i32> {
    numbers.iter().map(|n| n * 2).collect()
}

fn main() {
    let nums = vec![1, 2, 3, 4, 5];
    let doubled = double_numbers(nums);
    println!("{:?}", doubled);
}`,
  },
  {
    id: 'project-001',
    title: 'Hello CLI',
    section: 1,
    type: 'practice',
    estimated_time: 120,
    difficulty: 'beginner',
    concepts: ['cli', 'io', 'arguments'],
    description: `Build a simple command-line program that greets the user. This project introduces you to reading command-line arguments and basic I/O operations.`,
    user_stories: [
      'User can run the program with their name as an argument',
      'Program greets the user by name',
      'Program handles the case when no name is provided',
      'Program displays a helpful message for incorrect usage',
    ],
    milestones: [
      'Set up the main function',
      'Read command-line arguments using std::env::args()',
      'Handle the case when no arguments are provided',
      'Print a personalized greeting',
      'Add error handling for edge cases',
    ],
    starter_code: `fn main() {
    // Your code here
}`,
    tests: [
      {
        name: 'code_compiles',
        type: 'compilation',
        description: 'Code must compile without errors',
      },
      {
        name: 'greets_with_name',
        type: 'functional',
        description: 'Should greet when name is provided',
        command: 'cargo run --quiet -- Alice',
        expectedOutput: 'Hello, Alice!',
      },
      {
        name: 'handles_no_name',
        type: 'functional',
        description: 'Should show usage message when no name provided',
        command: 'cargo run --quiet',
      },
      {
        name: 'handles_multiple_args',
        type: 'functional',
        description: 'Should use first argument as name',
        command: 'cargo run --quiet -- John Doe',
        expectedOutput: 'Hello, John!',
      },
    ],
    hints: [
      {
        text: 'Use std::env::args() to get command-line arguments',
        order: 1,
      },
      {
        text: 'The first argument (index 0) is the program name, the second (index 1) is the first user argument',
        order: 2,
      },
      {
        text: 'Use .collect() to convert the iterator to a Vec<String>',
        order: 3,
      },
      {
        text: 'Check the length of args to see if a name was provided',
        order: 4,
      },
    ],
    reference_solution: `use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();
    
    if args.len() < 2 {
        println!("Usage: {} <name>", args[0]);
        println!("Example: {} Alice", args[0]);
        return;
    }
    
    let name = &args[1];
    println!("Hello, {}!", name);
}`,
  },
];
