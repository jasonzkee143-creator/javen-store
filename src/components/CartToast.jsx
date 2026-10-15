import { useEffect } from 'react'
import useCartToastStore from '../store/cartToastStore'

function CartToast() {
  const notification = useCartToastStore((state) => state.notification)
  const dismiss = useCartToastStore((state) => state.dismiss)

  useEffect(() => {
    if (!notification) return undefined

    const timeoutId = window.setTimeout(() => {
      dismiss(notification.id)
    }, 3200)

    return () => window.clearTimeout(timeoutId)
  }, [notification, dismiss])

  if (!notification) return null

  return (
    <div className="cart-toast" role="status" aria-live="polite" aria-atomic="true">
      <span className="cart-toast-icon" aria-hidden="true">✓</span>
      <p className="cart-toast-message">{notification.message}</p>
      <button
        type="button"
        className="cart-toast-dismiss"
        onClick={() => dismiss(notification.id)}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  )
}

export default CartToast
