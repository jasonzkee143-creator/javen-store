import useCartStore from '../store/cartStore'
import useCartToastStore from '../store/cartToastStore'

function AddToCartButton({ product, className, children = 'Add to cart' }) {
  const addToCart = useCartStore((state) => state.addToCart)
  const notify = useCartToastStore((state) => state.notify)

  const handleAddToCart = () => {
    addToCart(product)
    notify(`${product.title} added to your cart.`)
  }

  return (
    <button type="button" onClick={handleAddToCart} className={className}>
      {children}
    </button>
  )
}

export default AddToCartButton
