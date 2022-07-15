import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import cartItems from "../../cartItems";

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: [],
  amount: 3,
  totel: 0,
  isLoading: true,
};

// fetch the server
export const getCartItem = createAsyncThunk("cart/getCartItem", async (name,thunkAPI) => {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    const message =
    (error.response &&
      error.response.data &&
      error.response.data.message) ||
    error.message ||
    error.toString()
  return thunkAPI.rejectWithValue(message)
  
  
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clerCart: (state, action) => {
      state.cartItems = [];  
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increment: (state, action) => {
      const itemId = action.payload;
      const cartItem = state.cartItems.find((item) => item.id == itemId);
      cartItem.amount++;
    },
    decrement: (state, action) => {
      const itemId = action.payload;
      const cartItem = state.cartItems.find((item) => item.id == itemId);
      cartItem.amount--;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: {
    [getCartItem.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItem.fulfilled]: (state, action) => {
      console.log("This is the fethched data from server", action);
      state.isLoading = false;
      state.cartItems = action.payload.data;
    },
    [getCartItem.rejected]: (state, action) => {
      state.isLoading = false;
      console.log("The axios erorr...",action.payload);
    },
  },
});

export const { clerCart, removeItem, increment, decrement, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
