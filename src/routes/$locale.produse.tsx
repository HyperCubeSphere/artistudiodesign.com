import { createFileRoute, Link, Outlet, useRouterState } from '@tanstack/react-router'
import { useI18n } from '../i18n'
import { seo } from '../lib/seo'
import { GoldPeriod } from '../components/SectionHeader'
import type { ProductCategorySlug } from '../i18n/config'
import type ro from '../i18n/locales/ro'

const translations = import.meta.glob('../i18n/locales/*.ts', { eager: true }) as Record<string, { default: typeof ro }>
function tFor(locale: string) {
  return (translations[`../i18n/locales/${locale}.ts`] ?? translations[`../i18n/locales/ro.ts`]).default
}

export const Route = createFileRoute('/$locale/produse')({
  component: ProduseLayout,
  head: ({ params }) => {
    const t = tFor(params.locale)
    return seo({ title: t.produse.seoTitle, description: t.produse.seoDescription, path: '/produse', locale: params.locale })
  },
})

function ProduseLayout() {
  const { locale, t } = useI18n()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const p = t.produse
  const isIndex = pathname.endsWith('/produse') || pathname.endsWith('/produse/')

  return (
    <>
      <section className="border-b hairline">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28 enter-stagger">
          <p className="eyebrow mb-6">{p.eyebrow}</p>
          <h1 className="serif text-5xl md:text-7xl leading-[1.05] max-w-3xl mb-8 text-balance">
            <GoldPeriod text={p.heading} />
          </h1>
          <p className="text-base md:text-lg max-w-2xl" style={{ color: 'var(--color-muted)' }}>
            {p.indexSubtitle}
          </p>

          <div className="flex flex-wrap gap-2 mt-10">
            <Link
              to="/$locale/produse"
              params={{ locale }}
              activeOptions={{ exact: true }}
              className="nav-text px-4 py-2 border hairline transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              style={{ borderWidth: 1 }}
              activeProps={{ style: { borderColor: 'var(--color-accent)', color: 'var(--color-accent)' } }}
            >
              {p.categoriesAllLabel}
            </Link>
            {p.categories.map((c) => (
              <Link
                key={c.slug}
                to="/$locale/produse/categorie/$slug"
                params={{ locale, slug: c.slug as ProductCategorySlug }}
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

      <section className={isIndex ? 'py-16 md:py-20' : 'py-12 md:py-16'}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <Outlet />
        </div>
      </section>
    </>
  )
}
