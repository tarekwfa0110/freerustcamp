# Quality and Pre-Push

## Pre-push checklist

Before pushing to `master`:

**Phase 1 – Blocking**

- [ ] `bun run build` passes
- [ ] `bun run lint` passes (0 errors, 0 warnings)
- [ ] No React Rules of Hooks violations
- [ ] No build artifacts tracked (e.g. `vite.config.ts.timestamp*` in `.gitignore`)

**Phase 2 – Quality**

- [ ] No unused imports/vars in `src`
- [ ] No `any` where avoidable
- [ ] Unused loaders documented (`src/lib/LOADERS_README.md`)
- [ ] Shared markdown components used (`src/lib/markdown-components.tsx`)

**Phase 3 – Optional**

- [ ] Dead exports in `src/data/challenges` documented or pruned
- [ ] Unused deps documented or removed ([dependencies.md](dependencies.md))
- [ ] Naming/error-handling (e.g. `getChallengeById` returns section; `saveProgress` may throw)

## Remaining engineering notes (optional)

| Area | Issue | Suggestion |
|------|--------|------------|
| Error handling | No React Error Boundary | Wrap app in `__root.tsx` with ErrorBoundary and fallback UI |
| Root mount | `getElementById('root')!` | Guard: if missing, render message or log |
| Progress save | `saveProgress` may throw; callers don’t catch | Optional: try/catch and toast so one failed save doesn’t crash UI |
| Test coverage | Only `step-validator.test.ts` | Add tests for progress, validation, routing when possible |
| Curriculum sources | Section 1 in TS, JSON, and markdown; app uses TS only | When enabling markdown, keep sources in sync |
| Bundle size | Chunk > 500 kB | Optional: code-split or lazy routes later |

## Agent / contributor guidelines

- **Fail closed:** Validation and access default to “no” or “incomplete.” Never auto-pass because “we didn’t implement this.”
- **One source of truth:** One implementation per rule (e.g. `isStepAccessible()` used by route, view, grid).
- **Don’t trust input:** Validate URL/query, form data, and stored data before using for access or state.
- **Unique IDs:** Step numbers (and any id used for lookup) must be unique per scope.
- **State and side effects:** Don’t call `loadProgress()` or reload inside a setState callback; do it outside (handler or effect).

See [DEVELOPMENT.md](./DEVELOPMENT.md) for project-specific patterns and lessons.
