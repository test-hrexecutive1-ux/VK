import type { ReactNode } from 'react';

export function EmptyState({ icon, title, message, action }: { icon?: ReactNode; title: string; message?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      {icon && <div className="text-charcoal-300 mb-6">{icon}</div>}
      <h3 className="font-serif text-2xl text-charcoal-700">{title}</h3>
      {message && <p className="mt-2 text-sm text-charcoal-400 font-light max-w-md">{message}</p>}
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}
