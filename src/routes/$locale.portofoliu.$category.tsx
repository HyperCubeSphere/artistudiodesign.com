import { useCallback, useEffect, useState, type ReactNode } from 'react'
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

/** Localized chrome strings for the gallery lightbox. */
const CLOSE_LABEL: Record<Locale, string> = {
  ro: 'Închide', en: 'Close', hu: 'Bezárás', de: 'Schließen', fr: 'Fermer',
  el: 'Κλείσιμο', uk: 'Закрити', es: 'Cerrar', tr: 'Kapat', et: 'Sulge',
  cs: 'Zavřít', nl: 'Sluiten', sv: 'Stäng', it: 'Chiudi', da: 'Luk',
}
const PREV_LABEL: Record<Locale, string> = {
  ro: 'Imaginea anterioară', en: 'Previous image', hu: 'Előző kép',
  de: 'Vorheriges Bild', fr: 'Image précédente', el: 'Προηγούμενη εικόνα',
  uk: 'Попереднє зображення', es: 'Imagen anterior', tr: 'Önceki görsel',
  et: 'Eelmine pilt', cs: 'Předchozí obrázek', nl: 'Vorige afbeelding',
  sv: 'Föregående bild', it: 'Immagine precedente', da: 'Forrige billede',
}
const NEXT_LABEL: Record<Locale, string> = {
  ro: 'Imaginea următoare', en: 'Next image', hu: 'Következő kép',
  de: 'Nächstes Bild', fr: 'Image suivante', el: 'Επόμενη εικόνα',
  uk: 'Наступне зображення', es: 'Imagen siguiente', tr: 'Sonraki görsel',
  et: 'Järgmine pilt', cs: 'Další obrázek', nl: 'Volgende afbeelding',
  sv: 'Nästa bild', it: 'Immagine successiva', da: 'Næste billede',
}
const PHOTOS_LABEL: Record<Locale, string> = {
  ro: 'foto', en: 'photos', hu: 'fotó', de: 'Fotos', fr: 'photos',
  el: 'φωτογραφίες', uk: 'фото', es: 'fotos', tr: 'fotoğraf', et: 'fotot',
  cs: 'fotografií', nl: "foto's", sv: 'foton', it: 'foto', da: 'fotos',
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
  const projects = projectsByCategory(category)
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null)

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
              onOpen={() => setActiveProject(project)}
            />
          ))}
        </div>
      </div>

      {activeProject ? (
        <ProjectGallery
          project={activeProject}
          locale={ll}
          onClose={() => setActiveProject(null)}
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
  onOpen: () => void
}

function ProjectCard({ project, locale, eager, priority, onOpen }: ProjectCardProps) {
  const title = project.title[locale === 'en' ? 'en' : 'ro']
  return (
    <article className="portfolio-card group block">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`${title} — ${project.images.length} ${PHOTOS_LABEL[locale]}`}
        className="block w-full text-left cursor-zoom-in"
      >
        <div className="aspect-[4/5] relative overflow-hidden">
          <img
            src={project.cover.src}
            alt={localeAlt(project.cover, locale)}
            width={project.cover.width}
            height={project.cover.height}
            loading={eager ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            className="portfolio-img absolute inset-0 w-full h-full object-cover photo-moody-soft"
          />
        </div>
      </button>
      <div className="pt-8 md:pt-10 lg:pt-14 px-2 md:px-4 pb-5 md:pb-6 flex flex-col gap-3 md:gap-4">
        <h3 className="serif text-xl md:text-2xl leading-tight">{title}</h3>
        <p className="eyebrow-sm tabular-nums text-muted">
          {project.images.length} {PHOTOS_LABEL[locale]}
        </p>
      </div>
    </article>
  )
}

interface ProjectGalleryProps {
  project: PortfolioProject
  locale: Locale
  onClose: () => void
}

/**
 * Multi-image lightbox. Portaled to `document.body` so it escapes every
 * ancestor stacking context (`.portfolio-card` carries `isolation: isolate`).
 * Locks body scroll, ESC closes, ArrowLeft/Right step. Adjacent images
 * preload via injected `<link rel="preload">` so prev/next feels instant.
 */
function ProjectGallery({ project, locale, onClose }: ProjectGalleryProps) {
  const [index, setIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
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
        type="button"
        onClick={(e) => { e.stopPropagation(); onClose() }}
        aria-label={CLOSE_LABEL[locale]}
        className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 inline-flex items-center justify-center text-3xl leading-none text-[oklch(0.96_0.010_82)] hairline-frame bg-[oklch(0.10_0.012_60/0.6)] hover:text-accent transition-colors"
      >
        <span aria-hidden="true">×</span>
      </button>

      {total > 1 ? (
        <>
          <NavButton
            side="left"
            disabled={index === 0}
            label={PREV_LABEL[locale]}
            onClick={(e) => { e.stopPropagation(); step(-1) }}
          />
          <NavButton
            side="right"
            disabled={index === total - 1}
            label={NEXT_LABEL[locale]}
            onClick={(e) => { e.stopPropagation(); step(1) }}
          />
        </>
      ) : null}
    </div>
  )

  return createPortal(overlay, document.body)
}

interface NavButtonProps {
  side: 'left' | 'right'
  disabled: boolean
  label: string
  onClick: (e: React.MouseEvent) => void
}

function NavButton({ side, disabled, label, onClick }: NavButtonProps) {
  const pos = side === 'left' ? 'left-4 md:left-6' : 'right-4 md:right-6'
  const arrow: ReactNode = side === 'left' ? '‹' : '›'
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 -translate-y-1/2 ${pos} w-12 h-12 md:w-14 md:h-14 inline-flex items-center justify-center text-4xl md:text-5xl leading-none text-[oklch(0.96_0.010_82)] hairline-frame bg-[oklch(0.10_0.012_60/0.6)] hover:text-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed`}
    >
      <span aria-hidden="true">{arrow}</span>
    </button>
  )
}
