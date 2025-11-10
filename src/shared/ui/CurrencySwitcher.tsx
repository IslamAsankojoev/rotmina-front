'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/shadcn/components/ui/dropdown-menu'

import { Currency } from '../constants'
import { useLangCurrency } from '../hooks'
import { Typography } from './Typography'

export const CurrencySwitcher = () => {
  const { currency, setCurrency } = useLangCurrency()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Typography className="cursor-pointer uppercase min-w-6 w-6" variant="text_main">
          {currency}
        </Typography>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit rounded-none min-w-fit">
        <DropdownMenuRadioGroup
          value={currency}
          onValueChange={(value) => setCurrency(value as Currency)}
          className='w-fit'
        >
          {Object.keys(Currency).map((key) => (
            <DropdownMenuRadioItem className="uppercase" value={key} key={key}>
              {key}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
