import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/shadcn/components/ui/carousel'

import { Product, ProductVariant } from '../model'

export const ProductImages = ({
  product,
  selectedVariant,
}: {
  product: Product
  selectedVariant: ProductVariant
}) => {
  const images = selectedVariant?.images || product?.gallery
  return (
    <div>
      <div className="hidden flex-col gap-4 md:flex">
        {images?.map((image) => (
          <div
            className="relative h-[500px] w-full md:h-[900px]"
            key={image.id}
          >
            <img src={image.url} alt={image.name} style={{ objectFit: 'cover' }} className="w-full h-full" />
          </div>
        ))}
      </div>
      <div className="md:hidden">
        {images?.length === 1 ? (
          <div className="-mt-1 flex h-[500px] justify-center">
            <div className="relative h-[500px] w-[90%]">
              <img
                src={images?.[0]?.url}
                alt={images?.[0]?.name}
                style={{ objectFit: 'cover' }}
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
              {images?.map((image, index) => (
                <CarouselItem key={index} className="basis-[90%]">
                  <div className="relative h-[500px] w-full">
                    <img
                      src={image?.url}
                      alt={image?.name}
                      style={{ objectFit: 'cover' }}
                      className='w-full h-full'
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
