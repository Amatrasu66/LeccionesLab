import Link from 'next/link';
import { Wordmark } from '@/components/brand/wordmark';

export function SiteFooter() {
  return (
    <footer className="border-t border-[#302B36] bg-[#151319] text-[#B8B1C2] mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Mission */}
          <div className="md:col-span-1 space-y-3">
            <Wordmark size="default" />
            <p className="text-xs text-[#8B8495] font-medium leading-relaxed">
              Learn. Build. Understand.
            </p>
            <p className="text-xs text-[#8B8495] leading-relaxed">
              A free-first developer learning and reference platform built for clarity, precision, and longevity.
            </p>
          </div>

          {/* Docs Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F4F0F7]">
              Documentation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/docs/python" className="hover:text-[#F4F0F7] transition-colors">
                  Python Overview
                </Link>
              </li>
              <li>
                <Link href="/docs/python/getting-started" className="hover:text-[#F4F0F7] transition-colors">
                  Getting Started
                </Link>
              </li>
              <li>
                <Link href="/docs/python/basics/variables" className="hover:text-[#F4F0F7] transition-colors">
                  Variables & Assignment
                </Link>
              </li>
              <li>
                <Link href="/docs/python/basics/functions" className="hover:text-[#F4F0F7] transition-colors">
                  Functions & Scope
                </Link>
              </li>
              <li>
                <Link href="/docs/python/reference/built-in-functions" className="hover:text-[#F4F0F7] transition-colors">
                  Built-in Functions
                </Link>
              </li>
            </ul>
          </div>

          {/* Learning Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F4F0F7]">
              Learning
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/learn" className="hover:text-[#F4F0F7] transition-colors">
                  Tutorial Curriculum
                </Link>
              </li>
              <li>
                <Link href="/languages" className="hover:text-[#F4F0F7] transition-colors">
                  Supported Languages
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-[#F4F0F7] transition-colors">
                  Developer Tools
                </Link>
              </li>
              <li>
                <span className="text-[#8B8495]">Interactive Exercises (Planned)</span>
              </li>
            </ul>
          </div>

          {/* Philosophy & Architecture */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F4F0F7]">
              Philosophy
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-[#8B8495]">Free-First & Ad-Free</span>
              </li>
              <li>
                <span className="text-[#8B8495]">Dark-Only Launch Theme</span>
              </li>
              <li>
                <span className="text-[#8B8495]">No Third-Party Trackers</span>
              </li>
              <li>
                <span className="text-[#8B8495]">WCAG 2.2 AA Target</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom separator and copyright */}
        <div className="border-t border-[#302B36] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8B8495]">
          <p>© {new Date().getFullYear()} LeccionesLab. Released under Apache-2.0.</p>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/docs/python" className="hover:text-[#F4F0F7] transition-colors">
              Docs
            </Link>
            <Link href="/learn" className="hover:text-[#F4F0F7] transition-colors">
              Curriculum
            </Link>
            <Link href="/tools" className="hover:text-[#F4F0F7] transition-colors">
              Tools
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
