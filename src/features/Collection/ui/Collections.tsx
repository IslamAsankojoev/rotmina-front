import CollectionImage from '@/public/assets/collection.webp'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shadcn/components/ui/accordion'
import { Button } from '@/shadcn/components/ui/button'
import { Typography } from '@/src/shared'
import clsx from 'clsx'
import Image from 'next/image'

import { Collection } from '../model'
import { CollectionService } from '../model/api'

const getCollections = async () => {
  const collections = await CollectionService.getCollections()
  return collections?.data
}

export const Collections = async () => {
  const collections = await getCollections()

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
        <Accordion
          type="single"
          collapsible
          defaultValue={collections?.[0]?.documentId}
        >
          {collections?.map((collection: Collection, index: number) => (
            <div
              key={index}
              className={clsx(
                'm-4 w-96 flex-1 border-b border-black p-2 text-center',
                index === 2 && 'border-b-0',
                index === 0 && 'border-t border-black',
              )}
            >
              <AccordionItem value={collection.documentId}>
                <AccordionTrigger className="justify-center p-0">
                  <Typography
                    variant="text_pageTitle"
                    className="text-center !text-2xl uppercase italic"
                  >
                    {collection.name} (
                    {new Date().getFullYear().toString().slice(-2)})
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
                    objectPosition="center"
                    className="mt-4"
                    style={{
                      objectFit: 'none',
                      objectPosition: 'left bottom',
                    }}
                  />
                  <Button variant="link" className="mt-4">
                    <Typography
                      variant="text_main"
                      className="uppercase underline"
                    >
                      See collection
                    </Typography>
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </div>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
