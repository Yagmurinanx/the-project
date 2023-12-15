import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addToCartAsync, addToFavoritesAsync } from '../Redux/productSlice';
import CartItemSkeleton from '../components/CartItemSkeleton';
import cartIcon from '../assets/icons/cart.svg'
import favoriteIcon from '../assets/icons/favorite-empty.svg'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    dispatch(fetchProducts()).then(()=>{
      setLoading(false);
    });
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCartAsync(product));
    toast('Product added to cart', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }; 

  const handleAddToFavorites = (product) => {
    dispatch(addToFavoritesAsync(product));
    toast('Product added to favorites', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
   
  }; 
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-5 mb-5">
    {loading ? (
         <CartItemSkeleton count={9} /> ) :
      products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="card w-96 bg-base-100 shadow-xl">
            <img src={product.image} alt={product.name} className="p-8 rounded-t-lg" />
            <div className="card-body">
              <p className="card-title">{product.name}</p>
              <p className="card-description">{product.description}</p>
              <p className="text-gray-600">${product.price}</p>
              <div className="card-actions justify-end">
                <button
                  onClick={() => handleAddToFavorites(product)}
                  className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg 
                   "
                >
                  <img src={favoriteIcon} alt='svg favorite'/>
                </button>
                <div className="card-actions justify-end">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg "
                >
                   <img src={cartIcon} alt='svg cart'/>
                </button>
                <Link to={`/${product.id}`} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn btn-outline btn-info ">
                  View Details
                </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
     <Link to="/addProduct"> 
      <button className="fixed left-4 bottom-4" onClick={toggleForm}><svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
    </svg></button>
    </Link>
    </div>
  );
};

export default Products;


