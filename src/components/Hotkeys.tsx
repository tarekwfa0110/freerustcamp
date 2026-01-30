import { useHotkeys } from 'react-hotkeys-hook';

interface HotkeysProps {
  onRunTests?: () => void;
  onReset?: () => void;
  onToggleTerminal?: () => void;
  onToggleTests?: () => void;
  onNextStep?: () => void;
  onPreviousStep?: () => void;
  canGoNext?: boolean;
  canGoPrevious?: boolean;
}

export function Hotkeys({
  onRunTests,
  onReset,
  onToggleTerminal,
  onToggleTests,
  onNextStep,
  onPreviousStep,
  canGoNext = false,
  canGoPrevious = false,
}: HotkeysProps) {
  // Run tests: Ctrl+Enter / Cmd+Enter
  useHotkeys(
    'ctrl+enter,meta+enter',
    (e) => {
      e.preventDefault();
      if (onRunTests) {
        onRunTests();
      }
    },
    { enableOnFormTags: true }
  );

  // Reset: Ctrl+R / Cmd+R
  useHotkeys(
    'ctrl+r,meta+r',
    (e) => {
      e.preventDefault();
      if (onReset) {
        onReset();
      }
    },
    { enableOnFormTags: true }
  );

  // Toggle terminal: Ctrl+` / Cmd+`
  useHotkeys(
    'ctrl+`,meta+`',
    (e) => {
      e.preventDefault();
      if (onToggleTerminal) {
        onToggleTerminal();
      }
    },
    { enableOnFormTags: true }
  );

  // Toggle tests: Ctrl+T / Cmd+T
  useHotkeys(
    'ctrl+t,meta+t',
    (e) => {
      e.preventDefault();
      if (onToggleTests) {
        onToggleTests();
      }
    },
    { enableOnFormTags: true }
  );

  // Next step: Ctrl+→ / Cmd+→
  useHotkeys(
    'ctrl+arrowright,meta+arrowright',
    (e) => {
      e.preventDefault();
      if (onNextStep && canGoNext) {
        onNextStep();
      }
    },
    { enableOnFormTags: true }
  );

  // Previous step: Ctrl+← / Cmd+←
  useHotkeys(
    'ctrl+arrowleft,meta+arrowleft',
    (e) => {
      e.preventDefault();
      if (onPreviousStep && canGoPrevious) {
        onPreviousStep();
      }
    },
    { enableOnFormTags: true }
  );

  // This component doesn't render anything
  return null;
}
