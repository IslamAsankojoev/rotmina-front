
import { CategoryService, ProductFilter, ProductPagination, ProductSort } from '@/src/features'
import { Breadcrumbs, Typography } from '@/src/shared'
import { ArrowDownUp } from 'lucide-react'
import { ProductGrid } from '@/src/entities/Product'
import { Suspense } from 'react'

const getCategory = async (id: string) => {
  const category = await CategoryService.getCategory(id)
  return category?.data
}

export default async function Category({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const category = await getCategory(id)

  return (
    <>
      <div
        className="relative mt-24 md:mt-36 flex h-[390px] w-full flex-col justify-end saturate-0"
        style={{
          backgroundImage: `url(${category?.image?.url || ''})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '100% 40%',
        }}
      >
        <div className="container">
          <Typography variant="text_pageTitle" className="text-white">{category?.name} ({category?.count || 0})</Typography>
        </div>
      </div>
      <div className="container my-12 flex justify-between md:my-26">
        <Breadcrumbs
          links={[
            { title: 'HOME', href: '/' },
            { title: 'SHIRT', href: '/category/shirt' },
          ]}
        />
        <div className="flex gap-4">
          <ProductFilter />
          <div className="flex gap-2">
            <Typography variant="text_main" className="hidden md:inline">SORT BY:</Typography>
            <ArrowDownUp strokeWidth={0.75} className="inline md:hidden" />
            <ProductSort />
          </div>
        </div>
      </div>
      <div className="container mt-8 mb-24">
        <Suspense fallback={<div>Loading...</div>}>
          <ProductGrid categoryId={category?.documentId} />
        </Suspense>
        <ProductPagination />
      </div>
    </>
  )
}