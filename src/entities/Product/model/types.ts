// Базовые типы для изображений
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

// Тип для цвета
export interface Color {
  id: number
  documentId: string
  name: string
  code: string
  slug: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  hex: string
}

// Тип для размера
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

// Тип для варианта товара
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

// Основной тип товара
export interface Product {
  id: number
  documentId: string
  title: string
  slug: string
  description: string
  gallery: Image[]
  variants: ProductVariant[]
  createdAt: string
  updatedAt: string
  publishedAt: string
}

// Типы для API ответов
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
  gallery?: number[] // ID изображений
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
  color: number // ID цвета
  size: number // ID размера
  product: number // ID товара
  images?: number[] // ID изображений
}

export interface UpdateVariantRequest extends Partial<CreateVariantRequest> {
  id: number
}

// Типы для фильтрации товаров
export interface ProductFilters {
  category?: string
  colors?: string
  sizes?: string
  inStock?: boolean
  search?: string
  sort?: ProductSortOptions
}

// Типы для сортировки товаров
export type ProductSortField = 'title' | 'createdAt' | 'updatedAt'
export type ProductSortOrder = 'asc' | 'desc'

export interface ProductSortOptions {
  field: ProductSortField
  order: ProductSortOrder
}

// Типы для пагинации
export interface PaginationParams {
  page?: number
  pageSize?: number
}

// Типы для запроса товаров с параметрами
export interface GetProductsParams extends ProductFilters, PaginationParams {
  sort?: ProductSortOptions
  populate?: string[]
}
