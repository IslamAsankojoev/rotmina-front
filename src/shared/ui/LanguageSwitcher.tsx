'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/shadcn/components/ui/dropdown-menu'
import { usePathname, useRouter } from 'next/navigation'

import { Code } from '../constants'
import { useLangCurrency } from '../hooks'
import { Typography } from './Typography'

export function LanguageSwitcher() {
  const { setLang } = useLangCurrency()
  const pathname = usePathname()
  const router = useRouter()

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
  }

  const currentLang = pathname.split('/')[1] === 'he' ? Code.HE : Code.EN

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Typography
          className="w-6 min-w-6 cursor-pointer uppercase"
          variant="text_main"
        >
          {currentLang}
        </Typography>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit min-w-fit rounded-none">
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
