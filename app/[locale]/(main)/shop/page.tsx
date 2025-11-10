import { cookies } from 'next/headers'
import { Suspense } from 'react'

import { ProductFilter, ProductPagination, ProductSort } from '@/src/features'
import { Breadcrumbs, Typography } from '@/src/shared'
import { getDictionary } from '@/src/shared/utils/dictionaries'
import { getServerLocale, addLocaleToPath } from '@/src/shared/utils/locale'
import { ArrowDownUp } from 'lucide-react'
import { ProductGrid } from '@/src/entities/Product'

export default async function Shop({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const cookieStore = await cookies()
  const locale = await getServerLocale(params, cookieStore)
  const dictionary = await getDictionary(locale as 'en' | 'he')
  const t = (dictionary as unknown as Record<string, Record<string, string>>)
    .shop || {
    home: 'HOME',
    shopBreadcrumb: 'SHOP',
    sortBy: 'SORT BY:',
    loadingFilters: 'Loading filters...',
    loadingProducts: 'Loading products...',
    loadingPagination: 'Loading pagination...',
  }

  return (
    <>
      <div className="container flex justify-between pt-10">
        <Breadcrumbs
          links={[
            { title: t.home, href: addLocaleToPath('/', locale) },
            { title: t.shopBreadcrumb, href: addLocaleToPath('/shop', locale) },
          ]}
        />
        <Suspense fallback={<div>{t.loadingFilters}</div>}>
          <div className="flex gap-4">
            <ProductFilter />
            <div className="flex gap-2">
              <Typography variant="text_main" className="hidden md:inline">{t.sortBy}</Typography>
              <ArrowDownUp strokeWidth={0.75} className="inline md:hidden" />
              <ProductSort />
            </div>
          </div>
        </Suspense>
      </div>
      <div className="container my-10">
        <Suspense fallback={<div>{t.loadingProducts}</div>}>
          <ProductGrid />
        </Suspense>
        <Suspense fallback={<div>{t.loadingPagination}</div>}>
          <ProductPagination />
        </Suspense>
      </div>
    </>
  )
}
