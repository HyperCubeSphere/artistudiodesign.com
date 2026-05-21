import { createFileRoute, Link } from '@tanstack/react-router'
import { useI18n } from '../i18n'
import { seo } from '../lib/seo'
import { GoldPeriod } from '../components/SectionHeader'
import type ro from '../i18n/locales/ro'

const translations = import.meta.glob('../i18n/locales/*.ts', { eager: true }) as Record<string, { default: typeof ro }>
function tFor(locale: string) {
  return (translations[`../i18n/locales/${locale}.ts`] ?? translations[`../i18n/locales/ro.ts`]).default
}

export const Route = createFileRoute('/$locale/materiale')({
  component: MaterialePage,
  head: ({ params }) => {
    const t = tFor(params.locale)
    return seo({ title: t.materiale.seoTitle, description: t.materiale.seoDescription, path: '/materiale', locale: params.locale })
  },
})

function MaterialePage() {
  const { locale, t } = useI18n()
  const m = t.materiale

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
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
          {m.items.map((item, i) => (
            <article key={item.title} className="flex flex-col gap-3 border-t hairline pt-6">
              <p className="eyebrow text-[10px] tabular-nums">— {String(i + 1).padStart(2, '0')}</p>
              <h3 className="serif text-2xl">{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                {item.description}
              </p>
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
