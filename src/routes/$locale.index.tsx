import { createFileRoute, Link } from '@tanstack/react-router'
import HeroPhoto from '../components/HeroPhoto'
import FeaturesStrip from '../components/FeaturesStrip'
import PortfolioGrid from '../components/PortfolioGrid'
import AboutForm from '../components/AboutForm'
import SectionHeader from '../components/SectionHeader'
import { useI18n } from '../i18n'
import { seo } from '../lib/seo'
import type ro from '../i18n/locales/ro'

const translations = import.meta.glob('../i18n/locales/*.ts', { eager: true }) as Record<string, { default: typeof ro }>

function tFor(locale: string) {
  return (translations[`../i18n/locales/${locale}.ts`] ?? translations[`../i18n/locales/ro.ts`]).default
}

export const Route = createFileRoute('/$locale/')({
  component: HomePage,
  head: ({ params }) => {
    const t = tFor(params.locale)
    return seo({
      title: t.home.seoTitle,
      description: t.home.seoDescription,
      path: '/',
      locale: params.locale,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Arti Studio',
        url: 'https://artistudiodesign.com',
        telephone: '+40775140079',
        email: 'info@artistudiodesign.com',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Oradea',
          addressRegion: 'Bihor',
          addressCountry: 'RO',
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
        sameAs: [
          'https://www.facebook.com/profile.php?id=100089499761060',
          'https://www.instagram.com/arti_studio_design/',
        ],
      },
    })
  },
})

function HomePage() {
  const { locale, t } = useI18n()
  const h = t.home
  return (
    <>
      <HeroPhoto />

      <span id="main-content-after-hero" aria-hidden="true" />

      <FeaturesStrip />

      <section className="py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHeader
            eyebrow={h.portfolio.eyebrow}
            title={h.portfolio.heading}
            action={
              <Link to="/$locale/portofoliu" params={{ locale }} className="btn btn-outline">
                {h.portfolio.ctaAll}
                <ArrowRight />
              </Link>
            }
          />
          <PortfolioGrid />
        </div>
      </section>

      <AboutForm />
    </>
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
