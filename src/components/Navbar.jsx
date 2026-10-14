import { Link } from 'react-router-dom'
import useCartStore from '../store/cartStore'

function Navbar() {
  const items = useCartStore((state) => state.items)

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow">
      <h1 className="text-xl font-bold">My Store</h1>

      <ul className="flex gap-6">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cart">Cart ({items.length})</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar
