import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PagerItem {
  title: string;
  url: string;
}

interface ArticlePagerProps {
  previous: PagerItem | null;
  next: PagerItem | null;
}

export function ArticlePager({ previous, next }: ArticlePagerProps) {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="Article navigation"
      className="mt-12 pt-6 border-t border-[#302B36] grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {previous ? (
        <Link
          href={previous.url}
          className="group flex flex-col items-start rounded-[8px] border border-[#302B36] bg-[#151319] p-4 text-left transition-all hover:border-[#8B8495]/40 hover:bg-[#1B1820] focus-visible:outline-2 focus-visible:outline-[#C4B5FD]"
        >
          <div className="flex items-center gap-1.5 text-xs text-[#8B8495] group-hover:text-[#C4B5FD] transition-colors mb-1">
            <ChevronLeft className="h-3.5 w-3.5 transform group-hover:-translate-x-0.5 transition-transform" />
            <span>Previous</span>
          </div>
          <span className="text-sm font-medium text-[#F4F0F7] group-hover:text-[#C4B5FD] transition-colors line-clamp-1">
            {previous.title}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      {next ? (
        <Link
          href={next.url}
          className="group flex flex-col items-end rounded-[8px] border border-[#302B36] bg-[#151319] p-4 text-right transition-all hover:border-[#8B8495]/40 hover:bg-[#1B1820] focus-visible:outline-2 focus-visible:outline-[#C4B5FD]"
        >
          <div className="flex items-center gap-1.5 text-xs text-[#8B8495] group-hover:text-[#C4B5FD] transition-colors mb-1">
            <span>Next</span>
            <ChevronRight className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 transition-transform" />
          </div>
          <span className="text-sm font-medium text-[#F4F0F7] group-hover:text-[#C4B5FD] transition-colors line-clamp-1">
            {next.title}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}
    </nav>
  );
}
