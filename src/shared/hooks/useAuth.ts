'use client'

import { useState } from 'react'

import { AuthService } from '@/src/features/Auth/model/api'
import { AuthCredentials } from '@/src/features/Auth/model/type'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export const useAuth = () => {
  const router = useRouter()
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

  return {
    login,
    logout,
  }
}
