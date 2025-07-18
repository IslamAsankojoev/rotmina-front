'use client'

import { useMediaQuery } from './useMediaQuery'

export const useScreenSize = () => {
  const xs = useMediaQuery('(min-width: 0px)')
  const sm = useMediaQuery('(min-width: 480px)')
  const md = useMediaQuery('(min-width: 768px)')
  const lg = useMediaQuery('(min-width: 1024px)')
  const xl = useMediaQuery('(min-width: 1280px)')
  const xxl = useMediaQuery('(min-width: 1536px)')

  return {
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
  }
}
