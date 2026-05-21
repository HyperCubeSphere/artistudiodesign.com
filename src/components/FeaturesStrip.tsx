import { useI18n } from '../i18n'

export default function FeaturesStrip() {
  const { t } = useI18n()
  const items = t.home.features
  return (
    <section
      className="border-t border-b hairline"
      style={{ backgroundColor: 'var(--color-surface-2)' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
        {items.map((item, i) => (
          <div key={item.title} className="flex flex-col gap-3">
            <span
              aria-hidden="true"
              className="h-px w-12"
              style={{ backgroundColor: 'var(--color-accent)' }}
            />
            <p className="eyebrow text-[10px] tabular-nums">— {String(i + 1).padStart(2, '0')}</p>
            <h3 className="serif text-xl md:text-2xl leading-tight">{item.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
