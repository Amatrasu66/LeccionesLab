'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Terminal, 
  Copy, 
  Check, 
  Play, 
  Sparkles, 
  Cpu, 
  ArrowRight,
  Code2,
  Layers
} from 'lucide-react';

interface CommandDeckTab {
  id: string;
  label: string;
  command: string;
  description: string;
  output: string[];
  docLink: string;
  docTitle: string;
}

const COMMAND_TABS: CommandDeckTab[] = [
  {
    id: 'dis',
    label: 'Bytecode Inspection',
    command: 'python -m dis script.py',
    description: 'Disassemble Python functions into their underlying CPython virtual machine instructions.',
    output: [
      '  1           0 RESUME                   0',
      '  2           2 LOAD_FAST                0 (x)',
      '              4 LOAD_FAST                1 (y)',
      '              6 BINARY_OP_ADD_INT        0 (+)',
      '             10 RETURN_VALUE',
      '',
      '# CPython 3.12 inline cache specialized binary operator observed',
    ],
    docLink: '/docs/python/advanced/cpython-bytecode-and-disassembly',
    docTitle: 'Track F · Lesson 3: CPython Bytecode & Disassembly',
  },
  {
    id: 'profile',
    label: 'Deterministic Profiling',
    command: 'python -m cProfile -s tottime algorithm.py',
    description: 'Profile execution time spent per function call without third-party instrumentation overhead.',
    output: [
      '   ncalls  tottime  percall  cumtime  percall filename:lineno(function)',
      '  1000000    0.042    0.000    0.042    0.000 {method \'append\' of \'list\' objects}',
      '        1    0.038    0.038    0.080    0.080 algorithm.py:12(process_batch)',
      '        1    0.001    0.001    0.081    0.081 algorithm.py:1(<module>)',
      '',
      '# Identified list pre-allocation opportunity: saves 42ms overhead',
    ],
    docLink: '/docs/python/advanced/performance-profiling-and-optimization',
    docTitle: 'Track F · Lesson 7: Performance Profiling & Optimization',
  },
  {
    id: 'mypy',
    label: 'Static Type Checking',
    command: 'mypy --strict src/',
    description: 'Enforce type safety across generic protocols, invariance/covariance, and optional parameters.',
    output: [
      'Success: no issues found in 38 source files',
      'All type variables and Protocols statically verified against PEP 544',
      '0 missing type annotations detected across public interface',
    ],
    docLink: '/docs/python/intermediate/type-hints-and-static-typing',
    docTitle: 'Track C · Lesson 6: Type Hints & Static Typing',
  },
  {
    id: 'venv',
    label: 'Modern Environment Setup',
    command: 'python -m venv .venv && source .venv/bin/activate',
    description: 'Create an isolated execution sandbox and inspect sys.prefix runtime resolution.',
    output: [
      'Created virtual environment at .venv',
      'Symlinked CPython 3.12 binary to .venv/bin/python',
      'Site-packages isolated from global interpreter paths',
    ],
    docLink: '/docs/python/modules/environments-and-packaging',
    docTitle: 'Track D · Lesson 3: Environments & Packaging',
  },
];

export function TerminalCommandDeck() {
  const [activeTabId, setActiveTabId] = useState<string>('dis');
  const [copied, setCopied] = useState(false);

  const activeTab = COMMAND_TABS.find((t) => t.id === activeTabId) || COMMAND_TABS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTab.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="border-b border-[#302B36] bg-[#151319]/40 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Explanatory Context */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-2 text-xs text-[#C4B5FD] font-mono uppercase tracking-wider font-semibold">
              <Terminal className="h-4 w-4" />
              <span>Developer Command Deck</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F4F0F7] leading-tight">
              Master the Native CPython CLI Toolchain.
            </h2>

            <p className="text-sm text-[#B8B1C2] leading-relaxed">
              Modern Python development requires mastery beyond code syntax. Learn to inspect bytecode, profile hot loops, enforce static typings, and orchestrate environments with standard tooling.
            </p>

            {/* Quick selector buttons */}
            <div className="space-y-2 pt-2">
              {COMMAND_TABS.map((tab) => {
                const isActive = activeTabId === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTabId(tab.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-[6px] text-left transition-all ${
                      isActive
                        ? 'border border-[#C4B5FD] bg-[#C4B5FD]/10 text-[#F4F0F7]'
                        : 'border border-[#302B36] bg-[#151319] text-[#8B8495] hover:border-[#8B8495]/40 hover:text-[#F4F0F7]'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold">{tab.label}</div>
                      <div className="font-mono text-[11px] text-[#8B8495] mt-0.5">{tab.command}</div>
                    </div>
                    <ArrowRight className={`h-3.5 w-3.5 transition-transform ${isActive ? 'text-[#C4B5FD] translate-x-0.5' : 'text-[#8B8495]'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Terminal Emulator */}
          <div className="lg:col-span-7">
            <div className="rounded-[8px] border border-[#302B36] bg-[#111014] overflow-hidden shadow-2xl">
              {/* Window Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#302B36] bg-[#151319]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#E06C75]/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#E5C07B]/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#98C379]/60" />
                  </div>
                  <span className="ml-2 font-mono text-[11px] text-[#8B8495]">zsh · cpython-3.12</span>
                </div>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 rounded-[4px] border border-[#302B36] bg-[#111014] px-2 py-1 text-[11px] text-[#8B8495] hover:border-[#C4B5FD]/40 hover:text-[#F4F0F7] transition-all"
                  aria-label="Copy terminal command"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-[#6FD3A0]" />
                      <span className="text-[#6FD3A0]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy command</span>
                    </>
                  )}
                </button>
              </div>

              {/* Terminal Body */}
              <div className="p-4 sm:p-5 font-mono text-xs text-[#F4F0F7] space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-[#C4B5FD] select-none">$</span>
                  <span className="text-[#F4F0F7] font-semibold">{activeTab.command}</span>
                </div>

                <div className="rounded-[4px] border border-[#302B36]/60 bg-[#151319]/80 p-3 text-[11px] leading-relaxed text-[#B8B1C2] overflow-x-auto">
                  {activeTab.output.map((line, idx) => (
                    <div key={idx} className={line.startsWith('#') ? 'text-[#8B8495] italic' : 'text-[#E2DCF0]'}>
                      {line || '\u00A0'}
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#302B36]/60 flex items-center justify-between text-xs">
                  <span className="text-[#8B8495]">{activeTab.description}</span>
                  <Link
                    href={activeTab.docLink}
                    className="text-[#C4B5FD] hover:text-[#D6C8FF] inline-flex items-center gap-1 transition-colors shrink-0 ml-2"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TerminalCommandDeck;
