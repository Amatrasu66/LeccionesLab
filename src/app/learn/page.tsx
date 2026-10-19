import Link from 'next/link';
import { BookOpen, CheckCircle2, ArrowRight, Code2, Layers, Cpu, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Learning Curriculum — LeccionesLab',
  description: 'Structured tutorials and learning pathways for modern developers.',
};

interface ModuleItem {
  title: string;
  url?: string;
  available: boolean;
}

interface LearningTrack {
  title: string;
  level: string;
  time: string;
  description: string;
  modules: ModuleItem[];
  status: string;
}

export default function LearnPage() {
  const tracks: LearningTrack[] = [
    {
      title: 'Python Foundations',
      level: 'Beginner',
      time: '4 hours',
      description: 'The foundational concepts of modern Python: naming semantics, memory references, dynamic types, expressions, control flow, strings, and functional execution.',
      modules: [
        { title: 'Environment & Tooling', url: '/docs/python/getting-started', available: true },
        { title: 'Syntax & Primitive Types', url: '/docs/python/basics/syntax-and-types', available: true },
        { title: 'Variables, Assignment & References', url: '/docs/python/basics/variables', available: true },
        { title: 'Operators & Expressions', url: '/docs/python/basics/operators-and-expressions', available: true },
        { title: 'Control Flow & Pattern Matching', url: '/docs/python/basics/control-flow', available: true },
        { title: 'Strings & Text Processing', url: '/docs/python/basics/strings', available: true },
        { title: 'Functions, Signatures & Scopes', url: '/docs/python/basics/functions', available: true },
        { title: 'Standard Built-in Functions', url: '/docs/python/reference/built-in-functions', available: true },
      ],
      status: 'Active',
    },
    {
      title: 'Strings & Collections',
      level: 'Beginner to Intermediate',
      time: '3.5 hours',
      description: 'Master memory models, algorithmic complexities, contiguous pointer arrays, immutable records, hash tables, and unique mathematical sets.',
      modules: [
        { title: 'Lists & Dynamic Arrays', url: '/docs/python/collections/lists', available: true },
        { title: 'Tuples, Immutability & Unpacking', url: '/docs/python/collections/tuples', available: true },
        { title: 'Dictionaries & Hash Tables', url: '/docs/python/collections/dictionaries', available: true },
        { title: 'Sets & Mathematical Operations', url: '/docs/python/collections/sets', available: true },
      ],
      status: 'Active',
    },
    {
      title: 'Modules, Packages & Standard Library',
      level: 'Intermediate',
      time: '4.5 hours',
      description: 'System-level modularity: namespaces, packaging, standard library essentials, iteration tools, CLIs with argparse, and subprocesses.',
      modules: [
        { title: 'Modules, Namespaces & Imports', url: '/docs/python/modules/modules-and-imports', available: true },
        { title: 'Packages & Circular Imports', url: '/docs/python/modules/packages-and-namespaces', available: true },
        { title: 'Executable Scripts & Entry Points', url: '/docs/python/modules/scripts-and-entrypoints', available: true },
        { title: 'Standard Library Essentials', url: '/docs/python/modules/standard-library', available: true },
        { title: 'Iteration & Functional Utilities', url: '/docs/python/modules/iteration-utilities', available: true },
        { title: 'Command-Line Interfaces (argparse)', url: '/docs/python/modules/cli-with-argparse', available: true },
        { title: 'Subprocess Execution & Security', url: '/docs/python/modules/subprocess-execution', available: true },
        { title: 'Virtual Environments & Packaging', url: '/docs/python/modules/environments-and-packaging', available: true },
      ],
      status: 'Active',
    },
    {
      title: 'Intermediate Language Features',
      level: 'Intermediate',
      time: '4.5 hours',
      description: 'Deep language capabilities: comprehensions, the iterator protocol, generator pipelines, closures, decorators, context managers, exceptions, and static typing.',
      modules: [
        { title: 'Comprehensions & Generator Expressions', url: '/docs/python/intermediate/comprehensions', available: true },
        { title: 'Iterators, Generators & Lazy Evaluation', url: '/docs/python/intermediate/iterators-and-generators', available: true },
        { title: 'Closures, Scopes & Decorators', url: '/docs/python/intermediate/decorators-and-closures', available: true },
        { title: 'Context Managers & Resource Management', url: '/docs/python/intermediate/context-managers', available: true },
        { title: 'Exception Hierarchies & Error Handling', url: '/docs/python/intermediate/exception-handling', available: true },
        { title: 'Type Hints & Static Type Analysis', url: '/docs/python/intermediate/type-hints-and-static-typing', available: true },
      ],
      status: 'Active',
    },
    {
      title: 'Object-Oriented Programming',
      level: 'Intermediate to Advanced',
      time: '5 hours',
      description: 'Class design, Method Resolution Order (MRO), dunder methods, abstract base classes, protocols, and dataclasses.',
      modules: [
        { title: 'Classes & Instance Attributes', available: false },
        { title: 'Inheritance, super() & MRO', available: false },
        { title: 'Dunder Methods & Operator Overloading', available: false },
        { title: 'Protocols & Abstract Base Classes', available: false },
      ],
      status: 'Planned',
    },
    {
      title: 'Modern Asynchronous Python (asyncio)',
      level: 'Advanced',
      time: '5 hours',
      description: 'Event loops, coroutines, tasks, cooperative multitasking, and asynchronous networking patterns.',
      modules: [
        { title: 'Event Loop Foundations', available: false },
        { title: 'Tasks vs Futures', available: false },
        { title: 'High-Throughput IO Bound Services', available: false },
      ],
      status: 'Planned',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl mb-12 space-y-4">
        <div className="flex items-center gap-2 text-xs text-[#8B8495]">
          <span className="text-[#C4B5FD] font-medium">Curriculum</span>
          <span aria-hidden="true">·</span>
          <span>Learning Tracks</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#F4F0F7]">
          Structured Developer Tutorials
        </h1>
        <p className="text-base text-[#B8B1C2] leading-relaxed">
          Follow guided pathways designed to build rigorous mental models. Each module balances conceptual depth,
          reproducible code examples, and production-tested patterns.
        </p>
      </div>

      {/* Tracks Grid */}
      <div className="space-y-8">
        {tracks.map((track) => (
          <div
            key={track.title}
            className="rounded-[8px] border border-[#302B36] bg-[#151319] p-6 sm:p-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#302B36]">
              <div>
                <div className="flex items-center gap-3 text-xs text-[#8B8495] mb-2">
                  <span className="text-[#C4B5FD] font-medium">{track.level}</span>
                  <span aria-hidden="true">·</span>
                  <span>{track.time}</span>
                  <span aria-hidden="true">·</span>
                  <span className={track.status === 'Active' ? 'text-[#6FD3A0]' : 'text-[#8B8495]'}>
                    {track.status}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-[#F4F0F7]">
                  {track.title}
                </h2>
              </div>
              {track.status === 'Active' ? (
                <Button href={track.modules[0].url || '/docs/python'} variant="primary" size="default">
                  Start Track
                </Button>
              ) : (
                <span className="text-xs text-[#8B8495] flex items-center gap-1.5 self-start sm:self-center">
                  <Clock className="h-3.5 w-3.5" />
                  {track.status}
                </span>
              )}
            </div>

            <p className="text-sm text-[#B8B1C2] mt-6 leading-relaxed max-w-3xl">
              {track.description}
            </p>

            <div className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8B8495] mb-3">
                Curriculum Modules
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {track.modules.map((mod, idx) => {
                  if (mod.available && mod.url) {
                    return (
                      <Link
                        key={mod.title}
                        href={mod.url}
                        className="flex items-center gap-3 rounded-[6px] border border-[#302B36] bg-[#1B1820] p-3 text-xs text-[#F4F0F7] hover:border-[#8B8495]/40 hover:bg-[#24202A] transition-colors"
                      >
                        <span className="font-mono text-[#8B8495] text-[11px]">
                          {String(idx + 1).padStart(2, '0')}.
                        </span>
                        <span className="font-medium truncate">{mod.title}</span>
                        <ArrowRight className="h-3.5 w-3.5 ml-auto text-[#8B8495] shrink-0" />
                      </Link>
                    );
                  }

                  return (
                    <div
                      key={mod.title}
                      className="flex items-center gap-3 rounded-[6px] border border-[#302B36]/60 bg-[#151319] p-3 text-xs text-[#8B8495]"
                    >
                      <span className="font-mono text-[#8B8495]/60 text-[11px]">
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      <span className="truncate">{mod.title}</span>
                      <span className="ml-auto text-[10px] uppercase tracking-wider text-[#8B8495]/70">
                        Upcoming
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
