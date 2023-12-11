import axios from "axios";



  export const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:3001/cartItems");
      return response.data; 
    } catch (error) {
      console.error('There was a problem fetching cart items:', error);
      throw error; 
    }
  };

  export const fetchFavorites = async () => {
    try {
      const response = await axios.get("http://localhost:3001/favorites");
      return response.data;
    } catch (error) {
      console.error('There was a problem fetching favorite items:', error);
      throw error; 
    }
  };