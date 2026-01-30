import { cn } from "@/lib/utils";

interface CircularProgressProps {
  /** Progress value 0–100 */
  value: number;
  /** Diameter in pixels */
  size?: number;
  /** Label shown in the center */
  label?: string;
  className?: string;
}

const STROKE_WIDTH = 8;

export function CircularProgress({
  value,
  size = 140,
  label,
  className,
}: CircularProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const radius = (size - STROKE_WIDTH) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clamped / 100) * circumference;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <svg
        width={size}
        height={size}
        className="-rotate-90"
        aria-hidden
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE_WIDTH}
          className="text-metal-600"
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="text-rust-500 transition-[stroke-dashoffset] duration-500 ease-out"
        />
      </svg>
      {label && (
        <span className="absolute inset-0 flex items-center justify-center font-display text-sm font-bold text-foreground">
          {label}
        </span>
      )}
    </div>
  );
}
