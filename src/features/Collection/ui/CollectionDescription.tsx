'use client'

import { useLocale } from '@/src/shared'

import { Collection } from '../model'

export const CollectionDescription = ({
  collection,
}: {
  collection: Collection
}) => {
  const { locale } = useLocale()
  return (
    <>
      {locale === 'en'
        ? collection.description || collection.descriptionHE
        : collection.descriptionHE || collection.description}
    </>
  )
}
