import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import useCartStore from '../store/cartStore'

function ProductDetails() {
  const { id } = useParams()
  const addToCart = useCartStore((state) => state.addToCart)

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load product')
        return res.json()
      })
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p className="p-6">Loading...</p>
  if (error) return <p className="p-6 text-red-600">{error}</p>
  if (!product) return <p className="p-6">Product not found.</p>

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <Link to="/" className="text-blue-600 hover:underline">
        &larr; Back to products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-80 object-contain"
        />

        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-500 capitalize">{product.category}</p>
          <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
          <p className="text-gray-700">{product.description}</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2"
          >
            Add to cart
          </button>
        </div>
      </div>
    </main>
  )
}

export default ProductDetails