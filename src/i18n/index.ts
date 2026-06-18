import { createContext, use } from 'react'
import { defaultLocale } from './config'
import roTranslation from './locales/ro'
import type ro from './locales/ro'

export type Translation = typeof ro
export {
  locales,
  defaultLocale,
  localeNames,
  portfolioCategorySlugs,
  productCategorySlugs,
  productSlugs,
} from './config'
export type { Locale, PortfolioCategorySlug, ProductCategorySlug, ProductSlug } from './config'

interface I18nContextValue {
  locale: string
  t: Translation
}

const I18nContext = createContext<I18nContextValue | null>(null)

export const I18nProvider = I18nContext.Provider

const FALLBACK: I18nContextValue = { locale: defaultLocale, t: roTranslation }

export function useI18n() {
  return use(I18nContext) ?? FALLBACK
}

export function useTranslation() {
  return useI18n().t
}

export function useLocale() {
  return useI18n().locale
}
