import Link from 'next/link';
import { BookOpen, CheckCircle2, ArrowRight, Code2, Layers, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Learning Curriculum — LeccionesLab',
  description: 'Structured tutorials and learning pathways for modern developers.',
};

export default function LearnPage() {
  const tracks = [
    {
      title: 'Python 3 Fundamentals',
      level: 'Beginner to Intermediate',
      time: '3 hours',
      description: 'The foundational concepts of modern Python: naming semantics, memory references, dynamic types, execution models, and structural control flow.',
      modules: [
        { title: 'Environment & Tooling', url: '/docs/python/getting-started' },
        { title: 'Variables, Assignment & References', url: '/docs/python/basics/variables' },
        { title: 'Functions, Signatures & Scopes', url: '/docs/python/basics/functions' },
        { title: 'Standard Built-in Functions', url: '/docs/python/reference/built-in-functions' },
      ],
      status: 'Active',
    },
    {
      title: 'Data Structures & Algorithms in Python',
      level: 'Intermediate',
      time: '4 hours',
      description: 'Understanding memory overhead, amortized complexities, list comprehensions, generator pipelines, and dictionary hash tables.',
      modules: [
        { title: 'Lists, Tuples & Memory Models', url: '/docs/python' },
        { title: 'Hash Maps & Set Lookups', url: '/docs/python' },
        { title: 'Iterators, Generators & Yield', url: '/docs/python' },
      ],
      status: 'In Development',
    },
    {
      title: 'Modern Asynchronous Python (asyncio)',
      level: 'Advanced',
      time: '5 hours',
      description: 'Event loops, coroutines, tasks, cooperative multitasking, and asynchronous networking patterns.',
      modules: [
        { title: 'Event Loop Foundations', url: '/docs/python' },
        { title: 'Tasks vs Futures', url: '/docs/python' },
        { title: 'High-Throughput IO Bound Services', url: '/docs/python' },
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
              {track.status === 'Active' && (
                <Button href="/docs/python" variant="primary" size="default">
                  Start Track
                </Button>
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
                {track.modules.map((mod, idx) => (
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
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
