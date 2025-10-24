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
import {
  CartItem,
  OrderConfirmModal,
  OrderForm,
} from '@/src/features'
import { Address } from '@/src/features/Address'
import { Breadcrumbs, Typography, useLangCurrancy } from '@/src/shared'
import { toast } from 'sonner'

export default function CartPage() {
  const { items, totalItems, totalPrice } = useCartInfo()
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

  const handleSubmitOrder = async () => {
    if (!shippingAddress) {
      toast.error('Please add a shipping address')
      return
    }

    if (items.length === 0) {
      toast.error('Cart is empty')
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
      toast.error('An error occurred while creating the order. Please try again.')
    } finally {
      setIsCreatingOrder(false)
    }
  }

  return (
    <>
      <div className="relative container mt-24 mb-10 flex w-full flex-col justify-end md:mt-36">
        <Breadcrumbs
          links={[
            { title: 'HOME', href: '/' },
            { title: 'CART', href: '/cart' },
          ]}
        />
        <div className="border-greyy/70 mt-16 flex justify-between border-b">
          <Typography
            variant="text_main"
            className="uppercase"
          >
            Shipping Information
          </Typography>
          <Typography
            variant="text_main"
            className="uppercase"
          >
            Payment Methods
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
                <Typography variant="text_title">
                  Your cart ({totalItems})
                </Typography>
              </div>
              <div className="flex items-center justify-between">
                <Typography variant="text_main" className="uppercase">
                  subtotal
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
                        Your cart is empty
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
            onOpenChange={setOpenConfirmModal}
          />
        )}
      </div>
    </>
  )
}
