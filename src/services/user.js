import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const VALID_CACHE_TIME = 300;
// 변하지 않는 데이터이고 개별 데이터이기 때문에 캐시 보관 시간이 상대적으로 길어도 상관 없다.
const dataLimit = 300;

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
  keepUnusedDataFor: VALID_CACHE_TIME,
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (nickname) => `/users/nickname/${nickname}`,
    }),
    getMatchlist: builder.query({
      query: (accessId) => `/users/${accessId}/matches?limit=${dataLimit}`,
    }),
  }),
});

export const { useGetUserQuery, useGetMatchlistQuery } = userApi;
