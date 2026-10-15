import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import ProductDetails from './pages/productDetails'
import Wishlist from './pages/Wishlist'
import CartToast from './components/CartToast'
import WishlistToast from './components/WishlistToast'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <CartToast />
      <WishlistToast />
    </div>
  )
}

export default App