import { Link } from '@tanstack/react-router'
import { useI18n } from '../i18n'
import type { Product } from '../content/products'
import type { Locale } from '../i18n/config'
import ProductPlaceholder from './ProductPlaceholder'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { locale, t } = useI18n()
  const ll = locale as Locale
  const name = product.name[ll === 'en' ? 'en' : 'ro']
  const desc = product.shortDescription[ll === 'en' ? 'en' : 'ro']
  const category = t.produse.categories.find((c) => c.slug === product.category)

  return (
    <article className="product-card group flex flex-col gap-5">
      <Link
        to="/$locale/produse/$slug"
        params={{ locale, slug: product.slug }}
        aria-label={name}
        className="product-img-wrap block"
      >
        <ProductPlaceholder slug={product.slug} title={name} className="block w-full h-full" />
        {product.badge ? (
          <span
            className="absolute top-3 left-3 px-2 py-1 text-[10px] uppercase tracking-widest"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-accent-ink)',
              letterSpacing: '0.18em',
            }}
          >
            {product.badge[ll === 'en' ? 'en' : 'ro']}
          </span>
        ) : null}
      </Link>
      <div className="flex flex-col gap-3">
        {category ? (
          <p className="eyebrow text-[10px]">{category.label}</p>
        ) : null}
        <Link
          to="/$locale/produse/$slug"
          params={{ locale, slug: product.slug }}
          className="serif text-xl md:text-2xl leading-tight hover:text-[var(--color-accent)] transition-colors"
        >
          {name}
        </Link>
        <p className="text-sm leading-relaxed line-clamp-3" style={{ color: 'var(--color-muted)' }}>
          {desc}
        </p>
        <p className="serif text-3xl tabular-nums mt-1">
          {product.priceLei},00 <span className="text-base align-baseline" style={{ color: 'var(--color-muted)' }}>{t.produse.priceLabel}</span>
        </p>
        <Link
          to="/$locale/contact"
          params={{ locale }}
          search={{ produs: product.slug } as Record<string, string>}
          className="btn btn-primary mt-1"
        >
          {t.produse.ctaProduct}
          <CartIcon />
        </Link>
      </div>
    </article>
  )
}

function CartIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M2 3h2l2 9h7l2-6H5" />
      <circle cx="7" cy="14" r="1" />
      <circle cx="13" cy="14" r="1" />
    </svg>
  )
}
