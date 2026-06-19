import { createFileRoute, Link } from '@tanstack/react-router'
import { useI18n } from '../i18n'
import { seo } from '../lib/seo'
import { GoldPeriod } from '../components/SectionHeader'
import ServiceCard from '../components/ServiceCard'
import type ro from '../i18n/locales/ro'

const translations = import.meta.glob('../i18n/locales/*.ts', { eager: true }) as Record<string, { default: typeof ro }>
function tFor(locale: string) {
  return (translations[`../i18n/locales/${locale}.ts`] ?? translations[`../i18n/locales/ro.ts`]).default
}

export const Route = createFileRoute('/$locale/servicii')({
  component: ServiciiPage,
  head: ({ params }) => {
    const t = tFor(params.locale)
    return seo({ title: t.servicii.seoTitle, description: t.servicii.seoDescription, path: '/servicii', locale: params.locale })
  },
})

function ServiciiPage() {
  const { locale, t } = useI18n()
  const s = t.servicii

  return (
    <>
      <section className="border-b hairline">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32 enter-stagger">
          <p className="eyebrow mb-6">{s.eyebrow}</p>
          <h1 className="serif text-5xl md:text-7xl leading-[1.05] max-w-3xl mb-8 text-balance">
            <GoldPeriod text={s.heading} />
          </h1>
          <p className="text-base md:text-lg max-w-2xl text-muted">
            {s.subtitle}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-3">
            <p className="eyebrow sticky top-28">{s.listEyebrow}</p>
          </div>
          <div className="md:col-span-9">
            {s.items.map((item) => (
              <ServiceCard key={item.number} number={item.number} title={item.title} description={item.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t hairline py-20 md:py-28 bg-surface">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <p className="eyebrow mb-4">{s.processEyebrow}</p>
          <h2 className="serif text-3xl md:text-5xl leading-[1.05] max-w-3xl mb-14">
            <GoldPeriod text={s.processHeading} />
          </h2>
          <ol className="flex flex-col">
            {s.process.map((step) => (
              <li
                key={step.number}
                className="flex flex-col md:flex-row md:items-baseline gap-3 md:gap-12 py-8 border-t hairline"
              >
                <span className="serif text-3xl md:text-5xl tabular-nums leading-none md:basis-32 shrink-0 text-accent">
                  {step.number}
                </span>
                <h3 className="serif text-2xl md:text-3xl leading-tight md:basis-80 shrink-0">{step.title}</h3>
                <p className="text-base leading-relaxed max-w-prose text-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t hairline">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="serif text-3xl md:text-5xl leading-[1.05] max-w-2xl">
            <GoldPeriod text={s.ctaHeading} />
          </h2>
          <Link to="/$locale/contact" params={{ locale }} className="btn btn-primary self-start md:self-end">
            {s.ctaButton}
          </Link>
        </div>
      </section>
    </>
  )
}
