import { apiSlice } from "./mainApiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    CompleteEventGoerProfile: builder.mutation({
      query: (userData) => ({
        url: "/users/me",
        method: "PATCH",
        body: userData
      })
    }),
    GetInterests: builder.query({
      query: ({ q, page = 1, limit = 10 }) => ({
        url: "/interests",
        method: "GET",
        params: { q, page, limit }
      })
    }),
    GetMyUserData: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET"
      }),
      providesTags: ["UserProfile"]
    }),
    EditMyProfile: builder.mutation({
      query: (userData) => ({
        url: "/users/me",
        method: "PATCH",
        body: userData
      }),
      invalidatesTags: ["UserProfile"]
    }),
    GetEventsRecommndations: builder.query({
      query: () => ({
        url: "/events/for-you",
        method: "GET"
      })
    }),
    GetEventDetails: builder.query({
      query: (id) => ({
        url: `/events/${id}`,
        method: "GET"
      })
    })
  })
});

export const {useCompleteEventGoerProfileMutation,useGetInterestsQuery,useGetMyUserDataQuery,useEditMyProfileMutation,useGetEventsRecommndationsQuery,useGetEventDetailsQuery } =
  userApi;
