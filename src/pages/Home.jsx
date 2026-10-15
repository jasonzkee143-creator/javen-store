import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import WelcomeSlideshow from '../components/WelcomeSlideshow'
import additionalProducts from '../data/additionalProducts'

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)
    fetch('https://fakestoreapi.com/products', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load products')
        return res.json()
      })
      .then((data) => setProducts([...data, ...additionalProducts]))
      .catch((err) => {
        if (err.name !== 'AbortError') setError('We could not load products. Check your connection and try again.')
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort()
  }, [retryCount])

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-7xl p-4 sm:p-6" aria-busy="true" aria-live="polite">
        <p role="status" className="mb-5 text-sm text-gray-600">Loading products...</p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => <div key={item} className="h-72 animate-pulse bg-gray-100" />)}
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="mx-auto w-full max-w-7xl p-4 sm:p-6">
        <div role="alert" className="border-y border-red-200 py-10 text-center">
          <h1 className="text-lg font-semibold text-gray-900">Products are temporarily unavailable</h1>
          <p className="mt-2 text-sm text-gray-600">{error}</p>
          <button onClick={() => setRetryCount((count) => count + 1)} className="mt-5 inline-flex min-h-11 items-center rounded-md bg-blue-700 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-800">
            Try again
          </button>
        </div>
      </main>
    )
  }

  const categories = ['all', ...new Set(products.map((p) => p.category))]

  const filtered = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'all' || p.category === category
    return matchesSearch && matchesCategory
  })

  return (
    <main className="mx-auto w-full min-w-0 max-w-7xl p-4 sm:p-6">
      <WelcomeSlideshow />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input
          aria-label="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search the collection..."
          className="store-search min-h-12 min-w-0 flex-1 border px-5 py-3 text-sm placeholder:text-gray-500"
        />
        <select
          aria-label="Filter by category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="store-category min-h-12 border px-5 py-3 text-sm capitalize text-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="border-y border-gray-200 py-12 text-center">
          <h2 className="text-lg font-semibold text-gray-900">No products found</h2>
          <p className="mt-2 text-sm text-gray-600">Try another search or reset your filters.</p>
          <button
            onClick={() => { setSearch(''); setCategory('all') }}
            className="mt-5 inline-flex min-h-11 items-center rounded-md border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Clear search and filters
          </button>
        </div>
      ) : (
        <div id="products" className="grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product, index) => (
            <ProductCard key={product.id} product={product} animationIndex={index} />
          ))}
        </div>
      )}
    </main>
  )
}

export default Home