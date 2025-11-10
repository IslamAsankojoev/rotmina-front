export type Category = {
  documentId: string
  slug: string
  name: string
  description: string
  nameHE: string
  descriptionHE: string
  count?: number
  image?: {
    id: number
    documentId: string
    name: string
    alternativeText?: string
    caption?: string
    width?: number
    height?: number
    url: string
    previewUrl?: string
    ext?: string
    mime?: string
    size?: number
  }
}

export type CategoryResponse = {
  data: Category[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export type CategoryFindOneResponse = {
  data: Category
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
