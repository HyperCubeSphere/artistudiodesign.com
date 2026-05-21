import { createFileRoute, Link, Outlet, useRouterState } from '@tanstack/react-router'
import { useI18n } from '../i18n'
import { seo } from '../lib/seo'
import { GoldPeriod } from '../components/SectionHeader'
import { portfolioProjects } from '../content/portfolio'
import { localeAlt } from '../content/images'
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
          <p className="text-base md:text-lg max-w-2xl" style={{ color: 'var(--color-muted)' }}>
            {p.subtitle}
          </p>

          <div className="flex flex-wrap gap-2 mt-10">
            <Link
              to="/$locale/portofoliu"
              params={{ locale }}
              activeOptions={{ exact: true }}
              className="nav-text px-4 py-2 border hairline transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              style={{ borderWidth: 1 }}
              activeProps={{ style: { borderColor: 'var(--color-accent)', color: 'var(--color-accent)' } }}
            >
              {p.allLabel}
            </Link>
            {p.categories.map((c) => (
              <Link
                key={c.slug}
                to="/$locale/portofoliu/$category"
                params={{ locale, category: c.slug as PortfolioCategorySlug }}
                className="nav-text px-4 py-2 border hairline transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                style={{ borderWidth: 1 }}
                activeProps={{ style: { borderColor: 'var(--color-accent)', color: 'var(--color-accent)' } }}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {portfolioProjects.map((proj) => (
                <Link
                  key={proj.id}
                  to="/$locale/portofoliu/$category"
                  params={{ locale, category: proj.category }}
                  className="portfolio-card group block"
                >
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <img
                      src={proj.image.src}
                      alt={localeAlt(proj.image, ll)}
                      loading="lazy"
                      decoding="async"
                      className="portfolio-img absolute inset-0 w-full h-full object-cover photo-moody-soft"
                    />
                  </div>
                  <div className="pt-4 flex flex-col gap-1">
                    <p className="eyebrow text-[10px]">{p.categories.find((c) => c.slug === proj.category)?.label}</p>
                    <h3 className="serif text-xl md:text-2xl leading-tight group-hover:text-[var(--color-accent)] transition-colors">
                      {proj.title[ll === 'en' ? 'en' : 'ro']}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                      {proj.caption[ll === 'en' ? 'en' : 'ro']}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <Outlet />
      )}
    </>
  )
}
