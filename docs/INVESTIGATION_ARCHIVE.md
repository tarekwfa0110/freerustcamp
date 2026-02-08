# Investigation Report: Terminal Command Validation Not Passing

## Issue Summary
Step 1 of Project 2 requires running `cargo new calculator`, but validation doesn't pass even though the command is executed and saved.

## Flow Analysis

### 1. Command Execution Flow
```
Terminal Component (executeCommand)
  → onCommandExecuted(trimmedCommand)
  → ChallengeView.handleTerminalCommand(command)
  → addTerminalCommand(challengeId, stepNumber, command) [saves to localStorage]
  → setTerminalCommands((prev) => [...prev, command]) [updates state]
  → requestAnimationFrame(() => reloadProgress()) [reloads progress state]
```

### 2. Validation Flow
```
useEffect([code, terminalCommands, currentStep, challenge, progress.challengeProgress])
  → detect terminalCommandsChanged (via prevTerminalCommandsRef comparison)
  → performValidation()
  → validateStep(step, code, terminalCommands, step.step, challenge.id)
  → validateStepWithConfig() [data-driven validation]
  → validateRule() [checks terminal_command rule]
```

## Identified Issues

### Issue 1: Race Condition with reloadProgress()
**Location:** `handleTerminalCommand` line 705-707
**Problem:** 
- `reloadProgress()` is called via `requestAnimationFrame` after state update
- `reloadProgress()` updates `progress` state, which triggers the validation useEffect
- But `reloadProgress()` doesn't reload `terminalCommands` state - it only reloads `progress` state
- The validation useEffect depends on `progress.challengeProgress`, so it runs, but `terminalCommands` state might not be in sync

**Evidence:**
- `reloadProgress()` only calls `setProgress(loadProgress())`
- It doesn't reload `terminalCommands` state from progress
- Terminal commands are only loaded in specific useEffects (challenge change, step change)

### Issue 2: Terminal Commands State Not Reloaded After reloadProgress()
**Location:** Multiple places where `reloadProgress()` is called
**Problem:**
- When `reloadProgress()` is called, it updates `progress` state
- But `terminalCommands` state is NOT automatically reloaded
- Terminal commands are only loaded in:
  1. Challenge change useEffect (line 293-300)
  2. Step change useEffect (line 347-351)
  3. Reset handler (line 503-506)
- After `handleTerminalCommand` calls `reloadProgress()`, the `terminalCommands` state might be stale

### Issue 3: Validation Uses State, Not Progress
**Location:** `performValidation` line 536
**Problem:**
- Validation uses `terminalCommands` state: `const stepCommands = terminalCommands;`
- But `terminalCommands` state might not be updated when `reloadProgress()` runs
- The command is saved to localStorage via `addTerminalCommand`, but state might not reflect it

### Issue 4: Step Number Mismatch Potential
**Location:** `handleTerminalCommand` line 693 vs validation line 537
**Problem:**
- `handleTerminalCommand` uses: `challenge.steps[currentStep].step` (step number from step object)
- Validation uses: `step.step` (step number from step object)
- These should match, but if `currentStep` index doesn't match the step number, there could be issues
- For Project 2 Step 1: `currentStep` index is 1, step.step is 1 - should match

### Issue 5: Ref Comparison Timing
**Location:** Validation useEffect line 564-570
**Problem:**
- `prevTerminalCommandsRef` is updated AFTER detecting the change
- But the comparison happens BEFORE the ref is updated
- This should work, but if the ref isn't initialized correctly, the comparison might fail
- Ref is initialized in challenge change useEffect (line 296, 299), but might not be initialized on first render

### Issue 6: Multiple Validation Runs
**Location:** Validation useEffect
**Problem:**
- When `terminalCommands` changes, validation runs immediately
- But `reloadProgress()` also triggers the useEffect (via `progress.challengeProgress` dependency)
- This could cause validation to run twice, and the second run might use stale `terminalCommands` state

### Issue 7: State Update Closure Issue
**Location:** `handleTerminalCommand` line 702
**Problem:**
- `setTerminalCommands((prev) => [...prev, command])` uses functional update
- But `prev` might be stale if multiple updates happen quickly
- However, this should be fine with functional updates

### Issue 8: Terminal Commands Not Reloaded When Progress Changes
**Location:** Validation useEffect dependencies
**Problem:**
- The useEffect depends on `progress.challengeProgress`
- When `reloadProgress()` updates `progress`, the useEffect runs
- But `terminalCommands` state is NOT reloaded from the new progress
- So validation runs with old `terminalCommands` state but new `progress` state

## Root Cause Hypothesis

**Most Likely:** Issue #8 - When `reloadProgress()` is called, it updates `progress` state, which triggers the validation useEffect. But `terminalCommands` state is NOT reloaded from the new progress, so validation runs with stale terminal commands state.

**Secondary:** Issue #1 - The race condition where `reloadProgress()` is called asynchronously, and by the time it runs, the validation might have already run with the updated `terminalCommands` state, but then `reloadProgress()` triggers another validation run with stale state.

## Verification Steps Needed

1. Add console.log to see what `terminalCommands` state contains when validation runs
2. Add console.log to see what `progress.challengeProgress[challenge.id].terminalCommands` contains
3. Check if `terminalCommands` state is being reloaded after `reloadProgress()` is called
4. Verify step number matching between save and validation
5. Check if validation is running multiple times and which run is failing

## Files to Check

1. `src/components/ChallengeView.tsx` - Main component with state management
2. `src/lib/progress.ts` - Progress loading/saving logic
3. `src/lib/data-driven-validator.ts` - Validation logic
4. `src/lib/step-validator.ts` - Step validation entry point
