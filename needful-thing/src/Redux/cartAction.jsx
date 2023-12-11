import axios from "axios";

export const sendToFavorites = (items) => {
  return async (dispatch) => {
    try {
      await axios.post('http://localhost:3001/favorites', items);
      
      return items;
    } catch (error) {
      console.error('There was a problem sending item to Favorites:', error);
      throw error;
    }
  };
};

export const deleteFromCart = (selectedItemId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:3001/cartItems/${selectedItemId}`);
      console.log(`Item with ID ${selectedItemId} deleted from cart.`);
    
    } catch (error) {
      console.error('Error deleting item from cart:', error);
     
      throw error;
    }
  };
};


export const addToCart = (cartItems) => {
  return {
    type: 'cart/addToCart',
    payload: cartItems,
  };
};


