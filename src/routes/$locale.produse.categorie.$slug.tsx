import { createFileRoute, notFound } from '@tanstack/react-router'
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
  const { t } = useI18n()
  const params = Route.useParams()
  const cat = t.produse.categories.find((c) => c.slug === params.slug)
  const list = productsByCategory(params.slug as ProductCategorySlug)

  if (!cat) return <p className="text-muted">{t.produse.categoryNotFound}</p>

  return (
    <>
      <header className="flex items-end justify-between gap-6 mb-10 pb-4 border-b hairline-soft">
        <div>
          <h2 className="serif text-2xl md:text-3xl leading-tight">{cat.label}</h2>
          <p className="text-sm mt-2 max-w-xl text-muted">{cat.description}</p>
        </div>
        <p className="text-xs tabular-nums whitespace-nowrap text-muted">
          {list.length} {list.length === 1 ? t.produse.itemSingular : t.produse.itemPlural}
        </p>
      </header>

      {list.length === 0 ? (
        <p className="text-muted">{t.produse.productNotFound}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {list.map((product) => <ProductCard key={product.slug} product={product} />)}
        </div>
      )}
    </>
  )
}
