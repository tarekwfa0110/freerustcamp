import { useState, useEffect } from 'react';
import { Challenge, MicroChallenge, PracticeProject } from '@/types/challenge';
import { CodeEditor } from './CodeEditor';
import { TestPanel } from './TestPanel';
import { runTests, checkCodeQuality } from '@/lib/test-runner';
import { markChallengeComplete, updateChallengeAttempt, loadProgress } from '@/lib/progress';
import { TestResult } from '@/lib/test-runner';
import { Clock, Lightbulb, CheckCircle } from 'lucide-react';

interface ChallengeViewProps {
  challenge: Challenge;
  section: { id: number; title: string };
}

// Type guards
function isMicroChallenge(challenge: Challenge): challenge is MicroChallenge {
  return 'starter_code' in challenge && 'explanation' in challenge && 'task' in challenge;
}

function hasTests(challenge: Challenge): challenge is MicroChallenge | PracticeProject {
  return 'tests' in challenge;
}

export function ChallengeView({ challenge, section }: ChallengeViewProps) {
  const starterCode = isMicroChallenge(challenge) 
    ? challenge.starter_code 
    : 'type' in challenge && challenge.type === 'practice'
    ? challenge.starter_code
    : '// No starter code for certification projects';
  
  const [code, setCode] = useState(starterCode);
  const [testResults, setTestResults] = useState<TestResult[] | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const progress = loadProgress();
  const isCompleted = progress.completedChallenges.includes(challenge.id);

  useEffect(() => {
    // Load saved code if available
    const saved = progress.challengeProgress[challenge.id]?.code;
    if (saved) {
      setCode(saved);
    }
  }, [challenge.id, progress]);

  useEffect(() => {
    // Track time spent
    const startTime = Date.now();
    const interval = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleRunTests = async () => {
    if (!hasTests(challenge)) {
      return;
    }

    setIsRunning(true);
    updateChallengeAttempt(challenge.id, code);

    try {
      const result = await runTests(code, challenge.tests);

      // Process results - check code quality tests
      const processedResults = result.results.map((testResult) => {
        const test = hasTests(challenge) ? challenge.tests.find((t) => t.name === testResult.name) : undefined;
        if (test && test.type === 'code_quality' && test.check) {
          const passed = checkCodeQuality(code, test.check);
          return {
            ...testResult,
            passed,
            error: passed ? undefined : `Code quality check failed: ${test.check}`,
          };
        }
        return testResult;
      });

      setTestResults(processedResults);

      // Check if all tests passed
      if (processedResults.every((r) => r.passed)) {
        markChallengeComplete(challenge.id, code, timeSpent);
      }
    } catch (error) {
      console.error('Test execution error:', error);
      setTestResults([
        {
          name: 'execution_error',
          passed: false,
          error: 'Failed to run tests. Please try again.',
        },
      ]);
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(starterCode);
    setTestResults(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <a
          href="/challenges"
          className="text-orange-500 hover:text-orange-400 mb-4 inline-block"
        >
          ← Back to Challenges
        </a>
        {isCompleted && (
          <div className="flex items-center gap-2 text-green-500 mb-4">
            <CheckCircle className="w-5 h-5" />
            <span>Challenge Completed!</span>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column: Instructions and Editor */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{challenge.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>Section {section.id}: {section.title}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {challenge.estimated_time} min
                  </span>
                  <span className="capitalize">{challenge.difficulty}</span>
                </div>
              </div>
            </div>

            {isMicroChallenge(challenge) && (
              <>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">Explanation</h2>
                  <p className="text-gray-300 whitespace-pre-line">{challenge.explanation}</p>
                </div>

                <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">Task</h2>
                  <p className="text-gray-300 whitespace-pre-line">{challenge.task}</p>
                </div>
              </>
            )}

            {'description' in challenge && (
              <>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">Description</h2>
                  <p className="text-gray-300 whitespace-pre-line">{challenge.description}</p>
                </div>

                {'user_stories' in challenge && challenge.user_stories && (
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">User Stories</h2>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      {challenge.user_stories.map((story, idx) => (
                        <li key={idx}>{story}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {'milestones' in challenge && challenge.milestones && (
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Milestones</h2>
                    <ul className="list-none text-gray-300 space-y-1">
                      {challenge.milestones.map((milestone, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-gray-500">□</span>
                          <span>{milestone}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            {challenge.concepts && challenge.concepts.length > 0 && (
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Concepts</h2>
                <div className="flex flex-wrap gap-2">
                  {challenge.concepts.map((concept) => (
                    <span
                      key={concept}
                      className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-sm"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {'hints' in challenge && challenge.hints && challenge.hints.length > 0 && (
              <div className="mb-4">
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="flex items-center gap-2 text-orange-500 hover:text-orange-400"
                >
                  <Lightbulb className="w-5 h-5" />
                  <span>{showHints ? 'Hide' : 'Show'} Hints</span>
                </button>
                {showHints && (
                  <div className="mt-2 space-y-2">
                    {challenge.hints.map((hint, idx) => (
                      <div key={idx} className="bg-gray-900 p-3 rounded text-sm text-gray-300">
                        <span className="font-semibold">Hint {hint.order}:</span> {hint.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={handleRunTests}
                disabled={isRunning}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRunning ? 'Running Tests...' : 'Run Tests'}
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
              >
                Reset Code
              </button>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Code Editor</h2>
            <CodeEditor code={code} onChange={setCode} language="rust" />
          </div>
        </div>

        {/* Right Column: Tests */}
        {hasTests(challenge) && (
          <div>
            <TestPanel
              tests={challenge.tests}
              results={testResults}
              isRunning={isRunning}
            />
          </div>
        )}
      </div>
    </div>
  );
}
