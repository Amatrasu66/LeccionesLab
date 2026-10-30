# LeccionesLab

> Production URL: [https://leccioneslab.vercel.app/](https://leccioneslab.vercel.app/)  
> Repository: [https://github.com/Amatrasu66/LeccionesLab](https://github.com/Amatrasu66/LeccionesLab)

LeccionesLab is an opinionated, production-grade developer documentation and curriculum platform built specifically for modern Python engineers. It bridges the gap between introductory syntax tutorials and runtime systems engineering—emphasizing accurate mental models, memory mechanics, Big-O algorithmic complexity guarantees, and idiomatic Python 3.12+ patterns.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Current Features](#current-features)
- [Curriculum Map](#curriculum-map)
- [Technology Stack](#technology-stack)
- [Repository Structure](#repository-structure)
- [Prerequisites](#prerequisites)
- [Local Setup](#local-setup)
- [Available Scripts](#available-scripts)
- [Adding Documentation](#adding-documentation)
- [Deployment](#deployment)
- [Project Design Conventions](#project-design-conventions)
- [Known Limitations & Roadmap](#known-limitations--roadmap)
- [Documentation Sources & Contribution Guidance](#documentation-sources--contribution-guidance)

---

## Project Overview

LeccionesLab provides structured developer learning tracks with deep conceptual foundations. Rather than presenting isolated syntax snippets, each lesson explores memory layouts, CPython virtual machine internals, potential edge cases, and architectural trade-offs.

The platform is deployed live on Vercel at [https://leccioneslab.vercel.app/](https://leccioneslab.vercel.app/).

---

## Current Features

- **Progressive Learning Tracks**: Six comprehensive curriculum tracks spanning foundational language semantics, data structures, modular packaging, intermediate metaprogramming, object-oriented design, and runtime internals.
- **Content via MDX & Fumadocs**: Documentation powered by MDX and Fumadocs, enabling rich markdown formatting alongside reusable React callouts and interactive code components.
- **Dynamic Fast Search**: Real-time modal search (`Cmd+K` / `Ctrl+K`) backed by server-side indexing with hierarchical breadcrumbs (`Documentation > Python > Section > Topic`).
- **Interactive Code Blocks**: Syntax-highlighted code blocks with one-click clipboard copying and filename badges.
- **Contextual Article Pager**: Automatic sequential previous/next article navigation calculated dynamically based on curriculum order.
- **Responsive Table of Contents**: Sidebar table of contents highlighting active reading sections automatically.
- **Dark-Only Visual System**: Purpose-built developer aesthetic utilizing near-black backgrounds, subtle zinc/slate borders, soft-violet accents, and Geist typography.

---

## Curriculum Map

### Track A: Python Foundations (Available)
- [Getting Started](/docs/python/getting-started) — Python 3.12+ workstation setup, `venv` isolation, script execution.
- [Syntax & Primitive Data Types](/docs/python/basics/syntax-and-types) — Statements vs. expressions, scalar types (`int`, `float`, `bool`, `NoneType`).
- [Variables & Assignment](/docs/python/basics/variables) — Memory references, pointer rebinding, `is` vs. `==`, mutability semantics.
- [Operators & Expressions](/docs/python/basics/operators-and-expressions) — Division semantics, short-circuit logic, walrus operator `:=`.
- [Control Flow & Pattern Matching](/docs/python/basics/control-flow) — Branching, Python 3.10+ `match`/`case`, loop `else` idiom.
- [Strings & Text Processing](/docs/python/basics/strings) — Immutability, slicing `[::-1]`, formatted string literals (f-strings).
- [Functions & Scope](/docs/python/basics/functions) — Signatures, `*args`, `**kwargs`, LEGB resolution rule, mutable default trap.
- [Built-in Functions Reference](/docs/python/reference/built-in-functions) — Reference specifications for `len()`, `zip()`, `map()`, and `enumerate()`.

### Track B: Strings & Collections (Available)
- [Lists & Dynamic Arrays](/docs/python/collections/lists) — Contiguous pointer arrays, dynamic over-allocation, in-place mutations.
- [Tuples, Immutability & Unpacking](/docs/python/collections/tuples) — Fixed memory allocations, starred unpacking `*rest`, hashability.
- [Dictionaries & Hash Tables](/docs/python/collections/dictionaries) — Compact hash tables, $O(1)$ lookups, dictionary views, union operator `|`.
- [Sets & Mathematical Operations](/docs/python/collections/sets) — Hash sets, deduplication, union `|`, intersection `&`, difference `-`, `frozenset`.

### Track C: Modules, Packages & Standard Library (Available)
- [Modules, Namespaces & Imports](/docs/python/modules/modules-and-imports) — Import machinery, `sys.modules` caching, resolution order.
- [Packages & Circular Imports](/docs/python/modules/packages-and-namespaces) — Initialization with `__init__.py`, `__all__`, cycle elimination.
- [Executable Scripts & Entry Points](/docs/python/modules/scripts-and-entrypoints) — `__name__ == '__main__'`, POSIX exit codes, console scripts.
- [Standard Library Essentials](/docs/python/modules/standard-library) — `pathlib.Path`, `json`, `csv.DictReader`, timezone-aware `datetime`.
- [Iteration & Functional Utilities](/docs/python/modules/iteration-utilities) — `itertools` (chain, count, groupby) and `functools` (`lru_cache`, `partial`).
- [Command-Line Interfaces with argparse](/docs/python/modules/cli-with-argparse) — Subparsers, flags, automated `--help` screens.
- [Subprocess Execution & Security](/docs/python/modules/subprocess-execution) — Safe process invocation, argument lists, preventing shell injection.
- [Virtual Environments & Packaging](/docs/python/modules/environments-and-packaging) — Isolated `.venv`, `pip`, PEP 621 `pyproject.toml`.

### Track D: Intermediate Language Features (Available)
- [Comprehensions & Generator Expressions](/docs/python/intermediate/comprehensions) — List/dict/set comprehensions, streaming generators.
- [Iterators, Generators & Lazy Evaluation](/docs/python/intermediate/iterators-and-generators) — Iterator protocol (`__iter__`, `__next__`), `yield from`.
- [Closures, Scopes & Decorators](/docs/python/intermediate/decorators-and-closures) — Lexical closures, `__closure__`, `@functools.wraps`, decorator factories.
- [Context Managers & Resource Management](/docs/python/intermediate/context-managers) — The `with` statement, `__enter__`/`__exit__`, `contextlib`.
- [Exception Hierarchies & Error Handling](/docs/python/intermediate/exception-handling) — CPython exception tree, chaining with `from`, `ExceptionGroup`.
- [Type Hints & Static Type Analysis](/docs/python/intermediate/type-hints-and-static-typing) — PEP 484, union `X | Y`, structural `Protocol`, `mypy`.

### Track E: Object-Oriented Programming (Available)
- [Classes, Objects & Attributes](/docs/python/oop/classes-objects-and-attributes) — Blueprints vs allocations, `self`, `__new__` vs `__init__`, namespaces.
- [Methods & Object Design](/docs/python/oop/methods-and-object-design) — `@classmethod` factories, `@staticmethod`, `@property` validation, composition.
- [Inheritance & Polymorphism](/docs/python/oop/inheritance-and-polymorphism) — Subclassing, cooperative `super()`, multiple inheritance, C3 linearization.
- [Dunder Methods & Python's Data Model](/docs/python/oop/dunder-methods-and-data-model) — `__repr__` vs `__str__`, equality, hash contracts, operator overloading.
- [Dataclasses, Enums & Structured Objects](/docs/python/oop/dataclasses-enums-and-structured-objects) — `@dataclass`, `field(default_factory=...)`, `frozen=True`, `Enum`.
- [Abstraction & Interface Design](/docs/python/oop/abstraction-and-interfaces) — Nominal `abc.ABC`, `@abstractmethod`, structural `typing.Protocol`, ISP.
- [Descriptors & Attribute Access](/docs/python/oop/descriptors-and-attribute-access) — Descriptor protocol (`__get__`, `__set__`), lookup order, `__slots__`.
- [Metaclasses & Class Creation](/docs/python/oop/metaclasses-and-class-creation) — `type()` dynamic construction, `metaclass=`, `__init_subclass__` (PEP 487).

### Track F: Advanced Python & Runtime Internals (Available)
- [Object Lifecycle & Memory Management](/docs/python/advanced/object-lifecycle-and-memory-management) — Reference counting, cyclic GC (`gc`), `weakref`, `tracemalloc`.
- [Performance & Profiling](/docs/python/advanced/performance-and-profiling) — Big-O analysis, `timeit`, `perf_counter`, `cProfile`, `pstats`, `lru_cache`, `dis`.
- [Multithreading & Shared State](/docs/python/advanced/multithreading-and-shared-state) — `ThreadPoolExecutor`, Locks, thread-safe Queues, deadlock avoidance, GIL.
- [Multiprocessing & Parallel Execution](/docs/python/advanced/multiprocessing-and-parallel-execution) — `ProcessPoolExecutor`, pickle IPC, start methods, `__main__` guard.
- [Asynchronous Python with asyncio](/docs/python/advanced/asynchronous-python-with-asyncio) — Coroutines, event loops, `TaskGroup`, timeouts, cancellation.
- [Advanced Runtime Behavior & VM Internals](/docs/python/advanced/advanced-runtime-behavior) — Bytecode, stack frames, `sys.meta_path`, free-threaded PEP 703, C extensions.
- [Concurrency Patterns & Reliability](/docs/python/advanced/concurrency-patterns-and-reliability) — Bounded queues, backpressure, jittered backoff retries, graceful shutdown.

### Planned Curriculum Tracks (Upcoming)
- **Track G: Professional Engineering Practices** — Testing with `pytest`, fixtures, parameterization, mocking, `Ruff` linter/formatter, design patterns.
- **Track H: Backend Application Engineering** — Asynchronous Web APIs with FastAPI, Pydantic validation, relational databases, SQLAlchemy.

---

## Technology Stack

The project runs on a modern, typed frontend architecture:

| Component | Technology | Version | Purpose |
|---|---|---|---|
| **Framework** | Next.js (App Router) | `16.4.2` | Server-rendered pages, routing, layouts, and API routes |
| **UI Library** | React | `^19.0.0` | Declarative component UI |
| **Language** | TypeScript | `^5.7.0` | Static typing across components and configurations |
| **Documentation Engine** | Fumadocs Core / UI / MDX | `^16.17.5` / `^15.4.7` | MDX parsing, documentation layout, table of contents, search integration |
| **Styling** | Tailwind CSS (v4) | `^4.0.0` | Utility-first CSS using `@tailwindcss/postcss` |
| **Typography** | Geist Font | `^1.8.1` | Clean developer-focused monospace and sans-serif typography |
| **Icons** | Lucide React | `^0.546.0` | Accessible SVG icon suite |

---

## Repository Structure

```text
LeccionesLab/
├── content/
│   └── docs/
│       ├── meta.json                      # Documentation root configuration
│       └── python/
│           ├── meta.json                  # Root Python curriculum ordering & separators
│           ├── index.mdx                  # Curriculum index and visual roadmap
│           ├── getting-started.mdx        # Tooling and workstation setup
│           ├── basics/                    # Track A: Python Foundations
│           │   └── meta.json
│           ├── collections/               # Track B: Strings & Collections
│           │   └── meta.json
│           ├── modules/                   # Track C: Modules & Standard Library
│           │   └── meta.json
│           ├── intermediate/              # Track D: Intermediate Language Features
│           │   └── meta.json
│           ├── oop/                       # Track E: Object-Oriented Programming
│           │   └── meta.json
│           ├── advanced/                  # Track F: Advanced & Runtime Internals
│           │   └── meta.json
│           └── reference/                 # Technical reference specifications
│               └── meta.json
├── src/
│   ├── app/
│   │   ├── api/search/route.ts            # Dynamic server-side search endpoint
│   │   ├── docs/
│   │   │   ├── layout.tsx                 # Fumadocs sidebar & article shell
│   │   │   └── [[...slug]]/page.tsx       # Dynamic catch-all MDX renderer
│   │   ├── learn/page.tsx                 # Learning tracks curriculum dashboard
│   │   ├── layout.tsx                     # Root HTML layout and font loading
│   │   ├── page.tsx                       # Homepage & hero banner
│   │   └── globals.css                    # Tailwind CSS v4 imports
│   ├── components/
│   │   ├── brand/wordmark.tsx             # LeccionesLab logo wordmark
│   │   ├── docs/
│   │   │   ├── article-pager.tsx          # Dynamic prev/next article navigation
│   │   │   └── copy-page-button.tsx       # Copy current page link/markdown
│   │   ├── layout/
│   │   │   ├── site-header.tsx            # Sticky global header with navigation
│   │   │   └── site-footer.tsx            # Platform footer
│   │   ├── search/search-modal.tsx        # Cmd+K search dialog
│   │   └── ui/
│   │       ├── button.tsx                 # Base button component
│   │       ├── callout.tsx                # Note, Tip, Warning, and Danger callouts
│   │       └── code-block.tsx             # Highlighted code block with copy button
│   └── lib/
│       ├── source.ts                      # Fumadocs loader initialization
│       └── utils.ts                       # ClassName merging helpers (clsx + tailwind-merge)
├── scripts/
│   └── test-mvp.js                        # Node.js test suite for search and routes
├── source.config.ts                       # Fumadocs source configuration
├── postcss.config.mjs                     # PostCSS configuration for Tailwind v4
├── tsconfig.json                          # TypeScript compiler configuration
├── package.json                           # Dependency specifications and scripts
├── package-lock.json                      # Locked npm dependency tree
└── bun.lock                               # Locked Bun dependency manifest
```

---

## Prerequisites

- **Node.js**: Node.js **v20.x** or **v22.x LTS** is recommended. (Note: No specific engine version is strictly pinned in `package.json`).
- **Package Manager**: Either **npm** (recommended via `package-lock.json`) or **bun** (via `bun.lock`).

---

## Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Amatrasu66/LeccionesLab.git
   cd LeccionesLab
   ```

2. **Install dependencies using the committed lockfile:**
   ```bash
   npm ci
   # Or using Bun:
   # bun install --frozen-lockfile
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. Open your browser to [http://localhost:3000](http://localhost:3000) to view the application.

---

## Available Scripts

The following scripts are defined in `package.json`:

- `npm run dev`: Starts the Next.js development server on port `3000` listening on `0.0.0.0`.
- `npm run build`: Compiles the MDX content and builds the Next.js application for production.
- `npm start`: Runs the built production application on port `3000`.
- `npm run lint`: Executes TypeScript type checking via `tsc --noEmit`.
- `npm test`: Runs the automated test suite in `scripts/test-mvp.js` using Node's native test runner (`node --test`).

---

## Adding Documentation

To add a new lesson or section to the platform:

1. **Create the MDX file**:  
   Add a new file inside the appropriate directory under `content/docs/python/<section>/<slug>.mdx`.

2. **Add frontmatter**:  
   Every lesson must start with `title` and `description` YAML frontmatter:
   ```markdown
   ---
   title: Your Lesson Title
   description: Concise one-sentence summary of the concepts covered in this lesson.
   ---
   ```

3. **Register in `meta.json`**:  
   Open `content/docs/python/<section>/meta.json` and add the filename (without the `.mdx` extension) to the `"pages"` array in the exact order it should be studied:
   ```json
   {
     "title": "Section Title",
     "pages": [
       "first-lesson",
       "your-new-lesson",
       "next-lesson"
     ]
   }
   ```

4. **Curriculum Ordering**:  
   The article pager (`ArticlePager`) and sidebar navigation read directly from the `meta.json` sequence. Keep the sequence progressive from prerequisites to advanced topics.

5. **Internal Cross-Links**:  
   Use relative markdown links to connect related lessons (e.g. `[Functions & Scope](/docs/python/basics/functions)`).

---

## Deployment

LeccionesLab is deployed to **Vercel** with continuous deployment on git pushes to the default branch.

- **Framework**: Next.js (automatically detected by Vercel).
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Route Safety**: Ensure that only canonical routes exist under `src/app/docs/[[...slug]]/page.tsx`. URL-encoded directory names (such as `%5B%5B...slug%5D%5D`) must never be committed, as they cause ambiguous route conflicts in Next.js builds.

---

## Project Design Conventions

LeccionesLab strictly follows a restrained, dark-only visual language:

- **Backgrounds**: Deep, near-black canvas (`#111014` root, `#151319` cards, `#1B1820` interactive elements).
- **Borders**: Subtle, low-contrast borders (`#302B36`).
- **Accents**: Soft violet (`#C4B5FD`) for focus rings, section kickers, and active indicators.
- **Typography**: Clear typographic hierarchy using Geist Sans for prose and Geist Mono for code.
- **Corner Radii**: Restrained corner geometry (`rounded-[6px]` and `rounded-[8px]`), avoiding excessive pill-shaped buttons.

---

## Known Limitations & Roadmap

The following capabilities are intentional design choices or planned future phases:

- **Interactive Python Playground**: An in-browser interactive REPL (using Pyodide / WebAssembly) is planned for a future milestone and is not currently implemented.
- **User Progress & Authentication**: The platform currently operates as an open, stateless documentation and reference suite without user accounts or login requirements.
- **Interactive Quiz Widgets**: End-of-lesson exercises currently provide written solutions and reasoning rather than interactive evaluation widgets.

---

## Documentation Sources & Contribution Guidance

Content in LeccionesLab is strictly grounded in the official Python language specification and CPython implementation references:

- [Python 3 Documentation](https://docs.python.org/3/)
- [Python Language Reference](https://docs.python.org/3/reference/)
- [Python Standard Library](https://docs.python.org/3/library/)
- [Python Enhancement Proposals (PEPs)](https://peps.python.org/)

### Contribution Guidelines
- **Original Prose**: Write original explanations, examples, and analogies. Do not copy external tutorials or documentation verbatim.
- **Language vs. Implementation**: Explicitly distinguish between Python language guarantees (e.g. automatic garbage collection) and CPython-specific behaviors (e.g. reference counting and the GIL).
- **Working Code Examples**: All code snippets must be compatible with Python 3.12+ and represent idiomatic, production-tested patterns.
- **Comprehensive Structure**: Each lesson should provide learning objectives, prerequisites, progressive examples, common pitfalls, and practice exercises with full solutions.
