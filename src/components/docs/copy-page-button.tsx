'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export function CopyPageButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof window !== 'undefined') {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] border border-[#302B36] bg-[#1B1820] text-xs text-[#B8B1C2] hover:bg-[#24202A] hover:text-[#F4F0F7] hover:border-[#8B8495]/40 transition-colors focus-visible:outline-2 focus-visible:outline-[#C4B5FD] cursor-pointer"
      aria-label={copied ? 'Page link copied to clipboard' : 'Copy page link to clipboard'}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-[#6FD3A0]" aria-hidden="true" />
          <span className="text-[#6FD3A0] font-medium">Link copied</span>
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5 text-[#8B8495]" aria-hidden="true" />
          <span>Copy link</span>
        </>
      )}
    </button>
  );
}
