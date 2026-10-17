import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  refreshToken: null
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.refreshToken = action.payload.refreshToken;
      state.accessToken = action.payload.accessToken;
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.refreshToken = null;

    }
  }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
