---
id: project-002
title: Learn Functions by Building a Calculator
section: 1
type: practice
estimated_time: 60
difficulty: beginner
concepts_taught:
  - functions
  - parameters
  - return_types
  - match
  - arithmetic
prerequisites:
  - Completed: Learn Variables by Building a Temperature Converter
  - Understanding of basic types and variables
completion_message: |
  🎉 Congratulations! You've built a calculator!
  
  You've learned:
  ✓ How to define functions
  ✓ Function parameters and return types
  ✓ Pattern matching with match
  ✓ Organizing code into reusable functions
extensions: |
  - Add support for more operations (power, modulo)
  - Add a history feature
  - Support floating-point division
---

# Project Overview

In this project, you'll build a command-line calculator that performs basic arithmetic operations. You'll learn about functions, parameters, return types, and pattern matching.

## Why This Project?

Functions are the building blocks of Rust programs. By building a calculator, you'll understand how to organize code into reusable functions and handle different operations using pattern matching.

---

## Step 1: Create the project

Create a new Rust project called `calculator` using Cargo.

```bash
cargo new calculator
cd calculator
```

**What You Learned:** You've created a new Rust project for your calculator.

---

## Step 2: Define an add function

Create a function called `add` that takes two `i32` parameters and returns their sum.

```rust
fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

### Explanation: Functions in Rust

Functions are defined with the `fn` keyword. They can take parameters and return values.

**Function Syntax:**
- `fn function_name(param1: Type1, param2: Type2) -> ReturnType { ... }`
- Parameters are typed
- Return type is specified after `->`
- Last expression is returned (no `return` keyword needed)

**What You Learned:** You learned how to define functions with parameters and return types.

---

## Step 3: Test your add function

Call your `add` function in `main` and print the result.

```rust
fn main() {
    let result = add(5, 3);
    println!("5 + 3 = {}", result);
}
```

**What You Learned:** You learned how to call functions and use their return values.

---

## Step 4: Add subtract, multiply, and divide functions

Create three more functions: `subtract`, `multiply`, and `divide`.

```rust
fn subtract(a: i32, b: i32) -> i32 {
    a - b
}

fn multiply(a: i32, b: i32) -> i32 {
    a * b
}

fn divide(a: i32, b: i32) -> i32 {
    a / b
}
```

**What You Learned:** You learned how to define multiple functions with the same signature pattern.

---

## Step 5: Create a calculate function with match

Create a `calculate` function that takes an operation string and two numbers, then uses `match` to call the appropriate function.

```rust
fn calculate(op: &str, a: i32, b: i32) -> i32 {
    match op {
        "add" => add(a, b),
        "subtract" => subtract(a, b),
        "multiply" => multiply(a, b),
        "divide" => divide(a, b),
        _ => {
            println!("Unknown operation: {}", op);
            0
        }
    }
}
```

### Explanation: Pattern Matching with match

The `match` expression is Rust's powerful pattern matching tool. It's like a switch statement but more powerful.

**Match Syntax:**
- Each arm has a pattern and code to execute
- Patterns are checked in order
- `_` is the catch-all pattern (like `default` in switch)

**What You Learned:** You learned about pattern matching with `match` and how to handle multiple cases.

---

## Step 6: Get command-line arguments

Get the operation and two numbers from command-line arguments.

```rust
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();
    
    if args.len() < 4 {
        println!("Usage: calculator <operation> <num1> <num2>");
        return;
    }
    
    let op = &args[1];
    let num1: i32 = args[2].parse().expect("Invalid number");
    let num2: i32 = args[3].parse().expect("Invalid number");
}
```

**What You Learned:** You learned how to parse command-line arguments and handle errors.

---

## Step 7: Call calculate and print result

Use your `calculate` function and print the result.

```rust
    let result = calculate(op, num1, num2);
    println!("{} {} {} = {}", num1, op, num2, result);
```

**What You Learned:** You learned how to combine functions to build a complete program.

---

## Step 8: Handle division by zero

Add a check in the `divide` function to handle division by zero.

```rust
fn divide(a: i32, b: i32) -> Option<i32> {
    if b == 0 {
        None
    } else {
        Some(a / b)
    }
}
```

### Explanation: Option Type

`Option<T>` represents a value that might not exist. It has two variants:
- `Some(value)` - value exists
- `None` - no value

**What You Learned:** You learned about the `Option` type for handling values that might not exist.

---

## Step 9: Update calculate to handle Option

Update your `calculate` function to handle the `Option` returned by `divide`.

```rust
fn calculate(op: &str, a: i32, b: i32) -> Option<i32> {
    match op {
        "add" => Some(add(a, b)),
        "subtract" => Some(subtract(a, b)),
        "multiply" => Some(multiply(a, b)),
        "divide" => divide(a, b),
        _ => {
            println!("Unknown operation: {}", op);
            None
        }
    }
}
```

**What You Learned:** You learned how to work with `Option` types in functions.

---

## Step 10: Handle Option in main

Update `main` to handle the `Option` returned by `calculate`.

```rust
    match calculate(op, num1, num2) {
        Some(result) => println!("{} {} {} = {}", num1, op, num2, result),
        None => println!("Error: Invalid operation or division by zero"),
    }
```

**What You Learned:** You learned how to handle `Option` values using pattern matching.
