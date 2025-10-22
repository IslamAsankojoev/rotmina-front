export type OrderItem = {
  id: number
  documentId: string
  title_snapshot: string
  sku_snapshot: string
  price_snapshot: string
  quantity: number
  subtotal: number
  type: 'product' | 'giftcard' | 'personalStylist'
  variant?: {
    id: number
    documentId: string
    sku: string
    price: number
    stock: number
    color?: {
      id: number
      documentId: string
      name: string
      code: string
      slug: string
    }
    size?: {
      id: number
      documentId: string
      name: string
      sort_order: number
      slug: string
    }
    is_active: boolean
    images?: Array<{
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
    }>
    product?: {
      id: number
      documentId: string
      title: string
      slug: string
      description: string
      gallery?: Array<{
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
  shipping_address?: Address
  billing_address?: Address
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
