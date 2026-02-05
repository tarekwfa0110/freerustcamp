import confetti from 'canvas-confetti';

/**
 * Trigger a confetti celebration effect.
 * Used when completing a project or achieving a milestone.
 */
export function triggerConfetti(): void {
  // Fire confetti from the center
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });

  // Fire from left side
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
  }, 150);

  // Fire from right side
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });
  }, 300);
}
