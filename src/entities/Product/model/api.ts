import { api } from '@/src/app'
import { apiMap } from '@/src/shared'
import type {
  ProductResponse,
  ProductListResponse,
  CreateProductRequest,
  UpdateProductRequest,
  GetProductsParams,
  ProductVariant,
  CreateVariantRequest,
  UpdateVariantRequest,
} from './types'

export const ProductService = {
  // Получение списка товаров
  getProducts: (params?: GetProductsParams): Promise<ProductListResponse> => {
    const searchParams = new URLSearchParams()
    
    if (params?.page) searchParams.append('pagination[page]', params.page.toString())
    if (params?.pageSize) searchParams.append('pagination[pageSize]', params.pageSize.toString())
    if (params?.search) searchParams.append('filters[title][$containsi]', params.search)
    if (params?.inStock) searchParams.append('filters[stock][$gt]', '0')
    if (params?.colors) {
      const colors = params.colors.split(',').map(c => c.trim())
      colors.forEach(color => {
        searchParams.append('filters[variants][color][slug][$eq]', color)
      })
    }
    if (params?.sizes) {
      const sizes = params.sizes.split(',').map(s => s.trim())
      sizes.forEach(size => {
        searchParams.append('filters[variants][size][slug][$eq]', size)
      })
    }
    if (params?.sort) {
      searchParams.append('sort', `${params.sort.field}:${params.sort.order}`)
    }
    if (params?.populate) {
      params.populate.forEach(field => searchParams.append('populate', field))
    } else {
      // По умолчанию загружаем основные поля
      searchParams.append('populate', 'gallery')
      searchParams.append('populate', 'variants')
      searchParams.append('populate', 'variants.color')
      searchParams.append('populate', 'variants.size')
      searchParams.append('populate', 'variants.images')
    }

    const url = `${apiMap.getProducts}?${searchParams.toString()}`
    return api.get(url).json()
  },

  // Получение товара по ID
  getProduct: (id: string): Promise<ProductResponse> => {
    const searchParams = new URLSearchParams()
    searchParams.append('populate', 'gallery')
    searchParams.append('populate', 'variants')
    searchParams.append('populate', 'variants.color')
    searchParams.append('populate', 'variants.size')
    searchParams.append('populate', 'variants.images')
    
    const url = `${apiMap.getProduct.replace(':id', id)}?${searchParams.toString()}`
    return api.get(url).json()
  },

  // Создание товара
  postProduct: (data: CreateProductRequest): Promise<ProductResponse> => {
    return api.post(apiMap.postProduct, { json: { data } }).json()
  },

  // Обновление товара
  putProduct: (id: string, data: UpdateProductRequest): Promise<ProductResponse> => {
    return api.put(apiMap.putProduct.replace(':id', id), { json: { data } }).json()
  },

  // Удаление товара
  deleteProduct: (id: string): Promise<void> => {
    return api.delete(apiMap.deleteProduct.replace(':id', id)).json()
  },
}

export const VariantService = {
  // Получение вариантов товара
  getVariants: (productId?: string): Promise<{ data: ProductVariant[] }> => {
    const searchParams = new URLSearchParams()
    if (productId) {
      searchParams.append('filters[product][id][$eq]', productId)
    }
    searchParams.append('populate', 'color')
    searchParams.append('populate', 'size')
    searchParams.append('populate', 'images')
    
    const url = `variants?${searchParams.toString()}`
    return api.get(url).json()
  },

  // Получение варианта по ID
  getVariant: (id: string): Promise<{ data: ProductVariant }> => {
    const searchParams = new URLSearchParams()
    searchParams.append('populate', 'color')
    searchParams.append('populate', 'size')
    searchParams.append('populate', 'images')
    
    const url = `variants/${id}?${searchParams.toString()}`
    return api.get(url).json()
  },

  // Создание варианта
  postVariant: (data: CreateVariantRequest): Promise<{ data: ProductVariant }> => {
    return api.post('variants', { json: { data } }).json()
  },

  // Обновление варианта
  putVariant: (id: string, data: UpdateVariantRequest): Promise<{ data: ProductVariant }> => {
    return api.put(`variants/${id}`, { json: { data } }).json()
  },

  // Удаление варианта
  deleteVariant: (id: string): Promise<void> => {
    return api.delete(`variants/${id}`).json()
  },
}