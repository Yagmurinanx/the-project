import { configureStore, createSlice, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'; 
import { addToCart } from './action';
import favoriteReducer from '../Features/favoritesSlice';
import productsReducer from '../Features/productSlice'


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
    // clothing: clothingSlice.reducer,
    cart: cartReducer,
    products: productsReducer,
   
  },
  middleware: middleware,
});

export default store;


