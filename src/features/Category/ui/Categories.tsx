import { Typography } from "@/src/shared"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { CategoryService } from "../model/api"

const getCategories = async () => {
  const categories = await CategoryService.getCategories()
  return categories?.data
}

export const Categories = async () => {
  const categories = await getCategories()

  return (
    <div className="my-10 grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {categories?.map((category, index) => (
          <Link
            href={`/category/${category.documentId}`}
            key={category.documentId}
            className={clsx(
              'relative block h-96 w-full saturate-0 md:h-[600px]',
              index === 4 && 'col-span-2 md:col-span-2 lg:col-span-4',
            )}
          >
            <Image
              src={category?.image?.url || ''}
              alt={category?.name || ''}
              fill
              objectFit="cover"
            />
            <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center">
              <Typography variant="text_categories" className="text-white">
                {category.name} ({category.count})
              </Typography>
            </div>
          </Link>
        ))}
      </div>
  )
}