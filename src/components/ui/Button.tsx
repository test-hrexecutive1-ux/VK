import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-charcoal-900 text-ivory-100 hover:bg-charcoal-700 border border-charcoal-900',
  secondary: 'bg-ivory-100 text-charcoal-800 hover:bg-ivory-200 border border-charcoal-200',
  ghost: 'bg-transparent text-charcoal-700 hover:bg-ivory-200 border border-transparent',
  outline: 'bg-transparent text-charcoal-800 hover:border-charcoal-800 border border-charcoal-300',
  danger: 'bg-accent-error text-ivory-100 hover:opacity-90 border border-accent-error',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-[0.65rem] tracking-[0.18em]',
  md: 'px-7 py-3 text-[0.65rem] tracking-[0.2em]',
  lg: 'px-9 py-3.5 text-[0.7rem] tracking-[0.2em]',
};

export function Button({ variant = 'primary', size = 'md', children, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center font-sans font-medium uppercase transition-colors duration-500 ease-lux disabled:opacity-40 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
