'use client'

import { useState, useEffect } from 'react'

import { Button } from '@/shadcn/components/ui/button'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shadcn/components/ui/tabs'
import { useAddPersonalStylist, useCartActions } from '@/src/app/store'
import { Typography, useLangCurrancy, useAsyncErrorHandler, useDictionary, useLocale } from '@/src/shared'
import { getGroupedPersonalStylists } from '../model/api'
import type { PersonalStylist, SessionType } from '../model/type'
import clsx from 'clsx'

export const PersonalStylistForm = () => {
  const { dictionary } = useDictionary()
  const { locale } = useLocale()
  const t = ((dictionary as unknown) as Record<string, Record<string, string>>).personalStylist || {
    online: 'Online',
    atYourHome: 'At your home',
    duration: 'Duration:',
    priceLabel: 'Price:',
    onlineUnavailable: 'Online sessions are temporarily unavailable',
    atYourHomeUnavailable: 'At-your-home sessions are temporarily unavailable',
    addToCart: 'Add to Cart',
    loading: 'Loading...',
  }
  const { getPrice, currency } = useLangCurrancy()
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [sessionType, setSessionType] = useState<SessionType>('online')
  const [personalStylists, setPersonalStylists] = useState<{
    online: PersonalStylist[]
    'at-your-home': PersonalStylist[]
  }>({ online: [], 'at-your-home': [] })
  const [loading, setLoading] = useState(true)

  const { addStylistToCart } = useAddPersonalStylist()
  const { openCart } = useCartActions()
  const { withErrorHandling } = useAsyncErrorHandler()

  useEffect(() => {
    const fetchPersonalStylists = withErrorHandling(async () => {
      setLoading(true)
      const data = await getGroupedPersonalStylists()
      setPersonalStylists(data)
    }, 'Error loading data')

    fetchPersonalStylists().finally(() => {
      setLoading(false)
    })
  }, [withErrorHandling])

  const handleProductSelect = (productId: string) => {
    setSelectedProduct(productId)
  }

  const handleAddToCart = () => {
    if (sessionType === 'online') {
      const onlineStylist = personalStylists.online[0] // Take first available online stylist
      if (onlineStylist) {
        addStylistToCart(
          'virtual',
          onlineStylist.minutes,
          onlineStylist.price,
          onlineStylist.documentId,
        )
      }
    } else if (selectedProduct) {
      const selectedStylist = personalStylists['at-your-home'].find(
        stylist => stylist.id === selectedProduct
      )
      if (selectedStylist) {
        addStylistToCart(
          'in-person',
          selectedStylist.minutes,
          selectedStylist.price,
          selectedStylist.documentId,
        )
      }
    }

    openCart()
  }

  const formatDuration = (minutes: number): string => {
    const hours = minutes / 60
    if (locale === 'he') {
      if (hours === 1) return 'שעה אחת'
      if (hours === 1.5) return 'שעה וחצי'
      if (hours === 2) return 'שעתיים'
      if (hours === 2.5) return 'שעתיים וחצי'
      if (hours === 3) return 'שלוש שעות'
      if (hours === 3.5) return 'שלוש וחצי שעות'
      if (hours === 4) return 'ארבע שעות'
      if (hours === 4.5) return 'ארבע וחצי שעות'
      if (hours === 5) return 'חמש שעות'
      if (hours === 5.5) return 'חמש וחצי שעות'
      if (hours === 6) return 'שש שעות'
      return `${hours} שעות`
    } else {
      if (hours === 1) return '1 hour'
      if (hours === 1.5) return '1.5 hours'
      if (hours === 2) return '2 hours'
      if (hours === 2.5) return '2.5 hours'
      if (hours === 3) return '3 hours'
      if (hours === 3.5) return '3.5 hours'
      if (hours === 4) return '4 hours'
      if (hours === 4.5) return '4.5 hours'
      if (hours === 5) return '5 hours'
      if (hours === 5.5) return '5.5 hours'
      if (hours === 6) return '6 hours'
      return `${hours} hours`
    }
  }

  if (loading) {
    return (
      <div className="mt-10">
        <Typography variant="text_main">{t.loading}</Typography>
      </div>
    )
  }

  return (
    <div>
      <Tabs
        defaultValue="online"
        className="mt-10"
        onValueChange={(value) =>
          setSessionType(value as SessionType)
        }
      >
        <TabsList>
          <TabsTrigger value="online" className="uppercase cursor-pointer">
            {t.online}
          </TabsTrigger>
          <TabsTrigger value="at-your-home" className="uppercase cursor-pointer">
            {t.atYourHome}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="online">
          {personalStylists.online.length > 0 ? (
            <>
              <Typography variant="text_main">
                <span className="font-bold">{t.duration}</span>{' '}
                {formatDuration(personalStylists.online[0].minutes)}
              </Typography>
              <Typography variant="text_main" className="mt-2">
                <span className="font-bold">{t.priceLabel}</span>{' '}
                {getPrice(personalStylists.online[0].price)} {currency}
              </Typography>
            </>
          ) : (
            <Typography variant="text_main">
              {t.onlineUnavailable}
            </Typography>
          )}
        </TabsContent>
        <TabsContent value="at-your-home">
          {personalStylists['at-your-home'].length > 0 ? (
            <div className="flex max-w-[600px] flex-wrap gap-6 bg-[#EFEFEF] p-4">
              {personalStylists['at-your-home'].map((stylist) => (
                <div
                  key={stylist.id}
                  className={clsx(
                    'flex cursor-pointer flex-col items-center justify-center',
                    selectedProduct === stylist.id ? 'text-black' : 'text-greyy',
                  )}
                  onClick={() => handleProductSelect(stylist.id)}
                >
                  <Typography variant="text_main">
                    {formatDuration(stylist.minutes)}
                  </Typography>
                  <Typography variant="text_main">
                    {getPrice(stylist.price)} {currency}
                  </Typography>
                </div>
              ))}
            </div>
          ) : (
            <Typography variant="text_main">
              {t.atYourHomeUnavailable}
            </Typography>
          )}
        </TabsContent>
      </Tabs>
      <Button
        variant="outline-minimal"
        size="lg"
        className="my-10 uppercase"
        onClick={handleAddToCart}
        disabled={
          (sessionType === 'at-your-home' && !selectedProduct) ||
          (sessionType === 'online' && personalStylists.online.length === 0) ||
          (sessionType === 'at-your-home' && personalStylists['at-your-home'].length === 0)
        }
      >
        {t.addToCart}
      </Button>
    </div>
  )
}