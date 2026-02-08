# Troubleshooting Guide

Common issues, debugging patterns, and lessons learned from past investigations.

## Terminal Command Validation Issues

### Issue: Terminal commands not passing validation after execution

**Symptoms:**
- User runs a terminal command (e.g., `cargo new calculator`)
- Command executes successfully and is saved to localStorage
- Validation still shows as incomplete

**Root Cause:**
When `reloadProgress()` was called, it updated `progress` state but didn't reload `terminalCommands` state. Validation runs with stale terminal commands state.

**Solution (Implemented):**
The `reloadProgress()` function in `ChallengeView.tsx` now explicitly reloads terminal commands:

```typescript
// Also reload terminal commands for current step when progress changes
// This ensures terminalCommands state stays in sync with progress
if (isPracticeProject(challenge) && challenge.steps[currentStep]) {
  const stepNum = challenge.steps[currentStep]?.step;
  if (stepNum) {
    const savedCommands = getTerminalCommandsForStep(challenge.id, stepNum);
    setTerminalCommands(savedCommands);
    prevTerminalCommandsRef.current = [...savedCommands];
  }
}
```

**Key Pattern:**
When reloading progress state, also reload any dependent state (like terminal commands) to keep them in sync.

## Validation Regex Patterns

### Common Mistakes

1. **Function signatures with flexible spacing**
   - ❌ Using `code_contains` with exact strings: `'fn add(a: f64, b: f64)'`
   - ✅ Using `code_matches` with regex: `'fn\\s+add\\s*\\(\\s*a\\s*:\\s*f64\\s*,\\s*b\\s*:\\s*f64\\s*\\)'`
   - Rust allows `a: f64` or `a:f64` - regex must handle both

2. **Format strings**
   - ❌ `\{:\\.{2}\}` (interprets `{2}` as quantifier)
   - ✅ `\{:\\.2\}` (literal `.2`)

3. **Nested braces**
   - ❌ `[^}]*` (stops at first `}`)
   - ✅ `[\\s\\S]*?` (non-greedy, matches any character including newlines)

4. **Match arms**
   - Match arms don't need semicolons (they end with commas)
   - Skip semicolon checks for lines containing `=>`

## State Management Patterns

### Don't Call reloadProgress() Inside setState Callbacks

**Problem:**
React state updates are async. Calling `reloadProgress()` inside a `setTerminalCommands` callback can cause race conditions.

**Solution:**
Call `reloadProgress()` outside the setState callback, or use functional updates:

```typescript
// ✅ GOOD
setTerminalCommands((prev) => [...prev, command]);
// Then reload progress separately
reloadProgress();

// ❌ BAD
setTerminalCommands((prev) => {
  const next = [...prev, command];
  reloadProgress(); // Don't do this!
  return next;
});
```

## Debugging Validation Issues

### Checklist

1. **Check state synchronization**
   - Is `terminalCommands` state in sync with `progress.challengeProgress[id].terminalCommands`?
   - Are terminal commands reloaded when progress changes?

2. **Verify step numbers**
   - Step numbers must be unique within a challenge
   - Check that `currentStep` index matches `step.step` number

3. **Check validation dependencies**
   - Does validation useEffect depend on the right state?
   - Are refs initialized correctly?

4. **Multiple validation runs**
   - Validation might run multiple times (on state change, on progress change)
   - Check which run is failing and why

5. **Regex patterns**
   - Test regex patterns with various spacing/formatting
   - Use regex testers to verify patterns match expected cases

## Files to Check When Debugging

1. `src/components/ChallengeView.tsx` - Main component with state management
2. `src/lib/progress.ts` - Progress loading/saving logic
3. `src/lib/data-driven-validator.ts` - Validation logic
4. `src/lib/step-validator.ts` - Step validation entry point
