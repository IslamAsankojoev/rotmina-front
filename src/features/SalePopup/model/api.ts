import { api } from "@/src/app";
import { apiMap } from "@/src/shared";
import { SalePopupResponse } from "./type";

export const SalePopupService = {
  getSalePopup: (): Promise<SalePopupResponse> => api.get(apiMap.getSalePopup + '?populate=image').json(),
}