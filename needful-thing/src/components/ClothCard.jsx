import React from 'react';
import { useDispatch } from 'react-redux';
import { sendToFavorites, sendToCart } from '../Redux/action';
import { useState } from 'react';

const ClothesDetail = ({ clothes }) => {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCart, setIsCart] = useState(false);

  const handleAddToCart = async (selectedClothes) => {
    try {
      if(isCart){
        await dispatch(sendToCart(selectedClothes,'remove'));
        console.log('Item removed from Cart:', selectedClothes);
        setIsCart(false);
      } else {
        await dispatch(sendToCart(selectedClothes,'add'));
        console.log('Item addet to Cart');
        setIsCart(true);
      }
    } catch (error) {
      console.error('There was a problem sending item to cart', error);
    }
  };

  const handleAddToFavorites = async (selectedClothes) => {
    try {
      if (isFavorite) {
        await dispatch(sendToFavorites(selectedClothes, 'remove'));
        console.log('Item removed from Favorites:', selectedClothes);
        // Favoriden kaldırıldığında setIsFavorite(false) ile favori durumunu güncelle
        setIsFavorite(false);
      } else {
        await dispatch(sendToFavorites(selectedClothes, 'add'));
        console.log('Item added to Favorites:', selectedClothes);
        // Favoriye eklendiğinde setIsFavorite(true) ile favori durumunu güncelle
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('There was a problem sending item to favorites:', error);
    }
  };
  return (
    <div key={clothes.id} className="card w-96 bg-base-100 shadow-xl flex">
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


// const handleAddToCart = async (selectedClothes) => {
//   try {
//     await dispatch(sendToCart(selectedClothes));
//     console.log('Item added to Cart:', selectedClothes);
//   } catch (error) {
//     console.error('There was a problem sending item to cart:', error);
//   }
// };