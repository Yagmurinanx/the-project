import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites, addFavoriteAsync, removeFavoriteAsync ,addToCartAsync } from '../Features/favoritesSlice';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const handleAddToFavorites = (favorites) => {
    if (isFavorite(favorites)) {
      dispatch(removeFavoriteAsync(favorites.id));
    } else {
      dispatch(addFavoriteAsync(favorites));
    }
  };

  const isFavorite = (item) => {
    return favorites.some((favorite) => favorite.id === item.id);
  };

  const handleRemoveFavorite = (favoriteId) => {
    dispatch(removeFavoriteAsync(favoriteId));
  };

  const handleAddToCart = (favorite) => {
    dispatch(addToCartAsync(favorite)); // addToCartAsync'i tetikleyen işlev
  };

  return (
  
    <div className="flex flex-wrap justify-center gap-4">
    {favorites.length > 0 ? (
      favorites.map((favorite) => (
        <div key={favorite.id} className="card w-96 bg-base-100 shadow-xl">
          <img src={favorite?.image} alt={favorite?.name} className="p-8 rounded-t-lg" />
          <div className="card-body">
            <p className="card-title">{favorite?.name}</p>
            <p className="card-description">{favorite?.description}</p>
            <p className="text-gray-600">${favorite?.price}</p>
            <div className="card-actions justify-end">
            <button
                  onClick={() => handleAddToCart(favorite)} // Add to Cart butonuna addToCartAsync'i tetikleyen işlevi ekledik
                  className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-outline btn-accent"
                >
                  Add to Cart
                </button>
              <button
                onClick={() => handleAddToFavorites(favorite)}
                className={`btn ${isFavorite(favorite) ? 'favorite' : 'not-favorite'}`}
              >
                {isFavorite(favorite) ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p>Favorileriniz Boş</p>
    )}
  </div>
);
};

export default FavoritesPage;



