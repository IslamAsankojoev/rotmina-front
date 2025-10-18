import { Order, Address } from '@/src/features/OrderHistory'

export type AuthCredentials = {
  identifier: string
  password: string
}

export type SignupCredentials = {
  email: string
  password: string
  username: string
  surname: string
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


export type ResetPasswordCredentials = {
  email: string
}

export type NewPasswordCredentials = {
  password: string
  passwordConfirmation: string
  code: string
}