import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/shadcn/components/ui/carousel'

import { ProductVariant } from '../model'

export const VariantImages = ({ variant }: { variant: ProductVariant }) => {
  if (!variant) return null
  if (!variant?.images) return null
  if (variant?.images?.length === 0) return null
  return (
    <div>
      <div className="hidden flex-col gap-4 md:flex">
        {variant?.images?.map((image) => (
          <div
            className="relative h-[500px] w-full md:h-[900px]"
            key={image.id}
          >
            <img src={image.url} alt={`Rotmina Variant Images`} style={{ objectFit: 'cover' }} className="w-full h-full" />
          </div>
        ))}
      </div>
      <div className="md:hidden">
        {variant?.images?.length === 1 ? (
          <div className="-mt-1 flex h-[500px] justify-center">
            <div className="relative h-[500px] w-[90%]">
              <img
                src={variant?.images?.[0]?.url}
                alt={`Rotmina Variant Images - Image`}
                style={{ objectFit: 'cover' }}
                className="w-full h-full"
              />
            </div>
          </div>
        ) : (
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            orientation="horizontal"
            className="-mt-1 h-[500px]"
          >
            <CarouselContent>
              {variant?.images?.map((image, index) => (
                <CarouselItem key={index} className="basis-[90%]">
                  <div className="relative h-[500px] w-full">
                    <img
                      src={image?.url}
                      alt={`Rotmina Variant Images - Image`}
                      style={{ objectFit: 'cover' }}
                      className="w-full h-full"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </div>
  )
}
