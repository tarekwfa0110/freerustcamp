import { Editor, OnMount } from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, Send, Wand2 } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';
import type { editor } from 'monaco-editor';

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  language: string;
  onRun?: () => void;
  onReset?: () => void;
  onSubmitStep?: () => void;
  onNextStep?: () => void;
  canGoNext?: boolean;
  canFocus?: boolean;
  onFormat?: () => void;
  highlightLine?: number; // Single line to highlight (1-indexed)
  editableRegion?: [number, number]; // Range of lines for editable region [startLine, endLine] (1-indexed, inclusive)
}

export function CodeEditor({ 
  code, 
  onChange, 
  language, 
  onRun, 
  onReset, 
  onSubmitStep, 
  onNextStep, 
  canGoNext, 
  canFocus = true, 
  onFormat, 
  highlightLine,
  editableRegion 
}: CodeEditorProps) {
  // Refs for keyboard handlers
  const submitRef = useRef(onSubmitStep);
  const nextRef = useRef(onNextStep);
  const canGoNextRef = useRef(canGoNext);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const decorationsRef = useRef<string[]>([]);
  
  useEffect(() => {
    submitRef.current = onSubmitStep;
    nextRef.current = onNextStep;
    canGoNextRef.current = canGoNext;
  }, [onSubmitStep, onNextStep, canGoNext]);

  // Apply line decorations when highlightLine or editableRegion changes
  useEffect(() => {
    const editorInstance = editorRef.current;
    if (!editorInstance) return;

    const model = editorInstance.getModel();
    if (!model) return;

    // Build new decorations array
    const newDecorations: editor.IModelDeltaDecoration[] = [];

    // Handle editable region (FCC-style range highlighting)
    if (editableRegion && editableRegion[0] > 0 && editableRegion[1] >= editableRegion[0]) {
      const [startLine, endLine] = editableRegion;
      const maxLine = model.getLineCount();
      
      // Clamp to valid range
      const clampedStart = Math.max(1, Math.min(startLine, maxLine));
      const clampedEnd = Math.max(clampedStart, Math.min(endLine, maxLine));

      newDecorations.push({
        range: {
          startLineNumber: clampedStart,
          startColumn: 1,
          endLineNumber: clampedEnd,
          endColumn: model.getLineLength(clampedEnd) + 1,
        },
        options: {
          isWholeLine: true,
          className: 'editable-region',
          linesDecorationsClassName: 'editable-line-decoration',
          // Stickiness ensures decoration grows when typing at edges
          stickiness: 1, // AlwaysGrowsWhenTypingAtEdges
        },
      });

      // Scroll to show the editable region
      editorInstance.revealLineInCenter(clampedStart);
    }
    // Handle single line highlight (simpler case)
    else if (highlightLine && highlightLine > 0) {
      const maxLine = model.getLineCount();
      const clampedLine = Math.max(1, Math.min(highlightLine, maxLine));

      newDecorations.push({
        range: {
          startLineNumber: clampedLine,
          startColumn: 1,
          endLineNumber: clampedLine,
          endColumn: 1,
        },
        options: {
          isWholeLine: true,
          className: 'highlight-line',
          linesDecorationsClassName: 'highlight-line-decoration',
        },
      });

      // Scroll to the highlighted line
      editorInstance.revealLineInCenter(clampedLine);
    }

    // Apply decorations (this replaces previous ones)
    decorationsRef.current = editorInstance.deltaDecorations(
      decorationsRef.current,
      newDecorations
    );
  }, [highlightLine, editableRegion, code]); // Re-apply when code changes (line count may change)

  // Memoize editor options
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
    glyphMargin: false, // We use linesDecorations instead (like FCC)
    lineDecorationsWidth: 15, // Width for the decoration bar
  }), []);

  // Handle editor mount
  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Add keyboard shortcut for submit
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      const onSubmit = submitRef.current;
      const onNext = nextRef.current;
      const canNext = canGoNextRef.current;
      if (onSubmit) {
        onSubmit();
      } else if (onNext && canNext) {
        onNext();
      }
    });

    // Apply initial decorations if set
    const model = editor.getModel();
    if (model) {
      const newDecorations: editor.IModelDeltaDecoration[] = [];

      if (editableRegion && editableRegion[0] > 0 && editableRegion[1] >= editableRegion[0]) {
        const [startLine, endLine] = editableRegion;
        const maxLine = model.getLineCount();
        const clampedStart = Math.max(1, Math.min(startLine, maxLine));
        const clampedEnd = Math.max(clampedStart, Math.min(endLine, maxLine));

        newDecorations.push({
          range: {
            startLineNumber: clampedStart,
            startColumn: 1,
            endLineNumber: clampedEnd,
            endColumn: model.getLineLength(clampedEnd) + 1,
          },
          options: {
            isWholeLine: true,
            className: 'editable-region',
            linesDecorationsClassName: 'editable-line-decoration',
            stickiness: 1,
          },
        });
        editor.revealLineInCenter(clampedStart);
      } else if (highlightLine && highlightLine > 0) {
        const maxLine = model.getLineCount();
        const clampedLine = Math.max(1, Math.min(highlightLine, maxLine));

        newDecorations.push({
          range: {
            startLineNumber: clampedLine,
            startColumn: 1,
            endLineNumber: clampedLine,
            endColumn: 1,
          },
          options: {
            isWholeLine: true,
            className: 'highlight-line',
            linesDecorationsClassName: 'highlight-line-decoration',
          },
        });
        editor.revealLineInCenter(clampedLine);
      }

      if (newDecorations.length > 0) {
        decorationsRef.current = editor.deltaDecorations([], newDecorations);
      }
    }
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
              if (onSubmitStep) {
                onSubmitStep();
              } else if (onRun) {
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
          {onFormat && (
            <Button variant="ghost" size="sm" className="text-metal-300 hover:text-foreground" onClick={onFormat}>
              <Wand2 className="h-4 w-4" />
              Format
            </Button>
          )}
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
            readOnly: !canFocus,
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
