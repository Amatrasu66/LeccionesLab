import React from 'react';
import { Info, AlertTriangle, AlertCircle, CheckCircle2, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

export type CalloutType = 'note' | 'tip' | 'warning' | 'danger' | 'success' | 'info' | 'error';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Callout({
  type = 'note',
  title,
  children,
  className,
}: CalloutProps) {
  const configs = {
    note: {
      icon: Info,
      color: 'text-[#A9C4FF]',
      border: 'border-[#302B36]',
      defaultTitle: 'Note',
    },
    tip: {
      icon: Lightbulb,
      color: 'text-[#C4B5FD]',
      border: 'border-[#302B36]',
      defaultTitle: 'Tip',
    },
    warning: {
      icon: AlertTriangle,
      color: 'text-[#F2C879]',
      border: 'border-[#302B36]',
      defaultTitle: 'Warning',
    },
    danger: {
      icon: AlertCircle,
      color: 'text-[#FF929B]',
      border: 'border-[#302B36]',
      defaultTitle: 'Important',
    },
    success: {
      icon: CheckCircle2,
      color: 'text-[#6FD3A0]',
      border: 'border-[#302B36]',
      defaultTitle: 'Success',
    },
  };

  const normalizedType =
    type === 'info' ? 'note' : type === 'error' ? 'danger' : (type in configs ? type : 'note');
  const config = configs[normalizedType as keyof typeof configs] || configs.note;
  const Icon = config.icon;

  return (
    <div
      role="region"
      aria-label={title || config.defaultTitle}
      className={cn(
        'my-5 rounded-[8px] border bg-[#1B1820] p-4 text-sm text-[#F4F0F7] shadow-none',
        config.border,
        className
      )}
    >
      <div className="flex items-center gap-2 mb-2 font-medium">
        <Icon className={cn('h-4 w-4 shrink-0', config.color)} aria-hidden="true" />
        <span className={cn('text-xs font-semibold uppercase tracking-wider', config.color)}>
          {title || config.defaultTitle}
        </span>
      </div>
      <div className="text-[#B8B1C2] leading-relaxed text-[15px] space-y-2">
        {children}
      </div>
    </div>
  );
}
