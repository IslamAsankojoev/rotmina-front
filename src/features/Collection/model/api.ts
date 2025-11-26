import { api } from "@/src/app"
import { apiMap } from "@/src/shared"
import { CollectionOneResponse, CollectionResponse } from "./type"

export const CollectionService = {
  getCollections: (): Promise<CollectionResponse> => api.get(apiMap.getCollections + '?populate=image').json(),
  getCollection: (id: string): Promise<CollectionOneResponse> => api.get(apiMap.getCollection.replace(':id', id) + '?populate=image').json(),
}