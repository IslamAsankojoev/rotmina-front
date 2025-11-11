// Basic types for images
export interface Image {
  id: number
  documentId: string
  name: string
  alternativeText?: string
  caption?: string
  width: number
  height: number
  url: string
  previewUrl?: string
  ext: string
  mime: string
  size: number
  hash: string
  provider: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

// Type for color
export interface Color {
  id: number
  documentId: string
  name: string
  code: string
  slug: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  hex: string | '#multy' | '#blwt'
}

// Type for size
export interface Size {
  id: number
  documentId: string
  name: string
  sort_order: number
  slug: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

// Type for product variant
export interface ProductVariant {
  id: number
  documentId: string
  sku: string
  price: number
  stock: number
  is_active: boolean
  color: Color
  size: Size
  images: Image[]
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface Category {
  createdAt: string
  description: string
  documentId: string
  id: number
  name: string
  publishedAt: string
  updatedAt: string
  image: Image
  slug: string
  nameHE: string
  descriptionHE: string
}

// Main product type
export interface Product {
  id: number
  documentId: string
  title: string
  slug: string
  description: string
  variants: ProductVariant[]
  createdAt: string
  updatedAt: string
  publishedAt: string
  inWishlist: boolean
  category: Category
  titleHE: string
  descriptionHE: string
  show_in_carousel: boolean
}

// Types for API responses
export interface ProductResponse {
  data: Product
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface ProductListResponse {
  data: Product[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

// Типы для создания/обновления товара
export interface CreateProductRequest {
  title: string
  slug: string
  description: string
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: number
}

// Типы для создания/обновления варианта товара
export interface CreateVariantRequest {
  sku: string
  price: number
  stock: number
  is_active: boolean
  color: number // Color ID
  size: number // Size ID
  product: number // Product ID
  images?: number[] // Image IDs
}

export interface UpdateVariantRequest extends Partial<CreateVariantRequest> {
  id: number
}

// Types for product filtering
export interface ProductFilters {
  category?: string
  colors?: string
  sizes?: string
  inStock?: boolean
  search?: string
  sort?: ProductSortOptions
}

// Types for product sorting
export type ProductSortField = 'title' | 'createdAt' | 'updatedAt'
export type ProductSortOrder = 'asc' | 'desc'

export interface ProductSortOptions {
  field: ProductSortField
  order: ProductSortOrder
}

// Types for pagination
export interface PaginationParams {
  page?: number
  pageSize?: number
}

// Types for product request with parameters
export interface GetProductsParams extends ProductFilters, PaginationParams {
  sort?: ProductSortOptions
  populate?: string[]
}
