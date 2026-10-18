import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'default' | 'lg';
  asChild?: boolean;
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'default',
      href,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-colors duration-150 rounded-[6px] focus-visible:outline-2 focus-visible:outline-[#C4B5FD] focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap cursor-pointer select-none';

    const variants = {
      primary:
        'bg-[#F4F0F7] text-[#111014] hover:bg-[#FFFFFF] active:bg-[#E5E0E8]',
      secondary:
        'bg-[#24202A] text-[#F4F0F7] hover:bg-[#2C2734] border border-[#302B36] active:bg-[#1E1B24]',
      ghost:
        'bg-transparent text-[#B8B1C2] hover:text-[#F4F0F7] hover:bg-[#1B1820]',
      outline:
        'bg-transparent border border-[#302B36] text-[#F4F0F7] hover:bg-[#1B1820] hover:border-[#8B8495]/40',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs gap-1.5',
      default: 'h-9 px-4 text-sm gap-2',
      lg: 'h-10 px-5 text-sm gap-2.5',
    };

    const combinedClassName = cn(baseStyles, variants[variant], sizes[size], className);

    if (href) {
      return (
        <Link href={href} className={combinedClassName}>
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={combinedClassName}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
