# TGIE quality report (Graphite and Safety Orange pass)

Seven reports (home, services, secondary pages, start-form QA, accessibility, responsive, technical) were merged, de-duplicated and spot-checked against the code. Confirmed in code: there is no `app/not-found.tsx`; `Nav.tsx` lines 99 and 158 still carry `rgba(16,54,43,.35)`; `public/brochure.pdf` is dated Aug 27; `app/icon.svg` is `#0f3a2e` and `#2fae97`; `Button` renders a plain `<a>`; the rate limiter falls back to the key `"unknown"` before validating; `--color-muted-2` is now `#8a908f` (about 3.1:1 on cell).

Dropped or downgraded as false positives or intentional:
- Footer h5: it is already h3.
- Hero chips, trust-band type, and the "orange headline reads brown" point: kept only as a cheap token-level fix.
- "TenetForm key warning": real, kept (multi-reported).
- Raster Atlas tint: kept as a CSS-only fix.
- Dark-mode 404: real.

## Summary

| Severity | Count | Main areas |
|---|---|---|
| Critical | 0 | none |
| High | 11 | 404/error pages, stale brochure PDF, old-green icon, form borders (1.31:1), form data loss and no email fallback, services boilerplate and wrong copy, mega-menu keyboard, margin language in copy |
| Medium | 21 | focus ring, mobile menu, Link prefetch, rate limiter, SEO metadata, tiny type and tap targets, contrast, `/insights` and `/work` credibility |
| Low | 24 | spacing, copy consistency, wrapping, chart internals, minor semantics |

| Package | Area |
|---|---|
| P1 core | tokens, global CSS, primitives |
| P2 shell | nav, footer, hero shell, layout, SEO, error pages, assets |
| P3 home | home sections, shared sections, home and pillar art |
| P4 services | service pages, subs art, services content |
| P5 company | company, work, insights |
| P6 start | form and API |

## Cross-package contracts (so parallel work does not collide)
- **`lib/pageMeta.ts` (P2 creates).** `pageMeta({ title, description, path }): Metadata`. It returns `title`, `description`, `alternates.canonical`, and `openGraph` and `twitter` blocks with `url` and the shared `/opengraph-image` image. P3 to P6 call it from their page `metadata` / `generateMetadata`.
- **`--color-field: #868c8b` (P1).** Used as `border-field`. P6 uses it for form borders.
- **`Faq` props (P3).** Optional `eyebrow` and `heading: {line1, line2}`, defaults unchanged. P5 passes them on `/insights`.
- **`FinalCTA` props (P3).** Optional `heading`, `accent`, `sub`, `primaryLabel`, `secondaryLabel`, `secondaryHref`. The default secondary becomes a distinct action (`tel:` call link from the existing `site.contact` phone, labelled "Call us"). P4 and P5 pass the optional props only after P3 has landed them.
- **`CaseStudy` prop (P3).** `showWorkLink`, which the home page sets. It is off on `/work`.
- **Global `:focus-visible` rule (P1).** After it lands, owners of components with per-component `focus-visible:outline-accent` remove it (P1: Button, P2: Nav and Logo).
- **P3 `content/lifecycle.ts` is not touched.** P4 owns it and only adds exports.
- **Type floor.** No text under 11px. Mono uppercase informational labels are 12px, `text-[11px]` at the lowest. Each owner applies it in their own files.

## High

1. **404 is the Next default and unreadable in dark mode** (all unknown URLs; 4 critics). The page is unbranded, has no way home, and sets conflicting robots tags. Fix: add `app/not-found.tsx` (FrameBlock/Cell, TwoToneHeading "Page not found," Home and Start buttons, links to the four services, explicit ink-on-cell colours, metadata title and noindex) and `app/error.tsx` in the same style. Owner: P2.
2. **`public/brochure.pdf` is stale (green) and linked from `/insights`** (3 critics). Fix: regenerate it from `brochure.html` with headless Chrome via a new `scripts/build-brochure-pdf.mjs` plus an npm script, disallow `/brochure.html` in robots, and update the "1.5 MB" label in `content/pages.ts` to the real size. Owners: P2 (PDF and robots), P5 (label).
3. **Favicon, manifest and JSON-LD logo are the old green mark** (`app/icon.svg`, `manifest.ts`, `layout.tsx`). Fix: recolour to `#1c1f1e` and `#e2561f`, add `app/apple-icon.tsx` (ImageResponse), point the JSON-LD logo at it, and make `theme_color` consistent. Owner: P2.
4. **Form field and chip borders are 1.31:1** (`/start`, 2 critics). Fix: add the `--color-field` token and use `border-field` on idle fields, select and pillar chips. Owners: P1 (token), P6 (use).
5. **"Back to the form" wipes the user's brief** (`/start`). Fix: keep the form mounted and hide it, or restore values via state. Focus the first field on return. Owner: P6.
6. **Fallback says "send it by email" but no address is shown** (`/start`). Fix: make the copy conditional on `NEXT_PUBLIC_CONTACT_EMAIL`, falling back to "copy it and call us". Record the env requirement in `MARKET_READY.md` and `.env.example`. Owner: P6. Hard-coding an address is deferred.
7. **Mega menu is not keyboard-coherent** (all routes; 3 critics). Sub-links are unreachable, the menu never closes on blur, and there are no state semantics. Fix: close on focusout leaving nav and panel, Esc closes and returns focus to the trigger, ArrowDown on a trigger moves focus into the panel, and add `aria-controls` only while mounted. Owner: P2.
8. **Services summary band is boilerplate and wrong for non-hardware subs** (20 pages). "Zero lock-in: files, source, BOM" appears on Incorporation and Audit. Fix: add optional `scopeNote` and `ownershipNote` to the sub data, with generic text only for hardware subs, and drop the "4 deliverables" count. Owner: P4.
9. **Lifecycle strip shows hardware phase blurbs for Enablement and Fabrication subs.** Fix: for those pillars show phase names and active bars only, with no hardware paragraph. Keep the per-sub note. Owner: P4.
10. **Internal margin language is published** ("highest-margin line in the portfolio", "full production margin", "niche"), and it doubles as meta descriptions (2 critics). Fix: rewrite from the buyer's benefit. Owners: P4 (`practiceDetail.ts`), P3 (`practices.ts`, the "High-margin Amazon / D2C runs" line).
11. **Hero eyebrow pill stretches to full column width** (home and every service page; 3 critics). Fix: `self-start` by default on `Eyebrow`. Owner: P1.

## Medium

12. **No global `:focus-visible`; the accent ring is 2.9:1 on paper and inconsistent.** Fix: one global rule using `accent-deep` with a 2px offset (`accent-soft` variant on graphite). Owner: P1, then P2 and P6 drop their per-component overrides.
13. **Mobile menu has no scrim, scroll lock, outside-tap or route-change close, or focus move.** Also the green shadow remnant at lines 99 and 158 (3 critics). Fix: add a scrim and close on tap or route change, lock scroll, focus the first link, use `rgba(18,20,19,.35)` for the shadow, and use `text-muted` instead of `text-ink-2/70` for taglines. Owner: P2.
14. **No current-page cue or banner landmark.** Fix: wrap the bar in `<header>`, add `aria-current="page"` from `usePathname` to Nav links, and add `aria-current` plus an `aria-hidden` separator in breadcrumbs. Owner: P2 (Nav, PageHero).
15. **`Button` is a plain `<a>`, so every CTA click is a full reload.** Fix: render `next/link` for `/` hrefs, and keep `<a>` for `#` and external hrefs. Also the ghost border moves to `border-ink-2/40`, and Button's `focus-visible:outline-accent` is dropped. Owner: P1.
16. **Rate limiter shares an `"unknown"` bucket, is spoofable, counts invalid and 503 requests, and lacks Retry-After.** Fix: take the IP from a trusted header (`x-real-ip`, then the last XFF hop), skip limiting when none is available, count only validated requests, and add Retry-After. Owner: P6.
17. **Form focus is lost on Send and on server 400/429.** Fix: use `aria-disabled` rather than `disabled`, focus the first invalid field on a 400, and keep focus on the button after a 429. Owner: P6.
18. **iOS zoom on focus (14px inputs) and truncating `maxLength`.** Fix: `text-[16px] sm:text-[14px]`, give the select `min-h-[44px]`, drop the textarea `maxLength` in favour of a visible "n / 4000" counter and validation, and use `placeholder:text-muted`. Owner: P6.
19. **Per-page SEO: no canonical or og:url, and inner pages share the home OG/Twitter tags.** Sub pages also lose og:image. Fix: use `pageMeta()` everywhere. Owners: P2 (helper, layout), P3 to P6 (call it). Also lengthen the short descriptions to 110 to 155 characters.
20. **The `SITE_URL` placeholder ships silently and sitemap `lastmod` is always now.** Fix: `console.error` in production and noindex when the placeholder is in use, use a fixed per-page `lastModified`, and drop `Host:` from robots. Owner: P2.
21. **Tiny type is everywhere** (about 30 to 70 nodes under 12px per page, 5 to 8px SVG text).
    - HTML labels: raise to 11 to 12px in each owner's files (Hero, TrustBand, Audiences, Lifecycle, Practices in P3; services pages in P4; `/work` pillar dots, now 18px with 10px letters, in P5; footer, nav and PageHero in P2).
    - Illustrations: enlarge the key labels in `CapDataviz`, `CapFirmware`, `CapEdgeAI`, `HeroScene` and `pillars/shared.tsx` (P3), and in `CaseGait` (P3, `/work` plate), or hide secondary labels below `sm`. Remove the axis ticks and sub-captions from the telemetry mock. Hide secondary hero pins below 1100px.
22. **"Not a focus here" is 2.3 to 3.1:1.** Fix: use `text-muted`. Owner: P4. The breadcrumb separator becomes `aria-hidden` (P2).
23. **Small tap targets** (breadcrumbs 17px, "Explore X" 21px, phone links 22 to 27px). Fix: `min-h-[44px]` or padding with a negative margin, so layout is unchanged. Owners: P2 (breadcrumb, footer), P3 (Explore links become a ghost sm Button), P6 (the `/start` phone link).
24. **Services sub-pages are thin and the Fabrication page repeats facts five times.** Fix for subs: merge the "What's included" heading into the grid, drop the redundant check badge, and add a compact inline "Scope this with us" CTA. Fix for Fabrication: trim the gap body to one sentence, drop the process badge, and keep numbers only in the stats row. Owner: P4.
25. **Heading line-breaks split hyphenated compounds** ("E-/Commerce", "On-/Device"). Fix: `text-wrap: balance` in `TwoToneHeading` (P1) and U+2011 in titles (P4).
26. **FinalCTA is research-centric, with two buttons to the same URL** (all pages). Fix: add the optional props, distinct secondary action (see contracts), and `text-pretty` on the sub paragraph. Pass per-page copy: Fabrication, "Send us the drawing"; `/work`, "Bring the drawing. We'll carry the weight." Owners: P3 (component), P4, P5.
27. **`/insights` is thin and mislabelled.**
    - Fix: relabel card 2 truthfully ("Selected case studies" linking to `/work`), mark the lifecycle card "Diagram", add a hero CTA, give the FAQ its own eyebrow and heading via props, add an H2 above the cards, and shorten the H1 to avoid the orphan.
    - Also a stale-claim fix: drop "Read the notes". Owners: P5 (page and `pages.ts`), P3 (Faq props).
28. **`/work` cards look clickable but are dead ends, and the stats strip duplicates the homepage and `/company`.** Fix: make cards `Link`s to their main pillar page with a "See the service" row, or remove the hover. Replace the stats strip with work-specific facts, or remove it. Owner: P5.
29. **`/company`.**
    - Lab section gets a TwoToneHeading h2, and its h4 items become h3.
    - Segment-matrix rows lose `tabIndex` and hover, or link to a pillar.
    - The full-bleed graphite bar loses `full` and its copy is rewritten.
    - Breadcrumb "Company" gets a `href` (and the `/work` crumb is fixed too).
    - `TrustBand` caption is retitled to match its content (P3).
    - Owners: P5, P3.
30. **Heading outline skips** (h2 to h4/h5, `/insights` h1 to h3). Fix: footer column titles under an `sr-only` h2, plus the `/company` and `/insights` items above. Owners: P2, P5.
31. **Home dead vertical space.** Fix: `.section-y` becomes `clamp(56px,7vw,96px)` (P1), and header-only cells in Practices, Audiences and Capabilities get `py-14` to `py-20` (P3).
32. **React key warning in `TenetForm`.** Fix: wrap mapped items in `<g key={a}>`. Owner: P3.
33. **Sub-nav and pillar breadcrumbs inconsistent** (Home crumb missing on pillars, long last crumb wraps). Fix: add Home to pillar crumbs and truncate the last crumb. Owners: P4 (pages), P2 (truncate and `aria-current`).
34. **Engraved Atlas keeps a cream tint.** Fix: `grayscale` plus `mix-blend-multiply` on the image in Philosophy. Owner: P3.
35. **Footer is very tall on phones.** Fix: Capabilities and Company in two columns below md, with the duplicate CTA hidden below md. Owner: P2.
36. **Unused stock images (about 820 KB) are served immutable.** Fix: delete the unused `public/pillars/*.jpg` (keep `fabrication.jpg`) and `public/hero/fabrication-robotics.jpg`, then trim the `next.config.ts` header sources. Owner: P2.
37. **Claims and copy that read as placeholders.** Fix: remove "no regional competitor currently replicates" from `faq.ts` and `pages.ts`, and rename "medical-grade" in the TrustBand caption (retitle to "Stack we ship on"). Owners: P3, P5.

## Low (cheap and safe, included)
- **Home (P3):**
  - accent-coloured large `accentLine2` (P1) plus the Philosophy span;
  - FAQ canvas strip (last cell `flex-1`);
  - Lifecycle objective boxes aligned with `mt-auto`;
  - pillar naming harmonised (Engineering, Products, Enablement, Fabrication; "business" becomes "enablement" in the H2);
  - Philosophy H2 moved onto TwoToneHeading;
  - `text-balance` on pillar titles and descriptions;
  - Pillar B title and description no longer repeat each other;
  - FAQ rendered before the Final CTA, and eyebrow renamed;
  - hero chips on all three clauses or a text highlight;
  - nowrap on "lock-in" in the hero stat caption;
  - 3+2 trust-grid fix at 768;
  - pillar scenes inset 24px from the seams;
  - CaseStudy gets a "/work" link on the home page only.
- **Nav (P2):** align logo and CTA to the cell gutter.
- **Services (P4):**
  - prev/next hidden at the ends, with destination in the link text;
  - hero-row min-height on PageHero for stability (P2 owns the file);
  - Fabrication categories and sectors get H3 headings and shortened sector labels;
  - tighter hero leads and splice-period fixes in `practiceDetail.ts` and `fabrication.ts`;
  - accent chips in `kit.tsx` and subs use `accent-deep` fill;
  - cart badge `#3` and the "9001" seal fixed in `products.tsx` and `fabrication.tsx`.
- **Pillars (P3):**
  - fix the swatch comment ("Teal-family") and make translucent chips visible;
  - Form/Weight copy in `practices.ts` rewritten without "form"/"form".
- **Charts (P1):** `useId` gradient ids, tokens instead of hex greys, Gauge arc driven by the value prop, and removal of unused charts if confirmed unused. `CapDataviz` `%` uses `accent-deep` (P3).
- **Start (P6):**
  - required markers;
  - `role=alert` on field errors, plus a bordered or iconised send error;
  - phone error wording;
  - collapse whitespace in name and `roleOther`;
  - rename the honeypot and require a numeric `elapsed`;
  - drop `role=alert` from the fallback container.
- **Footer (P2):** `aria-hidden` on the wordmark.
- **`/work` (P5):** ConceptFlow legend neutralised; Insights cover tones unified.

## Deferred
See the `deferred` list in the structured output.