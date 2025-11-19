'use client'

import { AuthService } from '@/src/features/Auth/model/api'
import { User } from '@/src/features/Auth/model/type'
import { useQuery } from '@tanstack/react-query'

interface UseUserProps {
  allPopulates?: boolean
}

export const useUser = ({ allPopulates = false }: UseUserProps = {}) => {
  const user = useQuery<User>({
    queryKey: ['user', allPopulates],
    queryFn: async () => {
      const response = allPopulates
        ? await AuthService.meWithAllPopulates()
        : await AuthService.me()
      const user = await response.json<User>()
      return user
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
  })

  return {
    user,
  }
}
