import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Keyboard } from 'lucide-react';

interface Shortcut {
  keys: string[];
  description: string;
}

interface ShortcutsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shortcuts?: Shortcut[];
}

const defaultShortcuts: Shortcut[] = [
  { keys: ['Ctrl', 'Enter'], description: 'Run tests' },
  { keys: ['Ctrl', 'R'], description: 'Reset code' },
  { keys: ['Ctrl', '`'], description: 'Toggle terminal' },
  { keys: ['Ctrl', 'T'], description: 'Toggle tests panel' },
  { keys: ['Ctrl', '→'], description: 'Next step' },
  { keys: ['Ctrl', '←'], description: 'Previous step' },
];

export function ShortcutsModal({
  open,
  onOpenChange,
  shortcuts = defaultShortcuts,
}: ShortcutsModalProps) {
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  const formatKey = (key: string): string => {
    if (isMac) {
      return key.replace('Ctrl', '⌘').replace('Meta', '⌘');
    }
    return key;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <Keyboard className="h-6 w-6 text-rust-400" />
            <DialogTitle>Keyboard Shortcuts</DialogTitle>
          </div>
          <DialogDescription>
            Use these shortcuts to navigate and control the editor.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 mt-4">
          {shortcuts.map((shortcut, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-2 border-b border-metal-700 last:border-0"
            >
              <span className="text-sm text-muted-foreground">
                {shortcut.description}
              </span>
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key, keyIdx) => (
                  <React.Fragment key={keyIdx}>
                    <kbd className="px-2 py-1 text-xs font-semibold bg-metal-800 border border-metal-600 rounded">
                      {formatKey(key)}
                    </kbd>
                    {keyIdx < shortcut.keys.length - 1 && (
                      <span className="text-muted-foreground">+</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end mt-6">
          <Button onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
