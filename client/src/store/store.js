import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import basket from "./basket";
export const store = configureStore({
  reducer: {
    auth,
    basket,
  },
});
