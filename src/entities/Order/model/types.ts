import { GiftCard, PersonalStylist } from '@/src/features'
import { Code, Currency, PAYMENT_ERROR_CODES } from '@/src/shared'

import { ProductVariant } from '../../Product'

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
  zip_code: string
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
  type: 'product' | 'giftcard' | 'personalStylist' | 'shipment' | 'discount'
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
  type: 'product' | 'giftcard' | 'personalStylist' | 'shipment' | 'discount'
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
  currency_code: Currency
}

export interface PayOrderRequest {
  terminal_name: 'rotmina'
  txn_currency_code: Currency
  txn_type: 'debit'
  card_number: string
  expire_month: number
  expire_year: number
  card_holder_id: string
  cvv: string
  payment_plan: number
  activate_3ds: 'Y' | 'N'
  force_txn_on_3ds_fail: 'Y' | 'N'
  client: {
    email: string
    address_line_1: string
    address_line_2: string
  }
  items: Array<{
    code: string
    name: string
    unit_price: number
    type: 'I'
    units_number: number
    unit_type: number
    price_type: 'G'
    currency_code: Currency
    to_txn_currency_exchange_rate: 1
    attributes: {
      name: 'size' | 'color'
      value: string
    }[]
  }>
  response_language: 'english'
  user_defined_fields: [
    {
      name: 'company'
      value: 'rotmina'
    },
  ]
  '3ds_settings': {
    force_challenge: 1
    browser: {
      java_enabled: 0
      language: 'en-gb'
      color_depth: 24
      screen_height: 934
      screen_width: 1255
      time_zone: 5
      window_size: '04'
    }
  }
  auth_3ds_redirect: {
    url: string
    params: {
      key: string
      value: string
    }[]
  }
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
  currency_code: Currency
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
  error_code: 0
  message: 'Success' | string
  '3ds_data': {
    version: '2.2.0' | string
    statusCode: 'AC' | string
    message: 'Initialized challenge.' | string
    challengeUrl: string
    acsUrl: string
    cReq: string
    acsTransID: string
    dsTransID: string
    dsReferenceNumber: string
    threeDSServerTransID: string
    threeDSSessionData: string
    track_id: string
  }
  original_request: {
    terminal_name: 'rotmina' | string
    txn_currency_code: Currency
    txn_type: 'debit'
    card_number: string
    expire_month: number
    expire_year: number
    payment_plan: number
    activate_3ds: 'Y' | string
    force_txn_on_3ds_fail: 'N' | string
    client: {
      email: string
      address_line_1: string
      address_line_2: string
    }
    items: [
      {
        code: string
        name: string
        unit_price: number
        type: 'I'
        units_number: number
        unit_type: 1
        price_type: 'G' | string
        currency_code: Currency
        to_txn_currency_exchange_rate: number
        attributes: {
          name: 'size' | 'color'
          value: string
        }
      },
    ]
    response_language: 'english'
    user_defined_fields: [
      {
        name: string
        value: string
      },
    ]
    '3ds_settings': {
      force_challenge: number
      browser: {
        java_enabled: number
        language: string
        color_depth: number
        screen_height: number
        screen_width: number
        time_zone: number
        window_size: string
      }
    }
    auth_3ds_redirect: {
      url: string
      params: []
    }
  }
  transaction_result?: {
    processor_response_code: keyof typeof PAYMENT_ERROR_CODES
    transaction_id: string
    auth_number: string
    amount: number
    currency_code: Currency
    expiry_month: string
    expiry_year: number
    payment_plan: number
  }
}

export interface OrderPaymentStatus {
  id: number
  clientId: number
  orderId: number
  processor_response_code: keyof typeof PAYMENT_ERROR_CODES
  transaction_id: string
}

export interface Govina {
  code: number
  sum: number
  date: string
  remarks: string
}

export interface CreateShipmentRequest {
  clientId: number
  orderId: number
  cityName: string
  streetName: string
  HouseNum: string
  apartment: string
  floor: string
  telFirst: string
  telSecond: string
  email: string
  productsPrice: number
  productPriceCurrency: Currency
  shipmentWeight: number
  govina: Govina
  ordererName: string
  nameTo: string
  cityCode: string
  streetCode: string
  packsHaloch: string
}

export interface ShipmentResponse {
  shipmentNumber?: number
}

export interface CompletePaymentRequest {
  track_id: string
  terminal_name: 'rotmina'
}

export interface CompletePaymentResponse {
  error_code: number
  message: 'Success' | string
  transaction_result: {
    processor_response_code: keyof typeof PAYMENT_ERROR_CODES
    transaction_id: string
    transaction_resource: number
    Responsecvv: string
    Responseid: string
    ConfirmationCode: string
    Tempref: string
    amount: number
    DBFIsForeign: string
    auth_number: string
    card_type: string
    card_type_name: string
    currency_code: string
    expiry_month: string
    expiry_year: string
    payment_plan: string
  }
  t3ds_data: {
    version: string
    statusCode: string
    statusMessage: string
    threeDSServerTransID: string
    acsTransID: string
    dsTransID: string
    authenticationType: string
    authenticationValue: string
    cavv: string
    eci: string
    xid: string
    track_id: string
  }
  original_request: {
    terminal_name: string
    txn_currency_code: Currency
    txn_type: 'debit'
    card_number: string
    expire_month: string
    expire_year: string
    payment_plan: number
    activate_3ds: 'Y'
    force_txn_on_3ds_fail: 'N'
    client: {
      email: string
      address_line_1: string
      address_line_2: string
    }
    items: [
      {
        code: string
        name: string
        unit_price: number
        type: 'I'
        units_number: number
        unit_type: number
        price_type: 'G' | string
        currency_code: Currency
        to_txn_currency_exchange_rate: 1
        attributes: {
          name: 'size' | 'color'
          value: string
        }[]
      },
    ]
    response_language: 'english' | string
    user_defined_fields: [
      {
        name: 'company'
        value: string
      },
    ]
    '3ds_settings': {
      force_challenge: number
      browser: {
        java_enabled: 0
        language: string
        color_depth: 24
        screen_height: 934
        screen_width: 1255
        time_zone: 5
        window_size: '04'
        javascript_enabled: true
      }
    }
    auth_3ds_redirect: {
      url: string
      params: []
    }
    transaction_source: 0
    sto: 'N' | string
    pan_entry_mode: number
    cvv: string
    force_disable_3ds: 'N' | string
    items_summary_mode: 'auto' | string
  }
}

export interface PayServiceCreateRequest {
  TransactionId: string
  orderId: string
  clientId: string
  txn_currency_code: Currency
  card_number: string
  expire_month: string
  expire_year: string
  cvv: string
  discount?: number | null
  clientEmail: string
  language: Code
  items: Array<{
    code: string
    name: string
    unit_price: number
    unit_type: number
    units_number: number
    currency_code: Currency
    attributes: Array<{
      name: string
      value: string
    }>
  }>
}

export interface PayServiceCreateResponse {
  value: {
    id: string
    client: Record<string, unknown>
    number: number
    type: number
    signed: boolean
    lang: string
    taxAuthorityConfirmationInitiated: boolean
    counter: number
    url: {
      origin: string
      he: string
      en: string
    }
    taxAuthorityConfirmationLastError: number
    vatRate: number
  }
  formatters: object[]
  contentTypes: object[]
  declaredType: null
  statusCode: number
}

export interface CreateShipmentToGoRequest {
  ShipDetails: {
    OrderDetails: {
      orderId: string
    }
    currency: Currency
    insuranceAmount: number
    Recipient: {
      name: string
      contactPerson: string
      country: string
      city: string
      street: string
      houseNumber: string
      postalCode: string
      phone: string
      phonePrefix: string
      email: string
    }
    Packages: {
      quantity: string
      weight: '1'
      length: '1'
      width: '1'
      height: '1'
      name: string
      customValue: string
      productId: number // product id
    }[]
  }
}
