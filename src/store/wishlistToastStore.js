import { create } from 'zustand'

let nextNotificationId = 0

const useWishlistToastStore = create((set) => ({
  notification: null,
  notify: (message, action) =>
    set({ notification: { id: ++nextNotificationId, message, action } }),
  dismiss: (id) =>
    set((state) => (
      state.notification?.id === id ? { notification: null } : state
    )),
}))

export default useWishlistToastStore
