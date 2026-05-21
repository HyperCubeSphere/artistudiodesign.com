import type { ProductCategorySlug, ProductSlug } from '../i18n/config'

export interface Product {
  slug: ProductSlug
  category: ProductCategorySlug
  name: { ro: string; en: string }
  shortDescription: { ro: string; en: string }
  longDescription: { ro: string; en: string }
  howToUse: { ro: string; en: string }
  contents: { ro: string; en: string }
  priceLei: number
  /** Placeholder image filename under /public/images/products/ (real photos to be added later). */
  image: string
  inStock: boolean
  badge?: { ro: string; en: string }
}

export const products: Product[] = [
  {
    slug: 'daily-cleaner-mobilier',
    category: 'curatare-mobilier',
    name: { ro: 'Daily Cleaner pentru mobilier', en: 'Daily Cleaner for furniture' },
    shortDescription: {
      ro: 'Curăță eficient suprafețele de zi cu zi. Îndepărtează praful, murdăria și amprentele.',
      en: 'Cleans daily surfaces effectively. Removes dust, grime, and fingerprints.',
    },
    longDescription: {
      ro: 'Formula pH-neutră curăță fără să zgârie. Sigură pe PAL melaminat, MDF vopsit, sticlă, oțel inoxidabil și suprafețe lăcuite. Lasă o peliculă fină antistatică pentru ca praful să nu se mai așeze rapid.',
      en: 'A pH-neutral formula that cleans without scratching. Safe on MFC, painted MDF, glass, stainless steel, and lacquered surfaces. Leaves a thin antistatic film so dust does not settle as quickly.',
    },
    howToUse: {
      ro: 'Pulverizează pe lavetă din microfibră, șterge pe direcția fibrei, lustruiește cu partea uscată.',
      en: 'Spray onto a microfibre cloth, wipe along the grain, buff with the dry side.',
    },
    contents: { ro: '500 ml', en: '500 ml' },
    priceLei: 79,
    image: '/images/products/daily-cleaner.svg',
    inStock: true,
  },
  {
    slug: 'anti-fingerprint-cleaner',
    category: 'curatare-mobilier',
    name: { ro: 'Anti-Fingerprint Cleaner', en: 'Anti-Fingerprint Cleaner' },
    shortDescription: {
      ro: 'Formulă specială care îndepărtează amprentele și urmele de grăsime.',
      en: 'Special formula that removes fingerprints and grease smudges.',
    },
    longDescription: {
      ro: 'Concepută pentru suprafețele mate și lucioase predispuse la urme: fronturi de bucătărie, oglinzi, sticlă, electrocasnice. Acțiune rapidă, fără reziduuri.',
      en: 'Designed for matte and gloss surfaces prone to smudges: kitchen fronts, mirrors, glass, appliances. Fast-acting, residue-free.',
    },
    howToUse: {
      ro: 'Pulverizează direct pe suprafață, lasă 30 de secunde, șterge cu lavetă din microfibră.',
      en: 'Spray directly onto the surface, wait 30 seconds, wipe off with a microfibre cloth.',
    },
    contents: { ro: '500 ml', en: '500 ml' },
    priceLei: 89,
    image: '/images/products/anti-fingerprint.svg',
    inStock: true,
  },
  {
    slug: 'furniture-protector',
    category: 'protectie-suprafete',
    name: { ro: 'Furniture Protector', en: 'Furniture Protector' },
    shortDescription: {
      ro: 'Protejează suprafețele din melamină, vopsea și vinil împotriva zgârieturilor și petelor.',
      en: 'Protects melamine, painted, and vinyl surfaces against scratches and stains.',
    },
    longDescription: {
      ro: 'Strat invizibil care întărește suprafața și o face mai ușor de curățat. Rezistă la apă, alcool, cafea și produse de curățare uzuale. Durată estimată: 4–6 luni pe utilizare normală.',
      en: 'An invisible coat that hardens the surface and makes it easier to clean. Resists water, alcohol, coffee, and common cleaning products. Approx. duration: 4–6 months under normal use.',
    },
    howToUse: {
      ro: 'Aplică pe o suprafață curată și uscată, distribuie uniform cu o lavetă curată, lasă 30 de minute să polimerizeze.',
      en: 'Apply to a clean, dry surface, spread evenly with a clean cloth, allow 30 minutes to cure.',
    },
    contents: { ro: '300 ml', en: '300 ml' },
    priceLei: 119,
    image: '/images/products/furniture-protector.svg',
    inStock: true,
  },
  {
    slug: 'leather-vinyl-cleaner',
    category: 'ingrijire-piele-vinil',
    name: { ro: 'Leather & Vinyl Cleaner', en: 'Leather & Vinyl Cleaner' },
    shortDescription: {
      ro: 'Curăță delicat pielea și vinilul. Redă aspectul original și hrănește materialul.',
      en: 'Gently cleans leather and vinyl. Restores the original look and feeds the material.',
    },
    longDescription: {
      ro: 'O formulă cu ulei de jojoba și ceară de carnauba care curăță fără să usuce. Recomandată pentru canapele, scaune de birou, recliner-uri din piele naturală sau ecologică.',
      en: 'A formula with jojoba oil and carnauba wax that cleans without drying. Recommended for sofas, office chairs, and recliners in natural or eco-leather.',
    },
    howToUse: {
      ro: 'Pulverizează pe o lavetă moale, șterge prin mișcări circulare ușoare, lasă să se absoarbă 5 minute.',
      en: 'Spray onto a soft cloth, wipe in light circular motions, let it absorb for 5 minutes.',
    },
    contents: { ro: '250 ml', en: '250 ml' },
    priceLei: 89,
    image: '/images/products/leather-cleaner.svg',
    inStock: true,
  },
  {
    slug: 'nano-coating-protectie-invizibila',
    category: 'nano-coating',
    name: { ro: 'Nano-Coating Protecție invizibilă', en: 'Nano-Coating Invisible Protection' },
    shortDescription: {
      ro: 'Tehnologie avansată pentru protecție de durată împotriva zgârieturilor și petelor.',
      en: 'Advanced technology for lasting protection against scratches and stains.',
    },
    longDescription: {
      ro: 'Strat nano-tehnologic care leagă chimic cu suprafața mobilierului și formează un scut invizibil. Hidrofob, ulei-repulsiv, rezistent la zgârieturi minore. Durată până la 12 luni.',
      en: 'A nano-tech layer that chemically bonds with the furniture surface and forms an invisible shield. Hydrophobic, oil-repellent, scratch-resistant. Lasts up to 12 months.',
    },
    howToUse: {
      ro: 'Curăță și degresează suprafața. Aplică un strat subțire, distribuie cu lavetă curată, lustruiește după 10 minute. Polimerizare completă în 24h.',
      en: 'Clean and degrease the surface. Apply a thin coat, spread with a clean cloth, buff after 10 minutes. Full cure in 24h.',
    },
    contents: { ro: '200 ml + kit aplicare', en: '200 ml + application kit' },
    priceLei: 149,
    image: '/images/products/nano-coating.svg',
    inStock: true,
    badge: { ro: 'Best-seller', en: 'Best-seller' },
  },
]

export function productsByCategory(slug: ProductCategorySlug): Product[] {
  return products.filter((p) => p.category === slug)
}

export function findProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function categoryCount(slug: ProductCategorySlug): number {
  return products.filter((p) => p.category === slug).length
}
