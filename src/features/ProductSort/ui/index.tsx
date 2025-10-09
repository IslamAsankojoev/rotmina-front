'use client'

import { useState } from 'react'

import { Label } from '@/shadcn/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shadcn/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/shadcn/components/ui/radio-group'
import { Typography, useProducts } from '@/src/shared'
import clsx from 'clsx'

interface ProductSortProps {
  fields?: string[]
}

export function ProductSort({
  fields = ['Popularity', 'Price up', 'price down', 'sale'],
}: ProductSortProps) {
  const [open, setOpen] = useState(false)
  const { currentSort, updateSort } = useProducts()

  const handleSortChange = (value: string) => {
    updateSort(value)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Typography variant="text_main" className="cursor-pointer md:inline">
          {currentSort}
        </Typography>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-4">
          <RadioGroup
            defaultValue={currentSort}
            onValueChange={handleSortChange}
            value={currentSort}
          >
            {fields.map((field) => (
              <div className="flex items-center gap-3" key={field}>
                <RadioGroupItem value={field} id={field} hidden />
                <Label
                  htmlFor={field}
                  className={clsx(
                    'cursor-pointer uppercase',
                    currentSort === field ? 'text-black' : 'text-greyy',
                  )}
                >
                  {field}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </PopoverContent>
    </Popover>
  )
}
