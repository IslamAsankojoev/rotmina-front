import { api } from "@/src/app"
import { apiMap } from "@/src/shared"
import { CollectionResponse } from "./type"

export const CollectionService = {
  getCollections: (): Promise<CollectionResponse> => api.get(apiMap.getCollections).json(),
  getCollection: (id: string): Promise<CollectionResponse> => api.get(apiMap.getCollection.replace(':id', id)).json(),
}