import { useI18n } from '../i18n'

const icons: Array<(p: { className?: string }) => React.ReactNode> = [
  (p) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" {...p} aria-hidden="true">
      <rect x="2" y="7" width="13" height="10" />
      <path d="M15 11h4l3 3v3h-7Z" />
      <circle cx="6" cy="18" r="1.5" />
      <circle cx="18" cy="18" r="1.5" />
    </svg>
  ),
  (p) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" {...p} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 3 3 5-6" />
    </svg>
  ),
  (p) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" {...p} aria-hidden="true">
      <path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  ),
]

export default function UtilityBar() {
  const { t } = useI18n()
  const items = t.produse.utilityBar
  return (
    <div
      className="border-b hairline-soft text-xs"
      style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-muted)' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-3 flex flex-col md:flex-row md:justify-between gap-2 md:gap-6">
        {items.map((label, i) => {
          const Icon = icons[i] ?? icons[0]
          return (
            <span key={label} className="inline-flex items-center gap-2">
              <span className="text-[var(--color-accent)]">{Icon({})}</span>
              {label}
            </span>
          )
        })}
      </div>
    </div>
  )
}
