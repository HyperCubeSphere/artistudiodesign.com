interface ProductPlaceholderProps {
  slug: string
  title: string
  className?: string
}

/**
 * Procedural dark-marble background with the Arti Studio crest, used
 * until real product photography is supplied. The slug seeds a small hue
 * shift so each product has a distinct look without a JPEG.
 */
export default function ProductPlaceholder({ slug, title, className }: ProductPlaceholderProps) {
  const hue = (hash(slug) % 30) - 10
  const accent = `oklch(0.30 0.020 ${60 + hue})`
  const accent2 = `oklch(0.20 0.018 ${60 + hue})`
  const id = `placeholder-${slug}`
  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      aria-label={title}
      role="img"
      className={className}
    >
      <defs>
        <radialGradient id={`${id}-bg`} cx="50%" cy="35%" r="80%">
          <stop offset="0%" stopColor={accent} />
          <stop offset="100%" stopColor={accent2} />
        </radialGradient>
        <linearGradient id={`${id}-light`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.95 0.012 80 / 0.05)" />
          <stop offset="100%" stopColor="oklch(0 0 0 / 0)" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${id}-bg)`} />
      <rect width="400" height="500" fill={`url(#${id}-light)`} />
      {/* Faux bottle silhouette */}
      <g transform="translate(200 260)" fill="oklch(0.10 0.012 60)" stroke="oklch(0.32 0.012 65)" strokeWidth="0.5">
        <rect x="-58" y="-110" width="116" height="220" rx="3" />
        <rect x="-30" y="-150" width="60" height="42" rx="2" />
        <rect x="-26" y="-160" width="52" height="14" rx="1" />
      </g>
      {/* Crest — Arti Studio architectural floor-plan motif */}
      <g
        transform="translate(176 196)"
        fill="none"
        stroke="oklch(0.96 0.010 82)"
        strokeWidth="1.2"
        strokeLinecap="square"
      >
        <rect x="2" y="2" width="28" height="28" />
        <line x1="11" y1="2" x2="11" y2="30" />
        <line x1="2" y1="11" x2="11" y2="11" />
        <rect x="20" y="18" width="3" height="4" fill="oklch(0.96 0.010 82)" stroke="none" />
      </g>
      <text
        x="200"
        y="260"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, serif"
        fontSize="18"
        fill="var(--color-accent)"
        opacity="0.85"
      >
        Arti
      </text>
      <text
        x="200"
        y="280"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, serif"
        fontStyle="italic"
        fontSize="18"
        fill="oklch(0.96 0.008 80)"
        opacity="0.85"
      >
        Studio
      </text>
    </svg>
  )
}

function hash(str: string): number {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}
