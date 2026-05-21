export const locales = ['ro', 'en', 'de', 'fr', 'el', 'uk', 'es', 'tr', 'et', 'cs', 'nl', 'sv', 'it', 'da'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'ro'

export const localeNames: Record<Locale, string> = {
  ro: 'Română',
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  el: 'Ελληνικά',
  uk: 'Українська',
  es: 'Español',
  tr: 'Türkçe',
  et: 'Eesti',
  cs: 'Čeština',
  nl: 'Nederlands',
  sv: 'Svenska',
  it: 'Italiano',
  da: 'Dansk',
}

export const portfolioCategorySlugs = ['bucatarie', 'living', 'dormitor', 'dressing', 'baie'] as const
export type PortfolioCategorySlug = (typeof portfolioCategorySlugs)[number]

export const productCategorySlugs = ['curatare-mobilier', 'protectie-suprafete', 'nano-coating', 'ingrijire-piele-vinil'] as const
export type ProductCategorySlug = (typeof productCategorySlugs)[number]

export const productSlugs = [
  'daily-cleaner-mobilier',
  'anti-fingerprint-cleaner',
  'furniture-protector',
  'leather-vinyl-cleaner',
  'nano-coating-protectie-invizibila',
] as const
export type ProductSlug = (typeof productSlugs)[number]
