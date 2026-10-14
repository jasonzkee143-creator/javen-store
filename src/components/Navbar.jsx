function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow">
     <h1 className="text-xl font-bold">My Store</h1>

<ul className="flex gap-6">
  <li>Home</li>
  <li>Products</li>
  <li>Cart</li>
</ul>
    </nav>
  )
}

export default Navbar