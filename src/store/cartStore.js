import { create } from 'zustand'

const useCartStore = create((set) => ({
  items: [],
  addToCart: (product) =>
    set((state) => ({ items: [...state.items, product] })),
}))

export default useCartStore