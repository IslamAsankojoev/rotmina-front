import { Order, Address } from '@/src/features/OrderHistory'

export type AuthCredentials = {
  identifier: string
  password: string
}

export type User = {
  id: number
  documentId: string
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
  phone: null | string
  orders?: Order[]
  addresses?: Address[]
}
