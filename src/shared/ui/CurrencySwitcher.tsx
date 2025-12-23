'use client'

import { useState } from 'react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shadcn/components/ui/popover'

import { Currency } from '../constants'
import { useLangCurrency } from '../hooks'
import { Typography } from './Typography'

export const CurrencySwitcher = () => {
  const { currency, setCurrency, allowedCurrencies } = useLangCurrency()
  const [open, setOpen] = useState(false)

  const handleCurrencyChange = (value: Currency) => {
    setCurrency(value)
    setOpen(false)
  }

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange} modal={true}>
      <PopoverTrigger asChild>
        <Typography
          className="w-6 min-w-6 cursor-pointer uppercase"
          variant="text_main"
        >
          {currency}
        </Typography>
      </PopoverTrigger>
      <PopoverContent className="w-fit min-w-fit rounded-none p-1">
        <div className="flex w-fit flex-col">
          {allowedCurrencies.map((curr) => (
            <button
              key={curr}
              onClick={() => handleCurrencyChange(curr as Currency)}
              className={`hover:bg-accent hover:text-accent-foreground relative flex cursor-pointer items-center gap-2 rounded-sm px-4 py-1.5 text-sm uppercase outline-hidden select-none`}
            >
              {curr}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
