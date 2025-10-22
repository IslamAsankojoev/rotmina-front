import { api } from "@/src/app"
import { apiMap } from "@/src/shared"
import { AddressResponse } from "./type"

export const AddressService = {
  getMyAddresses: (): Promise<AddressResponse> => api.get(apiMap.getMyAddresses).json(),
  addAddress: (data: string): Promise<AddressResponse> => api.post(apiMap.addAddress, { json: { data } }).json(),
}