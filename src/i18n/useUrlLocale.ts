import { useRouterState } from '@tanstack/react-router'
import { defaultLocale, locales, type Locale } from './config'

function isLocale(s: string): s is Locale {
  return (locales as readonly string[]).includes(s)
}

/** Pull the locale prefix from the URL pathname; null when absent. */
export function useUrlLocale(): Locale | null {
  const seg = useRouterState({ select: (s) => s.location.pathname.split('/')[1] ?? '' })
  return isLocale(seg) ? seg : null
}

export function useUrlLocaleOrDefault(): Locale {
  return useUrlLocale() ?? defaultLocale
}
