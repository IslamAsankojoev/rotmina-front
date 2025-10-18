import { api } from '@/src/app'
import { apiMap } from '@/src/shared'

import { AuthCredentials, NewPasswordCredentials, ResetPasswordCredentials, SignupCredentials } from './type'

export const AuthService = {
  login: (data: AuthCredentials) => api.post(apiMap.postLogin, { json: data }),
  logout: () => api.delete(apiMap.deleteLogout),
  me: () => api.get(apiMap.getMe),
  meWithAllPopulates: () => api.get(apiMap.getMeWithAllPopulates),
  signup: (data: SignupCredentials) => api.post(apiMap.postSignup, { json: data }),
  resetPassword: (data: ResetPasswordCredentials) => api.post(apiMap.postResetPassword, { json: data }),
  newPassword: (data: NewPasswordCredentials) => api.post(apiMap.postNewPassword, { json: data }),
}
