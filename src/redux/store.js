import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { datasApi } from "../services/api";

export const store = configureStore({
  reducer: {
    [datasApi.reducerPath]: datasApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(datasApi.middleware),
});

setupListeners(store.dispatch);
