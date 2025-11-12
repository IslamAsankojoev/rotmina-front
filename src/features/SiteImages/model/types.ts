import { Image } from "@/src/entities/Product"

export interface SiteImages {
  my_story: Image
  return_exchange: Image
  login: Image
  order_success_modal: Image
  personal_stylist: Image
}

export interface SiteImagesResponse {
  data: SiteImages
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}