export type Address = {
  id?: number
  documentId?: string
  address: string
  city: string
  zip_code: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
  locale?: string | null
}

export type AddressResponse = {
  data: Address[]
  success: boolean
  message: string
}