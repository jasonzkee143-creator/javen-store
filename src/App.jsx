  import ProductCard from './components/ProductCard'
import Navbar from './components/Navbar'
   const products = [
  { id: 1, title: "Product 1", price: 19.99, image: "https://picsum.photos/300/200?random=1" },
  { id: 2, title: "Product 2", price: 24.99, image: "https://picsum.photos/300/200?random=2" },
  { id: 3, title: "Product 3", price: 14.5, image: "https://picsum.photos/300/200?random=3" },
  { id: 4, title: "Product 4", price: 39.0, image: "https://picsum.photos/300/200?random=4" },
  { id: 5, title: "Product 5", price: 9.99, image: "https://picsum.photos/300/200?random=5" },
  { id: 6, title: "Product 6", price: 49.99, image: "https://picsum.photos/300/200?random=6" },
]
   
function App() {
  return (
    <div>
      <Navbar />
      <main className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default App