import React, { useEffect, useState, useDispatch } from 'react';
import { fetchCart, fetchFavorites } from '../api';
import axios from 'axios';


//burada kaldım favorilere ekleme 

const CartItems = () => {
 
  const [cartItems, setCartItems] = useState([]);
  const [isCart, setIsCart] = useState(false);
  const [ favorites, setFavorites]= useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartResponse = await fetchCart();
        const favoritesResponse = await fetchFavorites();
        setCartItems(cartResponse); 
        setFavorites(favoritesResponse); 
     } catch (error) {
        console.error('Error fetching data:', error);
     }
    };

    fetchData();
  }, []);

  const handleAddToCart = (selectedClothes) => {
    try {
      const isItemInCart = cartItems.some((cartItem) => cartItem.id === selectedClothes.id);
  
      if (isItemInCart) {
        // Favorilerden öğeyi kaldır
        const updatedCart = cartItems.filter((cartItem) => cartItem.id !== selectedClothes.id);
        setCartItems(updatedCart);
        console.log('Item removed from Cart:', selectedClothes);
      } else {
        // Favorilere öğeyi ekle
        const updatedCart = [...cartItems, selectedClothes];
        setCartItems(updatedCart);
        console.log('Item added to Cart:', selectedClothes);
      }
  
      setIsCart(!isItemInCart); // Toggle favorite state
    } catch (error) {
      console.error('Error updating Cart:', error);
    }
  };

  const handleAddToFavorites = async (selectedClothes) => {
    try {
      const isItemInFavorites = favorites.some((favItem) => favItem.id === selectedClothes.id);
  
      if (isItemInFavorites) {
        // Favoriye eklenmişse, favorilerden kaldır
        const updatedFavorites = favorites.filter((favItem) => favItem.id !== selectedClothes.id);
        setFavorites(updatedFavorites);
        console.log('Item removed from Favorites:', selectedClothes);
      } else {
        // Favoriye eklenmemişse, favorilere ekle
        const updatedFavorites = [...favorites, selectedClothes];
        setFavorites(updatedFavorites);
        console.log('Item added to Favorites:', selectedClothes);
      }
    } catch (error) {
      console.error('Error updating Favorites:', error);
    }
  };
  return (
    <div className='m-5 colums-4 flex flex-wrap justify-between gap-12'>
    {cartItems.length > 0 ? cartItems.map((cartItem) =>( (
        <div key={cartItem.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img src={cartItem?.image} alt={cartItem?.name} className="w-full rounded-t-lg" />
            <div className='p-5'>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{cartItem?.name}</h5>
                <div className='mb-3 font-normal text-gray-700 dark:text-gray-400'><p className="card-description">{cartItem?.description}</p>
                <p className="text-gray-600">${cartItem?.price}</p>
                </div>
                <div className='card-actions justify-end'>
                <button onClick={() => handleAddToCart(cartItem)} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-outline btn-accent">
                Add to Cart
                </button>
                    <button
                        onClick={() => handleAddToFavorites(cartItem)}
                        className={`btn ${isFavorite ? 'favorite' : 'not-favorite'}`}
                    >
                        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>
                </div>
            </div>
        </div>
    ) )): (
        <p>Sepetiniz Boş</p>
    )}
</div>
     
  );
};

export default CartItems;
