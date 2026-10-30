'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Cpu, 
  Layers, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  Terminal,
  Activity,
  GitBranch,
  Database
} from 'lucide-react';

interface Scenario {
  id: string;
  name: string;
  badge: string;
  filename: string;
  description: string;
  code: string;
  runtimeTrace: Array<{
    step: number;
    title: string;
    detail: string;
    status: 'info' | 'active' | 'success' | 'warning';
  }>;
  stats: {
    metric1: { label: string; value: string };
    metric2: { label: string; value: string };
  };
}

const SCENARIOS: Scenario[] = [
  {
    id: 'memory-gc',
    name: 'CPython Memory & Cyclic GC',
    badge: 'Track F · Lesson 1',
    filename: 'lifecycle_gc.py',
    description: 'Trace reference count decrements and generational cycle sweeps in real time.',
    code: `import gc, weakref

class Node:
    def __init__(self, name: str):
        self.name = name
        self.cycle_ref = None

# Create isolated circular reference
a, b = Node("Node-A"), Node("Node-B")
a.cycle_ref, b.cycle_ref = b, a

# Drop strong root references
del a, b

# Generational cyclic sweep reclaims cycle
unreachable = gc.collect()
print(f"Cyclic objects collected: {unreachable}")`,
    runtimeTrace: [
      { step: 1, title: 'Heap Allocation', detail: 'Allocated Node-A (refcnt=1) & Node-B (refcnt=1)', status: 'info' },
      { step: 2, title: 'Cycle Formation', detail: 'Cross-referenced a.cycle_ref and b.cycle_ref (refcnt=2)', status: 'warning' },
      { step: 3, title: 'Root Severed', detail: 'del a, b called. External root pointers zeroed', status: 'active' },
      { step: 4, title: 'Gen-0 Sweep Triggered', detail: 'gc.collect() traversed pointer graphs; 2 cyclic objects freed', status: 'success' },
    ],
    stats: {
      metric1: { label: 'Heap Reclaimed', value: '100% of cycle' },
      metric2: { label: 'Dealloc Speed', value: '0.04 ms' },
    },
  },
  {
    id: 'async-taskgroup',
    name: 'Asyncio TaskGroup & I/O',
    badge: 'Track F · Lesson 5',
    filename: 'async_gateway.py',
    description: 'Structured concurrency with zero-leak cancellation and sub-millisecond dispatch.',
    code: `import asyncio

async def fetch_telemetry(sensor_id: int):
    await asyncio.sleep(0.08)
    return {"sensor": sensor_id, "status": "nominal"}

async def main():
    async with asyncio.TaskGroup() as tg:
        tasks = [tg.create_task(fetch_telemetry(i)) for i in range(4)]
    
    # All 4 tasks completed concurrently in 80ms!
    results = [t.result() for t in tasks]
    return results

asyncio.run(main())`,
    runtimeTrace: [
      { step: 1, title: 'TaskGroup Init', detail: 'Structured concurrency scope opened on event loop', status: 'info' },
      { step: 2, title: 'Cooperative Yield', detail: '4 coroutines await I/O; OS socket multiplexer polled', status: 'active' },
      { step: 3, title: 'Parallel Resolution', detail: 'All 4 sensors replied in 82ms total wall clock', status: 'success' },
      { step: 4, title: 'Clean Unwind', detail: 'Scope closed with zero orphaned background tasks', status: 'success' },
    ],
    stats: {
      metric1: { label: 'Wall Time', value: '82 ms vs 320 ms sync' },
      metric2: { label: 'Active Sockets', value: '4 concurrent' },
    },
  },
  {
    id: 'c3-mro',
    name: 'Cooperative MRO & super()',
    badge: 'Track E · Lesson 3',
    filename: 'c3_linearization.py',
    description: 'Predictable multiple inheritance traversal via C3 Linearization.',
    code: `class Base:
    def execute(self): return ["Base"]

class SecurityMixin(Base):
    def execute(self):
        return ["Security"] + super().execute()

class AuditMixin(Base):
    def execute(self):
        return ["Audit"] + super().execute()

class ProductionService(SecurityMixin, AuditMixin):
    pass

# MRO: ProductionService -> Security -> Audit -> Base -> object
service = ProductionService()
print(service.execute())`,
    runtimeTrace: [
      { step: 1, title: 'Class Definition', detail: 'C3 Linearization computed monotonic resolution order', status: 'info' },
      { step: 2, title: 'super() Dispatch', detail: 'SecurityMixin calls next MRO candidate: AuditMixin', status: 'active' },
      { step: 3, title: 'Cooperative Chain', detail: 'AuditMixin forwards call cooperatively to Base', status: 'info' },
      { step: 4, title: 'Resolved Order', detail: 'Result: [Security, Audit, Base]', status: 'success' },
    ],
    stats: {
      metric1: { label: 'MRO Depth', value: '5 hierarchy levels' },
      metric2: { label: 'Diamond Collision', value: '0 (C3 Monotonic)' },
    },
  },
  {
    id: 'slots-memory',
    name: 'Attribute Lookup & __slots__',
    badge: 'Track E · Lesson 7',
    filename: 'slots_benchmark.py',
    description: 'Eliminate instance __dict__ overhead and save 65% memory in high-scale deployments.',
    code: `class StandardPoint:
    def __init__(self, x: float, y: float):
        self.x, self.y = x, y  # Uses instance __dict__ (152 bytes)

class SlottedPoint:
    __slots__ = ("x", "y")    # Uses compact C pointer array (48 bytes)
    def __init__(self, x: float, y: float):
        self.x, self.y = x, y

# Instantiate 1,000,000 coordinate vectors
# Slotted version reduces working set from 152MB to 48MB!`,
    runtimeTrace: [
      { step: 1, title: 'Type Inspection', detail: 'Descriptor protocol identifies __slots__ tuple', status: 'info' },
      { step: 2, title: 'Namespace Suppression', detail: '__dict__ and __weakref__ allocations suppressed', status: 'active' },
      { step: 3, title: 'C-Level Offsets', detail: 'Direct member offset resolution bypasses hash lookups', status: 'success' },
      { step: 4, title: 'Memory Reduction', detail: '68.4% total memory footprint reduction verified', status: 'success' },
    ],
    stats: {
      metric1: { label: 'Per-Instance Size', value: '48 B vs 152 B' },
      metric2: { label: 'Memory Saved', value: '68.4% reduction' },
    },
  },
];

export function HeroInteractiveDemo() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('memory-gc');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(4);
  const [copied, setCopied] = useState<boolean>(false);
  const [, startTransition] = useTransition();

  const currentScenario = SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];

  const handleSelectScenario = (id: string) => {
    startTransition(() => {
      setActiveScenarioId(id);
      setActiveStep(4);
      setIsSimulating(false);
    });
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setActiveStep(1);

    const stepInterval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= 4) {
          clearInterval(stepInterval);
          setIsSimulating(false);
          return 4;
        }
        return prev + 1;
      });
    }, 450);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(currentScenario.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="w-full rounded-[12px] border border-[#302B36] bg-[#151319]/90 shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-[#8B8495]/40">
      {/* Top Window Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#302B36] bg-[#121015] px-4 py-3 gap-3">
        {/* Left: Window Controls + Current Scenario Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-[#FF5F56]/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-[#FFBD2E]/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-[#27C93F]/80 inline-block" />
          </div>
          <span className="text-xs font-mono text-[#8B8495] hidden sm:inline">
            leccioneslab://interactive-runtime
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-[4px] bg-[#24202A] text-[#C4B5FD] border border-[#302B36]">
            {currentScenario.filename}
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 rounded-[6px] border border-[#302B36] bg-[#1B1820] px-2.5 py-1 text-xs text-[#B8B1C2] hover:bg-[#24202A] hover:text-[#F4F0F7] transition-colors focus-visible:outline-2 focus-visible:outline-[#C4B5FD]"
            aria-label={copied ? 'Code copied' : 'Copy Python code'}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-[#6FD3A0]" />
                <span className="text-[#6FD3A0]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="flex items-center gap-1.5 rounded-[6px] bg-[#C4B5FD] px-3 py-1 text-xs font-medium text-[#111014] hover:bg-[#D6C8FF] active:scale-95 transition-all disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-white"
          >
            {isSimulating ? (
              <>
                <RotateCcw className="h-3.5 w-3.5 animate-spin" />
                <span>Executing...</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Simulate Trace</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Scenario Selector Tabs (OneCompiler / Agno inspired) */}
      <div className="flex border-b border-[#302B36] bg-[#17151D] overflow-x-auto scrollbar-none px-2 py-1.5 gap-1.5">
        {SCENARIOS.map((sc) => {
          const isActive = sc.id === activeScenarioId;
          return (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(sc.id)}
              className={`shrink-0 flex items-center gap-2 rounded-[6px] px-3 py-1.5 text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#24202A] text-[#F4F0F7] border border-[#302B36] shadow-sm'
                  : 'text-[#8B8495] hover:text-[#B8B1C2] hover:bg-[#1B1820]/60'
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-[#C4B5FD]' : 'bg-[#8B8495]/40'}`} />
              <span>{sc.name}</span>
            </button>
          );
        })}
      </div>

      {/* Two-Column Editor & Runtime Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
        {/* Left: Code Pane (7 cols) */}
        <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-[#302B36] p-4 sm:p-5 flex flex-col justify-between bg-[#131117]">
          <div>
            <div className="flex items-center justify-between text-xs text-[#8B8495] mb-3">
              <span className="text-[#C4B5FD] font-mono font-medium">{currentScenario.badge}</span>
              <span className="text-[11px] text-[#8B8495]">{currentScenario.description}</span>
            </div>

            <pre className="font-mono text-xs sm:text-[13px] leading-[1.65] text-[#F4F0F7] overflow-x-auto selection:bg-[#342D40] py-1">
              <code>{currentScenario.code}</code>
            </pre>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-5 pt-3 border-t border-[#302B36]/70 grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-[6px] bg-[#18161E] border border-[#302B36] p-2.5">
              <span className="text-[#8B8495] block text-[11px] mb-0.5">{currentScenario.stats.metric1.label}</span>
              <span className="font-mono font-semibold text-[#6FD3A0] text-sm">{currentScenario.stats.metric1.value}</span>
            </div>
            <div className="rounded-[6px] bg-[#18161E] border border-[#302B36] p-2.5">
              <span className="text-[#8B8495] block text-[11px] mb-0.5">{currentScenario.stats.metric2.label}</span>
              <span className="font-mono font-semibold text-[#C4B5FD] text-sm">{currentScenario.stats.metric2.value}</span>
            </div>
          </div>
        </div>

        {/* Right: Runtime Execution Trace & State Inspector (5 cols) (Devin & Foglamp style) */}
        <div className="lg:col-span-5 p-4 sm:p-5 bg-[#16141C] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#302B36]">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-[#C4B5FD]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#F4F0F7]">
                  CPython Runtime Trace
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#6FD3A0]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#6FD3A0] animate-pulse" />
                Live Hook
              </span>
            </div>

            {/* Trace Step Timeline */}
            <div className="space-y-3">
              {currentScenario.runtimeTrace.map((trace) => {
                const isReached = activeStep >= trace.step;
                const isCurrent = activeStep === trace.step;

                return (
                  <div
                    key={trace.step}
                    className={`rounded-[8px] border p-3 transition-all duration-300 text-xs ${
                      isCurrent
                        ? 'border-[#C4B5FD] bg-[#24202A] shadow-md shadow-[#C4B5FD]/5'
                        : isReached
                        ? 'border-[#302B36] bg-[#1B1820]'
                        : 'border-[#302B36]/40 bg-[#141218]/40 opacity-40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-mono font-bold ${
                            isReached ? 'bg-[#C4B5FD] text-[#111014]' : 'bg-[#302B36] text-[#8B8495]'
                          }`}
                        >
                          {trace.step}
                        </span>
                        <span className="font-medium text-[#F4F0F7]">{trace.title}</span>
                      </div>
                      <span className="font-mono text-[10px] text-[#8B8495]">
                        T+{trace.step * 25}ms
                      </span>
                    </div>
                    <p className="text-[11px] text-[#B8B1C2] leading-relaxed pl-6">
                      {trace.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Deep-Dive Link to Curriculum */}
          <div className="mt-5 pt-3 border-t border-[#302B36]">
            <Link
              href={
                activeScenarioId === 'memory-gc'
                  ? '/docs/python/advanced/object-lifecycle-and-memory-management'
                  : activeScenarioId === 'async-taskgroup'
                  ? '/docs/python/advanced/asynchronous-python-with-asyncio'
                  : activeScenarioId === 'c3-mro'
                  ? '/docs/python/oop/inheritance-and-polymorphism'
                  : '/docs/python/oop/descriptors-and-attribute-access'
              }
              className="group flex items-center justify-between text-xs text-[#C4B5FD] hover:text-[#D6C8FF] transition-colors"
            >
              <span>Read the full technical specification</span>
              <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroInteractiveDemo;
