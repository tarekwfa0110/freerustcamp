// Test runner for Rust code
// Uses real execution when VITE_EXECUTION_API_URL is set; otherwise mock.
// See docs/architecture/REAL_RUST_EXECUTION.md for backend design.

export interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
  output?: string;
}

export interface TestRunResult {
  success: boolean;
  results: TestResult[];
  compilationError?: string;
  executionError?: string;
}

/** Test definition shape (matches Test from types/challenge plus optional fields for API). */
export interface TestDefinition {
  name: string;
  type: string;
  description: string;
  command?: string;
  expectedOutput?: string;
  expectedExitCode?: number;
  check?: string;
  hidden?: boolean;
}

const EXECUTION_API_URL = import.meta.env.VITE_EXECUTION_API_URL as string | undefined;

/**
 * Call the execution backend to compile and run code, then evaluate tests.
 * Backend must implement POST /api/test with body { code, tests } and return TestRunResult.
 */
async function runTestsReal(
  code: string,
  tests: TestDefinition[],
  signal?: AbortSignal
): Promise<TestRunResult> {
  const base = EXECUTION_API_URL?.replace(/\/$/, '');
  if (!base) {
    throw new Error('VITE_EXECUTION_API_URL is not set');
  }
  const res = await fetch(`${base}/api/test`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, tests }),
    signal,
  });
  if (!res.ok) {
    const text = await res.text();
    return {
      success: false,
      results: [],
      executionError: `Execution service error (${res.status}): ${text || res.statusText}`,
    };
  }
  const data = (await res.json()) as TestRunResult;
  return data;
}

/** Mock implementation used when no execution API is configured. */
function runTestsMock(
  code: string,
  tests: TestDefinition[],
  signal?: AbortSignal
): Promise<TestRunResult> {
  return new Promise((resolve, reject) => {
    // Check if already aborted
    if (signal?.aborted) {
      reject(new DOMException('Test execution was cancelled', 'AbortError'));
      return;
    }

    const timeoutId = setTimeout(() => {
      if (signal?.aborted) {
        reject(new DOMException('Test execution was cancelled', 'AbortError'));
        return;
      }
      const results: TestResult[] = tests.map((test) => {
        if (test.type === 'compilation') {
          const compiles = !code.includes('// This won\'t compile!');
          return {
            name: test.name,
            passed: compiles,
            error: compiles ? undefined : 'Compilation failed',
          };
        }
        if (test.type === 'code_quality' && test.check) {
          const passed = checkCodeQuality(code, test.check);
          return { name: test.name, passed, error: passed ? undefined : 'Code quality check failed' };
        }
        return {
          name: test.name,
          passed: false,
          error: 'Test execution not yet implemented (configure VITE_EXECUTION_API_URL for real runs)',
        };
      });
      resolve({ success: results.every((r) => r.passed), results });
    }, 500);

    signal?.addEventListener('abort', () => {
      clearTimeout(timeoutId);
      reject(new DOMException('Test execution was cancelled', 'AbortError'));
    });
  });
}

/**
 * Run certification tests: uses real execution API when VITE_EXECUTION_API_URL is set,
 * otherwise uses the mock (compilation + code_quality only; functional tests show "not yet implemented").
 */
export async function runTests(
  code: string,
  tests: TestDefinition[],
  signal?: AbortSignal
): Promise<TestRunResult> {
  if (signal?.aborted) {
    throw new DOMException('Test execution was cancelled', 'AbortError');
  }
  if (EXECUTION_API_URL) {
    try {
      return await runTestsReal(code, tests, signal);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') throw err;
      return {
        success: false,
        results: [],
        executionError: err instanceof Error ? err.message : 'Execution request failed',
      };
    }
  }
  return runTestsMock(code, tests, signal);
}

// Helper to check if code contains specific patterns (for code quality tests)
export function checkCodeQuality(code: string, check: string): boolean {
  if (check.startsWith("contains '")) {
    const pattern = check.slice(10, -1); // Remove "contains '" and "'"
    return code.includes(pattern);
  }
  return false;
}
