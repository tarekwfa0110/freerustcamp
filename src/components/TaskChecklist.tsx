import React from 'react';
import { Check, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskInstruction {
  text: string;
  command?: string; // Extracted command to check (e.g., "cargo run -- 32 F")
  codePattern?: string; // Code pattern to check (e.g., "env::args()")
  completed: boolean;
}

interface TaskChecklistProps {
  taskText: string;
  terminalCommands: string[];
  code?: string;
}

/**
 * Parses task text to extract individual instructions
 * Looks for:
 * - Terminal commands in backticks (e.g., `cargo run -- 32 F`)
 * - Code patterns mentioned in instructions
 * - List items with commands
 */
function parseTaskInstructions(taskText: string): TaskInstruction[] {
  const instructions: TaskInstruction[] = [];
  
  // First, check for code-related instructions (usually comes first)
  const codePatterns = [
    /add\s+(?:the\s+)?code/i,
    /write\s+code/i,
    /create\s+(?:a\s+)?function/i,
    /define\s+(?:a\s+)?(?:struct|enum|function)/i,
  ];
  
  for (const pattern of codePatterns) {
    if (pattern.test(taskText)) {
      // Try to extract code pattern from task text (look for rust code blocks first)
      const codeBlockMatch = taskText.match(/```rust\n([\s\S]*?)```/);
      if (codeBlockMatch) {
        const codeContent = codeBlockMatch[1].trim();
        // Extract the key pattern (e.g., "env::args()" or "Vec<String>")
        const keyPattern = codeContent.match(/(env::args\(\)|Vec<String>|\.collect\(\))/)?.[0] || codeContent.split('\n')[0];
        
        instructions.push({
          text: 'Add the required code',
          codePattern: keyPattern,
          completed: false,
        });
        break;
      } else {
        // No code block, but task mentions adding code - infer pattern from task text
        // Look for keywords in the task text to determine what code to check for
        if (taskText.includes('command-line arguments') || taskText.includes('env::args') || taskText.includes('args')) {
          instructions.push({
            text: 'Add the code to collect command-line arguments',
            codePattern: 'env::args()',
            completed: false,
          });
          break;
        } else if (taskText.includes('vector') || taskText.includes('Vec')) {
          instructions.push({
            text: 'Add the code',
            codePattern: 'Vec<String>',
            completed: false,
          });
          break;
        }
      }
    }
  }
  
  // Remove markdown code blocks for command parsing (but keep track of code content)
  const codeBlocks: string[] = [];
  const codeBlockPattern = /```rust\n([\s\S]*?)```/g;
  let codeBlockMatch;
  while ((codeBlockMatch = codeBlockPattern.exec(taskText)) !== null) {
    codeBlocks.push(codeBlockMatch[1].trim());
  }
  const withoutCodeBlocks = taskText.replace(/```[\s\S]*?```/g, '');
  
  // Pattern 1: Find ALL commands in backticks (inline code)
  const commandPattern = /`([^`]+)`/g;
  const commands: string[] = [];
  let match;
  
  while ((match = commandPattern.exec(withoutCodeBlocks)) !== null) {
    const cmd = match[1].trim();
    // Filter out non-command patterns (like variable names, types, etc.)
    // But include cargo commands, cd commands, and commands with arguments
    const isCommand = 
      cmd.includes('cargo') || 
      cmd.includes('cd ') || 
      (cmd.includes('run') && (cmd.includes('cargo') || cmd.startsWith('run'))) ||
      cmd.match(/^[a-z]+\s+[a-z]+/) || 
      (cmd.includes('--') && cmd.includes('cargo')) ||
      cmd.match(/^cargo\s+/);
    
    if (isCommand && !commands.includes(cmd)) {
      commands.push(cmd);
    }
  }
  
  // Pattern 2: Find list items (lines starting with - or *)
  const lines = taskText.split('\n');
  const listItems: string[] = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    // Check for markdown list items
    if (trimmed.match(/^[-*]\s+/) || trimmed.match(/^\d+\.\s+/)) {
      // Extract command from list item if it contains backticks
      const cmdMatch = trimmed.match(/`([^`]+)`/);
      if (cmdMatch) {
        const cmd = cmdMatch[1].trim();
        if ((cmd.includes('cargo') || cmd.includes('cd ') || cmd.includes('run')) && !listItems.includes(cmd)) {
          listItems.push(cmd);
        }
      }
    }
  }
  
  // Combine and deduplicate commands
  const allCommands = [...new Set([...commands, ...listItems])];
  
  // Create instructions from commands
  for (const cmd of allCommands) {
    // Extract the base command (remove descriptions in parentheses)
    const baseCommand = cmd.split('(')[0].trim();
    
    instructions.push({
      text: cmd,
      command: baseCommand,
      completed: false,
    });
  }
  
  // If no instructions found at all, create a single instruction from the task
  if (instructions.length === 0) {
    instructions.push({
      text: taskText.split('\n')[0] || 'Complete the task',
      completed: false,
    });
  }
  
  return instructions;
}

/**
 * Checks if a terminal command matches the instruction command
 */
function matchesCommand(instruction: TaskInstruction, terminalCommands: string[]): boolean {
  if (!instruction.command) return false;
  
  const normalizedInstruction = instruction.command.toLowerCase().trim();
  
  return terminalCommands.some(cmd => {
    const normalizedCmd = cmd.toLowerCase().trim();
    
    // Exact match
    if (normalizedCmd === normalizedInstruction) return true;
    
    // Check if command contains the instruction (for partial matches)
    // e.g., "cargo run -- 32 F" matches "cargo run -- 32 F"
    if (normalizedCmd.includes(normalizedInstruction) || 
        normalizedInstruction.includes(normalizedCmd)) {
      return true;
    }
    
    // For cargo run commands, check if arguments match
    if (normalizedInstruction.includes('cargo run') && normalizedCmd.includes('cargo run')) {
      // Extract arguments from both
      const instructionArgs = normalizedInstruction.replace('cargo run', '').trim();
      const cmdArgs = normalizedCmd.replace('cargo run', '').trim();
      
      // If instruction has specific args, check if cmd has them
      if (instructionArgs && cmdArgs.includes(instructionArgs)) {
        return true;
      }
      // If instruction is just "cargo run", any cargo run matches
      if (!instructionArgs && normalizedCmd.includes('cargo run')) {
        return true;
      }
    }
    
    return false;
  });
}

/**
 * Checks if code contains the required pattern
 */
function matchesCodePattern(instruction: TaskInstruction, code: string): boolean {
  if (!instruction.codePattern) return false;
  
  const normalizedPattern = instruction.codePattern.toLowerCase().trim();
  const normalizedCode = code.toLowerCase();
  
  // Check if code contains the pattern
  // For patterns like "env::args()", also check for "std::env::args()"
  if (normalizedPattern.includes('env::args')) {
    return normalizedCode.includes('env::args') || normalizedCode.includes('std::env::args');
  }
  
  // For Vec<String>, check for the type annotation
  if (normalizedPattern.includes('vec<string>')) {
    return normalizedCode.includes('vec<string>') || normalizedCode.includes('vec< string>');
  }
  
  // For .collect(), check for the method call
  if (normalizedPattern.includes('.collect()')) {
    return normalizedCode.includes('.collect()');
  }
  
  // General pattern matching
  return normalizedCode.includes(normalizedPattern);
}

export function TaskChecklist({ taskText, terminalCommands, code = '' }: TaskChecklistProps) {
  const instructions = React.useMemo(() => {
    return parseTaskInstructions(taskText);
  }, [taskText]);
  
  // Check completion status for each instruction
  const checkedInstructions = React.useMemo(() => {
    return instructions.map(instruction => ({
      ...instruction,
      completed: instruction.command
        ? matchesCommand(instruction, terminalCommands)
        : instruction.codePattern
        ? matchesCodePattern(instruction, code)
        : false,
    }));
  }, [instructions, terminalCommands, code]);
  
  if (checkedInstructions.length === 0) {
    return null;
  }
  
  return (
    <div className="space-y-2">
      {checkedInstructions.map((instruction, index) => (
        <div
          key={index}
          className={cn(
            "flex items-start gap-2 p-2 rounded-md transition-colors",
            instruction.completed
              ? "bg-green-500/10 border border-green-500/20"
              : "bg-yellow-500/5 border border-yellow-500/10"
          )}
        >
          <div className="flex-shrink-0 mt-0.5">
            {instruction.completed ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : (
              <Circle className="h-5 w-5 text-yellow-500/50" />
            )}
          </div>
          <div className="flex-1">
            <div
              className={cn(
                "text-sm",
                instruction.completed
                  ? "text-green-200"
                  : "text-yellow-200"
              )}
            >
              {instruction.command ? (
                <div className="flex items-center gap-2">
                  <span className={instruction.completed ? "line-through opacity-70" : ""}>
                    Run:
                  </span>
                  <code className="font-mono bg-yellow-800/50 text-yellow-100 px-1.5 py-0.5 rounded text-xs border border-yellow-700/50">
                    {instruction.command}
                  </code>
                </div>
              ) : instruction.codePattern ? (
                <div className={instruction.completed ? "line-through opacity-70" : ""}>
                  {instruction.text}
                </div>
              ) : (
                <div className={instruction.completed ? "line-through opacity-70" : ""}>
                  {instruction.text}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
