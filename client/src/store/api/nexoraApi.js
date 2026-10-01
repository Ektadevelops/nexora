import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",

  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const nexoraApi = createApi({
  reducerPath: "nexoraApi",

  baseQuery,

  tagTypes: ["Dataset", "User", "Report"],

  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => "/auth/me",
    }),
  }),
});

export const { useGetMeQuery } = nexoraApi;
