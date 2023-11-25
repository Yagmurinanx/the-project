import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  clothingItems: [],
  favorites: [],
  cartItems: [],
  chartItems:[],
};

const clothingSlice = createSlice({
  name: 'clothing',
  initialState,
  reducers: {
    setClothingItems(state, action) {
      state.clothingItems = action.payload;
    },
    addToCart(state, action) {
      const newItem = action.payload;
      state.cartItems.push(newItem);
    },
    setChartItems(state, action) {
      state.chartItems = action.payload;
    },
  },
});

export const {
  setClothingItems,
  addToCart,
  setChartItems,
} = clothingSlice.actions;

export const fetchClothingData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3001/clothingItems');
      dispatch(setClothingItems(response.data));
    } catch (error) {
      console.error('There was a problem fetching the data:', error);
    }
  };
};

export const sendToChart = (item) => {
  return async (dispatch) => {
    try {
      await axios.post('http://localhost:3001/chartItems', item);
      dispatch(addToCart(item)); // addToChart eyleminiz implemente edildiğinden emin olun
    } catch (error) {
      console.error('There was a problem sending item to chart:', error);
    }
  };
};

export const clothingReducer = clothingSlice.reducer;








