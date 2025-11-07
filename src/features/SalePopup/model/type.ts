import { Image } from "@/src/entities/Product"

export type SalePopup = {
  id: number
  documentId: string
  title: string
  description: string
  link: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
  show: true
  delay: number
  link_text: string
  image: Image
}

export type SalePopupResponse = {
  data: SalePopup
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
