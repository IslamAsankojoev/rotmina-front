import { api } from '@/src/app'
import { apiMap } from '@/src/shared'
import type {
  ProductResponse,
  ProductListResponse,
  GetProductsParams,
  ProductVariant,
  CreateVariantRequest,
  UpdateVariantRequest,
} from './types'

export const ProductService = {
  // Get products list
  getProducts: (params?: GetProductsParams): Promise<ProductListResponse> => {
    const searchParams = new URLSearchParams()
    if (params?.category) searchParams.append('filters[category][documentId][$eq]', params.category)
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
      // Load main fields by default
      searchParams.append('populate', 'variants')
      searchParams.append('populate', 'variants.color')
      searchParams.append('populate', 'variants.size')
      searchParams.append('populate', 'variants.images')
      searchParams.append('populate', 'users')
    }

    const url = `${apiMap.getProducts}?${searchParams.toString()}`
    return api.get(url).json()
  },

  // Get product by ID
  getProduct: (id: string): Promise<ProductResponse> => {
    const searchParams = new URLSearchParams()
    searchParams.append('populate', 'variants')
    searchParams.append('populate', 'variants.color')
    searchParams.append('populate', 'variants.size')
    searchParams.append('populate', 'variants.images')
    searchParams.append('populate', 'category')
    
    const url = `${apiMap.getProduct.replace(':id', id)}?${searchParams.toString()}`
    return api.get(url).json()
  },
}

export const VariantService = {
  // Get product variants
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

  // Get variant by ID
  getVariant: (id: string): Promise<{ data: ProductVariant }> => {
    const searchParams = new URLSearchParams()
    searchParams.append('populate', 'color')
    searchParams.append('populate', 'size')
    searchParams.append('populate', 'images')
    
    const url = `variants/${id}?${searchParams.toString()}`
    return api.get(url).json()
  },

  // Create variant
  postVariant: (data: CreateVariantRequest): Promise<{ data: ProductVariant }> => {
    return api.post('variants', { json: { data } }).json()
  },

  // Update variant
  putVariant: (id: string, data: UpdateVariantRequest): Promise<{ data: ProductVariant }> => {
    return api.put(`variants/${id}`, { json: { data } }).json()
  },

  // Delete variant
  deleteVariant: (id: string): Promise<void> => {
    return api.delete(`variants/${id}`).json()
  },
}