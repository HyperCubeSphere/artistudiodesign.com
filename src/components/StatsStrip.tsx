import { useI18n } from '../i18n'

/**
 * Large editorial stats strip — used on the home page above the About / Form
 * section. Numbers are huge, light-weight sans-serif on dark; a thin gold
 * hairline separates them from a quiet caption label below.
 */
export default function StatsStrip() {
  const { t } = useI18n()
  const stats = t.home.stats

  return (
    <section className="border-t hairline bg-bg">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28 grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-14">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center text-center">
            <p className="stat-numeral">{s.value}</p>
            <div aria-hidden="true" className="stat-rule mt-8 mb-6" />
            <p className="text-sm text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
