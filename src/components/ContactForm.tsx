import QuoteForm from './QuoteForm'

interface ContactFormProps {
  /** Pre-fill a product slug into the form (used from product CTAs). */
  prefillProduct?: string
  /** Compatibility prop, retained for callers that previously passed minHeight. Unused now. */
  minHeight?: number
}

export default function ContactForm({ prefillProduct }: ContactFormProps) {
  return <QuoteForm prefillProduct={prefillProduct} />
}
