import { api } from '@/src/app'
import { apiMap } from '@/src/shared'

import { AuthCredentials } from './type'

export const AuthService = {
  login: (data: AuthCredentials) => {
    try {
      return api.post(apiMap.postLogin, {
        json: data,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      throw error
    }
  },
  logout: () => {
    try {
      return api.delete(apiMap.deleteLogout, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      throw error
    }
  },
  me: () => {
    try {
      return api.get(apiMap.getMe)
    } catch (error) {
      throw error
    }
  },
}
