'use client'

import { Typography } from '@/src/shared'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import Link from 'next/link'

import { CategoryService } from '../model/api'
import { CategoryTitle } from './CategoryTitle'

export const Categories = () => {
  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: () => CategoryService.getCategories(),
  })
  const categories = data?.data || []

  return (
    <div className="my-10 grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {categories?.map((category, index) => (
        <Link
          href={`/category/${category.slug}`}
          key={category.documentId}
          className={clsx(
            'group relative block h-96 w-full overflow-hidden md:h-[600px]',
            index === 4 && 'col-span-2 md:col-span-2 lg:col-span-4',
          )}
        >
          <div className="relative h-full w-full">
            <img
              src={category?.image?.url || ''}
              alt={`Rotmina Categories Image`}
              style={{ objectFit: 'cover' }}
              className="w-full h-full saturate-0 transition-all duration-1000 group-hover:scale-[1.3] group-hover:saturate-100"
            />
          </div>
          <div className="bg-opacity-50 absolute inset-0 z-10 flex items-center justify-center">
            <Typography
              variant="text_categories"
              className="text-mobile-categories md:!text-categories !text-white"
            >
              <CategoryTitle category={category} /> ({category.count})
            </Typography>
          </div>
        </Link>
      ))}
    </div>
  )
}
