import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useI18n } from '../i18n'
import { seo } from '../lib/seo'
import UtilityBar from '../components/UtilityBar'
import ProductCategoryNav from '../components/ProductCategoryNav'
import FilterSidebar from '../components/FilterSidebar'
import BenefitsRow from '../components/BenefitsRow'
import type ro from '../i18n/locales/ro'

const translations = import.meta.glob('../i18n/locales/*.ts', { eager: true }) as Record<string, { default: typeof ro }>
function tFor(locale: string) {
  return (translations[`../i18n/locales/${locale}.ts`] ?? translations[`../i18n/locales/ro.ts`]).default
}

export const Route = createFileRoute('/$locale/produse')({
  component: ProduseLayout,
  head: ({ params }) => {
    const t = tFor(params.locale)
    return seo({ title: t.produse.seoTitle, description: t.produse.seoDescription, path: '/produse', locale: params.locale })
  },
})

function ProduseLayout() {
  const { t } = useI18n()
  return (
    <>
      <UtilityBar />
      <ProductCategoryNav />
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12 lg:gap-16">
        <FilterSidebar />
        <div>
          <Outlet />
        </div>
      </div>
      <BenefitsRow />
      <span aria-hidden="true" data-i18n-debug={t.produse.eyebrow} />
    </>
  )
}
