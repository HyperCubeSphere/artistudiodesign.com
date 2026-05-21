import { Link } from '@tanstack/react-router'
import { useI18n } from '../i18n'

export function NotFound({ children }: { children?: React.ReactNode }) {
  const { locale, t } = useI18n()
  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 flex flex-col items-center text-center">
      <p className="eyebrow mb-4">{t.notFound.eyebrow}</p>
      <h1 className="serif text-5xl md:text-6xl mb-6">{t.notFound.title}</h1>
      <div className="text-sm max-w-md mb-8" style={{ color: 'var(--color-muted)' }}>
        {children ?? <p>{t.notFound.message}</p>}
      </div>
      <div className="flex gap-3 items-center flex-wrap justify-center">
        <Link to="/$locale" params={{ locale }} className="btn btn-primary">
          {t.notFound.button}
        </Link>
        <button onClick={() => window.history.back()} className="btn btn-outline">
          {t.error.goBack}
        </button>
      </div>
    </div>
  )
}
