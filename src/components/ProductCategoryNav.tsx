import { Link } from '@tanstack/react-router'
import { useI18n } from '../i18n'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'
import Logo from './Logo'

/**
 * Variant of the main Navbar used on /produse routes.
 * Mirrors the second reference image: Acasă · Produse · Despre · Ghid · Contact + search/account icons.
 */
export default function ProductCategoryNav() {
  const { locale, t } = useI18n()

  return (
    <nav className="border-b hairline-soft" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between gap-6">
        <Link to="/$locale" params={{ locale }} className="shrink-0 text-[var(--color-text)]" aria-label="Arti Studio">
          <Logo size="sm" />
        </Link>

        <ul className="hidden md:flex items-center gap-7">
          <li><Link to="/$locale" params={{ locale }} className="nav-text nav-link" activeOptions={{ exact: true }} activeProps={{ 'data-active': 'true' } as Record<string, string>}>{t.nav.home}</Link></li>
          <li><Link to="/$locale/produse" params={{ locale }} className="nav-text nav-link" activeProps={{ 'data-active': 'true' } as Record<string, string>}>{t.nav.produse}</Link></li>
          <li><Link to="/$locale/despre" params={{ locale }} className="nav-text nav-link" activeProps={{ 'data-active': 'true' } as Record<string, string>}>{t.nav.despre}</Link></li>
          <li><Link to="/$locale/ghid" params={{ locale }} className="nav-text nav-link" activeProps={{ 'data-active': 'true' } as Record<string, string>}>{t.nav.ghid}</Link></li>
          <li><Link to="/$locale/contact" params={{ locale }} className="nav-text nav-link" activeProps={{ 'data-active': 'true' } as Record<string, string>}>{t.nav.contact}</Link></li>
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  )
}
