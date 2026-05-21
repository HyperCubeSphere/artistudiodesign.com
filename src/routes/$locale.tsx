import { createFileRoute, Outlet, notFound, useRouterState } from '@tanstack/react-router'
import { locales, type Locale } from '../i18n/config'
import { I18nProvider, type Translation } from '../i18n'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const translations = import.meta.glob('../i18n/locales/*.ts', { eager: true }) as Record<string, { default: Translation }>

export const Route = createFileRoute('/$locale')({
  beforeLoad: ({ params }) => {
    const locale = params.locale as Locale
    if (!locales.includes(locale)) throw notFound()
    const key = `../i18n/locales/${locale}.ts`
    const mod = translations[key]
    if (!mod) throw notFound()
    return { locale, t: mod.default }
  },
  component: LocaleLayout,
})

function LocaleLayout() {
  const { locale, t } = Route.useRouteContext()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const onShop = pathname.includes('/produse')

  return (
    <I18nProvider value={{ locale, t }}>
      <a href="#main-content" className="skip-link">
        {t.nav.skipToContent}
      </a>
      {/* Products section uses its own nav variant inside the route. */}
      {onShop ? null : <Navbar />}
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </I18nProvider>
  )
}
