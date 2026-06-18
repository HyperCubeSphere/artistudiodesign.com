import { createContext, use } from 'react'
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

export function useI18n() {
  const ctx = use(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}

export function useTranslation() {
  return useI18n().t
}

export function useLocale() {
  return useI18n().locale
}
