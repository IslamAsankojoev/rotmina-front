import { Image } from "@/src/entities/Product"

export type Collection = {
  documentId: string
  name: string
  description: string
  nameHE: string
  descriptionHE: string
  count?: number
  link?: string
  top_image?: Image
  image?: Image
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

export type CollectionOneResponse = {
  data: Collection
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}