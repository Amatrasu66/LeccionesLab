import Link from 'next/link';
import { ArrowRight, Code2, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Languages Directory — LeccionesLab',
  description: 'Explore documentation and tutorials across programming languages.',
};

export default function LanguagesPage() {
  const languages = [
    {
      name: 'Python',
      version: '3.12+',
      status: 'Active',
      description: 'Comprehensive tutorials, syntax references, memory models, and standard library documentation.',
      primaryUrl: '/docs/python',
      topics: ['Variables & Scopes', 'Functions & Arguments', 'Built-in References', 'Environment Setup'],
      featured: true,
    },
    {
      name: 'TypeScript & JavaScript',
      version: 'ES2024 / TS 5.7',
      status: 'Planned',
      description: 'Static typing, type narrowing, async generators, event loop models, and modern Node/browser runtimes.',
      primaryUrl: '#',
      topics: ['Type Systems', 'Async/Await & Promises', 'Runtime Scopes'],
      featured: false,
    },
    {
      name: 'Rust',
      version: 'Edition 2024',
      status: 'Planned',
      description: 'Ownership, borrowing, lifetimes, pattern matching, zero-cost abstractions, and fearless concurrency.',
      primaryUrl: '#',
      topics: ['Borrow Checker', 'Lifetimes & Traits', 'Memory Safety'],
      featured: false,
    },
    {
      name: 'Go',
      version: '1.23+',
      status: 'Planned',
      description: 'Goroutines, channels, interfaces, structural typing, and high-performance server engineering.',
      primaryUrl: '#',
      topics: ['Concurrency Primitives', 'Interfaces', 'Memory Allocation'],
      featured: false,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl mb-12 space-y-4">
        <div className="flex items-center gap-2 text-xs text-[#8B8495]">
          <span className="text-[#C4B5FD] font-medium">Directory</span>
          <span aria-hidden="true">·</span>
          <span>Languages</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#F4F0F7]">
          Supported Languages & Runtimes
        </h1>
        <p className="text-base text-[#B8B1C2] leading-relaxed">
          LeccionesLab provides standardized, reference-grade documentation. The platform begins with Python 3.12+,
          with additional ecosystems adhering to the same strict editorial and clarity standards.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {languages.map((lang) => (
          <div
            key={lang.name}
            className={`rounded-[8px] border p-6 flex flex-col justify-between ${
              lang.featured
                ? 'border-[#C4B5FD]/40 bg-[#151319] shadow-lg'
                : 'border-[#302B36] bg-[#151319]/60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold text-[#F4F0F7]">{lang.name}</h2>
                  <span className="text-xs font-mono text-[#8B8495]">{lang.version}</span>
                </div>
                <span
                  className={`text-xs font-medium ${
                    lang.status === 'Active' ? 'text-[#6FD3A0]' : 'text-[#8B8495]'
                  }`}
                >
                  {lang.status}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#B8B1C2] leading-relaxed mb-6">
                {lang.description}
              </p>

              <div className="space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8B8495]">
                  Coverage Areas
                </span>
                <div className="flex flex-wrap gap-2">
                  {lang.topics.map((t) => (
                    <span
                      key={t}
                      className="text-xs text-[#F4F0F7] bg-[#1B1820] border border-[#302B36] rounded-[4px] px-2 py-1 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#302B36] flex items-center justify-between">
              {lang.featured ? (
                <Button href={lang.primaryUrl} variant="primary" size="sm">
                  Open Python Docs
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              ) : (
                <span className="text-xs text-[#8B8495] flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  Planned in roadmap
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
