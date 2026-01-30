import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionRowProps {
  showInstructions: boolean;
  showTerminal: boolean;
  showTests: boolean;
  onToggleInstructions: () => void;
  onToggleTerminal: () => void;
  onToggleTests: () => void;
  className?: string;
}

export function ActionRow({
  showInstructions,
  showTerminal,
  showTests,
  onToggleInstructions,
  onToggleTerminal,
  onToggleTests,
  className
}: ActionRowProps) {
  return (
    <div 
      className={cn(
        "h-12 border-b border-metal-600 bg-metal-800/70 px-4 flex items-center gap-2",
        className
      )}
      data-playwright-test-label="action-row"
    >
      <div className="flex items-center gap-2 flex-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleInstructions}
          className={cn(
            "h-8 px-3 gap-2",
            showInstructions 
              ? "bg-metal-700 text-foreground" 
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-label={showInstructions ? "Hide instructions" : "Show instructions"}
          aria-pressed={showInstructions}
        >
          {showInstructions ? (
            <Eye className="h-4 w-4" />
          ) : (
            <EyeOff className="h-4 w-4" />
          )}
          <span className="text-sm">Instructions</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleTerminal}
          className={cn(
            "h-8 px-3 gap-2",
            showTerminal 
              ? "bg-metal-700 text-foreground" 
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-label={showTerminal ? "Hide terminal" : "Show terminal"}
          aria-pressed={showTerminal}
        >
          {showTerminal ? (
            <Eye className="h-4 w-4" />
          ) : (
            <EyeOff className="h-4 w-4" />
          )}
          <span className="text-sm">Terminal</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleTests}
          className={cn(
            "h-8 px-3 gap-2",
            showTests 
              ? "bg-metal-700 text-foreground" 
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-label={showTests ? "Hide tests" : "Show tests"}
          aria-pressed={showTests}
        >
          {showTests ? (
            <Eye className="h-4 w-4" />
          ) : (
            <EyeOff className="h-4 w-4" />
          )}
          <span className="text-sm">Tests</span>
        </Button>
      </div>
    </div>
  );
}
