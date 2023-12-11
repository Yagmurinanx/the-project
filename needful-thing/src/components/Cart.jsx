import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCart } from '../api';
import axios from 'axios';
import { sendToFavorites, deleteFromCart } from '../Redux/cartAction';
import CartItemSkeleton from '../components/CartItemSkeleton';
import favorite from '../assets/icons/favorite-empty.svg';
import deletes from '../assets/icons/delete.svg';




const CartItems = () => {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartResponse = await fetchCart();
        setCartItems(cartResponse);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



  const dispatch = useDispatch();

  const handleAddToFavorites = async (selectedItems) => {
    try {
      await dispatch(sendToFavorites(selectedItems));
      console.log('Item added to Favorites:', selectedItems);

    } catch (error) {
      console.error('Error adding item to Favorites:', error);
    }
  };

  const handleRemoveFromCart = async (selectedItem) => {
    try {
      const selectedItemId = selectedItem.id;
      await dispatch(deleteFromCart(selectedItemId));

      console.log('Item removed from Cart:', selectedItemId);

      const updatedCartItems = cartItems.filter(item => item.id !== selectedItemId);
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error('Error removing item from Cart:', error);
    }
  };

  const handleQuantityChange = (selectedItem, action) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === selectedItem.id) {
        const updatedQuantity = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
        return {
          ...item,
          quantity: Math.max(1, updatedQuantity)

        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };
  return (
    <div className='m-5 colums-4 flex flex-wrap justify-between gap-12'>
      {loading ? (
        <CartItemSkeleton count={9} />) :
        cartItems.length > 0 ? cartItems.map((cartItem) => ((
          <div key={cartItem.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img src={cartItem?.image} alt={cartItem?.name} className="w-full rounded-t-lg" />
            <div className='p-5'>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-whiste">{cartItem?.name}</h5>
              <div className='mb-3 font-normal text-gray-700 dark:text-gray-400'><p className="card-description">{cartItem?.description}</p>
                <div className='flex items-center justify-between mt-4'>
                  <div className="flex items-center">
                    <button onClick={() => handleQuantityChange(cartItem, 'decrease')} className="text-gray-500 focus:outline-none">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="mx-2">{cartItem.quantity}</span>
                    <button onClick={() => handleQuantityChange(cartItem, 'increase')} className="text-gray-500 focus:outline-none">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-600">${cartItem.price * cartItem.quantity}</p>
                </div>
              </div>
              <div className='card-actions justify-end'>
                <button onClick={() => handleAddToFavorites(cartItem)} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">
                  <img src={favorite} alt='svg favorite'></img>
                </button>
                <button onClick={() => handleRemoveFromCart(cartItem)} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg ">
                  <img src={deletes} alt='svg delete'></img>
                </button>
              </div>
            </div>
          </div>
        ))) : (
          <div className="flex items-center justify-center w-full h-screen">
            <p className='ml-20 text-center'>Your Cart is Empty</p>
          </div>
        )}
    </div>

  );
};

export default CartItems;
