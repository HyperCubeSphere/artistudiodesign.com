import type { ReactNode } from 'react'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { useI18n } from '../i18n'
import { seo } from '../lib/seo'
import { GoldPeriod } from '../components/SectionHeader'
import { projectsByCategory } from '../content/portfolio'
import { localeAlt, portfolioImages, type ImageRef } from '../content/images'
import { portfolioCategorySlugs, type Locale, type PortfolioCategorySlug } from '../i18n/config'
import type ro from '../i18n/locales/ro'

const translations = import.meta.glob('../i18n/locales/*.ts', { eager: true }) as Record<string, { default: typeof ro }>
function tFor(locale: string) {
  return (translations[`../i18n/locales/${locale}.ts`] ?? translations[`../i18n/locales/ro.ts`]).default
}

/** Localized "opens in a new tab" cue for screen readers (visually hidden). */
const NEW_TAB_LABEL: Record<Locale, string> = {
  ro: 'se deschide într-o filă nouă',
  en: 'opens in a new tab',
  hu: 'új lapon nyílik meg',
  de: 'wird in einem neuen Tab geöffnet',
  fr: "s'ouvre dans un nouvel onglet",
  el: 'ανοίγει σε νέα καρτέλα',
  uk: 'відкривається в новій вкладці',
  es: 'se abre en una pestaña nueva',
  tr: 'yeni sekmede açılır',
  et: 'avaneb uuel vahelehel',
  cs: 'otevře se na nové kartě',
  nl: 'opent in een nieuw tabblad',
  sv: 'öppnas i en ny flik',
  it: 'si apre in una nuova scheda',
  da: 'åbner i en ny fane',
}

/**
 * Gallery images = registry entries not already shown as a curated project
 * cover. Cached per category at module load — the inputs are module-scoped
 * constants, no need to rebuild a Set on every render.
 */
const galleryByCategory: Record<PortfolioCategorySlug, ImageRef[]> = portfolioCategorySlugs.reduce(
  (acc, slug) => {
    const used = new Set(projectsByCategory(slug).map((p) => p.image))
    acc[slug] = portfolioImages[slug].filter((img) => !used.has(img))
    return acc
  },
  {} as Record<PortfolioCategorySlug, ImageRef[]>,
)

export const Route = createFileRoute('/$locale/portofoliu/$category')({
  beforeLoad: ({ params }) => {
    if (!portfolioCategorySlugs.includes(params.category as PortfolioCategorySlug)) throw notFound()
  },
  component: PortofoliuCategoryPage,
  head: ({ params }) => {
    const t = tFor(params.locale)
    const cat = t.portofoliu.categories.find((c) => c.slug === params.category)
    return seo({
      title: `${cat?.label ?? 'Portofoliu'} — Arti Studio`,
      description: cat?.description ?? t.portofoliu.seoDescription,
      path: `/portofoliu/${params.category}`,
      locale: params.locale,
    })
  },
})

function PortofoliuCategoryPage() {
  const { locale, t } = useI18n()
  const params = Route.useParams()
  const ll = locale as Locale
  const category = params.category as PortfolioCategorySlug
  const cat = t.portofoliu.categories.find((c) => c.slug === category)
  const projects = projectsByCategory(category)
  const galleryImages = galleryByCategory[category]

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between mb-10 border-b hairline pb-6 flex-wrap gap-4">
          <div>
            <p className="eyebrow mb-2">{cat?.label}</p>
            <h2 className="serif text-3xl md:text-4xl leading-[1.05] max-w-2xl">
              <GoldPeriod text={cat?.description ?? ''} />
            </h2>
          </div>
          <Link to="/$locale/portofoliu" params={{ locale }} className="nav-text text-muted hover:text-accent transition-colors">
            ← {t.portofoliu.backToAll}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((proj, i) => (
            <article key={proj.id} className="portfolio-card group block">
              <PortfolioThumb image={proj.image} locale={ll} eager={i < 3} priority={i === 0} />
              <div className="pt-4 flex flex-col gap-2">
                <h3 className="serif text-xl md:text-2xl leading-tight">
                  {proj.title[ll === 'en' ? 'en' : 'ro']}
                </h3>
                <p className="text-sm text-muted">
                  {proj.caption[ll === 'en' ? 'en' : 'ro']}
                </p>
                <ul className="flex flex-wrap gap-1.5 mt-2">
                  {proj.tags[ll === 'en' ? 'en' : 'ro'].map((tag) => (
                    <li
                      key={tag}
                      className="text-[10px] uppercase tracking-[var(--tracking-nav)] px-2 py-1 border hairline-soft text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {galleryImages.length > 0 ? (
          <div className="mt-16 md:mt-24 pt-12 md:pt-16 border-t hairline grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {galleryImages.map((img) => (
              <PortfolioThumb
                key={img.src}
                image={img}
                locale={ll}
                eager={false}
                priority={false}
                className="portfolio-card group block"
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

interface PortfolioThumbProps {
  image: ImageRef
  locale: Locale
  eager: boolean
  priority: boolean
  className?: string
}

/**
 * The shared 4/5-aspect image tile used by both the curated-project grid
 * and the extended gallery. When `image.full` is set the tile is wrapped
 * in a `<FullResLink>` so visitors open the original in a new tab; when
 * not, the same JSX renders without a link.
 */
function PortfolioThumb({ image, locale, eager, priority, className }: PortfolioThumbProps) {
  const figure = (
    <div className="aspect-[4/5] relative overflow-hidden">
      <img
        src={image.src}
        alt={localeAlt(image, locale)}
        width={image.width}
        height={image.height}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className="portfolio-img absolute inset-0 w-full h-full object-cover photo-moody-soft"
      />
    </div>
  )
  if (!image.full) {
    return className ? <div className={className}>{figure}</div> : figure
  }
  return (
    <FullResLink href={image.full} locale={locale} className={className}>
      {figure}
    </FullResLink>
  )
}

interface FullResLinkProps {
  href: string
  locale: Locale
  className?: string
  children: ReactNode
}

/** Constant suffix applied to every full-res link, hoisted to avoid per-render template work. */
const FULL_RES_LINK_BASE = 'block cursor-zoom-in'

/**
 * Renders an `<a target="_blank">` to a high-resolution image. The link's
 * accessible name flows from the child `<img alt>`; a visually-hidden span
 * announces the new-tab behavior for screen-reader users.
 */
function FullResLink({ href, locale, className, children }: FullResLinkProps) {
  const composed = className ? `${className} ${FULL_RES_LINK_BASE}` : FULL_RES_LINK_BASE
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={composed}>
      {children}
      <span className="sr-only"> ({NEW_TAB_LABEL[locale]})</span>
    </a>
  )
}
