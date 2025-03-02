import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Skapa en bas-query där vi inkluderar vår API-nyckel
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com",
    prepareHeaders: (headers) => {
      const apiKey = import.meta.env.VITE_API_KEY;
      if (apiKey) {
        headers.set("x-zocom", apiKey);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMenu: builder.query({
      query: () => "/menu",
    }),
    createOrder: builder.mutation({
      query: (tenant, orderData) => ({
        url: `/${tenant}/orders`,
        method: "POST",
        body: orderData,
      }),
    }),
    getOrderById: builder.query({
      query: ({ tenant, orderId }) => `/${tenant}/orders/${orderId}`,
    }),
    getReceipt: builder.query({
      query: (orderId) => `/receipts/${orderId}`,
    }),
  }),
});

export const {
  useGetMenuQuery,
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  useGetReceiptQuery,
} = apiSlice;
