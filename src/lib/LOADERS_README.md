# Loaders (future markdown curriculum)

These modules are **not used by the app** at runtime. Routes and components use `@/data/challenges` (TypeScript) only.

- **hybrid-loader.ts** – Switches between markdown and TS sources (currently `USE_MARKDOWN = false`).
- **content-loader.ts** – Loads challenge content from markdown files under `src/content/`.
- **structure-loader.ts** – Loads section/challenge structure from `src/data/structure/*.json`.

They are kept for a future migration to markdown-based curriculum. To enable:

1. Set `USE_MARKDOWN = true` in `hybrid-loader.ts`.
2. Have routes/components import from `@/lib/hybrid-loader` instead of `@/data/challenges` (and use async APIs).
