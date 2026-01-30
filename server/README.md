# Execution API

Compiles and runs user Rust code in a temporary Cargo project. Used by the frontend when `VITE_EXECUTION_API_URL` is set (see [REAL_RUST_EXECUTION.md](../docs/architecture/REAL_RUST_EXECUTION.md)).

## Prerequisites

- [Bun](https://bun.sh) (or Node for executor if ported)
- [Rust](https://rustup.rs) toolchain (`cargo` on PATH)

## Run

```bash
bun run server
```

Listens on `http://localhost:3847` (or `EXECUTION_PORT`).

## Endpoints

- **POST /api/run** – Compile and run code. Body: `{ "code": "...", "args": ["32", "F"] }`. Returns `{ success, stdout, stderr, exitCode, compilationError? }`.
- **POST /api/test** – Compile and run; evaluate tests. Body: `{ "code": "...", "tests": [...] }`. Returns `TestRunResult` (success, results[], compilationError?, executionError?).

## Frontend

1. Copy `.env.example` to `.env.local`.
2. Set `VITE_EXECUTION_API_URL=http://localhost:3847`.
3. Start the server: `bun run server`.
4. Start the app: `bun run dev`. "Run Tests" on certification projects will use real execution.

## Limits

- Build timeout: 15s
- Run timeout: 10s per test
- Temp dir is created under OS temp and removed after each request
