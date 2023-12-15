import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites, addFavoriteAsync, removeFavoriteAsync ,addToCartAsync } from '../Redux/favoritesSlice';
import CartItemSkeleton from '../components/CartItemSkeleton';
import heartBroken from '../assets/icons/heart_broken.svg'
import favoriteIcon from '../assets/icons/favorite-empty.svg';
import cartIcon from '../assets/icons/cart.svg'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    dispatch(fetchFavorites()).then(()=>{
      setLoading(false);
    });
  }, [dispatch]);

  const handleAddToFavorites = (favorites) => {
    if (isFavorite(favorites)) {
      dispatch(removeFavoriteAsync(favorites.id));
      toast('Product removed from favorites :(', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      dispatch(addFavoriteAsync(favorites));
    }
  };

  const isFavorite = (item) => {
    return favorites.some((favorite) => favorite.id === item.id);
  };


  const handleAddToCart = (favorite) => {
    dispatch(addToCartAsync(favorite));
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

  return (
  
    <div className="flex flex-wrap justify-center gap-4 mt-5 mb-5">
    {loading ? (
         <CartItemSkeleton count={9} /> ) :
      favorites.length > 0 ? (
      favorites.map((favorite) => (
        <div key={favorite.id} className="card w-96 bg-base-100 shadow-xl">
          <img src={favorite?.image} alt={favorite?.name} className="p-8 rounded-t-lg" />
          <div className="card-body">
            <p className="card-title">{favorite?.name}</p>
            <p className="card-description">{favorite?.description}</p>
            <p className="text-gray-600">${favorite?.price}</p>
            <div className="card-actions justify-end">
            
              <button
                onClick={() => handleAddToFavorites(favorite)}
                className={`btn ${isFavorite(favorite) ? 'favorite' : 'not-favorite'}`}
              >
                {isFavorite(favorite) ?  <img src={heartBroken} alt='svg favorite delete'/>:  <img src={favoriteIcon} alt='svg favorite'/>}
              </button>

              <button
                  onClick={() => handleAddToCart(favorite)} 
                  className="btn"
                >
                   <img src={cartIcon} alt='svg cart'/>
                </button>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="flex items-center justify-center h-screen">
      <p className='text-center '>Your favorites are empty</p>
      </div>
    )}
  </div>
);
};

export default FavoritesPage;



