// import React, { useEffect, useState } from 'react';
// import { fetchCart, fetchFavorites } from '../api';
// import { useDispatch } from 'react-redux';

// const ClothesList = () => {
//     const [cartItems, setCartItems] = useState([]);
//     const [favorites, setFavorites] = useState([]);
//     const [isFavorite, setIsFavorite] = useState(false);
// //sorun burası , bunlar neden bileşik
//    useEffect(() => {
//          const fetchData = async () => {
//           try {
//             const cartResponse = await fetchCart();
//             const favoritesResponse = await fetchFavorites();
//             setCartItems(cartResponse); 
//             setFavorites(favoritesResponse); 
//          } catch (error) {
//             console.error('Error fetching data:', error);
//          }
//     };

//     fetchData();
// }, []);
    

//     const handleAddToCart = (selectedClothes) => {
//         // Sepete ekleme işlemleri burada yapılabilir
//         console.log('Selected Clothes:', selectedClothes);
//     };

//     const handleAddToFavorites = async (selectedClothes) => {
//         try {
//           const isItemInFavorites = favorites.some((favItem) => favItem.id === selectedClothes.id);
      
//           if (isItemInFavorites) {
//             // Favorilerden öğeyi kaldır
//             const updatedFavorites = favorites.filter((favItem) => favItem.id !== selectedClothes.id);
//             setFavorites(updatedFavorites);
//             console.log('Item removed from Favorites:', selectedClothes);
//           } else {
//             // Favorilere öğeyi ekle
//             const updatedFavorites = [...favorites, selectedClothes];
//             setFavorites(updatedFavorites);
//             console.log('Item added to Favorites:', selectedClothes);
//           }
      
//           setIsFavorite(!isItemInFavorites); // Toggle favorite state
//         } catch (error) {
//           console.error('Error updating Favorites:', error);
//         }
//       };
      

//     return (
//         <div>
//         {favorites.length > 0 ? favorites.map((favorites) =>( (
//             <div key={favorites.id} className="card w-96 bg-base-100 shadow-xl">
//                 <img src={favorites?.image} alt={favorites?.name} className="p-8 rounded-t-lg" />
//                 <div className='card-body'>
//                     <p className="card-title">{favorites?.name}</p>
//                     <p className="card-description">{favorites?.description}</p>
//                     <p className="text-gray-600">${favorites?.price}</p>
//                     <div className='card-actions justify-end'>
//                     <button onClick={() => handleAddToCart(cartItems)} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-outline btn-accent">
//                     Add to Cart
//                     </button>
//                         <button
//                             onClick={handleAddToFavorites}
//                             className={`btn ${isFavorite ? 'favorite' : 'not-favorite'}`}
//                         >
//                             {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         ) )): (
//             <p>Favorileriniz Boş</p>
//         )}
//     </div>
//     );
// };

// export default ClothesList;

