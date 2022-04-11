import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { matchApi } from "../services/match";
import { userApi } from "../services/user";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [matchApi.reducerPath]: matchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware).concat(matchApi.middleware),
});

setupListeners(store.dispatch);
