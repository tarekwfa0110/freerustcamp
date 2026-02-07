import { Test } from '@/types/challenge';
import { TestResult } from '@/lib/test-runner';
import { CheckCircle2, XCircle, Clock, ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, memo } from 'react';
import { Button } from '@/components/ui/button';

interface TestPanelProps {
  tests: Test[];
  results: TestResult[] | null;
  isRunning: boolean;
  onRunTests?: () => void;
  onCancelTests?: () => void;
  onReset?: () => void;
}

function TestPanelComponent({ tests, results, isRunning, onRunTests, onCancelTests }: TestPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const getTestResult = (testName: string): TestResult | undefined => {
    return results?.find((r) => r.name === testName);
  };

  const passedCount = results?.filter((r) => r.passed).length || 0;
  const failedCount = results?.filter((r) => !r.passed).length || 0;
  const totalCount = tests.length;

  const statusIcon = (result: TestResult | undefined, isRunning: boolean) => {
    if (isRunning && !result) {
      return <Clock className="h-4 w-4 animate-pulse text-rust-300" />;
    }
    if (result?.passed) {
      return <CheckCircle2 className="h-4 w-4 text-success" />;
    }
    if (result && !result.passed) {
      return <XCircle className="h-4 w-4 text-destructive" />;
    }
    return <div className="h-4 w-4 rounded-full border-2 border-metal-600" />;
  };

  return (
    <div className="overflow-hidden rounded-lg border border-metal-600 bg-metal-800">
      {/* Header */}
      <div className="bg-metal-700 px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform",
                  !isExpanded && "-rotate-90"
                )}
              />
              <span className="font-display text-sm font-semibold text-foreground">
                Test Results
              </span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            {isRunning && onCancelTests && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onCancelTests}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            )}
            {onRunTests && (
              <Button 
                variant="default" 
                size="sm" 
                onClick={onRunTests}
                disabled={isRunning}
              >
                {isRunning ? (
                  <>
                    <Clock className="h-4 w-4 animate-spin mr-2" />
                    Running...
                  </>
                ) : (
                  'Run Tests'
                )}
              </Button>
            )}
          </div>
        </div>
        {/* Test Results Summary - Always visible below button */}
        {results && (
          <div className="flex items-center gap-4 text-sm">
            <span className="font-body text-success">
              {passedCount} passed
            </span>
            {failedCount > 0 && (
              <span className="font-body text-destructive">
                {failedCount} failed
              </span>
            )}
            <span className="font-body text-muted-foreground">
              {totalCount} total
            </span>
          </div>
        )}
      </div>

      {/* Results List */}
      {isExpanded && (
        <div className="divide-y divide-metal-700">
          {tests.map((test) => {
            const result = getTestResult(test.name);
            const isHidden = test.hidden && !result;
            
            if (isHidden) {
              return null;
            }

            return (
              <div
                key={test.name}
                className={cn(
                  "px-4 py-3 transition-colors",
                  result && !result.passed && "bg-destructive/5"
                )}
              >
                <div className="flex items-center gap-3">
                  {statusIcon(result, isRunning)}
                  <span className="flex-1 font-mono text-sm text-foreground">
                    {test.name}
                  </span>
                  {result?.output && (
                    <span className="font-mono text-xs text-muted-foreground">
                      {result.output}
                    </span>
                  )}
                </div>
                <div className="mt-1 ml-7 text-xs text-muted-foreground">
                  {test.description}
                </div>
                {result && !result.passed && result.error && (
                  <div className="mt-2 ml-7 rounded bg-destructive/10 p-2">
                    <pre className="font-mono text-xs text-destructive">
                      {result.error}
                    </pre>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export const TestPanel = memo(TestPanelComponent);
