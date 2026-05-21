import { createFileRoute } from '@tanstack/react-router'
import { useI18n } from '../i18n'
import { seo } from '../lib/seo'
import { GoldPeriod } from '../components/SectionHeader'
import { pad2 } from '../lib/format'
import type ro from '../i18n/locales/ro'

const translations = import.meta.glob('../i18n/locales/*.ts', { eager: true }) as Record<string, { default: typeof ro }>
function tFor(locale: string) {
  return (translations[`../i18n/locales/${locale}.ts`] ?? translations[`../i18n/locales/ro.ts`]).default
}

export const Route = createFileRoute('/$locale/ghid')({
  component: GhidPage,
  head: ({ params }) => {
    const t = tFor(params.locale)
    return seo({ title: t.ghid.seoTitle, description: t.ghid.seoDescription, path: '/ghid', locale: params.locale })
  },
})

function GhidPage() {
  const { t } = useI18n()
  const g = t.ghid

  return (
    <>
      <section className="border-b hairline">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32 enter-stagger">
          <p className="eyebrow mb-6">{g.eyebrow}</p>
          <h1 className="serif text-5xl md:text-7xl leading-[1.05] max-w-3xl mb-8 text-balance">
            <GoldPeriod text={g.heading} />
          </h1>
          <p className="text-base md:text-lg max-w-2xl text-muted">
            {g.subtitle}
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <ol className="flex flex-col gap-12">
            {g.steps.map((step, i) => (
              <li key={step.title} className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 md:gap-10 items-start border-t hairline pt-8">
                <p className="serif text-5xl md:text-6xl text-accent tabular-nums leading-none">
                  {pad2(i + 1)}
                </p>
                <div>
                  <h3 className="serif text-2xl md:text-3xl mb-3">{step.title.replace(/^\d+ — /, '')}</h3>
                  <p className="text-base leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t hairline bg-surface">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-20 md:py-24">
          <p className="eyebrow mb-4">{g.tipsEyebrow}</p>
          <h2 className="serif text-3xl md:text-5xl leading-[1.05] max-w-3xl mb-10">
            <GoldPeriod text={g.tipsHeading} />
          </h2>
          <ul className="flex flex-col gap-4">
            {g.tips.map((tip) => (
              <li key={tip} className="flex items-start gap-3 border-t hairline-soft pt-4">
                <span className="text-accent mt-1.5">·</span>
                <p className="text-base leading-relaxed text-muted">
                  {tip}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
