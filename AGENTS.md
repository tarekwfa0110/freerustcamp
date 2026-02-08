# FreeRustCamp Agent Instructions

This file provides context and instructions for AI coding agents working on FreeRustCamp. See `docs/` for detailed documentation.

## Setup Commands

- Install dependencies: `bun install`
- Start dev server: `bun run dev` (http://localhost:3000)
- Build: `bun run build`
- Lint: `bun run lint` (0 warnings required)
- Test: `bun test`
- Run executor server: `bun run server` (optional, for real Rust execution)

**CRITICAL: Always use Bun, never npm.** Use `bun install`, `bun add <package>`, `bun run <script>`, `bunx` instead of npm equivalents.

## Project Structure

```
src/
  routes/          # TanStack Router: index, challenges, challenges/$challengeId, progress
  components/      # React components: ChallengeView, CodeEditor, Terminal, StepGrid
  lib/             # Utilities: progress, step-validator, data-driven-validator, markdown-components
  data/challenges/ # Curriculum data (TypeScript): index.ts, section1.ts
  types/           # TypeScript types: challenge.ts, progress.ts, validation.ts
  content/         # Markdown files (future use, not used at runtime)
```

**No `pages/` or top-level `App.tsx`** - app mounts from `main.tsx` with TanStack Router.

## Code Style

- **TypeScript strict mode**
- **No `any` where avoidable**
- **No unused imports/vars in `src`**
- **0 ESLint warnings required**
- **No React Rules of Hooks violations**
- Use TanStack Router only (`Link`, `useNavigate`) - no raw `<a href>` for in-app routes

## Content Authoring Rules (CRITICAL)

### Step Structure

Every step must follow this order:
1. **Explain** - Short explanation (1-3 sentences). Why it matters, how it works.
2. **Example** - Code snippet showing the **pattern** with **different** names/values from the task.
3. **Task** - One clear action. Last paragraph of instruction or the `task` field.

**Rule:** Explanation and example first; exact thing to type/implement last. Don't lead with the solution.

### Granularity Philosophy

**Granular steps are REQUIRED:**
- Break down concepts into small, digestible steps
- Each step should teach ONE concept or require ONE clear action
- Reference Project 1 (Temperature Converter): 23 steps for a 1-hour project
- **Target:** ~20-25 steps for a 1-hour project
- Creating a project, entering the folder, and running it are THREE separate steps, not one

### Code Examples

**Examples must NOT mirror tasks:**
- Use different variable names or values than the task
- Example: `let first_item = &my_vec[0];` when task is "store `args[1]` in `temp_str`"
- Don't give the exact solution in the example
- **Avoid duplicate instructions:** If example would repeat the task (common for terminal commands), skip the example block

### Step Fields

- **instruction** → Instructions panel (left) - Markdown: paragraphs, bold, inline code, code blocks, lists
- **task** → Instructions panel, below instruction - Markdown; specific thing user must do
- **test** → Message box (below editor) - Validation messages; NOT in instruction body
- **what_you_learned** → Message box - Shown when step is complete
- **hints** → Message box - Shown after submit (Ctrl+Enter) when validation fails

**Rule:** Put teaching and task in `instruction` and `task`. Don't put test descriptions or "what you learned" in the instruction body.

### Step Numbers

- **MUST be unique** within each challenge
- Code uses `findIndex(s => s.step === stepNumber)`; duplicates break navigation and validation
- When adding/removing steps, renumber to maintain uniqueness

## Validation Rules

### Data-Driven Validation (Preferred)

**Always prefer `step.validation` rules over hardcoded logic:**
- Define rules in step data: `validation: { rules: [...], message: '...' }`
- Types: `terminal_command`, `code_contains`, `code_matches`, `function_exists`, `struct_exists`
- Each rule has `hints` (string[]) and optional `message`
- If `step.validation` exists, `data-driven-validator.ts` runs it
- Otherwise, `step-validator.ts` uses hardcoded logic (scope by challengeId)

### Function Signature Validation (CRITICAL)

**NEVER use exact string matching for function signatures:**
- Rust allows flexible spacing: `a: f64` or `a:f64` both work
- **Use `code_matches` with regex** instead of `code_contains` for function signatures

**Regex pattern guidelines:**
- Use `\\s*` (zero or more whitespace) around colons and commas for flexible spacing
- Use `\\s+` (one or more whitespace) for required spaces (like after `fn`)
- Escape special regex characters: `\\(`, `\\)`, `\\+`, `\\*`, etc.

**Example:**
```ts
// ❌ BAD - Too strict
{
  type: 'code_contains',
  patterns: ['fn add(a: f64, b: f64)'],
}

// ✅ GOOD - Flexible
{
  type: 'code_matches',
  regex: 'fn\\s+add\\s*\\(\\s*a\\s*:\\s*f64\\s*,\\s*b\\s*:\\s*f64\\s*\\)',
  hints: ['Check spacing: a: f64 (space after colon) or a:f64 (no space) both work'],
}
```

### Validation Default Behavior

**Fail closed - never auto-pass:**
- Default: Return `{ completed: false, message: '...' }` unless explicit rule says otherwise
- No generic "we didn't implement this" auto-pass
- Every step must have validation rules or hardcoded logic

### Hints Format

- **Error-focused, not advice:** Say "Missing semicolon" not "Add semicolon"
- Be specific: "Missing semicolon after `let num1 = ...`" not generic "Add semicolon"
- List missing patterns when using `code_contains`
- Use first hint as error message for `code_matches`

## Development Patterns (MUST FOLLOW)

### 1. Step Access and Locking

**Single source of truth:** `isStepAccessible(challenge, stepIndex, completedSteps)` in `src/lib/progress.ts`

**Rule:** All previous steps (by index) must be in `completedSteps` (by step number)

**Usage:**
- In `$challengeId.tsx`: Validate step from URL with helper using `isStepAccessible`
- If locked, use first step
- In ChallengeView, `getStepIndex(initialStep)` must use same check

**Don't:** Use `?step=X` or `initialStep` as current step without validating through this helper

### 2. Terminal Commands

**Storage:** Per (challengeId, stepNumber): `progress.challengeProgress[id].terminalCommands` is `Record<number, string[]>`

**Loading:** When step/challenge changes, load commands for **that step only** and set `terminalCommands` state

**Saving:** On command run: call `addTerminalCommand(challengeId, stepNumber, command)`, then update local state

**Don't:** Call `reloadProgress()` inside a `setTerminalCommands` callback (React state is async)

### 3. Step Validation

**Inputs:** step, code, terminal commands for **this step**, step number, optional challengeId

**Data-driven:** Prefer `step.validation` and `data-driven-validator`; add hardcoded logic only when needed and scope by challengeId

**Debounce:** Validate on code change after ~300ms; run immediately on step/challenge change

### 4. Progress and Section Stats

- Section progress = count of **completed challenges in that section only**
- Filter `completedChallenges` by section (e.g. via `getChallenge(id).section.id`)
- Don't use global completed count for a section
- When resetting a challenge, update section progress for that challenge's section

### 5. Starter Code

- Prefer `step.starterCode` from challenge data
- If missing, use one generic fallback (e.g. `// Write your code here`)
- Don't hardcode different snippets per step in the view layer

### 6. Terminal on Step Change

- Terminal is step-scoped: use a `key` that includes step (e.g. `${challengeId}-${currentStepIndex}`)
- This remounts and clears output/history when step changes

### 7. UI Overflow

- Parent of scrollable content: use `overflow-y-auto` (or `overflow-auto`)
- For horizontal scroll on code blocks: scrollable container needs `overflow-x-auto` and flex parent should have `min-w-0`
- Markdown code blocks rendered via `markdown-components.tsx`; don't rely only on global `pre` styles

## Testing Instructions

- Run `bun run build` and `bun run lint` before committing (both must pass)
- No React Rules of Hooks violations
- No build artifacts tracked
- Fix any test or type errors until the whole suite is green
- Add or update tests for code you change

## Common Mistakes to Avoid

### Content Authoring

- ❌ Examples that mirror tasks (same variable names/values)
- ❌ Duplicate instruction blocks (example repeating task)
- ❌ Combining multiple concepts into one step
- ❌ Putting test descriptions in instruction body
- ❌ Non-unique step numbers
- ❌ Auto-passing validation ("we didn't implement this")

### Validation

- ❌ Using `code_contains` for function signatures (use `code_matches` with regex)
- ❌ Exact string matching for Rust code (spacing is flexible)
- ❌ Generic hints ("Add semicolon" instead of "Missing semicolon after `let x = ...`")
- ❌ Missing validation rules (every step needs validation)

### Development

- ❌ Using `npm` instead of `bun`
- ❌ Trusting URL `?step=X` without validating through `isStepAccessible`
- ❌ Calling `reloadProgress()` inside setState callback
- ❌ Using global completed count for section progress
- ❌ Hardcoding starter code in view layer instead of using `step.starterCode`
- ❌ Duplicate step numbers breaking navigation

## File Locations

**Content:**
- Sections/challenges: `src/data/challenges/index.ts`, `section1.ts`
- Types: `src/types/challenge.ts`, `progress.ts`, `validation.ts`

**Validation:**
- Data-driven: `src/lib/data-driven-validator.ts`
- Hardcoded fallback: `src/lib/step-validator.ts`

**Progress:**
- Load/save: `src/lib/progress.ts`
- Storage: localStorage key `freerustcamp-progress`

**Components:**
- ChallengeView: `src/components/ChallengeView.tsx`
- CodeEditor: `src/components/CodeEditor.tsx`
- Terminal: `src/components/Terminal.tsx`
- Markdown: `src/lib/markdown-components.tsx`

## Documentation

- All rules documented in `docs/` folder
- See `docs/content.md` for content authoring details
- See `docs/development.md` for development patterns
- See `docs/architecture.md` for architecture details
- See `docs/reference.md` for quick reference

## When Adding New Content

1. Add step object to challenge's `steps` array in `section1.ts` (or section file)
2. Set `step` (unique number), `title`, `instruction`, `test` (string[]), `what_you_learned`
3. Optionally set `explanation`, `task`, `starterCode`, `validation`
4. Ensure step number is unique within challenge
5. Add validation rules (data-driven preferred)
6. Follow granularity philosophy (one concept per step)
7. Use different variable names in examples vs task

## When Fixing Bugs

- Document the mistake in this rules file
- Add to "Common Mistakes to Avoid" section
- Update relevant documentation in `docs/`
- Ensure fix follows all patterns above
