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
import { Breadcrumbs, Typography } from '@/src/shared'
import { ArrowDownUp, Loader } from 'lucide-react'

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

  return (
    <>
      <div
        className="relative flex h-[390px] w-full flex-col justify-end saturate-0"
        style={{
          backgroundImage: `url(${category?.image?.url || ''})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '100% 40%',
        }}
      >
        <div className="container">
          <Typography variant="text_pageTitle" className="text-white">
            {category?.name} ({category?.count || 0})
          </Typography>
        </div>
      </div>
      <div className="container my-10 mt-16 flex justify-between">
        <Breadcrumbs
          links={[
            { title: 'HOME', href: '/' },
            {
              title: (
                <CategoryTitle category={category as unknown as CategoryType} />
              ),
              href: `/category/${category?.slug}`,
            },
          ]}
        />
        <div className="flex gap-4">
          <ProductFilter />
          <div className="flex gap-2">
            <Typography variant="text_main" className="hidden md:inline">
              SORT BY:
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
