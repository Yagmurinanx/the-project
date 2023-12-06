import React, { useState } from 'react'
import Products from './Products'
import AddProductForm from '../components/AddProductForm'

const HomePage = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };


  return (
    <div>
      <Products/>
      <button onClick={toggleForm}>Ürün Ekle</button>
      {showForm && <AddProductForm />}
    </div>
  )
}

export default HomePage