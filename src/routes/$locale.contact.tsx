import { createFileRoute } from '@tanstack/react-router'
import { useI18n } from '../i18n'
import { seo } from '../lib/seo'
import { GoldPeriod } from '../components/SectionHeader'
import ContactForm from '../components/ContactForm'
import type ro from '../i18n/locales/ro'

const translations = import.meta.glob('../i18n/locales/*.ts', { eager: true }) as Record<string, { default: typeof ro }>
function tFor(locale: string) {
  return (translations[`../i18n/locales/${locale}.ts`] ?? translations[`../i18n/locales/ro.ts`]).default
}

interface ContactSearch {
  produs?: string
  subiect?: string
}

export const Route = createFileRoute('/$locale/contact')({
  component: ContactPage,
  validateSearch: (search: Record<string, unknown>): ContactSearch => ({
    produs: typeof search.produs === 'string' ? search.produs : undefined,
    subiect: typeof search.subiect === 'string' ? search.subiect : undefined,
  }),
  head: ({ params }) => {
    const t = tFor(params.locale)
    return seo({ title: t.contact.seoTitle, description: t.contact.seoDescription, path: '/contact', locale: params.locale })
  },
})

function ContactPage() {
  const { t } = useI18n()
  const { produs, subiect } = Route.useSearch()
  const c = t.contact

  return (
    <>
      <section className="border-b hairline">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-28 enter-stagger">
          <p className="eyebrow mb-6">{c.eyebrow}</p>
          <h1 className="serif text-5xl md:text-7xl leading-[1.05] max-w-3xl mb-8 text-balance">
            <GoldPeriod text={c.heading} />
          </h1>
          <p className="text-base md:text-lg max-w-2xl text-muted">
            {c.subtitle}
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16">
          <div>
            <p className="eyebrow mb-6">{c.formEyebrow}</p>
            <ContactForm prefillProduct={produs} prefillSubject={subiect} />
          </div>
          <aside className="flex flex-col gap-10">
            <div>
              <p className="eyebrow mb-5">{c.detailsEyebrow}</p>
              <ul className="flex flex-col">
                {c.info.map((info) => (
                  <li key={`${info.label}-${info.value}`} className="border-t hairline py-4">
                    <p className="eyebrow-sm text-muted-2">
                      {info.label}
                    </p>
                    <p className="text-sm mt-1">{info.value}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-5">{c.socialsEyebrow}</p>
              <ul className="flex flex-col">
                {c.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block border-t hairline py-4 text-sm hover:text-accent transition-colors"
                    >
                      {s.label} →
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
