import { createAction } from "@reduxjs/toolkit";
import axios from "axios";

export const sendToCart = (clothes) => {
    return async (dispatch) => {
      try {
        await axios.post('http://localhost:3001/cartItems', clothes);
        dispatch(addToCart(clothes)); // Parantez hatasını düzeltin
      } catch (error) {
        console.error('There was a problem sending item to cart:', error);
      }
    };
  };

  export const sendToFavorites = (clothes) => {
    return async (dispatch) => {
      try {
        await axios.post('http://localhost:3001/favorites', clothes);
        dispatch(addToCart(clothes)); // Parantez hatasını düzeltin
      } catch (error) {
        console.error('There was a problem sending item to cart:', error);
      }
    };
  };

export const addToCart = createAction('cart/addToCart');

