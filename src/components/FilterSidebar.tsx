import { Link, useRouterState } from '@tanstack/react-router'
import { useI18n } from '../i18n'
import { products, categoryCount } from '../content/products'
import type { ProductCategorySlug } from '../i18n/config'

const categoryIcons: Record<ProductCategorySlug | 'toate', (p: { className?: string }) => React.ReactNode> = {
  toate: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" {...p} aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" />
      <rect x="13" y="3" width="8" height="8" />
      <rect x="3" y="13" width="8" height="8" />
      <rect x="13" y="13" width="8" height="8" />
    </svg>
  ),
  'curatare-mobilier': (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" {...p} aria-hidden="true">
      <path d="M5 21h14l-2-12H7Z" />
      <path d="M10 9V5a2 2 0 0 1 4 0v4" />
    </svg>
  ),
  'protectie-suprafete': (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" {...p} aria-hidden="true">
      <path d="M12 3 20 6v6c0 5-3 9-8 12-5-3-8-7-8-12V6Z" />
    </svg>
  ),
  'nano-coating': (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" {...p} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  'ingrijire-piele-vinil': (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" {...p} aria-hidden="true">
      <path d="M4 18c0-6 4-10 8-10s8 4 8 10" />
      <path d="M4 18h16" />
      <circle cx="12" cy="14" r="2" />
    </svg>
  ),
}

export default function FilterSidebar() {
  const { locale, t } = useI18n()
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  const onAll = pathname.endsWith('/produse') || pathname.endsWith('/produse/')

  return (
    <aside className="flex flex-col gap-10">
      <div>
        <p className="eyebrow mb-5">{t.produse.categoriesLabel}</p>
        <ul className="flex flex-col gap-1">
          <li>
            <Link
              to="/$locale/produse"
              params={{ locale }}
              className={`flex items-center justify-between gap-3 py-2.5 pl-3 pr-2 border-l hairline transition-colors ${onAll ? 'text-[var(--color-accent)] border-l-[var(--color-accent)]' : 'hover:text-[var(--color-accent)]'}`}
              style={{ borderLeftWidth: onAll ? '2px' : '1px' }}
              activeOptions={{ exact: true }}
            >
              <span className="inline-flex items-center gap-3">
                {categoryIcons.toate({})}
                <span className="text-sm">{t.produse.categoriesAllLabel}</span>
              </span>
              <span className="text-xs tabular-nums" style={{ color: 'var(--color-muted)' }}>
                {products.length}
              </span>
            </Link>
          </li>
          {t.produse.categories.map((cat) => (
            <li key={cat.slug}>
              <Link
                to="/$locale/produse/categorie/$slug"
                params={{ locale, slug: cat.slug }}
                className="flex items-center justify-between gap-3 py-2.5 pl-3 pr-2 border-l hairline hover:text-[var(--color-accent)] transition-colors"
                activeProps={{
                  className: 'flex items-center justify-between gap-3 py-2.5 pl-3 pr-2 border-l transition-colors text-[var(--color-accent)]',
                  style: { borderLeftColor: 'var(--color-accent)', borderLeftWidth: '2px' },
                }}
              >
                <span className="inline-flex items-center gap-3">
                  {categoryIcons[cat.slug as ProductCategorySlug]?.({})}
                  <span className="text-sm">{cat.label}</span>
                </span>
                <span className="text-xs tabular-nums" style={{ color: 'var(--color-muted)' }}>
                  {categoryCount(cat.slug as ProductCategorySlug)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="eyebrow mb-5">{t.produse.benefitsLabel}</p>
        <ul className="flex flex-col gap-4">
          {t.produse.benefits.map((b) => (
            <li key={b.title} className="flex items-start gap-3">
              <span className="text-[var(--color-accent)] mt-0.5">
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <polygon points="8 1 10 6 15 6.5 11 10 12 15 8 12.5 4 15 5 10 1 6.5 6 6" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-medium">{b.title}</p>
                <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                  {b.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="card p-6 flex flex-col gap-4" style={{ borderColor: 'var(--color-hairline)' }}>
        <span className="text-[var(--color-accent)]" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5" />
            <circle cx="12" cy="17" r="0.6" fill="currentColor" />
          </svg>
        </span>
        <h3 className="serif text-xl">{t.produse.supportTitle}</h3>
        <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
          {t.produse.supportBody}
        </p>
        <Link to="/$locale/contact" params={{ locale }} className="btn btn-primary self-start">
          {t.produse.supportCta}
        </Link>
      </div>
    </aside>
  )
}
