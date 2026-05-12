# Handoff: PromQL Cheatsheet

## Overview

A two-piece reference site for the Prometheus query language (PromQL):

1. **Web cheatsheet** — a single-page, search-driven reference organized easy → advanced. Light/dark theme toggle, syntax-highlighted code, and a small in-page Tweaks panel for accent color and content density.
2. **Printable one-pager** — an A4 portrait, dense three-column two-color layout designed to print clean at 100% as a single page.

Audience is engineers learning PromQL plus experienced users who want a quick recall surface. Content covers data types, selectors & matchers, time/duration syntax, aggregation, functions, and gotchas — plus a recipes column on the one-pager.

## About the Design Files

The files in this bundle are **design references created in HTML** — prototypes showing the intended look, structure, and behavior. They are **not production code to copy directly**.

The task is to **recreate these designs in the target codebase's existing environment** (Next.js, Astro, Vue, plain MDX, etc.) using its established patterns, component library, and design tokens. If no codebase exists yet, choose the framework that best fits the team — a static-site generator (Astro, Eleventy) or Next.js with MDX is ideal for a documentation-style page like this one.

The HTML uses React + Babel inline only so the prototype was easy to iterate on; the production implementation should use the host stack's native components.

## Fidelity

**High-fidelity (hifi).** Colors, type scale, spacing, borders, and interactions are final. Recreate pixel-perfectly using the codebase's existing libraries and patterns. The exact tokens are listed below in **Design Tokens** — use them verbatim unless the target codebase has equivalents in its design system, in which case map to the closest match.

## Screens / Views

### 1. Cheatsheet (web)

**Purpose:** Browse PromQL concepts as cards organized into 6 sections; filter live with search; toggle light/dark; adjust accent & density.

**Layout (top to bottom):**

- **Sticky top bar** — full-width, 1px bottom border, blurred translucent background. Inner content max-width 1180px, 32px horizontal padding, 14px vertical.
  - Brand mark (22×22 rounded square, accent fill, white `{ }` glyph in JetBrains Mono) + wordmark "PromQL" with subdued "cheatsheet" suffix.
  - Search input (max 380px wide, 8px radius, 1px border, search icon left @ 11px, "/" kbd badge right). Focus state: accent border + 3px accent-soft ring.
  - Theme-toggle icon button (36×36, 8px radius). Sun/moon icon swap based on theme.
  - Solid pill button "One-pager" linking to the one-pager HTML. Background = `--ink`, text = `--bg`, printer icon left.

- **Page container** — max-width 1180px, 56px top / 120px bottom padding, 32px horizontal.

- **Hero** — max 760px wide. Eyebrow: accent dot + uppercased JetBrains Mono label "REFERENCE · V2.X" (12px, 0.08em letter-spacing). H1: clamp(36px, 5vw, 56px), weight 600, letter-spacing -0.025em, line-height 1.05. Last two words ("PromQL") rendered in `--accent`. Subtitle: 17px `--ink-2`, max 60ch.

- **Table of contents** — wrap-flex of pill links, 8px gap. Each pill is 1px border, 999px radius, 5×10 padding, JetBrains Mono 12px. `<span>` numeric prefix in `--ink-3`. Hover state: accent color + accent border + accent-soft background.

- **Six sections**, separated by 56px (comfortable) / 36px (compact). Each section has:
  - **Section header**: small accent-colored mono number (e.g. "01") + H2 title (22px, weight 600) + right-aligned `--ink-3` subtitle. 1px bottom border, 14px bottom padding.
  - **Card grid**: `repeat(auto-fill, minmax(380px, 1fr))` with 18/12px gap. Section 05 (Functions) uses `minmax(440px, 1fr)`.

- **Card (`.row`)**: 1px border, 10px radius, surface background. Padding 18×22 (comfortable) / 12×16 (compact). Hover bumps border to `--line-strong`.
  - Title row: H3 (14px, weight 600) + small mono badge ("basic" or "advanced"). Advanced badge uses accent color + accent-soft fill + accent-line border.
  - Optional descriptive paragraph (13.5px, `--ink-2`).
  - Code block: dark `--code-bg` panel, JetBrains Mono 13.5/12.5px (density-controlled), 6px radius, 12×14 padding, syntax-colored spans (see Code highlighting palette below). `font-feature-settings: "calt" 0` to disable ligatures.
  - Optional note paragraph at the foot (12.5px, `--ink-3`, bolded `<strong>` for emphasis).

- **Gotcha cards**: like normal cards but with a 3px solid `--accent` left border instead of full 1px border, and tighter padding (14×18). Used in section 06.

- **Footer**: 96px top margin, 1px top border, 28px top padding. Flex justify-between, two pieces of metadata. Underlined `<a>` links with accent hover.

- **Tweaks panel (floating, bottom-right)**: surfaces only when the host turns on Tweaks. Two controls: a 5-swatch accent color picker (`#E6522C`, `#2563EB`, `#10B981`, `#7C3AED`, `#111111`), and a 2-option density radio (Comfortable / Compact).

**Sections & cards** — content authoritative; copy from `PromQL Cheatsheet.html`:

| # | Section | Cards (badge) |
|---|---|---|
| 01 | Data types | Instant vector · Range vector · Scalar · String *(all basic)* |
| 02 | Selectors & matchers | By metric name · `=` · `!=` · `=~` · `!~` *(adv)* · Empty label *(adv)* · `__name__` *(adv)* · `offset` / `@` *(adv)* |
| 03 | Time & durations | Duration units · Range vector window · Subquery *(adv)* · `@ start()`/`@ end()` *(adv)* |
| 04 | Aggregation | `sum` · `avg` · `min`/`max` · `count` · `by` vs `without` · `topk`/`bottomk` *(adv)* · `quantile` *(adv)* · `stddev`/`stdvar` *(adv)* · `group` *(adv)* |
| 05 | Functions | `rate` · `irate` *(adv)* · `increase` · `delta` · `histogram_quantile` *(adv)* · `predict_linear` *(adv)* · `*_over_time` · `absent` *(adv)* · `changes`/`resets` *(adv)* · `label_replace` *(adv)* · `label_join` *(adv)* · `vector`/`scalar` *(adv)* · `time()` *(adv)* · `clamp*` *(adv)* · `sort` · Arithmetic & logic |
| 06 | Performance & gotchas | 8 gotcha cards (see source for exact copy) |

### 2. One-pager (print)

**Purpose:** Single-page A4 dense reference designed to print at 100% with no scaling.

**Layout:**

- **Toolbar** (screen only, hidden on print): back link, A4-format note, dark "Print / Save PDF" button calling `window.print()`.
- **Sheet**: exact A4 (210mm × 297mm), 9mm margins, white background, body-font 8pt / line-height 1.32.
- **Header strip** — 2px solid black bottom border, 4mm bottom padding:
  - Left: 22pt H1 "**PromQL** Cheatsheet" with "PromQL" in accent. Subtitle paragraph (8pt) max 90mm wide.
  - Right: small accent "v2.x" mark pill + 7pt mono meta text "one-pager · A4 · print at 100%".
- **Three-column flow** (CSS `column-count: 3`, 5mm gap, 1px column-rule). Sections (`break-inside: avoid`):
  - Section heading: 9pt uppercase, weight 700, accent color, 1px accent bottom border, with mono number prefix.
  - `table.kv` for compact key/value rows: 7.5pt, dotted 1px row separators, left cells in JetBrains Mono.
  - `.item` blocks for richer entries: label (8pt bold), description (7.5pt `--ink-2`), code block.
  - Code blocks (`pre`): 7pt JetBrains Mono, `#f6f4ef` fill, 1.5px accent left border, 1×2mm padding.
- **Footer**: 2mm padding, 1px top border, 6.5pt mono `--ink-3` triple-meta.

**Sections on the one-pager** (in order): 01 Data types · 02 Selectors & matchers · 03 Time & durations · 04 Aggregation · 05 Counter functions · 05b Gauge functions · 05c `*_over_time` · 05d Histograms · 05e Labels & misc · 05f Binary ops & matching · 06 Gotchas · 07 Quick recipes (error rate %, CPU usage %, P95 latency, "job is down" alert).

**Print rules:** `@page { size: A4 portrait; margin: 0 }`. In `@media print`: toolbar hidden, sheet has no box-shadow and zero margin.

## Interactions & Behavior

- **Theme toggle** — flips `data-theme` between `light`/`dark` on `<body>`. Persists to `localStorage['promql-theme']`. Swaps sun/moon icons in the button.
- **Search** (`#search` input)
  - Filters cards by `data-keys` attribute + concatenated text content. Case-insensitive substring match.
  - Non-matching cards get `.dim` (opacity 0.25, pointer-events none).
  - Sections that have no visible cards get `.dim-section` (opacity 0.4).
  - When all cards are dimmed, append an empty-state element: `No matches. Try [rate], [histogram], or [label].`
  - Press `/` anywhere to focus the input. Press `Esc` while focused to clear and blur.
- **TOC links** scroll to sections; `scroll-margin-top: 80px` on each section accounts for the sticky bar.
- **Tweaks panel** — only when host toggles Tweaks on. Changes flow live:
  - Accent: writes the chosen hex to `document.documentElement.style.setProperty('--accent', …)`.
  - Density: writes `comfortable`/`compact` to `document.body.dataset.density`.
  - Both persist via the host's `__edit_mode_set_keys` postMessage.
- **One-pager Print button** — calls `window.print()`. No other interactivity.

No animations beyond CSS hover transitions (~150ms color/border-color/box-shadow).

## State Management

Minimal — all transient UI state. In a React/Vue rewrite:

- `theme: 'light' | 'dark'` — persisted to localStorage.
- `searchQuery: string` — drives visibility of cards; debounce optional (current implementation is immediate, content is small).
- `tweaks: { accent: string; density: 'comfortable' | 'compact' }` — usually behind a feature flag; can be skipped in production if you don't need the in-page customization surface.

No data fetching. Content is static.

## Design Tokens

### Colors — light

| Token | Value | Use |
|---|---|---|
| `--accent` | `#E6522C` | Prometheus orange. Brand accent. |
| `--accent-soft` | `color-mix(in oklch, var(--accent) 14%, transparent)` | Hover fills, advanced-badge bg |
| `--accent-line` | `color-mix(in oklch, var(--accent) 32%, transparent)` | Focus rings, advanced-badge border |
| `--bg` | `#fbfaf7` | Page background |
| `--surface` | `#ffffff` | Cards, inputs, buttons |
| `--surface-2` | `#f4f2ed` | Inline code, kbd, badges |
| `--ink` | `#14140f` | Primary text |
| `--ink-2` | `#3a3a32` | Secondary text, descriptions |
| `--ink-3` | `#6c6c63` | Tertiary text, eyebrows |
| `--line` | `#e6e3db` | Default borders |
| `--line-strong` | `#d4d0c4` | Hover borders |

### Colors — dark (overrides via `[data-theme="dark"]`)

| Token | Value |
|---|---|
| `--bg` | `#0e0f10` |
| `--surface` | `#16181a` |
| `--surface-2` | `#1d1f22` |
| `--ink` | `#ececea` |
| `--ink-2` | `#c5c4be` |
| `--ink-3` | `#8b8a82` |
| `--line` | `#2a2c2f` |
| `--line-strong` | `#3a3d40` |
| `--code-bg` | `#0a0b0c` |
| `--accent-soft` | `color-mix(in oklch, var(--accent) 22%, transparent)` |
| `--accent-line` | `color-mix(in oklch, var(--accent) 42%, transparent)` |

### Code highlighting palette (used in both themes)

| Class | Color | Token |
|---|---|---|
| `.c` (comment) | `#7d8590` italic | `--code-comment` |
| `.k` (keyword: `sum`, `by`, `offset` …) | `#ff8b6b` | `--code-keyword` |
| `.fn` (function/metric names) | `#ffd178` | `--code-fn` |
| `.s` (string) | `#b8e58a` | `--code-string` |
| `.n` (number) | `#c8a8ff` | `--code-num` |
| `.l` (label key) | `#7cd3ff` | `--code-label` |
| `.o` (operator) | `#f0f0e8` | `--code-operator` |
| `.d` (duration) | `#ffaf6b` | inline |
| code background | `#0e0f10` (dark `#0a0b0c`) | `--code-bg` |
| code ink | `#e8e6df` | `--code-ink` |

### Type scale

- Sans: **Geist** (Google Fonts) — weights 400, 500, 600, 700. `font-feature-settings: "ss01", "cv11"`.
- Mono: **JetBrains Mono** — weights 400, 500, 600. Code blocks set `font-feature-settings: "calt" 0` to disable ligatures (PromQL operators read clearer that way).
- H1 hero: `clamp(36px, 5vw, 56px)` / 600 / -0.025em / line 1.05.
- H2 section: `var(--h2-fs)` = 22px (comfortable) / 19px (compact) / 600 / -0.015em.
- H3 card: 14px / 600 / -0.005em.
- Body: 15px (comfortable) / 14px (compact) / 1.55.
- Code: 13.5px (comfortable) / 12.5px (compact) / 1.55.
- Eyebrow / TOC / badges: JetBrains Mono 12px / 0.08em letter-spacing where uppercased.

### Spacing & shape

- Radii: `--radius: 10px` (cards), `--radius-sm: 6px` (code blocks, inputs use 8px directly).
- Section gap: 56px (comfortable) / 36px (compact).
- Grid gap: 18px (comfortable) / 12px (compact).
- Card padding: 18×22 (comfortable) / 12×16 (compact).
- Sticky top bar: 14px vertical padding, blurred translucent (`backdrop-filter: saturate(140%) blur(14px)`, `background: color-mix(in oklch, var(--bg) 78%, transparent)`).

### Print tokens (one-pager only)

- Page size: A4 portrait, 0 margin on `@page`, sheet uses 9mm internal padding.
- Body 8pt / 1.32; code 7pt / 1.35.
- Accent `#E6522C` and black `#111` are the only ink colors (two-color treatment).
- Code panels: `#f6f4ef` fill with 1.5px accent left bar.
- Column rule: 1px `#e6e3db`.

## Assets

- **Fonts**: Geist and JetBrains Mono from Google Fonts. In the production codebase, prefer self-hosting via `@fontsource/geist-sans` and `@fontsource/jetbrains-mono`, or the host's existing font pipeline.
- **Icons**: All inline SVG (search, sun, moon, printer). Stroke-based, 2px stroke, `stroke-linecap/linejoin: round`. In production, use the codebase's icon library — Lucide is a 1:1 match (search/sun/moon/printer all exist).
- **Brand mark**: `{ }` glyph in JetBrains Mono on a 22px accent-filled rounded square. No external image.
- No raster images, no logos, no third-party media.

## Files

Bundled HTML references (these are the design artifacts to recreate, **not** to ship):

- `PromQL Cheatsheet.html` — main page. Static markup for all section content plus inline scripts for theme toggle, search filter, and the Tweaks panel.
- `PromQL One-Pager.html` — A4 print page. Self-contained, no JS beyond the `window.print()` button.
- `tweaks-panel.jsx` — the in-design Tweaks shell component (color/density controls). Not relevant to production unless you want to ship a similar customizer.

### Implementation suggestions

- For a docs site, MDX with a small set of components (`<Section>`, `<Card>`, `<Code lang="promql">`, `<Gotcha>`, `<KVTable>`) maps cleanly to the structure.
- The search is a 30-line client-side substring filter — keep it client-side; the dataset is small (~60 cards).
- For PromQL syntax highlighting in production, Shiki or Prism both have community PromQL grammars; the exact color tokens above will give the same look. Disable ligatures explicitly.
- The print page is best implemented as a separate route (`/print` or `/one-pager`) so it can carry its own `@page` rules without polluting the main stylesheet.
- The theme toggle should run inline in `<head>` before paint to avoid FOUC.
