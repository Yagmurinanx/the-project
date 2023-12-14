import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendToFavorites, deleteFromCart, fetchCart, updateCartItem} from '../Redux/cartAction';
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

//yenilenmeden

 const handleQuantityChange = async (selectedItem, action) => {
  const updatedCartItems = cartItems.map(item => {
    if (item.id === selectedItem.id) {
      const updatedQuantity = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
      const updatedItem = {
        ...item,
        quantity: Math.max(1, updatedQuantity)
      };

     
      const updatedDataForAPI = {
        id: selectedItem.id,
        name: selectedItem.name,
        price: selectedItem.price,
        quantity: updatedItem.quantity
      };

    
      updateCartItem(selectedItem.id, updatedDataForAPI)
        .then(response => {
          console.log(`Item ${selectedItem.name} price updated `);
        })
        .catch(error => {
          console.error('There was a problem updating item in cart:', error);
        });

      return updatedItem;
    }
    return item;
  });
  setCartItems(updatedCartItems);
};
  return (
    <div >
    {loading ? (
      <CartItemSkeleton count={9} />
    ) : cartItems.length > 0 ? (
      cartItems.map((cartItem) => (
        <div key={cartItem.id} className="mt-5 mr-5 ml-5 w-full flex items-center space-x-4 bg-white shadow-md rounded-lg p-4">
          <img src={cartItem?.image} alt={cartItem?.name} className="w-20 h-20 object-cover rounded-lg" />
           <h5 className="text-lg font-semibold">{cartItem?.name}</h5>
            {/* <p className="text-sm text-gray-600">{cartItem?.description}</p> */}
            <div className='flex items-center justify-between mt-2'>
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
              <p className="text-gray-600 font-semibold">${cartItem.price * cartItem.quantity}</p>
            </div>
            <div className='flex justify-end mt-2'>
              <button onClick={() => handleAddToFavorites(cartItem)} className="btn">
                <img src={favorite} alt='svg favorite'></img>
              </button>
              <button onClick={() => handleRemoveFromCart(cartItem)} className="btn ml-2">
                <img src={deletes} alt='svg delete'></img>
              </button>
            </div>
          </div>
        
      ))
    ) : (
      <div className="flex items-center justify-center w-full">
        <p className='text-center'></p>
      </div>
    )}
  </div>
  

  );
};

export default CartItems;
