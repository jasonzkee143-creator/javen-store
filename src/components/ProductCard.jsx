function ProductCard({ title, price, image }) {
  return (
<div className="border rounded-lg shadow p-4 flex flex-col">      <img
        src={image}
        alt={title}
        className="w-full h-48 object-contain rounded"
      />
      <h2 className="text-lg font-semibold mt-3">{title}</h2>
<p className="text-gray-600">${price.toFixed(2)}</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-3">
        Add to cart
      </button>
    </div>
  )
}

export default ProductCard