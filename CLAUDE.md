# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**artistudiodesign.com** — Arti Studio, an Oradea-based custom-furniture studio. The site is a modern re-creation of an older WordPress/jQuery build, executed as a static-prerendered TanStack Start app on GitHub Pages.

## Repository

- **Stack**: TanStack Start (React 19) + Tailwind CSS v4 (`@theme` CSS-first) + TypeScript + Vite
- **Dev**: `npm run dev` (port 3000) · `npm run build` · `npm run preview`
- **Hosting**: GitHub Pages (static prerendering)
- **Build output**: `dist/client/` — all prerendered HTML + JS + CSS

## Languages

Default locale is `ro`. The site keeps 14 locale modules (`ro, en, de, fr, el, uk, es, tr, et, cs, nl, sv, it, da`). Romanian is canonical; English is fully translated; the other 12 mirror the Romanian content with a `TODO: translate` comment until human translation is provided. The `Translation` type derives from `typeof ro`.

## Routes

All routes live under `$locale.<segment>.tsx`. Romanian slugs are canonical:

- `/` — root redirect to `/ro`
- `/$locale` — Acasă
- `/$locale/despre` — Despre noi
- `/$locale/servicii` — Servicii
- `/$locale/portofoliu` + `/$locale/portofoliu/$category` — Portofoliu (categories: `bucatarie`, `living`, `dormitor`, `dressing`, `baie`)
- `/$locale/materiale` — Materiale
- `/$locale/produse` (layout) + `/$locale/produse/categorie/$slug` (filtered) + `/$locale/produse/$slug` (PDP) — Produse catalog
- `/$locale/ghid` — Ghid de utilizare
- `/$locale/contact` — Contact (`?produs=<slug>` prefill)
- `/$locale/confidentialitate` — Politica de confidențialitate
- `/404`

The products section is catalog-only — **no shopping cart**. The "Solicită ofertă" CTA on every product links to `/$locale/contact?produs=<slug>` so the inquiry arrives prefilled.

## Design

**Warm-dark editorial luxury + warm-cream light counterpart.** Both themes share a warm gold accent. Theme toggle is preserved.

- Tokens live in `src/styles.css` `@theme { ... }` plus `html.light { ... }` overrides
- Dark: warm near-black `oklch(0.18 0.012 60)` background, warm ivory text
- Light: warm cream `oklch(0.97 0.013 85)` background, warm ink text
- Accent (gold): dark mode `oklch(0.78 0.085 75)`, light mode `oklch(0.58 0.110 70)` (darker for AA contrast)
- Fonts: **Cormorant Garamond** display (only ≥24px) + **Inter** body / UI. Loaded via Google Fonts in `__root.tsx`.
- Hairline borders (1px) instead of brutalist 3px; rectangular geometry, minimal radius
- Signature: gold-period `.` accent in serif headings via `<GoldPeriod text="Design. Calitate. Funcționalitate." />`
- Photographic dominance on hero + portfolio; product images use `<ProductPlaceholder />` (procedural SVG) until real photos arrive

## Content

Static content lives in `src/content/`:

- `images.ts` — central image registry with bilingual alt text. Originals copied from the legacy site live under `/public/images/legacy/`.
- `portfolio.ts` — typed `PortfolioProject[]` with bilingual title/caption/tags, indexed by category.
- `products.ts` — typed `Product[]` with bilingual name/short/long descriptions, price in lei, category slug.

All product / portfolio / category slugs are exported as `as const` tuples from `src/i18n/config.ts`, so the prerender list in `vite.config.ts` and the SEO helpers can enumerate them.

## Forms

Contact and quote-request forms are rendered with `<TallyEmbed />` (iframe-based, free tier). Set `TALLY_FORM_ID` in `src/lib/site.ts`. While unset, the component renders a graceful fallback with a `mailto:info@artistudiodesign.com` link instead of a broken iframe.

## Brand contact data (canonical)

- Address: Oradea, Bihor, România
- Phones: +40 775 140 079 · +40 744 299 302
- Emails: info@artistudiodesign.com · contact@artistudiodesign.com
- Hours: Lun–Vin, 09:00–18:00
- Social: Facebook · Instagram · YouTube

## Anti-references (must NOT resemble)

- Generic Shopify or WooCommerce shop chrome (boxy cards, neon-on-white sales banners)
- Brutalist tech-consulting palettes (cyber orange on near-black) — that was the previous baseline; the brand has shifted
- Dual-theme toggles that just invert colors — the light theme here is hand-tuned, not an automatic inverse
- Awwwards-bait parallax / scroll-jacking — motion must be earned and reduced-motion respected
- Stock photos of generic kitchens — only photography from the studio's own portfolio belongs on the site

## Design Principles

1. **Editorial restraint** — Serif display + generous whitespace + photographic dominance. Decoration is earned.
2. **Warm and human** — Warm-dark + gold, not cyber-dark + neon. The brand reads "atelier", not "tech".
3. **Single accent** — Gold is the only chromatic move. Everything else is warm-neutral.
4. **Photography first** — Real images of real work. Procedural placeholders only for products awaiting photos.
5. **Accessibility by conviction** — WCAG AA contrast minimum, focus-visible rings, respect `prefers-reduced-motion`, full keyboard navigation.
