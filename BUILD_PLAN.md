# TGIE Landing Page — Build Plan (Next.js)

An implementation plan written for an engineer with strong front-end skills. It translates three existing sources of truth into a shippable Next.js site:

- **Design** → [`designsystem.md`](designsystem.md) ("Paper & Blueprint")
- **Voice & positioning** → [`brandpositioning.md`](brandpositioning.md) ("Theory, embodied / You carry the vision. We carry the weight.")
- **Information architecture** → [`sitemap.html`](sitemap.html) + [`tgie-sitemap-tree.svg`](tgie-sitemap-tree.svg)
- **Factual context** → `TGIE_Portfolio.pdf`

Scope of this plan: the **marketing landing page** (`/`), built on an architecture that extends cleanly to the full sitemap (practice pages, company, insights) later.

---

## 0. Decisions locked before code (read first)

A senior dev resolves ambiguity up front. These are the calls; flag any you want changed.

| # | Decision | Choice | Why |
|---|---|---|---|
| D1 | Framework | **Next.js 15, App Router, TypeScript (strict)** | SSG/ISR marketing site, RSC by default, great DX. |
| D2 | Styling | **Tailwind CSS v4** with design tokens in `@theme` + CSS vars | Tokens from `designsystem.md` map 1:1; utility speed; tiny runtime. |
| D3 | Fonts | `next/font/local` for **General Sans** (Fontshare) + `next/font/google` for **Space Mono**; fallback **Inter Tight** | Matches the doc's stack; self-hosted, no layout shift. |
| D4 | Animation | **Motion (framer-motion)** for scroll reveals only; hand-built SVG for charts | No heavy chart lib; exact visual control; small bundle. |
| D5 | Content | **Typed content layer** in `/content/*.ts` (not MDX) | Sections are data-driven → sitemap extends without touching JSX. |
| D6 | Illustrations | **Inline SVG React components** for blueprint frame, isometric, data-viz; **image assets** for engraved + pixel-art | Theme-able, crisp, responsive; keeps DOM controllable. |
| D7 | Forms | **"Start a Project"** = route `/start` + server action → **Resend** email (or Formspree fallback) | No backend needed; server action keeps it native. |
| D8 | Hosting | **Vercel** | Zero-config Next, image optimization, previews. |
| D9 | Nav model | Practice **mega-menus** (the 5 pillars) styled per Paper & Blueprint | Reconciles the earlier IBM-style nav with the reference styling. |

**Open questions to confirm with stakeholder (don't block Phase 1):**
- Can we publicly name **IIT Madras** and **MedCuore** in the credibility band? (They're in the PDF; naming third parties is a brand/legal call.)
- Real logos for the trust band, or keep it text-only?
- ~~"Greate Indian Engineers"~~ — resolved: standardized to **"Great Indian Engineers"**.

---

## 1. Design-token → code mapping

Single source: `app/globals.css` defines CSS variables from `designsystem.md`; `@theme` exposes them to Tailwind so we get `bg-paper`, `text-ink`, `text-muted`, `border-line`, etc.

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-paper:#F3F1EB; --color-paper-2:#EFECE4;
  --color-card:#FFFFFF;  --color-card-soft:#FBFAF6;
  --color-ink:#1C1B18;   --color-ink-2:#3B3A35;
  --color-muted:#9C9A90; --color-muted-2:#B7B5AC;
  --color-green-900:#0F3A2E; --color-green-950:#0B2C23;
  --color-teal:#2FAE97; --color-teal-deep:#0E6E5C; --color-teal-soft:#6FD0BB;
  --color-mint:#E9F5F1;
  --color-ink-btn:#232019; --color-line:#E5E1D8; --color-line-strong:#CFCBB7;
  --color-on-dark:#EAF1ED; --color-on-dark-mut:#9FB5AC;

  --radius-card:16px; --radius-tile:12px; --radius-btn:12px; --radius-pill:999px; --radius-chip:8px;

  --font-sans:"General Sans","Inter Tight",ui-sans-serif,system-ui,sans-serif;
  --font-mono:"Space Mono","JetBrains Mono",ui-monospace,Menlo,monospace;

  /* fluid type (design system §3.2) */
  --text-hero:clamp(40px,6vw,68px);
  --text-h2:clamp(30px,4vw,46px);
  --text-h3:clamp(20px,2.4vw,26px);
  --text-lead:clamp(16px,1.4vw,19px);
}
:root{ --shadow-card:0 10px 34px -18px rgba(20,30,25,.18);
       --shadow-float:0 26px 60px -30px rgba(16,40,32,.30);
       --shadow-btn:0 10px 24px -10px rgba(30,30,26,.45); }
body{ background:var(--color-paper); color:var(--color-ink);
      font-family:var(--font-sans); line-height:1.6; letter-spacing:-.01em;
      -webkit-font-smoothing:antialiased; }
```

**Rule:** no raw hex in components. Only token utilities. This is what "closely implement the design system" means in practice — enforce it in review.

---

## 2. Project structure

```
tgie/
├─ app/
│  ├─ layout.tsx            # fonts, <BlueprintFrame/>, metadata, analytics
│  ├─ page.tsx              # landing = composition of sections
│  ├─ globals.css           # tokens + base
│  ├─ start/page.tsx        # "Start a Project" intake (server action)
│  └─ opengraph-image.tsx   # dynamic OG image
├─ components/
│  ├─ primitives/           # Button, Pill, Eyebrow, Chip, Card, TwoToneHeading, Section
│  ├─ frame/                # BlueprintFrame, PlusMark, CropBracket, DottedBand
│  ├─ nav/                  # Nav, MegaMenu, AnnouncementBar, MobileMenu
│  ├─ sections/             # Hero, TrustBand, Philosophy, Practices, Capabilities,
│  │                        # Ownership, Lifecycle, CaseStudy, FinalCTA, Faq, Footer
│  ├─ dataviz/              # Donut, Gauge, BarChart, LineChart, StatTile  (SVG)
│  └─ illustration/         # Iso* scenes, EngravedFigure, PixelBackdrop
├─ content/
│  ├─ site.ts               # nav, footer, global copy
│  ├─ practices.ts          # 5 pillars: body/weight/capabilities  (typed)
│  ├─ lifecycle.ts          # 4 phases
│  ├─ faq.ts
│  └─ proof.ts              # case study, trust logos, stats
├─ lib/  (cn(), motion presets, useReducedMotion)
├─ public/
│  ├─ fonts/                # GeneralSans-*.woff2
│  ├─ illustration/         # engraved-eye.svg, engraved-hands.svg, pixel-*.webp
│  └─ og/
├─ tailwind + tsconfig + eslint/prettier
```

**Content-as-data example** (drives Practices + mega-menu + footer from one file):

```ts
// content/practices.ts
export type Practice = {
  slug: string; index: string; name: string;
  body: string;      // "a physical body — silicon, firmware, enclosure"
  weight: string;    // "building it from zero"
  position: string;  // the point-of-view line
  capabilities: { title: string; note: string }[];
  illustration: "iso-boards" | "iso-lab" | "iso-factory" | "iso-legal" | "iso-market";
};
export const practices: Practice[] = [ /* 01..05, see §5 */ ];
```

---

## 3. Component architecture

### 3.1 The Blueprint Frame (signature — build first)
A fixed, `pointer-events-none`, `aria-hidden` overlay rendered once in `layout.tsx`, sitting behind content (`z-0`, content `z-10`).

- `<BlueprintFrame/>` draws the outer hairline rectangle inside the gutter + optional column rules.
- `<PlusMark/>`, `<CropBracket/>`, `<DottedBand/>` are placed by sections that want the spec-sheet look between blocks.
- **Responsive:** below `md`, render only the outer frame + section dividers; drop internal `+` marks and column rules (design system §8).

### 3.2 Primitives (typed, tokens only)
- `Button` — variants: `primary` (near-black + `--shadow-btn` glow), `ghost` (hairline), `onDark` (white on green). `size` sm/md.
- `Pill` / `Eyebrow` — pill with teal status `dot`.
- `Chip` — inline highlight tag for hero paragraph.
- `TwoToneHeading` — `<h2>` renders `{line1}` in ink + `{line2}` in muted; weight 500 always. **This enforces the signature heading everywhere.**
- `Section` — wraps content: max-w container, fluid vertical padding, optional `tone="paper|paper2|green"`, optional frame marks.
- `Card` — white, hairline, `--radius-card`, `--shadow-card`, hover lift.

### 3.3 Data-viz (hand-built SVG, no lib)
Match design system §7.4 exactly. Each is a small `role="img"` SVG component with a `<title>`.
- `Donut({value})` — track + teal arc + center %.
- `Gauge({value,label})` — 270° arc, `teal-deep → teal-soft` gradient, big value.
- `BarChart({data})` — rounded-top gradient bars.
- `LineChart({data})` — 2px teal stroke + faint area + optional dashed projection.
- `StatTile` — label + big number, tabular figures.
These compose into the hero "Capability panel" and the Capabilities cards.

### 3.4 Illustration
- `illustration/Iso*` — inline SVG isometric scenes (pucks, tiles, dashed teal connectors) on a faint iso-grid. One per practice.
- `EngravedFigure` — `next/image` grayscale asset (eye, hands), `alt=""`, decorative. **Never colorized** (design system anti-rule).
- `PixelBackdrop` — optimized `.webp`, only ever behind a floating white data card, never behind text.

---

## 4. Page composition (section order + content)

Order follows the design system's section inventory, remapped to TGIE's sitemap and voice. Copy below is **on-voice, ready to use** (verify facts against the PDF before publish).

### S0 · Announcement bar *(optional)*
Near-black warm bar. Copy: `New — taking on Q3 research builds → Start a project`. Dismissible; hidden on mobile if space-tight.

### S1 · Nav
Logo `TGIE` · mega-menu items = **Engineering / Research / Fabrication / Business Enablement / Fundraising & GTM** · `Insights` link · right: `Client Login` + `Start a Project` (primary). Each mega-menu = 3 grouped link columns + a dark featured spotlight (reuse structure from earlier nav work, restyled to tokens). Collapses to hamburger below `lg`.

### S2 · Hero
- Eyebrow pill: `● The Great Indian Engineers`
- **TwoToneHeading (hero size):** `Theory, embodied.` — with muted second line `We give ideas a body — and carry the weight of making it real.`
- Lead paragraph (voice: name the weight, then lift): *"Most ideas die after the breakthrough — in the board that won't hold a signal, the company nobody has time to form, the raise nobody prepped for. We carry all of it. You keep the idea."* Use 1–2 inline **Chips** on key phrases ("hold a signal", "the raise").
- CTAs: `Start a Project →` (primary) · `See the practices` (ghost).
- Proof row: `50+ PCBs delivered` · `100% IP transfer` · `4+ yrs embedded` (stat tiles).
- Right: **Capability panel** (white card, `--shadow-float`) over a `PixelBackdrop` — donut ring (zero packet loss), bar chart (throughput), status rows. Reuses dataviz.

### S3 · Trust band (dark green)
Mono uppercase caption: `GROUNDED IN INSTITUTIONAL & MEDICAL-GRADE ENGINEERING RIGOR`. Notched-corner cells: `IIT Madras · MedCuore · ESP-IDF · Nordic nRF · STM32 · Edge Impulse · TensorFlow Lite`. *(Pending naming approval — see §0.)*

### S4 · Philosophy band (dark green, `--green-950`)
The manifesto. Eyebrow `● Our conviction`.
- Big line: **You carry the vision. We carry the weight.**
- Sub: *"The discovery is yours — the thesis, the data, the IP. What we carry is the operational weight of turning an idea into something you can hold, defend, publish, and sell."*
- Three convictions as columns (from brand doc §1): *An idea is only real once it has a body · The weight shouldn't fall on the creator · A body we build, you own — completely.*

### S5 · Practices (the core — 5 feature rows)
Data-driven from `content/practices.ts`. Each row: **6/6**, alternating side, isometric illustration, separated by hairlines with `+` marks. Each row shows the practice's **positioning line**, then a two-column **"the body we give / the weight we lift"** block, then a 2×2 capability grid. (Full copy in §5.)

### S6 · Capabilities cards (3-col, data-viz on pixel-art)
Eyebrow `● Core technical stack`. Cards: **Firmware & silicon mastery** (LineChart), **Full-stack data visualization** (BarChart), **Edge AI & on-device ML** (Donut/Gauge). Copy sourced from PDF §3, rewritten to voice.

### S7 · Ownership band ("We build the body. You own it.")
Dark green card. 100% zero lock-in. Four deliverables (PDF §7): complete CAD & Gerber · firmware source access · detailed BOM · unrestricted publication rights.

### S8 · Engagement lifecycle (showcase panel)
Four phases (PDF §8) in a bordered showcase: PoC → Engineering Validation → Design Validation → Launch Readiness, each with scope + objective. `content/lifecycle.ts`.

### S9 · Case study (engraved eye)
`● Proven track record`. Quote (PDF §2): *"The custom hardware was delivered fully calibrated and field-ready — enabling pristine empirical dataset logs required for a successful thesis defense."* Attribution: Doctoral thesis validation · PhD scholar, premier Indian technical institute. `EngravedFigure` beside it.

### S10 · Final CTA (engraved hands)
**TwoToneHeading:** `Bring your research to the world.` Sub: *"You dream it. We'll carry it."* Buttons: `Start a Project →` · `Book a consultation`. Base: Thirumudivakkam, Chennai — working globally.

### S11 · FAQ accordion
Two-col; `<details>/<summary>`. Six Q&As from prior work (who we work with, IP ownership, incorporation, phased structure, small-batch, location). `content/faq.ts`.

### S12 · Footer (dark green + oversized wordmark)
Four columns from the sitemap (Practices / Capabilities / Company / Insights) + brand blurb + socials + giant outline `TGIE` wordmark + legal bar (Privacy · Terms · IP Transparency).

---

## 5. Practices content (drop-in, voice-checked)

```ts
export const practices: Practice[] = [
  { slug:"engineering", index:"01", name:"Embedded Systems & Hardware",
    position:"We build from zero, because off-the-shelf compromises the science.",
    body:"a physical body — silicon, firmware, enclosure",
    weight:"building it from zero",
    capabilities:[
      {title:"Custom PCB design", note:"Up to 6 layers, DFM-ready Gerber"},
      {title:"Bare-metal firmware", note:"C/C++, FreeRTOS, ESP-IDF, nRF, STM32"},
      {title:"3D enclosures", note:"PETG · ABS · PLA, ergonomic housings"},
      {title:"Edge AI / TinyML", note:"On-device inference, Edge Impulse"} ],
    illustration:"iso-boards" },

  { slug:"research", index:"02", name:"Research & Academic Prototyping",
    position:"Your thesis deserves apparatus as rigorous as your method.",
    body:"a credible body — calibrated, field-ready apparatus",
    weight:"proving the data can be trusted",
    capabilities:[
      {title:"Thesis-grade builds", note:"Calibrated, field-ready delivery"},
      {title:"Zero packet loss", note:"Continuous high-frequency sampling"},
      {title:"Grant-phased delivery", note:"PoC → EVT → DVT → Launch"},
      {title:"In-house collaboration", note:"Iterate beside our engineers"} ],
    illustration:"iso-lab" },

  { slug:"fabrication", index:"03", name:"Fabrication & Manufacturing",
    position:"The gap between one unit and a hundred is where most research dies.",
    body:"a repeatable body — units, not one-offs",
    weight:"holding quality at volume",
    capabilities:[
      {title:"Small-batch runs", note:"10–20 units for pilots"},
      {title:"SMD assembly", note:"Vetted domestic & global partners"},
      {title:"Bridge production", note:"In-house high-speed 3D printing"},
      {title:"Test jigs & QC", note:"Consistency across every batch"} ],
    illustration:"iso-factory" },

  { slug:"enablement", index:"04", name:"Business Enablement & Advisory",
    position:"A prototype is not a company. We build the company too.",
    body:"a legal body — entity, compliance, operations",
    weight:"structure, audit, and admin",
    capabilities:[
      {title:"Incorporation", note:"India · Dubai/UAE · USA"},
      {title:"Audit & compliance", note:"Grant utilization, BOM traceability"},
      {title:"Branding & identity", note:"Naming, logo, positioning"},
      {title:"Operations", note:"Sourcing, fulfillment, SOPs"} ],
    illustration:"iso-legal" },

  { slug:"fundraising-gtm", index:"05", name:"Fundraising & GTM",
    position:"We carry it the last distance — into capital and the market.",
    body:"a market body — brand, capital, customers",
    weight:"reaching investors and buyers",
    capabilities:[
      {title:"Grants & schemes", note:"DST-NIDHI · BIRAC BIG · MeitY"},
      {title:"Investor access & pitch", note:"Deck, financial model, angels"},
      {title:"Go-to-market", note:"D2C & B2B channel plan"},
      {title:"Marketplace & Amazon", note:"Listing, A+ content, reviews"} ],
    illustration:"iso-market" },
];
```

---

## 6. Responsive & adaptive strategy

- **Breakpoints (Tailwind):** `sm 640 · md 768 · lg 1024 · xl 1280`. Container max `1200px`, gutter `clamp(20px,5vw,80px)`.
- **Fluid type/spacing** via the `--text-*` clamps + `py-[clamp(64px,9vw,128px)]` section padding. No fixed viewport-spanning px.
- **Grid collapse:** 6/6 → stack at `md`, **illustration below text** on mobile; 3-col grids → 2 at `md` → 1 at `sm`.
- **Blueprint frame** simplifies below `md` (§3.1).
- **Nav** → hamburger below `lg`; keep logo + primary button.
- **Wide cards/dashboards** scroll inside their own `overflow-x-auto`; page never scrolls horizontally.
- **Images:** `next/image`, `sizes` set per slot, `max-w-full`; pixel-art crops (`object-cover`), never stretches.
- Test matrix: 320 / 375 / 768 / 1024 / 1440.

---

## 7. Motion

`lib/motion.ts` presets. Reveal-on-scroll (fade + 12px rise, 180ms), hover lifts on cards/buttons, accordion chevron rotate, optional chart draw-on and dashed iso-connector flow. All gated behind `useReducedMotion()`. No parallax, carousels, or bounce (design system §9).

---

## 8. Performance targets

- **Lighthouse ≥ 95** across the board; **CLS 0** (self-hosted fonts, sized images).
- RSC for all static sections; only Nav/MegaMenu/Accordion/motion wrappers are client components (`"use client"` minimal).
- Charts are inline SVG → no chart-lib bundle.
- Pixel-art/engraved assets as `.webp`/optimized SVG, lazy below the fold, priority only on hero.
- `next/font` with `display:swap` + preload hero fonts.
- Bundle budget: first-load JS < 120KB gz.

---

## 9. SEO, metadata, analytics

- `metadata` per route; title uses positioning: *"TGIE — Theory, embodied. We give ideas a body and carry the weight."*
- `app/opengraph-image.tsx` dynamic OG (paper bg, two-tone heading, wordmark).
- JSON-LD `Organization` + `Service` (the 5 practices).
- `sitemap.ts` + `robots.ts`.
- Analytics: Vercel Analytics + optional Plausible (privacy-first, matches brand).

---

## 10. Accessibility

- Semantic landmarks; one `<h1>` (hero); heading order intact.
- Contrast verified (`ink` on `paper` passes; never `muted` for body).
- Accordion via `<details>` or `aria-expanded`; mega-menu keyboard + `Esc`; focus-visible teal ring.
- Decorative illustration `alt=""`; icon-buttons `aria-label`.
- `prefers-reduced-motion` respected globally.

---

## 11. Voice enforcement in the pipeline

Because "closely implement the brand voice" is a real requirement, make it mechanical:
- Keep all copy in `/content/*.ts` (not scattered in JSX) so it's reviewable in one place.
- Add a `pnpm lint:copy` script — a simple node script that greps content for the **§8 banned words** in `brandpositioning.md` (`unlock, leverage, seamless, robust, elevate, delve, empower, revolutionize…`) and fails CI on a hit.
- PR checklist = the brand doc §12 pre-publish checklist.

---

## 12. Build phases (milestones)

**Phase 0 — Foundations (½ day)**
Scaffold Next+TS+Tailwind v4, tokens in `globals.css`, fonts, `lib/cn`, Prettier/ESLint, deploy empty to Vercel.

**Phase 1 — Frame & primitives (1 day)**
`BlueprintFrame` + marks; `Button/Pill/Chip/TwoToneHeading/Section/Card`; Storybook-lite page `/kitchen-sink` to eyeball tokens. *Gate: matches design system swatches/type scale.*

**Phase 2 — Data-viz & illustration (1 day)**
`Donut/Gauge/BarChart/LineChart/StatTile`; one `Iso*` scene; `EngravedFigure`/`PixelBackdrop` wrappers. *Gate: charts match §7.4.*

**Phase 3 — Nav + Hero + Footer (1–1.5 days)**
Mega-menu, mobile menu, announcement bar; Hero with capability panel; footer with wordmark. *Gate: responsive 320→1440, CLS 0.*

**Phase 4 — Content sections (2 days)**
Trust band, Philosophy, Practices (data-driven), Capabilities, Ownership, Lifecycle, Case study, Final CTA, FAQ. Wire `/content`.

**Phase 5 — Motion, forms, polish (1 day)**
Scroll reveals, `/start` server action + Resend, focus states, empty/hover states.

**Phase 6 — QA & launch (1 day)**
Lighthouse, axe a11y, cross-device, `lint:copy`, OG/SEO/JSON-LD, analytics, production deploy + domain.

**Estimated ~7–8 focused days.**

---

## 13. Definition of done

- [ ] Every section renders from `/content` data; no hardcoded copy in JSX.
- [ ] Only design tokens used — zero raw hex in components.
- [ ] Hero, headings, and CTAs use the exact positioning lines from `brandpositioning.md`.
- [ ] Blueprint frame present (and simplified on mobile).
- [ ] All three illustration registers used correctly; pixel-art only behind cards; engraved never colorized.
- [ ] `lint:copy` passes (no banned words); brand §12 checklist signed off.
- [ ] Lighthouse ≥95, CLS 0, first-load JS < 120KB.
- [ ] Full a11y pass; keyboard + reduced-motion verified.
- [ ] Responsive verified at 320/375/768/1024/1440.
- [ ] Sitemap structure reflected in nav mega-menus + footer.

---

### Appendix — PDF facts available to sections (verify before publish)
IIT Madras (3 yrs) · MedCuore (medical-grade) · 4+ yrs embedded · 50+ PCBs · ESP-IDF / nRF / STM32 · Edge Impulse / TensorFlow Lite · zero data-packet loss · phases PoC/EVT/DVT/Launch · DST-NIDHI / BIRAC BIG / MeitY / Startup India Seed · incorporation India / UAE / USA · 10–20 unit batches · IP deliverables (CAD/STEP, Gerber, firmware source, BOM, publication rights) · base: Thirumudivakkam, Chennai.
```
