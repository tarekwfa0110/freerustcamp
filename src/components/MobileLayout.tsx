import React, { useState, useEffect, ReactElement } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Code, Terminal, TestTube } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  instructions: ReactElement;
  editor: ReactElement;
  terminal?: ReactElement;
  testOutput?: ReactElement;
  hasEditableBoundaries?: boolean;
}

const tabs = {
  instructions: 'instructions',
  editor: 'editor',
  terminal: 'terminal',
  tests: 'tests',
} as const;

type Tab = keyof typeof tabs;

export function MobileLayout({
  instructions,
  editor,
  terminal,
  testOutput,
  hasEditableBoundaries = false
}: MobileLayoutProps) {
  const [currentTab, setCurrentTab] = useState<Tab>(
    hasEditableBoundaries ? 'editor' : 'instructions'
  );

  // Keep the tool panel visible when mobile address bar and/or keyboard are in view
  const setToolPanelPosition = (): void => {
    // Detect the appearance of the mobile virtual keyboard
    if (visualViewport?.height && window.innerHeight > visualViewport.height) {
      // Keyboard is visible - adjust tool panel position if needed
      // This would be handled by a tool panel component if we add one
    } else {
      // Restore normal position
      if (visualViewport?.height !== undefined) {
        document.documentElement.style.height = '100%';
      }
    }
  };

  const isMobileDevice = (): boolean => {
    return /iPhone|Android.+Mobile/.exec(navigator.userAgent) !== null;
  };

  useEffect(() => {
    if (isMobileDevice()) {
      visualViewport?.addEventListener('resize', setToolPanelPosition);
    }

    return () => {
      if (isMobileDevice()) {
        visualViewport?.removeEventListener('resize', setToolPanelPosition);
        document.documentElement.style.height = '100%';
      }
    };
  }, []);

  const handleKeyDown = (): void => {
    // Track keyboard navigation for accessibility
  };

  const handleClick = (): void => {
    // Track mouse/touch interaction
  };

  return (
    <div className="mobile-layout h-full flex flex-col">
      <Tabs
        id="mobile-layout"
        className={cn(
          "flex-1 flex flex-col overflow-hidden",
          hasEditableBoundaries && 'has-editable-boundaries'
        )}
        onKeyDown={handleKeyDown}
        onMouseDown={handleClick}
        onTouchStart={handleClick}
        value={currentTab}
        onValueChange={(value) => setCurrentTab(value as Tab)}
      >
        <TabsList className="nav-lists flex-shrink-0 border-b border-metal-600 bg-metal-800/50">
          {!hasEditableBoundaries && (
            <TabsTrigger value={tabs.instructions} className="gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Instructions</span>
            </TabsTrigger>
          )}
          <TabsTrigger value={tabs.editor} className="gap-2">
            <Code className="h-4 w-4" />
            <span>Code</span>
          </TabsTrigger>
          {terminal && (
            <TabsTrigger value={tabs.terminal} className="gap-2">
              <Terminal className="h-4 w-4" />
              <span>Terminal</span>
            </TabsTrigger>
          )}
          {testOutput && (
            <TabsTrigger value={tabs.tests} className="gap-2">
              <TestTube className="h-4 w-4" />
              <span>Tests</span>
            </TabsTrigger>
          )}
        </TabsList>

        <div className="flex-1 overflow-hidden">
          {!hasEditableBoundaries && (
            <TabsContent
              tabIndex={-1}
              className="tab-content h-full overflow-y-auto"
              value={tabs.instructions}
            >
              {instructions}
            </TabsContent>
          )}

          <TabsContent
            tabIndex={-1}
            className="tab-content h-full overflow-hidden"
            value={tabs.editor}
          >
            <div className="h-full">
              {editor}
            </div>
          </TabsContent>

          {terminal && (
            <TabsContent
              tabIndex={-1}
              className="tab-content h-full overflow-y-auto"
              value={tabs.terminal}
            >
              <div className="h-full">
                {terminal}
              </div>
            </TabsContent>
          )}

          {testOutput && (
            <TabsContent
              tabIndex={-1}
              className="tab-content h-full overflow-y-auto"
              value={tabs.tests}
            >
              <div className="h-full">
                {testOutput}
              </div>
            </TabsContent>
          )}
        </div>
      </Tabs>
    </div>
  );
}
