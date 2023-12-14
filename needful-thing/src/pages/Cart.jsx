import React, { useEffect, useState } from 'react'; 
import Cart from '../components/Cart';
import { fetchCart } from '../Redux/cartAction';


const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const fetchedCartItems = await fetchCart();
        setCartItems(fetchedCartItems);
        
      
        const total = fetchedCartItems.reduce((acc, item) => {
          return acc + (item.price * item.quantity);
        }, 0);
        setTotalPrice(total);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    }

    fetchCartItems();
  }, []);



  return (
    <div className='relative'>
    <h1 className="text-center text-2xl font-bold mb-4 mt-4">CART</h1> 
    <div className="flex justify-center">
      <Cart />
    </div>
    <div className="flex justify-center mt-4  rounded-lg p-4">
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-lg font-semibold">Total Price: ${totalPrice} <button className="btn btn-outline btn-info">Order Now</button>
        </p>
        
      </div>
    </div>
    <div className='h-screen'/>
  </div>
  );
};

export default CartPage;
