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
    <article className="product-card group flex flex-col gap-4">
      <Link
        to="/$locale/produse/$slug"
        params={{ locale, slug: product.slug }}
        aria-label={name}
        className="product-img-wrap block"
      >
        <ProductPlaceholder slug={product.slug} title={name} className="block w-full h-full" />
      </Link>
      <div className="flex flex-col gap-2">
        {category ? <p className="eyebrow-sm">{category.label}</p> : null}
        <h3 className="serif text-xl md:text-2xl leading-tight">
          <Link
            to="/$locale/produse/$slug"
            params={{ locale, slug: product.slug }}
            className="hover:text-accent transition-colors"
          >
            {name}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed line-clamp-3 text-muted">
          {desc}
        </p>
        <div className="flex items-baseline justify-between gap-4 mt-1 pt-3 border-t hairline-soft">
          <span className="tabular-nums text-sm text-muted">
            {product.priceLei} {t.produse.priceLabel}
          </span>
          <Link
            to="/$locale/contact"
            params={{ locale }}
            search={{ produs: product.slug } as Record<string, string>}
            className="nav-text text-accent hover:text-accent-hover transition-colors"
          >
            {t.produse.ctaProduct} →
          </Link>
        </div>
      </div>
    </article>
  )
}
