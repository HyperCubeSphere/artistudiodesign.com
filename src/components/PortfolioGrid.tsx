import { Link } from '@tanstack/react-router'
import { useI18n } from '../i18n'
import { homePortfolioPicks, localeAlt } from '../content/images'
import type { Locale, PortfolioCategorySlug } from '../i18n/config'

interface PortfolioGridProps {
  variant?: 'home' | 'full'
}

export default function PortfolioGrid({ variant = 'home' }: PortfolioGridProps) {
  const { locale, t } = useI18n()
  const items = t.home.portfolio.items

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {items.map((entry) => {
        const pick = homePortfolioPicks.find((p) => p.category === entry.category)
        if (!pick) return null
        return (
          <Link
            key={entry.category}
            to="/$locale/portofoliu/$category"
            params={{ locale, category: entry.category as PortfolioCategorySlug }}
            className="portfolio-card group block"
          >
            <div className="aspect-[4/5] relative overflow-hidden">
              <img
                src={pick.image.src}
                alt={localeAlt(pick.image, locale as Locale)}
                loading={variant === 'home' ? 'lazy' : 'eager'}
                decoding="async"
                className="portfolio-img absolute inset-0 w-full h-full object-cover photo-moody-soft"
              />
            </div>
            <div className="pt-4">
              <h3 className="serif text-xl md:text-2xl mb-1 group-hover:text-[var(--color-accent)] transition-colors">
                {entry.title}
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                {entry.caption}
              </p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
