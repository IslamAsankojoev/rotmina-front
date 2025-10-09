'use client'

import { ProductService, ProductSortField, ProductListResponse } from "@/src/entities/Product"
import { useQuery } from "@tanstack/react-query"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect, useCallback } from "react"

interface ProductParams {
  page?: number
  pageSize?: number
  search?: string
  colors?: string
  sizes?: string
  sort?: string
}

interface UseProductsReturn {
  // Данные
  data: ProductListResponse | undefined
  isLoading: boolean
  error: Error | null
  
  // Состояние фильтров
  selectedColors: string[]
  selectedSizes: string[]
  currentSort: string
  currentPage: number
  
  // Методы для управления состоянием
  setSelectedColors: (colors: string[]) => void
  setSelectedSizes: (sizes: string[]) => void
  setCurrentSort: (sort: string) => void
  setCurrentPage: (page: number) => void
  
  // Методы для обновления URL
  updateFilters: (filters: { colors?: string[]; sizes?: string[] }) => void
  updateSort: (sort: string) => void
  updatePage: (page: number) => void
  
  // Методы для сброса
  resetFilters: () => void
  resetAll: () => void
}

export const useProducts = (): UseProductsReturn => {
  const router = useRouter()
  const params = useSearchParams()
  
  // Получаем параметры из URL
  const urlPage = params.get('page')
  const urlPageSize = params.get('pageSize')
  const urlSearch = params.get('search')
  const urlColors = params.get('colors')
  const urlSizes = params.get('sizes')
  const urlSort = params.get('sort')

  // Локальное состояние
  const [selectedColors, setSelectedColors] = useState<string[]>(
    urlColors ? urlColors.split(',') : []
  )
  const [selectedSizes, setSelectedSizes] = useState<string[]>(
    urlSizes ? urlSizes.split(',') : []
  )
  const [currentSort, setCurrentSort] = useState<string>(
    urlSort || 'Popularity'
  )
  const [currentPage, setCurrentPage] = useState<number>(
    urlPage ? parseInt(urlPage) : 1
  )

  // Функция для преобразования строки сортировки в объект
  const getSortOptions = (sortString: string) => {
    const sortMap: Record<string, { field: ProductSortField; order: 'asc' | 'desc' }> = {
      'Popularity': { field: 'createdAt', order: 'desc' },
      'Price up': { field: 'updatedAt', order: 'asc' }, // Используем updatedAt для имитации сортировки по цене
      'price down': { field: 'updatedAt', order: 'desc' }, // Используем updatedAt для имитации сортировки по цене
      'sale': { field: 'createdAt', order: 'desc' },
    }
    return sortMap[sortString] || { field: 'createdAt', order: 'desc' }
  }

  // Функция для обновления URL
  const updateURL = useCallback((newParams: Partial<ProductParams>) => {
    const currentParams = new URLSearchParams(params.toString())
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        currentParams.set(key, value.toString())
      } else {
        currentParams.delete(key)
      }
    })
    
    router.push(`/shop?${currentParams.toString()}`)
  }, [router, params])

  // Запрос данных
  const { data, isLoading, error } = useQuery({
    queryKey: ['products', urlPage, urlPageSize, urlSearch, urlColors, urlSizes, urlSort],
    queryFn: () => ProductService.getProducts({
      page: urlPage ? parseInt(urlPage) : 1,
      pageSize: urlPageSize ? parseInt(urlPageSize) : 12,
      search: urlSearch || undefined,
      colors: urlColors || undefined,
      sizes: urlSizes || undefined,
      sort: urlSort ? getSortOptions(urlSort) : { field: 'createdAt', order: 'desc' },
    }),
  })

  const updateFilters = useCallback((filters: { colors?: string[]; sizes?: string[] }) => {
    const newParams: Partial<ProductParams> = {}
    
    if (filters.colors !== undefined) {
      setSelectedColors(filters.colors)
      newParams.colors = filters.colors.length > 0 ? filters.colors.join(',') : undefined
    }
    
    if (filters.sizes !== undefined) {
      setSelectedSizes(filters.sizes)
      newParams.sizes = filters.sizes.length > 0 ? filters.sizes.join(',') : undefined
    }
    
    // Сбрасываем страницу при изменении фильтров
    newParams.page = 1
    setCurrentPage(1)
    
    updateURL(newParams)
  }, [updateURL])

  const updateSort = useCallback((sort: string) => {
    setCurrentSort(sort)
    updateURL({ sort, page: 1 })
    setCurrentPage(1)
  }, [updateURL])

  const updatePage = useCallback((page: number) => {
    setCurrentPage(page)
    updateURL({ page })
  }, [updateURL])

  const resetFilters = useCallback(() => {
    setSelectedColors([])
    setSelectedSizes([])
    setCurrentPage(1)
    updateURL({ colors: undefined, sizes: undefined, page: 1 })
  }, [updateURL])

  const resetAll = useCallback(() => {
    setSelectedColors([])
    setSelectedSizes([])
    setCurrentSort('Popularity')
    setCurrentPage(1)
    updateURL({ colors: undefined, sizes: undefined, sort: undefined, page: 1 })
  }, [updateURL])

  // Синхронизация с URL при изменении параметров
  useEffect(() => {
    if (urlColors !== null) {
      setSelectedColors(urlColors ? urlColors.split(',') : [])
    }
    if (urlSizes !== null) {
      setSelectedSizes(urlSizes ? urlSizes.split(',') : [])
    }
    if (urlSort !== null) {
      setCurrentSort(urlSort || 'Popularity')
    }
    if (urlPage !== null) {
      setCurrentPage(urlPage ? parseInt(urlPage) : 1)
    }
  }, [urlColors, urlSizes, urlSort, urlPage])

  return {
    // Данные
    data,
    isLoading,
    error,
    
    // Состояние
    selectedColors,
    selectedSizes,
    currentSort,
    currentPage,
    
    // Методы для управления состоянием
    setSelectedColors,
    setSelectedSizes,
    setCurrentSort,
    setCurrentPage,
    
    // Методы для обновления URL
    updateFilters,
    updateSort,
    updatePage,
    
    // Методы для сброса
    resetFilters,
    resetAll,
  }
}