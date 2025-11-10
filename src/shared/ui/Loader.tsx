import { Spinner } from '@/shadcn/components/ui/spinner'

import { useDictionary } from '../hooks/useDictionary'
import { Typography } from './Typography'

export const Loader = () => {
  const { dictionary } = useDictionary()
  const t = (dictionary as unknown as Record<string, Record<string, string>>)
    .common || {
    loading: 'Loading...',
  }
  return (
    <div className="container flex items-center justify-center gap-2">
      <Spinner className="size-4 animate-spin" />
      <Typography variant="text_main">{t.loading}</Typography>
    </div>
  )
}
