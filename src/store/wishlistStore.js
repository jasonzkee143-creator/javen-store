import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useWishlistStore = create(
  persist(
    (set) => ({
      wishlist: [],
      toggleWishlist: (product) =>
        set((state) => {
          const isSaved = state.wishlist.some((item) => item.id === product.id)
          return {
            wishlist: isSaved
              ? state.wishlist.filter((item) => item.id !== product.id)
              : [...state.wishlist, product],
          }
        }),
    }),
    { name: 'wishlist-storage' }
  )
)

export default useWishlistStore