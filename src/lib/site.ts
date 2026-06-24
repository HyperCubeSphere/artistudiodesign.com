/**
 * Site-wide constants. Replace TALLY_FORM_ID with your Tally form id.
 * Find the id in your Tally dashboard URL: https://tally.so/forms/<FORM_ID>
 */
export const TALLY_FORM_ID = 'REPLACE_ME'

export function tallyEmbedSrc(formId = TALLY_FORM_ID, opts?: { hiddenFields?: Record<string, string> }) {
  const params = new URLSearchParams({
    alignLeft: '1',
    hideTitle: '1',
    transparentBackground: '1',
    dynamicHeight: '1',
  })
  if (opts?.hiddenFields) {
    for (const [k, v] of Object.entries(opts.hiddenFields)) {
      params.set(k, v)
    }
  }
  return `https://tally.so/embed/${formId}?${params.toString()}`
}

export const CONTACT_EMAIL = 'arti.studio.design18@gmail.com'
export const CONTACT_PHONE = '+40744299302'
