import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basket: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    getUserBasket: (state, action) => {
      state.basket = action.payload;
    },
    logoutBasket: (state) => {
      state.basket = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { getUserBasket, logoutBasket } = basketSlice.actions;

export default basketSlice.reducer;
