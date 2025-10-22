import { api } from "@/src/app"
import { apiMap } from "@/src/shared"
import type { CreateOrderRequest, OrderResponse, OrderListResponse } from './types'

export const OrderService = {
  getMyOrders: (): Promise<OrderListResponse> => 
    api.get(apiMap.getMyOrders).json(),
  
  createOrder: (order: CreateOrderRequest): Promise<OrderResponse> => 
    api.post(apiMap.createOrder, { json: order }).json(),
}