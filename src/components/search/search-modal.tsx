'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, BookOpen, Code2, ArrowRight, Hash, FileText, Loader2 } from 'lucide-react';

interface SearchResultItem {
  id: string;
  type: 'page' | 'heading' | 'text';
  content: string;
  url: string;
  breadcrumbs?: string[];
  description?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [defaultItems, setDefaultItems] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Load published pages dynamically for initial suggestions
  useEffect(() => {
    let isMounted = true;
    async function loadDefaultSuggestions() {
      try {
        const res = await fetch('/api/search');
        if (res.ok) {
          const data: SearchResultItem[] = await res.json();
          if (isMounted && Array.isArray(data) && data.length > 0) {
            setDefaultItems(data);
          }
        }
      } catch {
        // Silently preserve empty array
      }
    }
    loadDefaultSuggestions();
    return () => {
      isMounted = false;
    };
  }, []);

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

  // Active items list: search results if query typed, otherwise dynamic suggested docs
  const isQueryActive = query.trim().length > 0;
  const currentList = isQueryActive ? results : defaultItems;
  const activeItemsCount = currentList.length;

  // Reset selected index when results or query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, results]);

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
        const item = currentList[selectedIndex];
        if (item) {
          router.push(item.url);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentList, selectedIndex, activeItemsCount, router, onClose]);

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

  // Derive human-readable section breadcrumb dynamically from metadata or URL path
  const formatBreadcrumb = (item: SearchResultItem): string => {
    if (item.breadcrumbs && item.breadcrumbs.length > 0) {
      const deduplicated = item.breadcrumbs.filter(
        (b, idx, arr) => b && (idx === 0 || b !== arr[idx - 1])
      );
      const relevant = deduplicated.filter((b) => b !== 'Documentation');
      if (relevant.length > 1) {
        return relevant.slice(1).join(' / ');
      }
      if (relevant.length === 1) {
        return relevant[0];
      }
    }

    const cleanUrl = item.url.split('#')[0];
    const segments = cleanUrl.split('/').filter(Boolean);
    if (segments.length >= 3) {
      const sectionSlug = segments[2];
      return sectionSlug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
    }
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
          {!isQueryActive ? (
            // Dynamic Suggestions from Published Documentation Index
            <div className="py-2">
              <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-[#8B8495]">
                Suggested Documentation
              </div>
              <ul ref={listRef} role="listbox" className="space-y-1">
                {currentList.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  const breadcrumb = formatBreadcrumb(item);
                  const isReference = item.url.includes('reference');

                  return (
                    <li
                      key={item.id || item.url}
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
                          {isReference ? (
                            <Code2 className="h-4 w-4" aria-hidden="true" />
                          ) : (
                            <BookOpen className="h-4 w-4" aria-hidden="true" />
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
                          {item.description && (
                            <p className="text-xs text-[#8B8495] line-clamp-1 mt-0.5">
                              {item.description}
                            </p>
                          )}
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
                Try searching for concepts like &ldquo;lists&rdquo;, &ldquo;dictionaries&rdquo;, &ldquo;tuples&rdquo;, or &ldquo;sets&rdquo;.
              </p>
            </div>
          ) : (
            // Live Search Results backed by Fumadocs Search Server
            <ul ref={listRef} role="listbox" className="space-y-1">
              {results.map((item, index) => {
                const isSelected = index === selectedIndex;
                const breadcrumb = formatBreadcrumb(item);

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
          <span>Dynamic Docs Index</span>
        </div>
      </div>
    </div>
  );
}
