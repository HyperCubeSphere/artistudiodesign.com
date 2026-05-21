import { locales, defaultLocale } from '../i18n/config'

const SITE_URL = 'https://artistudiodesign.com'
const SITE_NAME = 'Arti Studio'

interface SeoConfig {
  title: string
  description: string
  path: string
  locale?: string
  type?: 'website' | 'article'
  image?: string
  extraMeta?: Array<Record<string, string>>
  jsonLd?: Record<string, unknown>
}

export function seo(config: SeoConfig) {
  const { title, description, path, locale = defaultLocale, type = 'website', image, extraMeta, jsonLd } = config
  const url = `${SITE_URL}/${locale}${path === '/' ? '' : path}`
  const ogImage = image ?? `${SITE_URL}/images/hero/hero-bucatarie-landscape-1.jpeg`

  const meta: Array<Record<string, string>> = [
    { title },
    { name: 'description', content: description },
    { property: 'og:type', content: type },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:locale', content: locale },
    { property: 'og:image', content: ogImage },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: ogImage },
  ]

  if (extraMeta) meta.push(...extraMeta)

  const links: Array<Record<string, string>> = [
    { rel: 'canonical', href: url },
    ...locales.map((l) => ({
      rel: 'alternate',
      hrefLang: l,
      href: `${SITE_URL}/${l}${path === '/' ? '' : path}`,
    })),
    { rel: 'alternate', hrefLang: 'x-default', href: `${SITE_URL}/${defaultLocale}${path === '/' ? '' : path}` },
  ]

  const result: {
    meta: typeof meta
    links: typeof links
    scripts?: Array<{ type: string; children: string }>
  } = { meta, links }

  if (jsonLd) {
    result.scripts = [{ type: 'application/ld+json', children: JSON.stringify(jsonLd) }]
  }

  return result
}

export const SITE = { url: SITE_URL, name: SITE_NAME }
