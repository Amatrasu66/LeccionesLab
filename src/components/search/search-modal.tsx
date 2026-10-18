'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, BookOpen, Code2, ArrowRight, Hash, FileText, Loader2 } from 'lucide-react';

interface SearchResultItem {
  id: string;
  type: 'page' | 'heading' | 'text';
  content: string;
  url: string;
}

interface DefaultQuickLink {
  title: string;
  description: string;
  url: string;
  category: string;
}

const DEFAULT_QUICK_LINKS: DefaultQuickLink[] = [
  {
    title: 'Python Overview',
    description: 'Execution mental models, heap references, and curriculum roadmap.',
    url: '/docs/python',
    category: 'Documentation',
  },
  {
    title: 'Getting Started with Python',
    description: 'Setting up Python 3.12+, venv isolation, and running scripts.',
    url: '/docs/python/getting-started',
    category: 'Guide',
  },
  {
    title: 'Variables & Assignment',
    description: 'Object references, mutability, shallow vs. deep copy semantics.',
    url: '/docs/python/basics/variables',
    category: 'Tutorial',
  },
  {
    title: 'Functions & Scope',
    description: 'Def signatures, *args, **kwargs unpacking, closures, LEGB scope rules.',
    url: '/docs/python/basics/functions',
    category: 'Tutorial',
  },
  {
    title: 'Built-in Functions Reference',
    description: 'Technical signatures for len(), zip(), map(), and enumerate().',
    url: '/docs/python/reference/built-in-functions',
    category: 'Reference',
  },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Live search fetcher backed by /api/search
  const searchDocs = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(q.trim())}`);
      if (res.ok) {
        const data: SearchResultItem[] = await res.json();
        setResults(data);
      } else {
        setResults([]);
      }
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        searchDocs(query);
      } else {
        setResults([]);
        setLoading(false);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [query, searchDocs]);

  // Focus input and lock body scroll on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, results]);

  const activeItemsCount = query.trim() ? results.length : DEFAULT_QUICK_LINKS.length;

  // Keyboard navigation & accessibility controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (activeItemsCount > 0) {
          setSelectedIndex((prev) => (prev < activeItemsCount - 1 ? prev + 1 : 0));
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (activeItemsCount > 0) {
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : activeItemsCount - 1));
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (query.trim()) {
          const item = results[selectedIndex];
          if (item) {
            router.push(item.url);
            onClose();
          }
        } else {
          const item = DEFAULT_QUICK_LINKS[selectedIndex];
          if (item) {
            router.push(item.url);
            onClose();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, query, results, selectedIndex, activeItemsCount, router, onClose]);

  // Ensure selected item scrolls into view
  useEffect(() => {
    if (listRef.current) {
      const selectedEl = listRef.current.children[selectedIndex] as HTMLElement;
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  // Derive human-readable section breadcrumb from URL
  const getBreadcrumb = (url: string) => {
    const cleanUrl = url.split('#')[0];
    if (cleanUrl.includes('reference')) return 'Reference';
    if (cleanUrl.includes('basics')) return 'Fundamentals';
    if (cleanUrl.includes('getting-started')) return 'Getting Started';
    return 'Documentation';
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-4 bg-black/80 backdrop-blur-[2px] transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-label="Documentation search dialog"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-[8px] border border-[#302B36] bg-[#151319] shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-[#302B36] px-4 py-3 bg-[#1B1820]">
          {loading ? (
            <Loader2 className="h-4 w-4 text-[#C4B5FD] animate-spin shrink-0" aria-hidden="true" />
          ) : (
            <Search className="h-4 w-4 text-[#8B8495] shrink-0" aria-hidden="true" />
          )}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation, topics, functions..."
            className="flex-1 bg-transparent text-sm sm:text-base text-[#F4F0F7] placeholder-[#8B8495] focus:outline-none"
            aria-label="Search documentation"
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#8B8495] hover:text-[#F4F0F7] p-1 rounded hover:bg-[#24202A] transition-colors"
              aria-label="Clear search input"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center rounded border border-[#302B36] px-1.5 py-0.5 text-[11px] font-mono text-[#8B8495] bg-[#151319]">
            ESC
          </kbd>
        </div>

        {/* Results List Viewport */}
        <div className="max-h-[380px] overflow-y-auto p-2">
          {query.trim() === '' ? (
            // Default Navigation Suggestions
            <div className="py-2">
              <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-[#8B8495]">
                Suggested Documentation
              </div>
              <ul ref={listRef} role="listbox" className="space-y-1">
                {DEFAULT_QUICK_LINKS.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <li
                      key={item.url}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <button
                        onClick={() => {
                          router.push(item.url);
                          onClose();
                        }}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full text-left flex items-start gap-3 rounded-[6px] p-2.5 transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#292330] text-[#F4F0F7]'
                            : 'text-[#B8B1C2] hover:bg-[#1B1820]'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0 text-[#C4B5FD]">
                          {item.category === 'Reference' ? (
                            <Code2 className="h-4 w-4" aria-hidden="true" />
                          ) : (
                            <BookOpen className="h-4 w-4" aria-hidden="true" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-[#F4F0F7] truncate">
                              {item.title}
                            </span>
                            <span className="text-[11px] text-[#8B8495] shrink-0">
                              · {item.category}
                            </span>
                          </div>
                          <p className="text-xs text-[#8B8495] line-clamp-1 mt-0.5">
                            {item.description}
                          </p>
                        </div>
                        <ArrowRight
                          className={`h-3.5 w-3.5 shrink-0 self-center transition-opacity ${
                            isSelected ? 'opacity-100 text-[#C4B5FD]' : 'opacity-0'
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : results.length === 0 && !loading ? (
            // No Results Found State
            <div className="py-12 px-4 text-center">
              <p className="text-sm text-[#F4F0F7] font-medium mb-1">
                No results found for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-[#8B8495] max-w-xs mx-auto leading-relaxed">
                Try searching for concepts like &ldquo;variables&rdquo;, &ldquo;functions&rdquo;, or &ldquo;built-in&rdquo;.
              </p>
            </div>
          ) : (
            // Live Search Results
            <ul ref={listRef} role="listbox" className="space-y-1">
              {results.map((item, index) => {
                const isSelected = index === selectedIndex;
                const breadcrumb = getBreadcrumb(item.url);

                return (
                  <li
                    key={item.id}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <button
                      onClick={() => {
                        router.push(item.url);
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full text-left flex items-start gap-3 rounded-[6px] p-2.5 transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#292330] text-[#F4F0F7]'
                          : 'text-[#B8B1C2] hover:bg-[#1B1820]'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0 text-[#C4B5FD]">
                        {item.type === 'page' ? (
                          <BookOpen className="h-4 w-4" aria-hidden="true" />
                        ) : item.type === 'heading' ? (
                          <Hash className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <FileText className="h-4 w-4" aria-hidden="true" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-[#F4F0F7] truncate">
                            {item.content}
                          </span>
                          <span className="text-[11px] text-[#8B8495] shrink-0">
                            · {breadcrumb}
                          </span>
                        </div>
                        <p className="text-xs font-mono text-[#8B8495] truncate mt-0.5">
                          {item.url}
                        </p>
                      </div>
                      <ArrowRight
                        className={`h-3.5 w-3.5 shrink-0 self-center transition-opacity ${
                          isSelected ? 'opacity-100 text-[#C4B5FD]' : 'opacity-0'
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer Shortcut Hints */}
        <div className="border-t border-[#302B36] bg-[#111014] px-4 py-2 flex items-center justify-between text-[11px] text-[#8B8495]">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="font-mono text-[#F4F0F7]">↑</kbd>{' '}
              <kbd className="font-mono text-[#F4F0F7]">↓</kbd> navigate
            </span>
            <span>
              <kbd className="font-mono text-[#F4F0F7]">↵</kbd> select
            </span>
            <span>
              <kbd className="font-mono text-[#F4F0F7]">ESC</kbd> close
            </span>
          </div>
          <span>Published Docs Index</span>
        </div>
      </div>
    </div>
  );
}
