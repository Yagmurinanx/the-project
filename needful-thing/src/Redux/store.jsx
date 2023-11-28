import { configureStore, createSlice } from '@reduxjs/toolkit';
import { addToCart } from './action';

const initialState = {
  clothingItems: [],
  cartItems: [],
  favorites: [],
};

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

export const { addItem, addToFavorites } = clothingSlice.actions;

export default configureStore({
  reducer: {
    clothing: clothingSlice.reducer,
    cart: cartReducer,
  },
});
