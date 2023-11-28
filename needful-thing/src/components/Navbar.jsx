import React from 'react'
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
     <div className='navbar bg-base-100 '>
      <div className="flex-1">
    <Link to="/">
      <div className="btn btn-ghost text-xl">Needful Things</div>
    </Link>
    <ul className="flex  space-x-4 gap-8">
      <li>
        <Link to="/" className="text-green-500 hover:text-red-700">Home</Link>
      </li>
      <li>
        <Link to="/products" className="text-green-500 hover:text-red-700">Products</Link>
      </li>
      <div className="flex-none">
       <div className="dropdown dropdown-end">
      <li>
        <Link to="/cart" >Cart</Link>
      </li>
       </div>
      </div>
    </ul>
    </div>
   </div>
  
  
  )
}

export default Navbar