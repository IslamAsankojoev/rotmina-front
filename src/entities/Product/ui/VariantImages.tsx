import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/shadcn/components/ui/carousel'
import Image from 'next/image'

import { ProductVariant } from '../model'

export const VariantImages = ({ variant }: { variant: ProductVariant }) => {
  return (
    <div>
      <div className="hidden flex-col gap-4 md:flex">
        {variant.images.map((image) => (
          <div
            className="relative h-[500px] w-full md:h-[900px]"
            key={image.id}
          >
            <Image src={image.url} alt={image.name} fill objectFit="cover" />
          </div>
        ))}
      </div>
      <div className="md:hidden">
        {variant.images.length === 1 ? (
          <div className="-mt-1 flex h-[500px] justify-center">
            <div className="relative h-[500px] w-[90%]">
              <Image
                src={variant.images[0].url}
                alt={variant.images[0].name}
                objectFit="cover"
                fill
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
              {variant.images.map((image, index) => (
                <CarouselItem key={index} className="basis-[90%]">
                  <div className="relative h-[500px] w-full">
                    <Image
                      src={image.url}
                      alt={image.name}
                      objectFit="cover"
                      fill
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
