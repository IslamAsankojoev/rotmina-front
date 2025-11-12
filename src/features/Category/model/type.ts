import { Image } from "@/src/entities/Product"

export type Category = {
  documentId: string
  slug: string
  name: string
  description: string
  nameHE: string
  descriptionHE: string
  count?: number
  image?: Image
  top_image?: Image
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
