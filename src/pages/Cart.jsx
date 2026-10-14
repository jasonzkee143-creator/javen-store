import useCartStore from '../store/cartStore'

function Cart() {
  const items = useCartStore((state) => state.items)
  const total = items.reduce((sum, item) => sum + item.price, 0)

  if (items.length === 0) {
    return <p className="p-6">Your cart is empty.</p>
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-4 border-b py-3">
          <img
  src={item.image}
  alt={item.title}
  className="w-16 h-16 object-contain"
/>
<p className="flex-1">{item.title}</p>
<p className="font-semibold">${item.price.toFixed(2)}</p>
        </div>
      ))}

      <p className="text-xl font-bold mt-4">Total: ${total.toFixed(2)}</p>
    </main>
  )
}

export default Cart