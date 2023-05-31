import { configureStore } from "@reduxjs/toolkit";
import { boutiqueApi } from "./services/shopApi";

export const store = configureStore({
  reducer: {
    [boutiqueApi.reducerPath]: boutiqueApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(boutiqueApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
