import { apiSlice } from "./mainApiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData
      })
    }),

    login: builder.mutation({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData
      })
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST"
      })
    }),
    checkAuth: builder.query({
      query: () => ({
        url: "/auth/refresh",
        method: "POST"
      })
    })
  })
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation,useCheckAuthQuery } =
  authApi;
