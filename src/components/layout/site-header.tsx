'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, BookOpen, Terminal, Sparkles } from 'lucide-react';
import { Wordmark } from '@/components/brand/wordmark';
import { Button } from '@/components/ui/button';
import { SearchModal } from '@/components/search/search-modal';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close mobile drawer on route transition
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Overview', href: '/docs/python' },
    { label: 'Getting started', href: '/docs/python/getting-started' },
    { label: 'Fundamentals', href: '/docs/python/basics/variables' },
    { label: 'Reference', href: '/docs/python/reference/built-in-functions' },
    { label: 'Curriculum', href: '/learn' },
    { label: 'Languages', href: '/languages' },
    { label: 'Tools', href: '/tools' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#302B36] bg-[#151319]/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-6 shrink-0">
            <Wordmark size="default" />
          </div>

          {/* Zone 2: Primary Nav Links (Claude Code Docs style) */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/docs/python'
                  ? pathname === '/docs/python'
                  : pathname === link.href || (link.href.startsWith('/docs') && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'transition-colors py-1 whitespace-nowrap text-[13.5px]',
                    isActive
                      ? 'text-[#C4B5FD] font-semibold border-b-2 border-[#C4B5FD] -mb-[1px]'
                      : 'text-[#B8B1C2] hover:text-[#F4F0F7]'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Search Affordance & Primary Action */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-[6px] border border-[#302B36] bg-[#1B1820] px-3 py-1.5 text-xs text-[#8B8495] hover:text-[#F4F0F7] hover:border-[#8B8495]/40 transition-colors cursor-pointer"
              aria-label="Search documentation (Press Ctrl K or Command K)"
            >
              <Search className="h-3.5 w-3.5 text-[#B8B1C2]" aria-hidden="true" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-flex items-center rounded border border-[#302B36] bg-[#151319] px-1 py-0.2 text-[10px] font-mono text-[#8B8495]">
                Ctrl K
              </kbd>
            </button>

            <Button href="/docs/python" variant="primary" size="sm" className="hidden sm:inline-flex">
              Explore Docs
            </Button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden flex items-center justify-center h-9 w-9 rounded-[6px] border border-[#302B36] text-[#B8B1C2] hover:text-[#F4F0F7] hover:bg-[#1B1820]"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-[#302B36] bg-[#151319] px-4 py-4 space-y-3">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'px-3 py-2 rounded-[6px] text-sm font-medium transition-colors',
                      isActive ? 'bg-[#292330] text-[#C4B5FD]' : 'text-[#B8B1C2] hover:bg-[#1B1820] hover:text-[#F4F0F7]'
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="pt-2 border-t border-[#302B36]">
              <Button href="/docs/python" variant="primary" size="default" className="w-full">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Local Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
