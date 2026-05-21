import { createFileRoute } from '@tanstack/react-router'
import { useI18n } from '../i18n'
import { seo } from '../lib/seo'
import { GoldPeriod } from '../components/SectionHeader'
import type ro from '../i18n/locales/ro'

const translations = import.meta.glob('../i18n/locales/*.ts', { eager: true }) as Record<string, { default: typeof ro }>
function tFor(locale: string) {
  return (translations[`../i18n/locales/${locale}.ts`] ?? translations[`../i18n/locales/ro.ts`]).default
}

export const Route = createFileRoute('/$locale/confidentialitate')({
  component: ConfidentialitatePage,
  head: ({ params }) => {
    const t = tFor(params.locale)
    return seo({ title: t.confidentialitate.seoTitle, description: t.confidentialitate.seoDescription, path: '/confidentialitate', locale: params.locale })
  },
})

function ConfidentialitatePage() {
  const { t } = useI18n()
  const p = t.confidentialitate

  return (
    <>
      <section className="border-b hairline">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-24 md:py-28 enter-stagger">
          <p className="eyebrow mb-6">{p.eyebrow}</p>
          <h1 className="serif text-5xl md:text-6xl leading-[1.05] mb-6 text-balance">
            <GoldPeriod text={p.title + '.'} />
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-muted-2)' }}>{p.lastUpdated}</p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 lux-prose">
          <p>{p.intro}</p>
          {p.sections.map((s) => (
            <section key={s.number}>
              <h2>{s.number}. {s.title}</h2>
              <p>{s.content}</p>
            </section>
          ))}
        </div>
      </section>
    </>
  )
}
