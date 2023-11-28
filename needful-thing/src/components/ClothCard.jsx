import React from 'react';
import { useDispatch } from 'react-redux';
import { sendToFavorites, sendToCart } from '../Redux/action';
import { useState } from 'react';

const ClothesDetail = ({ clothes }) => {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = async (clothes) => {
    try {
      await dispatch(sendToCart(clothes));
    } catch (error) {
      console.error('There was a problem sending item to cart:', error);
    }
  };

  const handleAddToFavorites = async (clothes) => {
    setIsFavorite(!isFavorite);
    try {
      await dispatch(sendToFavorites(clothes));
    } catch (error) {
      console.error('There was a problem sending item to favorites:', error);
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <img src={clothes.image} alt={clothes.name} className="p-8 rounded-t-lg" />
      <div className='card-body'>
        <p className="card-title">{clothes.name}</p>
        <p className="card-description">{clothes.description}</p>
        <p className="text-gray-600">${clothes.price}</p>
        <div className='card-actions justify-end'>
          <button onClick={() => handleAddToCart(clothes)} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-outline btn-accent">
            Add to Cart
          </button>
          <button
          onClick={() => handleAddToFavorites(clothes)}
          className={`btn ${isFavorite ? 'favorite' : 'not-favorite'}`}
>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClothesDetail;
