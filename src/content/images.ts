/**
 * Image registry — central index of static assets under `/public/images/`.
 * Photography lives under `/portfolio/<category>/` and `/hero/`; the brand
 * crest lives under `/brand/`. Bilingual alt text lives here so it's
 * reusable across routes + locales.
 *
 * Filenames follow `<category>-<orientation>-<n>.jpeg` for SEO + so the
 * URL itself describes the asset (Google ranks asset filenames as a weak
 * but non-zero signal, on top of the alt text).
 *
 * Each portfolio entry MAY carry a `full` path pointing at the original
 * resolution under `<category>/full/`. When present, the gallery wraps the
 * thumbnail in an `<a target="_blank">` so visitors open the full-res
 * shot in a new tab. Entries without `full` render as a plain `<img>`.
 */

import type { Locale, PortfolioCategorySlug } from '../i18n/config'

export interface ImageRef {
  src: string
  alt: Record<'ro' | 'en', string>
  width?: number
  height?: number
  /** Path to the original-resolution image; opened in a new tab on click. */
  full?: string
}

export function pickAlt(img: ImageRef, locale: string): string {
  if (locale === 'ro' || locale === 'en') return img.alt[locale]
  return img.alt.ro
}

export const heroImages: ImageRef[] = [
  { src: '/images/hero/hero-bucatarie-landscape-1.jpeg', alt: { ro: 'Bucătărie pe comandă realizată de Arti Studio în Oradea', en: 'Custom kitchen built by Arti Studio in Oradea' } },
]

export const homeHero: ImageRef = heroImages[0]

/* ─── Alt-text pools for the extended gallery ───────────────────────── */

const BUCATARIE_ALTS = [
  { ro: 'Bucătărie modernă pe comandă — Arti Studio Oradea', en: 'Modern custom kitchen — Arti Studio Oradea' },
  { ro: 'Bucătărie cu fronturi laminate — Arti Studio Oradea', en: 'Kitchen with laminate fronts — Arti Studio Oradea' },
  { ro: 'Bucătărie cu insulă și blat amplu — Arti Studio Oradea', en: 'Kitchen with island and generous worktop — Arti Studio Oradea' },
  { ro: 'Bucătărie cu zona de gătit integrată — Arti Studio Oradea', en: 'Kitchen with integrated cooking zone — Arti Studio Oradea' },
  { ro: 'Bucătărie cu finisaje calde — Arti Studio Oradea', en: 'Kitchen with warm finishes — Arti Studio Oradea' },
] as const

const LIVING_ALTS = [
  { ro: 'Living cu mobilier de zi pe comandă — Arti Studio Oradea', en: 'Custom living room cabinetry — Arti Studio Oradea' },
  { ro: 'Living cu spațiu de depozitare elegant — Arti Studio Oradea', en: 'Living room with elegant storage — Arti Studio Oradea' },
  { ro: 'Living cu zona TV pe comandă — Arti Studio Oradea', en: 'Living room with custom TV unit — Arti Studio Oradea' },
  { ro: 'Living cu mobilier minimalist — Arti Studio Oradea', en: 'Living room with minimalist cabinetry — Arti Studio Oradea' },
] as const

const DORMITOR_ALTS = [
  { ro: 'Dormitor cu mobilier pe comandă — Arti Studio Oradea', en: 'Custom bedroom cabinetry — Arti Studio Oradea' },
  { ro: 'Dormitor cu noptiere integrate — Arti Studio Oradea', en: 'Bedroom with integrated nightstands — Arti Studio Oradea' },
  { ro: 'Dormitor cu depozitare ergonomică — Arti Studio Oradea', en: 'Bedroom with ergonomic storage — Arti Studio Oradea' },
  { ro: 'Dormitor cu finisaje calme — Arti Studio Oradea', en: 'Bedroom with calm finishes — Arti Studio Oradea' },
] as const

const DRESSING_ALTS = [
  { ro: 'Dressing walk-in cu compartimentări — Arti Studio Oradea', en: 'Walk-in dressing with compartments — Arti Studio Oradea' },
  { ro: 'Dressing cu iluminare ambientală — Arti Studio Oradea', en: 'Dressing with ambient lighting — Arti Studio Oradea' },
  { ro: 'Dressing cu accesorii integrate — Arti Studio Oradea', en: 'Dressing with integrated accessories — Arti Studio Oradea' },
  { ro: 'Dressing cu organizare verticală — Arti Studio Oradea', en: 'Dressing with vertical organisation — Arti Studio Oradea' },
] as const

const BAIE_ALTS = [
  { ro: 'Mobilier de baie cu blat din piatră — Arti Studio Oradea', en: 'Bathroom cabinetry with stone top — Arti Studio Oradea' },
  { ro: 'Mobilier de baie cu finisaje rezistente la umiditate — Arti Studio Oradea', en: 'Bathroom cabinetry with moisture-resistant finishes — Arti Studio Oradea' },
  { ro: 'Mobilier de baie cu depozitare integrată — Arti Studio Oradea', en: 'Bathroom cabinetry with integrated storage — Arti Studio Oradea' },
] as const

/**
 * Build a portfolio entry. `src` is the screen-size thumbnail; `full` mirrors
 * it under `<category>/full/`. The pool index cycles per-category alt copy.
 */
function entry(
  category: PortfolioCategorySlug,
  name: string,
  width: number,
  height: number,
  alt: { readonly ro: string; readonly en: string },
): ImageRef {
  return {
    src: `/images/portfolio/${category}/${name}`,
    full: `/images/portfolio/${category}/full/${name}`,
    width,
    height,
    alt: { ro: alt.ro, en: alt.en },
  }
}

export const portfolioImages: Record<PortfolioCategorySlug, ImageRef[]> = {
  bucatarie: [
    entry('bucatarie', 'bucatarie-landscape-1.jpeg', 800, 600, { ro: 'Bucătărie modernă cu insulă — Arti Studio Oradea', en: 'Modern kitchen with island — Arti Studio Oradea' }),
    entry('bucatarie', 'bucatarie-landscape-2.jpeg', 800, 600, { ro: 'Bucătărie cu blat din piatră — Arti Studio Oradea', en: 'Kitchen with stone worktop — Arti Studio Oradea' }),
    entry('bucatarie', 'bucatarie-landscape-3.jpeg', 800, 600, { ro: 'Bucătărie cu fronturi mate — Arti Studio Oradea', en: 'Kitchen with matte fronts — Arti Studio Oradea' }),
    entry('bucatarie', 'bucatarie-landscape-4.jpeg', 800, 600, { ro: 'Bucătărie cu iluminat integrat — Arti Studio Oradea', en: 'Kitchen with integrated lighting — Arti Studio Oradea' }),
    entry('bucatarie', 'bucatarie-landscape-5.jpeg', 800, 600, BUCATARIE_ALTS[0]),
    entry('bucatarie', 'bucatarie-portrait-1.jpeg', 600, 800, BUCATARIE_ALTS[1]),
    entry('bucatarie', 'bucatarie-portrait-2.jpeg', 600, 800, BUCATARIE_ALTS[2]),
    entry('bucatarie', 'bucatarie-portrait-3.jpeg', 600, 800, BUCATARIE_ALTS[3]),
    entry('bucatarie', 'bucatarie-portrait-4.jpeg', 504, 800, BUCATARIE_ALTS[4]),
    entry('bucatarie', 'bucatarie-landscape-6.jpeg', 800, 600, BUCATARIE_ALTS[0]),
    entry('bucatarie', 'bucatarie-landscape-7.jpeg', 800, 600, BUCATARIE_ALTS[1]),
    entry('bucatarie', 'bucatarie-landscape-8.jpeg', 800, 600, BUCATARIE_ALTS[2]),
    entry('bucatarie', 'bucatarie-portrait-5.jpeg', 600, 800, BUCATARIE_ALTS[3]),
    entry('bucatarie', 'bucatarie-landscape-9.jpeg', 800, 600, BUCATARIE_ALTS[4]),
    entry('bucatarie', 'bucatarie-landscape-10.jpeg', 800, 600, BUCATARIE_ALTS[0]),
    entry('bucatarie', 'bucatarie-portrait-6.jpeg', 600, 800, BUCATARIE_ALTS[1]),
    entry('bucatarie', 'bucatarie-landscape-11.jpeg', 800, 600, BUCATARIE_ALTS[2]),
    entry('bucatarie', 'bucatarie-landscape-12.jpeg', 800, 600, BUCATARIE_ALTS[3]),
    entry('bucatarie', 'bucatarie-landscape-13.jpeg', 800, 533, BUCATARIE_ALTS[4]),
    entry('bucatarie', 'bucatarie-landscape-14.jpeg', 800, 533, BUCATARIE_ALTS[0]),
    entry('bucatarie', 'bucatarie-landscape-15.jpeg', 800, 800, BUCATARIE_ALTS[1]),
    entry('bucatarie', 'bucatarie-landscape-16.jpeg', 800, 800, BUCATARIE_ALTS[2]),
    entry('bucatarie', 'bucatarie-portrait-7.jpeg', 600, 800, BUCATARIE_ALTS[3]),
    entry('bucatarie', 'bucatarie-portrait-8.jpeg', 600, 800, BUCATARIE_ALTS[4]),
    entry('bucatarie', 'bucatarie-portrait-9.jpeg', 600, 800, BUCATARIE_ALTS[0]),
    entry('bucatarie', 'bucatarie-portrait-10.jpeg', 600, 800, BUCATARIE_ALTS[1]),
    entry('bucatarie', 'bucatarie-portrait-11.jpeg', 600, 800, BUCATARIE_ALTS[2]),
    entry('bucatarie', 'bucatarie-portrait-12.jpeg', 600, 800, BUCATARIE_ALTS[3]),
    entry('bucatarie', 'bucatarie-portrait-13.jpeg', 600, 800, BUCATARIE_ALTS[4]),
    entry('bucatarie', 'bucatarie-portrait-14.jpeg', 600, 800, BUCATARIE_ALTS[0]),
    entry('bucatarie', 'bucatarie-portrait-15.jpeg', 600, 800, BUCATARIE_ALTS[1]),
  ],
  living: [
    entry('living', 'living-landscape-1.jpeg', 800, 600, { ro: 'Living cu bibliotecă pe perete — Arti Studio Oradea', en: 'Living room with wall library — Arti Studio Oradea' }),
    entry('living', 'living-landscape-2.jpeg', 800, 600, { ro: 'Living cu zonă TV integrată — Arti Studio Oradea', en: 'Living room with integrated TV unit — Arti Studio Oradea' }),
    entry('living', 'living-landscape-3.jpeg', 800, 600, { ro: 'Living elegant — Arti Studio Oradea', en: 'Elegant living room — Arti Studio Oradea' }),
    entry('living', 'living-portrait-1.jpeg', 600, 800, LIVING_ALTS[0]),
    entry('living', 'living-portrait-2.jpeg', 533, 800, LIVING_ALTS[1]),
    entry('living', 'living-portrait-3.jpeg', 600, 800, LIVING_ALTS[2]),
    entry('living', 'living-portrait-4.jpeg', 600, 800, LIVING_ALTS[3]),
    entry('living', 'living-landscape-4.jpeg', 800, 533, LIVING_ALTS[0]),
    entry('living', 'living-landscape-5.jpeg', 800, 533, LIVING_ALTS[1]),
    entry('living', 'living-portrait-5.jpeg', 602, 800, LIVING_ALTS[2]),
  ],
  dormitor: [
    entry('dormitor', 'dormitor-landscape-1.jpeg', 800, 600, { ro: 'Dormitor matrimonial cu tăblie tapițată — Arti Studio Oradea', en: 'Master bedroom with upholstered headboard — Arti Studio Oradea' }),
    entry('dormitor', 'dormitor-landscape-2.jpeg', 800, 600, { ro: 'Dormitor cu depozitare integrată — Arti Studio Oradea', en: 'Bedroom with integrated storage — Arti Studio Oradea' }),
    entry('dormitor', 'dormitor-landscape-3.jpeg', 800, 600, DORMITOR_ALTS[0]),
    entry('dormitor', 'dormitor-portrait-1.jpeg', 600, 800, DORMITOR_ALTS[1]),
    entry('dormitor', 'dormitor-landscape-4.jpeg', 800, 600, DORMITOR_ALTS[2]),
    entry('dormitor', 'dormitor-portrait-2.jpeg', 450, 800, DORMITOR_ALTS[3]),
    entry('dormitor', 'dormitor-portrait-3.jpeg', 600, 800, DORMITOR_ALTS[0]),
    entry('dormitor', 'dormitor-portrait-4.jpeg', 600, 800, DORMITOR_ALTS[1]),
    entry('dormitor', 'dormitor-portrait-5.jpeg', 600, 800, DORMITOR_ALTS[2]),
    entry('dormitor', 'dormitor-portrait-6.jpeg', 600, 800, DORMITOR_ALTS[3]),
  ],
  dressing: [
    entry('dressing', 'dressing-landscape-1.jpeg', 800, 600, { ro: 'Dressing walk-in optimizat — Arti Studio Oradea', en: 'Optimised walk-in dressing — Arti Studio Oradea' }),
    entry('dressing', 'dressing-landscape-2.jpeg', 800, 600, { ro: 'Dressing cu iluminat LED — Arti Studio Oradea', en: 'Dressing with LED lighting — Arti Studio Oradea' }),
    entry('dressing', 'dressing-landscape-3.jpeg', 800, 600, { ro: 'Dressing cu fronturi lucioase — Arti Studio Oradea', en: 'Dressing with glossy fronts — Arti Studio Oradea' }),
    entry('dressing', 'dressing-portrait-1.jpeg', 600, 800, DRESSING_ALTS[0]),
    entry('dressing', 'dressing-portrait-2.jpeg', 404, 800, DRESSING_ALTS[1]),
    entry('dressing', 'dressing-portrait-3.jpeg', 587, 800, DRESSING_ALTS[2]),
    entry('dressing', 'dressing-portrait-4.jpeg', 628, 800, DRESSING_ALTS[3]),
    entry('dressing', 'dressing-landscape-4.jpeg', 800, 600, DRESSING_ALTS[0]),
    entry('dressing', 'dressing-landscape-5.jpeg', 800, 600, DRESSING_ALTS[1]),
    entry('dressing', 'dressing-landscape-6.jpeg', 800, 600, DRESSING_ALTS[2]),
    entry('dressing', 'dressing-portrait-5.jpeg', 600, 800, DRESSING_ALTS[3]),
    entry('dressing', 'dressing-portrait-6.jpeg', 600, 800, DRESSING_ALTS[0]),
    entry('dressing', 'dressing-portrait-7.jpeg', 600, 800, DRESSING_ALTS[1]),
    entry('dressing', 'dressing-portrait-8.jpeg', 600, 800, DRESSING_ALTS[2]),
    entry('dressing', 'dressing-portrait-9.jpeg', 600, 800, DRESSING_ALTS[3]),
  ],
  baie: [
    entry('baie', 'baie-portrait-1.jpeg', 533, 800, { ro: 'Mobilier de baie pe comandă — Arti Studio Oradea', en: 'Custom bathroom cabinetry — Arti Studio Oradea' }),
    entry('baie', 'baie-portrait-2.jpeg', 533, 800, BAIE_ALTS[0]),
    entry('baie', 'baie-portrait-3.jpeg', 600, 800, BAIE_ALTS[1]),
    entry('baie', 'baie-portrait-4.jpeg', 600, 800, BAIE_ALTS[2]),
    entry('baie', 'baie-portrait-5.jpeg', 600, 800, BAIE_ALTS[0]),
    entry('baie', 'baie-portrait-6.jpeg', 600, 800, BAIE_ALTS[1]),
  ],
}

export const homePortfolioPicks: Array<{ category: PortfolioCategorySlug; image: ImageRef }> = [
  { category: 'bucatarie', image: portfolioImages.bucatarie[0] },
  { category: 'living', image: portfolioImages.living[0] },
  { category: 'dormitor', image: portfolioImages.dormitor[0] },
  { category: 'dressing', image: portfolioImages.dressing[0] },
]

/**
 * Locale-aware narrow alt-picker used inside route components.
 * Falls back to Romanian for the 12 stubbed locales.
 */
export function localeAlt(img: ImageRef, locale: Locale): string {
  return locale === 'en' ? img.alt.en : img.alt.ro
}

/**
 * Service offerings — bilingual alt text per slot. `src` stays undefined
 * until real photography is supplied; the `<ServiceCard>` falls back to
 * `<ServicePlaceholder>` while empty. Order matches the `servicii.items`
 * array in every locale (01..06).
 */
export interface ServiceImageRef {
  src?: string
  alt: Record<'ro' | 'en', string>
}

export const serviceImages: ServiceImageRef[] = [
  { alt: { ro: 'Atelier de design și proiectare 3D — Arti Studio Oradea', en: '3D design and drafting studio — Arti Studio Oradea' } },
  { alt: { ro: 'Măsurători la fața locului — Arti Studio Oradea', en: 'On-site measurements — Arti Studio Oradea' } },
  { alt: { ro: 'Producție de mobilier la comandă în atelier — Arti Studio Oradea', en: 'Custom furniture production in the workshop — Arti Studio Oradea' } },
  { alt: { ro: 'Montaj și finisaje la cheie — Arti Studio Oradea', en: 'Turnkey installation and finishing — Arti Studio Oradea' } },
  { alt: { ro: 'Feronerie și materiale premium — Arti Studio Oradea', en: 'Premium hardware and materials — Arti Studio Oradea' } },
  { alt: { ro: 'Suport post-instalare și garanție — Arti Studio Oradea', en: 'Post-install support and warranty — Arti Studio Oradea' } },
]
