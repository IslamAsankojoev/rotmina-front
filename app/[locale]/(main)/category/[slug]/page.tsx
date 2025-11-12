import { cookies } from 'next/headers'
import { Suspense } from 'react'

import { ProductGrid } from '@/src/entities/Product'
import {
  CategoryService,
  CategoryTitle,
  Category as CategoryType,
  ProductFilter,
  ProductPagination,
  ProductSort,
} from '@/src/features'
import { Breadcrumbs, Loader, Typography } from '@/src/shared'
import { getDictionary } from '@/src/shared/utils/dictionaries'
import { getServerLocale, addLocaleToPath } from '@/src/shared/utils/locale'
import { ArrowDownUp } from 'lucide-react'

const getCategory = async (slug: string) => {
  const category = await CategoryService.getCategoryBySlug(slug)
  return category?.data
}

export default async function Category({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await getCategory(slug)
  const cookieStore = await cookies()
  const locale = await getServerLocale(undefined, cookieStore)
  const dictionary = await getDictionary(locale as 'en' | 'he')
  const t = (dictionary as unknown as Record<string, Record<string, string>>)
    .shop || {
    home: 'HOME',
    sortBy: 'SORT BY:',
  }

  return (
    <>
      <div
        className="relative flex h-[390px] w-full flex-col justify-end"
        style={{
          backgroundImage: `url(${category?.top_image?.url || category?.image?.url || ''})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '100% 40%',
        }}
      >
        <div className="container">
          <Typography variant="text_pageTitle" className="text-white">
            <CategoryTitle category={category as unknown as CategoryType} /> ({category?.count || 0})
          </Typography>
        </div>
      </div>
      <div className="container my-10 mt-16 flex justify-between">
        <Breadcrumbs
          links={[
            { title: t.home, href: addLocaleToPath('/', locale) },
            {
              title: (
                <CategoryTitle category={category as unknown as CategoryType} />
              ),
              href: addLocaleToPath(`/category/${category?.slug}`, locale),
            },
          ]}
        />
        <div className="flex gap-4">
          <ProductFilter />
          <div className="flex gap-2">
            <Typography variant="text_main" className="hidden md:inline">
              {t.sortBy}
            </Typography>
            <ArrowDownUp strokeWidth={0.75} className="inline md:hidden" />
            <ProductSort />
          </div>
        </div>
      </div>
      <div className="container">
        <Suspense fallback={<Loader />}>
          <ProductGrid categoryId={category?.documentId} />
        </Suspense>
        <ProductPagination />
      </div>
    </>
  )
}
