import { configureStore } from '@reduxjs/toolkit';
import favoriteReducer from './favoritesSlice';
import productsReducer from './productSlice';

const store = configureStore({
  reducer: {
    favorites: favoriteReducer,
    products: productsReducer,
  },
});

export default store;


