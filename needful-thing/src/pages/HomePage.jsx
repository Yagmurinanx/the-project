import React, { useState } from 'react'
import Products from './Products'
import { Link } from 'react-router-dom';

const HomePage = () => {
  // const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };


  return (
    <div className='bg-backgroundImage'>
      <Products/>
      <Link to="/addProduct"> 
      <button className="fixed left-4 bottom-4" onClick={toggleForm}><svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
    </svg></button>
    </Link>
    </div>
  )
}

export default HomePage
