'use client'

import { useState } from 'react'

// import { Button } from '@/shadcn/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shadcn/components/ui/popover'
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/shadcn/components/ui/toggle-group'
import {
  Typography,
  useColorsAndSizes,
  useProducts,
  useScreenSize,
} from '@/src/shared'
import clsx from 'clsx'
import { SlidersHorizontal } from 'lucide-react'

interface ProductFilterProps {
  colors?: string[]
  sizes?: string[]
}

export function ProductFilter({
  colors: defaultColors = [],
  sizes: defaultSizes = [],
}: ProductFilterProps) {
  const [open, setOpen] = useState(false)
  const { md } = useScreenSize()
  const { colors, sizes, isLoading } = useColorsAndSizes()
  const { selectedColors, selectedSizes, updateFilters } = useProducts()

  // Используем данные из API или значения по умолчанию
  const availableColors =
    colors.length > 0
      ? colors
      : []
  const availableSizes =
    sizes.length > 0
      ? sizes
      : defaultSizes.map((size) => ({ slug: size.toLowerCase(), name: size }))

  const handleColorChange = (value: string[]) => {
    updateFilters({ colors: value })
  }

  const handleSizeChange = (value: string[]) => {
    updateFilters({ sizes: value })
  }

  // const handleApply = () => {
  //   setOpen(false)
  // }

  // const handleReset = () => {
  //   resetFilters()
  //   setOpen(false)
  // }

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Typography variant="text_main">Loading...</Typography>
      </div>
    )
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
              {availableColors.map((color) => (
                <ToggleGroupItem
                  key={color.slug}
                  value={color.slug}
                  className="bg-transparent"
                >
                  <div
                    className={clsx(
                      'flex h-7 w-7 items-center justify-center rounded-full border-1',
                      selectedColors.includes(color.slug)
                        ? 'border-black'
                        : 'border-transparent',
                    )}
                  >
                    <div
                      style={{
                        backgroundColor: color.hex,
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
              {availableSizes.map((size) => (
                <ToggleGroupItem
                  key={size.slug}
                  value={size.slug}
                  className="cursor-pointer"
                >
                  <Typography variant="text_main" className="uppercase">
                    {size.name || size.slug.toUpperCase()}
                  </Typography>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          {/* <div className="flex gap-2">
            <Button variant="link" onClick={handleApply}>
              <Typography variant="text_main" className="uppercase">
                Apply
              </Typography>
            </Button>
            <Button variant="link" onClick={handleReset}>
              <Typography variant="text_main" className="uppercase">
                Reset
              </Typography>
            </Button>
          </div> */}
        </div>
      </PopoverContent>
    </Popover>
  )
}
