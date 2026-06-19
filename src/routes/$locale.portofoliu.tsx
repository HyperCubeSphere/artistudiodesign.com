import { createFileRoute, Link, Outlet, useRouterState } from '@tanstack/react-router'
import { useI18n } from '../i18n'
import { seo } from '../lib/seo'
import { GoldPeriod } from '../components/SectionHeader'
import { localeAlt, portfolioImages } from '../content/images'
import type { Locale, PortfolioCategorySlug } from '../i18n/config'
import type ro from '../i18n/locales/ro'

const translations = import.meta.glob('../i18n/locales/*.ts', { eager: true }) as Record<string, { default: typeof ro }>
function tFor(locale: string) {
  return (translations[`../i18n/locales/${locale}.ts`] ?? translations[`../i18n/locales/ro.ts`]).default
}

export const Route = createFileRoute('/$locale/portofoliu')({
  component: PortofoliuLayout,
  head: ({ params }) => {
    const t = tFor(params.locale)
    return seo({ title: t.portofoliu.seoTitle, description: t.portofoliu.seoDescription, path: '/portofoliu', locale: params.locale })
  },
})

function PortofoliuLayout() {
  const { locale, t } = useI18n()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const p = t.portofoliu
  const isIndex = pathname.endsWith('/portofoliu') || pathname.endsWith('/portofoliu/')
  const ll = locale as Locale

  return (
    <>
      <section className="border-b hairline">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28 enter-stagger">
          <p className="eyebrow mb-6">{p.eyebrow}</p>
          <h1 className="serif text-5xl md:text-7xl leading-[1.05] max-w-3xl mb-8 text-balance">
            <GoldPeriod text={p.heading} />
          </h1>
          <p className="text-base md:text-lg max-w-2xl text-muted">
            {p.subtitle}
          </p>

          <div className="flex flex-wrap gap-2 mt-10">
            <Link
              to="/$locale/portofoliu"
              params={{ locale }}
              activeOptions={{ exact: true }}
              className="nav-text px-4 min-h-11 inline-flex items-center hairline-frame transition-colors hover:border-accent hover:text-accent"
              activeProps={{ className: 'nav-text px-4 min-h-11 inline-flex items-center hairline-frame transition-colors text-accent border-accent' }}
            >
              {p.allLabel}
            </Link>
            {p.categories.map((c) => (
              <Link
                key={c.slug}
                to="/$locale/portofoliu/$category"
                params={{ locale, category: c.slug as PortfolioCategorySlug }}
                className="nav-text px-4 min-h-11 inline-flex items-center hairline-frame transition-colors hover:border-accent hover:text-accent"
                activeProps={{ className: 'nav-text px-4 min-h-11 inline-flex items-center hairline-frame transition-colors text-accent border-accent' }}
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {isIndex ? (
        <section className="py-16 md:py-20">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {p.categories.map((c, i) => {
                const slug = c.slug as PortfolioCategorySlug
                const cover = portfolioImages[slug][0]
                if (!cover) return null
                const count = portfolioImages[slug].length
                const pluralRules = new Intl.PluralRules(locale)
                const projectsLabel =
                  pluralRules.select(count) === 'one' ? p.projectLabelOne : p.projectsLabel
                return (
                  <Link
                    key={c.slug}
                    to="/$locale/portofoliu/$category"
                    params={{ locale, category: slug }}
                    className="portfolio-card group block relative"
                  >
                    {/* Folder tab — base color via class so group-hover:bg wins
                        (inline style would defeat the hover utility). */}
                    <span
                      aria-hidden="true"
                      className="absolute top-0 left-6 z-10 h-3 w-24 -translate-y-1/2 transition-colors bg-accent group-hover:bg-accent-hover"
                    />
                    <div className="aspect-[4/5] relative overflow-hidden border hairline">
                      <img
                        src={cover.src}
                        alt={localeAlt(cover, ll)}
                        loading={i < 3 ? 'eager' : 'lazy'}
                        fetchPriority={i === 0 ? 'high' : 'auto'}
                        decoding="async"
                        className="portfolio-img absolute inset-0 w-full h-full object-cover photo-moody-soft"
                      />
                    </div>
                    <div className="pt-4 flex flex-col gap-2">
                      {count > 0 && (
                        <p className="eyebrow-sm tabular-nums">
                          {count} {projectsLabel}
                        </p>
                      )}
                      <h2 className="serif text-2xl md:text-3xl leading-tight group-hover:text-accent transition-colors">
                        {c.label}
                      </h2>
                      <p className="text-sm text-muted">
                        {c.description}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      ) : (
        <Outlet />
      )}
    </>
  )
}
