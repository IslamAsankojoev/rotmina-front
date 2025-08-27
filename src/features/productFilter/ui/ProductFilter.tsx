'use client'

import { useState } from 'react'

import { Button } from '@/shadcn/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shadcn/components/ui/popover'
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/shadcn/components/ui/toggle-group'
import { Typography, useScreenSize } from '@/src/shared'
import clsx from 'clsx'
import { SlidersHorizontal } from 'lucide-react'

interface ProductFilterProps {
  colors?: string[]
  sizes?: string[]
}

export function ProductFilter({
  colors = ['#000', '#eee', '#f00', '#0f0', '#00f'],
  sizes = ['XS', 'S', 'M'],
}: ProductFilterProps) {
  const [open, setOpen] = useState(false)
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const { md } = useScreenSize()
  const handleColorChange = (value: string[]) => {
    setSelectedColors(value)
  }

  const handleSizeChange = (value: string[]) => {
    setSelectedSizes(value)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="cursor-pointer">
        {md ? (
          <Typography variant="text_main">FILTER</Typography>
        ) : (
          <SlidersHorizontal strokeWidth={0.75} />
        )}
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-col gap-4">
          <Typography variant="text_main" className="uppercase">
            Colour
          </Typography>
          <div className="flex flex-wrap gap-2">
            <ToggleGroup
              type="multiple"
              className="flex flex-wrap"
              value={selectedColors}
              onValueChange={handleColorChange}
            >
              {colors.map((color) => (
                <ToggleGroupItem
                  key={color}
                  value={color}
                  className="bg-transparent"
                >
                  <div
                    className={clsx(
                      'flex h-7 w-7 items-center justify-center rounded-full border-1',
                      selectedColors.includes(color)
                        ? 'border-black'
                        : 'border-transparent',
                    )}
                  >
                    <div
                      style={{
                        backgroundColor: color,
                      }}
                      className="h-6 w-6 cursor-pointer rounded-full"
                    />
                  </div>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <Typography variant="text_main" className="uppercase">
            Size
          </Typography>
          <div className="flex flex-wrap gap-2">
            <ToggleGroup
              type="multiple"
              className="flex flex-wrap"
              value={selectedSizes}
              onValueChange={handleSizeChange}
            >
              {sizes.map((size) => (
                <ToggleGroupItem
                  key={size}
                  value={size}
                  className="cursor-pointer"
                >
                  <Typography variant="text_main" className="uppercase">
                    {size}
                  </Typography>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <Button variant="link" onClick={() => setOpen(false)}>
            <Typography variant="text_main" className="uppercase">
              Apply
            </Typography>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
