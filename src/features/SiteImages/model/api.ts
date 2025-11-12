import { api } from "@/src/app"
import { apiMap } from "@/src/shared"
import { SiteImagesResponse } from "./types"

export const SiteImagesApi = {
  getSiteImages: (): Promise<SiteImagesResponse> => api.get(apiMap.getSiteImages).json(),
}