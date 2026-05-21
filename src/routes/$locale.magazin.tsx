import { createFileRoute, Link } from '@tanstack/react-router'
import { useI18n } from '../i18n'
import { seo } from '../lib/seo'
import { GoldPeriod } from '../components/SectionHeader'
import type ro from '../i18n/locales/ro'

const translations = import.meta.glob('../i18n/locales/*.ts', { eager: true }) as Record<string, { default: typeof ro }>
function tFor(locale: string) {
  return (translations[`../i18n/locales/${locale}.ts`] ?? translations[`../i18n/locales/ro.ts`]).default
}

export const Route = createFileRoute('/$locale/magazin')({
  component: MagazinPage,
  head: ({ params }) => {
    const t = tFor(params.locale)
    return seo({ title: t.magazin.seoTitle, description: t.magazin.seoDescription, path: '/magazin', locale: params.locale })
  },
})

function MagazinPage() {
  const { locale, t } = useI18n()
  const m = t.magazin

  return (
    <>
      <section className="border-b hairline">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32 enter-stagger">
          <p className="eyebrow mb-6">{m.eyebrow}</p>
          <h1 className="serif text-5xl md:text-7xl leading-[1.05] max-w-3xl mb-8 text-balance">
            <GoldPeriod text={m.heading} />
          </h1>
          <p className="text-base md:text-lg max-w-2xl" style={{ color: 'var(--color-muted)' }}>
            {m.subtitle}
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {m.categories.map((c, i) => (
            <article
              key={c.slug}
              className="portfolio-card group relative flex flex-col border hairline"
              style={{ borderWidth: 1 }}
            >
              {/* Folder tab — visually links this section to the Portofoliu treatment */}
              <span
                aria-hidden="true"
                className="absolute top-0 left-6 z-10 h-3 w-20 -translate-y-1/2"
                style={{ backgroundColor: 'var(--color-accent)' }}
              />
              <div
                className="aspect-[4/5] relative overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-surface)' }}
              >
                <CategoryIcon slug={c.slug} />
                <span
                  className="absolute top-4 right-4 px-2 py-1 text-[10px] uppercase tracking-widest"
                  style={{
                    color: 'var(--color-accent)',
                    border: '1px solid var(--color-accent)',
                    letterSpacing: '0.18em',
                  }}
                >
                  {m.comingSoon}
                </span>
              </div>
              <div className="pt-5 px-5 pb-6 flex flex-col gap-2">
                <p className="eyebrow text-[10px] tabular-nums">— {String(i + 1).padStart(2, '0')}</p>
                <h3 className="serif text-2xl md:text-3xl leading-tight">{c.label}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  {c.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t hairline" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="serif text-3xl md:text-5xl leading-[1.05] max-w-2xl">
            <GoldPeriod text={m.ctaHeading} />
          </h2>
          <Link to="/$locale/contact" params={{ locale }} className="btn btn-primary self-start md:self-end">
            {m.ctaButton}
          </Link>
        </div>
      </section>
    </>
  )
}

function CategoryIcon({ slug }: { slug: string }) {
  const stroke = 'var(--color-accent)'
  if (slug === 'curatenie') {
    return (
      <svg viewBox="0 0 80 80" width="64" height="64" fill="none" stroke={stroke} strokeWidth="1.4" aria-hidden="true">
        <rect x="26" y="32" width="28" height="36" />
        <rect x="32" y="20" width="16" height="12" />
        <rect x="36" y="12" width="8" height="8" />
        <line x1="32" y1="42" x2="48" y2="42" />
      </svg>
    )
  }
  if (slug === 'protectie') {
    return (
      <svg viewBox="0 0 80 80" width="64" height="64" fill="none" stroke={stroke} strokeWidth="1.4" aria-hidden="true">
        <path d="M40 10 L62 18 V40 C62 56 52 64 40 70 C28 64 18 56 18 40 V18 Z" />
        <path d="M30 40 L37 47 L51 33" />
      </svg>
    )
  }
  // textile
  return (
    <svg viewBox="0 0 80 80" width="64" height="64" fill="none" stroke={stroke} strokeWidth="1.4" aria-hidden="true">
      <path d="M14 22 C 24 14, 36 30, 46 22 C 56 14, 66 22, 66 22 L 66 60 C 56 68, 46 56, 36 60 C 26 64, 14 60, 14 60 Z" />
      <path d="M14 36 C 24 28, 36 44, 46 36 C 56 28, 66 36, 66 36" />
      <path d="M14 48 C 24 40, 36 56, 46 48 C 56 40, 66 48, 66 48" />
    </svg>
  )
}
