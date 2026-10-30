'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Layers, 
  Cpu, 
  Terminal, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  ShieldCheck, 
  Zap, 
  GitBranch, 
  Database,
  Code2,
  CheckCircle2
} from 'lucide-react';

interface CurriculumTrack {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  lessonsCount: number;
  featuredLessonUrl: string;
  featuredLessonTitle: string;
  keyTopics: string[];
  codeHighlight?: string;
}

const TRACKS: CurriculumTrack[] = [
  {
    id: 'track-e',
    badge: 'Track E · Object-Oriented Python',
    title: 'Object-Oriented Python',
    subtitle: 'From class invariants and cooperative MRO to descriptors, protocols, and slot-optimized data models.',
    level: 'Advanced',
    lessonsCount: 8,
    featuredLessonUrl: '/docs/python/oop/classes-objects-and-attributes',
    featuredLessonTitle: 'Classes, Objects and Attributes',
    keyTopics: [
      '__init__ vs __new__ constructors',
      'Instance vs class attribute lookup & shadowing',
      'Cooperative super() and C3 linearization',
      'Abstract Base Classes (abc) vs runtime @runtime_checkable Protocols',
      '__get__, __set__, and __delete__ descriptor protocol',
      'Immutable @dataclass(frozen=True, slots=True)',
      'Dependency injection and compositional design',
    ],
    codeHighlight: `class Temperature:
    def __init__(self, celsius: float):
        self._celsius = celsius

    @property
    def fahrenheit(self) -> float:
        return (self._celsius * 9 / 5) + 32`,
  },
  {
    id: 'track-f',
    badge: 'Track F · Advanced CPython & Systems',
    title: 'Advanced CPython & Systems',
    subtitle: 'Internals of the reference counting engine, cycle detection, bytecode execution, and asynchronous concurrency.',
    level: 'Expert',
    lessonsCount: 7,
    featuredLessonUrl: '/docs/python/advanced/object-lifecycle-and-memory-management',
    featuredLessonTitle: 'Object Lifecycle & Memory Management',
    keyTopics: [
      'PyObject reference counting and ob_refcnt',
      'Generational cyclic GC sweeps (Gen0, Gen1, Gen2)',
      'Metaclasses: type.__new__ vs type.__init__',
      'Bytecode disassembly via dis.dis & opcode dispatch',
      'GIL constraints vs multiprocessing shared memory',
      'Asyncio Event Loop & Python 3.11+ TaskGroup',
      'C Extensions with ctypes, CFFI, and pybind11',
    ],
    codeHighlight: `async with asyncio.TaskGroup() as tg:
    task1 = tg.create_task(fetch_metrics())
    task2 = tg.create_task(flush_buffer())
# Guarantees complete failure isolation`,
  },
  {
    id: 'track-c',
    badge: 'Track C · Intermediate Python',
    title: 'Functional Patterns & Metaprogramming Primitives',
    subtitle: 'Comprehensions, custom context managers, closure scopes, generators, and static type invariants.',
    level: 'Intermediate',
    lessonsCount: 6,
    featuredLessonUrl: '/docs/python/intermediate/type-hints-and-static-typing',
    featuredLessonTitle: 'Type Hints & Static Typing',
    keyTopics: [
      'Generator pipelines & yield from delegation',
      'Context managers with __enter__ / __exit__ & @contextmanager',
      'Decorators with functools.wraps and parameterized closures',
      'Static type hinting with Generics, TypeVar, and ParamSpec',
      'Exception hierarchy patterns & custom domain errors',
    ],
  },
  {
    id: 'track-a-b',
    badge: 'Tracks A & B · Language Foundations & Data Structures',
    title: 'Core Foundations & Memory Models',
    subtitle: 'Variables as names pointing to objects, mutability semantics, hashing algorithms, and asymptotic complexities.',
    level: 'Beginner',
    lessonsCount: 10,
    featuredLessonUrl: '/docs/python/basics/variables',
    featuredLessonTitle: 'Variables and Memory Models',
    keyTopics: [
      'Names, bindings, and object identity (is vs ==)',
      'Lists: dynamic over-allocation and resizing amortized O(1)',
      'Dictionaries: compact hash tables & SipHash collision resolution',
      'Sets: hash-set lookup invariants and set theory algebra',
      'Tuples: immutable sequences and struct packing',
    ],
  },
  {
    id: 'track-d',
    badge: 'Track D · Tooling, Packaging & CLI Engineering',
    title: 'Production Tooling & CLI Architecture',
    subtitle: 'Build industrial-strength command-line tools, manage subprocesses cleanly, and leverage standard library powerhouses.',
    level: 'Intermediate',
    lessonsCount: 7,
    featuredLessonUrl: '/docs/python/modules/cli-with-argparse',
    featuredLessonTitle: 'CLI Engineering with argparse',
    keyTopics: [
      'Robust CLI parser trees with argparse sub-commands',
      'Subprocess management: pipes, timeouts, and safe I/O streaming',
      'Packaging: pyproject.toml, build backends, and virtual environments',
      'Standard library gems: itertools, functools, and pathlib',
    ],
  },
];

export function CurriculumBento() {
  const [filter, setFilter] = useState<'all' | 'oop' | 'runtime' | 'foundations'>('all');

  const filteredTracks = TRACKS.filter((track) => {
    if (filter === 'all') return true;
    if (filter === 'oop') return track.id === 'track-e';
    if (filter === 'runtime') return track.id === 'track-f';
    if (filter === 'foundations') return track.id === 'track-c' || track.id === 'track-a-b' || track.id === 'track-d';
    return true;
  });

  return (
    <section className="border-b border-[#302B36] bg-[#151319]/40 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#C4B5FD] font-mono uppercase tracking-wider font-semibold">
              <Layers className="h-4 w-4" />
              <span>Modular Curriculum · 6 Tracks · 38 Lessons</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#F4F0F7]">
              Engineered From First Principles.
            </h2>
            <p className="text-sm sm:text-base text-[#B8B1C2] max-w-2xl leading-relaxed">
              Every lesson is structured around mental models, memory layouts, runnable code, and production edge cases.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`rounded-[6px] px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === 'all'
                  ? 'border border-[#C4B5FD] bg-[#C4B5FD]/10 text-[#F4F0F7]'
                  : 'border border-[#302B36] bg-[#151319] text-[#8B8495] hover:text-[#F4F0F7]'
              }`}
            >
              All Tracks
            </button>
            <button
              onClick={() => setFilter('oop')}
              className={`rounded-[6px] px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === 'oop'
                  ? 'border border-[#C4B5FD] bg-[#C4B5FD]/10 text-[#F4F0F7]'
                  : 'border border-[#302B36] bg-[#151319] text-[#8B8495] hover:text-[#F4F0F7]'
              }`}
            >
              Track E (OOP)
            </button>
            <button
              onClick={() => setFilter('runtime')}
              className={`rounded-[6px] px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === 'runtime'
                  ? 'border border-[#C4B5FD] bg-[#C4B5FD]/10 text-[#F4F0F7]'
                  : 'border border-[#302B36] bg-[#151319] text-[#8B8495] hover:text-[#F4F0F7]'
              }`}
            >
              Track F (CPython & Async)
            </button>
            <button
              onClick={() => setFilter('foundations')}
              className={`rounded-[6px] px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === 'foundations'
                  ? 'border border-[#C4B5FD] bg-[#C4B5FD]/10 text-[#F4F0F7]'
                  : 'border border-[#302B36] bg-[#151319] text-[#8B8495] hover:text-[#F4F0F7]'
              }`}
            >
              Foundations (A-D)
            </button>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {filteredTracks.map((track) => {
            const isLarge = track.id === 'track-e' || track.id === 'track-f';
            return (
              <div
                key={track.id}
                className={`flex flex-col justify-between rounded-[8px] border border-[#302B36] bg-[#151319] p-6 sm:p-8 hover:border-[#C4B5FD]/50 transition-all ${
                  isLarge ? 'lg:col-span-6' : 'lg:col-span-4'
                }`}
              >
                <div>
                  {/* Badge & Level Indicator */}
                  <div className="flex items-center justify-between text-xs mb-4">
                    <span className="font-mono text-[11px] font-semibold text-[#C4B5FD] uppercase tracking-wider">
                      {track.badge}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-[4px] border border-[#302B36] bg-[#111014] text-[#8B8495]">
                      {track.lessonsCount} lessons · {track.level}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-semibold text-[#F4F0F7] tracking-tight mb-2">
                    {track.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#B8B1C2] leading-relaxed mb-6">
                    {track.subtitle}
                  </p>

                  {/* Code snippet preview for flagship tracks */}
                  {track.codeHighlight && (
                    <div className="mb-6 rounded-[6px] border border-[#302B36] bg-[#111014] p-3 font-mono text-xs text-[#C4B5FD] overflow-x-auto">
                      <pre className="text-[11px] leading-tight text-[#E2DCF0]">
                        <code>{track.codeHighlight}</code>
                      </pre>
                    </div>
                  )}

                  {/* Key Topic Bullet Points */}
                  <div className="space-y-2 mb-6">
                    <p className="text-[11px] font-mono text-[#8B8495] uppercase tracking-wider font-semibold">
                      Core Syllabus Highlights:
                    </p>
                    <ul className="space-y-1.5 text-xs text-[#B8B1C2]">
                      {track.keyTopics.slice(0, isLarge ? 5 : 4).map((topic, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#C4B5FD] shrink-0 mt-0.5" />
                          <span className="leading-snug">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer Link */}
                <div className="pt-4 border-t border-[#302B36] flex items-center justify-between">
                  <Link
                    href={track.featuredLessonUrl}
                    className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[#C4B5FD] hover:text-[#D6C8FF] transition-colors"
                  >
                    <span>Start Track</span>
                    <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/learn"
                    className="text-[11px] text-[#8B8495] hover:text-[#F4F0F7] transition-colors"
                  >
                    View in curriculum table
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Curriculum Banner Link */}
        <div className="mt-12 rounded-[8px] border border-[#302B36] bg-[#111014] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-[6px] border border-[#302B36] bg-[#151319] flex items-center justify-center text-[#C4B5FD] shrink-0">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#F4F0F7]">
                Prefer a structured learning matrix?
              </h4>
              <p className="text-xs text-[#8B8495]">
                View all 38 lessons categorized by prerequisites, estimated reading durations, and technical domains.
              </p>
            </div>
          </div>
          <Link
            href="/learn"
            className="shrink-0 inline-flex items-center gap-2 rounded-[6px] border border-[#C4B5FD] bg-[#C4B5FD]/10 px-4 py-2 text-xs font-medium text-[#F4F0F7] hover:bg-[#C4B5FD]/20 transition-colors"
          >
            <span>Open Complete Curriculum Table</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CurriculumBento;
