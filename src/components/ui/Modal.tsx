import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  subtitle?: string;
  maxWidth?: string;
}

export function Modal({ open, onClose, children, title, subtitle, maxWidth = 'max-w-lg' }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-charcoal-900/40 backdrop-blur-sm animate-fade-in-only"
        onClick={onClose}
      />
      <div className={`relative w-full ${maxWidth} bg-ivory-100 border border-ivory-300 shadow-elevated animate-scale-in max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-start justify-between px-8 pt-8 pb-4">
          <div>
            {title && <h2 className="font-serif text-2xl text-charcoal-800">{title}</h2>}
            {subtitle && <p className="mt-1 text-sm text-charcoal-400 font-light">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="text-charcoal-400 hover:text-charcoal-800 transition-colors duration-300 p-1 -mt-1"
            aria-label="Close"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
        <div className="px-8 pb-8">{children}</div>
      </div>
    </div>
  );
}
