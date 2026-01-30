import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtitle?: string;
}

export function StatCard({ icon: Icon, label, value, subtitle }: StatCardProps) {
  return (
    <div className="rounded-xl border border-metal-600 bg-gradient-card p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-rust-500/20">
          <Icon className="h-6 w-6 text-rust-300" />
        </div>
        <div>
          <div className="font-display text-2xl font-bold text-foreground">
            {value}
          </div>
          <div className="font-body text-sm text-muted-foreground">
            {label}
          </div>
          {subtitle && (
            <div className="font-body text-xs text-muted-foreground mt-1">
              {subtitle}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
