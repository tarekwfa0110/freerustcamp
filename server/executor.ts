/**
 * Rust code executor: temp Cargo project, cargo build, cargo run with timeout.
 * Used by the execution API (see index.ts).
 */

import { mkdtemp, rm, writeFile, mkdir, readdir, stat } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";

const TEMP_PREFIX = "frc-";
const ORPHAN_AGE_MS = 60 * 60 * 1000; // 1 hour

/** Remove orphaned frc-* temp dirs (e.g. from crashed runs). Call at startup. */
async function cleanupOrphanedTempDirs(): Promise<void> {
  const base = tmpdir();
  let entries: string[];
  try {
    entries = await readdir(base);
  } catch {
    return;
  }
  const now = Date.now();
  for (const name of entries) {
    if (!name.startsWith(TEMP_PREFIX)) continue;
    const path = join(base, name);
    try {
      const st = await stat(path);
      if (!st.isDirectory()) continue;
      if (now - st.mtimeMs > ORPHAN_AGE_MS) await rm(path, { recursive: true, force: true });
    } catch {
      // ignore per-dir errors
    }
  }
}

const BUILD_TIMEOUT_MS = 15_000;
const RUN_TIMEOUT_MS = 10_000;

/** When set to "docker", run cargo inside a hardened container (no network, limits, non-root). */
const SANDBOX = process.env.EXECUTION_SANDBOX === "docker";
const RUST_IMAGE = process.env.EXECUTION_SANDBOX_IMAGE ?? "rust:1-slim";
const SANDBOX_MEMORY_MB = process.env.EXECUTION_SANDBOX_MEMORY_MB ?? "512";
const SANDBOX_CPUS = process.env.EXECUTION_SANDBOX_CPUS ?? "1";

const CARGO_TOML = `[package]
name = "user"
version = "0.1.0"
edition = "2021"
`;

export interface BuildResult {
  success: boolean;
  stderr: string;
  exitCode: number | null;
}

export interface RunResult {
  success: boolean;
  stdout: string;
  stderr: string;
  exitCode: number | null;
}

/**
 * Run a command with a timeout. On timeout, kill the process and return exitCode 124.
 */
async function runWithTimeout(
  cmd: string[],
  cwd: string,
  timeoutMs: number
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const proc = Bun.spawn(cmd, {
    cwd,
    stdout: "pipe",
    stderr: "pipe",
    stdin: "ignore",
  });

  let timerId: ReturnType<typeof setTimeout>;
  const timeout = new Promise<{ stdout: string; stderr: string; exitCode: number }>((_, reject) => {
    timerId = setTimeout(() => {
      proc.kill();
      reject(new Error(`Timeout after ${timeoutMs}ms`));
    }, timeoutMs);
  });

  const run = (async () => {
    const [stdout, stderr] = await Promise.all([
      proc.stdout ? new Response(proc.stdout).text() : "",
      proc.stderr ? new Response(proc.stderr).text() : "",
    ]);
    const exitCode = await proc.exited;
    return { stdout, stderr, exitCode };
  })();

  try {
    return await Promise.race([run, timeout]);
  } catch (err) {
    if (err instanceof Error && err.message.startsWith("Timeout")) {
      return {
        stdout: "",
        stderr: err.message,
        exitCode: 124,
      };
    }
    throw err;
  } finally {
    clearTimeout(timerId!);
  }
}

/** Run orphan cleanup once at module load. */
let orphanCleanupDone = false;
function maybeCleanupOrphans(): void {
  if (orphanCleanupDone) return;
  orphanCleanupDone = true;
  cleanupOrphanedTempDirs().catch(() => {});
}

/**
 * Create a temp directory with a Cargo project and user code in src/main.rs.
 * Returns the temp dir path (caller must call cleanup when done).
 */
export async function createTempProject(code: string): Promise<string> {
  maybeCleanupOrphans();
  const dir = await mkdtemp(join(tmpdir(), TEMP_PREFIX));
  await writeFile(join(dir, "Cargo.toml"), CARGO_TOML);
  await mkdir(join(dir, "src"), { recursive: true });
  await writeFile(join(dir, "src", "main.rs"), code);
  return dir;
}

/**
 * Build docker run args for sandboxed execution: ephemeral container, no network,
 * non-root, dropped caps, memory/cpu limits. Project dir is mounted at /workspace.
 */
function sandboxRunArgs(dir: string, cargoArgs: string[], memoryMb: string): string[] {
  return [
    "run",
    "--rm",
    "-v",
    `${dir}:/workspace`,
    "-w",
    "/workspace",
    "--network=none",
    "--user",
    "1000:1000",
    "--memory",
    `${memoryMb}m`,
    "--cpus",
    SANDBOX_CPUS,
    "--cap-drop",
    "ALL",
    "--security-opt",
    "no-new-privileges",
    RUST_IMAGE,
    ...cargoArgs,
  ];
}

/**
 * Run cargo build. When EXECUTION_SANDBOX=docker, runs inside a hardened container.
 */
export async function cargoBuild(dir: string): Promise<BuildResult> {
  let stdout: string;
  let stderr: string;
  let exitCode: number;

  if (SANDBOX) {
    const cmd = sandboxRunArgs(dir, ["cargo", "build", "--quiet"], "768");
    const result = await runWithTimeout(["docker", ...cmd], process.cwd(), BUILD_TIMEOUT_MS);
    stdout = result.stdout;
    stderr = result.stderr;
    exitCode = result.exitCode;
  } else {
    const result = await runWithTimeout(
      ["cargo", "build", "--quiet"],
      dir,
      BUILD_TIMEOUT_MS
    );
    stdout = result.stdout;
    stderr = result.stderr;
    exitCode = result.exitCode;
  }

  return {
    success: exitCode === 0,
    stderr: stderr || stdout,
    exitCode,
  };
}

/**
 * Run cargo run with optional args. When EXECUTION_SANDBOX=docker, runs inside a hardened container.
 */
export async function cargoRun(dir: string, args: string[] = []): Promise<RunResult> {
  const cargoCmd = ["cargo", "run", "--quiet", "--", ...args];
  let stdout: string;
  let stderr: string;
  let exitCode: number;

  if (SANDBOX) {
    const cmd = sandboxRunArgs(dir, cargoCmd, SANDBOX_MEMORY_MB);
    const result = await runWithTimeout(["docker", ...cmd], process.cwd(), RUN_TIMEOUT_MS);
    stdout = result.stdout;
    stderr = result.stderr;
    exitCode = result.exitCode;
  } else {
    const result = await runWithTimeout(cargoCmd, dir, RUN_TIMEOUT_MS);
    stdout = result.stdout;
    stderr = result.stderr;
    exitCode = result.exitCode;
  }

  return {
    success: exitCode === 0,
    stdout,
    stderr,
    exitCode,
  };
}

/**
 * Remove the temp directory.
 */
export async function cleanup(dir: string): Promise<void> {
  try {
    await rm(dir, { recursive: true, force: true });
  } catch {
    // ignore
  }
}
