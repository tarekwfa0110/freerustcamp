# FreeRustCamp Documentation

Single-source docs for the FreeRustCamp codebase. Everything here is aligned with the current app (TypeScript challenges, TanStack Router, progress in localStorage).

## What’s in here

| Doc | Purpose |
|-----|--------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | How the app is built: routes, data, validation, content sources |
| [DEVELOPMENT.md](./DEVELOPMENT.md) | Run, build, lint, test; project structure; patterns and lessons |
| [CONTENT.md](./CONTENT.md) | Adding and editing challenges (data model, steps, validation) |
| [CURRICULUM.md](./CURRICULUM.md) | Curriculum plan: sections, project types, Section 1 outline |
| [REFERENCE.md](./REFERENCE.md) | Quick reference: validation types, progress, key files |

## Stack (current)

- **Bun** (package manager), **Vite**, **React 18**, **TypeScript**
- **TanStack Router** (file-based routes under `src/routes/`)
- **TanStack Query** (root provider in `__root.tsx`)
- **Monaco Editor** (code), **Tailwind** (styles), **shadcn-style** UI

## Content Philosophy

**Granular, step-by-step guidance** is the core philosophy. Each step should teach one concept or require one clear action. Project 1 (Temperature Converter) demonstrates this: 23 steps for a 1-hour project, breaking down every concept into individual steps. This granularity makes learning easier and reduces cognitive load. When creating new projects, reference Project 1's structure and granularity as the target.

## Quick commands

```bash
bun install
bun run dev      # http://localhost:3000
bun run build
bun run lint
bun test
```

## Project layout (source of truth: repo)

```
src/
  routes/          # Pages: index, challenges, challenges/$challengeId, progress
  components/      # UI: ChallengeView, CodeEditor, Terminal, etc.
  lib/             # Logic: progress, step-validator, test-runner, markdown-components
  data/challenges/ # Curriculum data (TypeScript) — what the app uses today
  types/           # challenge, progress, validation
  content/         # Markdown challenges (for future use; see ARCHITECTURE)
```

For more detail, see [ARCHITECTURE.md](./ARCHITECTURE.md) and [DEVELOPMENT.md](./DEVELOPMENT.md).
