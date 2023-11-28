import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClothesList from './ClothesList';


const CartItems = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:3001/cartItems");
        setCartItems(response.data);
      } catch (error) {
        console.error('There was a problem fetching cart items:', error);
      }
    };

    fetchCart();
  }, []);

  return (
   <ClothesList/>
  );
};

export default CartItems;