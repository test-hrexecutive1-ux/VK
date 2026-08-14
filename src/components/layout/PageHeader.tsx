import type { ReactNode } from 'react';

export function PageHeader({ eyebrow, title, subtitle, children }: { eyebrow?: string; title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <div className="pt-32 pb-16 lg:pt-40 lg:pb-20">
      <div className="container-lux">
        {eyebrow && <p className="eyebrow mb-5 animate-fade-in">{eyebrow}</p>}
        <h1 className="font-serif text-display-sm text-charcoal-800 text-balance animate-fade-in">{title}</h1>
        {subtitle && <p className="mt-6 text-lg text-charcoal-500 font-light max-w-2xl leading-relaxed animate-fade-in">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}
