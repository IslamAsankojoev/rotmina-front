'use client'

import GiftCardImage from '@/public/assets/gift.png'
import PersonalStylistImage from '@/public/assets/personal-stylist.webp'
import { Button } from '@/shadcn/components/ui/button'
import {
  CartItem as CartItemType,
  GiftCardCartItem,
  PersonalStylistCartItem,
  ProductCartItem,
} from '@/src/app/store/cartTypes'
import {
  Typography,
  useDictionary,
  useLangCurrency,
  useLocale,
} from '@/src/shared'
import clsx from 'clsx'
import { Minus, Plus } from 'lucide-react'

interface CartItemProps {
  item: CartItemType
  onQuantityChange: (itemId: string, newQuantity: number) => void
  onRemoveItem: (itemId: string) => void
}

export const CartItem = ({
  item,
  onQuantityChange,
  onRemoveItem,
}: CartItemProps) => {
  const { getPrice, currency } = useLangCurrency()
  const { isRTL } = useLocale()
  const { dictionary } = useDictionary()
  const t = (dictionary as unknown as Record<string, Record<string, string>>)
    .cart || {
    remove: 'Remove',
    size: 'Size:',
    color: 'Color',
    amount: 'Amount:',
    giftCard: 'Gift Card',
    personalStylist: 'Personal Stylist',
    address: 'Address:',
    name: 'Name:',
    online: 'ONLINE',
    inPerson: 'IN-PERSON',
  }

  // Component for displaying product
  const ProductItem = ({ item }: { item: ProductCartItem }) => (
    <div className="relative flex items-center gap-4">
      <div className="relative h-[150px] w-[110px]">
        <img
          src={item?.variant?.images?.[0]?.url || '/assets/products/shirt.webp'}
          alt={item?.productTitle}
          style={{ objectFit: 'cover' }}
          className="w-full h-full"
        />
      </div>
      <div className="relative flex min-h-[150px] flex-1 flex-col justify-between gap-2">
        <div className="flex flex-col gap-2" dir={isRTL ? 'rtl' : 'ltr'}>
          <Typography
            variant="text_main"
            className="text-mini-footer md:text-main font-medium"
          >
            {item?.productTitle}
          </Typography>
          <Typography
            variant="text_main"
            className="text-greyy text-mini-footer md:text-main uppercase"
          >
            {t.size}{' '}
            <span className="text-black">{item?.variant?.size?.name}</span>
          </Typography>
          <Typography
            variant="text_main"
            className="text-greyy text-mini-footer md:text-main flex items-center gap-2 uppercase"
          >
            {t.color}{' '}
            <div
              className="h-8 w-8 rounded-full"
              style={{
                background: `url(${item?.variant?.color?.image?.url}) no-repeat center center`,
                backgroundSize: 'cover',
              }}
            ></div>
          </Typography>
        </div>

        {/* Quantity management */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2" dir={isRTL ? 'rtl' : 'ltr'}>
            <Typography
              variant="text_main"
              className="text-greyy text-mini-footer md:text-main uppercase"
            >
              {t.amount}
            </Typography>
            <div className="flex items-center">
              <Button
                variant="link"
                size="icon"
                onClick={() => onQuantityChange(item?.id, item?.quantity - 1)}
                className="h-8 w-8 p-0"
              >
                <Minus size={16} />
              </Button>
              <Typography
                variant="text_main"
                className="md:text-main min-w-[20px] text-center"
              >
                {item?.quantity}
              </Typography>
              <Button
                variant="link"
                size="icon"
                onClick={() => onQuantityChange(item?.id, item?.quantity + 1)}
                className="h-8 w-8 p-0"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
          <Typography
            variant="text_main"
            className="text-greyy md:text-main text-mini-footer font-medium"
          >
            {getPrice(item?.variant?.price * item?.quantity)} {currency}
          </Typography>
        </div>
        <Button
          variant="link"
          size="sm"
          onClick={() => onRemoveItem(item?.id)}
          className={clsx(
            'text-greyy absolute top-0 p-0 hover:text-black',
            isRTL ? 'left-0!' : 'right-0!',
          )}
        >
          {t.remove}
        </Button>
      </div>
    </div>
  )

  // Component for displaying gift card
  const GiftCardItem = ({ item }: { item: GiftCardCartItem }) => (
    <div className="relative flex items-center gap-2">
      <div className="relative h-[150px] w-[110px]">
        <img
          src={GiftCardImage.src}
          alt="Gift Card"
          style={{ objectFit: 'cover' }}
          className="w-full h-full"
        />
      </div>
      <div className="relative flex min-h-[150px] flex-1 flex-col justify-between gap-2">
        <div className="flex flex-col gap-2" dir={isRTL ? 'rtl' : 'ltr'}>
          <Typography
            variant="text_main"
            className="md:text-main text-mini-footer font-medium"
          >
            {t.giftCard}
          </Typography>
          {item?.recipientEmail && (
            <Typography
              variant="text_main"
              className="text-greyy md:text-main text-mini-footer"
            >
              {t.address}{' '}
              <span className="text-black">{item?.recipientEmail}</span>
            </Typography>
          )}
          {item?.recipientName && (
            <Typography
              variant="text_main"
              className="text-greyy md:text-main text-mini-footer"
            >
              {t.name} <span className="text-black">{item?.recipientName}</span>
            </Typography>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2" dir="ltr">
            <Typography
              variant="text_main"
              className="text-greyy text-mini-footer md:text-main uppercase"
            >
              {t.amount}
            </Typography>
            <div className="flex items-center" dir="ltr">
              <Button
                variant="link"
                size="sm"
                onClick={() => onQuantityChange(item?.id, item?.quantity - 1)}
                className="h-8 w-8 p-0"
              >
                <Minus size={16} />
              </Button>
              <Typography
                variant="text_main"
                className="md:text-main min-w-[20px] text-center"
              >
                {item?.quantity}
              </Typography>
              <Button
                variant="link"
                size="sm"
                onClick={() => onQuantityChange(item?.id, item?.quantity + 1)}
                className="h-8 w-8 p-0"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
          <Typography
            variant="text_main"
            className="text-greyy md:text-main text-mini-footer font-medium"
          >
            {getPrice(item?.price * item?.quantity)} {currency}
          </Typography>
        </div>
        <Button
          variant="link"
          size="sm"
          onClick={() => onRemoveItem(item?.id)}
          className={clsx(
            'text-greyy absolute top-0 p-0 hover:text-black',
            isRTL ? 'left-0!' : 'right-0!',
          )}
        >
          {t.remove}
        </Button>
      </div>
    </div>
  )

  // Component for displaying personal stylist
  const PersonalStylistItem = ({ item }: { item: PersonalStylistCartItem }) => (
    <div className="relative flex gap-4">
      <div className="relative h-[150px] w-[110px] flex-shrink-0">
        <img
          src={PersonalStylistImage.src}
          alt="Personal Stylist"
          style={{ objectFit: 'cover' }}
          className="w-full h-full"
        />
      </div>
      <div className="relative flex min-h-[150px] flex-1 flex-col justify-between">
        <div className="flex flex-col gap-2" dir={isRTL ? 'rtl' : 'ltr'}>
          <Typography
            variant="text_main"
            className="md:text-main text-mini-footer font-medium"
          >
            {t.personalStylist}
          </Typography>
          <Typography
            variant="text_main"
            className="text-greyy md:text-main text-mini-footer uppercase"
          >
            {item?.sessionType === 'virtual' ? t.online : t.inPerson}
          </Typography>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2" dir="ltr">
            <Typography
              variant="text_main"
              className="text-greyy md:text-main text-mini-footer uppercase"
            >
              {t.amount}
            </Typography>
            <div className="flex items-center" dir="ltr">
              <Button
                variant="link"
                size="sm"
                onClick={() => onQuantityChange(item?.id, item?.quantity - 1)}
                className="h-8 w-8 p-0"
              >
                <Minus size={16} />
              </Button>
              <Typography
                variant="text_main"
                className="md:text-main min-w-[20px] text-center"
              >
                {item?.quantity}
              </Typography>
              <Button
                variant="link"
                size="sm"
                onClick={() => onQuantityChange(item?.id, item?.quantity + 1)}
                className="h-8 w-8 p-0"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
          <Typography
            variant="text_main"
            className="text-greyy md:text-main text-mini-footer font-medium"
          >
            {getPrice(item?.price * item?.quantity)} {currency}
          </Typography>
        </div>{' '}
        <Button
          variant="link"
          size="sm"
          onClick={() => onRemoveItem(item?.id)}
          className={clsx(
            'text-greyy absolute top-0 p-0 hover:text-black',
            isRTL ? 'left-0!' : 'right-0!',
          )}
        >
          {t.remove}
        </Button>
      </div>
    </div>
  )

  // Function for rendering cart item
  const renderCartItem = (item: CartItemType) => {
    switch (item?.type) {
      case 'product':
        return <ProductItem item={item} />
      case 'giftcard':
        return <GiftCardItem item={item} />
      case 'personalStylist':
        return <PersonalStylistItem item={item} />
      default:
        return null
    }
  }

  return renderCartItem(item)
}
