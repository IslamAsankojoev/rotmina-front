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

export function LanguageSwitcher() {
  const { lang, setLang } = useLangCurrancy()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Typography className="uppercase cursor-pointer" variant="text_main">
          {lang}
        </Typography>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-10">
        <DropdownMenuRadioGroup
          value={lang}
          onValueChange={(value) => setLang(value as Code)}
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
