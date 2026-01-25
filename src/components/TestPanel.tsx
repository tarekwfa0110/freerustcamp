import { Test } from '@/types/challenge';
import { TestResult } from '@/lib/test-runner';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface TestPanelProps {
  tests: Test[];
  results: TestResult[] | null;
  isRunning: boolean;
}

export function TestPanel({ tests, results, isRunning }: TestPanelProps) {
  const getTestResult = (testName: string): TestResult | undefined => {
    return results?.find((r) => r.name === testName);
  };

  const allPassed = results?.every((r) => r.passed) ?? false;

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Tests</h2>
      <div className="space-y-2 mb-4">
        {tests.map((test) => {
          const result = getTestResult(test.name);
          const isHidden = test.hidden && !result;

          if (isHidden) {
            return null;
          }

          return (
            <div
              key={test.name}
              className={`p-4 rounded border ${
                result
                  ? result.passed
                    ? 'bg-green-900/20 border-green-500'
                    : 'bg-red-900/20 border-red-500'
                  : 'bg-gray-900 border-gray-700'
              }`}
            >
              <div className="flex items-start gap-3">
                {isRunning && !result ? (
                  <Loader2 className="w-5 h-5 text-gray-400 animate-spin flex-shrink-0 mt-0.5" />
                ) : result?.passed ? (
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                ) : result ? (
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <div className="w-5 h-5 border-2 border-gray-600 rounded-full flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <div className="font-semibold mb-1">{test.name}</div>
                  <div className="text-sm text-gray-400 mb-2">{test.description}</div>
                  {result && !result.passed && result.error && (
                    <div className="text-sm text-red-400 mt-2">
                      Error: {result.error}
                    </div>
                  )}
                  {result && result.output && (
                    <div className="text-sm text-gray-300 mt-2 font-mono bg-gray-900 p-2 rounded">
                      {result.output}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {results && (
        <div
          className={`p-4 rounded ${
            allPassed
              ? 'bg-green-900/20 border border-green-500'
              : 'bg-yellow-900/20 border border-yellow-500'
          }`}
        >
          <div className="flex items-center gap-2">
            {allPassed ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-semibold text-green-500">
                  All tests passed! 🎉
                </span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-yellow-500">
                  Some tests failed. Keep trying!
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
