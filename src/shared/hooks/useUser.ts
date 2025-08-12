'use client'

import { AuthService } from '@/src/features/Auth/model/api'
import { User } from '@/src/features/Auth/model/type'
import { useQuery } from '@tanstack/react-query'

export const useUser = () => {
  const user = useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await AuthService.me()
      const user = await response.json<User>()
      return user
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  return {
    user,
  }
}
