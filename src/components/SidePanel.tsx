import React, { ReactElement, ReactNode } from 'react';

interface SidePanelProps {
  challengeTitle: ReactElement;
  challengeDescription: ReactElement;
  instructionsPanelRef: React.RefObject<HTMLDivElement>;
  toolPanel?: ReactNode;
}

export function SidePanel({
  challengeTitle,
  challengeDescription,
  instructionsPanelRef,
  toolPanel
}: SidePanelProps): JSX.Element {
  return (
    <div className="instructions-panel h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-metal-600 bg-metal-800/70 px-4 py-3 flex-shrink-0">
        {challengeTitle}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div ref={instructionsPanelRef} className="h-full">
          {challengeDescription}
        </div>
      </div>

      {/* Tool Panel */}
      {toolPanel && (
        <div className="border-t border-metal-600 bg-metal-800/50 flex-shrink-0">
          {toolPanel}
        </div>
      )}
    </div>
  );
}
