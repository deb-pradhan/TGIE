# TGIE: market-readiness checklist

Audit of the site as of 2026-10-13 and what the visual/performance pass addresses.

## A. Brand & identity
- [x] Logo is a letter "T" in a green square: replace with a distinctive TGIE mark + wordmark lockup (header, footer, favicon, OG image).
- [x] Default Next favicon, no `icon`/`apple-icon`/OG image/manifest: add a branded set.
- [x] One custom icon family (24px line, 1.7 stroke) replaces the ad-hoc inline paths.
- [x] Trust band shows plain text boxes ("FreeRTOS", "BLE/GATT") rather than marks: give each a small custom glyph/mark.

## B. Visuals & illustration (the "more graphical" ask)
- [x] Home: pillar rows use unrelated stock photos (e.g. a Pentium CPU for Edge AI, a clipboard photo for Enablement). Replace with custom isometric scenes per pillar.
- [x] Home: Capabilities cards use stock photos where bespoke charts/diagrams belong.
- [x] Lifecycle, Ownership, Audiences, CaseStudy, FinalCTA, FAQ are text-only: add custom diagrams and illustrations.
- [x] Company, Insights, Work, Start pages are text-only: add hero art and section illustrations.
- [x] 21 service sub-pages have no imagery: one custom illustration each.
- [x] Service pillar pages: add a hero illustration per pillar.

## C. Functionality / content
- [x] "Start a Project" buttons point at `#contact`, which only exists on the home page: route to `/start`.
- [x] `/start` form has no backend (`TODO: wire to a server action`): add an API route with validation, spam honeypot, and a mailto fallback.
- [x] Footer social links are `href="#"`.
- [x] Insights resources have CTAs ("Request the PDF") with no destination: point at `/brochure.pdf` or `/start`.
- [x] `metadataBase` is a placeholder (`tgie.example`): drive from `NEXT_PUBLIC_SITE_URL`.
- [x] No `sitemap.xml`, `robots.txt`, per-page metadata/OG, or JSON-LD (Organization/LocalBusiness).

## D. Performance
- [x] `Reveal` renders `opacity:0` on the server: content is invisible without JS and delays LCP. Make it progressive.
- [x] `motion` (framer-motion) shipped for a fade-in: replace with CSS + IntersectionObserver if it is the only use.
- [x] Hero autoplays a 2.4 MB MP4 on every device: lazy/poster-first, skip on mobile/reduced-motion/data-saver.
- [x] 356 KB PNG illustration: enable AVIF/WebP, correct `sizes`, priority only on the LCP image.
- [x] Unused boilerplate SVGs in `/public` (next, vercel, file, globe, window).
- [x] Add cache headers for static assets, `poweredByHeader: false`.

## E. Quality
- [x] Responsive check at 375 / 768 / 1024 / 1440 on every route.
- [x] Accessibility: contrast of `--color-muted` body text, focus states, decorative art `aria-hidden`.
- [x] `pnpm lint` and `pnpm build` clean.

## Status (2026-10-13): done, with owner actions

Done: everything above. Custom inline-SVG illustration set (hero, 4 pillar scenes, 21 sub-service scenes, home sections, company, insights, work, start), icon family (69 glyphs), logo, favicon/OG/manifest/sitemap/robots/JSON-LD, progressive `Reveal`, hero video removed, `motion` dependency removed.

Still needs the owner:
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real domain (falls back to the placeholder `https://tgie.example`).
- [ ] Set `RESEND_API_KEY` + `ENQUIRY_TO_EMAIL` (+ `ENQUIRY_FROM_EMAIL` on a verified domain) so `/start` delivers mail; see `.env.example`.
- [ ] Provide a real contact email (`NEXT_PUBLIC_CONTACT_EMAIL`) and social URLs; none exist in the repo.
- [ ] Privacy / Terms / IP Transparency pages are plain text in the footer; write and link them.
- [ ] Replace the one remaining stock photo (fabrication page, welding) with real shop photography when available.
- [ ] `/illustration`, `/pillars`, `/hero` are served `immutable` for a year and are not content-hashed: give a replaced image a new filename.
