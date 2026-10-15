import { create } from 'zustand'

let nextNotificationId = 0

const useCartToastStore = create((set) => ({
  notification: null,
  notify: (message) =>
    set({ notification: { id: ++nextNotificationId, message } }),
  dismiss: (id) =>
    set((state) => (
      state.notification?.id === id ? { notification: null } : state
    )),
}))

export default useCartToastStore
