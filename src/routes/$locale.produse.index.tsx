import { createFileRoute } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { useI18n } from '../i18n'
import { seo } from '../lib/seo'
import { products } from '../content/products'
import ProductCard from '../components/ProductCard'
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
  const { locale, t } = useI18n()
  const p = t.produse
  const [sort, setSort] = useState<string>('default')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const sorted = useMemo(() => {
    const arr = [...products]
    if (sort === 'price-asc') arr.sort((a, b) => a.priceLei - b.priceLei)
    else if (sort === 'price-desc') arr.sort((a, b) => b.priceLei - a.priceLei)
    else if (sort === 'name-asc')
      arr.sort((a, b) => a.name[locale === 'en' ? 'en' : 'ro'].localeCompare(b.name[locale === 'en' ? 'en' : 'ro']))
    return arr
  }, [sort, locale])

  return (
    <>
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b hairline pb-6">
        <div>
          <h1 className="serif text-4xl md:text-5xl leading-[1.05] title-rule">
            {p.heading}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-2 text-xs" style={{ color: 'var(--color-muted)' }}>
            <span className="sr-only">{p.sortLabel}</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="input"
              style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem', minHeight: 0, width: 'auto' }}
            >
              {p.sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </label>
          <div className="flex border hairline" style={{ borderWidth: 1 }} role="radiogroup" aria-label="View">
            <button
              type="button"
              role="radio"
              aria-checked={view === 'grid'}
              onClick={() => setView('grid')}
              className="w-10 h-10 inline-flex items-center justify-center transition-colors"
              style={{
                backgroundColor: view === 'grid' ? 'var(--color-accent)' : 'transparent',
                color: view === 'grid' ? 'var(--color-accent-ink)' : 'var(--color-text)',
              }}
              aria-label={p.viewGrid}
            >
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <rect x="2" y="2" width="5" height="5" />
                <rect x="9" y="2" width="5" height="5" />
                <rect x="2" y="9" width="5" height="5" />
                <rect x="9" y="9" width="5" height="5" />
              </svg>
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={view === 'list'}
              onClick={() => setView('list')}
              className="w-10 h-10 inline-flex items-center justify-center transition-colors border-l hairline"
              style={{
                borderLeftWidth: 1,
                backgroundColor: view === 'list' ? 'var(--color-accent)' : 'transparent',
                color: view === 'list' ? 'var(--color-accent-ink)' : 'var(--color-text)',
              }}
              aria-label={p.viewList}
            >
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <line x1="2" y1="4" x2="14" y2="4" />
                <line x1="2" y1="8" x2="14" y2="8" />
                <line x1="2" y1="12" x2="14" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div
        className={
          view === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-14'
            : 'flex flex-col gap-10'
        }
      >
        {sorted.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </>
  )
}
