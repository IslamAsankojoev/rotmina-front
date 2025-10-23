import { GiftCard, PersonalStylist } from "@/src/features"
import { ProductVariant } from "../../Product"

// Типы для изображений
export interface Image {
  id: number
  documentId: string
  name: string
  alternativeText?: string
  caption?: string
  width: number
  height: number
  url: string
  previewUrl?: string
  ext: string
  mime: string
  size: number
  hash: string
  provider: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

// Типы для адреса
export interface Address {
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

// Типы для деталей платежа
export interface PaymentDetails {
  card_number?: string
  name_on_card?: string
  expiration_date?: string
  cvv?: string
}

// Типы для элемента заказа
export interface OrderItem {
  id: number
  documentId: string
  title_snapshot: string
  sku_snapshot: string
  price_snapshot: string
  quantity: number
  subtotal: number
  type: 'product' | 'giftcard' | 'personalStylist'
  gift_card?: GiftCard
  personal_stylist?: PersonalStylist
  variant?: ProductVariant & {
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

// Типы для создания заказа (данные из корзины)
export interface CreateOrderItem {
  id: string
  type: 'product' | 'giftcard' | 'personalStylist'
  variant?: {
    id: number
    documentId: string
    sku: string
    price: number
    stock: number
    is_active: boolean
    images: Image[] | null
    size: {
      id: number
      documentId: string
      name: string
      sort_order: number
      slug: string
    }
    color: {
      id: number
      documentId: string
      name: string
      code: string
      slug: string
      hex: string
    }
  }
  productTitle?: string
  productSlug?: string
  amount?: number
  recipientEmail?: string
  recipientName?: string
  message?: string
  sessionType?: 'virtual' | 'in-person'
  duration?: number
  quantity: number
  price: number
}

export interface CreateOrderRequest {
  items: CreateOrderItem[]
  addressId: string
  payment_method: 'card' | 'cash'
  payment_details?: PaymentDetails
  totalPrice: number
  notes?: string
  payment_status: 'unpaid' | 'paid' | 'failed'
  currency_code: string
}

export interface PayOrderRequest {
  orderId: string
  txn_currency_code: string
  card_number: string
  expire_month: string
  expire_year: string
  cvv: string
  items: CreateOrderItem[]
}

export interface Order {
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
  currency_code: string
}

export interface OrderResponseStrapi {
  data: Order
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

// Типы для ответа API
export interface OrderResponse {
  data: Order
  success: boolean
  message: string
}

export interface OrderListResponse {
  data: Order[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
