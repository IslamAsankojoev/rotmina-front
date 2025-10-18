'use client'

import { AuthService } from '@/src/features/Auth/model/api'
import { AuthCredentials, NewPasswordCredentials, ResetPasswordCredentials, SignupCredentials } from '@/src/features/Auth/model/type'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const useAuth = () => {
  const router = useRouter()

  const signup = useMutation({
    mutationFn: async (credentials: SignupCredentials) =>
      AuthService.signup(credentials),
    onSuccess: async () => {
      router.push('/login')
      toast.success('Account created successfully, please confirm your email')
    },
  })

  const login = useMutation({
    mutationFn: async (credentials: AuthCredentials) =>
      AuthService.login(credentials),
    onSuccess: async () => {
      router.push('/account')
    },
  })

  const logout = useMutation({
    mutationFn: async () => AuthService.logout(),
    onSuccess: async () => {
      router.push('/login')
    },
  })

  const resetPassword = useMutation({
    mutationFn: async (credentials: ResetPasswordCredentials) =>
      AuthService.resetPassword(credentials),
    onSuccess: async () => {
      toast.success('Email sent successfully')
    },
  })

  const newPassword = useMutation({
    mutationFn: async (credentials: NewPasswordCredentials) =>
      AuthService.newPassword(credentials),
    onSuccess: async () => {
      toast.success('Password updated successfully')
    },
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
