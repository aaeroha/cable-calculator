import { configureStore } from "@reduxjs/toolkit";
import calcSlice from "./calc.slice";

const store = configureStore({
  reducer: {
    calcSlice,
  },
});

export default store;
