import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const colors = {
  success: 'text-accent-success',
  error: 'text-accent-error',
  info: 'text-charcoal-500',
};

export function ToastContainer() {
  const { toasts, dismissToast } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-3 max-w-sm">
      {toasts.map((toast) => {
        const Icon = icons[toast.variant];
        return (
          <div
            key={toast.id}
            className="flex items-start gap-3 bg-ivory-100 border border-ivory-300 shadow-elevated px-5 py-4 animate-slide-down"
          >
            <Icon size={18} strokeWidth={1.5} className={`${colors[toast.variant]} mt-0.5 shrink-0`} />
            <div className="flex-1">
              <p className="text-sm font-medium text-charcoal-800">{toast.title}</p>
              {toast.message && <p className="text-xs text-charcoal-400 font-light mt-0.5">{toast.message}</p>}
            </div>
            <button onClick={() => dismissToast(toast.id)} className="text-charcoal-300 hover:text-charcoal-600 transition-colors">
              <X size={16} strokeWidth={1.5} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
