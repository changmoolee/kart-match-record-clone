import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const VALID_CACHE_TIME = 10;
/*
매치 데이터를 자주 확인 하는 유저라면,
매치 게임 하나가 끝나고 바로 전적 데이터를 확인하는 상황도 많을 것으로 예상.
또한, 다른 유저가 게임이 막 끝난 해당 유저의 매치 기록을 확인하는 상황도 있을 것.
유저의 불편함이 없도록 캐시 유효기간을 짧게 가져 전적 갱신이 빠르게 가능해야 한다. 
*/

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
  keepUnusedDataFor: VALID_CACHE_TIME,
  endpoints: (builder) => ({
    getMatch: builder.query({
      query: (matchId) => `/matches/${matchId}`,
    }),
  }),
});

export const { useGetMatchQuery } = matchApi;
