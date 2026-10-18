'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({
  code,
  language = 'python',
  filename,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      className={cn(
        'group my-5 overflow-hidden rounded-[8px] border border-[#302B36] bg-[#17151C] text-[#F4F0F7]',
        className
      )}
    >
      {(filename || language) && (
        <div className="flex items-center justify-between border-b border-[#302B36] bg-[#151319] px-4 py-2 text-xs font-mono text-[#8B8495]">
          <span className="text-[#B8B1C2] truncate font-medium">
            {filename || language}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-[4px] px-2 py-1 text-xs text-[#B8B1C2] transition-colors hover:bg-[#24202A] hover:text-[#F4F0F7] focus-visible:outline-2 focus-visible:outline-[#C4B5FD]"
            aria-label={copied ? 'Code copied to clipboard' : 'Copy code to clipboard'}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-[#6FD3A0]" aria-hidden="true" />
                <span className="text-[#6FD3A0]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}
      <div className="relative overflow-x-auto p-4 text-[13.5px] sm:text-[14px] leading-[1.65]">
        {!filename && !language && (
          <button
            onClick={handleCopy}
            className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 focus:opacity-100 flex items-center gap-1 rounded-[4px] bg-[#24202A] px-2 py-1 text-xs text-[#B8B1C2] border border-[#302B36] hover:text-[#F4F0F7] transition-all"
            aria-label={copied ? 'Code copied' : 'Copy code'}
          >
            {copied ? <Check className="h-3.5 w-3.5 text-[#6FD3A0]" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        )}
        <pre className="font-mono text-[#F4F0F7] m-0 selection:bg-[#292330]">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
