import QuoteForm from './QuoteForm'

interface ContactFormProps {
  /** Pre-fill a product slug into the form (used from product CTAs). */
  prefillProduct?: string
  /** Pre-fill a subject tag (e.g. `magazin-launch` from the ArtiCare CTA). */
  prefillSubject?: string
  /** Compatibility prop, retained for callers that previously passed minHeight. Unused now. */
  minHeight?: number
}

export default function ContactForm({ prefillProduct, prefillSubject }: ContactFormProps) {
  return <QuoteForm prefillProduct={prefillProduct} prefillSubject={prefillSubject} />
}
