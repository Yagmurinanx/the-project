import { configureStore, createSlice } from '@reduxjs/toolkit';
import { clothingReducer } from './clothingSlice';

const initialState = {
  clothingItems: [],
  chartItems: [],
};

const clothingSlice = createSlice({
  name: 'clothing',
  initialState,
  reducers: {
    setClothingItems(state, action) {
      state.clothingItems = action.payload;
    },
    setChartItems(state, action) { 
      state.chartItems = action.payload;
    },
  },
});


const store = configureStore({
  reducer: {
    clothing: clothingSlice.reducer, 
  },
});


export const { setClothingItems, setChartItems } = clothingSlice.actions;

export default store;
