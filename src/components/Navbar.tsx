import { Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'
import Logo from './Logo'

type NavTo =
  | '/$locale'
  | '/$locale/despre'
  | '/$locale/servicii'
  | '/$locale/portofoliu'
  | '/$locale/magazin'
  | '/$locale/contact'

export default function Navbar() {
  const { locale, t } = useI18n()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const sentinel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sentinel.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { rootMargin: '-8px 0px 0px 0px', threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const links: ReadonlyArray<{ to: NavTo; label: string }> = [
    { to: '/$locale', label: t.nav.home },
    { to: '/$locale/despre', label: t.nav.despre },
    { to: '/$locale/servicii', label: t.nav.servicii },
    { to: '/$locale/portofoliu', label: t.nav.portofoliu },
    { to: '/$locale/magazin', label: t.nav.magazin },
    { to: '/$locale/contact', label: t.nav.contact },
  ]

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="absolute top-0 left-0 h-px w-px" />
      <nav data-scrolled={scrolled} className="nav-sticky sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between gap-6">
          <Link to="/$locale" params={{ locale }} className="shrink-0 text-text" aria-label="Arti Studio">
            <Logo size="sm" />
          </Link>

          <ul className="hidden lg:flex items-center gap-7">
            {links.slice(0, -1).map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  params={{ locale }}
                  className="nav-text nav-link text-text hover:text-accent transition-colors inline-flex items-center min-h-11"
                  activeOptions={{ exact: link.to === '/$locale' }}
                  activeProps={{ 'data-active': 'true' } as Record<string, string>}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <ThemeToggle />
            <LanguageSwitcher />
            <Link
              to="/$locale/contact"
              params={{ locale }}
              className="btn btn-outline"
            >
              {t.nav.ctaQuote}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            className="lg:hidden w-11 h-11 inline-flex items-center justify-center hairline-frame"
          >
            <BurgerIcon open={open} />
          </button>
        </div>

        <div
          id="mobile-nav"
          className={`lg:hidden grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
        >
          <div className="overflow-hidden">
            <div className="px-6 py-6 flex flex-col gap-4 border-t hairline bg-bg">
              <ul className="flex flex-col">
                {links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      params={{ locale }}
                      onClick={() => setOpen(false)}
                      activeOptions={{ exact: link.to === '/$locale' }}
                      className="nav-text block py-3.5 border-b hairline-soft"
                      activeProps={{ className: 'nav-text block py-3 border-b hairline-soft text-accent' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                to="/$locale/contact"
                params={{ locale }}
                onClick={() => setOpen(false)}
                className="btn btn-primary mt-2"
              >
                {t.nav.ctaQuote}
              </Link>
              <div className="flex items-center gap-3 mt-2">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      {open ? (
        <>
          <line x1="5" y1="5" x2="19" y2="19" />
          <line x1="19" y1="5" x2="5" y2="19" />
        </>
      ) : (
        <>
          <line x1="4" y1="8" x2="20" y2="8" />
          <line x1="4" y1="16" x2="20" y2="16" />
        </>
      )}
    </svg>
  )
}
