# Contributing to FreeRustCamp

Thanks for contributing! This guide covers project-specific setup plus general OSS best practices.

## Quick Start (Project-Specific)

### Prerequisites

- Bun (required)
- Rust toolchain (optional unless you run the executor server)

### Setup

```bash
bun install
bun run dev
```

### Common Commands

```bash
bun run build
bun run lint
bun test
bun run server
```

Notes:
- Always use Bun (never npm).
- Lint must pass with 0 warnings.
- Keep TypeScript strict and avoid `any` where possible.
- Use TanStack Router (`Link`, `useNavigate`) for internal navigation.
- Content rules live in `docs/CONTENT.md` and `AGENTS.md`.

## General OSS Guidelines

### Before You Start

- Check open issues or create a new one for discussion.
- Keep changes focused and scoped; smaller PRs are easier to review.

### Branching

- Create a feature branch from the default branch.
- Use clear, descriptive branch names (e.g., `fix/step-validation`, `docs/oss-setup`).

### Code Quality

- Prefer small, readable functions over clever one-liners.
- Add or update tests for code you change.
- Run `bun run build` and `bun run lint` before opening a PR.

### Commit & PR Hygiene

- Write descriptive commit messages.
- Explain the problem, the solution, and the tests you ran in the PR description.
- Link relevant issues if applicable.

### Content Changes

- Follow step structure rules in `docs/CONTENT.md`.
- Examples must not mirror tasks.
- Validation should be data-driven unless there is a clear reason to use hardcoded logic.

## Getting Help

- If anything is unclear, open an issue or ask in the PR.
- Include reproduction steps or screenshots when relevant.
