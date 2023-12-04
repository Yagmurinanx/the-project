import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFavorites = createAsyncThunk('favorite/fetchFavorites', async () => {
  const response = await axios.get('http://localhost:3001/favorites');
  return response.data;
});

export const addToCartAsync = createAsyncThunk('cart/addToCart', async (favorite, { getState }) => {
  const state = getState();
  const { favorites, cartItems } = state.favorites;

  const isItemInCart = cartItems.some(item => item.id === favorite.id);
  
  if (!isItemInCart) {
    // Cart'ta olmayan bir favori ürünü ekleyin
    const response = await axios.post('http://localhost:3001/cartItems', favorite); // favorite yerine favorite'nin tamamını geçin
    return response.data;
  } else {
    console.log('Bu öğe zaten cartItems içinde bulunuyor.');
    return null; // Eğer öğe zaten cartItems içinde bulunuyorsa, null dönebiliriz veya istediğiniz bir değeri dönebilirsiniz.
  }
});

export const addFavoriteAsync = createAsyncThunk('favorite/addFavorite', async (favorite) => {
  const response = await axios.post('http://localhost:3001/favorites', favorite);
  return response.data;
});

export const removeFavoriteAsync = createAsyncThunk(
  'favorite/remove',
  async (favoriteId) => {
    await axios.delete(`http://localhost:3001/favorites/${favoriteId}`);
    return favoriteId;
  }
);

export const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
    cartItems: [], // cartItems dizisini ekleyin
    isLoading: false,
    error: null,
  },
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (favorite) => favorite.id !== action.payload
      );
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload;
        state.error = null;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addFavoriteAsync.fulfilled, (state, action) => {
        state.favorites.push(action.payload);
      })
      .addCase(removeFavoriteAsync.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(
          (favorite) => favorite.id !== action.payload
        );
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        const newItem = action.payload;
        const isItemInCart = state.cartItems.find(item => item.id === newItem.id);
        if (!isItemInCart) {
          state.cartItems.push(newItem);
        } else {
          console.log('Bu öğe zaten cartItems içinde bulunuyor.');
        }
      });
  },
});

export const { setFavorites, addFavorite, removeFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
///neden sadece id olarak ekliyor burada kaldım