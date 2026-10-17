import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./store/authSlice";
import { apiSlice } from "./store/mainApiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});

export default store;
