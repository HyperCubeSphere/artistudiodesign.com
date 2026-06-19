import { useEffect, useRef, useState } from 'react'
import { tallyEmbedSrc, CONTACT_EMAIL, TALLY_FORM_ID } from '../lib/site'
import { useI18n } from '../i18n'

interface TallyEmbedProps {
  formId?: string
  title: string
  prefill?: Record<string, string>
  minHeight?: number
}

const TALLY_SCRIPT_SRC = 'https://tally.so/widgets/embed.js'

export default function TallyEmbed({ formId, title, prefill, minHeight = 520 }: TallyEmbedProps) {
  const { t } = useI18n()
  const ref = useRef<HTMLIFrameElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (document.querySelector(`script[src="${TALLY_SCRIPT_SRC}"]`)) return
    const s = document.createElement('script')
    s.src = TALLY_SCRIPT_SRC
    s.async = true
    document.body.appendChild(s)
  }, [])

  const id = formId ?? TALLY_FORM_ID
  const src = tallyEmbedSrc(id, { hiddenFields: prefill })

  if (id === 'REPLACE_ME') {
    return (
      <div
        className="card p-8 flex flex-col gap-3 border-hairline"
        style={{ minHeight }}
      >
        <p className="eyebrow">{title}</p>
        <p className="text-sm text-muted">
          {t.contact.form.fallback}{' '}
          <a className="text-accent underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        {import.meta.env.DEV ? (
          <p className="text-xs text-muted-2">
            (Tally form id not configured yet — set <code>TALLY_FORM_ID</code> in <code>src/lib/site.ts</code>.)
          </p>
        ) : null}
      </div>
    )
  }

  return (
    <div className="relative" style={{ minHeight }}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-muted">
          {t.contact.form.tallyLoading}
        </div>
      )}
      <iframe
        ref={ref}
        src={src}
        title={title}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className="w-full block border-0 bg-transparent"
        style={{ minHeight }}
      />
    </div>
  )
}
