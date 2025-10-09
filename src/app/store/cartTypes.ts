import { ProductVariant } from '@/src/entities/Product/model/types'

// Базовый тип для элемента корзины
export interface BaseCartItem {
  id: string // уникальный ID элемента в корзине
  type: 'product' | 'giftcard' | 'personalStylist'
  price: number
  createdAt: Date
}

// Товар в корзине
export interface ProductCartItem extends BaseCartItem {
  type: 'product'
  variant: ProductVariant
  productTitle: string
  productSlug: string
  quantity: number // можно регулировать
}

// Подарочная карта в корзине
export interface GiftCardCartItem extends BaseCartItem {
  type: 'giftcard'
  amount: number // сумма подарочной карты
  recipientEmail?: string
  recipientName?: string
  message?: string
  quantity: 1 // всегда 1
}

// Персональный стилист в корзине
export interface PersonalStylistCartItem extends BaseCartItem {
  type: 'personalStylist'
  sessionType: 'virtual' | 'in-person'
  duration: number // продолжительность в минутах
  location?: string
  quantity: 1 // всегда 1
}

// Объединенный тип для всех элементов корзины
export type CartItem = ProductCartItem | GiftCardCartItem | PersonalStylistCartItem

// Состояние корзины
export interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  isOpen: boolean
}

// Действия для управления корзиной
export interface CartActions {
  // Добавление элементов
  addProduct: (variant: ProductVariant, productTitle: string, productSlug: string, quantity?: number) => void
  addGiftCard: (amount: number, recipientEmail?: string, recipientName?: string, message?: string) => void
  addPersonalStylist: (sessionType: 'virtual' | 'in-person', duration: number, price: number, location?: string) => void
  
  // Обновление количества (только для товаров)
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
