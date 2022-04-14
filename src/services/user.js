import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://joseph-proxy.herokuapp.com/https://api.nexon.co.kr/kart/v1.0",
    prepareHeaders: (headers) => {
      headers.set("Authorization", process.env.REACT_APP_API_KEY);
      return headers;
    },
  }),
  keepUnusedDataFor: 60,
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (nickname) => `/users/nickname/${nickname}`,
    }),
    getMatchlist: builder.query({
      query: (accessId) => `/users/${accessId}/matches?limit=100`,
    }),
  }),
});

export const { useGetUserQuery, useGetMatchlistQuery } = userApi;
