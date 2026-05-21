import { useI18n } from '../i18n'

const icons: Array<(p: { className?: string }) => React.ReactNode> = [
  (p) => (
    <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1" {...p} aria-hidden="true">
      <rect x="4" y="10" width="18" height="12" />
      <path d="M22 14h4l4 4v4h-8Z" />
      <circle cx="9" cy="24" r="2" />
      <circle cx="25" cy="24" r="2" />
    </svg>
  ),
  (p) => (
    <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1" {...p} aria-hidden="true">
      <path d="M16 4 24 8v6c0 6-4 11-8 14-4-3-8-8-8-14V8Z" />
      <path d="m12 16 3 3 6-7" />
    </svg>
  ),
  (p) => (
    <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1" {...p} aria-hidden="true">
      <rect x="6" y="12" width="20" height="14" />
      <path d="M10 12V8a6 6 0 0 1 12 0v4" />
    </svg>
  ),
  (p) => (
    <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1" {...p} aria-hidden="true">
      <circle cx="16" cy="14" r="8" />
      <path d="m11 17 4 3 6-8" />
      <path d="M12 22 8 30l8-3 8 3-4-8" />
    </svg>
  ),
]

export default function BenefitsRow() {
  const { t } = useI18n()
  const items = t.produse.benefitsRow
  return (
    <section
      className="border-t hairline"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item, i) => {
          const Icon = icons[i] ?? icons[0]
          return (
            <div key={item.title} className="flex items-center gap-4">
              <span className="text-[var(--color-accent)]">{Icon({})}</span>
              <div>
                <p className="nav-text text-xs mb-1">{item.title}</p>
                <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                  {item.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
