import React from 'react'
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <div className="bg-gray-800">
  <div className="container mx-auto px-4">
    <nav className="flex items-center justify-between py-4">
      <Link to="/" className="text-2xl font-bold text-white hover:text-gray-300">Needful Things</Link>
      <ul className="flex items-center space-x-4">
        <li>
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
        </li>
        <li>
          <Link to="/products" className="text-white hover:text-gray-300">Products</Link>
        </li>
        <li className="relative">
          <Link to="/cart" className="text-white hover:text-gray-300">Cart</Link>
          <div className="absolute top-full left-0 w-48 bg-white shadow-md py-2 invisible opacity-0 transition duration-300 z-10">
            <Link to="/cart" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">View Cart</Link>
            {/* Other dropdown items related to cart */}
          </div>
        </li>
        <li className="relative">
          <Link to="/favorites" className="text-white hover:text-gray-300">Favorites</Link>
          <div className="absolute top-full left-0 w-48 bg-white shadow-md py-2 invisible opacity-0 transition duration-300 z-10">
            <Link to="/favorites" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">View Favorites</Link>
            {/* Other dropdown items related to favorites */}
          </div>
        </li>
      </ul>
    </nav>
  </div>
</div>

  
  
  )
}

export default Navbar