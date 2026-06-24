import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { useUrlLocaleOrDefault } from '../i18n/useUrlLocale'
import appCss from '../styles.css?url'

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark')?stored:'dark';var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(mode);root.style.colorScheme=mode;var meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=mode==='dark'?'#14110d':'#f6f1e7';}catch(e){}})();`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Arti Studio — Mobilier la comandă, design și execuție în Oradea' },
      { name: 'description', content: 'Arti Studio proiectează și realizează mobilier personalizat în care funcționalitatea și stilul merg mână în mână. Materiale premium, execuție precisă, montaj la cheie în Oradea și împrejurimi.' },
      { name: 'theme-color', content: '#14110d' },
      { property: 'og:site_name', content: 'Arti Studio' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/images/brand/logo.png', type: 'image/png' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap',
      },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Arti Studio',
          url: 'https://artistudiodesign.com',
          image: 'https://artistudiodesign.com/images/brand/logo.png',
          telephone: '+40744299302',
          email: 'arti.studio.design18@gmail.com',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Oradea',
            addressRegion: 'Bihor',
            addressCountry: 'RO',
          },
          openingHours: 'Mo-Fr 09:00-18:00',
          sameAs: [
            'https://www.facebook.com/profile.php?id=100089499761060',
            'https://www.instagram.com/arti_studio_design/',
          ],
        }),
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const lang = useUrlLocaleOrDefault()

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <div className="flex flex-col min-h-screen">
          {children}
        </div>
        <Scripts />
      </body>
    </html>
  )
}
