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
    }, 'Ошибка загрузки данных')

    fetchPersonalStylists().finally(() => {
      setLoading(false)
    })
  }, [withErrorHandling])

  const handleProductSelect = (productId: string) => {
    setSelectedProduct(productId)
  }

  const handleAddToCart = () => {
    if (sessionType === 'online') {
      const onlineStylist = personalStylists.online[0] // Берем первый доступный online stylist
      if (onlineStylist) {
        addStylistToCart(
          'virtual',
          onlineStylist.hours * 60, // Конвертируем часы в минуты
          onlineStylist.price,
        )
      }
    } else if (selectedProduct) {
      const selectedStylist = personalStylists['at-your-home'].find(
        stylist => stylist.id === selectedProduct
      )
      if (selectedStylist) {
        addStylistToCart(
          'in-person',
          selectedStylist.hours * 60, // Конвертируем часы в минуты
          selectedStylist.price
        )
      }
    }

    openCart()
  }

  const formatDuration = (hours: number): string => {
    if (hours === 1) return '1 hour'
    return `${hours} hours`
  }

  if (loading) {
    return (
      <div className="mt-10">
        <Typography variant="text_main">Загрузка...</Typography>
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
          <TabsTrigger value="online" className="uppercase">
            Online
          </TabsTrigger>
          <TabsTrigger value="at-your-home" className="uppercase">
            At your home
          </TabsTrigger>
        </TabsList>
        <TabsContent value="online">
          {personalStylists.online.length > 0 ? (
            <>
              <Typography variant="text_main">
                <span className="font-bold">Duration:</span>{' '}
                {formatDuration(personalStylists.online[0].hours)}
              </Typography>
              <Typography variant="text_main" className="mt-2">
                <span className="font-bold">Price:</span>{' '}
                {getPrice(personalStylists.online[0].price)} {currency}
              </Typography>
            </>
          ) : (
            <Typography variant="text_main">
              Online сессии временно недоступны
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
                    {formatDuration(stylist.hours)}
                  </Typography>
                  <Typography variant="text_main">
                    {getPrice(stylist.price)} {currency}
                  </Typography>
                </div>
              ))}
            </div>
          ) : (
            <Typography variant="text_main">
              At-your-home сессии временно недоступны
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