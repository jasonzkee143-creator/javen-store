import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import useWishlistStore from '../store/wishlistStore'

function Wishlist() {
  const items = useWishlistStore((state) => state.wishlist)

  return (
    <main className="mx-auto w-full min-w-0 max-w-7xl p-4 sm:p-6">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="mb-1 text-sm font-medium text-blue-600">Saved for later</p>
          <h1 className="text-2xl font-bold text-gray-900">Wishlist</h1>
        </div>
        <p className="text-sm text-gray-500">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white px-6 py-12 text-center">
          <p className="text-lg font-semibold text-gray-800">Your wishlist is empty</p>
          <p className="mt-2 text-sm text-gray-600">Save products you like and find them here later.</p>
          <Link
            to="/"
            className="mt-5 inline-flex min-h-11 items-center rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Explore products
          </Link>
        </div>
      ) : (
        <div className="grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product, index) => (
            <ProductCard key={product.id} product={product} animationIndex={index} />
          ))}
        </div>
      )}
    </main>
  )
}

export default Wishlist