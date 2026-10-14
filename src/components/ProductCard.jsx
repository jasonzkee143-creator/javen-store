import useCartStore from '../store/cartStore'
import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart)

  return (
    <div className="border rounded-lg shadow p-4 flex flex-col">
      <Link to={`/product/${product.id}`}>
  <img
    src={product.image}
    alt={product.title}
    className="w-full h-48 object-contain rounded"
  />
</Link>
<h2 className="text-lg font-semibold mt-3 flex-1">
  <Link to={`/product/${product.id}`} className="hover:underline">
    {product.title}
  </Link>
</h2>
      <p className="text-gray-600">${product.price.toFixed(2)}</p>
      <button
        onClick={() => addToCart(product)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-3"
      >
        Add to cart
      </button>
    </div>
  )
}

export default ProductCard