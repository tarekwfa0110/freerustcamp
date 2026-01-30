import { Editor } from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, Send, Wand2 } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  language: string;
  onRun?: () => void;
  onReset?: () => void;
  onSubmitStep?: () => void; // For practice projects: submit/check step (shows hints or advances)
  onNextStep?: () => void; // For practice projects: advance to next step (used by Next button)
  canGoNext?: boolean;
  canFocus?: boolean;
}

export function CodeEditor({ code, onChange, language, onRun, onReset, onSubmitStep, onNextStep, canGoNext, canFocus = true }: CodeEditorProps) {
  // Refs so the keyboard command always calls the latest handlers/state (avoids stale closure)
  const submitRef = useRef(onSubmitStep);
  const nextRef = useRef(onNextStep);
  const canGoNextRef = useRef(canGoNext);
  useEffect(() => {
    submitRef.current = onSubmitStep;
    nextRef.current = onNextStep;
    canGoNextRef.current = canGoNext;
  }, [onSubmitStep, onNextStep, canGoNext]);

  // Memoize editor options to prevent re-creation on every render
  const editorOptions = useMemo(() => ({
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: 'on' as const,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 4,
    wordWrap: 'on' as const,
    padding: { top: 16, bottom: 16 },
    fontFamily: 'JetBrains Mono',
    formatOnType: false,
    formatOnPaste: false,
    formatOnSave: false,
  }), []);

  // Handle keyboard shortcuts (Monaco editor API)
  const handleEditorMount = (
    editor: { addCommand: (keybinding: number, fn: () => void) => void },
    monaco: { KeyMod: { CtrlCmd: number }; KeyCode: { Enter: number } }
  ) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      // For practice projects: Ctrl+Enter submits/checks step (shows hints or advances)
      const onSubmit = submitRef.current;
      const onNext = nextRef.current;
      const canNext = canGoNextRef.current;
      if (onSubmit) {
        onSubmit();
      } else if (onNext && canNext) {
        // Fallback for certification projects or if onSubmitStep not provided
        onNext();
      }
    });
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-metal-600 bg-editor-bg min-h-0">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-metal-600 bg-metal-700 px-4 py-2 flex-shrink-0">
        <div className="flex items-center gap-3">
          {onRun && (
            <Button variant="editor" size="sm" onClick={onRun}>
              <Play className="h-4 w-4" />
              Run
            </Button>
          )}
          <Button 
            variant="editor" 
            size="sm"
            onClick={() => {
              // For practice projects: Submit checks step and shows hints or advances
              if (onSubmitStep) {
                onSubmitStep();
              } else if (onRun) {
                // For certification projects: Submit runs tests
                onRun();
              }
            }}
            title={onSubmitStep ? "Check step (Ctrl+Enter)" : "Submit solution"}
          >
            <Send className="h-4 w-4" />
            Submit
          </Button>
          {onReset && (
            <Button variant="ghost" size="sm" className="text-metal-300 hover:text-foreground" onClick={onReset}>
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          )}
          <Button variant="ghost" size="sm" className="text-metal-300 hover:text-foreground">
            <Wand2 className="h-4 w-4" />
            Format
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-metal-400">main.rs</span>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 overflow-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <Editor
          key={language}
          height="100%"
          language={language}
          value={code}
          onChange={(value) => onChange(value || '')}
          theme="vs-dark"
          options={{
            ...editorOptions,
            readOnly: !canFocus, // Prevent interaction when modals are open
          }}
          onMount={handleEditorMount}
        />
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between border-t border-metal-600 bg-metal-700 px-4 py-1.5 flex-shrink-0">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-metal-400">Rust</span>
          <span className="font-mono text-xs text-metal-400">UTF-8</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-metal-400">Ln 1, Col 1</span>
          <span className="font-mono text-xs text-success">Ready</span>
        </div>
      </div>
    </div>
  );
}
