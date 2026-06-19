import { useI18n } from '../i18n'

export default function FeaturesStrip() {
  const { t } = useI18n()
  const items = t.home.features
  return (
    <section className="border-t border-b hairline bg-surface-2">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
        {items.map((item) => (
          <div key={item.title} className="flex flex-col">
            {/* Gold rule sits tight above the title so it reads as an eyebrow,
                not a floating decoration. Title-to-body keeps the wider gap. */}
            <span aria-hidden="true" className="h-px w-12 bg-accent" />
            <h2 className="serif text-xl md:text-2xl leading-tight mt-2">{item.title}</h2>
            <p className="text-sm leading-relaxed text-muted mt-3">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
