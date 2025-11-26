import { cookies } from 'next/headers'
import { Suspense } from 'react'

import { ProductGrid } from '@/src/entities/Product'
import {
  CategoryTitle,
  Category as CategoryType,
  CollectionService,
  ProductFilter,
  ProductPagination,
  ProductSort,
} from '@/src/features'
import { Breadcrumbs, Loader, Typography } from '@/src/shared'
import { getDictionary } from '@/src/shared/utils/dictionaries'
import { getServerLocale, addLocaleToPath } from '@/src/shared/utils/locale'
import { ArrowDownUp } from 'lucide-react'

const getCollection = async (id: string) => {
  const category = await CollectionService.getCollection(id)
  return category?.data
}

export default async function Collection({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const collection = await getCollection(id)
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
          backgroundImage: `url(${collection?.top_image?.url || collection?.image?.url || ''})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '100% 40%',
        }}
      >
        <div className="container">
          <Typography variant="text_pageTitle" className="text-white">
            <CategoryTitle category={collection as unknown as CategoryType} /> ({collection?.count || 0})
          </Typography>
        </div>
      </div>
      <div className="container my-10 mt-16 flex justify-between">
        <Breadcrumbs
          links={[
            { title: t.home, href: addLocaleToPath('/', locale) },
            {
              title: (
                <CategoryTitle category={collection as unknown as CategoryType} />
              ),
              href: addLocaleToPath(`/category/${collection?.documentId}`, locale),
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
          <ProductGrid />
        </Suspense>
        <ProductPagination />
      </div>
    </>
  )
}
