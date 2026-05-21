import { Link, rootRouteId, useMatch, useRouter } from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter()
  const isRoot = useMatch({ strict: false, select: (state) => state.id === rootRouteId })

  return (
    <div className="min-w-0 flex-1 max-w-[1400px] mx-auto px-6 md:px-10 py-24 flex flex-col items-center text-center">
      <p className="eyebrow mb-4">Error</p>
      <h1 className="serif text-5xl md:text-6xl mb-6">Ceva nu a funcționat.</h1>
      <p className="text-sm max-w-md mb-8 text-muted">
        {error instanceof Error ? error.message : 'A apărut o eroare neașteptată.'}
      </p>
      <div className="flex gap-3 items-center flex-wrap justify-center">
        <button onClick={() => router.invalidate()} className="btn btn-primary">
          Încearcă din nou
        </button>
        {isRoot ? (
          <Link to="/" className="btn btn-outline">
            Acasă
          </Link>
        ) : (
          <button onClick={() => window.history.back()} className="btn btn-outline">
            Înapoi
          </button>
        )}
      </div>
    </div>
  )
}
