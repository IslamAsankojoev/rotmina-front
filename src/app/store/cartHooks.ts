// Example usage of cart store

import { useCartStore } from '@/src/app/store'
import { ProductVariant } from '@/src/entities/Product/model/types'

// Example of adding product to cart
export const useAddToCart = () => {
  const addProduct = useCartStore((state) => state.addProduct)
  
  const addProductToCart = (
    variant: ProductVariant, 
    productTitle: string, 
    productSlug: string, 
    quantity = 1
  ) => {
    addProduct(variant, productTitle, productSlug, quantity)
  }
  
  return { addProductToCart }
}

// Example of adding gift card
export const useAddGiftCard = () => {
  const addGiftCard = useCartStore((state) => state.addGiftCard)
  
  const addGiftCardToCart = (
    amount: number,
    recipientEmail?: string,
    recipientName?: string,
    message?: string
  ) => {
    addGiftCard(amount, recipientEmail, recipientName, message)
  }
  
  return { addGiftCardToCart }
}

// Example of adding personal stylist
export const useAddPersonalStylist = () => {
  const addPersonalStylist = useCartStore((state) => state.addPersonalStylist)
  
  const addStylistToCart = (
    sessionType: 'virtual' | 'in-person',
    duration: number,
    price: number,
    documentId: string,
    location?: string,
  ) => {
    addPersonalStylist(sessionType, duration, price, documentId, location)
  }
  
  return { addStylistToCart }
}

// Example of getting cart info
export const useCartInfo = () => {
  const items = useCartStore((state) => state.items)
  const totalItems = useCartStore((state) => state.totalItems)
  const totalPrice = useCartStore((state) => state.totalPrice)
  const isOpen = useCartStore((state) => state.isOpen)
  
  return {
    items,
    totalItems,
    totalPrice,
    isOpen,
  }
}

// Example of cart management
export const useCartActions = () => {
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const clearCart = useCartStore((state) => state.clearCart)
  const toggleCart = useCartStore((state) => state.toggleCart)
  const openCart = useCartStore((state) => state.openCart)
  const closeCart = useCartStore((state) => state.closeCart)
  
  return {
    updateQuantity,
    removeItem,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
  }
}
