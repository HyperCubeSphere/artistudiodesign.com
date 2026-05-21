import { createFileRoute, notFound, Link } from '@tanstack/react-router'
import { useI18n } from '../i18n'
import { seo } from '../lib/seo'
import { productCategorySlugs, type ProductCategorySlug } from '../i18n/config'
import { productsByCategory } from '../content/products'
import ProductCard from '../components/ProductCard'
import type ro from '../i18n/locales/ro'

const translations = import.meta.glob('../i18n/locales/*.ts', { eager: true }) as Record<string, { default: typeof ro }>
function tFor(locale: string) {
  return (translations[`../i18n/locales/${locale}.ts`] ?? translations[`../i18n/locales/ro.ts`]).default
}

export const Route = createFileRoute('/$locale/produse/categorie/$slug')({
  beforeLoad: ({ params }) => {
    if (!productCategorySlugs.includes(params.slug as ProductCategorySlug)) throw notFound()
  },
  component: ProduseCategorie,
  head: ({ params }) => {
    const t = tFor(params.locale)
    const cat = t.produse.categories.find((c) => c.slug === params.slug)
    return seo({
      title: `${cat?.label ?? t.produse.heading} — Arti Studio`,
      description: cat?.description ?? t.produse.seoDescription,
      path: `/produse/categorie/${params.slug}`,
      locale: params.locale,
    })
  },
})

function ProduseCategorie() {
  const { locale, t } = useI18n()
  const params = Route.useParams()
  const cat = t.produse.categories.find((c) => c.slug === params.slug)
  const list = productsByCategory(params.slug as ProductCategorySlug)

  if (!cat) return <p>{t.produse.categoryNotFound}</p>

  return (
    <>
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b hairline pb-6">
        <div>
          <p className="eyebrow mb-2">{t.produse.eyebrow}</p>
          <h1 className="serif text-4xl md:text-5xl leading-[1.05] title-rule">{cat.label}</h1>
          <p className="text-sm mt-4 max-w-xl" style={{ color: 'var(--color-muted)' }}>{cat.description}</p>
        </div>
        <Link to="/$locale/produse" params={{ locale }} className="nav-text text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors">
          ← {t.produse.backToProducts}
        </Link>
      </header>

      {list.length === 0 ? (
        <p style={{ color: 'var(--color-muted)' }}>{t.produse.productNotFound}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-14">
          {list.map((product) => <ProductCard key={product.slug} product={product} />)}
        </div>
      )}
    </>
  )
}
