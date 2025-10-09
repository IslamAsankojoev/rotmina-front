import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartStore, ProductCartItem, GiftCardCartItem, PersonalStylistCartItem } from './cartTypes'
import { ProductVariant } from '@/src/entities/Product/model/types'

// Генерируем уникальный ID для элемента корзины
const generateItemId = (): string => {
  return `cart-item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Начальное состояние
      items: [],
      totalItems: 0,
      totalPrice: Number(0),
      isOpen: false,

      // Добавление товара
      addProduct: (variant: ProductVariant, productTitle: string, productSlug: string, quantity = 1) => {
        const existingItem = get().items.find(
          (item): item is ProductCartItem => 
            item.type === 'product' && 
            item.variant.id === variant.id
        )

        if (existingItem) {
          // Если товар уже есть в корзине, увеличиваем количество
          get().updateQuantity(existingItem.id, existingItem.quantity + quantity)
        } else {
          // Добавляем новый товар
          const newItem: ProductCartItem = {
            id: generateItemId(),
            type: 'product',
            variant,
            productTitle,
            productSlug,
            quantity,
            price: variant.price,
            createdAt: new Date(),
          }

        set((state) => ({
          items: [...state.items, newItem],
          totalItems: state.totalItems + quantity,
          totalPrice: Number(state.totalPrice) + Number(variant.price * quantity),
        }))
        }
      },

      // Добавление подарочной карты
      addGiftCard: (amount: number, recipientEmail?: string, recipientName?: string, message?: string) => {
        const newItem: GiftCardCartItem = {
          id: generateItemId(),
          type: 'giftcard',
          amount,
          recipientEmail,
          recipientName,
          message,
          quantity: 1,
          price: amount,
          createdAt: new Date(),
        }

        set((state) => ({
          items: [...state.items, newItem],
          totalItems: state.totalItems + 1,
          totalPrice: Number(state.totalPrice) + Number(amount),
        }))
      },

      // Добавление персонального стилиста
      addPersonalStylist: (sessionType: 'virtual' | 'in-person', duration: number, price: number, location?: string) => {
        const newItem: PersonalStylistCartItem = {
          id: generateItemId(),
          type: 'personalStylist',
          sessionType,
          duration,
          location,
          quantity: 1,
          price,
          createdAt: new Date(),
        }

        set((state) => ({
          items: [...state.items, newItem],
          totalItems: state.totalItems + 1,
          totalPrice: Number(state.totalPrice) + Number(price),
        }))
      },

      // Обновление количества (только для товаров)
      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }

        set((state) => {
          const item = state.items.find(item => item.id === itemId)
          if (!item || item.type !== 'product') return state

          const productItem = item as ProductCartItem
          const oldQuantity = productItem.quantity
          const quantityDiff = quantity - oldQuantity

          return {
            items: state.items.map(item =>
              item.id === itemId
                ? { ...item, quantity } as ProductCartItem
                : item
            ),
            totalItems: state.totalItems + quantityDiff,
            totalPrice: Number(state.totalPrice) + Number(productItem.variant.price * quantityDiff),
          }
        })
      },

      // Удаление элемента
      removeItem: (itemId: string) => {
        set((state) => {
          const item = state.items.find(item => item.id === itemId)
          if (!item) return state

          return {
            items: state.items.filter(item => item.id !== itemId),
            totalItems: state.totalItems - item.quantity,
            totalPrice: Number(state.totalPrice) - Number(item.price * item.quantity),
          }
        })
      },

      // Очистка корзины
      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: Number(0),
        })
      },

      // Управление состоянием корзины
      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }))
      },

      openCart: () => {
        set({ isOpen: true })
      },

      closeCart: () => {
        set({ isOpen: false })
      },

      // Вычисляемые значения
      getItemCount: () => {
        return get().items.reduce((total, item) => Number(total) + Number(item.quantity), 0)
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => Number(total) + Number(item.price * item.quantity), 0)
      },
    }),
    {
      name: 'cart-storage', // имя в localStorage
      partialize: (state) => ({
        items: state.items,
        totalItems: Number(state.totalItems),
        totalPrice: Number(state.totalPrice),
        // isOpen не сохраняем, чтобы корзина всегда закрывалась при перезагрузке
      }),
    }
  )
)
