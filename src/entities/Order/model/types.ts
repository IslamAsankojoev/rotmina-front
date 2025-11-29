import { GiftCard, PersonalStylist } from "@/src/features"
import { ProductVariant } from "../../Product"
import { PAYMENT_ERROR_CODES } from "@/src/shared"

// Types for images
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

// Types for address
export interface Address {
  id: number
  documentId: string
  city: string
  address: string
  is_default: boolean
}

// Types for payment details
export interface PaymentDetails {
  card_number?: string
  name_on_card?: string
  expiration_date?: string
  cvv?: string
}

// Types for order item
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
    }
  }
}

// Types for creating order (cart data)
export interface CreateOrderItem {
  id: string
  documentId?: string
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
      image: Image
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
  clientId: string
  txn_currency_code: string
  card_number: string
  expire_month: string
  expire_year: string
  cvv: string
  discount?: number | null
  items: Array<{
    code: string
    name: string
    unit_price: number
    unit_type: number
    units_number: number
    currency_code: string
    attributes: Array<{
      name: string
      value: string
    }>
  }>
}

export interface Order {
  // id: number
  documentId: string
  order_number: number
  number: number
  order_status: 'delivered' | 'pending' | 'cancelled'
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

// Types for API response
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


export interface PayOrderResponse {
  success: boolean
  data: {
      error_code: number
      message: string
      transaction_result: {
          processor_response_code: keyof typeof PAYMENT_ERROR_CODES,
          transaction_id: string
          transaction_resource: number
          Responsecvv: string
          Responseid: string
          amount: number
          DBFIsForeign: string
          auth_number: string
          card_type: string
          card_type_name: string
          currency_code: string
          expiry_month: string
          expiry_year: string
          payment_plan: string
          credit_card_owner_id: string
          card_issuer: string
          token: string
          last_4: string
          card_mask: string
          card_locality: string
          txn_type: string
          tranmode: string
      },
      original_request: {
          terminal_name: string
          txn_currency_code: string
          pan_entry_mode: string
          card_number: string
          expire_month: number
          expire_year: number
          cvv: string
          payment_plan: number
          response_language: string
          activate_3ds: string
          items: {
            code: string
            name: string
            type: string
            unit_price: number
            unit_type: number
            price_type: string
            units_number: number
            currency_code: string
            discount_type: string
            discount: number
            vat_percent: number
            attributes: Array<{
              name: string
              value: string
            }>
          }[]
      }
  }
}

export interface OrderPaymentStatus {
  id: number
  clientId: number
  orderId: number
  processor_response_code: keyof typeof PAYMENT_ERROR_CODES,
  transaction_id: string
}

export interface Govina {
  code: number
  sum: number
  date: string
  remarks: string
}

export interface CreateShipmentRequest {
  clientNumber?: number
  mesiraIsuf?: string
  shipmentTypeCode?: number
  stageCode?: number
  ordererName?: string
  cargoTypeHaloch?: number
  cargoTypeHazor?: number
  packsHaloch?: string
  packsHazor?: number
  nameTo?: string
  cityCode?: string
  cityName?: string
  streetCode?: string
  streetName?: string
  houseNum?: string
  entrance?: string
  floor?: string
  apartment?: string
  telFirst?: string
  telSecond?: string
  addressRemarks?: string
  shipmentRemarks?: string
  referenceNum1?: string
  referenceNum2?: string
  futureDate?: string
  futureTime?: string
  pudoCodeOrigin?: number
  pudoCodeDestination?: number
  autoBindPudo?: string
  email?: string
  productsPrice?: number
  productPriceCurrency?: string
  shipmentWeight?: number
  govina?: Govina
}

export interface ShipmentResponse {
  shipmentNumber?: number
  randNumber?: string
  referenceNumber1?: string
  referenceNumber2?: string
  deliveryLine?: number
  deliveryArea?: number
  errorCode?: string
  errorMessage?: string
  existingShipmentNumber?: number
  sortingCode?: number
  pickUpCode?: number
}