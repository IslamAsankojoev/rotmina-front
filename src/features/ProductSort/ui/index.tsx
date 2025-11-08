'use client'

import { useState } from 'react'

import { Label } from '@/shadcn/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shadcn/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/shadcn/components/ui/radio-group'
import { Typography, useProducts, useDictionary } from '@/src/shared'
import clsx from 'clsx'
import { Button } from '@/shadcn/components/ui/button'
import { X } from 'lucide-react'

interface ProductSortProps {
  fields?: string[]
}

export function ProductSort({
  fields = ['Popularity', 'Price up', 'price down', 'sale'],
}: ProductSortProps) {
  const { dictionary } = useDictionary()
  const t = (dictionary as Record<string, Record<string, string>>).sort || {
    popularity: 'Popularity',
    priceUp: 'Price up',
    priceDown: 'price down',
    sale: 'sale',
  }
  const [open, setOpen] = useState(false)
  const { currentSort, updateSort } = useProducts()

  // Map English sort values to translated values
  const sortMap: Record<string, string> = {
    'Popularity': t.popularity,
    'Price up': t.priceUp,
    'price down': t.priceDown,
    'sale': t.sale,
  }

  const translatedFields = fields.map(field => sortMap[field] || field)
  const getOriginalField = (translated: string) => {
    const entry = Object.entries(sortMap).find(([_, value]) => value === translated)
    return entry ? entry[0] : translated
  }

  const handleSortChange = (value: string) => {
    // Convert translated value back to original
    const originalValue = getOriginalField(value)
    updateSort(originalValue)
    setOpen(false)
  }

  // Get translated current sort value
  const translatedCurrentSort = sortMap[currentSort] || currentSort

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Typography variant="text_main" className="cursor-pointer md:inline">
          {translatedCurrentSort}
        </Typography>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-60 md:w-80">
        <div className="flex flex-col gap-4">
          <RadioGroup
            defaultValue={translatedCurrentSort}
            onValueChange={handleSortChange}
            value={translatedCurrentSort}
          >
            {translatedFields.map((field, index) => {
              const originalField = fields[index]
              return (
                <div className="flex items-center gap-3" key={originalField}>
                  <RadioGroupItem value={field} id={field} hidden />
                  <Label
                    htmlFor={field}
                    className={clsx(
                      'cursor-pointer uppercase',
                      translatedCurrentSort === field ? 'text-black' : 'text-greyy',
                    )}
                  >
                    {field}
                  </Label>
                </div>
              )
            })}
          </RadioGroup>
        </div>
        <Button variant="link" size="icon" onClick={() => setOpen(false)} className='absolute top-2 right-2'>
          <X strokeWidth={2} size={20} />
        </Button>
      </PopoverContent>
    </Popover>
  )
}
