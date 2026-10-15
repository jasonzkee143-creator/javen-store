import { Link } from 'react-router-dom'
import useCartStore from '../store/cartStore'
import useWishlistStore from '../store/wishlistStore'
import logo from '../assets/logo.svg'

function Navbar() {
  const count = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  )
  const wishlistCount = useWishlistStore((state) => state.wishlist.length)

  return (
    <nav className="store-nav sticky top-0 z-50 border-b backdrop-blur-md" aria-label="Main navigation">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:px-8 md:flex-row md:items-center md:justify-between">
        <Link to="/" className="store-brand-link flex items-center gap-3">
          <img
            src={logo}
            alt=""
            aria-hidden="true"
            className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14"
          />
          <span className="flex flex-col">
            <span className="store-brand">Javen Store</span>
            <span className="store-brand-tagline">Considered finds, everyday essentials</span>
          </span>
        </Link>

        <ul className="store-nav-links flex items-center justify-between gap-1 text-xs sm:justify-start sm:gap-2 sm:text-sm">
          <li>
            <Link to="/" className="store-nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/wishlist" className="store-nav-link">
              Wishlist <span className="store-nav-count">{wishlistCount}</span>
            </Link>
          </li>
          <li>
            <Link to="/cart" className="store-nav-link">
              Cart <span className="store-nav-count">{count}</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar