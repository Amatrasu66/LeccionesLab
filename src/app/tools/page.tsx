import { Terminal, Shield, Cpu, Play, CheckCircle2, Clock } from 'lucide-react';
import { Callout } from '@/components/ui/callout';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Developer Tools & Roadmap — LeccionesLab',
  description: 'Interactive developer utilities, browser playgrounds, and sandboxed runtimes.',
};

export default function ToolsPage() {
  const tools = [
    {
      title: 'Python WebAssembly Playground',
      status: 'Planned (Milestone 4)',
      runtime: 'Pyodide in Web Worker',
      description: 'Run Python 3.12 code directly in the client browser without sending code to remote servers. Sandboxed execution with zero secret exposure.',
      capabilities: ['In-browser execution', 'Isolated worker thread', 'Standard library support', 'Memory and timeout limits'],
    },
    {
      title: 'Code Formatter & AST Linter',
      status: 'Planned',
      runtime: 'Ruff WebAssembly / Prettier',
      description: 'Format, lint, and analyze Python and TypeScript code snippets in accordance with PEP 8 and modern idiomatic standards.',
      capabilities: ['Fast AST validation', 'PEP 8 auto-formatting', 'Type hint verification'],
    },
    {
      title: 'Interactive Practice Checkpoints',
      status: 'Planned',
      runtime: 'Client-side test runner',
      description: 'Solve short coding exercises at the end of each tutorial module with immediate automated verification against unit test suites.',
      capabilities: ['Instant test feedback', 'Edge-case validator', 'Zero tracking'],
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl mb-10 space-y-4">
        <div className="flex items-center gap-2 text-xs text-[#8B8495]">
          <span className="text-[#C4B5FD] font-medium">Platform</span>
          <span aria-hidden="true">·</span>
          <span>Developer Tools</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#F4F0F7]">
          Developer Tools & Runtimes
        </h1>
        <p className="text-base text-[#B8B1C2] leading-relaxed">
          In alignment with our architectural principles, LeccionesLab maintains a strict separation
          between documentation reading and execution runtimes. Future tools will execute entirely
          in client WebAssembly sandboxes without third-party subscriptions or privacy compromises.
        </p>
      </div>

      <Callout type="note" title="Free-First Architecture Policy">
        Tools on this page are scheduled for progressive rollout in future milestones.
        In accordance with our strict truthfulness guidelines, we do not present simulated or
        non-functional controls as active. The current release focuses on comprehensive,
        high-fidelity documentation and tutorials.
      </Callout>

      {/* Tools Roadmap Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {tools.map((tool) => (
          <div
            key={tool.title}
            className="rounded-[8px] border border-[#302B36] bg-[#151319] p-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#8B8495] font-mono">{tool.runtime}</span>
                <span className="text-[#C4B5FD] font-medium">{tool.status}</span>
              </div>
              <h2 className="text-lg font-semibold text-[#F4F0F7]">
                {tool.title}
              </h2>
              <p className="text-xs text-[#B8B1C2] leading-relaxed">
                {tool.description}
              </p>
              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8B8495]">
                  Architecture Specifications
                </span>
                <ul className="space-y-1">
                  {tool.capabilities.map((c) => (
                    <li key={c} className="text-xs text-[#8B8495] flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-[#8B8495]" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#302B36] text-xs text-[#8B8495] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                In Active Design
              </span>
              <Button href="/docs/python" variant="secondary" size="sm">
                Explore Docs
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
