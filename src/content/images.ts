/**
 * Image registry — central index of static assets under /public/images/legacy/.
 * Bilingual alt text lives here so it's reusable across routes + locales.
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
  { src: '/images/legacy/bucatarie/b6.jpeg', alt: { ro: 'Bucătărie cu iluminat integrat — Arti Studio', en: 'Kitchen with integrated lighting — Arti Studio' } },
  { src: '/images/legacy/bucatarie/b1.jpeg', alt: { ro: 'Bucătărie verde cu blat lemn — Arti Studio', en: 'Green kitchen with wood worktop — Arti Studio' } },
  { src: '/images/legacy/hero/hero2.jpeg', alt: { ro: 'Interior elegant Arti Studio', en: 'Elegant interior by Arti Studio' } },
]

export const homeHero: ImageRef = heroImages[0]

export const portfolioImages: Record<PortfolioCategorySlug, ImageRef[]> = {
  bucatarie: [
    { src: '/images/legacy/bucatarie/b1.jpeg', alt: { ro: 'Bucătărie modernă cu insulă', en: 'Modern kitchen with island' } },
    { src: '/images/legacy/bucatarie/b2.jpeg', alt: { ro: 'Bucătărie cu blat din piatră', en: 'Kitchen with stone worktop' } },
    { src: '/images/legacy/bucatarie/b3.jpeg', alt: { ro: 'Bucătărie cu fronturi mat', en: 'Kitchen with matte fronts' } },
    { src: '/images/legacy/bucatarie/b6.jpeg', alt: { ro: 'Bucătărie cu iluminat integrat', en: 'Kitchen with integrated lighting' } },
  ],
  living: [
    { src: '/images/legacy/living/l1.jpeg', alt: { ro: 'Living cu bibliotecă pe perete', en: 'Living room with wall library' } },
    { src: '/images/legacy/living/l2.jpeg', alt: { ro: 'Living cu zonă TV integrată', en: 'Living room with integrated TV unit' } },
    { src: '/images/legacy/living/l3.jpeg', alt: { ro: 'Living elegant', en: 'Elegant living room' } },
  ],
  dormitor: [
    { src: '/images/legacy/dormitor/do1.jpeg', alt: { ro: 'Dormitor matrimonial cu tăblie tapițată', en: 'Master bedroom with upholstered headboard' } },
    { src: '/images/legacy/dormitor/do2.jpeg', alt: { ro: 'Dormitor cu depozitare integrată', en: 'Bedroom with integrated storage' } },
    { src: '/images/legacy/dormitor/do3.jpeg', alt: { ro: 'Dormitor cu fronturi din lemn', en: 'Bedroom with wood fronts' } },
  ],
  dressing: [
    { src: '/images/legacy/dressing/d1.jpeg', alt: { ro: 'Dressing walk-in optimizat', en: 'Optimised walk-in dressing' } },
    { src: '/images/legacy/dressing/d2.jpeg', alt: { ro: 'Dressing cu iluminat LED', en: 'Dressing with LED lighting' } },
    { src: '/images/legacy/dressing/d3.jpeg', alt: { ro: 'Dressing cu fronturi lucioase', en: 'Dressing with glossy fronts' } },
  ],
  baie: [
    { src: '/images/legacy/baie/ba1.jpeg', alt: { ro: 'Mobilier de baie pe comandă', en: 'Custom bathroom cabinetry' } },
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
