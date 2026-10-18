# LeccionesLab — Architecture & Visual Design Implementation Plan

LeccionesLab is a developer documentation and tutorial platform built with Next.js App Router, Fumadocs, and an authoritative dark-only design system. This plan details the phased migration from the initial scaffold to a production-grade, content-first developer workspace.

***

### User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural decisions were aligned during Phase 1:
> - **Framework Choice**: Full migration from the initial Vite template to **Next.js App Router + Fumadocs** to honor the architectural mandate.
> - **Initial Content Scope**: **Core starter set** featuring Python Overview, Variables, Functions, and Built-in Reference.
> - **Search Architecture**: **Fumadocs built-in local static search** (zero external dependencies, zero paid services, instant offline/local indexing).
> - **Brand Strictness**: Dark-only launch theme (`#111014` canvas, `#151319` surface, `#C4B5FD` soft-violet accent), strict zero-pill discipline, no lime accents, no light mode toggle.

***

## 1. Overview & Core Concept

- **What It Does**: LeccionesLab provides guided, progressive programming tutorials alongside precise technical reference documentation. The initial release establishes the brand identity and the Python fundamentals curriculum.
- **Target Audience**: Developers, students, and engineers seeking calm, distraction-free technical documentation with copyable syntax-highlighted code snippets and clear mental models.
- **Key Value**: A free-first, privacy-respecting platform combining the readability and density of world-class developer docs (such as Claude Code and Vercel Docs) with a bespoke, warm-undertone dark aesthetic.

***

## 2. User Experience & Visual Design

### Key User Flows
1. **Discovery & Exploration (Homepage)**: Clean top bar with wordmark (`Lecciones` in white, `Lab` in soft violet), concise headline, quick-access search affordance (`⌘K`), learning tracks grid, and featured reference links.
2. **Reading Tutorials (`/docs/python/basics/*`)**: Left navigation sidebar organized by topic, clear learning objectives, explanatory text, formatted code snippets with one-click copy, and contextual next/previous navigation.
3. **Consulting Technical Reference (`/docs/python/reference/*`)**: Dense, structured parameter lists, syntax signatures, return values, edge cases, and minimal copyable examples.
4. **Instant Search**: Non-intrusive dialog searching article titles, headings, and code descriptions with keyboard navigation (`↑`/`↓` and `Enter`).

### Visual Identity & Design Tokens

```css
:root {
  color-scheme: dark;

  /* Surfaces & Backgrounds */
  --background: #111014;
  --surface: #151319;
  --surface-raised: #1b1820;
  --surface-hover: #24202a;

  /* Text & Hierarchies */
  --foreground: #f4f0f7;
  --muted: #b8b1c2;
  --subtle: #8b8495;
  --border: #302b36;

  /* Accent (Soft Violet) */
  --accent: #c4b5fd;
  --accent-hover: #d6c8ff;
  --accent-surface: #292330;

  /* Actions & Status */
  --button-primary-bg: #f4f0f7;
  --button-primary-fg: #111014;
  --button-secondary-bg: #24202a;
  --button-secondary-fg: #f4f0f7;
  --code-bg: #17151c;
  --code-fg: #f4f0f7;
  --success: #6fd3a0;
  --warning: #f2c879;
  --danger: #ff929b;
  --info: #a9c4ff;

  /* Radii & Layout */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
}
```

- **Top Bar Contract**: 64px height, 1-line wordmark on the left, concise navigation links (`Learn`, `Documentation`, `Languages`, `Tools`), search shortcut, and primary documentation action.
- **Zero-Pill Discipline**: Metadata (reading time, category, level) is rendered as clean unboxed text separated by typographic middots (`·`), never colored capsule badges.
- **Typography**: Geist Sans for interface prose; Geist Mono for code blocks and inline identifiers.

***

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Next.js 15 App Router + Fumadocs Migration**
  - *Chosen Approach*: Replace Vite build scripts with Next.js App Router and configure Fumadocs v16.
  - *Why*: Directly satisfies the non-negotiable architectural requirement and enables native MDX compilation with static generation for Vercel.
- **Decision 2: Strict Dark-Only Launch Posture**
  - *Chosen Approach*: Configure Fumadocs with `forcedTheme="dark"` and omit any theme toggle controls.
  - *Why*: Eliminates contrast regressions, maintains brand consistency, and respects the specification's anti-light-theme rule.
- **Decision 3: Zero-Cost Local Search Route**
  - *Chosen Approach*: Use Fumadocs built-in search with static indexing.
  - *Why*: Requires no third-party API keys (Algolia, Meilisearch), works hermetically in the AI Studio container, and delivers instant response times.

***

## 4. Technical Architecture & Component Flow

### System & Component Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      LeccionesLab Shell                         │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │   SiteHeader (Wordmark, Nav Links, Search Bar Affordance) │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌─────────────────┬───────────────────────────┬─────────────┐  │
│  │  SidebarNav     │   Article / Viewport      │  TableOf    │  │
│  │  (Fumadocs      │   - MDX Content Column    │  Contents   │  │
│  │   Navigation    │   - CodeBlock (Copy, Lang)│  (Right-    │  │
│  │   Tree)         │   - Callouts (Restrained) │   aligned)  │  │
│  │                 │   - Prev/Next Links       │             │  │
│  └─────────────────┴───────────────────────────┴─────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │   SiteFooter (Wordmark, Copyright, Roadmap Links)         │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                                ▲
                                │
        ┌───────────────────────┴───────────────────────┐
        │        Fumadocs Source & Content Engine       │
        │  ┌─────────────────────────────────────────┐  │
        │  │ content/docs/python/**/*.{mdx,json}     │  │
        │  │ source.config.ts (Collection Schemas)   │  │
        │  │ api/search/route.ts (Static Indexer)    │  │
        │  └─────────────────────────────────────────┘  │
        └───────────────────────────────────────────────┘
```

### Implementation Milestones & Step-by-Step Execution

1. **Milestone 1 — Dependencies & Framework Re-scaffolding**:
   - Update `package.json` scripts: `"dev": "next dev --port 3000 -H 0.0.0.0"`, `"build": "next build"`, `"lint": "tsc --noEmit"`.
   - Install Next.js, Fumadocs (`fumadocs-ui`, `fumadocs-core`, `fumadocs-mdx`), Lucide React, and Tailwind PostCSS tools.
   - Configure `next.config.mjs`, `source.config.ts`, and `tsconfig.json`.

2. **Milestone 2 — Design System & Global Layout**:
   - Write `src/app/globals.css` with exact design tokens, dark background `#111014`, and Tailwind utility mappings.
   - Create reusable `src/components/brand/wordmark.tsx`.
   - Create `src/app/layout.tsx` enforcing `color-scheme: dark` with Geist fonts and Fumadocs RootProvider (`forcedTheme="dark"`).
   - Build `SiteHeader`, `SiteFooter`, and marketing homepage (`src/app/page.tsx`).

3. **Milestone 3 — Documentation Routes & Content**:
   - Create documentation shell in `src/app/docs/[[...slug]]/page.tsx` with sidebar, breadcrumbs, TOC, and search dialog.
   - Author authoritative Python core content:
     - `content/docs/python/index.mdx` (Curriculum overview & roadmap)
     - `content/docs/python/getting-started.mdx` (Python environment & execution)
     - `content/docs/python/basics/variables.mdx` (Variables, scope, naming)
     - `content/docs/python/basics/functions.mdx` (Def, parameters, return values)
     - `content/docs/python/reference/built-in-functions.mdx` (Signatures, exceptions, examples)
   - Implement `/learn`, `/languages`, and `/tools` informational views.

4. **Milestone 4 — Quality Assurance & Verification**:
   - Run `compile_applet` (`npm run build`) and report actual results.
   - Verify keyboard navigation, search dialog shortcuts (`⌘K`), and code-copy actions.
   - Confirm zero horizontal layout overflow on mobile and desktop viewports.
