import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      promoCode: null,

      addToCart: (product) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id)
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            }
          }
          return { items: [...state.items, { ...product, quantity: 1 }] }
        }),

      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0),
        })),

      applyPromoCode: (code) => {
        if (code.trim().toUpperCase() !== 'WELCOME10') return false
        set({ promoCode: 'WELCOME10' })
        return true
      },

      removePromoCode: () => set({ promoCode: null }),

      clearCart: () => set({ items: [], promoCode: null }),
    }),
    { name: 'cart-storage' }
  )
)

export default useCartStore