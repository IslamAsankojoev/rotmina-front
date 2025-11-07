import { api } from '@/src/app'
import { Product } from '@/src/entities/Product'
import { apiMap } from '@/src/shared'

import {
  AuthCredentials,
  NewPasswordCredentials,
  ResetPasswordCredentials,
  SignupCredentials,
} from './type'

export const AuthService = {
  login: (data: AuthCredentials) => api.post(apiMap.postLogin, { json: data }),
  logout: () => api.post(apiMap.deleteLogout),
  me: () => api.get(apiMap.getMe),
  meWithAllPopulates: () => api.get(apiMap.getMeWithAllPopulates),
  signup: (data: SignupCredentials) =>
    api.post(apiMap.postSignup, { json: data }),
  resetPassword: (data: ResetPasswordCredentials) =>
    api.post(apiMap.postResetPassword, { json: data }),
  newPassword: (data: NewPasswordCredentials) =>
    api.post(apiMap.postNewPassword, { json: data }),
  addToWishlistProducts: (data: { productId: string }) =>
    api.post(apiMap.addToWishlistProducts + '/' + data.productId).json(),
  getWishlistProducts: (): Promise<{ data: Product[] }> =>
    api.get(apiMap.getWishlistProducts).json(),
  deleteWishlistProducts: (data: { productId: string }) =>
    api.delete(apiMap.deleteWishlistProducts + '/' + data.productId).json(),
}
