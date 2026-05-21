import { createFileRoute, Link } from '@tanstack/react-router'
import { defaultLocale } from '../i18n/config'

export const Route = createFileRoute('/404')({
  component: NotFoundPage,
  head: () => ({
    meta: [{ title: '404 — Arti Studio' }],
  }),
})

function NotFoundPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 text-center flex flex-col items-center">
      <p className="eyebrow mb-4">404</p>
      <h1 className="serif text-5xl md:text-6xl mb-6">Pagina nu a fost găsită.</h1>
      <p className="text-sm max-w-md mb-8" style={{ color: 'var(--color-muted)' }}>
        Pagina căutată nu există sau a fost mutată.
      </p>
      <Link to="/$locale" params={{ locale: defaultLocale }} className="btn btn-primary">
        Înapoi acasă
      </Link>
    </div>
  )
}
