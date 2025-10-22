export type Collection = {
  documentId: string
  name: string
  description: string
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

export type CollectionResponse = {
  data: Collection[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}