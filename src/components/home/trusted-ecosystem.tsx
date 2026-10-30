'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Terminal, 
  Layers, 
  Cpu, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  GitBranch, 
  BookOpen, 
  Database,
  ArrowRight,
  Code2
} from 'lucide-react';
import { SearchModal } from '@/components/search/search-modal';

interface TopicShortcut {
  name: string;
  category: 'foundations' | 'collections' | 'oop' | 'runtime' | 'modules';
  tag?: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const TOPIC_SHORTCUTS: TopicShortcut[] = [
  {
    name: 'Object-Oriented Python',
    category: 'oop',
    tag: 'NEW TRACK E',
    url: '/docs/python/oop/classes-objects-and-attributes',
    icon: Layers,
    description: 'Classes, MRO, magic methods, descriptors, and dataclasses',
  },
  {
    name: 'CPython Memory & GC',
    category: 'runtime',
    tag: 'NEW TRACK F',
    url: '/docs/python/advanced/object-lifecycle-and-memory-management',
    icon: Cpu,
    description: 'PyObject reference counting, generational cyclic GC, arenas',
  },
  {
    name: 'Asyncio & Concurrency',
    category: 'runtime',
    tag: 'TRACK F',
    url: '/docs/python/advanced/asynchronous-python-with-asyncio',
    icon: Zap,
    description: 'Event loops, TaskGroup, non-blocking I/O & cooperative multitasking',
  },
  {
    name: 'Type Hints & Static Typing',
    category: 'foundations',
    tag: 'TRACK C',
    url: '/docs/python/intermediate/type-hints-and-static-typing',
    icon: ShieldCheck,
    description: 'Generics, TypeVar, Protocol, ParamSpec & mypy validation',
  },
  {
    name: 'Bytecode & Disassembly',
    category: 'runtime',
    tag: 'TRACK F',
    url: '/docs/python/advanced/cpython-bytecode-and-disassembly',
    icon: Terminal,
    description: 'Opcode evaluation loop, dis module, and bytecode specialization',
  },
  {
    name: 'Decorators & Closures',
    category: 'foundations',
    tag: 'TRACK C',
    url: '/docs/python/intermediate/decorators-and-closures',
    icon: Sparkles,
    description: 'LEGB lexical scoping, closure cells, and parameterized wrappers',
  },
  {
    name: 'Standard Library Spec',
    category: 'modules',
    tag: 'TRACK D',
    url: '/docs/python/modules/standard-library',
    icon: Database,
    description: 'itertools, functools, collections, pathlib, and contextlib',
  },
  {
    name: 'Built-in Functions API',
    category: 'foundations',
    tag: 'REFERENCE',
    url: '/docs/python/reference/built-in-functions',
    icon: Code2,
    description: 'Complete signatures, exceptions, and complexity for all built-ins',
  },
];

export function TrustedEcosystem() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Subjects' },
    { id: 'oop', label: 'OOP (Track E)' },
    { id: 'runtime', label: 'CPython & Async (Track F)' },
    { id: 'foundations', label: 'Foundations & Typing' },
    { id: 'modules', label: 'Modules & Tooling' },
  ];

  const filteredTopics = activeCategory === 'all' 
    ? TOPIC_SHORTCUTS 
    : TOPIC_SHORTCUTS.filter(t => t.category === activeCategory);

  return (
    <>
      <section className="relative border-b border-[#302B36] bg-[#111014] py-16 sm:py-20 overflow-hidden">
        {/* Subtle radial ambient backdrop */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#C4B5FD]/5 blur-[120px] rounded-full" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header: Search & Quick Access */}
          <div className="max-w-3xl mx-auto text-center mb-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] border border-[#302B36] bg-[#151319] text-xs text-[#B8B1C2]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C4B5FD] animate-pulse" />
              <span className="text-[#C4B5FD] font-mono text-[11px] uppercase tracking-wider font-semibold">Instant Index</span>
              <span className="text-[#8B8495]">·</span>
              <span>38 Production Modules</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#F4F0F7] text-balance">
              Find Any Concept in Microseconds.
            </h2>
            <p className="text-sm sm:text-base text-[#B8B1C2] max-w-xl mx-auto">
              Jump straight into any language primitive, memory specification, or OOP architectural pattern.
            </p>

            {/* OneCompiler-inspired Developer Search Bar */}
            <div className="pt-2 max-w-2xl mx-auto">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="group w-full flex items-center justify-between rounded-[8px] border border-[#302B36] bg-[#151319] px-4 py-3.5 text-left text-sm text-[#8B8495] shadow-lg hover:border-[#C4B5FD]/50 hover:bg-[#1A1822] transition-all focus:outline-none focus:ring-1 focus:ring-[#C4B5FD]"
                aria-label="Open documentation search"
              >
                <div className="flex items-center gap-3">
                  <Search className="h-4 w-4 text-[#8B8495] group-hover:text-[#C4B5FD] transition-colors" />
                  <span className="text-[#8B8495] group-hover:text-[#B8B1C2] transition-colors">
                    Search 38 lessons, built-ins, GC algorithms, asyncio...
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <kbd className="hidden sm:inline-block rounded-[4px] border border-[#302B36] bg-[#111014] px-2 py-0.5 font-mono text-[11px] text-[#8B8495] group-hover:border-[#C4B5FD]/40 group-hover:text-[#F4F0F7] transition-colors">
                    ⌘K
                  </kbd>
                </div>
              </button>
            </div>

            {/* Filter Category Tabs (Zero-pill button controls with sharp borders) */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`rounded-[6px] px-3 py-1.5 text-xs font-medium transition-all ${
                      isActive
                        ? 'border border-[#C4B5FD] bg-[#C4B5FD]/10 text-[#F4F0F7]'
                        : 'border border-[#302B36] bg-[#151319] text-[#8B8495] hover:border-[#8B8495]/40 hover:text-[#F4F0F7]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Access Topic Cards Grid (Inspired by OneCompiler cards + Devin crisp typography) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {filteredTopics.map((topic) => {
              const Icon = topic.icon;
              return (
                <Link
                  key={topic.name}
                  href={topic.url}
                  className="group relative flex flex-col justify-between rounded-[8px] border border-[#302B36] bg-[#151319] p-4 hover:border-[#C4B5FD]/60 hover:bg-[#1A1822] transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-[#302B36] bg-[#111014] text-[#C4B5FD] group-hover:border-[#C4B5FD]/40 group-hover:text-[#F4F0F7] transition-colors">
                        <Icon className="h-4 w-4" />
                      </div>
                      {topic.tag && (
                        <span className="font-mono text-[10px] uppercase font-semibold text-[#C4B5FD] tracking-wider px-2 py-0.5 rounded-[4px] border border-[#C4B5FD]/20 bg-[#C4B5FD]/5">
                          {topic.tag}
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-semibold text-[#F4F0F7] group-hover:text-[#C4B5FD] transition-colors line-clamp-1">
                      {topic.name}
                    </h3>
                    <p className="mt-1 text-xs text-[#8B8495] line-clamp-2 leading-relaxed">
                      {topic.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#302B36]/50 flex items-center justify-between text-[11px] font-medium text-[#8B8495] group-hover:text-[#F4F0F7] transition-colors">
                    <span>Inspect spec</span>
                    <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform text-[#C4B5FD]" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Trust Strip: Global Engineering Teams & Universities (Screenshot & Devin inspired) */}
          <div className="mt-16 pt-12 border-t border-[#302B36]">
            <p className="text-center font-mono text-[11px] uppercase tracking-widest text-[#8B8495] mb-8 font-medium">
              Studied & referenced by engineers, researchers, and builders
            </p>

            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-65 hover:opacity-90 transition-opacity">
              {/* Meta */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#B8B1C2] tracking-wider">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                <span>META</span>
              </div>

              {/* Stripe */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#B8B1C2] tracking-wider">
                <span className="font-serif italic font-bold text-base">stripe</span>
              </div>

              {/* Vercel */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#B8B1C2] tracking-wider">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 1155 1000">
                  <path d="M577.347 0L1154.69 1000H0z"/>
                </svg>
                <span>VERCEL</span>
              </div>

              {/* OpenAI */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#B8B1C2] tracking-wider">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 8.79a4.476 4.476 0 0 1 2.345-1.977l-.004.164v5.517a.786.786 0 0 0 .392.682l5.843 3.37-2.02 1.168a.076.076 0 0 1-.071 0l-4.839-2.79A4.504 4.504 0 0 1 2.34 8.79zm15.82 4.455l-5.843-3.37 2.02-1.168a.076.076 0 0 1 .071 0l4.839 2.79a4.504 4.504 0 0 1-.74 8.084v-5.655a.786.786 0 0 0-.347-.681zm2.24-4.549l-.142-.085-4.783-2.759a.771.771 0 0 0-.78 0L8.852 9.222V6.89a.08.08 0 0 1 .033-.062L13.725 4.05a4.5 4.5 0 0 1 6.675 4.646zM8.006 13.563l2.844-1.64 2.844 1.64v3.284l-2.844 1.64-2.844-1.64z"/>
                </svg>
                <span>OPENAI</span>
              </div>

              {/* Cloudflare */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#B8B1C2] tracking-wider">
                <span className="font-mono font-bold">CLOUDFLARE</span>
              </div>

              {/* Supabase */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#B8B1C2] tracking-wider">
                <span className="font-mono font-bold text-[#6FD3A0]">⚡ SUPABASE</span>
              </div>

              {/* Linear */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#B8B1C2] tracking-wider">
                <span className="font-sans font-bold">LINEAR</span>
              </div>

              {/* MIT */}
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#B8B1C2] tracking-wider">
                <span>MIT CSAIL</span>
              </div>

              {/* Stanford */}
              <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-[#B8B1C2] tracking-wider">
                <span>STANFORD</span>
              </div>
            </div>

            {/* Platform Trust & Quality Metric Counters */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-[8px] border border-[#302B36] bg-[#151319] p-4 text-center">
                <div className="font-mono text-2xl font-bold text-[#F4F0F7]">6 Tracks</div>
                <div className="text-xs text-[#8B8495] mt-1">Foundations to CPython FFI</div>
              </div>
              <div className="rounded-[8px] border border-[#302B36] bg-[#151319] p-4 text-center">
                <div className="font-mono text-2xl font-bold text-[#C4B5FD]">38 Modules</div>
                <div className="text-xs text-[#8B8495] mt-1">Tested MDX Technical Specs</div>
              </div>
              <div className="rounded-[8px] border border-[#302B36] bg-[#151319] p-4 text-center">
                <div className="font-mono text-2xl font-bold text-[#6FD3A0]">3.12+</div>
                <div className="text-xs text-[#8B8495] mt-1">CPython Spec Specialization</div>
              </div>
              <div className="rounded-[8px] border border-[#302B36] bg-[#151319] p-4 text-center">
                <div className="font-mono text-2xl font-bold text-[#A9C4FF]">100% Free</div>
                <div className="text-xs text-[#8B8495] mt-1">Zero Paywalls, Zero Ads</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

export default TrustedEcosystem;
