import Link from 'next/link';
import { 
  ArrowRight, 
  BookOpen, 
  Code2, 
  Sparkles, 
  Terminal, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Zap, 
  Compass,
  FileCode2,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroInteractiveDemo } from '@/components/home/hero-interactive-demo';
import { TrustedEcosystem } from '@/components/home/trusted-ecosystem';
import { CurriculumBento } from '@/components/home/curriculum-bento';
import { RuntimeBenchmarks } from '@/components/home/runtime-benchmarks';
import { TerminalCommandDeck } from '@/components/home/terminal-command-deck';

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col bg-[#111014] text-[#F4F0F7] min-h-screen selection:bg-[#C4B5FD]/30 selection:text-[#F4F0F7]">
      {/* =========================================================================
          HERO SECTION: ToDesktop + Devin + Agno synthesis
          Combines authority headline, trust indicators, and live runtime simulation
          ========================================================================= */}
      <section className="relative overflow-hidden border-b border-[#302B36] bg-[#111014] pt-14 pb-16 sm:pt-20 sm:pb-24">
        {/* Ambient Top Glow */}
        <div className="pointer-events-none absolute -top-48 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#C4B5FD]/10 via-[#7C3AED]/5 to-transparent blur-[140px] rounded-full" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 mb-12 sm:mb-16">
            {/* Version & Status Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] border border-[#302B36] bg-[#151319] text-xs text-[#B8B1C2] shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6FD3A0]" />
              <span className="text-[#C4B5FD] font-mono font-semibold text-[11px] uppercase tracking-wider">
                LeccionesLab v1.2
              </span>
              <span className="text-[#8B8495]" aria-hidden="true">·</span>
              <span>Python 3.12+ Systems & OOP Curriculum</span>
              <span className="text-[#8B8495]" aria-hidden="true">·</span>
              <span className="text-[#6FD3A0] font-mono text-[11px] font-semibold">Free-First</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[#F4F0F7] leading-[1.08] text-balance">
              The Definite Guide to Modern CPython.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-xl text-[#B8B1C2] leading-relaxed max-w-2xl mx-auto font-normal">
              An editorial developer documentation platform. Master object-oriented architecture, CPython memory internals, cooperative MRO, and asyncio concurrency with rigorous technical precision.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <Button href="/docs/python" variant="primary" size="lg" className="shadow-lg shadow-[#C4B5FD]/10">
                <span>Explore Documentation</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
              <Button href="/learn" variant="secondary" size="lg">
                <BookOpen className="h-4 w-4 mr-1.5 text-[#C4B5FD]" />
                <span>View Full Curriculum</span>
              </Button>
            </div>

            {/* Key Platform Verification Metrics */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs text-[#8B8495]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#6FD3A0]" />
                <span className="text-[#B8B1C2]">Tested CPython 3.12+ Specs</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#C4B5FD]" />
                <span className="text-[#B8B1C2]">Zero Paywalls · Zero Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-[#A9C4FF]" />
                <span className="text-[#B8B1C2]">Interactive Memory Simulations</span>
              </div>
            </div>
          </div>

          {/* Interactive Live Runtime Simulator Island */}
          <div className="max-w-5xl mx-auto">
            <HeroInteractiveDemo />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: OneCompiler & Devin-inspired Search Bar + Topic Cards + Trust Strip
          ========================================================================= */}
      <TrustedEcosystem />

      {/* =========================================================================
          SECTION 3: 6-Track Bento Grid (Tracks A through F)
          ========================================================================= */}
      <CurriculumBento />

      {/* =========================================================================
          SECTION 4: Foglamp & Devin-inspired Runtime Benchmarks & Observability
          ========================================================================= */}
      <RuntimeBenchmarks />

      {/* =========================================================================
          SECTION 5: Terminal Command Deck (Interactive CLI Inspection)
          ========================================================================= */}
      <TerminalCommandDeck />

      {/* =========================================================================
          SECTION 6: Design & Editorial Philosophy (Technical Authority)
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#111014] border-b border-[#302B36]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14 space-y-3">
            <div className="flex items-center gap-2 text-xs text-[#C4B5FD] font-mono uppercase tracking-wider font-semibold">
              <Sparkles className="h-4 w-4" />
              <span>Editorial Standard</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#F4F0F7] tracking-tight">
              Crafted for Cognitive Focus.
            </h2>
            <p className="text-sm sm:text-base text-[#B8B1C2] leading-relaxed">
              Every sentence, diagram, and code sample is designed to eliminate ambiguity and reinforce mental models.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-[8px] border border-[#302B36] bg-[#151319] p-7 space-y-3.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-[#302B36] bg-[#111014] text-[#C4B5FD]">
                <FileCode2 className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-[#F4F0F7]">
                01. Technical Density & Zero Slop
              </h3>
              <p className="text-xs sm:text-sm text-[#B8B1C2] leading-relaxed">
                No filler prose, marketing fluff, or generic placeholder loops. Every concept is grounded in CPython bytecode, reference counting, and standard library best practices.
              </p>
            </div>

            <div className="rounded-[8px] border border-[#302B36] bg-[#151319] p-7 space-y-3.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-[#302B36] bg-[#111014] text-[#C4B5FD]">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-[#F4F0F7]">
                02. Pure Dark-Only Ergonomics
              </h3>
              <p className="text-xs sm:text-sm text-[#B8B1C2] leading-relaxed">
                A custom near-black palette (<code className="text-[#C4B5FD]">#111014</code>) and subdued violet accents (<code className="text-[#C4B5FD]">#C4B5FD</code>) optimized for extended reading, low blue-light emission, and high monospaced legibility.
              </p>
            </div>

            <div className="rounded-[8px] border border-[#302B36] bg-[#151319] p-7 space-y-3.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-[#302B36] bg-[#111014] text-[#C4B5FD]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-[#F4F0F7]">
                03. Open Access & Self-Contained
              </h3>
              <p className="text-xs sm:text-sm text-[#B8B1C2] leading-relaxed">
                All 38 lessons and reference guides remain completely free and open. No gated sections, mandatory accounts, telemetry surveillance, or proprietary vendor lock-in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: High-Impact Call to Action
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#151319]/30 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C4B5FD]/5 via-transparent to-transparent" />

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] border border-[#302B36] bg-[#151319] text-xs text-[#B8B1C2]">
            <Compass className="h-3.5 w-3.5 text-[#C4B5FD]" />
            <span>Ready to deepen your mastery?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#F4F0F7] text-balance">
            Start Reading the Python Documentation.
          </h2>

          <p className="text-sm sm:text-base text-[#B8B1C2] max-w-xl mx-auto leading-relaxed">
            Begin with fundamentals, dive into Phase E object-oriented architecture, or inspect Phase F CPython internals.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <Button href="/docs/python/oop/classes-objects-and-attributes" variant="primary" size="lg">
              <span>Start Track E: OOP</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
            <Button href="/docs/python/advanced/object-lifecycle-and-memory-management" variant="secondary" size="lg">
              <span>Start Track F: CPython Systems</span>
            </Button>
          </div>

          <p className="text-[11px] font-mono text-[#8B8495] pt-4">
            Directly accessible at <span className="text-[#C4B5FD]">leccioneslab.vercel.app/docs/python</span>
          </p>
        </div>
      </section>
    </div>
  );
}
