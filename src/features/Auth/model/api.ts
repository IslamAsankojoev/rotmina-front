import { api } from '@/src/app'
import { apiMap } from '@/src/shared'

import { AuthCredentials } from './type'

export const AuthService = {
  login: (data: AuthCredentials) => api.post(apiMap.postLogin, { json: data }),
  logout: () => api.delete(apiMap.deleteLogout),
  me: () => api.get(apiMap.getMe),
  meWithAllPopulates: () => api.get(apiMap.getMeWithAllPopulates),
}
