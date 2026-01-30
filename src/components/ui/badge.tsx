import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold font-body uppercase tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground border-border",
        success:
          "border-transparent bg-success text-success-foreground",
        warning:
          "border-transparent bg-warning text-warning-foreground",
        beginner:
          "border-rust-400/30 bg-rust-400/20 text-rust-200",
        intermediate:
          "border-rust-500/30 bg-rust-500/20 text-rust-300",
        advanced:
          "border-destructive/30 bg-destructive/20 text-rust-100",
        locked:
          "border-metal-500/30 bg-metal-600/30 text-metal-300",
        "in-progress":
          "border-rust-400/50 bg-rust-500/20 text-rust-200",
        completed:
          "border-success/50 bg-success/20 text-success",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- badgeVariants is design API
export { Badge, badgeVariants };
