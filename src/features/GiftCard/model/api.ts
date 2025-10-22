import { api } from "@/src/app"
import { apiMap } from "@/src/shared"
import { GiftCardResponse } from "./type"

export const GiftCardService = {
  getGiftCards: (): Promise<GiftCardResponse> => api.get(apiMap.getGiftCards + '?populate=image').json(),
  getGiftCardByCode: (code: string): Promise<GiftCardResponse> => api.get(apiMap.getGiftCardByCode.replace(':id', code)).json(),
}