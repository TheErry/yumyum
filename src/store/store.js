import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import orderReducer from "./orderSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
