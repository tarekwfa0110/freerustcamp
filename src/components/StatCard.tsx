import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtitle?: string;
  className?: string;
}

export function StatCard({ icon: Icon, label, value, subtitle, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border border-metal-600 bg-gradient-card p-5 transition-all duration-300 hover:border-rust-500/50 hover:shadow-rust",
        className
      )}
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-rust-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-rust-500/20">
          <Icon className="h-5 w-5 text-rust-300" />
        </div>
        <p className="font-body text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 font-display text-2xl font-bold text-foreground">{value}</p>
        {subtitle && (
          <p className="mt-1 font-body text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
