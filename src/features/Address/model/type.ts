export type Address = {
  id?: number
  documentId?: string
  label: string
  country: string
  city: string
  street: string
  house: string
  apartment: string
  is_default: boolean
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