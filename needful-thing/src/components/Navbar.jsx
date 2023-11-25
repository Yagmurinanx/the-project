import React from 'react'
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
     <div className='bg-slate-800 flex justify-between px-16 gap-4  py-8 text-xl  text-white
    '>
    <Link to="/">
      <div>Needful Things</div>
    </Link>
    <ul className="flex  space-x-4 gap-8">
      <li>
        <Link to="/" className="text-blue-500 hover:text-blue-700">Home</Link>
      </li>
      <li>
        <Link to="/products">Products</Link>
      </li>
      <li>
        <Link to="/chart">Chart</Link>
      </li>
     
    </ul>
   </div>
  
  
  )
}

export default Navbar