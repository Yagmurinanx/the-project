import axios from "axios";

export const sendToCart = (clothes) => {
  return async (dispatch) => {
    try {
      await axios.post('http://localhost:3001/cartItems', clothes);
      return clothes;
    } catch (error) {
      console.error('There was a problem sending item to cart:', error);
      // Hata durumunda UI'nin ele alması için hatayı yeniden fırlatın
      throw error;
    }
  };
};

export const sendToFavorites = (clothes) => {
  return async (dispatch) => {
    try {
      await axios.post('http://localhost:3001/favorites', clothes);
      // Başarılı olursa, response veya gerekli veriyi döndürün
      return clothes;
    } catch (error) {
      console.error('There was a problem sending item to Favorites:', error);
      throw error;
    }
  };
};

export const deleteFromFavorites = (clothesId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:3001/favorites/${clothesId}`);
      console.log(`Item with ID ${clothesId} deleted from favorites.`);
      // Opsiyonel olarak, başarılı silme işleminden sonra Redux mağazasını güncellemek için bir eylem gönderebilirsiniz.
    } catch (error) {
      console.error('Error deleting item from favorites:', error);
      // Hata durumunda UI'nin ele alması için hatayı yeniden fırlatın
      throw error;
    }
  };
};

export const addToCart = (clothes) => {
  return {
    type: 'cart/addToCart',
    payload: clothes,
  };
};


