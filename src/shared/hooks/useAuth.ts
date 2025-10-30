'use client'

import { AuthService } from '@/src/features/Auth/model/api'
import { AuthCredentials, NewPasswordCredentials, ResetPasswordCredentials, SignupCredentials } from '@/src/features/Auth/model/type'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createAsyncErrorHandler } from '@/src/shared/utils/errorHandling'

export const useAuth = () => {
  const router = useRouter()

  const signup = useMutation({
    mutationFn: async (credentials: SignupCredentials) =>
      AuthService.signup(credentials),
    onSuccess: async () => {
      router.refresh()
      toast.success('Аккаунт успешно создан, подтвердите email')
    },
    onError: createAsyncErrorHandler(),
  })

  const login = useMutation({
    mutationFn: async (credentials: AuthCredentials) =>
      AuthService.login(credentials),
    onSuccess: async () => {
      router.refresh()
    },
    onError: createAsyncErrorHandler(),
  })

  const logout = useMutation({
    mutationFn: async () => AuthService.logout(),
    onSuccess: async () => {
      router.push('/')
      toast.success('Logged out successfully')
    },
    onError: createAsyncErrorHandler(),
  })

  const resetPassword = useMutation({
    mutationFn: async (credentials: ResetPasswordCredentials) =>
      AuthService.resetPassword(credentials),
    onSuccess: async () => {
      toast.success('Email успешно отправлен')
    },
    onError: createAsyncErrorHandler(),
  })

  const newPassword = useMutation({
    mutationFn: async (credentials: NewPasswordCredentials) =>
      AuthService.newPassword(credentials),
    onSuccess: async () => {
      toast.success('Пароль успешно обновлен')
    },
    onError: createAsyncErrorHandler(),
  })

  return {
    login,
    logout,
    signup,
    resetPassword,
    newPassword,
    loading: login.isPending || logout.isPending || signup.isPending || resetPassword.isPending || newPassword.isPending,
  }
}
