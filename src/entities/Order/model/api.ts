import { api } from '@/src/app'
import { apiMap } from '@/src/shared'
import CryptoJS from 'crypto-js'

import type {
  CompletePaymentRequest,
  CompletePaymentResponse,
  CreateOrderRequest,
  CreateShipmentRequest,
  CreateShipmentToGoRequest,
  OrderListResponse,
  OrderPaymentStatus,
  OrderResponse,
  OrderResponseStrapi,
  PayOrderRequest,
  PayOrderResponse,
  PayServiceCreateRequest,
  PayServiceCreateResponse,
} from './types'

export const OrderService = {
  getMyOrders: (): Promise<OrderListResponse> =>
    api.get(apiMap.getMyOrders).json(),

  createOrder: (order: CreateOrderRequest): Promise<OrderResponse> =>
    api.post(apiMap.createOrder, { json: order }).json(),

  getOrderById: (id: string): Promise<OrderResponseStrapi> =>
    api
      .get(
        apiMap.getOrder.replace(':id', id) +
          '?populate[order_items][populate][0]=gift_card&populate[order_items][populate][1]=personal_stylist&populate[order_items][populate][2]=variant&populate[order_items][populate][3]=variant.product&populate[order_items][populate][4]=variant.size&populate[order_items][populate][5]=variant.color&populate[shipping_address]=true',
      )
      .json(),

  payOrder: (order: PayOrderRequest): Promise<PayOrderResponse> => {
    const appKey = process.env.TRANZILLA_APP_KEY || ''
    const secret = process.env.TRANZILLA_SECRET || ''
    const nonce = process.env.TRANZILLA_NONCE || ''
    const timestamp = Math.floor(Date.now() / 1000).toString()
    const accessToken = CryptoJS.HmacSHA256(
      appKey,
      secret + timestamp + nonce,
    ).toString(CryptoJS.enc.Hex)

    return api
      .post(apiMap.payOrder, {
        json: order,
        headers: {
          'X-tranzila-api-app-key': appKey,
          'X-tranzila-api-request-time': timestamp,
          'X-tranzila-api-nonce': nonce,
          'X-tranzila-api-access-token': accessToken,
        },
      })
      .json()
  },

  completePayment: (
    order: CompletePaymentRequest,
  ): Promise<CompletePaymentResponse> => {
    const appKey = process.env.TRANZILLA_APP_KEY || ''
    const secret = process.env.TRANZILLA_SECRET || ''
    const nonce = process.env.TRANZILLA_NONCE || ''
    const timestamp = Math.floor(Date.now() / 1000).toString()
    const accessToken = CryptoJS.HmacSHA256(
      appKey,
      secret + timestamp + nonce,
    ).toString(CryptoJS.enc.Hex)

    return api
      .post(apiMap.completePayment, {
        json: order,
        headers: {
          'X-tranzila-api-app-key': appKey,
          'X-tranzila-api-request-time': timestamp,
          'X-tranzila-api-nonce': nonce,
          'X-tranzila-api-access-token': accessToken,
        },
      })
      .json()
  },

  payServiceCreate: (
    order: PayServiceCreateRequest,
  ): Promise<PayServiceCreateResponse> =>
    api
      .post(apiMap.payServiceCreate, {
        json: order,
      })
      .json(),

  getOrderPaymentStatus: (clientId: string): Promise<OrderPaymentStatus[]> =>
    api.get(apiMap.getOrderPaymentStatus + '?clientId=' + clientId).json(),

  deleteOrder: (id: string): Promise<void> =>
    api.delete(apiMap.deleteOrder.replace(':id', id)).json(),

  changeOrderStatusToPaid: (
    orderId: string,
    shipment_tracking: string,
  ): Promise<void> =>
    api
      .put(apiMap.changeOrderStatus, {
        json: {
          orderId,
          shipment_tracking,
        },
      })
      .json(),

  createShipment: (request: CreateShipmentRequest): Promise<string> =>
    api
      .post(apiMap.createShipment, { json: request })
      .text()
      .then((text) => text?.match(/\d+/)?.[0] || ''),

  createShipmentToGo: (request: CreateShipmentToGoRequest): Promise<string> =>
    api
      .post(apiMap.createShipmentToGo, { json: request })
      .text()
      .then((text) => text || ''),
}
