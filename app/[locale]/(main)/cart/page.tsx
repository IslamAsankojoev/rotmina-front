'use client'

import { useState } from 'react'

import { ScrollArea } from '@/shadcn/components/ui/scroll-area'
import { Separator } from '@/shadcn/components/ui/separator'
import { useCartActions, useCartInfo } from '@/src/app'
import {
  CreateOrderItem,
  CreateOrderRequest,
  OrderResponse,
  OrderService,
} from '@/src/entities/Order'
import { CartItem, OrderConfirmModal, OrderForm } from '@/src/features'
import { Address } from '@/src/features/Address'
import { Breadcrumbs, Typography, useLangCurrancy, useDictionary, useLocale } from '@/src/shared'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const { dictionary } = useDictionary()
  const { localizePath } = useLocale()
  const cartPageT = ((dictionary as unknown) as Record<string, Record<string, string>>).cartPage || {
    home: 'HOME',
    cartBreadcrumb: 'CART',
    shippingInformation: 'Shipping Information',
    paymentMethods: 'Payment Methods',
    yourCart: 'Your cart',
    subtotal: 'subtotal',
    yourCartIsEmpty: 'Your cart is empty',
    pleaseAddAddress: 'Please add a shipping address',
    cartIsEmpty: 'Cart is empty',
    errorCreatingOrder: 'An error occurred while creating the order. Please try again.',
  }
  const router = useRouter()
  const { items, totalPrice } = useCartInfo()
  const { updateQuantity, removeItem } = useCartActions()
  const { getPrice, currency } = useLangCurrancy()
  const [shippingAddress, setShippingAddress] = useState<Address | null>(null)
  const [isCreatingOrder, setIsCreatingOrder] = useState(false)
  const [openConfirmModal, setOpenConfirmModal] = useState(false)
  const [successOrder, setSuccessOrder] = useState<OrderResponse | null>(null)

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity)
  }

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId)
  }

  const handleCloseConfirmModal = () => {
    setSuccessOrder(null)
    setOpenConfirmModal(false)
    router.push('/')
  }

  const handleSubmitOrder = async () => {
    if (!shippingAddress) {
      toast.error(cartPageT.pleaseAddAddress)
      return
    }

    if (items.length === 0) {
      toast.error(cartPageT.cartIsEmpty)
      return
    }

    setIsCreatingOrder(true)

    try {
      // Convert all cart items to order items
      const orderItems: CreateOrderItem[] = []

      for (const item of items) {
        if (item.type === 'product') {
          orderItems.push({
            id: item.id,
            type: 'product' as const,
            variant: {
              id: item.variant.id,
              documentId: item.variant.documentId,
              sku: item.variant.sku,
              price: item.variant.price,
              stock: item.variant.stock,
              is_active: item.variant.is_active,
              images: item.variant.images || null,
              size: {
                id: item.variant.size.id,
                documentId: item.variant.size.documentId,
                name: item.variant.size.name,
                sort_order: item.variant.size.sort_order,
                slug: item.variant.size.slug,
              },
              color: {
                id: item.variant.color.id,
                documentId: item.variant.color.documentId,
                name: item.variant.color.name,
                code: item.variant.color.code,
                slug: item.variant.color.slug,
                hex: item.variant.color.hex,
              },
            },
            productTitle: item.productTitle,
            productSlug: item.productSlug,
            quantity: item.quantity,
            price: item.price,
          })
        } else if (item.type === 'giftcard') {
          orderItems.push({
            id: item.id,
            type: 'giftcard' as const,
            amount: item.amount,
            recipientEmail: item.recipientEmail,
            recipientName: item.recipientName,
            message: item.message,
            quantity: item.quantity,
            price: item.price,
          })
        } else if (item.type === 'personalStylist') {
          orderItems.push({
            id: item.id,
            documentId: item.documentId,
            type: 'personalStylist' as const,
            sessionType: item.sessionType,
            duration: item.duration,
            quantity: item.quantity,
            price: item.price,
          })
        }
      }

      // Create order
      const orderData: CreateOrderRequest = {
        payment_method: 'card',
        totalPrice,
        payment_status: 'unpaid',
        notes: 'Order created through website',
        addressId: shippingAddress?.documentId || '',
        items: orderItems,
        currency_code: currency,
      }

      const orderSuccess = await OrderService.createOrder(orderData)
      if (orderSuccess.success) {
        setSuccessOrder(orderSuccess)
        setOpenConfirmModal(true)
      } else {
        toast.error(orderSuccess.message)
      }
    } catch (error) {
      console.error('Error creating order:', error)
      toast.error(cartPageT.errorCreatingOrder)
    } finally {
      setIsCreatingOrder(false)
    }
  }

  return (
    <>
      <div className="relative container my-10 flex w-full flex-col justify-end">
        <Breadcrumbs
          links={[
            { title: cartPageT.home, href: localizePath('/') },
            { title: cartPageT.cartBreadcrumb, href: localizePath('/cart') },
          ]}
        />
        <div className="border-greyy/70 mt-16 flex flex-col md:flex-row justify-between md:border-b">
          <Typography variant="text_main" className="uppercase border-b border-black">
            {cartPageT.shippingInformation}
          </Typography>
          <Typography variant="text_main" className="uppercase text-greyy">
            {cartPageT.paymentMethods}
          </Typography>
        </div>
        <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
          <OrderForm
            onSubmit={handleSubmitOrder}
            setShippingAddress={setShippingAddress}
            selectedAddress={shippingAddress as Address}
            isLoading={isCreatingOrder}
          />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between pt-8">
                <Typography variant="text_title" className="italic">
                  {cartPageT.yourCart}
                </Typography>
              </div>
              <div className="flex items-center justify-between">
                <Typography variant="text_main" className="uppercase">
                  {cartPageT.subtotal}
                </Typography>
                <Typography variant="text_main">
                  {getPrice(totalPrice)} {currency}
                </Typography>
              </div>
              <ScrollArea className="h-[500px] w-full">
                <div className="flex flex-col overflow-hidden">
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <Typography variant="text_main" className="text-greyy">
                        {cartPageT.yourCartIsEmpty}
                      </Typography>
                    </div>
                  ) : (
                    items.map((item) => (
                      <div key={item.id}>
                        <Separator className="my-4" />
                        <CartItem
                          item={item}
                          onQuantityChange={handleQuantityChange}
                          onRemoveItem={handleRemoveItem}
                        />
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>

        {successOrder && (
          <OrderConfirmModal
            order={successOrder}
            open={openConfirmModal}
            onOpenChange={handleCloseConfirmModal}
          />
        )}
      </div>
    </>
  )
}
