import { Editor } from '@monaco-editor/react';
import { useTheme } from './useTheme';

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  language: string;
}

export function CodeEditor({ code, onChange, language }: CodeEditorProps) {
  const theme = useTheme();

  return (
    <div className="border border-gray-700 rounded overflow-hidden">
      <Editor
        height="500px"
        language={language}
        value={code}
        onChange={(value) => onChange(value || '')}
        theme={theme === 'dark' ? 'vs-dark' : 'light'}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 4,
          wordWrap: 'on',
        }}
      />
    </div>
  );
}
