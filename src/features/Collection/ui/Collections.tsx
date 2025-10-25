'use client'

import CollectionImage from '@/public/assets/collection.webp'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shadcn/components/ui/accordion'
import { Typography } from '@/src/shared'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import Image from 'next/image'
import { CollectionService } from '../model/api'

export const Collections = () => {
  const { data: collections, isLoading, error } = useQuery({
    queryKey: ['collections'],
    queryFn: () => CollectionService.getCollections(),
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="mb-20 flex flex-col gap-4 md:flex-row">
      <div className="relative order-2 flex h-96 w-full items-center justify-center md:order-1 md:h-[700px] md:flex-1">
        <Image
          src={CollectionImage}
          objectFit="cover"
          objectPosition="center"
          alt="hero"
          fill
        />
      </div>
      <div className="order-1 flex items-center justify-center md:order-2 md:flex-1">
        <Accordion type="single" collapsible>
          {collections?.data.map((collection, index) => (
            <div
              key={index}
              className={clsx(
                'm-4 w-96 flex-1 border-b-2 p-2 text-center',
                index === 2 && 'border-b-0',
              )}
            >
              <AccordionItem value={collection.documentId}>
                <AccordionTrigger className="justify-center p-0">
                  <Typography
                    variant="text_pageTitle"
                    className="text-center !text-2xl"
                  >
                    {collection.name}
                  </Typography>
                </AccordionTrigger>
                <AccordionContent className="mt-4 flex flex-col items-center justify-center">
                  <Typography variant="text_main">
                    {collection.description || 'No description'}
                  </Typography>
                  <Image
                    src={collection.image?.url || ''}
                    alt={collection.name}
                    width={200}
                    height={200}
                    className="mt-4 rounded-lg"
                  />
                </AccordionContent>
              </AccordionItem>
            </div>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
