import { configureStore, createSlice, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'; 
import { addToCart } from './action';
import favoriteReducer from '../Features/favoritesSlice';
import productsReducer from '../Features/productSlice'
import detailReducer from '../Features/detailSlice';

const initialState = {
  clothingItems: [],
  cartItems: [],
  favorites: [],
  
};


const middleware = [...getDefaultMiddleware(), thunk];
const clothingSlice = createSlice({
  name: 'clothing',
  initialState,
  reducers: {
    addItem(state, action) {
      state.clothingItems.push(action.payload);
    },
    addToFavorites(state, action) {
      state.favorites.push(action.payload);
    },
    removeFromFavorites(state, action) {
      state.favorites = state.favorites.filter(clothes => clothes.id !== action.payload.id);
    },
  },
});

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
    clothing: clothingSlice.reducer,
    cart: cartReducer,
    products: productsReducer,
    details: detailReducer, 
  },
  middleware: middleware,
});

export default store;

export const { addItem, addToFavorites, removeFromFavorites } = clothingSlice.actions;

// const store = configureStore({
//   reducer: {
//     favorites: favoriteReducer,
//     clothing: clothingSlice.reducer,
//     cart: cartReducer,
//     products: productsReducer,
//     details: detailReducer.reducer,
//   },
//   middleware,
// });

