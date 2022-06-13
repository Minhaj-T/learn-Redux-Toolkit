import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./featurs/cart/cartSlice";
import modelSlice from "./featurs/model/modelslice";
export const store=configureStore({
    reducer:{
        cart:cartReducer,
        modal:modelSlice
    }
});