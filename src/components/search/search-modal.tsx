'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, BookOpen, Code2, ArrowRight } from 'lucide-react';

interface SearchItem {
  title: string;
  description: string;
  url: string;
  category: string;
  tags?: string[];
}

const SEARCH_INDEX: SearchItem[] = [
  {
    title: 'Python Overview & Curriculum',
    description: 'The complete Python learning pathway on LeccionesLab from fundamentals to production code.',
    url: '/docs/python',
    category: 'Documentation',
    tags: ['python', 'overview', 'introduction', 'curriculum'],
  },
  {
    title: 'Getting Started with Python',
    description: 'Setting up Python 3.12+, virtual environments, running scripts, and code editors.',
    url: '/docs/python/getting-started',
    category: 'Getting Started',
    tags: ['setup', 'installation', 'venv', 'pip', 'editor'],
  },
  {
    title: 'Python Variables & Assignment',
    description: 'Understand names, references, dynamic typing, variable scoping, and naming conventions in Python.',
    url: '/docs/python/basics/variables',
    category: 'Tutorial',
    tags: ['variables', 'assignment', 'typing', 'scope', 'mutability'],
  },
  {
    title: 'Python Functions & Scope',
    description: 'Master function definitions, parameters, *args, **kwargs, return values, and LEGB scope rules.',
    url: '/docs/python/basics/functions',
    category: 'Tutorial',
    tags: ['functions', 'def', 'scope', 'parameters', 'arguments', 'return'],
  },
  {
    title: 'Python Built-in Functions Reference',
    description: 'Comprehensive technical specification for Python standard built-in functions including len(), zip(), map(), and filter().',
    url: '/docs/python/reference/built-in-functions',
    category: 'Reference',
    tags: ['built-in', 'functions', 'reference', 'syntax', 'signatures', 'exceptions'],
  },
  {
    title: 'Tutorial Catalog & Paths',
    description: 'Structured developer tutorials organized by proficiency and problem domain.',
    url: '/learn',
    category: 'Navigation',
    tags: ['learn', 'tutorials', 'courses', 'paths'],
  },
  {
    title: 'Programming Languages Directory',
    description: 'Browse supported technologies and language guides across the LeccionesLab ecosystem.',
    url: '/languages',
    category: 'Navigation',
    tags: ['languages', 'python', 'javascript', 'typescript', 'rust'],
  },
  {
    title: 'Developer Tools & Roadmap',
    description: 'Interactive playgrounds, formatters, and sandboxed execution tools on the LeccionesLab roadmap.',
    url: '/tools',
    category: 'Tools',
    tags: ['tools', 'playground', 'repl', 'formatter', 'roadmap'],
  },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredItems = query.trim() === ''
    ? SEARCH_INDEX.slice(0, 5)
    : SEARCH_INDEX.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.tags?.some((t) => t.toLowerCase().includes(q))
        );
      });

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          router.push(filteredItems[selectedIndex].url);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, router, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Search LeccionesLab documentation"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-[8px] border border-[#302B36] bg-[#151319] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-[#302B36] px-4 py-3 bg-[#1B1820]">
          <Search className="h-4 w-4 text-[#8B8495] shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tutorials, references, functions..."
            className="flex-1 bg-transparent text-sm text-[#F4F0F7] placeholder-[#8B8495] focus:outline-none"
            aria-label="Search documentation"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#8B8495] hover:text-[#F4F0F7] p-1"
              aria-label="Clear query"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center rounded border border-[#302B36] px-1.5 py-0.5 text-[11px] font-mono text-[#8B8495] bg-[#151319]">
            ESC
          </kbd>
        </div>

        <div className="max-h-[380px] overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#8B8495]">
              No results found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            <ul className="space-y-1">
              {filteredItems.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <li key={item.url}>
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
                          <Code2 className="h-4 w-4" />
                        ) : (
                          <BookOpen className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium truncate ${isSelected ? 'text-[#F4F0F7]' : 'text-[#F4F0F7]'}`}>
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
          )}
        </div>

        <div className="border-t border-[#302B36] bg-[#111014] px-4 py-2 flex items-center justify-between text-[11px] text-[#8B8495]">
          <div className="flex items-center gap-3">
            <span><kbd className="font-mono text-[#F4F0F7]">↑</kbd> <kbd className="font-mono text-[#F4F0F7]">↓</kbd> to navigate</span>
            <span><kbd className="font-mono text-[#F4F0F7]">↵</kbd> to select</span>
          </div>
          <span>Free-first search</span>
        </div>
      </div>
    </div>
  );
}
