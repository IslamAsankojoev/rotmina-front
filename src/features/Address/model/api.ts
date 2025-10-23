import { api } from "@/src/app"
import { apiMap } from "@/src/shared"
import { Address, AddressResponse } from "./type"

export const AddressService = {
  getMyAddresses: (): Promise<AddressResponse> => api.get(apiMap.getMyAddresses).json(),
  addAddress: (data: Address): Promise<AddressResponse> => api.post(apiMap.addAddress, { json: data }).json(),
  deleteAddress: (id: string): Promise<AddressResponse> => api.delete(apiMap.deleteAddress.replace(':id', id)).json(),
}