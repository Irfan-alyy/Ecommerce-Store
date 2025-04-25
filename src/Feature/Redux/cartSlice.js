import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  items:[]
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      
      let include = false;
      state.items.forEach((element, index) => {
        if (element.variant.id===action.payload.variant.id) {
          include = true;
          const item = action.payload;
          const quantity = element.quantity;
          item.quantity = quantity + 1;
          state.items[index] = item;
          return;
        }
      });
      if (!include) {
        state.items.push(action.payload);
        console.log(state.items)
      }
    },
    removeItem: (state, action) => {
      console.log(action.payload,"payload");
      state.items = state.items.filter((elem) =>elem.variant.id!=action.payload.variant.id);
      console.log(state.items,"itemss")
      if (state.items.length === 0) state.totalPrice = 0;
    },
    handleIncrement: (state, action) => {
      const index = action.payload;
      state.items[index].quantity += 1;
    },
    handleDecrement: (state, action) => {
      const index = action.payload;
      if (state.items[index].quantity == 1) {
        state.items = state.items.filter((_, ind) => ind !== index);
        return;
      }
      state.items[index].quantity -= 1;
      state.totalPrice -= state.items[index].price;
      if (state.items.length == 0) state.totalPrice = 0;
    },
    clearCart:(state)=>{
      state.items=[];
    }
  },
});

export const { addToCart, removeItem, handleIncrement, handleDecrement, clearCart } =
  counterSlice.actions;

export default counterSlice.reducer;
