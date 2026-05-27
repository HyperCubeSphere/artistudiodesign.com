import type { ServiceImageRef } from '../content/images'
import { pickAlt } from '../content/images'
import ServicePlaceholder from './ServicePlaceholder'

interface ServiceCardProps {
  slot: string
  image: ServiceImageRef
  title: string
  description: string
  locale: string
}

export default function ServiceCard({ slot, image, title, description, locale }: ServiceCardProps) {
  const alt = pickAlt({ src: image.src ?? '', alt: image.alt }, locale)
  return (
    <article className="grid grid-cols-[96px_1fr] md:grid-cols-[160px_1fr] gap-x-6 md:gap-x-10 py-10 border-t hairline">
      <div className="aspect-square overflow-hidden bg-surface">
        {image.src ? (
          <img src={image.src} alt={alt} loading="lazy" className="w-full h-full object-cover" />
        ) : (
          <ServicePlaceholder slot={slot} title={alt} className="w-full h-full" />
        )}
      </div>
      <div className="flex flex-col gap-3 pt-1 md:pt-2">
        <h3 className="serif text-2xl md:text-3xl leading-tight">{title}</h3>
        <p className="text-base leading-relaxed max-w-prose text-muted">
          {description}
        </p>
      </div>
    </article>
  )
}
