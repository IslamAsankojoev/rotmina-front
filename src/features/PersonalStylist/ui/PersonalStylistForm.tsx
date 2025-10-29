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
import { Typography, useLangCurrancy, useAsyncErrorHandler } from '@/src/shared'
import { getGroupedPersonalStylists } from '../model/api'
import type { PersonalStylist, SessionType } from '../model/type'
import clsx from 'clsx'

export const PersonalStylistForm = () => {
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
    if (minutes / 60 === 1) return '1 hour'
    return `${minutes / 60} hours`
  }

  if (loading) {
    return (
      <div className="mt-10">
        <Typography variant="text_main">Loading...</Typography>
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
            Online
          </TabsTrigger>
          <TabsTrigger value="at-your-home" className="uppercase cursor-pointer">
            At your home
          </TabsTrigger>
        </TabsList>
        <TabsContent value="online">
          {personalStylists.online.length > 0 ? (
            <>
              <Typography variant="text_main">
                <span className="font-bold">Duration:</span>{' '}
                {formatDuration(personalStylists.online[0].minutes)}
              </Typography>
              <Typography variant="text_main" className="mt-2">
                <span className="font-bold">Price:</span>{' '}
                {getPrice(personalStylists.online[0].price)} {currency}
              </Typography>
            </>
          ) : (
            <Typography variant="text_main">
              Online sessions are temporarily unavailable
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
              At-your-home sessions are temporarily unavailable
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
        Add to Cart
      </Button>
    </div>
  )
}