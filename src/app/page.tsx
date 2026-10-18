import Link from 'next/link';
import { ArrowRight, BookOpen, Code2, Sparkles, Terminal, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/ui/code-block';
import { Wordmark } from '@/components/brand/wordmark';

const SAMPLE_PYTHON_CODE = `# LeccionesLab: Clean, Idiomatic Python
def calculate_growth_rate(initial: float, final: float, periods: int) -> float:
    """Calculate the compound growth rate over n periods."""
    if initial <= 0 or periods <= 0:
        raise ValueError("Initial value and periods must be strictly positive.")
    return (final / initial) ** (1 / periods) - 1

# Calculate 3-year compound developer adoption rate
rate = calculate_growth_rate(initial=1200, final=4800, periods=3)
print(f"Annual growth rate: {rate:.1%}")  # -> Annual growth rate: 58.7%`;

export default function HomePage() {
  const learningTracks = [
    {
      title: 'Python Fundamentals',
      description: 'Master core primitives: variables, scopes, memory references, and control structures with accurate mental models.',
      url: '/docs/python/basics/variables',
      lessonsCount: '4 modules',
      category: 'Tutorial',
    },
    {
      title: 'Functions & First-Class Objects',
      description: 'Explore positional arguments, keyword unpacking, closures, and the Python LEGB scoping resolution algorithm.',
      url: '/docs/python/basics/functions',
      lessonsCount: 'Deep dive',
      category: 'Tutorial',
    },
    {
      title: 'Built-in Functions Reference',
      description: 'Exhaustive signatures, parameter constraints, exceptions, and return types for Python standard built-ins.',
      url: '/docs/python/reference/built-in-functions',
      lessonsCount: 'Reference spec',
      category: 'Reference',
    },
    {
      title: 'Environment & Tooling',
      description: 'Modern Python 3.12+ project structure, virtual environment configuration, typing hints, and package ergonomics.',
      url: '/docs/python/getting-started',
      lessonsCount: 'Setup guide',
      category: 'Guide',
    },
  ];

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[#302B36] bg-[#111014] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline and Positioning */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs text-[#B8B1C2]">
                <span className="text-[#C4B5FD] font-medium">Developer Documentation Platform</span>
                <span aria-hidden="true">·</span>
                <span>Release v1.0</span>
                <span aria-hidden="true">·</span>
                <span>Free-First</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#F4F0F7] leading-[1.1] text-balance">
                Learn. Build. Understand.
              </h1>

              <p className="text-base sm:text-lg text-[#B8B1C2] leading-relaxed max-w-2xl">
                LeccionesLab is an editorial developer documentation and learning platform.
                Combining rigorous technical reference with progressive tutorials, crafted for
                deep focus and zero distraction.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button href="/docs/python" variant="primary" size="lg">
                  Explore Python Docs
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
                <Button href="/learn" variant="secondary" size="lg">
                  View Curriculum
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-[#302B36] flex flex-wrap items-center gap-6 text-xs text-[#8B8495]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#6FD3A0]" />
                  <span>Verified Python 3.12+ Specs</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#C4B5FD]" />
                  <span>Free-First & Privacy Conscious</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-[#A9C4FF]" />
                  <span>Copyable & Tested Snippets</span>
                </div>
              </div>
            </div>

            {/* Right Column: Code Showcase */}
            <div className="lg:col-span-5">
              <div className="rounded-[8px] border border-[#302B36] bg-[#151319] p-1 shadow-2xl">
                <div className="flex items-center justify-between px-3 py-2 border-b border-[#302B36] text-xs text-[#8B8495]">
                  <span className="font-mono text-[#F4F0F7]">growth_model.py</span>
                  <span className="text-[11px] text-[#8B8495]">Python 3.12</span>
                </div>
                <CodeBlock
                  code={SAMPLE_PYTHON_CODE}
                  language="python"
                  className="my-0 border-0 rounded-none bg-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Learning Modules */}
      <section className="py-16 bg-[#151319]/40 border-b border-[#302B36]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#C4B5FD] font-semibold mb-1">
                Curriculum
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#F4F0F7] tracking-tight">
                Featured Python Modules
              </h2>
            </div>
            <Link
              href="/docs/python"
              className="text-xs font-medium text-[#C4B5FD] hover:text-[#D6C8FF] flex items-center gap-1 transition-colors"
            >
              Browse all documentation <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {learningTracks.map((track) => (
              <Link
                key={track.title}
                href={track.url}
                className="group flex flex-col justify-between rounded-[8px] border border-[#302B36] bg-[#151319] p-5 transition-all hover:border-[#8B8495]/40 hover:bg-[#1B1820]"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#8B8495]">
                    <span className="text-[#C4B5FD]">{track.category}</span>
                    <span>{track.lessonsCount}</span>
                  </div>
                  <h3 className="text-base font-semibold text-[#F4F0F7] group-hover:text-[#C4B5FD] transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-xs text-[#B8B1C2] leading-relaxed">
                    {track.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#302B36]/60 flex items-center text-xs font-medium text-[#8B8495] group-hover:text-[#F4F0F7] transition-colors">
                  <span>Start module</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-auto transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Core Architectural Principles */}
      <section className="py-16 bg-[#111014]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs uppercase tracking-wider text-[#C4B5FD] font-semibold mb-1">
              Design Philosophy
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#F4F0F7] tracking-tight">
              Built for Technical Clarity
            </h2>
            <p className="text-sm text-[#B8B1C2] mt-2 leading-relaxed">
              Every detail is engineered to support deep cognitive focus and accurate technical comprehension.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-[8px] border border-[#302B36] bg-[#151319] p-6 space-y-3">
              <h3 className="text-base font-semibold text-[#F4F0F7]">
                01. Content First & Zero Slop
              </h3>
              <p className="text-xs text-[#B8B1C2] leading-relaxed">
                No decorative mascot animations, fake telemetry scoreboards, or mechanical pseudo-code headers.
                Technical information is the primary interface.
              </p>
            </div>

            <div className="rounded-[8px] border border-[#302B36] bg-[#151319] p-6 space-y-3">
              <h3 className="text-base font-semibold text-[#F4F0F7]">
                02. Dedicated Dark-Only Canvas
              </h3>
              <p className="text-xs text-[#B8B1C2] leading-relaxed">
                A warm near-black background (<code className="text-[#C4B5FD]">#111014</code>) paired with restrained
                soft violet (<code className="text-[#C4B5FD]">#C4B5FD</code>) accents reduces eye fatigue during extended reading sessions.
              </p>
            </div>

            <div className="rounded-[8px] border border-[#302B36] bg-[#151319] p-6 space-y-3">
              <h3 className="text-base font-semibold text-[#F4F0F7]">
                03. Free-First Architecture
              </h3>
              <p className="text-xs text-[#B8B1C2] leading-relaxed">
                Documentation and references remain entirely accessible without paywalls, subscriptions,
                mandatory user accounts, or proprietary API key dependencies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
