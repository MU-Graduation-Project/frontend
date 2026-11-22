import { apiSlice } from "./mainApiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    CompleteEventGoerProfile: builder.mutation({
      query: (userData) => ({
        url: "/event-goers/onboard",
        method: "POST",
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
      })
    }),
    GetMyProfile: builder.query({
      query: () => ({
        url: "/event-goers/me",
        method: "GET"
      }),
      providesTags: ["EventGoerProfile"]
    }),
    EditMyProfile: builder.mutation({
      query: (userData) => ({
        url: "/event-goers/me",
        method: "PATCH",
        body: userData
      }),
      invalidatesTags: ["EventGoerProfile"]
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

export const {useCompleteEventGoerProfileMutation,useGetInterestsQuery,useGetMyProfileQuery,useEditMyProfileMutation,useGetMyUserDataQuery,useGetEventsRecommndationsQuery,useGetEventDetailsQuery } =
  authApi;
