'use client'

import { Button } from '@/shadcn/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/shadcn/components/ui/pagination'
import { Typography, useProducts } from '@/src/shared'

interface ProductPaginationProps {
  totalPages?: number
}

export const ProductPagination = ({ totalPages = 5 }: ProductPaginationProps) => {
  const { currentPage, updatePage, data } = useProducts()
  
  // Get total pages from data or use passed value
  const totalPagesFromData = data?.meta?.pagination?.pageCount || totalPages
  
  const handlePageChange = (page: number) => {
    updatePage(page)
  }

  const handleLoadMore = () => {
    // Logic for loading additional products
    // Can implement infinite scroll or increase pageSize
    console.log('Load more products')
  }

  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-5">
      <Pagination>
        <PaginationContent>
          {Array.from({ length: totalPagesFromData }, (_, index) => (
            <PaginationItem key={index} value={index + 1}>
              <PaginationLink
                onClick={() => handlePageChange(index + 1)}
                isActive={currentPage === index + 1}
              >
                <Typography 
                  variant="text_1" 
                  className={currentPage === index + 1 ? 'underline' : ''}
                >
                  {index + 1}
                </Typography>
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
      <Button variant="link" onClick={handleLoadMore}>
        <Typography variant="text_1" className="uppercase">
          load more
        </Typography>
      </Button>
    </div>
  )
}
