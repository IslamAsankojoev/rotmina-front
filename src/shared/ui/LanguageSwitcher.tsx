'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/shadcn/components/ui/dropdown-menu'

import { Code } from '../constants'
import { useLangCurrancy } from '../hooks'
import { Typography } from './Typography'
import { usePathname, useRouter } from 'next/navigation'

export function LanguageSwitcher() {
  const { setLang } = useLangCurrancy()
  const pathname = usePathname()
  const router = useRouter()

  const handleLanguageChange = (newLang: Code) => {
    setLang(newLang)
    
    // Заменяем текущий locale в пути на новый
    const segments = pathname.split('/')
    if (segments[1] === 'en' || segments[1] === 'he') {
      segments[1] = newLang
      const newPath = segments.join('/')
      router.push(newPath)
    } else {
      // Если locale нет в пути, добавляем его
      router.push(`/${newLang}${pathname}`)
    }
  }

  // Определяем текущий язык из URL
  const currentLang = pathname.split('/')[1] === 'he' ? Code.HE : Code.EN

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Typography className="uppercase cursor-pointer min-w-6 w-6" variant="text_main">
          {currentLang}
        </Typography>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit rounded-none min-w-fit">
        <DropdownMenuRadioGroup
          value={currentLang}
          onValueChange={(value) => handleLanguageChange(value as Code)}
        >
          <DropdownMenuRadioItem className="uppercase" value={Code.EN}>
            {Code.EN}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="uppercase" value={Code.HE}>
            {Code.HE}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
