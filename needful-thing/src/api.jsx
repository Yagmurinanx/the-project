import axios from "axios";
import store from "./Redux/store";


  export const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:3001/cartItems");
      return response.data; // Veriyi döndür
    } catch (error) {
      console.error('There was a problem fetching cart items:', error);
      throw error; // Hata durumunda hatayı fırlat
    }
  };

  export const fetchFavorites = async () => {
    try {
      const response = await axios.get("http://localhost:3001/favorites");
      return response.data; // Favori öğelerini döndür
    } catch (error) {
      console.error('There was a problem fetching favorite items:', error);
      throw error; // Hata durumunda hatayı fırlat
    }
  };