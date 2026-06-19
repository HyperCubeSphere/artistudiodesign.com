import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { useI18n } from '../i18n'
import { seo } from '../lib/seo'
import { GoldPeriod } from '../components/SectionHeader'
import { localeAlt, portfolioImages, type ImageRef } from '../content/images'
import { portfolioCategorySlugs, type Locale, type PortfolioCategorySlug } from '../i18n/config'
import type ro from '../i18n/locales/ro'

const translations = import.meta.glob('../i18n/locales/*.ts', { eager: true }) as Record<string, { default: typeof ro }>
function tFor(locale: string) {
  return (translations[`../i18n/locales/${locale}.ts`] ?? translations[`../i18n/locales/ro.ts`]).default
}

/** Localized "opens in a new tab" cue for screen readers (visually hidden). */
const NEW_TAB_LABEL: Record<Locale, string> = {
  ro: 'se deschide într-o filă nouă',
  en: 'opens in a new tab',
  hu: 'új lapon nyílik meg',
  de: 'wird in einem neuen Tab geöffnet',
  fr: "s'ouvre dans un nouvel onglet",
  el: 'ανοίγει σε νέα καρτέλα',
  uk: 'відкривається в новій вкладці',
  es: 'se abre en una pestaña nueva',
  tr: 'yeni sekmede açılır',
  et: 'avaneb uuel vahelehel',
  cs: 'otevře se na nové kartě',
  nl: 'opent in een nieuw tabblad',
  sv: 'öppnas i en ny flik',
  it: 'si apre in una nuova scheda',
  da: 'åbner i en ny fane',
}

/** Localized close-button label for the desktop lightbox. */
const CLOSE_LABEL: Record<Locale, string> = {
  ro: 'Închide',
  en: 'Close',
  hu: 'Bezárás',
  de: 'Schließen',
  fr: 'Fermer',
  el: 'Κλείσιμο',
  uk: 'Закрити',
  es: 'Cerrar',
  tr: 'Kapat',
  et: 'Sulge',
  cs: 'Zavřít',
  nl: 'Sluiten',
  sv: 'Stäng',
  it: 'Chiudi',
  da: 'Luk',
}

export const Route = createFileRoute('/$locale/portofoliu/$category')({
  beforeLoad: ({ params }) => {
    if (!portfolioCategorySlugs.includes(params.category as PortfolioCategorySlug)) throw notFound()
  },
  component: PortofoliuCategoryPage,
  head: ({ params }) => {
    const t = tFor(params.locale)
    const cat = t.portofoliu.categories.find((c) => c.slug === params.category)
    return seo({
      title: `${cat?.label ?? 'Portofoliu'} — Arti Studio`,
      description: cat?.description ?? t.portofoliu.seoDescription,
      path: `/portofoliu/${params.category}`,
      locale: params.locale,
    })
  },
})

function PortofoliuCategoryPage() {
  const { locale, t } = useI18n()
  const params = Route.useParams()
  const ll = locale as Locale
  const category = params.category as PortfolioCategorySlug
  const cat = t.portofoliu.categories.find((c) => c.slug === category)
  const images = portfolioImages[category]

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between mb-10 border-b hairline pb-6 flex-wrap gap-4">
          <div>
            <p className="eyebrow mb-2">{cat?.label}</p>
            <h2 className="serif text-3xl md:text-4xl leading-[1.05] max-w-2xl">
              <GoldPeriod text={cat?.description ?? ''} />
            </h2>
          </div>
          <Link to="/$locale/portofoliu" params={{ locale }} className="nav-text text-muted hover:text-accent transition-colors">
            ← {t.portofoliu.backToAll}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {images.map((img, i) => (
            <PortfolioThumb
              key={img.src}
              image={img}
              locale={ll}
              eager={i < 3}
              priority={i === 0}
              className="portfolio-card group block"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface PortfolioThumbProps {
  image: ImageRef
  locale: Locale
  eager: boolean
  priority: boolean
  className?: string
}

/**
 * The shared 4/5-aspect image tile. When `image.full` is set the tile is
 * wrapped in a `<FullResLink>` so visitors open the original (lightbox on
 * desktop, new tab on touch); without `full` it renders as a plain image.
 */
function PortfolioThumb({ image, locale, eager, priority, className }: PortfolioThumbProps) {
  const figure = (
    <div className="aspect-[4/5] relative overflow-hidden">
      <img
        src={image.src}
        alt={localeAlt(image, locale)}
        width={image.width}
        height={image.height}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className="portfolio-img absolute inset-0 w-full h-full object-cover photo-moody-soft"
      />
    </div>
  )
  if (!image.full) {
    return className ? <div className={className}>{figure}</div> : figure
  }
  return (
    <FullResLink href={image.full} locale={locale} className={className}>
      {figure}
    </FullResLink>
  )
}

interface FullResLinkProps {
  href: string
  locale: Locale
  className?: string
  children: ReactNode
}

/** Constant suffix applied to every full-res link, hoisted to avoid per-render template work. */
const FULL_RES_LINK_BASE = 'block cursor-zoom-in'

/**
 * Renders an `<a target="_blank">` to a high-resolution image. On hover-
 * capable devices (desktop, pointer mouse) the click opens an inline
 * lightbox showing the full-res image at viewport size; touch-only
 * devices (no hover) keep the tap-to-open-in-new-tab behavior so mobile
 * visitors can pinch-zoom the original.
 *
 * The link's accessible name flows from the child `<img alt>`; a
 * visually-hidden span announces the new-tab behavior for screen-reader
 * users on platforms where it applies.
 */
function FullResLink({ href, locale, className, children }: FullResLinkProps) {
  const composed = className ? `${className} ${FULL_RES_LINK_BASE}` : FULL_RES_LINK_BASE
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    // Always restore to empty — capturing `prev` risked persisting an
    // accidental `overflow: hidden` and leaving the rest of the site
    // un-scrollable if a previous run left bad state behind.
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
      e.preventDefault()
      setOpen(true)
    }
  }

  const lightbox = open ? (
    <div
      role="dialog"
      aria-modal="true"
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-[100] flex items-center justify-center cursor-zoom-out p-4 md:p-10 bg-[oklch(0.10_0.012_60/0.92)] backdrop-blur-sm"
    >
      <img
        src={href}
        alt=""
        className="max-w-full max-h-full object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label={CLOSE_LABEL[locale]}
        className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 inline-flex items-center justify-center text-3xl leading-none text-[oklch(0.96_0.010_82)] hairline-frame bg-[oklch(0.10_0.012_60/0.6)] hover:text-accent transition-colors"
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
  ) : null

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={composed}
      >
        {children}
        <span className="sr-only"> ({NEW_TAB_LABEL[locale]})</span>
      </a>
      {/* Portal escapes every ancestor stacking context (the surrounding
          `.portfolio-card` carries `isolation: isolate`, which previously
          bound `z-50` inside the card). */}
      {mounted && lightbox ? createPortal(lightbox, document.body) : null}
    </>
  )
}
