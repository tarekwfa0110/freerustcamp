---
id: project-001
title: Learn Variables by Building a Temperature Converter
section: 1
type: practice
estimated_time: 60
difficulty: beginner
concepts_taught:
  - variables
  - mutability
  - basic_types
  - arithmetic
  - command_line_args
prerequisites:
  - Rust toolchain installed (rustc, cargo)
  - Basic understanding of terminal/command line
completion_message: |
  🎉 Congratulations! You've built your first Rust program!
  
  You've learned:
  ✓ How to create a Rust project with Cargo
  ✓ Variables and basic types
  ✓ Command-line arguments
extensions: |
  - Add support for Kelvin
  - Add a --help flag
---

# Project Overview

In this project, you'll build a command-line tool that converts temperatures between Fahrenheit and Celsius. This is your first real Rust project!

## Why This Project?

Temperature conversion is practical and real-world. You'll understand variables, calculations, and command-line interaction.

---

## Step 1: Set up your project

Create a new Rust project called `temp_converter` using Cargo.

```bash
cargo new temp_converter
cd temp_converter
```

This creates a new directory with a basic Rust project structure.

**What You Learned:** You've created a new Rust project. Cargo is Rust's build tool.

---

## Step 2: Print a welcome message

In your `main` function, print a welcome message to the console.

Use the `println!` macro to print text. The `!` indicates this is a macro, not a regular function.

```rust
println!("Temperature Converter");
```

Run your program with `cargo run`.

### Explanation: What is println!?

`println!` is a macro (indicated by the `!`) that prints text to the console and adds a newline. Macros in Rust are more powerful than functions.

**Basic Syntax:**
- `println!("text")` - prints text
- `println!("{}", value)` - prints formatted text with a value

**What You Learned:** You learned about the `println!` macro for displaying output.

---

## Step 3: Get command-line arguments

Get the command-line arguments passed to your program.

Command-line arguments are accessed through `std::env::args()`, which returns an iterator. Collect them into a `Vec<String>` and print each one.

Remember:
- Import: `use std::env;`
- First argument is always the program name
- Use a for loop to iterate

Try running: `cargo run -- 32 F`

### Explanation: Command-Line Arguments

When you run a program from the terminal, you can pass information:

```bash
cargo run -- 32 F
```

Here, "32" and "F" are arguments your program can access.

`std::env::args()` returns an iterator over the arguments. The first item (index 0) is always the program name.

**What You Learned:** You learned how to access command-line arguments using `std::env::args()`.

---

## Step 4: Parse the temperature value

Parse the first argument (the temperature value) into a floating-point number.

Use `parse()` method on the string to convert it to `f64`. Handle the case where parsing might fail.

```rust
let temp_str = &args[1];
let temp: f64 = temp_str.parse().expect("Invalid temperature");
```

### Explanation: Type Conversion

The `parse()` method attempts to convert a string into a number. It returns a `Result` type, which can be either:
- `Ok(value)` - successful conversion
- `Err(error)` - conversion failed

We use `expect()` to handle errors (for now). In production code, you'd handle errors more gracefully.

**What You Learned:** You learned about type conversion using `parse()` and the `Result` type for error handling.

---

## Step 5: Determine the conversion direction

Check the second argument to determine if we're converting from Fahrenheit to Celsius or vice versa.

```rust
let unit = &args[2];
if unit == "F" {
    // Convert F to C
} else if unit == "C" {
    // Convert C to F
}
```

**What You Learned:** You learned about conditional logic using `if` statements.

---

## Step 6: Perform the conversion

Implement the conversion formulas:

- Fahrenheit to Celsius: `C = (F - 32) * 5/9`
- Celsius to Fahrenheit: `F = (C * 9/5) + 32`

Store the result in a variable and print it.

```rust
let converted: f64;
if unit == "F" {
    converted = (temp - 32.0) * 5.0 / 9.0;
    println!("{}°F = {:.2}°C", temp, converted);
} else if unit == "C" {
    converted = (temp * 9.0 / 5.0) + 32.0;
    println!("{}°C = {:.2}°F", temp, converted);
}
```

### Explanation: Arithmetic Operations

Rust supports standard arithmetic operations:
- Addition: `+`
- Subtraction: `-`
- Multiplication: `*`
- Division: `/`

Note: We use `32.0` instead of `32` to ensure floating-point arithmetic.

**What You Learned:** You learned about arithmetic operations and floating-point numbers in Rust.

---

## Step 7: Add error handling

Improve your program by handling invalid inputs gracefully.

Instead of using `expect()`, use pattern matching with `match`:

```rust
let temp: f64 = match temp_str.parse() {
    Ok(num) => num,
    Err(_) => {
        println!("Error: '{}' is not a valid number", temp_str);
        return;
    }
};
```

**What You Learned:** You learned about pattern matching with `match` and proper error handling.

---

## Step 8: Validate the unit

Check that the unit is either "F" or "C", and show an error message if it's not.

```rust
if unit != "F" && unit != "C" {
    println!("Error: Unit must be 'F' or 'C'");
    return;
}
```

**What You Learned:** You learned about logical operators (`&&`) and input validation.

---

## Step 9: Format the output nicely

Improve the output formatting to make it more readable.

```rust
println!("🌡️  Temperature Conversion");
println!("━━━━━━━━━━━━━━━━━━━━━━━━━━");
println!("Input:  {:.1}°{}", temp, unit);
println!("Output: {:.2}°{}", converted, if unit == "F" { "C" } else { "F" });
```

**What You Learned:** You learned about string formatting and conditional expressions.

---

## Step 10: Test your program

Test your program with various inputs:

```bash
cargo run -- 32 F
cargo run -- 0 C
cargo run -- 100 C
cargo run -- 212 F
```

Make sure all conversions are correct!

**What You Learned:** You learned the importance of testing your code with different inputs.
