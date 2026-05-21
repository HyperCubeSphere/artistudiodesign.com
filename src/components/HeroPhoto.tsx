import { Link } from '@tanstack/react-router'
import { useI18n } from '../i18n'
import { GoldPeriod } from './SectionHeader'
import { homeHero, localeAlt } from '../content/images'
import type { Locale } from '../i18n/config'

export default function HeroPhoto() {
  const { locale, t } = useI18n()
  const h = t.home

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex flex-col -mt-20 pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={homeHero.src}
          alt={localeAlt(homeHero, locale as Locale)}
          className="absolute inset-0 w-full h-full object-cover hero-drift photo-moody"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 hero-scrim" />
      </div>

      <div className="relative z-10 flex-1 max-w-[1400px] w-full mx-auto px-6 md:px-10 flex flex-col justify-center pt-24 pb-32 enter-stagger">
        <p className="eyebrow mb-6">{h.eyebrow}</p>
        <h1 className="serif text-[44px] leading-[1.02] md:text-[88px] lg:text-[108px] md:leading-[0.98] mb-8 max-w-5xl text-[var(--color-text)]">
          <GoldPeriod text={h.heading} />
        </h1>
        <p className="text-base md:text-lg max-w-xl mb-10" style={{ color: 'var(--color-muted)' }}>
          {h.subtitle}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/$locale/servicii" params={{ locale }} className="btn btn-primary">
            {h.ctaPrimary}
            <ArrowRight />
          </Link>
          <Link to="/$locale/portofoliu" params={{ locale }} className="btn btn-outline">
            {h.ctaSecondary}
          </Link>
        </div>
      </div>

    </section>
  )
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <line x1="2" y1="8" x2="14" y2="8" />
      <polyline points="10 4 14 8 10 12" />
    </svg>
  )
}
