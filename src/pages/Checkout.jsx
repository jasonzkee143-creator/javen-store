import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import useCartStore from '../store/cartStore'

const schema = z.object({
  name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Enter a valid email'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
})

function Checkout() {
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const [ordered, setOrdered] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const onSubmit = (data) => {
    console.log('Order:', data, items)
    clearCart()
    setOrdered(true)
  }

  if (ordered) {
    return <p className="p-6 text-xl font-bold text-green-600">Order placed. Thank you!</p>
  }

  if (items.length === 0) {
    return <p className="p-6">Your cart is empty.</p>
  }

  return (
    <main className="p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <input {...register('name')} placeholder="Full name" className="w-full border rounded p-2" />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <input {...register('email')} placeholder="Email" className="w-full border rounded p-2" />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <textarea {...register('address')} placeholder="Address" className="w-full border rounded p-2" />
          {errors.address && <p className="text-red-600 text-sm">{errors.address.message}</p>}
        </div>

        <p className="font-bold">Total: ${total.toFixed(2)}</p>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Place order
        </button>
      </form>
    </main>
  )
}

export default Checkout
