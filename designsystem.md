# TGIE Design System & Visual Identity

### Comprehensive agent & team handover. v4

**Codename:** *Paper & Cell Collage*
**Applies to:** the TGIE marketing web experience (`web/`, Next.js 16 + Tailwind v4).
**Status:** Authoritative. This document + the live code in `web/components/frame/Grid.tsx` are the single source of truth. When they disagree, the code wins and this doc must be corrected.

**What changed in v4** (fold-ins from continued build):
- **Decorative surface treatments** are now a first-class concept: the animated **DitherField** (ordered-dither wave) that skins the green footer collage cell-by-cell, plus the rules for keeping text legible over it. See the new **§11.2**.
- **Real image assets** are now used for illustration (e.g. the Philosophy engraved plate) via `next/image`, §11.1 updated.
- **`TwoToneHeading` gains `accentLine2`** (teal second line), §6.3 / §9.2.
- **Motion** section adds the off-screen-pause pattern for many animated instances. See §13.
- New anti-pattern: **text over the dither must sit on a scrim**. See §20.

This is written as a **cross-disciplinary handover**, for whoever picks up the work next, human or agent, whether they touch pixels, copy, components, or content. It is deliberately exhaustive. If you read only one section, read **§2 (Core Mental Model)** and **§20 (Anti-patterns)**. Nearly every past mistake came from missing those.

---

## Table of contents

1. How to use this document
2. **The core mental model: the cell collage**
3. Design principles
4. Brand & visual identity foundations
5. Color system
6. Typography system
7. Spatial system (seams, gutters, radii, rhythm)
8. Layout: the collage construction (laws + geometry)
9. Component library
10. Patterns & page anatomy
11. Iconography & illustration registers
12. Data visualization
13. Motion & interaction
14. Accessibility
15. Responsive & adaptive behavior
16. UX writing & content design
17. Content architecture (the data layer)
18. Engineering conventions
19. Quality gates & definition of done
20. **Anti-patterns (mistakes never to repeat)**
21. Governance, versioning & contribution
22. Glossary
23. Appendix A. New-page playbook
24. Appendix B. Complete token reference

---

## 1. How to use this document

- **Building a new page?** Read §2, §8, §10, then follow Appendix A step by step.
- **Writing copy?** Read §16 here, then `brandpositioning.md` in full (it owns voice; this doc owns type/format).
- **Adding a component?** Read §8–§9 and §21. New components must be composed from existing primitives before anything bespoke is introduced.
- **Reviewing a PR?** Use §19's checklist and scan §20.
- **Tokens/values** live in `web/app/globals.css` (`@theme`) and Appendix B. Never hardcode a value that a token exists for.

The **golden test** for anything in this system: *screenshot a junction where blocks meet. The seams must read as hairlines, the diamonds must emerge from the corners, and nothing may float on top of the surface.* If that's true and the copy is on-voice, it's on-system.

---

## 2. The core mental model: the cell collage

The entire visual language is one construction. Internalize it before writing any markup.

> **Lighter cells laid tightly on a darker canvas.**

- Every visible block on the page (the nav, the announcement bar, hero halves, sections, columns, spacer strips, footer columns, FAQ questions, even deliberately *empty* areas) is a **cell**: a lighter, borderless, subtly-rounded rectangle.
- Cells sit on a slightly **darker canvas** separated by a uniform **2px gap** (the *seam*).
- **The seams are the gridlines.** Nothing is ever *drawn*. No border strokes, no `<hr>`, no divider elements, no rule lines.
- Where four rounded cell corners meet across a seam, the canvas shows through as a small **diamond**. The diamond is **emergent negative space**, never an element.
- **Canvas is never exposed beyond the 2px seams.** Empty regions are covered by *empty cells* (edge cells, spacer cells, filler cells).

Everything else in this document is a consequence of these five facts.

**Why it works (visual-design rationale):** contrast and structure come from *surfaces and spacing*, not from lines and ornament. This reads as precise and "engineered" (appropriate for a hardware/research brand), while staying warm (paper tones, not clinical white) and calm (no visual noise). It is also intrinsically responsive: cells reflow, seams stay constant.

---

## 3. Design principles

1. **Structure through surfaces, not strokes.** Never draw a line to separate things; separate them with a seam between two cells.
2. **Paper, not white.** The canvas and cells are warm off-whites. Pure `#fff` is reserved for elevated cards floating *inside* cells.
3. **One accent, used sparingly.** A single teal family. No second accent, no gradients-as-decoration.
4. **Light-dominant.** Dark appears only in three sanctioned places (announcement bar, trust band, footer). Everything else is paper.
5. **Type does the talking.** A mono display face + a clean sans body carry the personality; ornament is minimal.
6. **Calm density.** Whitespace is generous at the page level; density lives *inside* data cards, not in the layout.
7. **Say the real thing.** Copy names concrete objects and outcomes (see §16 and `brandpositioning.md`).
8. **Every element traces to a rule.** If you can't point to the law that produced a mark, it shouldn't be there.

---

## 4. Brand & visual identity foundations

- **Name:** TGIE. *The Great Indian Engineers.*
- **Positioning line:** *Theory, embodied.*
- **Promise:** *You carry the vision. We carry the weight.*
- **Personality:** a senior engineer you trust. Grounded, precise, confident, warm, allergic to hype. (Full character + voice: `brandpositioning.md`.)
- **Logo lockup:** a rounded-square mark containing a mono "T" (`bg-forest`, white glyph, 7px radius, ~28px) followed by the wordmark **TGIE** set in Space Mono, bold, tight tracking. On dark surfaces the mark's fill becomes `--color-forest-deep`.
- **Visual signatures (what makes it recognizably TGIE):**
  1. the **cell collage** with 2px seams and emergent diamonds;
  2. the **mono display type** paired with clean sans;
  3. the **warm paper palette** with a single teal accent and forest-green dark zones;
  4. the **isometric / engraved / pixel** illustration registers;
  5. the **hand-built teal-on-white data-viz.**

---

## 5. Color system

### 5.1 Roles (semantic, not decorative)

| Role | Token | Hex | Use |
|---|---|---|---|
| Canvas | `--color-paper` | `#e9e6de` | Page background; **only ever seen in the 2px seams** |
| Cell | `--color-cell` | `#f5f3ee` | Every content block surface |
| Cell (alt) | `--color-paper-2` | `#efece4` | Optional alternate cell tone for rhythm |
| Elevated card | `--color-card` | `#ffffff` | Floating dashboards/cards **inside** a cell only |
| Inner tile | `--color-card-soft` | `#fbfaf6` | Tiles/wells inside cards & cells |
| Ink | `--color-ink` | `#1c1b18` | Primary text |
| Ink secondary | `--color-ink-2` | `#3b3a35` | Strong secondary text, links at rest |
| Muted | `--color-muted` | `#9c9a90` | Body-supporting text, captions, the 2nd line of two-tone headings |
| Muted faint | `--color-muted-2` | `#b7b5ac` | De-emphasized marks (breadcrumb slashes, idle arrows) |
| Brand green (cell) | `--color-forest` | `#0f3a2e` | Dark green cells (footer tiles, dark bands) |
| Brand green (canvas) | `--color-forest-deep` | `#0b2c23` | Trust-band fill; footer mark fill |
| Footer canvas | *(inline)* | `#081f18` | The **seams** of the footer's green collage (the only sanctioned inline hex) |
| Accent | `--color-teal` | `#2fae97` | The single accent: status dots, chart series, hover, key phrases |
| Accent deep | `--color-teal-deep` | `#0e6e5c` | Teal text on light, gradient dark stop, gauge start |
| Accent soft | `--color-teal-soft` | `#6fd0bb` | Teal on dark, gradient light stop |
| Mint wash | `--color-mint` | `#e9f5f1` | Tinted icon badges, small pills |
| Near-black warm | `--color-inkbtn` | `#232019` | Primary button + announcement bar |
| Hairline | `--color-line` | `#e5e1d8` | Borders **inside** cells only (tiles, inputs, FAQ dividers) |
| Hairline strong | `--color-line-strong` | `#cfcbb7` | Dot-pattern texture (`.dots`) |
| On-dark text | `--color-ondark` | `#eaf1ed` | Text on green/dark cells |
| On-dark muted | `--color-ondark-mut` | `#9fb5ac` | Secondary text on green/dark cells |

### 5.2 The collage pairs
- **Light collage:** canvas `--color-paper` + cell `--color-cell`. The seam contrast is deliberately soft (~2 steps).
- **Green collage** (footer): canvas `#081f18` + cell `--color-forest`. Same 2px seams, same construction, translated to green.

### 5.3 Rules
- **Two-surface contrast, not lines.** The paper↔cell delta is the whole grid. Do not deepen it into a hard border.
- **Teal is precious.** One accent family. Never introduce a second hue; never use teal for large fills (it's an accent, not a surface).
- **Text-on-color** uses the darkest shade of that family (teal text → `--color-teal-deep`; on dark → `--color-ondark`), never pure black/gray.
- **Contrast:** body text (`--color-ink` on `--color-cell`) passes WCAG AA. Never set essential/body copy in `--color-muted` on a cell for long reads (captions only).
- **Dark budget:** the page may show dark green in exactly three roles (announcement, trust band, footer). Adding more dark bands is a violation (§20).

---

## 6. Typography system

Two families, fixed roles. This pairing is intentional and load-bearing to the identity. **Do not deviate.**

### 6.1 Families

| Role | Family | Token / var | Notes |
|---|---|---|---|
| **Display / all headings** | **Space Mono** | `--font-mono` (`--font-spacemono`) | Loaded via `next/font/google`, weights 400/700. Rendered at **500** with `tracking-tight`. |
| **Body / UI** | **Hanken Grotesk** | `--font-sans` (`--font-hanken`) | Loaded via `next/font/google`. Body 400, medium labels 500. |

Fallbacks: sans → `Inter Tight, ui-sans-serif, system-ui`; mono → `ui-monospace, "JetBrains Mono", Menlo`.

### 6.2 Scale (fluid, mono-compensated)

Mono is wide; the scale is already sized down to compensate. **Do not enlarge.**

| Token | Value | Used for |
|---|---|---|
| `--text-hero` | `clamp(2rem, 4.6vw, 3.375rem)` | Page/section H1 |
| `--text-h2` | `clamp(1.625rem, 3.4vw, 2.5rem)` | Section headings |
| `--text-h3` | `clamp(1.125rem, 2vw, 1.4375rem)` | Card/row titles |
| `--text-lead` | `clamp(1rem, 1.4vw, 1.1875rem)` | Lead paragraphs |
| body | `16px` / line-height `1.6` | Paragraphs |
| small | `12–14px` | Notes, captions |
| mono label | `11–13px`, `.12–.18em` tracking, UPPERCASE | Eyebrows, technical labels, `01/02` indices |

### 6.3 Rules
- **Headings are Space Mono, weight 500, `tracking-tight`.** Never sans for headings.
- **Body/paragraphs are Hanken Grotesk.** Never mono for long body copy (mono is for headings, labels, indices, blockquotes, the wordmark).
- **Weight discipline:** 400 (regular) and 500 (medium) only. **Never 600/700**, the sole exception is the logo wordmark (bold).
- **Two-tone heading (signature):** line 1 in `--color-ink`, line 2 in `--color-muted`, same size/weight. Use the `TwoToneHeading` component; do not hand-roll. Pass **`accentLine2`** to render line 2 in `--color-teal` instead of muted. Reserved for the primary conviction/CTA moment (e.g. Final CTA), not for every heading.
- **Sentence case** everywhere. UPPERCASE only for small mono labels with wide tracking.
- **One teal phrase max per heading** (e.g. a key phrase in the conviction line, or the whole second line via `accentLine2`). Optional, not default.
- Base CSS sets `h1–h4` to weight 500, `letter-spacing:-0.02em`, `line-height:1.06`; `TwoToneHeading` overrides to mono with `leading-[1.18]`.

---

## 7. Spatial system

| Concept | Value | Notes |
|---|---|---|
| **Seam** (`GAP`) | **`2px`** | The gap between all sibling cells. Exported as `GAP` from `Grid.tsx`. The single most important spatial constant. |
| Content width | `--maxw` = `1200px` | The centered content column. |
| Gutter | `--gutter` = `clamp(20px, 4vw, 56px)` | Horizontal padding **inside** a content cell. |
| Section rhythm | `.section-y` = `clamp(64px, 9vw, 128px)` | Vertical padding for full sections. |
| Edge column | `minmax(14px, 1fr)` | Empty edge cells; shrink to 14px on mobile, grow on wide screens. |
| Spacer strip | `GapStrip` default `h=16px` | Empty cell between content rows. |

### 7.1 Radii: four sacred numbers
The collage radii are literal px (not the `--radius-*` UI tokens, which are for buttons/tiles/cards):

| Element | Radius |
|---|---|
| Cell | **6px** |
| Bar (nav, announcement) | **8px** |
| Spacer strip / small filler | **4px** |
| Inner UI (button/tile) | `--radius-btn`/`--radius-tile` = 12px; card 16px; chip 8px; pill 999px |

**These four collage numbers (2px seam · 6px cell · 8px bar · 4px strip) are the aesthetic. Never tune them per-section.** The small 6px radius is precisely what makes the emergent diamond small and soft.

### 7.2 Spacing scale
Use Tailwind's default 4px-based scale for internal spacing. Component internals commonly use `p-6` (24px), `py-14`/`py-16` for section cells, `gap-x-10 gap-y-7` for numbered lists.

---

## 8. Layout: the collage construction

All geometry lives in `web/components/frame/Grid.tsx`. **Never hand-roll it.**

### 8.1 The laws
1. **Everything is a cell** (or lives inside one).
2. **Edge cells reach the viewport edge.** Content is centered at `--maxw`; the empty edge cells flanking it stretch fluidly to the screen edges (left:0 → right:100vw). No canvas is exposed.
3. **Seam = 2px, radius = 6px.** Uniform across the whole page.
4. **Diamonds are emergent.** No diamond element exists anywhere.
5. **Spacer strips are plain single cells.** No segments, no squares, no splits.
6. **Dark bands are full-bleed cells.** They span the whole width, content centered to `--maxw` inside; used only for the three sanctioned dark roles.
7. **The footer is the same collage in green** (`#081f18` canvas, `--color-forest` cells).
8. **Hairline borders only inside cells** (tiles, inputs, FAQ answers).

### 8.2 The FrameBlock geometry (memorize)
```
grid-template-columns:
  minmax(14px, 1fr)                                   ← empty edge cell → screen edge
  min(var(--maxw), calc(100% - 28px - 4px))           ← centered content column
  minmax(14px, 1fr)                                   ← empty edge cell → screen edge
gap: 2px
```
`FrameBlock full` drops the edge cells and lets children span the whole width (used by dark bands and the nav, which then center their own inner content to `--maxw`).

### 8.3 Implementation recipes
```tsx
// PAGE STACK: the vertical seams between every block
<div className="flex flex-col gap-[2px] bg-paper pb-[2px]"> …blocks… </div>

// A single-cell section (light)
<Section>…</Section>                       // = FrameBlock + Cell + section-y padding

// A multi-column bento row (each column its own cell)
<FrameBlock>
  <div className="grid gap-[2px] lg:grid-cols-2">
    <Cell className="flex flex-col justify-center px-[var(--gutter)] py-14">…</Cell>
    <Cell className="…">…</Cell>
  </div>
</FrameBlock>

// A stack of item-cells (FAQ, list rows). Each item its OWN cell
<div className="flex flex-col gap-[2px]">
  {items.map(x => <Cell key={x.id}>…</Cell>)}
</div>

// Spacers
<GapStrip />        // plain 16px spacer cell
<DottedStrip />     // spacer cell carrying the dotted texture

// A dark full-bleed band
<FrameBlock full>
  <div className="rounded-[6px] bg-forest-deep px-[var(--gutter)] py-9 text-ondark">
    <div className="mx-auto max-w-[var(--maxw)]">…</div>
  </div>
</FrameBlock>
```

---

## 9. Component library

Location: `web/components/`. Prefer these over anything bespoke.

### 9.1 Grid primitives: `frame/Grid.tsx`
| Export | Purpose |
|---|---|
| `GAP` | The `2` seam constant. |
| `Cell` | Light 6px-rounded borderless cell on the canvas. |
| `FrameBlock` | A content row with fluid edge cells (or `full` for edge-to-edge). |
| `GapStrip` | Plain spacer cell (`h` prop, default 16). |
| `DottedStrip` | Spacer cell with the `.dots` texture. |

### 9.2 Primitives: `primitives/`
- **`Section`**. The standard section: `FrameBlock` + `Cell` + `section-y` padding. Props: `tone` (`paper`/`paper2`/`forest`/`forestDeep`; dark tones render full-bleed), `flush` (drop section padding), `id`, `className`, `containerClassName`.
- **`TwoToneHeading`**. The signature heading. Props: `line1`, `line2?`, `as` (`h1`/`h2`/`h3`), `align`, `onDark`, `accentLine2` (teal 2nd line, sparing). Always mono, weight 500, tracking-tight. **Use for every section heading.**
- **`Button`**. Anchor-based. Variants: `primary` (near-black `--color-inkbtn`, white text, `--shadow-btn` glow, hover `-translate-y-px`), `ghost` (transparent, `--color-line` border, hover border-ink), `onDark` (white on dark), `outlineDark`. Sizes: `md` (22px×12px, 14.5px), `sm` (16px×8px, 13.5px). Radius `--radius-btn` (12px), never a pill. *Note: for internal routes prefer wrapping/using `next/link`; the logo already does.*
- **`Pill`**. Exports `Eyebrow` (pill with a teal status dot + mono-ish label; `onDark` variant) and inline `Chip` (rounded tag for emphasizing a phrase inside a paragraph, 1–3 per paragraph max).
- **`Card`**. White elevated card, used **only inside a cell** (e.g. floating dashboard over pixel art). Optional `hover` lift.

### 9.3 Sections: `sections/`
`Hero`, `TrustBand`, `Philosophy`, `Practices`, `Capabilities`, `Ownership`, `Lifecycle`, `CaseStudy`, `FinalCTA`, `Faq`, `Footer`, plus reusable `PageHero` (interior pages, with `Breadcrumb`) and `CardGrid` (linked sub-page cells). All are composed from the primitives above.

### 9.4 Data-viz: `dataviz/Charts.tsx`
Hand-built SVG: `Donut`, `Gauge`, `BarChart`, `LineChart`, `StatTile`. **No chart library.**

### 9.5 Illustration & surface treatments: `illustration/`
`IsoScene` (isometric; `bare` mode for bento cells), `EngravedFigure` (monochrome hatching), `PixelBackdrop` (pixel art; only behind a white card or filling a media cell), **`DitherField`** (animated ordered-dither surface for green/dark cells; see §11.2), and real image plates via `next/image` (see §11.1). Client illustration/treatment components are `"use client"` and must honor reduced motion.

### 9.6 Nav: `nav/Nav.tsx`
Announcement cell (dark, full-bleed 8px bar) → sticky nav cell (light 8px bar, content centered to `--maxw`) → **mega-menu as a cell collage** (a canvas panel with a header cell + a 3-col grid of sub-page cells, filler cells to avoid exposed canvas, 2px seams; an "Explore {practice} →" link in the header cell) → mobile menu cell.

---

## 10. Patterns & page anatomy

### 10.1 Canonical homepage order
```
Announcement bar (dark) → Nav (light, sticky) → Hero (two cells; NO grid texture)
→ Trust band (dark green, full-bleed) → Philosophy (light) → Practice rows ×5 (bento)
→ Capabilities (header cell + 3-card row) → Lifecycle (showcase in a cell)
→ Ownership (light) → Case study (quote cell + engraved cell) → Final CTA (light)
→ FAQ (heading cell + one cell per question) → Footer (green collage)
```

### 10.2 Interior page anatomy (practice / sub-page / supporting)
```
PageHero (breadcrumb + eyebrow + two-tone heading + lead + CTA, in one cell)
→ context band(s) (body/weight cells, "what's included" numbered lists, etc.)
→ CardGrid of related pages
→ FinalCTA
```
Every interior page wraps in the page stack (`flex flex-col gap-[2px] bg-paper pb-[2px]`); `Nav` and `Footer` come from the root layout.

### 10.3 Key patterns
- **Feature/practice row:** mint icon badge (40px, 12px radius) → mono uppercase label (`PRACTICE 01`) → mono title → **plain** muted paragraph → numbered capability list (`01–04`, mono labels, column-major 2×2). Text cell is left-aligned + vertically centered. Illustration fills its own cell (`iso-grid` background).
- **Accordion (FAQ):** **each question is its own cell**, stacked with 2px seams; chevron sits in a small white (`bg-card`) rounded sub-cell that rotates on open. Never a bordered list inside one cell.
- **Card grid:** a `FrameBlock` with a `grid gap-[2px]` of linked cells; hover → `bg-card`, title → teal, arrow appears.
- **Mega-menu:** the cell collage (see §9.6). No decorative panels; sub-pages are individual cells.
- **Dark band:** full-bleed green cell, content centered; used sparingly.

---

## 11. Iconography, illustration & surface treatments

- **Icons:** line icons, ~1.6–1.8px stroke, rounded joins, `--color-teal` or `--color-ink`. Placed in mint (`--color-mint`) rounded-square badges for feature rows. 16–20px inline, 24px max decorative.

### 11.1 Illustration registers: one register per figure, never mixed
1. **Isometric** (product/how-it-works): white pucks/tiles, teal line icons, dashed teal connectors, faint `.iso-grid` ground (`IsoScene`).
2. **Engraved line-art** (emotional/editorial beats): monochrome only, **never colorize**. Available both as the generated `EngravedFigure` and as **real image plates** (e.g. `/public/illustration/engraved-atlas.png` in the Philosophy media cell).
3. **Pixel art** (playful backdrop): only filling a media cell or sitting behind a floating white card, **never behind text**, never a standalone hero background (`PixelBackdrop`).

**Real image assets (the mature path).** Illustration may now be actual artwork, not only generated SVG. Rules:
- Serve via **`next/image`** with `fill` + `object-cover`, an explicit `sizes`, and `aria-hidden` + `alt=""` for decorative plates.
- Live in `web/public/illustration/`. The cell that holds it is `relative overflow-hidden rounded-[6px]` so the art is clipped to the collage cell (never bleeds past the seam).
- Keep every figure in a **single register**; engraved plates stay monochrome; pixel/photographic art stays masked to a card or media cell.
- Placeholders (generated SVG) and final art are interchangeable **without touching layout**: the cell is the frame.

### 11.2 Animated surface treatment: the DitherField
A decorative, animated **ordered-dither wave** (`DitherField`) that skins **dark/green cells** (currently every cell of the footer green collage). It is deliberately built in the **pixel register** (a low-res canvas quantized with a 4×4 Bayer matrix, upscaled with `image-rendering: pixelated`) so it belongs to the same family as `PixelBackdrop`, not a foreign shader.

Rules for using it:
- **Palette:** a tight green ramp (`#0b2c23 → #143a2e → #1b4d3f → #23664f`), low-contrast, so it reads as texture, not decoration competing with content. Match the surrounding cell's family if reused elsewhere.
- **Placement:** `absolute inset-0`, `pointer-events-none`, `aria-hidden`, inside a `relative overflow-hidden rounded-[6px]` cell. Content sits in a `relative z-10` wrapper above it.
- **Text legibility is mandatory.** Any cell with text over the dither MUST place a **scrim** (`bg-[#081f18]/70`, tune 60–75%) between the dither and the content. Feature/empty cells (e.g. the wordmark, edge fillers) may show it at full strength.
- **Performance:** many instances are fine because `DitherField` pauses via `IntersectionObserver` when off-screen and only allocates a small low-res buffer (`PIXEL` = 6). Never run an always-on full-resolution shader.
- **Motion:** honors `prefers-reduced-motion`. One static frame, no loop, no pointer listeners. Optional pointer ripple only when motion is allowed.
- **Tuning knobs (all one-liners in `DitherField.tsx`):** `PIXEL` (chunkiness), `SPEED`, `FREQ`, `AMP`, `RAMP` (contrast/hue), and the scrim opacity in the consuming cell.
- **Where it's allowed:** dark/green collage surfaces used as a hero-of-the-section moment (footer today). Do **not** apply it to light paper cells or behind dense body copy.

---

## 12. Data visualization

- All charts on **white cards** (`--color-card`) inside a cell, single teal family.
- **Donut:** track `#e7edea`, value arc `--color-teal`, center % in ink.
- **Gauge:** 270° arc, `--color-teal-deep → --color-teal-soft` gradient, big mono value.
- **Bars:** rounded-top, `--color-teal-soft → --color-teal` gradient.
- **Line:** 2–2.5px teal stroke, faint area fill.
- **Stat tile:** mono value + muted label.
- Chart chrome (titles/axes) in `--color-muted`; **one accent hue per chart**. Never install a charting library.

---

## 13. Motion & interaction

- **Reveal on scroll:** `Reveal` (Motion / framer-motion). Fade + 14px rise, `once`, `-80px` viewport margin, ~0.5s ease. Gated by `useReducedMotion`.
- **Hover:** cards/buttons lift `-translate-y-px`; cells shift to `bg-card`; links → teal; FAQ chevron rotates 180°; mega-menu arrow → teal.
- **Ambient / decorative animation:** the `DitherField` surface (§11.2) is the only continuous animation. It is texture, not signal.
- **Off-screen pause (required for continuous animation):** any always-running canvas/rAF loop MUST pause via `IntersectionObserver` when its element is off-screen (as `DitherField` does), so multiple instances cost nothing until scrolled into view.
- **Transitions:** 150–200ms, color/transform/border/shadow only.
- **Forbidden:** parallax, autoplay carousels, bounce, attention-seeking motion, motion that conveys meaning without a static fallback.
- **Reduced motion:** the global `@media (prefers-reduced-motion: reduce)` rule near-zeroes animation/transition durations; `Reveal` no-ops; `DitherField` renders one static frame with no loop and no pointer listeners. Always honor it.

---

## 14. Accessibility

- **Contrast:** ink on cell passes AA; verify any new text/background pair. Never use `--color-muted` for essential body copy.
- **Semantics:** one `<h1>` per page (the PageHero/Hero); logical heading order; `<nav>`, `<main>`, `<footer>` landmarks; `<details>/<summary>` for FAQ.
- **Focus:** `focus-visible` teal outline (`outline-2 outline-teal`) on all interactive elements; never remove focus rings.
- **Targets:** ≥44×44px effective for buttons, nav items, accordion summaries.
- **Labels:** icon-only controls get `aria-label`; decorative illustration/`Cell` fillers get `aria-hidden`.
- **Keyboard:** mega-menu and mobile menu operable by keyboard; `Esc` closes; no keyboard traps.
- **Motion:** respect `prefers-reduced-motion` (§13).
- **Color independence:** never encode meaning by color alone (pair teal states with text/icon).

---

## 15. Responsive & adaptive behavior

- **Breakpoints (Tailwind):** `sm 640 · md 768 · lg 1024 · xl 1280`.
- **The collage is responsive by construction:** edge cells shrink to 14px slivers on mobile; the content column is fluid below `--maxw`.
- **Grid collapse:** multi-column rows (`lg:grid-cols-2`, `md:grid-cols-3`) stack to one column below breakpoint; **keep `gap-[2px]`** when stacked so seams persist.
- **Order:** alternating rows (`lg:order-2`) reset to source order on mobile. **Text above media.**
- **Nav:** collapses to a Menu button `<lg`; mobile menu is a dropdown cell.
- **Type/space:** already fluid via `clamp()`; do not add manual per-breakpoint font sizes.
- **Hard rule: zero horizontal page scroll at any width.** Test 375 / 768 / 1024 / 1280 / 1440. Wide inner content (tables, wide charts) scrolls inside its own cell (`overflow-x-auto`), never the page.

---

## 16. UX writing & content design

Voice is owned by **`brandpositioning.md`**; read it before writing. This section governs how voice meets the type system.

- **Master line / promise:** *Theory, embodied.* / *You carry the vision. We carry the weight.*
- **Two-tone headings carry the message:** line 1 = the claim, line 2 = the muted qualifier. Keep both short; mono is wide.
- **Eyebrows:** short mono UPPERCASE labels (`PRACTICE 01`, `WHAT'S INCLUDED`, `100% ZERO LOCK-IN`). Sentence-case everything else.
- **Feature paragraphs are plain**. No marker/underline highlight effects. Name the weight, then lift it.
- **Numbered lists** use mono `01–04` labels; keep item titles to a few words, notes to one line.
- **CTAs:** action-first, concrete. *Start a Project →*, *Explore Engineering →*, *What we deliver*. Avoid hype verbs.
- **Microcopy honesty:** the `/start` form and trust marks must stay truthful (no invented review counts/logos). Third-party names (IIT Madras, MedCuore) require sign-off before public use.
- **Banned language:** run copy against `brandpositioning.md` §8 (unlock, leverage, seamless, elevate, revolutionize, delve, "in today's fast-paced world", "not just X but Y", etc.). Cut on sight.
- **Formatting rules:** sentence case; no Title Case; no mid-sentence bold (use a `Chip` or the muted line); end on the strong word.

---

## 17. Content architecture (the data layer)

- **All copy lives in `web/content/*.ts`** (typed), never hardcoded in JSX. Files: `site.ts` (nav, hero, trust, philosophy, capabilities, ownership, case study, final CTA, footer), `practices.ts` (the five practices + capabilities), `practiceDetail.ts` (per-practice lead + sub-pages), `pages.ts` (Work/Insights/Company), `fabrication.ts` (fabrication showcase), `lifecycle.ts`, `faq.ts`.
- **Why:** one reviewable place for voice; new pages/sub-pages extend data, not markup; the sitemap stays in sync (nav mega-menu, footer, and routes all read the same content).
- **Routing (App Router):** `/` (home), `/practices/[slug]` (5 practices, SSG), `/practices/[slug]/[sub]` (~22 sub-pages, SSG via `generateStaticParams`), `/work`, `/insights`, `/company`, `/start`. Dynamic routes await `params` (Next 16 async params).

---

## 18. Engineering conventions

- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind v4 (tokens in `@theme`) · Motion. Fonts via `next/font/google` (Hanken Grotesk, Space Mono).
- **Tokens only:** no raw hex/px in components where a token exists. The two documented exceptions: the collage literal radii (6/8/4px) and the footer canvas `#081f18`.
- **`cn()`** (`lib/cn.ts`, clsx) for class composition.
- **Server components by default;** `"use client"` only where needed (`Nav`, `Reveal`, forms).
- **Internal links:** prefer `next/link` (lint enforces it for static internal hrefs).
- **AGENTS.md caveat:** this repo's Next.js may differ from training data; consult `node_modules/next/dist/docs/` for API specifics and heed the generated agent block.
- **Verify:** `pnpm build` and `pnpm lint` must pass before done.

---

## 19. Quality gates & definition of done

A change is done only when **all** are true:
- [ ] Built with `FrameBlock`/`Cell`/`GapStrip`/`Section`. No hand-rolled grid geometry.
- [ ] **No exposed canvas** beyond 2px seams at any width (edge cells + fillers cover everything).
- [ ] Seam `2px`, cell radius `6px`, bar `8px`, strip `4px`. Untouched.
- [ ] Headings Space Mono 500 via `TwoToneHeading`; body Hanken Grotesk; sizes from `--text-*`.
- [ ] Dark only in the three sanctioned roles; footer is the green collage.
- [ ] Copy in `content/*.ts`, on-voice, banned words absent (`brandpositioning.md` §8/§12).
- [ ] Hairline borders only inside cells.
- [ ] A11y: one `h1`, landmarks, focus rings, `aria-hidden` on filler cells, reduced-motion honored.
- [ ] Any text over a decorative surface (DitherField) sits on a scrim and stays clearly legible; continuous animations pause off-screen and honor reduced motion.
- [ ] `pnpm build` ✅ · `pnpm lint` ✅ · **no horizontal scroll at 375px**.
- [ ] **Junction screenshot:** seams read as hairlines, diamonds emerge, nothing floats.

---

## 20. Anti-patterns: mistakes never to repeat

Each of these is a real mistake made while building this system. They are the fastest way to go off-brand.

1. ❌ **Drawing gridlines**. No `h-px`/`w-px` divider elements, no border-based rails, no double-line strokes. Seams come from gaps between cells.
2. ❌ **Placing a diamond element**. No rotated squares, no `+` marks, no crop brackets. Junction diamonds are emergent only.
3. ❌ **Leaving canvas exposed** beyond the 2px seams. No naked `bg-paper` beside/above/between cells. Cover it with an empty cell.
4. ❌ **Fixed-width edge cells** or a centered frame with canvas margins outside it. Edge cells are fluid to the viewport edge.
5. ❌ **Square segment cells / splits inside spacer strips**. Strips are plain single cells.
6. ❌ **Extra dark bands**. Only announcement, trust band, footer are dark.
7. ❌ **Grid texture / marks / frames behind the hero**. The hero is clean cells.
8. ❌ **Sans headings or mono body paragraphs**. The pairing is fixed.
9. ❌ **Weight 600/700**, Title Case headings, or a second accent color.
10. ❌ **Colorizing engraved art; pixel art behind text; mixing illustration registers** in one figure.
11. ❌ **Pure white as a cell/page surface**. White is only for floating cards inside cells.
12. ❌ **Installing a chart library**. Charts are the hand-built SVGs in `dataviz/`.
13. ❌ **Marker/underline highlight** on feature paragraphs. Plain muted text.
14. ❌ **Borders between cells**. The 2px seam is the separator.
15. ❌ **Bordered list inside one cell for the FAQ**. Each question is its own cell.
16. � **Enlarging cell radius** to "soften". It enlarges the diamond and breaks the look; stay at 6px.
17. ❌ **Hardcoding copy in JSX**. It belongs in `content/*.ts`.
18. ❌ **Text over the DitherField without a scrim**. Every text cell over the dither needs the dark scrim (§11.2); the wordmark/empty cells are the only bare exceptions.
19. ❌ **Dither on light paper cells or behind body copy**. It's a dark/green surface treatment only.
20. ❌ **A continuous animation with no off-screen pause**. Always `IntersectionObserver`-gate a rAF loop.
21. ❌ **Real images that bleed past the cell**. Clip art to the cell (`overflow-hidden rounded-[6px]`) and mark decorative plates `aria-hidden`/`alt=""`.

---

## 21. Governance, versioning & contribution

- **Source of truth:** this file + `web/components/frame/Grid.tsx`. Update this doc in the same PR as any system-level change.
- **Adding a component:** first try to compose it from existing primitives. If genuinely new, add it to `components/`, document it in §9, and ensure it obeys §8's laws.
- **Changing a token/constant:** change it in `globals.css`/`Grid.tsx`, update Appendix B and any affected section, and re-verify §19 across breakpoints.
- **Tuning the "feel":** the whole aesthetic is two colors (`--color-paper`, `--color-cell`) + one constant (`GAP`) + four radii. Prefer adjusting these single values over per-section overrides.
- **Versioning:** bump the header version (v3 → v4) on any change to the core laws (§2, §8) or the token set; note what changed at the top.
- **Deviations:** if a real need conflicts with a law, propose the change to the law here first. Don't quietly special-case a page. (The Fabrication showcase is the one sanctioned per-page enrichment and is backed by its own content file.)

---

## 22. Glossary

- **Canvas**: the darker page surface (`--color-paper`); seen only in seams.
- **Cell**: a lighter rounded block on the canvas; the atomic unit.
- **Seam**: the 2px canvas gap between cells; reads as a hairline.
- **Diamond**: the small canvas shape that emerges where four rounded corners meet; never an element.
- **Edge cell**: the empty fluid cell flanking content to the viewport edge.
- **Spacer strip**: an empty cell (`GapStrip`) providing vertical rhythm.
- **Dark band**: a full-bleed dark green cell (one of three sanctioned).
- **Green collage**: the footer's version of the construction (`#081f18` canvas + `--color-forest` cells).
- **Two-tone heading**: the signature heading: ink line + muted line (or teal line 2 via `accentLine2`).
- **Register**: one of the three illustration styles (isometric / engraved / pixel).
- **Surface treatment**: an animated skin applied to a cell's surface (currently `DitherField`); decorative texture, never content.
- **DitherField**: the animated ordered-dither wave on green/dark cells (§11.2).
- **Scrim**: the translucent dark overlay (`bg-[#081f18]/70`) placed between a surface treatment and text to keep copy legible.

---

## 23. Appendix A. New-page playbook

1. **Wrap** the page in the stack: `<div className="flex flex-col gap-[2px] bg-paper pb-[2px]">`. (`Nav`/`Footer` come from the layout.)
2. **Hero:** use `PageHero` (breadcrumb + eyebrow + `TwoToneHeading` + lead + `Button` CTAs) in one cell.
3. **Body:** compose from `Section` (single cell) and `FrameBlock` multi-cell rows. Every column is a `Cell`; every gap is `gap-[2px]`. Item lists (FAQ-like) → one `Cell` per item.
4. **Spacing:** separate major blocks with `<GapStrip />` (or `<DottedStrip />` for texture).
5. **Dark moments:** only if warranted, a `FrameBlock full` green cell. Count your dark budget.
6. **Copy:** author it in `content/*.ts`; keep headings two-tone/mono; run the banned-word check.
7. **Metadata:** export `metadata`/`generateMetadata` with an on-voice title + description.
8. **Verify (§19):** build, lint, 375px overflow check, and the junction screenshot.

## 24. Appendix B. Complete token reference

```css
/* @theme (web/app/globals.css) */
--color-paper:#e9e6de;  --color-cell:#f5f3ee;  --color-paper-2:#efece4;
--color-card:#ffffff;   --color-card-soft:#fbfaf6;
--color-ink:#1c1b18;    --color-ink-2:#3b3a35;
--color-muted:#9c9a90;  --color-muted-2:#b7b5ac;
--color-forest:#0f3a2e; --color-forest-deep:#0b2c23;
--color-teal:#2fae97;   --color-teal-deep:#0e6e5c;  --color-teal-soft:#6fd0bb;  --color-mint:#e9f5f1;
--color-inkbtn:#232019; --color-line:#e5e1d8;  --color-line-strong:#cfcbb7;
--color-ondark:#eaf1ed; --color-ondark-mut:#9fb5ac;

--font-sans: var(--font-hanken), "Inter Tight", ui-sans-serif, system-ui, sans-serif;
--font-mono: var(--font-spacemono), ui-monospace, "JetBrains Mono", Menlo, monospace;

--text-hero: clamp(2rem, 4.6vw, 3.375rem);
--text-h2:   clamp(1.625rem, 3.4vw, 2.5rem);
--text-h3:   clamp(1.125rem, 2vw, 1.4375rem);
--text-lead: clamp(1rem, 1.4vw, 1.1875rem);

--radius-chip:8px; --radius-tile:12px; --radius-btn:12px; --radius-card:16px; --radius-pill:999px;

/* :root */
--shadow-card: 0 10px 34px -18px rgba(20,30,25,.18);
--shadow-float:0 26px 60px -30px rgba(16,40,32,.30);
--shadow-btn:  0 10px 24px -10px rgba(30,30,26,.45);
--gutter: clamp(20px, 4vw, 56px);
--maxw: 1200px;

/* Grid.tsx */
GAP = 2;                              /* seam */
/* collage radii: cell 6px · bar 8px · strip/filler 4px */
/* footer canvas (inline): #081f18 */

/* DitherField.tsx. Decorative surface treatment (green cells) */
RAMP = ["#0b2c23","#143a2e","#1b4d3f","#23664f"];   /* tight green ramp */
PIXEL = 6; SPEED = 0.028; FREQ = 0.09; AMP = 0.9;
scrim (behind text over the dither): bg-[#081f18]/70   /* 60–75% */

/* helper classes: .container-x .section-y .dots .notch-cell .iso-grid */
```

---

*End of handover. If something here is ambiguous, look at how an existing on-system section solves it (Practices, FAQ, Footer are good references) and mirror it. Then improve this document so the next reader doesn't have to.*
