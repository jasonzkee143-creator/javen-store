import { useEffect } from 'react'
import useWishlistToastStore from '../store/wishlistToastStore'

function WishlistToast() {
  const notification = useWishlistToastStore((state) => state.notification)
  const dismiss = useWishlistToastStore((state) => state.dismiss)

  useEffect(() => {
    if (!notification) return undefined

    const timeoutId = window.setTimeout(() => {
      dismiss(notification.id)
    }, 3200)

    return () => window.clearTimeout(timeoutId)
  }, [notification, dismiss])

  if (!notification) return null

  return (
    <div
      className={`wishlist-toast wishlist-toast--${notification.action}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="wishlist-toast-icon" aria-hidden="true">♥</span>
      <p className="wishlist-toast-message">{notification.message}</p>
      <button
        type="button"
        className="wishlist-toast-dismiss"
        onClick={() => dismiss(notification.id)}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  )
}

export default WishlistToast
