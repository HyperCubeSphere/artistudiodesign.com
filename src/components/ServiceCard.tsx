interface ServiceCardProps {
  number: string
  title: string
  description: string
}

export default function ServiceCard({ number, title, description }: ServiceCardProps) {
  return (
    <article className="group py-10 px-6 md:px-8 border-t hairline transition-colors hover:bg-[var(--color-surface)]">
      <p className="eyebrow mb-6 tabular-nums">— {number}</p>
      <h3 className="serif text-2xl md:text-[28px] leading-[1.15] mb-4 group-hover:text-[var(--color-accent)] transition-colors">
        {title}
      </h3>
      <p className="text-sm leading-relaxed max-w-md" style={{ color: 'var(--color-muted)' }}>
        {description}
      </p>
    </article>
  )
}
