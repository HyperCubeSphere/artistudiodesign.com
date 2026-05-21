interface ServiceCardProps {
  number: string
  title: string
  description: string
}

export default function ServiceCard({ number, title, description }: ServiceCardProps) {
  return (
    <article className="grid grid-cols-[64px_1fr] md:grid-cols-[88px_1fr] gap-x-6 md:gap-x-8 py-10 border-t hairline">
      <span
        className="serif text-4xl md:text-6xl tabular-nums leading-none"
        style={{ color: 'var(--color-accent)' }}
      >
        {number}
      </span>
      <div className="flex flex-col gap-3 pt-1 md:pt-2">
        <h3 className="serif text-2xl md:text-3xl leading-tight">{title}</h3>
        <p className="text-base leading-relaxed max-w-prose" style={{ color: 'var(--color-muted)' }}>
          {description}
        </p>
      </div>
    </article>
  )
}
