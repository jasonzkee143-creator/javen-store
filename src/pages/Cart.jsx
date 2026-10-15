import { useState } from 'react'
import { Link } from 'react-router-dom'
import useCartStore from '../store/cartStore'

function Cart() {
  const items = useCartStore((state) => state.items)
  const promoCode = useCartStore((state) => state.promoCode)
  const applyPromoCode = useCartStore((state) => state.applyPromoCode)
  const removePromoCode = useCartStore((state) => state.removePromoCode)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const addToCart = useCartStore((state) => state.addToCart)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
  const [promoInput, setPromoInput] = useState('')
  const [promoMessage, setPromoMessage] = useState('')
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = promoCode === 'WELCOME10' ? Math.round(subtotal * 10) / 100 : 0
  const total = subtotal - discount

  const handleApplyPromo = (event) => {
    event.preventDefault()
    if (applyPromoCode(promoInput)) {
      setPromoMessage('WELCOME10 applied — you saved 10%!')
      setPromoInput('')
    } else {
      setPromoMessage('That promo code is not valid. Check the code and try again.')
    }
  }

  const handleRemovePromo = () => {
    removePromoCode()
    setPromoMessage('Promo code removed.')
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto w-full max-w-5xl p-4 sm:p-6">
        <div className="border-y border-gray-200 py-12 text-center">
          <h1 className="text-xl font-bold text-gray-900">Your cart is empty</h1>
          <p className="mt-2 text-sm text-gray-600">Your next favorite find is waiting.</p>
          <Link to="/" className="mt-5 inline-flex min-h-11 items-center rounded-md bg-blue-700 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
            Browse products
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto w-full max-w-5xl p-4 sm:p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Cart</h1>

      {items.map((item) => (
        <div key={item.id} className="flex flex-col gap-3 border-b border-gray-200 py-4 sm:flex-row sm:items-center sm:gap-4">
          <img
            src={item.image}
            alt={item.title}
            className="w-16 h-16 object-contain"
          />
          <p className="min-w-0 flex-1 text-sm font-medium text-gray-800">{item.title}</p>
          <div className="flex items-center gap-2">
            <button aria-label={`Decrease quantity of ${item.title}`} onClick={() => decreaseQuantity(item.id)} className="size-9 rounded border border-gray-300 text-gray-700 hover:bg-gray-50">-</button>
            <span aria-live="polite" className="min-w-6 text-center">{item.quantity}</span>
            <button aria-label={`Increase quantity of ${item.title}`} onClick={() => addToCart(item)} className="size-9 rounded border border-gray-300 text-gray-700 hover:bg-gray-50">+</button>
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

      <section aria-label="Promo code and total" className="cart-total-panel mt-8 ml-auto max-w-md">
        <h2 className="text-lg font-semibold text-gray-900">Have a promo code?</h2>
        {promoCode ? (
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
            <p className="text-sm text-emerald-800">
              <span className="font-bold">{promoCode}</span> applied · 10% off
            </p>
            <button type="button" onClick={handleRemovePromo} className="text-sm font-semibold text-emerald-800 underline underline-offset-2">
              Remove
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyPromo} className="mt-3 flex gap-2">
            <label className="sr-only" htmlFor="cart-promo-code">Promo code</label>
            <input
              id="cart-promo-code"
              value={promoInput}
              onChange={(event) => setPromoInput(event.target.value)}
              placeholder="Enter promo code"
              autoCapitalize="characters"
              className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
            />
            <button type="submit" className="rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800">
              Apply
            </button>
          </form>
        )}
        {promoMessage && <p role="status" className="mt-2 text-sm text-gray-600">{promoMessage}</p>}
        <dl className="mt-5 space-y-2 border-t border-gray-200 pt-4 text-sm">
          <div className="flex justify-between gap-4 text-gray-600">
            <dt>Subtotal</dt><dd>${subtotal.toFixed(2)}</dd>
          </div>
          {discount > 0 && (
            <div className="flex justify-between gap-4 font-medium text-emerald-700">
              <dt>WELCOME10 discount</dt><dd>−${discount.toFixed(2)}</dd>
            </div>
          )}
          <div className="flex justify-between gap-4 pt-1 text-lg font-bold text-gray-900">
            <dt>Total</dt><dd>${total.toFixed(2)}</dd>
          </div>
        </dl>
        <Link
          to="/checkout"
          className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
        >
          Proceed to checkout
        </Link>
      </section>
    </main>
  )
}

export default Cart