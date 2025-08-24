export type AuthCredentials = {
  identifier: string
  password: string
}

export type OrderItem = {
  id: number
  documentId: string
  title_snapshot: string
  sku_snapshot: string
  price_snapshot: string
  quantity: number
  subtotal: number
  variant?: {
    id: number
    documentId: string
    sku: string
    price: number
    stock: number
    product?: {
      id: number
      documentId: string
      title: string
      slug: string
      description: string
      gallery?: Array<{
        id: number
        documentId: string
        url: string
        name: string
      }>
    }
  }
}

export type Order = {
  id: number
  documentId: string
  number: number
  order_status: 'Delivered' | 'Pending' | 'Cancelled'
  total_amount: number
  payment_method: 'cash' | 'card'
  payment_status: 'unpaid' | 'paid' | 'refunded' | 'partially_refunded'
  shipment_tracking?: number
  notes?: string
  order_items?: OrderItem[]
  shipping_address?: {
    id: number
    documentId: string
    label: string
    country: string
    city: string
    street: string
    house: string
    apartment: string
    is_default: boolean
  }
  billing_address?: {
    id: number
    documentId: string
    label: string
    country: string
    city: string
    street: string
    house: string
    apartment: string
    is_default: boolean
  }
  createdAt: string
  updatedAt: string
}

export type Address = {
  id: number
  documentId: string
  label: string
  country: string
  city: string
  street: string
  house: string
  apartment: string
  is_default: boolean
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
