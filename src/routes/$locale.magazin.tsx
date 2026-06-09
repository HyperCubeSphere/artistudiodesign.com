import type { ReactNode } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useI18n } from '../i18n'
import { seo } from '../lib/seo'
import { GoldPeriod } from '../components/SectionHeader'
import ProductCard from '../components/ProductCard'
import { products } from '../content/products'
import { pad2 } from '../lib/format'
import type { MagazinCategorySlug, ProductCategorySlug } from '../i18n/config'
import type ro from '../i18n/locales/ro'

const translations = import.meta.glob('../i18n/locales/*.ts', { eager: true }) as Record<string, { default: typeof ro }>
function tFor(locale: string) {
  return (translations[`../i18n/locales/${locale}.ts`] ?? translations[`../i18n/locales/ro.ts`]).default
}

export const Route = createFileRoute('/$locale/magazin')({
  component: MagazinPage,
  head: ({ params }) => {
    const t = tFor(params.locale)
    return seo({ title: t.magazin.seoTitle, description: t.magazin.seoDescription, path: '/magazin', locale: params.locale })
  },
})

function MagazinPage() {
  const { locale, t } = useI18n()
  const m = t.magazin
  const p = t.produse

  return (
    <>
      <section className="border-b hairline">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32 enter-stagger">
          <p className="eyebrow mb-6">{m.eyebrow}</p>
          <h1 className="serif text-5xl md:text-7xl leading-[1.05] max-w-3xl mb-8 text-balance">
            <GoldPeriod text={m.heading} />
          </h1>
          <p className="text-base md:text-lg max-w-2xl text-muted">
            {m.subtitle}
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {m.categories.map((c, i) => (
            <div
              key={c.slug}
              className="relative flex flex-col border hairline isolate"
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-6 z-10 h-3 w-20 -translate-y-1/2 bg-accent"
              />
              <div className="aspect-[4/5] relative overflow-hidden flex items-center justify-center bg-surface">
                <CategoryIcon slug={c.slug as MagazinCategorySlug} />
                <span className="absolute top-4 right-4 px-2 py-1 nav-text text-[10px] text-accent border border-accent">
                  {m.comingSoon}
                </span>
              </div>
              <div className="pt-5 px-5 pb-6 flex flex-col gap-2">
                <p className="eyebrow-sm tabular-nums">— {pad2(i + 1)}</p>
                <h2 className="serif text-2xl md:text-3xl leading-tight">{c.label}</h2>
                <p className="text-sm leading-relaxed text-muted">
                  {c.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t hairline">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-24">
          <div className="mb-12">
            <p className="eyebrow mb-4">{p.eyebrow}</p>
            <h2 className="serif text-4xl md:text-6xl leading-[1.05] max-w-3xl mb-6 text-balance">
              <GoldPeriod text={p.heading} />
            </h2>
            <p className="text-base md:text-lg max-w-2xl text-muted">
              {p.indexSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-12">
            <Link
              to="/$locale/produse"
              params={{ locale }}
              activeOptions={{ exact: true }}
              className="nav-text px-4 min-h-11 inline-flex items-center hairline-frame transition-colors text-accent border-accent"
            >
              {p.categoriesAllLabel}
            </Link>
            {p.categories.map((c) => (
              <Link
                key={c.slug}
                to="/$locale/produse/categorie/$slug"
                params={{ locale, slug: c.slug as ProductCategorySlug }}
                className="nav-text px-4 min-h-11 inline-flex items-center hairline-frame transition-colors hover:border-accent hover:text-accent"
              >
                {c.label}
              </Link>
            ))}
          </div>

          <div className="flex items-end justify-between gap-6 mb-10 pb-4 border-b hairline-soft">
            <h3 className="eyebrow">{p.categoriesAllLabel}</h3>
            <p className="text-xs tabular-nums text-muted">
              {products.length} {products.length === 1 ? p.itemSingular : p.itemPlural}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

const MAGAZIN_ICON_PATHS: Record<MagazinCategorySlug, ReactNode> = {
  curatenie: (
    <>
      <rect x="26" y="32" width="28" height="36" />
      <rect x="32" y="20" width="16" height="12" />
      <rect x="36" y="12" width="8" height="8" />
      <line x1="32" y1="42" x2="48" y2="42" />
    </>
  ),
  protectie: (
    <>
      <path d="M40 10 L62 18 V40 C62 56 52 64 40 70 C28 64 18 56 18 40 V18 Z" />
      <path d="M30 40 L37 47 L51 33" />
    </>
  ),
  textile: (
    <>
      <path d="M14 22 C 24 14, 36 30, 46 22 C 56 14, 66 22, 66 22 L 66 60 C 56 68, 46 56, 36 60 C 26 64, 14 60, 14 60 Z" />
      <path d="M14 36 C 24 28, 36 44, 46 36 C 56 28, 66 36, 66 36" />
      <path d="M14 48 C 24 40, 36 56, 46 48 C 56 40, 66 48, 66 48" />
    </>
  ),
}

function CategoryIcon({ slug }: { slug: MagazinCategorySlug }) {
  return (
    <svg
      viewBox="0 0 80 80"
      width="64"
      height="64"
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      {MAGAZIN_ICON_PATHS[slug]}
    </svg>
  )
}
