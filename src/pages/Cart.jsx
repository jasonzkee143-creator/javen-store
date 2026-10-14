import { Link } from 'react-router-dom'
import useCartStore from '../store/cartStore'

function Cart() {
  const items = useCartStore((state) => state.items)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const addToCart = useCartStore((state) => state.addToCart)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (items.length === 0) {
    return <p className="p-6">Your cart is empty.</p>
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>

      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-4 border-b py-3">
          <img
            src={item.image}
            alt={item.title}
            className="w-16 h-16 object-contain"
          />
          <p className="flex-1">{item.title}</p>
          <div className="flex items-center gap-2">
            <button onClick={() => decreaseQuantity(item.id)} className="px-2 border rounded">-</button>
            <span>{item.quantity}</span>
            <button onClick={() => addToCart(item)} className="px-2 border rounded">+</button>
          </div>
          <p className="font-semibold w-24 text-right">${(item.price * item.quantity).toFixed(2)}</p>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}

      <p className="text-xl font-bold mt-4">Total: ${total.toFixed(2)}</p>

      <Link
        to="/checkout"
        className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Proceed to checkout
      </Link>
    </main>
  )
}

export default Cart