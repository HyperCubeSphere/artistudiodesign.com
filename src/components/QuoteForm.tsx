import { useState } from 'react'
import { useI18n } from '../i18n'
import { TALLY_FORM_ID, CONTACT_EMAIL } from '../lib/site'

interface QuoteFormProps {
  /** Pre-fill the message with a known product slug or note. */
  prefillProduct?: string
}

/**
 * Native styled quote-request form — visually matches the reference design.
 * Submits to Tally via standard HTML POST so it works without JS. When JS is
 * available, intercepts and submits via fetch for an inline success state.
 * When TALLY_FORM_ID is the placeholder, falls back to a mailto compose.
 */
export default function QuoteForm({ prefillProduct }: QuoteFormProps) {
  const { t } = useI18n()
  const f = t.contact.form
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const tallyConfigured = TALLY_FORM_ID !== 'REPLACE_ME'
  const action = tallyConfigured ? `https://tally.so/r/${TALLY_FORM_ID}` : `mailto:${CONTACT_EMAIL}`

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!tallyConfigured) return // let mailto fire naturally
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const data = new FormData(e.currentTarget)
      const res = await fetch(action, { method: 'POST', body: data, mode: 'no-cors' })
      // With mode: 'no-cors' we cannot read res.ok, but a successful network
      // round-trip means Tally received it.
      void res
      setSubmitted(true)
      e.currentTarget.reset()
    } catch {
      setError(f.fallback)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div
        className="card p-8 flex flex-col gap-3"
        role="status"
        aria-live="polite"
        style={{ borderColor: 'var(--color-accent)' }}
      >
        <p className="eyebrow">✓</p>
        <p className="serif text-2xl">Mulțumim. Revenim în maximum 24h.</p>
        <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
          Cererea ta a ajuns la noi. Vom răspunde cât mai curând posibil pe email-ul lăsat.
        </p>
      </div>
    )
  }

  return (
    <form
      action={action}
      method="POST"
      onSubmit={onSubmit}
      className="flex flex-col gap-3"
      noValidate
    >
      {prefillProduct ? <input type="hidden" name="produs" value={prefillProduct} /> : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="sr-only">Nume</span>
          <input
            type="text"
            name="name"
            placeholder="Nume"
            required
            autoComplete="name"
            className="input"
          />
        </label>
        <label className="block">
          <span className="sr-only">Email</span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            autoComplete="email"
            spellCheck={false}
            className="input"
          />
        </label>
      </div>
      <label className="block">
        <span className="sr-only">Telefon</span>
        <input
          type="tel"
          name="phone"
          placeholder="Telefon"
          autoComplete="tel"
          className="input"
        />
      </label>
      <label className="block">
        <span className="sr-only">Mesaj</span>
        <textarea
          name="message"
          placeholder="Mesaj"
          required
          rows={5}
          className="input"
        />
      </label>
      {!tallyConfigured ? (
        <p className="text-xs" style={{ color: 'var(--color-muted-2)' }}>
          {f.fallback}{' '}
          <a className="text-[var(--color-accent)] underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      ) : null}
      {error ? (
        <p className="text-sm" style={{ color: 'var(--color-accent)' }}>
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={submitting}
        className="btn btn-primary w-full justify-center mt-2"
      >
        {submitting ? '…' : 'Trimite cererea'}
      </button>
    </form>
  )
}
