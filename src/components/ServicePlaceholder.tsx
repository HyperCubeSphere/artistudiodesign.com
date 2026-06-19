interface ServicePlaceholderProps {
  slot: string
  title: string
  className?: string
}

export default function ServicePlaceholder({ slot, title, className }: ServicePlaceholderProps) {
  const hue = (hash(slot) % 40) - 20
  const a = `oklch(0.30 0.020 ${65 + hue})`
  const b = `oklch(0.20 0.018 ${65 + hue})`
  const id = `svc-${slot}`
  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      aria-label={title}
      role="img"
      className={className}
    >
      <defs>
        <radialGradient id={`${id}-bg`} cx="50%" cy="40%" r="80%">
          <stop offset="0%" stopColor={a} />
          <stop offset="100%" stopColor={b} />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill={`url(#${id}-bg)`} />
      <g
        transform="translate(180 180)"
        fill="none"
        stroke="oklch(0.96 0.010 82)"
        strokeWidth="1.4"
        strokeLinecap="square"
        opacity="0.85"
      >
        <rect x="0" y="0" width="40" height="40" />
        <line x1="13" y1="0" x2="13" y2="40" />
        <line x1="0" y1="13" x2="13" y2="13" />
        <rect x="28" y="24" width="4" height="6" fill="var(--color-accent)" stroke="none" />
      </g>
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
