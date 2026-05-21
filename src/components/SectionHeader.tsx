import type { ReactNode } from 'react'

interface SectionHeaderProps {
  eyebrow: string
  title: string
  align?: 'left' | 'center'
  action?: ReactNode
}

export default function SectionHeader({ eyebrow, title, align = 'left', action }: SectionHeaderProps) {
  return (
    <div className={`flex flex-col gap-6 mb-10 md:mb-14 ${align === 'center' ? 'items-center text-center' : ''} md:flex-row md:items-end md:justify-between`}>
      <div>
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 className="serif text-4xl md:text-5xl lg:text-[56px] leading-[1.05] max-w-3xl text-balance">
          <GoldPeriod text={title} />
        </h2>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}

/**
 * Renders text where every '.' is wrapped in <span class="period"> for gold accent.
 */
export function GoldPeriod({ text }: { text: string }) {
  const parts = text.split(/(\.)/)
  return (
    <>
      {parts.map((p, i) =>
        p === '.' ? <span key={i} className="text-[var(--color-accent)]">.</span> : <span key={i}>{p}</span>,
      )}
    </>
  )
}
