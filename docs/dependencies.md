# Dependencies and Loaders

## Unused dependencies (reserved for future)

- **@tanstack/react-table** — Planned for curriculum/data tables (challenge lists, progress tables).
- **react-responsive** — Planned for responsive layout or media-query hooks.

Remove from `package.json` if not needed, or keep for upcoming features.

## Loaders (future markdown curriculum)

These modules are **not used by the app** at runtime. Routes and components use `@/data/challenges` (TypeScript) only.

| File | Purpose |
|------|---------|
| `src/lib/hybrid-loader.ts` | Switches between markdown and TS (`USE_MARKDOWN = false`). |
| `src/lib/content-loader.ts` | Loads challenges from markdown under `src/content/`. |
| `src/lib/structure-loader.ts` | Loads section/challenge order from `src/data/structure/*.json`. |

To enable markdown later: set `USE_MARKDOWN = true` in `hybrid-loader.ts` and have routes/components import from `@/lib/hybrid-loader` (async APIs). See `src/lib/LOADERS_README.md`.

## Server

- **Location:** `server/`. Runs with `bun run server/index.ts`.
- **Purpose:** Optional backend for running Rust code and tests (e.g. when `VITE_EXECUTION_API_URL` is set).
- **Docs:** `server/README.md`.
