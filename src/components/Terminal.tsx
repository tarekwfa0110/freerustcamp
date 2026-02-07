import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TerminalProps {
  code?: string;
  projectName?: string;
  className?: string;
  height?: number;
  isCollapsed?: boolean;
  onToggle?: () => void;
  onResizeStart?: (e: React.MouseEvent) => void;
  onCommandExecuted?: (command: string) => void;
}

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
  timestamp?: Date;
}

export function Terminal({ 
  code, 
  projectName = 'temp_project', 
  className, 
  height = 0,
  isCollapsed = true,
  onToggle,
  onResizeStart,
  onCommandExecuted 
}: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: `Welcome to FreeRustCamp Terminal` },
    { type: 'output', content: `Type 'help' for available commands` },
    { type: 'output', content: `Project: ${projectName}` },
    { type: 'output', content: '' },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDirectory, setCurrentDirectory] = useState('/home/user');
  const [createdDirectories, setCreatedDirectories] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  // Load persisted directories from progress on mount and when projectName changes
  useEffect(() => {
    // Extract challengeId from projectName
    // projectName comes as "002" from ChallengeView, need to convert to "project-002"
    const challengeId = projectName.startsWith('project-') || projectName.startsWith('cert-') 
      ? projectName 
      : `project-${projectName.padStart(3, '0')}`;
    
    // Import here to avoid circular dependency
    import('@/lib/progress').then(({ getCreatedDirectories }) => {
      const persistedDirs = getCreatedDirectories(challengeId);
      if (persistedDirs.length > 0) {
        setCreatedDirectories(new Set(persistedDirs));
      }
    });
  }, [projectName]);

  // Auto-scroll to bottom when new lines are added
  useEffect(() => {
    if (terminalRef.current && !isCollapsed) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines, isCollapsed]);

  // Focus input when terminal is clicked
  const handleTerminalClick = () => {
    if (!isCollapsed) {
      inputRef.current?.focus();
    }
  };

  // Validate Rust code for common compilation errors
  const validateRustCode = (code: string): { isValid: boolean; error?: { message: string; line: number; column: number } } => {
    if (!code || !code.trim()) {
      return { isValid: false, error: { message: 'No code to compile', line: 1, column: 1 } };
    }

    // Check for main function
    if (!code.includes('fn main()')) {
      return { isValid: false, error: { message: 'error[E0601]: `main` function not found in crate', line: 1, column: 1 } };
    }

    const lines = code.split('\n');
    
    // Check for missing semicolons after statements
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();
      const lineNum = i + 1;
      
      // Skip empty lines and comments
      if (!trimmedLine || trimmedLine.startsWith('//') || trimmedLine.startsWith('/*')) {
        continue;
      }
      
      // Skip function definitions and control flow (if, else, match, etc.)
      if (trimmedLine.match(/^\s*(fn|if|else|match|for|while|loop|unsafe|pub|struct|enum|impl|trait|mod)\s/)) {
        continue;
      }
      
      // Skip lines that end with opening brace (function/block start)
      if (trimmedLine.endsWith('{')) {
        continue;
      }
      
      // Check for println! without semicolon
      const printlnMatch = trimmedLine.match(/println!\s*\([^)]*\)/);
      if (printlnMatch) {
        // Skip match arms - they don't need semicolons (they end with commas)
        if (trimmedLine.includes('=>')) {
          // This is a match arm, skip semicolon check
        } else {
          const hasSemicolon = trimmedLine.endsWith(';');
          if (!hasSemicolon) {
            // Check if next line is a closing brace (last statement in function)
            const nextLine = i < lines.length - 1 ? lines[i + 1].trim() : '';
            if (nextLine !== '}') {
              // Missing semicolon - find the position
              const matchIndex = line.indexOf(printlnMatch[0]);
              const closingParenIndex = line.indexOf(')', matchIndex);
              return {
                isValid: false,
                error: {
                  message: 'error: expected `;`, found newline',
                  line: lineNum,
                  column: (closingParenIndex >= 0 ? closingParenIndex + 2 : line.length + 1)
                }
              };
            }
          }
        }
      }
      
      // Check for let statements without semicolon
      const letMatch = trimmedLine.match(/^\s*let\s+/);
      if (letMatch && !trimmedLine.endsWith(';') && !trimmedLine.endsWith('{') && !trimmedLine.endsWith('}')) {
        const nextLine = i < lines.length - 1 ? lines[i + 1].trim() : '';
        if (nextLine !== '}' && !nextLine.startsWith('//')) {
          return {
            isValid: false,
            error: {
              message: 'error: expected `;`, found newline',
              line: lineNum,
              column: line.length + 1
            }
          };
        }
      }
    }

    return { isValid: true };
  };

  // Handle command execution
  const executeCommand = async (command: string) => {
    const trimmedCommand = command.trim();
    if (!trimmedCommand) return;

    // Add command to history
    setCommandHistory((prev) => [...prev, trimmedCommand]);
    setHistoryIndex(-1);

    // Add command to output
    setLines((prev) => [...prev, { type: 'input', content: `user@freerustcamp:${currentDirectory}$ ${trimmedCommand}` }]);

    // Notify parent component about command execution
    if (onCommandExecuted) {
      onCommandExecuted(trimmedCommand);
    }

    // Parse command
    const [cmd, ...args] = trimmedCommand.split(' ');

    // Simulate command execution
    let output: TerminalLine[] = [];

    switch (cmd) {
      case 'help':
        output = [
          { type: 'output', content: 'Available commands:' },
          { type: 'output', content: '  cargo new <name>     - Create a new Rust project' },
          { type: 'output', content: '  cargo build          - Build the project' },
          { type: 'output', content: '  cargo run [-- args]  - Build and run the project with args' },
          { type: 'output', content: '  cargo check          - Check code without building' },
          { type: 'output', content: '  cargo test           - Run tests' },
          { type: 'output', content: '  cargo clean          - Remove build artifacts' },
          { type: 'output', content: '  cargo --version      - Show cargo version' },
          { type: 'output', content: '  ls / dir             - List directory contents' },
          { type: 'output', content: '  pwd                  - Print working directory' },
          { type: 'output', content: '  clear                - Clear terminal' },
          { type: 'output', content: '  help                 - Show this help message' },
        ];
        break;

      case 'cargo':
        if (args[0] === 'new' && args[1]) {
          // Create the directory in our virtual filesystem
          const newDirPath = `${currentDirectory}/${args[1]}`;
          setCreatedDirectories((prev) => {
            const updated = new Set([...prev, newDirPath]);
            // Persist to progress storage
            const challengeId = projectName.startsWith('project-') || projectName.startsWith('cert-') 
              ? projectName 
              : `project-${projectName.padStart(3, '0')}`;
            import('@/lib/progress').then(({ addCreatedDirectory }) => {
              addCreatedDirectory(challengeId, newDirPath);
            });
            return updated;
          });
          output = [
            { type: 'output', content: `     Created binary (application) package \`${args[1]}\`` },
            { type: 'output', content: '' },
          ];
        } else if (args[0] === 'build') {
          // Simulate compilation
          output = [
            { type: 'output', content: `   Compiling ${projectName} v0.1.0` },
            { type: 'output', content: '    Finished dev [unoptimized + debuginfo] target(s) in 0.5s' },
            { type: 'output', content: '' },
          ];
        } else if (args[0] === 'run') {
          // Extract command-line arguments (everything after --)
          const dashDashIndex = args.indexOf('--');
          const runArgs = dashDashIndex >= 0 ? args.slice(dashDashIndex + 1) : [];

          // Check if real execution API is available
          const EXECUTION_API_URL = import.meta.env.VITE_EXECUTION_API_URL as string | undefined;
          
          if (EXECUTION_API_URL && code) {
            // Use real Rust execution
            output.push(
              { type: 'output', content: `   Compiling ${projectName} v0.1.0` },
            );
            
            try {
              const base = EXECUTION_API_URL.replace(/\/$/, '');
              const response = await fetch(`${base}/api/run`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, args: runArgs }),
              });
              
              if (!response.ok) {
                const text = await response.text();
                output.push(
                  { type: 'error', content: `Execution server error (${response.status}): ${text || response.statusText}` },
                );
                return;
              }
              
              const result = await response.json();
              
              if (result.compilationError) {
                // Compilation failed
                const errorLines = result.compilationError.split('\n');
                errorLines.forEach((line: string) => {
                  if (line.trim()) {
                    output.push({ type: 'error', content: line });
                  }
                });
                output.push({ type: 'error', content: '' });
                output.push({ type: 'error', content: 'error: could not compile `temp_project` (exit code: 1)' });
              } else {
                // Compilation succeeded
                output.push(
                  { type: 'output', content: '    Finished dev [unoptimized + debuginfo] target(s) in 0.5s' },
                  { type: 'output', content: `     Running \`target/debug/${projectName}${runArgs.length > 0 ? ' ' + runArgs.join(' ') : ''}\`` },
                  { type: 'output', content: '' },
                );
                
                // Print stdout
                if (result.stdout) {
                  const stdoutLines = result.stdout.split('\n');
                  stdoutLines.forEach((line: string) => {
                    if (line.trim() || stdoutLines.indexOf(line) === stdoutLines.length - 1) {
                      output.push({ type: 'output', content: line });
                    }
                  });
                }
                
                // Print stderr if any
                if (result.stderr) {
                  const stderrLines = result.stderr.split('\n');
                  stderrLines.forEach((line: string) => {
                    if (line.trim()) {
                      output.push({ type: 'error', content: line });
                    }
                  });
                }
              }
            } catch (err) {
              if (err instanceof TypeError && err.message.includes('fetch')) {
                // Network error - server probably not running
                output.push(
                  { type: 'error', content: 'Failed to connect to execution server.' },
                  { type: 'error', content: 'Make sure the server is running: bun run server' },
                );
              } else {
                output.push(
                  { type: 'error', content: `Error: ${err instanceof Error ? err.message : 'Failed to execute code'}` },
                );
              }
            }
          } else {
            // Fallback to simulation if API not available
            output.push(
              { type: 'output', content: `   Compiling ${projectName} v0.1.0` },
            );

            if (code) {
              const validation = validateRustCode(code);
              
              if (!validation.isValid && validation.error) {
                const { message, line, column } = validation.error;
                output.push(
                  { type: 'error', content: message },
                  { type: 'error', content: ` --> src/main.rs:${line}:${column}` },
                  { type: 'error', content: '  |' },
                  { type: 'error', content: `${line} | ${code.split('\n')[line - 1] || ''}` },
                  { type: 'error', content: `  | ${' '.repeat(column - 1)}^` },
                  { type: 'error', content: '' },
                  { type: 'error', content: 'error: could not compile `temp_project` (exit code: 1)' },
                  { type: 'error', content: '' },
                );
              } else {
                // Code compiles, simulate execution
                output.push(
                  { type: 'output', content: '    Finished dev [unoptimized + debuginfo] target(s) in 0.5s' },
                  { type: 'output', content: `     Running \`target/debug/${projectName}${runArgs.length > 0 ? ' ' + runArgs.join(' ') : ''}\`` },
                  { type: 'output', content: '' },
                );

                // Try to extract println! outputs from code
                const printlnMatches = code.match(/println!\s*\(\s*"([^"]+)"\s*\)/g);
                if (printlnMatches) {
                  printlnMatches.forEach((match) => {
                    const content = match.match(/"([^"]+)"/)?.[1] || '';
                    if (content) {
                      output.push({ type: 'output', content });
                    }
                  });
                } else {
                  output.push({ type: 'output', content: '(Program executed - no output)' });
                }

                // Show arguments if provided
                if (runArgs.length > 0) {
                  output.push({ type: 'output', content: `(Command-line arguments: ${runArgs.join(', ')})` });
                }
              }
            } else {
              output.push(
                { type: 'output', content: '    Finished dev [unoptimized + debuginfo] target(s) in 0.5s' },
                { type: 'output', content: `     Running \`target/debug/${projectName}\`` },
                { type: 'output', content: '' },
                { type: 'output', content: '(No code to run)' },
              );
            }
          }
        } else if (args[0] === 'check') {
          output = [
            { type: 'output', content: `    Checking ${projectName} v0.1.0` },
          ];
          
          if (code) {
            const validation = validateRustCode(code);
            if (!validation.isValid && validation.error) {
              const { message, line, column } = validation.error;
              output.push(
                { type: 'error', content: message },
                { type: 'error', content: ` --> src/main.rs:${line}:${column}` },
                { type: 'error', content: '  |' },
                { type: 'error', content: `${line} | ${code.split('\n')[line - 1] || ''}` },
                { type: 'error', content: `  | ${' '.repeat(column - 1)}^` },
                { type: 'error', content: '' },
                { type: 'error', content: 'error: could not compile `temp_project` (exit code: 1)' },
                { type: 'error', content: '' },
              );
            } else {
              output.push(
                { type: 'output', content: '    Finished dev [unoptimized + debuginfo] target(s) in 0.3s' },
                { type: 'output', content: '' },
              );
            }
          } else {
            output.push(
              { type: 'output', content: '    Finished dev [unoptimized + debuginfo] target(s) in 0.3s' },
              { type: 'output', content: '' },
            );
          }
        } else if (args[0] === 'test') {
          output = [
            { type: 'output', content: `   Compiling ${projectName} v0.1.0` },
            { type: 'output', content: '    Finished test [unoptimized + debuginfo] target(s) in 0.4s' },
            { type: 'output', content: '     Running unittests src/main.rs' },
            { type: 'output', content: '' },
            { type: 'output', content: 'running 0 tests' },
            { type: 'output', content: '' },
            { type: 'output', content: 'test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out' },
            { type: 'output', content: '' },
          ];
        } else if (args[0] === 'clean') {
          output = [
            { type: 'output', content: '   Removing target directory' },
            { type: 'output', content: '' },
          ];
        } else if (args[0] === '--version' || args[0] === '-V') {
          output = [
            { type: 'output', content: 'cargo 1.75.0 (1d8b05cdd 2024-01-25)' },
            { type: 'output', content: '' },
          ];
        } else {
          output = [
            { type: 'error', content: `error: unknown subcommand: \`${args[0] || 'none'}\`` },
            { type: 'error', content: '' },
            { type: 'error', content: 'Run `cargo --help` for more information.' },
          ];
        }
        break;

      case 'clear':
        setLines([
          { type: 'output', content: `Welcome to FreeRustCamp Terminal` },
          { type: 'output', content: `Type 'help' for available commands` },
          { type: 'output', content: '' },
        ]);
        return;

      case 'cd':
        if (!args[0]) {
          output = [{ type: 'error', content: 'cd: missing directory argument' }];
        } else {
          const targetDir = args[0];
          let newPath = currentDirectory;
          
          if (targetDir === '..') {
            // Go up one level
            const parts = currentDirectory.split('/').filter(p => p);
            if (parts.length > 1) {
              parts.pop();
              newPath = '/' + parts.join('/');
            } else {
              newPath = '/';
            }
            setCurrentDirectory(newPath);
            output = [];
          } else if (targetDir.startsWith('/')) {
            // Absolute path
            if (targetDir === '/home/user' || targetDir.startsWith('/home/user/')) {
              newPath = targetDir;
              setCurrentDirectory(newPath);
              output = [];
            } else {
              output = [{ type: 'error', content: `cd: ${targetDir}: No such file or directory` }];
            }
          } else {
            // Relative path
            const targetPath = currentDirectory === '/' 
              ? `/${targetDir}` 
              : `${currentDirectory}/${targetDir}`;
            
            // Check if directory exists in local state
            let isValidDir = createdDirectories.has(targetPath);
            
            // If not found locally, check persisted directories
            if (!isValidDir) {
              try {
                const progress = JSON.parse(localStorage.getItem('freerustcamp-progress') || '{}');
                const challengeId = projectName.startsWith('project-') || projectName.startsWith('cert-') 
                  ? projectName 
                  : `project-${projectName.padStart(3, '0')}`;
                const challengeProgress = progress.challengeProgress?.[challengeId];
                const persistedDirs = challengeProgress?.createdDirectories || [];
                if (persistedDirs.includes(targetPath)) {
                  // Add to local state if found in persisted
                  setCreatedDirectories((prev) => new Set([...prev, targetPath]));
                  isValidDir = true;
                }
              } catch {
                // Ignore errors
              }
            }
            
            if (isValidDir) {
              newPath = targetPath;
              setCurrentDirectory(newPath);
              output = [];
            } else {
              output = [{ type: 'error', content: `cd: ${targetDir}: No such file or directory` }];
            }
          }
        }
        break;

      case 'ls':
      case 'dir':
        // Show directory contents based on current directory
        if (currentDirectory === '/home/user') {
          // Root directory - show created projects
          const projects = Array.from(createdDirectories)
            .map(dir => dir.split('/').pop() || '')
            .filter(Boolean);
          if (projects.length > 0) {
            output = projects.map(proj => ({ type: 'output', content: `${proj}/` }));
            output.push({ type: 'output', content: '' });
          } else {
            output = [{ type: 'output', content: '' }];
          }
        } else if (currentDirectory.includes('temp_converter')) {
          // Inside project directory
          output = [
            { type: 'output', content: 'Cargo.toml' },
            { type: 'output', content: 'src/' },
            { type: 'output', content: '  main.rs' },
            { type: 'output', content: '' },
          ];
        } else {
          output = [{ type: 'output', content: '' }];
        }
        break;

      case 'pwd':
        output = [{ type: 'output', content: currentDirectory }];
        break;

      default:
        output = [
          { type: 'error', content: `command not found: ${cmd}` },
          { type: 'error', content: `Type 'help' for available commands` },
        ];
    }

    // Add output lines
    setLines((prev) => [...prev, ...output, { type: 'output', content: '' }]);
  };

  // Handle input submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      executeCommand(currentInput);
      setCurrentInput('');
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 
          ? commandHistory.length - 1 
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    }
  };

  const COLLAPSED_HEIGHT = 40;
  const MIN_HEIGHT = 150;
  const MAX_HEIGHT = 600;

  return (
    <div 
      className={cn('flex flex-col bg-metal-900 border-t border-metal-600 relative overflow-hidden', className)}
      style={{ height: `${isCollapsed ? COLLAPSED_HEIGHT : Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, height))}px` }}
    >
      {/* Resize Handle - Only visible when expanded */}
      {!isCollapsed && onResizeStart && (
        <div
          onMouseDown={onResizeStart}
          className="absolute top-0 left-0 right-0 h-1 bg-transparent hover:bg-rust-500 cursor-row-resize z-20 transition-colors"
        />
      )}

      {/* Terminal Header - Always visible */}
      <div 
        className="flex items-center justify-between px-4 py-2 border-b border-metal-600 bg-metal-800 flex-shrink-0 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          <TerminalIcon className="h-4 w-4 text-metal-400" />
          <span className="text-sm font-mono text-metal-300">Terminal</span>
          <span className="text-xs text-metal-500 ml-2">({projectName})</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-metal-400 hover:text-metal-200"
            onClick={(e) => {
              e.stopPropagation();
              onToggle?.();
            }}
          >
            {isCollapsed ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Terminal Content - Only visible when expanded */}
      {!isCollapsed && (
        <div
          ref={terminalRef}
          className="flex-1 overflow-y-auto p-4 font-mono text-sm"
          onClick={handleTerminalClick}
          style={{ height: `calc(100% - 40px)` }}
        >
          {lines.map((line, index) => (
            <div
              key={index}
              className={cn(
                'mb-1 whitespace-pre-wrap break-words',
                line.type === 'input' && 'text-green-400',
                line.type === 'output' && 'text-metal-200',
                line.type === 'error' && 'text-red-400'
              )}
            >
              {line.content}
            </div>
          ))}
          {/* Input Line */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <span className="text-green-400">user@freerustcamp:{currentDirectory}$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-metal-200 font-mono"
              autoFocus
              spellCheck={false}
            />
          </form>
        </div>
      )}
    </div>
  );
}
