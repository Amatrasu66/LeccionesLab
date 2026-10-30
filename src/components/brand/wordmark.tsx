import Link from 'next/link';
import { cn } from '@/lib/utils';

interface WordmarkProps {
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  asLink?: boolean;
}

export function Wordmark({
  className,
  size = 'default',
  asLink = true,
}: WordmarkProps) {
  const sizeClasses = {
    sm: 'text-base font-semibold tracking-tight',
    default: 'text-lg font-semibold tracking-tight',
    lg: 'text-2xl sm:text-3xl font-semibold tracking-tight',
  }[size];

  const content = (
    <span
      className={cn(
        'inline-flex items-baseline select-none transition-opacity hover:opacity-90',
        sizeClasses,
        className
      )}
      aria-label="LeccionesLab"
    >
      <span className="text-[#F4F0F7]">Lecciones</span>
      <span className="text-[#C4B5FD]">Lab</span>
    </span>
  );

  if (asLink) {
    return (
      <Link
        href="/"
        className="inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-[#C4B5FD] rounded-sm"
        aria-label="LeccionesLab Homepage"
      >
        {content}
      </Link>
    );
  }

  return content;
}
