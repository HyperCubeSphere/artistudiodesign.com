import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { useI18n } from '../i18n'
import { seo } from '../lib/seo'
import { GoldPeriod } from '../components/SectionHeader'
import { localeAlt, type ImageRef } from '../content/images'
import { projectsByCategory, type PortfolioProject } from '../content/portfolio'
import { portfolioCategorySlugs, type Locale, type PortfolioCategorySlug } from '../i18n/config'
import type ro from '../i18n/locales/ro'

const translations = import.meta.glob('../i18n/locales/*.ts', { eager: true }) as Record<string, { default: typeof ro }>
function tFor(locale: string) {
  return (translations[`../i18n/locales/${locale}.ts`] ?? translations[`../i18n/locales/ro.ts`]).default
}

type GalleryStrings = (typeof ro)['portofoliu']['gallery']

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

interface ActiveSelection {
  project: PortfolioProject
  startIndex: number
}

function PortofoliuCategoryPage() {
  const { locale, t } = useI18n()
  const ll = locale as Locale
  const params = Route.useParams()
  const category = params.category as PortfolioCategorySlug
  const cat = t.portofoliu.categories.find((c) => c.slug === category)
  const projects = projectsByCategory(category)
  const [active, setActive] = useState<ActiveSelection | null>(null)
  const g = t.portofoliu.gallery

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
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              locale={ll}
              eager={i < 3}
              priority={i === 0}
              strings={g}
              onOpen={(startIndex) => setActive({ project, startIndex })}
            />
          ))}
        </div>
      </div>

      {active ? (
        <ProjectGallery
          project={active.project}
          startIndex={active.startIndex}
          locale={ll}
          strings={g}
          onClose={() => setActive(null)}
        />
      ) : null}
    </section>
  )
}

interface ProjectCardProps {
  project: PortfolioProject
  locale: Locale
  eager: boolean
  priority: boolean
  strings: GalleryStrings
  onOpen: (startIndex: number) => void
}

function ProjectCard({ project, locale, eager, priority, strings, onOpen }: ProjectCardProps) {
  const title = project.title[locale === 'en' ? 'en' : 'ro']
  const total = project.images.length
  const hasMany = total > 1
  const [index, setIndex] = useState(0)
  // Note: carousel index persists across lightbox open/close within a
  // category visit. Inter-category navigation remounts the card (keyed
  // by `project.id`) so it resets to the cover.
  const current = project.images[index]
  const primed = index !== 0

  const step = (delta: number) => {
    setIndex((i) => Math.min(Math.max(i + delta, 0), total - 1))
  }

  const handleArrowKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!hasMany) return
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      step(-1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      step(1)
    }
  }

  return (
    <article className="portfolio-card group block">
      <div className="aspect-[4/5] relative overflow-hidden">
        <button
          type="button"
          onClick={() => onOpen(index)}
          onKeyDown={handleArrowKey}
          className="block w-full h-full cursor-zoom-in text-left"
        >
          <img
            src={current.src}
            alt={localeAlt(current, locale)}
            width={current.width}
            height={current.height}
            loading={eager || primed ? 'eager' : 'lazy'}
            fetchPriority={priority && index === 0 ? 'high' : 'auto'}
            decoding="async"
            className="portfolio-img absolute inset-0 w-full h-full object-cover photo-moody-soft"
          />
        </button>

        {hasMany ? (
          <>
            <NavArrow
              side="left"
              size="sm"
              revealOnHover
              ariaDisabled={index === 0}
              label={strings.prev}
              onClick={() => step(-1)}
            />
            <NavArrow
              side="right"
              size="sm"
              revealOnHover
              ariaDisabled={index === total - 1}
              label={strings.next}
              onClick={() => step(1)}
            />
            <p
              aria-hidden="true"
              className="pointer-events-none absolute z-10 bottom-2 left-2 nav-text tabular-nums text-[10px] text-[oklch(0.96_0.010_82)] px-2 py-0.5 bg-[oklch(0.10_0.012_60/0.6)] hairline-frame"
            >
              {index + 1} / {total}
            </p>
            <span aria-live="polite" className="sr-only">
              {index + 1} / {total}
            </span>
          </>
        ) : null}
      </div>
      <div className="pt-8 md:pt-10 lg:pt-14 px-2 md:px-4 pb-5 md:pb-6 flex flex-col gap-3 md:gap-4">
        <h3 className="serif text-xl md:text-2xl leading-tight">{title}</h3>
        <p className="eyebrow-sm tabular-nums text-muted">
          {total} {strings.photos}
        </p>
      </div>
    </article>
  )
}

interface ProjectGalleryProps {
  project: PortfolioProject
  locale: Locale
  strings: GalleryStrings
  onClose: () => void
  startIndex?: number
}

/**
 * Multi-image lightbox. Portaled to `document.body` so it escapes every
 * ancestor stacking context (`.portfolio-card` carries `isolation: isolate`).
 * Locks body scroll, ESC closes, ArrowLeft/Right step. Adjacent images
 * preload via injected `<link rel="preload">` so prev/next feels instant.
 * On mount focus moves to the close button so the previously-focused
 * project card behind the overlay doesn't receive bubbled key events.
 */
function ProjectGallery({ project, locale, strings, onClose, startIndex = 0 }: ProjectGalleryProps) {
  const [index, setIndex] = useState(startIndex)
  const [mounted, setMounted] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const total = project.images.length

  const step = useCallback(
    (delta: number) => {
      setIndex((i) => Math.min(Math.max(i + delta, 0), total - 1))
    },
    [total],
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) closeButtonRef.current?.focus()
  }, [mounted])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') step(-1)
      else if (e.key === 'ArrowRight') step(1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, step])

  // Preload neighbours so prev/next feels instant.
  useEffect(() => {
    const adjacent = [index - 1, index + 1].filter((i) => i >= 0 && i < total)
    const links = adjacent.map((i) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = project.images[i].full ?? project.images[i].src
      document.head.appendChild(link)
      return link
    })
    return () => {
      for (const link of links) link.parentElement?.removeChild(link)
    }
  }, [index, project, total])

  if (!mounted) return null

  const current = project.images[index]
  const fullSrc = current.full ?? current.src

  const overlay = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title[locale === 'en' ? 'en' : 'ro']}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-[oklch(0.10_0.012_60/0.92)] backdrop-blur-sm"
    >
      <img
        key={fullSrc}
        src={fullSrc}
        alt={localeAlt(current, locale)}
        className="max-w-full max-h-full object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      <p
        aria-live="polite"
        className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 nav-text tabular-nums text-[oklch(0.96_0.010_82)] px-3 py-1 bg-[oklch(0.10_0.012_60/0.6)] hairline-frame"
      >
        {index + 1} / {total}
      </p>

      <button
        ref={closeButtonRef}
        type="button"
        onClick={(e) => { e.stopPropagation(); onClose() }}
        aria-label={strings.close}
        className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 inline-flex items-center justify-center text-3xl leading-none text-[oklch(0.96_0.010_82)] hairline-frame bg-[oklch(0.10_0.012_60/0.6)] hover:text-accent transition-colors"
      >
        <span aria-hidden="true">×</span>
      </button>

      {total > 1 ? (
        <>
          <NavArrow
            side="left"
            size="lg"
            ariaDisabled={index === 0}
            label={strings.prev}
            onClick={(e) => { e.stopPropagation(); step(-1) }}
          />
          <NavArrow
            side="right"
            size="lg"
            ariaDisabled={index === total - 1}
            label={strings.next}
            onClick={(e) => { e.stopPropagation(); step(1) }}
          />
        </>
      ) : null}
    </div>
  )

  return createPortal(overlay, document.body)
}

interface NavArrowProps {
  side: 'left' | 'right'
  size: 'sm' | 'lg'
  ariaDisabled: boolean
  label: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  /** When true, hide until parent `.group` is hovered or touch-only device. */
  revealOnHover?: boolean
}

/**
 * Shared chevron button used by both the card carousel (`size='sm'`,
 * `revealOnHover`) and the lightbox (`size='lg'`).
 *
 * Uses `aria-disabled` rather than the native `disabled` attribute so the
 * button stays focusable at the carousel boundary — the browser blurs
 * truly-disabled controls, which would drop keyboard focus to <body>.
 * `onClick` early-returns when ariaDisabled is true.
 */
function NavArrow({ side, size, ariaDisabled, label, onClick, revealOnHover }: NavArrowProps) {
  const small = size === 'sm'
  const pos = side === 'left'
    ? (small ? 'left-2' : 'left-4 md:left-6')
    : (small ? 'right-2' : 'right-4 md:right-6')
  const dim = small
    ? 'w-9 h-9 text-2xl'
    : 'w-12 h-12 md:w-14 md:h-14 text-4xl md:text-5xl'
  const reveal = revealOnHover
    ? 'opacity-0 group-hover:opacity-100 [@media(hover:none)]:opacity-100 focus-visible:opacity-100'
    : ''
  const arrow: ReactNode = side === 'left' ? '‹' : '›'
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ariaDisabled) return
    onClick(e)
  }
  return (
    <button
      type="button"
      aria-disabled={ariaDisabled || undefined}
      aria-label={label}
      onClick={handleClick}
      onKeyDown={(e) => e.stopPropagation()}
      className={`absolute z-10 top-1/2 -translate-y-1/2 ${pos} ${dim} ${reveal} inline-flex items-center justify-center leading-none text-[oklch(0.96_0.010_82)] hairline-frame bg-[oklch(0.10_0.012_60/0.6)] hover:text-accent cursor-pointer transition aria-disabled:opacity-30 aria-disabled:cursor-not-allowed`.trim()}
    >
      <span aria-hidden="true">{arrow}</span>
    </button>
  )
}
