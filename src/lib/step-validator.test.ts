/**
 * Tests for step validation (project-001 temperature converter).
 * Ensures correct code passes and wrong code fails with specific messages.
 */

import { describe, test, expect } from 'bun:test';
import { validateStep } from './step-validator';
import { section1Challenges } from '@/data/challenges/section1';

const project001 = section1Challenges.find((c) => c.id === 'project-001');
if (!project001 || project001.type !== 'practice') {
  throw new Error('project-001 not found');
}
const steps = project001.steps;

const GENERIC_FALLBACK_MESSAGE = 'Validation not configured for this step';

describe('step-validator (project-001)', () => {
  test('step 9: correct code with args[2] and unit_str passes', () => {
    const step = steps.find((s) => s.step === 9)!;
    const code = `
use std::env;
fn main() {
    let args: Vec<String> = env::args().collect();
    let temp_str = &args[1];
    let unit_str = &args[2];
    println!("Temperature Converter");
}
`.trim();
    const result = validateStep(step, code, [], 9, 'project-001');
    expect(result.completed).toBe(true);
  });

  test('step 9: code without unit_str fails', () => {
    const step = steps.find((s) => s.step === 9)!;
    const code = `
use std::env;
fn main() {
    let args: Vec<String> = env::args().collect();
    let temp_str = &args[1];
    println!("Temperature Converter");
}
`.trim();
    const result = validateStep(step, code, [], 9, 'project-001');
    expect(result.completed).toBe(false);
    expect(result.message).not.toBe(GENERIC_FALLBACK_MESSAGE);
  });

  test('step 10: correct code with parse, f64, temp passes', () => {
    const step = steps.find((s) => s.step === 10)!;
    const code = `
use std::env;
fn main() {
    let args: Vec<String> = env::args().collect();
    let temp_str = &args[1];
    let unit_str = &args[2];
    let temp: f64 = temp_str.parse().expect("Invalid temperature");
    println!("Temperature Converter");
}
`.trim();
    const result = validateStep(step, code, [], 10, 'project-001');
    expect(result.completed).toBe(true);
  });

  test('step 11: correct code with to_uppercase and unit passes', () => {
    const step = steps.find((s) => s.step === 11)!;
    const code = `
use std::env;
fn main() {
    let args: Vec<String> = env::args().collect();
    let temp_str = &args[1];
    let unit_str = &args[2];
    let temp: f64 = temp_str.parse().expect("Invalid temperature");
    let unit = unit_str.to_uppercase();
    println!("Temperature Converter");
}
`.trim();
    const result = validateStep(step, code, [], 11, 'project-001');
    expect(result.completed).toBe(true);
  });

  test('step 8: correct code with args[1] and temp_str passes (hardcoded branch)', () => {
    const step = steps.find((s) => s.step === 8)!;
    const code = `
use std::env;
fn main() {
    let args: Vec<String> = env::args().collect();
    let temp_str = &args[1];
    println!("Temperature Converter");
}
`.trim();
    const result = validateStep(step, code, [], 8, 'project-001');
    expect(result.completed).toBe(true);
  });
});
