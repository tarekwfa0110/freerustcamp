/**
 * Execution API: compile and run Rust code in a temp Cargo project.
 * POST /api/run  - compile + run with optional args
 * POST /api/test - compile + run; evaluate tests (compilation, functional, code_quality)
 *
 * See docs/architecture/REAL_RUST_EXECUTION.md
 */

import {
  createTempProject,
  cargoBuild,
  cargoRun,
  cleanup,
} from "./executor";

const PORT = parseInt(process.env.EXECUTION_PORT ?? "3847", 10);
/** In production set CORS_ORIGIN to your app origin (e.g. https://app.example.com). Unset = "*" for dev. */
const CORS_ORIGIN = process.env.CORS_ORIGIN ?? "*";

interface TestDefinition {
  name: string;
  type: string;
  description: string;
  command?: string;
  expectedOutput?: string;
  expectedExitCode?: number;
  check?: string;
  hidden?: boolean;
}

interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
  output?: string;
}

interface TestRunResult {
  success: boolean;
  results: TestResult[];
  compilationError?: string;
  executionError?: string;
}

/** Parse args from test.command e.g. "cargo run -- 32 F" -> ["32", "F"] */
function argsFromCommand(command: string | undefined): string[] {
  if (!command || !command.trim()) return [];
  const trimmed = command.trim();
  const idx = trimmed.indexOf("--");
  if (idx === -1) {
    if (trimmed.startsWith("cargo run")) {
      const rest = trimmed.replace(/^cargo\s+run\s*/, "").trim();
      return rest ? rest.split(/\s+/) : [];
    }
    return [];
  }
  const after = trimmed.slice(idx + 2).trim();
  return after ? after.split(/\s+/) : [];
}

/** Code quality: check if code contains pattern from test.check e.g. "contains 'mut count'" */
function checkCodeQuality(code: string, check: string | undefined): boolean {
  if (!check) return false;
  if (check.startsWith("contains '") && check.endsWith("'")) {
    const pattern = check.slice(10, -1);
    return code.includes(pattern);
  }
  return false;
}

/** Compare stdout to expectedOutput (substring or exact). */
function outputMatches(stdout: string, expected: string | undefined): boolean {
  if (expected === undefined) return true;
  const norm = (s: string) => s.trim().replace(/\r\n/g, "\n");
  const a = norm(stdout);
  const b = norm(expected);
  return a.includes(b) || a === b;
}

Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    const method = req.method;

    // CORS preflight
    if (method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": CORS_ORIGIN,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    if (method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405);
    }

    if (url.pathname === "/api/run") {
      return handleRun(req);
    }
    if (url.pathname === "/api/test") {
      return handleTest(req);
    }

    return jsonResponse({ error: "Not found" }, 404);
  },
});

function jsonResponse(body: object, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": CORS_ORIGIN,
    },
  });
}

async function handleRun(req: Request): Promise<Response> {
  let body: { code?: string; args?: string[] };
  try {
    body = (await req.json()) as { code?: string; args?: string[] };
  } catch {
    return jsonResponse({ error: "Invalid JSON" }, 400);
  }
  const code = body.code ?? "";
  const args = Array.isArray(body.args) ? body.args : [];

  if (!code.trim()) {
    return jsonResponse({ success: false, compilationError: "No code provided" });
  }

  let dir: string | null = null;
  try {
    dir = await createTempProject(code);
    const build = await cargoBuild(dir);
    if (!build.success) {
      return jsonResponse({
        success: false,
        compilationError: build.stderr,
        exitCode: build.exitCode ?? 1,
      });
    }
    const run = await cargoRun(dir, args);
    return jsonResponse({
      success: run.exitCode === 0,
      stdout: run.stdout,
      stderr: run.stderr,
      exitCode: run.exitCode ?? 1,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Execution failed";
    return jsonResponse({
      success: false,
      executionError: message,
    });
  } finally {
    if (dir) await cleanup(dir);
  }
}

async function handleTest(req: Request): Promise<Response> {
  let body: { code?: string; tests?: TestDefinition[] };
  try {
    body = (await req.json()) as { code?: string; tests?: TestDefinition[] };
  } catch {
    return jsonResponse({ error: "Invalid JSON" }, 400);
  }
  const code = body.code ?? "";
  const tests = Array.isArray(body.tests) ? body.tests : [];

  if (!code.trim()) {
    return jsonResponse({
      success: false,
      results: [],
      compilationError: "No code provided",
    });
  }

  let dir: string | null = null;
  const results: TestResult[] = [];
  let compilationError: string | undefined;
  let buildSucceeded = false;

  try {
    dir = await createTempProject(code);
    const build = await cargoBuild(dir);
    buildSucceeded = build.success;
    if (!build.success) {
      compilationError = build.stderr;
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Build failed";
    return jsonResponse({
      success: false,
      results: tests.map((t) => ({ name: t.name, passed: false, error: message })),
      executionError: message,
    });
  }

  try {
    for (const test of tests) {
      if (test.type === "compilation") {
        results.push({
          name: test.name,
          passed: buildSucceeded,
          error: buildSucceeded ? undefined : compilationError,
        });
        continue;
      }

      if (test.type === "code_quality") {
        const passed = checkCodeQuality(code, test.check);
        results.push({
          name: test.name,
          passed,
          error: passed ? undefined : "Code quality check failed",
        });
        continue;
      }

      if (test.type === "functional") {
        if (!buildSucceeded) {
          results.push({
            name: test.name,
            passed: false,
            error: compilationError ?? "Code did not compile",
          });
          continue;
        }
        const args = argsFromCommand(test.command);
        try {
          const run = await cargoRun(dir!, args);
          const expectedExit = test.expectedExitCode ?? 0;
          const exitOk = run.exitCode === expectedExit;
          const outputOk = outputMatches(run.stdout, test.expectedOutput);
          const passed = exitOk && outputOk;
          results.push({
            name: test.name,
            passed,
            output: run.stdout.trim() || undefined,
            error: passed
              ? undefined
              : [
                  !exitOk ? `Expected exit code ${expectedExit}, got ${run.exitCode ?? "?"}` : null,
                  !outputOk ? "Output did not match expected" : null,
                ]
                  .filter(Boolean)
                  .join(". ") || (run.stderr.trim() || undefined),
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : "Run failed";
          results.push({ name: test.name, passed: false, error: message });
        }
        continue;
      }

      results.push({
        name: test.name,
        passed: false,
        error: `Unknown test type: ${test.type}`,
      });
    }

    const result: TestRunResult = {
      success: results.every((r) => r.passed),
      results,
      compilationError: compilationError && !buildSucceeded ? compilationError : undefined,
    };
    return jsonResponse(result);
  } finally {
    if (dir) await cleanup(dir);
  }
}

console.log(`Execution API listening on http://localhost:${PORT}`);
console.log("  POST /api/run  - compile and run with optional args");
console.log("  POST /api/test - compile and run certification tests");
