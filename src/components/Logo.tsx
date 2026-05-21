/**
 * Arti Studio logo — faithful SVG trace of the original artilogo.png.
 *
 * Crest reproduces the architectural composition from the source asset
 * (outer frame, internal "stepped" partitioning with a vertical accent
 * in the lower-mid cell). Wordmark uses Cormorant Garamond, rendered in
 * the brand gold (`--color-accent`) — this is the "yellow → gold" swap
 * the brand asked for, while preserving every other line.
 */

type LogoSize = 'sm' | 'md' | 'lg'

interface LogoProps {
  size?: LogoSize
  /** Centre the crest+wordmark inside their container. */
  centered?: boolean
  /** Hide the wordmark — useful when only the crest is needed. */
  iconOnly?: boolean
}

const SIZES: Record<LogoSize, { crest: number; wordmark: string }> = {
  sm: { crest: 36, wordmark: 'text-[22px]' },
  md: { crest: 56, wordmark: 'text-[34px]' },
  lg: { crest: 132, wordmark: 'text-[68px] md:text-[80px]' },
}

export default function Logo({ size = 'sm', centered = false, iconOnly = false }: LogoProps) {
  const { crest, wordmark } = SIZES[size]
  return (
    <span
      className={`inline-flex items-center gap-3 ${centered ? 'justify-center' : ''}`}
      aria-label="Arti Studio"
    >
      <Crest size={crest} />
      {iconOnly ? null : (
        <span className={`serif leading-[0.92] flex flex-col items-start ${wordmark}`}>
          <span className="text-accent">Arti</span>
          <span className="italic font-normal text-text">Studio</span>
        </span>
      )}
    </span>
  )
}

function Crest({ size }: { size: number }) {
  return (
    <svg
      viewBox="0 0 90 90"
      width={size}
      height={size}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
    >
      {/* Outer frame */}
      <rect x="1" y="1" width="88" height="88" />
      {/* Upper vertical divider — splits the top half into a wide left cell and a narrow right cell */}
      <line x1="47" y1="1" x2="47" y2="49" />
      {/* Horizontal inside the upper-right cell */}
      <line x1="47" y1="25" x2="89" y2="25" />
      {/* Mid horizontal — divides the frame into stepped upper/lower */}
      <line x1="31" y1="49" x2="89" y2="49" />
      {/* Lower-left vertical (narrower than the upper one — "step") */}
      <line x1="31" y1="49" x2="31" y2="89" />
      {/* Lower-right narrow strip vertical */}
      <line x1="72" y1="49" x2="72" y2="89" />
      {/* Small filled accent inside the lower-mid cell */}
      <rect x="62" y="60" width="3" height="12" fill="currentColor" stroke="none" />
    </svg>
  )
}

export { Crest }
