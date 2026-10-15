import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import AddToCartButton from '../components/AddToCartButton'
import additionalProducts from '../data/additionalProducts'

function ProductDetails() {
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)
    fetch('https://fakestoreapi.com/products', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load product')
        return res.json()
      })
      .then((products) => {
        const catalog = [...products, ...additionalProducts]
        const selectedProduct = catalog.find((item) => String(item.id) === id)
        setProduct(selectedProduct ?? null)
        setRelatedProducts(
          selectedProduct
            ? catalog
                .filter((item) => item.id !== selectedProduct.id && item.category === selectedProduct.category)
                .slice(0, 3)
            : []
        )
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError('We could not load this product. Please try again.')
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [id])

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-6xl p-4 sm:p-6" aria-busy="true" aria-live="polite">
        <p role="status" className="animate-pulse py-16 text-center text-sm text-gray-500">Loading product details...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="mx-auto w-full max-w-6xl p-4 sm:p-6">
        <div role="alert" className="border-y border-red-200 py-8 text-center">
          <h1 className="text-lg font-semibold text-gray-900">Product unavailable</h1>
          <p className="mt-2 text-sm text-gray-600">{error}</p>
          <button onClick={() => window.location.reload()} className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
            Try again
          </button>
        </div>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="mx-auto w-full max-w-6xl p-4 sm:p-6">
        <div className="border-y border-gray-200 py-10 text-center">
          <h1 className="text-lg font-semibold text-gray-900">Product not found</h1>
          <Link to="/" className="mt-4 inline-block text-sm font-medium text-blue-700 hover:underline">Browse all products</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto w-full max-w-6xl p-4 sm:p-6">
      <Link to="/" className="text-sm font-medium text-blue-700 hover:underline">
        &larr; Back to products
      </Link>

      <div className="mt-5 grid min-w-0 grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
        <div className="flex min-h-72 items-center justify-center bg-gray-50 p-8 sm:min-h-96">
          <img src={product.image} alt={product.title} className="max-h-80 max-w-full object-contain" />
        </div>

        <div className="flex min-w-0 flex-col items-start gap-4 py-2">
          <p className="text-sm font-medium capitalize text-gray-500">{product.category}</p>
          <h1 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">{product.title}</h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-600" aria-label={`Rated ${product.rating?.rate ?? 'not rated'} out of 5 based on ${product.rating?.count ?? 0} reviews`}>
              <span className="text-amber-500" aria-hidden="true">★</span>{' '}
              {product.rating?.rate ?? 'Not rated'}
              <span className="ml-1 text-gray-500">({product.rating?.count ?? 0} reviews)</span>
            </p>
          </div>
          <p className="text-sm font-medium text-emerald-700">Availability: Available to add to cart</p>
          <p className="max-w-prose text-sm leading-6 text-gray-700">{product.description}</p>
          <AddToCartButton
            product={product}
            className="mt-2 inline-flex min-h-11 items-center rounded-md bg-blue-700 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          />
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section aria-labelledby="related-title" className="mt-14 border-t border-gray-200 pt-8">
          <h2 id="related-title" className="mb-5 text-xl font-bold text-gray-900">Related products</h2>
          <div className="grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((relatedProduct, index) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} animationIndex={index} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

export default ProductDetails