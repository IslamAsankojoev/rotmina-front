'use client'

import { useEffect, useState } from 'react'

import CollectionImage from '@/public/assets/collection.webp'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shadcn/components/ui/accordion'
import { Button } from '@/shadcn/components/ui/button'
import { Typography, useDictionary } from '@/src/shared'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import Image from 'next/image'

import { Collection } from '../model'
import { CollectionService } from '../model/api'
import { CollectionDescription } from './CollectionDescription'
import { CollectionTitle } from './CollectionTitle'

export const Collections = () => {
  const { dictionary } = useDictionary()
  const collectionsT = (
    dictionary as unknown as Record<string, Record<string, string>>
  ).collections || {
    noDescription: 'No description',
    seeCollection: 'See collection',
  }

  const { data } = useQuery({
    queryKey: ['collections'],
    queryFn: () => CollectionService.getCollections(),
  })

  const collections = data?.data || []
  const [openCollectionId, setOpenCollectionId] = useState<string>('')

  useEffect(() => {
    if (collections.length > 0 && !openCollectionId) {
      setOpenCollectionId(collections[0].documentId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data])

  const openCollection = collections.find(
    (collection: Collection) => collection.documentId === openCollectionId,
  )
  const displayImage = openCollection?.image?.url || CollectionImage

  return (
    <div className="mb-20 flex flex-col gap-4 md:flex-row">
      <div className="relative order-2 flex h-96 w-full items-center justify-center md:order-1 md:h-[700px] md:flex-1">
        <Image
          src={displayImage}
          objectFit="cover"
          objectPosition="center"
          alt="hero"
          fill
        />
      </div>
      <div className="order-1 flex items-center justify-center overflow-hidden md:order-2 md:flex-1">
        <Accordion
          type="single"
          value={openCollectionId}
          onValueChange={(value) => {
            if (value) {
              setOpenCollectionId(value)
            }
          }}
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
                    <CollectionTitle collection={collection} />
                  </Typography>
                </AccordionTrigger>
                <AccordionContent className="mt-4 flex flex-col items-center justify-center">
                  <Typography variant="text_main">
                    {collection.description ? (
                      <CollectionDescription collection={collection} />
                    ) : (
                      collectionsT.noDescription
                    )}
                  </Typography>
                  <Image
                    src={collection.image?.url || ''}
                    alt={collection.name}
                    width={200}
                    height={200}
                    objectFit="cover"
                    objectPosition="center"
                    className="mt-4"
                  />
                  <Button variant="link" className="mt-4" onClick={() => {
                    if (collection.link) {
                      window.location.href = collection.link
                    }
                  }}>
                    <Typography
                      variant="text_main"
                      className="uppercase underline"
                    >
                      {collectionsT.seeCollection}
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
