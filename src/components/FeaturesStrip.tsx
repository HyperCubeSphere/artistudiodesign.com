import { useI18n } from '../i18n'

const icons: Array<(props: { className?: string }) => React.ReactNode> = [
  (p) => (
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1" {...p}>
      <path d="M8 24 L24 8 M8 8 L24 24" />
      <rect x="6" y="6" width="20" height="20" />
    </svg>
  ),
  (p) => (
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1" {...p}>
      <rect x="6" y="6" width="20" height="20" />
      <line x1="12" y1="6" x2="12" y2="26" />
      <line x1="20" y1="6" x2="20" y2="26" />
      <line x1="6" y1="12" x2="26" y2="12" />
      <line x1="6" y1="20" x2="26" y2="20" />
    </svg>
  ),
  (p) => (
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1" {...p}>
      <circle cx="16" cy="16" r="10" />
      <circle cx="16" cy="16" r="3" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="16" y1="26" x2="16" y2="30" />
      <line x1="2" y1="16" x2="6" y2="16" />
      <line x1="26" y1="16" x2="30" y2="16" />
    </svg>
  ),
  (p) => (
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1" {...p}>
      <rect x="6" y="8" width="20" height="18" />
      <line x1="6" y1="14" x2="26" y2="14" />
      <line x1="10" y1="4" x2="10" y2="10" />
      <line x1="22" y1="4" x2="22" y2="10" />
      <circle cx="16" cy="20" r="2.5" />
    </svg>
  ),
]

export default function FeaturesStrip() {
  const { t } = useI18n()
  const items = t.home.features
  return (
    <section
      className="border-t border-b hairline"
      style={{ backgroundColor: 'var(--color-surface-2)' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {items.map((item, i) => {
          const Icon = icons[i] ?? icons[0]
          return (
            <div key={item.title} className="flex flex-col gap-4">
              <div className="text-[var(--color-accent)]">{Icon({})}</div>
              <h3 className="nav-text text-sm">{item.title}</h3>
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                {item.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
