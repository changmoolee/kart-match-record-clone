import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const matchApi = createApi({
  reducerPath: "match",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://joseph-proxy.herokuapp.com/https://api.nexon.co.kr/kart/v1.0",
    prepareHeaders: (headers) => {
      headers.set("Authorization", process.env.REACT_APP_API_KEY);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMatches: builder.query({
      query: (matchId) => ({
        url: `/matches/${matchId}`,
      }),
    }),
  }),
});

export const {
  // useGetMatchesMutation,
  useGetMatchesQuery,
} = matchApi;
