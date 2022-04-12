import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const datasApi = createApi({
  reducerPath: "datasApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://joseph-proxy.herokuapp.com/https://api.nexon.co.kr/kart/v1.0",
    prepareHeaders: (headers) => {
      headers.set("Authorization", process.env.REACT_APP_API_KEY);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getDatas: builder.query({
      query: (nickname) => `/users/nickname/${nickname}`,
    }),
    getMatchDatas: builder.query({
      query: (access_Id) => `/users/${access_Id}/matches?limit=50`,
    }),
    getPlayerDatas: builder.mutation({
      query: (match_Id) => ({
        url: `/matches/${match_Id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetDatasQuery,
  useGetMatchDatasQuery,
  useGetPlayerDatasMutation,
} = datasApi;
