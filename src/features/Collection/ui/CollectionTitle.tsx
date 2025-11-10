'use client'

import { useLocale } from '@/src/shared'

import { Collection } from '../model'

export const CollectionTitle = ({ collection }: { collection: Collection }) => {
  const { locale } = useLocale()
  return (
    <>
      {locale === 'en'
        ? collection.name || collection.nameHE
        : collection.nameHE || collection.name}
    </>
  )
}
