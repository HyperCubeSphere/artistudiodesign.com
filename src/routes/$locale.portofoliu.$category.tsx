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
  const projectImageSet = new Set(projects.map((p) => p.image))
  const galleryImages = portfolioImages[category].filter((img) => !projectImageSet.has(img))

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
              <FullResWrap image={proj.image} locale={ll}>
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img
                    src={proj.image.src}
                    alt={localeAlt(proj.image, ll)}
                    width={proj.image.width}
                    height={proj.image.height}
                    loading={i < 3 ? 'eager' : 'lazy'}
                    fetchPriority={i === 0 ? 'high' : 'auto'}
                    decoding="async"
                    className="portfolio-img absolute inset-0 w-full h-full object-cover photo-moody-soft"
                  />
                </div>
              </FullResWrap>
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
            {galleryImages.map((img, i) => (
              <FullResWrap key={img.src} image={img} locale={ll} className="portfolio-card group block">
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img
                    src={img.src}
                    alt={localeAlt(img, ll)}
                    width={img.width}
                    height={img.height}
                    loading={i < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="portfolio-img absolute inset-0 w-full h-full object-cover photo-moody-soft"
                  />
                </div>
              </FullResWrap>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

interface FullResWrapProps {
  image: ImageRef
  locale: Locale
  className?: string
  children: ReactNode
}

/**
 * Wraps the thumbnail in `<a target="_blank">` pointing at the full-res
 * image when `image.full` is set. Browsers (desktop + mobile) open a new
 * tab natively — no UA sniffing, no modal. Falls back to a plain wrapper
 * when no `full` is provided so older registry entries keep working.
 */
function FullResWrap({ image, locale, className, children }: FullResWrapProps) {
  if (!image.full) {
    return <div className={className}>{children}</div>
  }
  return (
    <a
      href={image.full}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={localeAlt(image, locale)}
      className={`${className ?? ''} block cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent`.trim()}
    >
      {children}
    </a>
  )
}
