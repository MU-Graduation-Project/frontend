import { apiSlice } from "./mainApiSlice";

export const serviceProviderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Catalog endpoints
    getServiceCategories: builder.query({
      query: () => "/service-categories",
    }),

    getEventTypes: builder.query({
      query: () => "/event-types",
    }),

    // Service Provider self endpoints
    onboardServiceProvider: builder.mutation({
      query: (data) => ({
        url: "/service-providers/onboard",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ServiceProvider", "User"],
    }),

    getMyServiceProviderProfile: builder.query({
      query: () => "/service-providers/me",
      providesTags: ["ServiceProvider"],
    }),

    updateMyServiceProviderProfile: builder.mutation({
      query: (data) => ({
        url: "/service-providers/me",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ServiceProvider"],
    }),

    getPublicServiceProviderById: builder.query({
      query: (id) => `/service-providers/${id}`,
    }),

    // Admin endpoints
    getAdminServiceProviders: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("page", params.page);
        if (params?.limit) queryParams.append("limit", params.limit);
        if (params?.status) queryParams.append("status", params.status);
        if (params?.serviceCategoryId)
          queryParams.append("serviceCategoryId", params.serviceCategoryId);
        if (params?.city) queryParams.append("city", params.city);
        if (params?.sort) queryParams.append("sort", params.sort);
        if (params?.q) queryParams.append("q", params.q);

        const queryString = queryParams.toString();
        return `/admin/service-providers${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["AdminServiceProviders"],
    }),

    approveServiceProvider: builder.mutation({
      query: (id) => ({
        url: `/admin/service-providers/${id}/approve`,
        method: "POST",
      }),
      invalidatesTags: ["AdminServiceProviders", "ServiceProvider"],
    }),

    rejectServiceProvider: builder.mutation({
      query: ({ id, rejectionReason }) => ({
        url: `/admin/service-providers/${id}/reject`,
        method: "POST",
        body: { rejectionReason },
      }),
      invalidatesTags: ["AdminServiceProviders", "ServiceProvider"],
    }),
  }),
});

export const {
  useGetServiceCategoriesQuery,
  useGetEventTypesQuery,
  useOnboardServiceProviderMutation,
  useGetMyServiceProviderProfileQuery,
  useUpdateMyServiceProviderProfileMutation,
  useGetPublicServiceProviderByIdQuery,
  useGetAdminServiceProvidersQuery,
  useApproveServiceProviderMutation,
  useRejectServiceProviderMutation,
} = serviceProviderApi;

export default serviceProviderApi;
