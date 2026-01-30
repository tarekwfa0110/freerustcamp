import React, { ReactElement } from 'react';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import { ActionRow } from './ActionRow';
import type { HandlerProps } from 'react-reflex';

import 'react-reflex/styles.css';

interface Pane {
  flex: number;
}

interface DesktopLayoutProps {
  instructions: ReactElement;
  editor: ReactElement;
  terminal?: ReactElement;
  testOutput?: ReactElement;
  layoutState: {
    instructionPane: Pane;
    editorPane: Pane;
    terminalPane: Pane;
    testsPane: Pane;
  };
  resizeProps: {
    onResize: () => void;
    onStopResize: (event: HandlerProps) => void;
  };
  showInstructions: boolean;
  showTerminal: boolean;
  showTests: boolean;
  onToggleInstructions: () => void;
  onToggleTerminal: () => void;
  onToggleTests: () => void;
}

const reflexProps = {
  propagateDimensions: true
};

export function DesktopLayout({
  instructions,
  editor,
  terminal,
  testOutput,
  layoutState,
  resizeProps,
  showInstructions,
  showTerminal,
  showTests,
  onToggleInstructions,
  onToggleTerminal,
  onToggleTests
}: DesktopLayoutProps) {
  const {
    instructionPane,
    editorPane,
    terminalPane,
    testsPane
  } = layoutState;

  // Calculate editor pane flex based on visible panes
  const editorPaneFlex = 
    !showTerminal && !showTests ? 1 : editorPane.flex;

  return (
    <div className="desktop-layout h-full flex flex-col" data-playwright-test-label="desktop-layout">
      {/* Action Row - Toolbar with pane toggles */}
      <ActionRow
        showInstructions={showInstructions}
        showTerminal={showTerminal}
        showTests={showTests}
        onToggleInstructions={onToggleInstructions}
        onToggleTerminal={onToggleTerminal}
        onToggleTests={onToggleTests}
      />

      {/* Main Container */}
      <ReflexContainer
        orientation="vertical"
        className="flex-1 overflow-hidden"
        data-playwright-test-label="main-container"
      >
        {/* Instructions Pane */}
        {showInstructions && (
          <>
            <ReflexElement
              flex={instructionPane.flex}
              {...resizeProps}
              name="instructionPane"
              data-playwright-test-label="instruction-pane"
              className="overflow-hidden"
            >
              <div className="h-full overflow-y-auto">
                {instructions}
              </div>
            </ReflexElement>
            <ReflexSplitter propagate={true} {...resizeProps} />
          </>
        )}

        {/* Editor Pane */}
        <ReflexElement
          flex={editorPaneFlex}
          name="editorPane"
          {...resizeProps}
          data-playwright-test-label="editor-pane"
          className="editor-pane overflow-hidden"
        >
          <ReflexContainer
            orientation="horizontal"
            className="h-full"
          >
            {/* Code Editor */}
            <ReflexElement
              name="codePane"
              {...(showTerminal || showTests ? { flex: 1 } : {})}
              {...reflexProps}
              {...resizeProps}
              className="overflow-hidden"
            >
              <div className="h-full">
                {editor}
              </div>
            </ReflexElement>

            {/* Terminal Pane */}
            {showTerminal && (
              <>
                <ReflexSplitter propagate={true} {...resizeProps} />
                <ReflexElement
                  flex={terminalPane.flex}
                  name="terminalPane"
                  {...reflexProps}
                  {...resizeProps}
                  className="overflow-hidden"
                >
                  <div className="h-full">
                    {terminal}
                  </div>
                </ReflexElement>
              </>
            )}

            {/* Tests Pane */}
            {showTests && (
              <>
                {showTerminal && <ReflexSplitter propagate={true} {...resizeProps} />}
                <ReflexElement
                  flex={testsPane.flex}
                  name="testsPane"
                  {...reflexProps}
                  {...resizeProps}
                  className="overflow-hidden"
                >
                  <div className="h-full">
                    {testOutput}
                  </div>
                </ReflexElement>
              </>
            )}
          </ReflexContainer>
        </ReflexElement>
      </ReflexContainer>
    </div>
  );
}
