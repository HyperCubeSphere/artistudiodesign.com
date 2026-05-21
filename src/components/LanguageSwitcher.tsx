import { useRouterState } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { locales, localeNames, type Locale, useI18n } from '../i18n'
import FlagIcon from './FlagIcon'

export default function LanguageSwitcher() {
  const { locale } = useI18n()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [])

  const currentPath = pathname.replace(new RegExp(`^/${locale}`), '') || '/'

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`${locale.toUpperCase()} — switch language`}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="h-10 px-3 inline-flex items-center gap-2 hairline-frame hover:border-accent hover:text-accent transition-colors"
      >
        <FlagIcon locale={locale as Locale} className="w-4 h-auto" />
        <span className="nav-text">{locale.toUpperCase()}</span>
        <svg viewBox="0 0 12 8" width="9" height="6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <polyline points="1 1 6 7 11 1" />
        </svg>
      </button>
      {open && (
        <div
          role="listbox"
          aria-label="Language"
          className="absolute right-0 top-full mt-1 hairline-frame bg-bg z-[60] min-w-[180px] max-h-[320px] overflow-auto"
        >
          {locales.map((l) => (
            <a
              key={l}
              href={`/${l}${currentPath === '/' ? '' : currentPath}`}
              role="option"
              aria-selected={l === locale}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2.5 px-3 py-2.5 text-sm hover:bg-surface transition-colors ${l === locale ? 'text-accent' : 'text-text'}`}
            >
              <FlagIcon locale={l} className="w-4 h-auto shrink-0" />
              <span>{localeNames[l]}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
