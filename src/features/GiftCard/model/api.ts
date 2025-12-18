import { api } from "@/src/app"
import { apiMap } from "@/src/shared"
import { GiftCard, GiftCardResponse } from "./type"

export const GiftCardService = {
  getGiftCards: (): Promise<GiftCardResponse> => api.get(apiMap.getGiftCards + '?populate=image').json(),
  getGiftCardByCode: (code: string): Promise<GiftCard> => api.get(apiMap.getGiftCardByCode.replace(':id', code)).json(),
  applyGiftCard: (code: string, order_id: string): Promise<GiftCard> => api.post(apiMap.useGiftCard, { json: { code, order_id } }).json(),
}