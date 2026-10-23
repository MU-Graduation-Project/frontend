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
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data
      })
    }),
    resendVerification: builder.mutation({
      query: (data) => ({
        url: "/auth/resend-verification",
        method: "POST",
        body: data
      })
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data
      })
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data
      })
    }),
    ChangePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data
      })
    })
  })
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useCheckAuthQuery, useVerifyEmailMutation, useResendVerificationMutation
  ,useForgotPasswordMutation,useResetPasswordMutation,useChangePasswordMutation
 } =
  authApi;
