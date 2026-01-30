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

  const timeout = new Promise<{ stdout: string; stderr: string; exitCode: number }>((_, reject) => {
    setTimeout(() => {
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
 * Run cargo build. Returns success, stderr, and exit code.
 */
export async function cargoBuild(dir: string): Promise<BuildResult> {
  const { stdout, stderr, exitCode } = await runWithTimeout(
    ["cargo", "build", "--quiet"],
    dir,
    BUILD_TIMEOUT_MS
  );
  return {
    success: exitCode === 0,
    stderr: stderr || stdout,
    exitCode,
  };
}

/**
 * Run cargo run with optional args. Returns stdout, stderr, exit code.
 */
export async function cargoRun(dir: string, args: string[] = []): Promise<RunResult> {
  const cmd = ["cargo", "run", "--quiet", "--", ...args];
  const { stdout, stderr, exitCode } = await runWithTimeout(cmd, dir, RUN_TIMEOUT_MS);
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
