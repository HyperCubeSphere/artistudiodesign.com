<div align="center">
  <img src="https://gist.githubusercontent.com/0-vortex/3acb60674856c437c86bee683d96515b/raw/fab74e1934e5a8686a3190f4d53606bb11da4d96/logo.png" width="400">

# @HyperCubeSphere/artistudiodesign.com

> Modern re-creation of [artistudiodesign.com](https://www.artistudiodesign.com/) — Oradea-based custom-furniture studio. Static-prerendered TanStack Start app deployed to GitHub Pages.

</div>

## Stack

- **TanStack Start** (React 19.2) — file-based routing, static prerender
- **Tailwind CSS v4** — CSS-first `@theme` design tokens (OKLCH)
- **TypeScript 5.9** + **Vite**
- **i18n** — 14 locales (`ro` canonical, `en` translated, 12 stubbed for future translation)

No jQuery, no runtime server, no backend. Forms post to **Tally**.

## Commands

```bash
npm ci         # node ≥ 24, npm ≥ 11
npm run dev         # → http://localhost:3000  (default locale: /ro)
npm run build       # → dist/client (prerendered HTML + sitemap.xml)
npm run preview     # serve the build locally
```

## Routes

Romanian slugs are canonical (the `/$locale` prefix applies to all):

| Path | Page |
| --- | --- |
| `/` | redirect to `/ro` |
| `/$locale` | Acasă (home) |
| `/$locale/despre` | Despre noi |
| `/$locale/servicii` | Servicii |
| `/$locale/portofoliu` + `/portofoliu/$category` | Portofoliu (5 categories) |
| `/$locale/materiale` | Materiale |
| `/$locale/produse` + `/produse/categorie/$slug` + `/produse/$slug` | Produse catalog (5 products, no cart) |
| `/$locale/ghid` | Ghid de utilizare |
| `/$locale/contact` | Contact (`?produs=<slug>` prefill) |
| `/$locale/confidentialitate` | Politica de confidențialitate |
| `/404` | Not found |

The `Produse` section is **catalog-only** — no shopping cart. Each product's `Solicită ofertă` button links to `/contact?produs=<slug>`, prefilling the quote form with that product.

## Project layout

```
src/
  components/         # Logo, Navbar, Footer, HeroPhoto, PortfolioGrid, ProductCard …
  content/
    images.ts         # bilingual image registry
    portfolio.ts      # PortfolioProject[] (5 categories)
    products.ts       # Product[] (5 items, bilingual fields)
  i18n/
    config.ts         # locale list, default = 'ro', portfolio/product slug tuples
    index.ts          # useI18n() with React 19 use()
    locales/{ro,en,…}.ts
  lib/
    seo.ts            # hreflang map + JSON-LD helper
    site.ts           # TALLY_FORM_ID + contact constants
  routes/             # TanStack file-based routes
  styles.css          # Tailwind v4 @theme + light-mode overrides

public/
  images/legacy/      # photos crawled from the live site (placeholders)
  llms.txt · robots.txt
```

## Configuration

### Tally form

Replace the placeholder in `src/lib/site.ts`:

```ts
export const TALLY_FORM_ID = 'REPLACE_ME'  // → your tally.so form id
```

The id lives in the Tally form URL: `https://tally.so/forms/<FORM_ID>`. While unset, the form falls back to a `mailto:info@artistudiodesign.com` link instead of breaking.

### Photography

Real product / portfolio photos drop into:

- `public/images/legacy/hero/`            — homepage hero
- `public/images/legacy/bucatarie/`       — kitchen portfolio (and current hero source)
- `public/images/legacy/living/`
- `public/images/legacy/dormitor/`
- `public/images/legacy/dressing/`
- `public/images/legacy/baie/`
- `public/images/products/`               — product shots (currently procedural SVG placeholders)

Image references + bilingual alt text are registered in `src/content/images.ts`. The `.photo-moody` and `.photo-moody-soft` CSS filters pull bright source photos toward the warm-dark editorial mood; remove or weaken those classes in `src/styles.css` once you have purpose-shot photography.

### Brand colours

Tokens live in `src/styles.css` under `@theme { … }` (dark defaults) and `html.light { … }` (light overrides). Brand gold is `oklch(0.80 0.115 85)` (~ `#d8b25a`) in dark mode, deeper bronze `oklch(0.62 0.115 78)` in light mode.

## Design

Warm-dark editorial luxury + warm-cream light counterpart. Cormorant Garamond display + Inter body/UI. Hairline 1px borders, gold-period accent in serif headings via `<GoldPeriod text="Design. Calitate. Funcționalitate." />`. See `CLAUDE.md` for the full design brief.

## Deployment

`npm run build` outputs everything to `dist/client/`:

- 324 prerendered HTML pages (14 locales × full route tree)
- `sitemap.xml` (hreflang-aware, includes portfolio + product subroutes)
- `assets/` chunked JS + CSS
- `images/` + `llms.txt` + `robots.txt`

Push `dist/client/` to GitHub Pages (via the existing GitHub Actions workflow on push to `main`).
