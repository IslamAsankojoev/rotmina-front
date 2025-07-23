'use client'

import { useState } from 'react'

import { Label } from '@/shadcn/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shadcn/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/shadcn/components/ui/radio-group'
import { Typography } from '@/src/shared'
import clsx from 'clsx'

interface ProductFilterProps {
  fields?: string[]
}

export function ProductSort({
  fields = ['Popularity', 'Price up', 'price down', 'sale'],
}: ProductFilterProps) {
  const [open, setOpen] = useState(false)
  const [sort, setSort] = useState<string>(fields[0])

  const handleSortChange = (value: string) => {
    setSort(value)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Typography variant="text_main" className="cursor-pointer md:inline">
          {sort}
        </Typography>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-4">
          <RadioGroup
            defaultValue={fields[0]}
            onValueChange={handleSortChange}
            value={sort}
          >
            {fields.map((field) => (
              <div className="flex items-center gap-3" key={field}>
                <RadioGroupItem value={field} id={field} hidden />
                <Label
                  htmlFor={field}
                  className={clsx(
                    'cursor-pointer uppercase',
                    sort === field ? 'text-black' : 'text-greyy',
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
