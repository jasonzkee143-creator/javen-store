import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import useCartStore from '../store/cartStore'
import welcomeStillLife from '../assets/welcome-still-life.svg'

const schema = z.object({
  name: z.string().trim().min(1, 'Enter your full name'),
  email: z.string().trim().email('Enter a valid email address'),
  address: z.string().trim().min(10, 'Enter a complete address (at least 10 characters)'),
})

function Checkout() {
  const items = useCartStore((state) => state.items)
  const promoCode = useCartStore((state) => state.promoCode)
  const clearCart = useCartStore((state) => state.clearCart)
  const [placedOrder, setPlacedOrder] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = promoCode === 'WELCOME10' ? Math.round(subtotal * 10) / 100 : 0
  const total = subtotal - discount

  const onSubmit = (customer) => {
    setPlacedOrder({
      number: `JV-${Date.now().toString(36).toUpperCase()}`,
      customer,
      items: items.map((item) => ({ ...item })),
      promoCode,
      subtotal,
      discount,
      total,
    })
    clearCart()
  }

  if (placedOrder) {
    return (
      <main className="mx-auto w-full max-w-3xl p-4 sm:p-6">
        <section aria-labelledby="confirmation-title" className="order-confirmation">
          <div className="order-confirmation-hero">
            <img src={welcomeStillLife} alt="" aria-hidden="true" className="order-confirmation-art" />
            <div className="order-confirmation-copy">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-100">Order confirmed</p>
              <h1 id="confirmation-title" className="mt-2 text-3xl leading-tight text-white sm:text-4xl">
                Thank you, {placedOrder.customer.name}.
              </h1>
              <p className="mt-3 text-sm leading-6 text-white/80">
                Your order is in good hands. Confirmation number:{' '}
                <span className="font-semibold text-white">{placedOrder.number}</span>
              </p>
            </div>
          </div>

          <div className="order-confirmation-details">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Order summary</h2>
              <ul className="mt-3 divide-y divide-gray-200 border-y border-gray-200">
                {placedOrder.items.map((item) => (
                  <li key={item.id} className="flex justify-between gap-4 py-3 text-sm">
                    <span className="text-gray-700">{item.title} <span className="text-gray-500">× {item.quantity}</span></span>
                    <span className="shrink-0 font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between gap-4 text-gray-600"><dt>Subtotal</dt><dd>${placedOrder.subtotal.toFixed(2)}</dd></div>
                {placedOrder.discount > 0 && (
                  <div className="flex justify-between gap-4 font-medium text-emerald-700">
                    <dt>{placedOrder.promoCode} discount</dt><dd>−${placedOrder.discount.toFixed(2)}</dd>
                  </div>
                )}
                <div className="flex justify-between gap-4 border-t border-gray-200 pt-3 text-base font-bold text-gray-900">
                  <dt>Total</dt><dd>${placedOrder.total.toFixed(2)}</dd>
                </div>
              </dl>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Delivery details</h2>
              <p className="mt-3 text-sm leading-6 text-gray-700">
                {placedOrder.customer.name}<br />
                {placedOrder.customer.email}<br />
                {placedOrder.customer.address}
              </p>
            </div>
          </div>

          <Link to="/" className="m-6 inline-flex min-h-11 items-center rounded-full bg-blue-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:mx-8 sm:mb-8">
            Continue shopping
          </Link>
        </section>
      </main>
    )
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto w-full max-w-3xl p-4 sm:p-6">
        <div className="border-y border-gray-200 py-10 text-center">
          <h1 className="text-xl font-bold text-gray-900">Your cart is empty</h1>
          <p className="mt-2 text-sm text-gray-600">Add something you love before checking out.</p>
          <Link to="/" className="mt-5 inline-flex min-h-11 items-center rounded-md bg-blue-700 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-800">Browse products</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-10 p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <section>
        <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
        <p className="mt-1 text-sm text-gray-600">Enter your details to complete the order.</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 flex flex-col gap-5">
          <div>
            <label htmlFor="checkout-name" className="mb-1.5 block text-sm font-medium text-gray-800">Full name</label>
            <input id="checkout-name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'checkout-name-error' : undefined} {...register('name')} className="w-full rounded-md border border-gray-300 px-3 py-2.5 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-100" />
            {errors.name && <p id="checkout-name-error" role="alert" className="mt-1 text-sm text-red-700">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="checkout-email" className="mb-1.5 block text-sm font-medium text-gray-800">Email address</label>
            <input id="checkout-email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'checkout-email-error' : undefined} {...register('email')} className="w-full rounded-md border border-gray-300 px-3 py-2.5 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-100" />
            {errors.email && <p id="checkout-email-error" role="alert" className="mt-1 text-sm text-red-700">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="checkout-address" className="mb-1.5 block text-sm font-medium text-gray-800">Delivery address</label>
            <textarea id="checkout-address" autoComplete="street-address" rows="3" aria-invalid={Boolean(errors.address)} aria-describedby={errors.address ? 'checkout-address-error' : undefined} {...register('address')} className="w-full resize-y rounded-md border border-gray-300 px-3 py-2.5 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-100" />
            {errors.address && <p id="checkout-address-error" role="alert" className="mt-1 text-sm text-red-700">{errors.address.message}</p>}
          </div>

          <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-md bg-blue-700 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
            Place order
          </button>
        </form>
      </section>

      <aside aria-labelledby="summary-title" className="h-fit border-y border-gray-200 py-5">
        <h2 id="summary-title" className="text-lg font-semibold text-gray-900">Order summary</h2>
        <ul className="mt-3 divide-y divide-gray-200">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between gap-4 py-3 text-sm">
              <span className="text-gray-700">{item.title} <span className="text-gray-500">× {item.quantity}</span></span>
              <span className="shrink-0 font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-3 space-y-2 border-t border-gray-200 pt-4 text-sm">
          <div className="flex justify-between gap-4 text-gray-600"><dt>Subtotal</dt><dd>${subtotal.toFixed(2)}</dd></div>
          {discount > 0 && (
            <div className="flex justify-between gap-4 font-medium text-emerald-700">
              <dt>{promoCode} discount</dt><dd>−${discount.toFixed(2)}</dd>
            </div>
          )}
          <div className="flex justify-between gap-4 pt-1 text-base font-bold text-gray-900">
            <dt>Total</dt><dd>${total.toFixed(2)}</dd>
          </div>
        </dl>
      </aside>
    </main>
  )
}

export default Checkout
