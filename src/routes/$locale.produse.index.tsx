import { createFileRoute } from '@tanstack/react-router'
import { seo } from '../lib/seo'
import { products } from '../content/products'
import ProductCard from '../components/ProductCard'
import { useI18n } from '../i18n'
import type ro from '../i18n/locales/ro'

const translations = import.meta.glob('../i18n/locales/*.ts', { eager: true }) as Record<string, { default: typeof ro }>
function tFor(locale: string) {
  return (translations[`../i18n/locales/${locale}.ts`] ?? translations[`../i18n/locales/ro.ts`]).default
}

export const Route = createFileRoute('/$locale/produse/')({
  component: ProduseIndex,
  head: ({ params }) => {
    const t = tFor(params.locale)
    return seo({ title: `${t.produse.heading} — Arti Studio`, description: t.produse.indexSubtitle, path: '/produse', locale: params.locale })
  },
})

function ProduseIndex() {
  const { t } = useI18n()
  const p = t.produse
  return (
    <>
      <div className="flex items-end justify-between gap-6 mb-10 pb-4 border-b hairline-soft">
        <p className="eyebrow">{p.categoriesAllLabel}</p>
        <p className="text-xs tabular-nums" style={{ color: 'var(--color-muted)' }}>
          {products.length} {products.length === 1 ? p.itemSingular : p.itemPlural}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </>
  )
}
