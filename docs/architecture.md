# Architecture

How the app is structured and how data flows. This reflects the **current** codebase: curriculum is loaded from TypeScript; markdown loaders exist but are not used at runtime.

## High-level flow

```
User → Routes (TanStack Router)
        ↓
  getChallenge(id) / getSectionById(id) / sections
        ↓
  src/data/challenges (TypeScript only today)
        ↓
  ChallengeView / StepGrid / SectionPreview
        ↓
  Progress (localStorage) + step-validator / data-driven-validator
```

- **Routes** define pages: `/`, `/challenges`, `/challenges/:challengeId`, `/progress`.
- **Data** comes from `@/data/challenges`: `sections`, `getChallenge(id)`, `getSectionById(id)`. No other module is used by the UI for challenge/section data.
- **Progress** is read/written in `src/lib/progress.ts` (localStorage). It can throw on quota; see [REFERENCE.md](./REFERENCE.md).

## Content sources (current vs future)

| Source | Used today? | Location |
|--------|-------------|----------|
| **TypeScript** | **Yes** | `src/data/challenges/index.ts`, `section1.ts` |
| Markdown | No | `src/content/section1/*.md`; parsed by `markdown-parser.ts` |
| Structure JSON | No (only for future markdown) | `src/data/structure/sections.json`, `section1.json` |

The app does **not** use `hybrid-loader`, `content-loader`, or `structure-loader` at runtime. Those live in `src/lib/` for a future markdown-based curriculum. See `src/lib/LOADERS_README.md` for how to enable them.

## Validation

Two-tier system:

1. **Data-driven** (preferred): Rules in `step.validation` (see `src/types/validation.ts`). Handled by `src/lib/data-driven-validator.ts`.
2. **Hardcoded fallback**: When `step.validation` is missing, `src/lib/step-validator.ts` runs project/step-specific logic.

Flow: user edits code or runs terminal command → `validateStep(step, code, terminalCommands, stepNumber, challengeId)` → if `step.validation` exists, `validateStepWithConfig()`; else step-validator → `StepValidationResult` → UI (hints, completion).

## UI layer

- **ChallengeView** – Main challenge UI: instructions, Monaco editor, terminal, step navigation, validation feedback.
- **CodeEditor** – Monaco wrapper; shortcuts (e.g. Ctrl+Enter to submit step).
- **Terminal** – In-browser terminal emulation; commands stored per (challengeId, stepNumber).
- **StepGrid** – Grid of steps for a practice project; lock state from `isStepAccessible()` in progress.
- **Markdown** – Shared components in `src/lib/markdown-components.tsx`; used by ChallengeView and ChallengeDescription.

Navigation uses TanStack Router only (`Link`, `useNavigate`); no raw `<a href>` for in-app routes.

## Key files

| Role | File(s) |
|------|--------|
| Route definitions | `src/routes/__root.tsx`, `src/routes/index.tsx`, `src/routes/challenges/index.tsx`, `src/routes/challenges/$challengeId.tsx`, `src/routes/progress.tsx` |
| Challenge/section data | `src/data/challenges/index.ts`, `src/data/challenges/section1.ts` |
| Progress (load/save) | `src/lib/progress.ts` |
| Step validation | `src/lib/step-validator.ts`, `src/lib/data-driven-validator.ts` |
| Types | `src/types/challenge.ts`, `src/types/progress.ts`, `src/types/validation.ts` |
