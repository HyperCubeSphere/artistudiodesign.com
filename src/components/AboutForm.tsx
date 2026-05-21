import { Link } from '@tanstack/react-router'
import { useI18n } from '../i18n'
import { GoldPeriod } from './SectionHeader'
import BrandMark from './BrandMark'
import QuoteForm from './QuoteForm'

export default function AboutForm() {
  const { locale, t } = useI18n()
  const a = t.home.about
  const q = t.home.quote

  return (
    <section
      className="border-t hairline"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-24 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
        <div className="flex flex-col gap-5">
          <p className="eyebrow">{a.eyebrow}</p>
          <h2 className="serif text-3xl md:text-4xl leading-[1.1]">
            <GoldPeriod text={a.heading} />
          </h2>
          <p className="text-sm leading-relaxed max-w-md" style={{ color: 'var(--color-muted)' }}>
            {a.paragraph}
          </p>
          <Link to="/$locale/despre" params={{ locale }} className="btn btn-outline self-start mt-2">
            {a.cta}
            <ArrowRight />
          </Link>
        </div>

        <div className="flex items-center justify-center py-6 md:py-0 order-first md:order-none relative">
          <BrandMark size={140} wordmarkClass="text-[56px] md:text-[72px]" />
        </div>

        <div className="flex flex-col gap-5">
          <p className="eyebrow">{q.eyebrow}</p>
          <h2 className="serif text-3xl md:text-4xl leading-[1.1]">
            <GoldPeriod text={q.heading} />
          </h2>
          <QuoteForm />
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
