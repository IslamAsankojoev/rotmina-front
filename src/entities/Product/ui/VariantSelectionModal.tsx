'use client'

import { useEffect, useMemo, useState } from 'react'

import { Button } from '@/shadcn/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shadcn/components/ui/dialog'
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/shadcn/components/ui/toggle-group'
import { Typography } from '@/src/shared'
import clsx from 'clsx'

import { Color, Product, ProductVariant, Size } from '../model'

interface VariantSelectionModalProps {
  product: Product
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddToCart: (variant: ProductVariant) => void
}

export const VariantSelectionModal = ({
  product,
  open,
  onOpenChange,
  onAddToCart,
}: VariantSelectionModalProps) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null,
  )

  // Get unique colors from variants
  const availableColors = useMemo(() => {
    if (!product?.variants || product?.variants?.length === 0) return []

    const uniqueColors = new Map<number, Color>()
    product?.variants?.forEach((variant: ProductVariant) => {
      if (variant?.color && !uniqueColors.has(variant?.color?.id)) {
        uniqueColors.set(variant?.color?.id, variant?.color)
      }
    })
    return Array.from(uniqueColors.values())
  }, [product?.variants])

  // Set initial color when modal opens
  useEffect(() => {
    if (availableColors?.length > 0 && !selectedColor && open) {
      setSelectedColor(availableColors?.[0]?.id?.toString())
    }
  }, [availableColors, selectedColor, open])

  // Get unique sizes for selected color
  const availableSizes = useMemo(() => {
    if (!selectedColor || !product?.variants || product?.variants?.length === 0)
      return []

    const colorId = parseInt(selectedColor)
    const sizesForColor = product?.variants
      .filter((variant) => variant?.color?.id === colorId)
      .map((variant) => variant.size)

    // Remove duplicate sizes
    const uniqueSizes = new Map()
    sizesForColor.forEach((size: Size) => {
      if (!uniqueSizes.has(size?.id)) {
        uniqueSizes.set(size?.id, size)
      }
    })
    return Array.from(uniqueSizes.values())
  }, [selectedColor, product?.variants])

  const handleColorSelect = (colorId: string) => {
    setSelectedColor(colorId)
    setSelectedSize(null)
    setSelectedVariant(null)
  }

  const handleSizeSelect = (sizeId: string) => {
    setSelectedSize(sizeId)

    // Find variant with this size and selected color
    const colorId = selectedColor
      ? parseInt(selectedColor)
      : product?.variants?.[0]?.color?.id
    const variant = product?.variants?.find(
      (v) => v?.size?.id === parseInt(sizeId) && v?.color?.id === colorId,
    )

    setSelectedVariant(variant || null)
  }

  const handleAddToCart = () => {
    if (selectedVariant) {
      onAddToCart(selectedVariant)
      onOpenChange(false)
      // Reset state
      setSelectedColor(null)
      setSelectedSize(null)
      setSelectedVariant(null)
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset state when closing
      setSelectedColor(null)
      setSelectedSize(null)
      setSelectedVariant(null)
    }
    onOpenChange(open)
  }

  const isSizeAvailable = (sizeId: number) => {
    const colorId = selectedColor
      ? parseInt(selectedColor)
      : product?.variants?.[0]?.color?.id
    return product?.variants?.some(
      (v) => v?.size?.id === sizeId && v?.color?.id === colorId && v?.stock > 0,
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="rounded-none">
        <DialogHeader>
          <DialogTitle>
            <Typography variant="text_mobile_title">
              Select Color & Size
            </Typography>
          </DialogTitle>
          <div className="flex flex-col gap-6">
            {/* Color Selection */}
            {availableColors.length > 0 && (
              <div className="flex flex-col items-start gap-2">
                <Typography variant="text_main" className="uppercase">
                  Color
                </Typography>
                <ToggleGroup
                  type="single"
                  className="flex flex-wrap gap-2"
                  value={selectedColor || ''}
                  onValueChange={handleColorSelect}
                >
                  {availableColors.map((color: Color) => {
                    const isSelected = selectedColor === color?.id?.toString()

                    return (
                      <div
                        key={color?.id}
                        className={clsx(
                          'rounded-full border transition-all hover:scale-110',
                          isSelected ? 'border-black' : 'border-greyy',
                        )}
                      >
                        <ToggleGroupItem
                          value={color?.id?.toString()}
                          className={clsx(
                            'h-10 w-10 cursor-pointer !rounded-full border-2 p-2',
                          )}
                          style={{
                            background: `url(${color?.image?.url}) no-repeat center center`,
                            backgroundSize: 'cover',
                          }}
                        />
                      </div>
                    )
                  })}
                </ToggleGroup>
              </div>
            )}

            {/* Size Selection */}
            <div className="flex flex-col items-start gap-2">
              <Typography variant="text_main" className="uppercase">
                Size
              </Typography>
              <ToggleGroup
                type="single"
                className="flex flex-wrap"
                value={selectedSize || ''}
                onValueChange={handleSizeSelect}
              >
                {availableSizes.map((size: Size) => {
                  const isAvailable = isSizeAvailable(size?.id || 0)
                  const isSelected = selectedSize === size?.id?.toString()

                  return (
                    <ToggleGroupItem
                      key={size?.id}
                      value={size?.id?.toString()}
                      disabled={!isAvailable}
                      className={clsx(
                        'cursor-pointer',
                        !isAvailable && 'cursor-not-allowed opacity-50',
                      )}
                    >
                      <Typography
                        variant="text_main"
                        className={clsx(
                          'uppercase',
                          isSelected
                            ? 'text-black'
                            : isAvailable
                              ? 'text-greyy'
                              : 'text-greyy opacity-50',
                        )}
                      >
                        {size?.name}
                      </Typography>
                    </ToggleGroupItem>
                  )
                })}
              </ToggleGroup>
            </div>
            <Button
              variant="default"
              className="uppercase"
              disabled={!selectedVariant}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
