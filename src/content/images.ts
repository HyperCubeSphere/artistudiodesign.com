/**
 * Image registry — central index of static assets under `/public/images/`.
 * Photography lives under `/portfolio/<category>/` and `/hero/`; the brand
 * crest lives under `/brand/`. Bilingual alt text lives here so it's
 * reusable across routes + locales.
 *
 * Filenames follow `<category>-<orientation>-<n>.jpeg` for SEO + so the
 * URL itself describes the asset (Google ranks asset filenames as a weak
 * but non-zero signal, on top of the alt text).
 */

import type { Locale, PortfolioCategorySlug } from '../i18n/config'

export interface ImageRef {
  src: string
  alt: Record<'ro' | 'en', string>
  width?: number
  height?: number
}

export function pickAlt(img: ImageRef, locale: string): string {
  if (locale === 'ro' || locale === 'en') return img.alt[locale]
  return img.alt.ro
}

export const heroImages: ImageRef[] = [
  { src: '/images/hero/hero-bucatarie-landscape-1.jpeg', alt: { ro: 'Bucătărie pe comandă realizată de Arti Studio în Oradea', en: 'Custom kitchen built by Arti Studio in Oradea' } },
]

export const homeHero: ImageRef = heroImages[0]

export const portfolioImages: Record<PortfolioCategorySlug, ImageRef[]> = {
  bucatarie: [
    { src: '/images/portfolio/bucatarie/bucatarie-landscape-1.jpeg', alt: { ro: 'Bucătărie modernă cu insulă — Arti Studio Oradea', en: 'Modern kitchen with island — Arti Studio Oradea' } },
    { src: '/images/portfolio/bucatarie/bucatarie-landscape-2.jpeg', alt: { ro: 'Bucătărie cu blat din piatră — Arti Studio Oradea', en: 'Kitchen with stone worktop — Arti Studio Oradea' } },
    { src: '/images/portfolio/bucatarie/bucatarie-landscape-3.jpeg', alt: { ro: 'Bucătărie cu fronturi mate — Arti Studio Oradea', en: 'Kitchen with matte fronts — Arti Studio Oradea' } },
    { src: '/images/portfolio/bucatarie/bucatarie-landscape-4.jpeg', alt: { ro: 'Bucătărie cu iluminat integrat — Arti Studio Oradea', en: 'Kitchen with integrated lighting — Arti Studio Oradea' } },
  ],
  living: [
    { src: '/images/portfolio/living/living-landscape-1.jpeg', alt: { ro: 'Living cu bibliotecă pe perete — Arti Studio Oradea', en: 'Living room with wall library — Arti Studio Oradea' } },
    { src: '/images/portfolio/living/living-landscape-2.jpeg', alt: { ro: 'Living cu zonă TV integrată — Arti Studio Oradea', en: 'Living room with integrated TV unit — Arti Studio Oradea' } },
    { src: '/images/portfolio/living/living-landscape-3.jpeg', alt: { ro: 'Living elegant — Arti Studio Oradea', en: 'Elegant living room — Arti Studio Oradea' } },
  ],
  dormitor: [
    { src: '/images/portfolio/dormitor/dormitor-landscape-1.jpeg', alt: { ro: 'Dormitor matrimonial cu tăblie tapițată — Arti Studio Oradea', en: 'Master bedroom with upholstered headboard — Arti Studio Oradea' } },
    { src: '/images/portfolio/dormitor/dormitor-landscape-2.jpeg', alt: { ro: 'Dormitor cu depozitare integrată — Arti Studio Oradea', en: 'Bedroom with integrated storage — Arti Studio Oradea' } },
  ],
  dressing: [
    { src: '/images/portfolio/dressing/dressing-landscape-1.jpeg', alt: { ro: 'Dressing walk-in optimizat — Arti Studio Oradea', en: 'Optimised walk-in dressing — Arti Studio Oradea' } },
    { src: '/images/portfolio/dressing/dressing-landscape-2.jpeg', alt: { ro: 'Dressing cu iluminat LED — Arti Studio Oradea', en: 'Dressing with LED lighting — Arti Studio Oradea' } },
    { src: '/images/portfolio/dressing/dressing-landscape-3.jpeg', alt: { ro: 'Dressing cu fronturi lucioase — Arti Studio Oradea', en: 'Dressing with glossy fronts — Arti Studio Oradea' } },
  ],
  baie: [
    { src: '/images/portfolio/baie/baie-portrait-1.jpeg', alt: { ro: 'Mobilier de baie pe comandă — Arti Studio Oradea', en: 'Custom bathroom cabinetry — Arti Studio Oradea' } },
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
