import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1",
    credentials: "include",
    prepareHeaders: (headers, { getState, endpoint }) => {
      const { accessToken, refreshToken } = getState().auth;

      const token = endpoint === "checkAuth" ? refreshToken : accessToken;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    }
  }),

  tagTypes: ["User"],

  endpoints: () => ({})
});
