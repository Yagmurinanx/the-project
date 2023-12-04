// import axios from 'axios';

// const BASE_URL = 'http://localhost:3001'; // API'nizin temel URL'i


// export const fetchClothingItems = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/clothingItems`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching clothing items:', error);
//     throw error;
//   }
// };

// export const addToCart = async (item) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/cartItems`, item);
//     return response.data;
//   } catch (error) {
//     console.error('Error adding item to cart:', error);
//     throw error;
//   }
// };

// export const addToFavorites = async (item) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/favorites`, item);
//     return response.data;
//   } catch (error) {
//     console.error('Error adding item to favorites:', error);
//     throw error;
//   }
// };

// Diğer API isteklerini burada tanımlayabilirsiniz