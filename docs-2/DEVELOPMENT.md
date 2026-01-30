# Development

How to run, build, and work in the codebase without breaking patterns that the app relies on.

## Commands

```bash
bun install
bun run dev      # Dev server (default port 3000)
bun run build    # tsc + vite build
bun run lint     # ESLint (0 warnings required)
bun test         # Bun test runner
bun run server   # Optional: run executor server (see server/README.md)
```

Use **Bun** for install/run; the project is portable with npm if needed.

## Project structure (real)

```
src/
  main.tsx              # Entry: RouterProvider, routeTree
  routes/
    __root.tsx          # Layout: Navbar, QueryClient, Outlet
    index.tsx           # Home / landing
    challenges/
      index.tsx         # Curriculum list (sections + challenge cards)
      $challengeId.tsx  # Single challenge or section preview
    progress.tsx       # User progress page
  components/           # React components (ChallengeView, CodeEditor, Terminal, …)
  lib/                  # Utilities, progress, validation, markdown-components
  data/challenges/      # Curriculum: sections, getChallenge, getSectionById
  types/                # challenge, progress, validation
  content/              # Markdown files (future use)
  data/structure/       # JSON structure (future use)
```

There is no `pages/` or top-level `App.tsx`; the app mounts from `main.tsx` with TanStack Router.

## Patterns (must follow)

These keep behavior consistent and avoid past bugs.

### 1. Step access and locking

- **Single source of truth:** `isStepAccessible(challenge, stepIndex, completedSteps)` in `src/lib/progress.ts`.
- **Rule:** All previous steps (by index) must be in `completedSteps` (by step number).
- **Usage:** In `$challengeId.tsx`, validate step from URL with a helper that uses `isStepAccessible`; if locked, use first step. In ChallengeView, `getStepIndex(initialStep)` must use the same check.
- **Don’t:** Use `?step=X` or `initialStep` as the current step without validating through this helper.

### 2. Terminal commands

- **Storage:** Per (challengeId, stepNumber): `progress.challengeProgress[id].terminalCommands` is `Record<number, string[]>`.
- **Loading:** When step/challenge changes, load commands for **that step only** and set `terminalCommands` state.
- **Saving:** On command run: call `addTerminalCommand(challengeId, stepNumber, command)`, then update local state. Do **not** call `reloadProgress()` inside a `setTerminalCommands` callback (React state is async).

### 3. Step validation

- **Default:** Return `{ completed: false, message: '...' }` unless a step-specific or data-driven rule says otherwise. No generic “we didn’t implement this” auto-pass.
- **Inputs:** step, code, terminal commands for **this step**, step number, optional challengeId.
- **Data-driven:** Prefer `step.validation` and `data-driven-validator`; add hardcoded logic only when needed and scope by challengeId.
- **Debounce:** Validate on code change after ~300ms; run immediately on step/challenge change.

### 4. Progress and section stats

- Section progress = count of **completed challenges in that section only**. Filter `completedChallenges` by section (e.g. via `getChallenge(id).section.id`). Don’t use global completed count for a section.
- When resetting a challenge, update section progress for that challenge’s section.

### 5. Starter code

- Prefer `step.starterCode` from challenge data. If missing, use one generic fallback (e.g. `// Write your code here`). Don’t hardcode different snippets per step in the view layer.

### 6. Terminal on step change

- Terminal is step-scoped: use a `key` that includes step (e.g. `${challengeId}-${currentStepIndex}`) so it remounts and clears output/history when the step changes.

### 7. Step numbers

- Step numbers must be **unique** within a challenge. Code uses `findIndex(s => s.step === stepNumber)`; duplicates break navigation and validation.

### 8. UI overflow (instructions, code blocks)

- Parent of scrollable content: use `overflow-y-auto` (or `overflow-auto`). For horizontal scroll on code blocks, the scrollable container needs `overflow-x-auto` and its flex parent should have `min-w-0` so the child can shrink. Markdown code blocks are rendered via `markdown-components.tsx`; don’t rely only on global `pre` styles.

## Lessons learned (condensed)

- **Unique IDs:** No duplicate step numbers per challenge; duplicates break lookup and progress.
- **Don’t trust URL for access:** Validate `?step=X` through `isStepAccessible` (or equivalent); if locked, use first step and sync URL.
- **No auto-pass in validators:** Default to not complete; require an explicit rule or check.
- **State vs storage:** Don’t call `reloadProgress()` inside a `setState` callback; React state updates are async.
- **Progress save can throw:** `saveProgress()` may throw (e.g. quota). Critical callers can wrap in try/catch and show a toast.

## Pre-push

- Run `bun run build` and `bun run lint` (both must pass).
- Optional: follow the checklist in repo `docs/PRE_PUSH_SCAN_REPORT.md`.
