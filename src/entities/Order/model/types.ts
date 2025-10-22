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
  name: string
  surname: string
  email: string
  phone: string
  address: string
  zipCode: string
  city?: string
  country?: string
}

// Типы для деталей платежа
export interface PaymentDetails {
  card_number?: string
  name_on_card?: string
  expiration_date?: string
  cvv?: string
}

// Типы для элемента заказа - товар
export interface ProductOrderItem {
  id: string
  type: "product",
  variant: {
      id: number
      documentId: string
      sku: string
      price: number,
      stock: number,
      is_active: boolean,
      images: Image[] | null,
      size: {
          id?: number,
          documentId: string,
          name: string,
          sort_order: number,
          slug: string,
      },
      color: {
          id?: number,
          documentId: string,
          name: string,
          code: string,
          slug: string,
          hex: string,
      }
  },
  productTitle: string,
  productSlug: string,
  quantity: number,
  price: number,
}

// Типы для элемента заказа - подарочная карта
export interface GiftCardOrderItem {
  id: string
  type: 'giftcard'
  amount: number
  recipientEmail?: string
  recipientName?: string
  message?: string
  quantity: number
  price: number
}

// Типы для элемента заказа - персональный стилист
export interface PersonalStylistOrderItem {
  id: string
  type: 'personalStylist'
  sessionType: 'virtual' | 'in-person'
  duration: number
  quantity: number
  price: number
}

// Объединенный тип для всех элементов заказа
export type OrderItem = ProductOrderItem | GiftCardOrderItem | PersonalStylistOrderItem

// Типы для создания заказа
export interface CreateOrderRequest {
  items: OrderItem[]
  addressId: string
  payment_method: 'card' | 'cash'
  payment_details?: PaymentDetails
  totalPrice: number
  notes?: string
  payment_status: 'unpaid' | 'paid' | 'failed'
}

export interface Order {
  id: number
  documentId: string
  items: OrderItem[]
  shipping_address: Address
  billing_address: Address
  payment_method: string
  total_amount: number
  order_status: string
  notes?: string
  createdAt: string
  updatedAt: string
  number: string
  payment_status: string
}

// Типы для ответа API
export interface OrderResponse {
  data: Order
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface OrderListResponse {
  data: Array<{
    id: number
    documentId: string
    items: OrderItem[]
    shipping_address: Address
    billing_address: Address
    payment_method: string
    total_amount: number
    order_status: string
    notes?: string
    createdAt: string
    updatedAt: string
  }>
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
