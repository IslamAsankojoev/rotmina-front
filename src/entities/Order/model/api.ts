import { api } from "@/src/app"
import { apiMap } from "@/src/shared"
import type { CreateOrderRequest, OrderResponse, OrderListResponse, PayOrderRequest, OrderResponseStrapi, PayOrderResponse, OrderPaymentStatus } from './types'

export const OrderService = {
  getMyOrders: (): Promise<OrderListResponse> => 
    api.get(apiMap.getMyOrders).json(),
  
  createOrder: (order: CreateOrderRequest): Promise<OrderResponse> => 
    api.post(apiMap.createOrder, { json: order }).json(),

  getOrderById: (id: string): Promise<OrderResponseStrapi> =>
    api.get(apiMap.getOrder.replace(':id', id) + '?populate[order_items][populate][0]=gift_card&populate[order_items][populate][1]=personal_stylist&populate[order_items][populate][2]=variant&populate[order_items][populate][3]=variant.product&populate[order_items][populate][4]=variant.size&populate[order_items][populate][5]=variant.color').json(),


  payOrder: (order: PayOrderRequest): Promise<PayOrderResponse> =>
    api.post(apiMap.payOrder, { json: order }).json(),

  getOrderPaymentStatus: (clientId: string): Promise<OrderPaymentStatus[]> =>
    api.get(apiMap.getOrderPaymentStatus + '?clientId=' + clientId).json(),

  deleteOrder: (id: string): Promise<void> =>
    api.delete(apiMap.deleteOrder.replace(':id', id)).json(),

  changeOrderStatusToPaid: (id: string): Promise<void> =>
    api.put(apiMap.changeOrderStatus.replace(':id', id)).json(),
}