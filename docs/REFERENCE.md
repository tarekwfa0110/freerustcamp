# Reference

Quick reference for validation types, progress, and key files. Details are in the code and in [ARCHITECTURE.md](./ARCHITECTURE.md) / [DEVELOPMENT.md](./DEVELOPMENT.md).

## Validation types (`src/types/validation.ts`)

Data-driven rules in `step.validation.rules`:

| Type | Purpose |
|------|--------|
| `terminal_command` | User ran a command (e.g. `cargo new`, optional `projectSpecific`) |
| `code_contains` | Code contains strings; `allRequired` = all or any |
| `code_matches` | Code matches regex (with optional `flags`) |
| `code_compiles` | Reserved (future) |
| `function_exists` | Function name present in code |
| `struct_exists` | Struct name present; optional `fields` |
| `custom` | Reserved (future) |

Each rule has **hints** (string[]). Optional **message** on the config for completion text.

## Progress (`src/lib/progress.ts`)

- **Storage:** localStorage key `freerustcamp-progress`; JSON `UserProgress`.
- **Load:** `loadProgress()` — returns default if missing or parse error; does not throw.
- **Save:** `saveProgress(progress)` — **may throw** (e.g. quota, private mode). Callers that need to handle failure should use try/catch.
- **Step completion:** `completedSteps` is `number[]` (step numbers) per challenge; terminal commands are `Record<number, string[]>` per challenge.
- **Access:** `isStepAccessible(challenge, stepIndex, completedSteps)` — true only if all previous steps (by index) are in `completedSteps`.

## Key files (by role)

| Role | File(s) |
|------|--------|
| Entry | `src/main.tsx` |
| Layout / providers | `src/routes/__root.tsx` |
| Home | `src/routes/index.tsx` |
| Curriculum list | `src/routes/challenges/index.tsx` |
| Single challenge | `src/routes/challenges/$challengeId.tsx` |
| Progress page | `src/routes/progress.tsx` |
| Challenge data | `src/data/challenges/index.ts`, `section1.ts` |
| Progress load/save | `src/lib/progress.ts` |
| Step validation | `src/lib/step-validator.ts`, `src/lib/data-driven-validator.ts` |
| Markdown components | `src/lib/markdown-components.tsx` |
| Types | `src/types/challenge.ts`, `progress.ts`, `validation.ts` |

## Dependencies (unused / optional)

- **@tanstack/react-table**, **react-responsive** — Not used in `src`; reserved for future (see repo `docs/DEPENDENCIES.md`).

## Loaders (future markdown)

- **hybrid-loader**, **content-loader**, **structure-loader** — Not used at runtime. See `src/lib/LOADERS_README.md` for enabling markdown curriculum.
