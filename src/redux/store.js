import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { userApi } from "../services/user";
import { matchApi } from "../services/match";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [matchApi.reducerPath]: matchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(matchApi.middleware),
});

setupListeners(store.dispatch);
