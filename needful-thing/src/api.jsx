import axios from "axios";
import store from "./Redux/store";
import { addItem } from "./Redux/store";

export const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/clothingItems");
      store.dispatch(addItem(response.data));
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

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