import { ProductVariant } from '@/src/entities/Product/model/types'

// Base type for cart item
export interface BaseCartItem {
  id: string // unique ID for cart item
  type: 'product' | 'giftcard' | 'personalStylist'
  price: number
  createdAt: Date
}

// Cart item for product
export interface ProductCartItem extends BaseCartItem {
  type: 'product'
  variant: ProductVariant
  productTitle: string
  productSlug: string
  quantity: number // can be adjusted
}

// Cart item for gift card
export interface GiftCardCartItem extends BaseCartItem {
  type: 'giftcard'
  amount: number // amount of gift card
  recipientEmail?: string
  recipientName?: string
  message?: string
  quantity: number // can be adjusted
}

// Cart item for personal stylist
export interface PersonalStylistCartItem extends BaseCartItem {
  type: 'personalStylist'
  sessionType: 'virtual' | 'in-person'
  duration: number // продолжительность в минутах
  location?: string
  quantity: number // can be adjusted
  documentId: string
}

// Объединенный тип для всех элементов корзины
export type CartItem = ProductCartItem | GiftCardCartItem | PersonalStylistCartItem

// Cart state
export interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  isOpen: boolean
}

// Actions for managing cart
export interface CartActions {
  // Добавление элементов
  addProduct: (variant: ProductVariant, productTitle: string, productSlug: string, quantity?: number) => void
  addGiftCard: (amount: number, recipientEmail?: string, recipientName?: string, message?: string) => void
  addPersonalStylist: (sessionType: 'virtual' | 'in-person', duration: number, price: number, documentId: string, location?: string) => void
  
  // Обновление количества (для всех типов товаров)
  updateQuantity: (itemId: string, quantity: number) => void
  
  // Удаление элементов
  removeItem: (itemId: string) => void
  clearCart: () => void
  
  // Управление состоянием корзины
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  
  // Вычисляемые значения
  getItemCount: () => number
  getTotalPrice: () => number
}

// Полный тип store
export type CartStore = CartState & CartActions
