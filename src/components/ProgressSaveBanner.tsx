import { useState, useEffect } from 'react';

const EVENT_NAME = 'freerustcamp-progress-save-error';

/**
 * Listens for progress save failures and shows a small banner so the user knows
 * progress may not have been saved (e.g. localStorage quota exceeded).
 */
export function ProgressSaveBanner(): JSX.Element | null {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (): void => setShow(true);
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }, []);

  if (!show) return null;

  return (
    <div
      role="alert"
      className="px-4 py-2 text-sm bg-destructive/15 text-destructive border-b border-destructive/30 flex items-center justify-between gap-4"
    >
      <span>Progress could not be saved. Free some browser storage or try again.</span>
      <button
        type="button"
        onClick={() => setShow(false)}
        className="shrink-0 underline hover:no-underline"
        aria-label="Dismiss"
      >
        Dismiss
      </button>
    </div>
  );
}
