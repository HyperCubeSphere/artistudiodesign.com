import { createFileRoute, Link } from '@tanstack/react-router'
import { useI18n } from '../i18n'
import { seo } from '../lib/seo'
import { GoldPeriod } from '../components/SectionHeader'
import BrandMark from '../components/BrandMark'
import type ro from '../i18n/locales/ro'

const translations = import.meta.glob('../i18n/locales/*.ts', { eager: true }) as Record<string, { default: typeof ro }>
function tFor(locale: string) {
  return (translations[`../i18n/locales/${locale}.ts`] ?? translations[`../i18n/locales/ro.ts`]).default
}

export const Route = createFileRoute('/$locale/despre')({
  component: DesprePage,
  head: ({ params }) => {
    const t = tFor(params.locale)
    return seo({ title: t.despre.seoTitle, description: t.despre.seoDescription, path: '/despre', locale: params.locale })
  },
})

function DesprePage() {
  const { locale, t } = useI18n()
  const d = t.despre

  return (
    <>
      <section className="border-b hairline">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32 enter-stagger">
          <p className="eyebrow mb-6">{d.eyebrow}</p>
          <h1 className="serif text-5xl md:text-7xl leading-[1.05] max-w-3xl mb-8 text-balance">
            <GoldPeriod text={d.heading} />
          </h1>
          <p className="text-base md:text-lg max-w-2xl" style={{ color: 'var(--color-muted)' }}>
            {d.subtitle}
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="eyebrow mb-4">{d.storyEyebrow}</p>
            <h2 className="serif text-3xl md:text-4xl leading-[1.1] mb-4">
              <GoldPeriod text={d.storyHeading} />
            </h2>
            <div className="mt-6 md:hidden">
              <BrandMark size={80} />
            </div>
          </div>
          <div className="md:col-span-2 flex flex-col gap-5 max-w-2xl">
            {d.storyParagraphs.map((p) => (
              <p key={p} className="text-base leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t hairline py-20 md:py-24" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <p className="eyebrow mb-4">{d.valuesEyebrow}</p>
          <h2 className="serif text-3xl md:text-5xl leading-[1.05] max-w-3xl mb-12">
            <GoldPeriod text={d.valuesHeading} />
          </h2>
          <ul className="border-t hairline">
            {d.values.map((v, i) => (
              <li
                key={v.title}
                className="grid grid-cols-[40px_1fr] md:grid-cols-[80px_minmax(0,1.2fr)_minmax(0,2fr)] gap-x-6 md:gap-x-12 gap-y-3 py-10 border-b hairline"
              >
                <span
                  className="serif text-3xl md:text-5xl tabular-nums leading-none"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="serif text-2xl md:text-3xl leading-tight col-start-2 md:col-start-2">
                  {v.title}
                </h3>
                <p
                  className="text-base leading-relaxed col-start-2 md:col-start-3 md:row-start-1 max-w-prose"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {v.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <p className="eyebrow mb-4">{d.statsEyebrow}</p>
          <h2 className="serif text-3xl md:text-5xl leading-[1.05] max-w-3xl mb-12">
            <GoldPeriod text={d.statsHeading} />
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 border-t hairline">
            {d.stats.map((s) => (
              <div key={s.label} className="py-8 px-2 border-r last:border-r-0 hairline">
                <p className="serif text-5xl md:text-6xl text-[var(--color-accent)] tabular-nums mb-2">{s.value}</p>
                <p className="nav-text text-xs" style={{ color: 'var(--color-muted)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t hairline">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="serif text-3xl md:text-5xl leading-[1.05] max-w-2xl">
            <GoldPeriod text={d.ctaHeading} />
          </h2>
          <Link to="/$locale/contact" params={{ locale }} className="btn btn-primary self-start md:self-end">
            {d.ctaButton}
          </Link>
        </div>
      </section>
    </>
  )
}
