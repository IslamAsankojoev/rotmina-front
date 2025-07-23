'use client'

import { Button } from '@/shadcn/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/shadcn/components/ui/pagination'
import { Typography } from '@/src/shared'

interface ProductPaginationProps {
  totalPages?: number
}

export const ProductPagination = ({ totalPages = 5 }: ProductPaginationProps) => {
  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-5">
      <Pagination>
        <PaginationContent>
          {Array.from({ length: totalPages || 10 }, (_, index) => (
            <PaginationItem key={index} value={index + 1}>
              <PaginationLink>
                <Typography variant="text_1" className='underline'>{index + 1}</Typography>
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
      <Button variant="link">
        <Typography variant="text_1" className="uppercase">
          load more
        </Typography>
      </Button>
    </div>
  )
}
