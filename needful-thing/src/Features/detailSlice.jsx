/////////burayı sillll ama bağlantıları kopar

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductDetail = createAsyncThunk(
  'details/fetchProductDetail',
  async (productId) => {
    try {
      const response = await axios.get(`http://localhost:3001/clothingItems/${productId}`);
      return response.data;
    } catch (error) {
      // throw Error(error.message);
      console.log(error)
    
    }
  }
);

const initialState = {
  productDetail: null,
  isLoading: false,
  error: null,
};

const detailSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    setProductDetail(state, action) {
      state.productDetail = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetail = action.payload;
        state.error = null;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setProductDetail, setLoading, setError } = detailSlice.actions;
export default detailSlice.reducer;

