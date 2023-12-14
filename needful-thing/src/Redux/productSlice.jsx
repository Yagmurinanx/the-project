import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  try {
    const response = await axios.get('http://localhost:3001/Items');
    return response.data;
  } catch (error) {
    throw Error(error.message);
  }
});

export const addToCartAsync = createAsyncThunk('cart/addToCart', async (selectedProducts, { getState }) => {
  try {
    const state = getState();
    const { cartItems } = state.products;

    const isItemInCart = cartItems.some(item => item.id === selectedProducts.id);
  
    if (!isItemInCart) {
      const response = await axios.post('http://localhost:3001/cartItems', selectedProducts);
      return response.data;
    } else {
      console.log('This item is already in cartItems.');
      return null;
    }
  } catch (error) {
    throw Error(error.message);
  }
});

export const addToFavoritesAsync = createAsyncThunk('favorites/addToFavorites', async (selectedProducts, { getState }) => {
  try {
    const state = getState();
    const { favoritesItems } = state.products;

    const isItemInFavorites = favoritesItems.some(item => item.id === selectedProducts.id);
  
    if (!isItemInFavorites) {
      const response = await axios.post('http://localhost:3001/favorites', selectedProducts);
      return response.data;
    } else {
      console.log('This item is already in favoritesItems.');
      return null;
    }
  } catch (error) {
    throw Error(error.message);
  }
});

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    favoritesItems: [],
    cartItems: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        const newItem = action.payload;
        if (newItem && newItem.id) {
          const isItemInCart = state.cartItems.find(item => item.id === newItem.id);
          if (!isItemInCart) {
            state.cartItems.push(newItem);
          } else {
            console.log('This item is already in cartItems.');
          }
        } else {
          console.error('Invalid or missing id in the newItem:', newItem);
        }
      })
      .addCase(addToFavoritesAsync.fulfilled, (state, action) => {
        const newItem = action.payload;
        const isItemInFavorites = state.favoritesItems.some(item => item.id === newItem.id);
        if (!isItemInFavorites) {
          state.favoritesItems.push(newItem);
        } else {
          console.log('This item is already in favoritesItems.');
        }
      })
      
  },
});

export const { setLoading, setError } = productSlice.actions;

export default productSlice.reducer;
