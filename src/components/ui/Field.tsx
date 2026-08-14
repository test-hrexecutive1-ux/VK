import type { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react';

interface FieldProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}

export function Field({ label, error, hint, required, children }: FieldProps) {
  return (
    <div>
      <label className="block text-[0.7rem] uppercase tracking-[0.2em] text-charcoal-500 font-medium mb-2.5">
        {label} {required && <span className="text-champagne-600">*</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-charcoal-300 font-light">{hint}</p>}
      {error && <p className="mt-1.5 text-xs text-accent-error font-light">{error}</p>}
    </div>
  );
}

const inputBase =
  'w-full bg-transparent border-b border-charcoal-200 px-0 py-3 text-charcoal-800 placeholder:text-charcoal-300 font-light text-base transition-colors duration-300 focus:border-charcoal-800 focus:outline-none';

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputBase} ${props.className ?? ''}`} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputBase} resize-none ${props.className ?? ''}`} />;
}
