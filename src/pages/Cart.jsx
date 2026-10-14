import useCartStore from '../store/cartStore'

function Cart() {
  const items = useCartStore((state) => state.items)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
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
          <p>Qty: {item.quantity}</p>
          <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}

      <p className="text-xl font-bold mt-4">Total: ${total.toFixed(2)}</p>
    </main>
  )
}

export default Cart