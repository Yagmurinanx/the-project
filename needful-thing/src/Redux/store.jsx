import { configureStore, createSlice, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'; 
import { addToCart } from './cartAction';
import favoriteReducer from './favoritesSlice';
import productsReducer from './productSlice'


const initialState = {
  clothingItems: [],
  cartItems: [],
  favorites: [],
  
};


const middleware = [...getDefaultMiddleware(), thunk];


export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case addToCart.type:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: {
    favorites: favoriteReducer,
    cart: cartReducer,
    products: productsReducer,
   
  },
  middleware: middleware,
});

export default store;


