import { Link } from 'react-router-dom'
import useWishlistStore from '../store/wishlistStore'
import useWishlistToastStore from '../store/wishlistToastStore'
import AddToCartButton from './AddToCartButton'

function ProductCard({ product, animationIndex = 0 }) {
  const isWishlisted = useWishlistStore((state) =>
    state.wishlist.some((item) => item.id === product.id)
  )
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist)
  const notifyWishlist = useWishlistToastStore((state) => state.notify)

  const handleWishlistToggle = () => {
    toggleWishlist(product)
    notifyWishlist(
      isWishlisted
        ? `${product.title} removed from your wishlist.`
        : `${product.title} saved to your wishlist.`,
      isWishlisted ? 'removed' : 'saved'
    )
  }

  return (
    <article
      className="product-card group flex flex-col justify-between border p-4 sm:p-5"
      style={{ animationDelay: `${Math.min(animationIndex, 7) * 65}ms` }}
    >
      <div className="relative">
        <Link to={`/product/${product.id}`} className="product-image flex h-52 w-full items-center justify-center overflow-hidden p-5 sm:h-56">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <button
          type="button"
          onClick={handleWishlistToggle}
          aria-label={isWishlisted ? `Remove ${product.title} from wishlist` : `Save ${product.title} to wishlist`}
          aria-pressed={isWishlisted}
          title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute right-2 top-2 z-10 flex size-10 items-center justify-center rounded-full bg-white shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${isWishlisted ? 'text-rose-600' : 'text-gray-500 hover:text-rose-600'}`}
        >
          <span aria-hidden="true" className="text-xl leading-none">{isWishlisted ? '♥' : '♡'}</span>
        </button>
      </div>

      <div className="mt-5 flex flex-1 flex-col justify-between">
        <div>
          <Link to={`/product/${product.id}`}>
            <h2 className="line-clamp-2 text-sm font-medium leading-6 text-gray-800 transition-colors hover:text-blue-600">
              {product.title}
            </h2>
          </Link>
          <p className="mt-2 text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</p>
        </div>

        <AddToCartButton
          product={product}
          className="product-add-button mt-5 min-h-11 w-full bg-blue-600 px-4 py-2.5 font-medium text-white transition-all hover:bg-blue-700 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        />
      </div>
    </article>
  )
}

export default ProductCard