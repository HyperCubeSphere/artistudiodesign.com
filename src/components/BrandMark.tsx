import Logo from './Logo'

interface BrandMarkProps {
  /** Pixel size of the crest. Default keeps backwards compatibility with the old prop. */
  size?: number
  /** Centre the whole composition inside its container. */
  centered?: boolean
  /** Tailwind class for wordmark font-size — accepted for backwards compatibility. */
  wordmarkClass?: string
}

/**
 * Decorative big-format Arti Studio brand mark used in the About / centerpiece
 * area. Thin wrapper over the shared <Logo /> component so the crest and the
 * gold-on-cream wordmark stay perfectly in sync across nav / footer / hero.
 */
export default function BrandMark({ centered = true }: BrandMarkProps) {
  return (
    <div className={`text-text ${centered ? 'flex justify-center' : ''}`}>
      <Logo size="lg" />
    </div>
  )
}
