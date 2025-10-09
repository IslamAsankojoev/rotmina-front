'use client'

import { useQuery } from "@tanstack/react-query"
import { api } from '@/src/app'
import { Color, Size } from "@/src/entities/Product"

interface ColorsResponse {
  data: Color[]
}

interface SizesResponse {
  data: Size[]
}

export const useColorsAndSizes = () => {
  const { data: colorsData, isLoading: colorsLoading, error: colorsError } = useQuery({
    queryKey: ['colors'],
    queryFn: (): Promise<ColorsResponse> => api.get('colors').json(),
  })

  const { data: sizesData, isLoading: sizesLoading, error: sizesError } = useQuery({
    queryKey: ['sizes'],
    queryFn: (): Promise<SizesResponse> => api.get('sizes').json(),
  })

  return {
    colors: colorsData?.data || [],
    sizes: sizesData?.data || [],
    isLoading: colorsLoading || sizesLoading,
    error: colorsError || sizesError,
  }
}
