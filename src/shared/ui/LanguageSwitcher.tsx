'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shadcn/components/ui/popover'

import { Code } from '../constants'
import { useLangCurrency } from '../hooks'
import { Typography } from './Typography'

export function LanguageSwitcher() {
  const { setLang } = useLangCurrency()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleLanguageChange = (newLang: Code) => {
    setLang(newLang)

    const segments = pathname.split('/')
    if (segments[1] === 'en' || segments[1] === 'he') {
      segments[1] = newLang
      const newPath = segments.join('/')
      router.push(newPath)
    } else {
      router.push(`/${newLang}${pathname}`)
    }
    setOpen(false)
  }

  const currentLang = pathname.split('/')[1] === 'he' ? Code.HE : Code.EN

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Typography
          className="w-6 min-w-6 cursor-pointer uppercase"
          variant="text_main"
        >
          {currentLang}
        </Typography>
      </PopoverTrigger>
      <PopoverContent className="w-fit min-w-fit rounded-none p-1">
        <div className="flex w-fit flex-col">
          <button
            onClick={() => handleLanguageChange(Code.EN)}
            className={`hover:bg-accent hover:text-accent-foreground relative flex cursor-pointer items-center gap-2 rounded-sm px-4 py-1.5 text-sm uppercase outline-hidden select-none`}
          >
            {Code.EN}
          </button>
          <button
            onClick={() => handleLanguageChange(Code.HE)}
            className={`hover:bg-accent hover:text-accent-foreground relative flex cursor-pointer items-center gap-2 rounded-sm px-4 py-1.5 text-sm uppercase outline-hidden select-none`}
          >
            {Code.HE}
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
