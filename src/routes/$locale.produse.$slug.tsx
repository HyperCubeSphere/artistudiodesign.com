import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { useI18n } from '../i18n'
import { seo } from '../lib/seo'
import { GoldPeriod } from '../components/SectionHeader'
import ProductPlaceholder from '../components/ProductPlaceholder'
import { findProduct, products } from '../content/products'
import { productSlugs, type Locale, type ProductSlug } from '../i18n/config'
import type ro from '../i18n/locales/ro'

const translations = import.meta.glob('../i18n/locales/*.ts', { eager: true }) as Record<string, { default: typeof ro }>
function tFor(locale: string) {
  return (translations[`../i18n/locales/${locale}.ts`] ?? translations[`../i18n/locales/ro.ts`]).default
}

export const Route = createFileRoute('/$locale/produse/$slug')({
  beforeLoad: ({ params }) => {
    if (!productSlugs.includes(params.slug as ProductSlug)) throw notFound()
  },
  component: ProductDetail,
  head: ({ params }) => {
    const t = tFor(params.locale)
    const product = findProduct(params.slug)
    if (!product) return seo({ title: t.produse.productNotFound, description: t.produse.seoDescription, path: `/produse/${params.slug}`, locale: params.locale })
    return seo({
      title: `${product.name[params.locale === 'en' ? 'en' : 'ro']} — Arti Studio`,
      description: product.shortDescription[params.locale === 'en' ? 'en' : 'ro'],
      path: `/produse/${params.slug}`,
      locale: params.locale,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name[params.locale === 'en' ? 'en' : 'ro'],
        description: product.shortDescription[params.locale === 'en' ? 'en' : 'ro'],
        offers: {
          '@type': 'Offer',
          priceCurrency: 'RON',
          price: product.priceLei,
          availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        },
      },
    })
  },
})

function ProductDetail() {
  const { locale, t } = useI18n()
  const params = Route.useParams()
  const product = findProduct(params.slug)
  const ll = locale as Locale

  if (!product) {
    return <p>{t.produse.productNotFound}</p>
  }

  const category = t.produse.categories.find((c) => c.slug === product.category)
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3)
  const name = product.name[ll === 'en' ? 'en' : 'ro']
  const longDesc = product.longDescription[ll === 'en' ? 'en' : 'ro']
  const howTo = product.howToUse[ll === 'en' ? 'en' : 'ro']
  const contents = product.contents[ll === 'en' ? 'en' : 'ro']

  return (
    <>
      <Link to="/$locale/produse" params={{ locale }} className="nav-text text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors inline-flex items-center gap-1 mb-8">
        ← {t.produse.backToProducts}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div className="product-img-wrap" style={{ aspectRatio: '4 / 5' }}>
          <ProductPlaceholder slug={product.slug} title={name} className="block w-full h-full" />
        </div>

        <div className="flex flex-col gap-5">
          {category ? <p className="eyebrow">{category.label}</p> : null}
          <h1 className="serif text-4xl md:text-5xl leading-[1.05] title-rule">
            <GoldPeriod text={name + '.'} />
          </h1>
          <p className="text-base leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            {product.shortDescription[ll === 'en' ? 'en' : 'ro']}
          </p>
          <p className="serif text-5xl tabular-nums mt-2">
            {product.priceLei},00 <span className="text-2xl align-baseline" style={{ color: 'var(--color-muted)' }}>{t.produse.priceLabel}</span>
          </p>
          <p className="text-xs" style={{ color: product.inStock ? 'var(--color-accent)' : 'var(--color-muted-2)' }}>
            {product.inStock ? t.produse.inStockLabel : t.produse.outOfStockLabel}
          </p>
          <Link
            to="/$locale/contact"
            params={{ locale }}
            search={{ produs: product.slug } as Record<string, string>}
            className="btn btn-primary self-start mt-2"
          >
            {t.produse.ctaProductSingle}
          </Link>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mt-8 border-t hairline pt-8">
            <div>
              <dt className="eyebrow mb-2">{t.produse.detailDescriptionLabel}</dt>
              <dd className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{longDesc}</dd>
            </div>
            <div>
              <dt className="eyebrow mb-2">{t.produse.detailHowToUseLabel}</dt>
              <dd className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{howTo}</dd>
            </div>
            <div>
              <dt className="eyebrow mb-2">{t.produse.detailContentsLabel}</dt>
              <dd className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{contents}</dd>
            </div>
          </dl>
        </div>
      </div>

      {related.length ? (
        <section className="mt-20">
          <p className="eyebrow mb-6">{t.produse.detailRelatedLabel}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-12 border-t hairline pt-10">
            {related.map((p) => (
              <Link
                key={p.slug}
                to="/$locale/produse/$slug"
                params={{ locale, slug: p.slug }}
                className="group flex flex-col gap-3"
              >
                <div className="product-img-wrap" style={{ aspectRatio: '4 / 5' }}>
                  <ProductPlaceholder slug={p.slug} title={p.name[ll === 'en' ? 'en' : 'ro']} className="block w-full h-full" />
                </div>
                <h3 className="serif text-lg group-hover:text-[var(--color-accent)] transition-colors">{p.name[ll === 'en' ? 'en' : 'ro']}</h3>
                <p className="serif text-2xl tabular-nums">{p.priceLei},00 <span className="text-sm" style={{ color: 'var(--color-muted)' }}>{t.produse.priceLabel}</span></p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </>
  )
}
