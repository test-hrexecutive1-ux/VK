import type { ReactNode } from 'react';
import type { Visibility } from '@/types';

type BadgeVariant = Visibility | 'success' | 'warning' | 'error' | 'info' | 'neutral';

const variantClasses: Record<BadgeVariant, string> = {
  public: 'bg-ivory-200 text-charcoal-600 border-charcoal-200',
  login_required: 'bg-champagne-50 text-champagne-700 border-champagne-200',
  premium: 'bg-charcoal-800 text-champagne-200 border-charcoal-700',
  success: 'bg-accent-success/10 text-accent-success border-accent-success/30',
  warning: 'bg-accent-warning/10 text-accent-warning border-accent-warning/30',
  error: 'bg-accent-error/10 text-accent-error border-accent-error/30',
  info: 'bg-ivory-200 text-charcoal-500 border-charcoal-200',
  neutral: 'bg-ivory-200 text-charcoal-500 border-charcoal-200',
};

const labelMap: Record<Visibility, string> = {
  public: 'Public',
  login_required: 'Members Only',
  premium: 'Premium',
};

export function Badge({ variant, children, className = '' }: { variant: BadgeVariant; children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[0.65rem] uppercase tracking-[0.15em] font-medium border rounded-sm ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}

export function VisibilityBadge({ visibility }: { visibility: Visibility }) {
  return <Badge variant={visibility}>{labelMap[visibility]}</Badge>;
}
