import { configureStore } from "@reduxjs/toolkit";
import { boutiqueApi } from "./services/shopApi";
import { carouselApi } from "./services/carouselApi";

export const store = configureStore({
  reducer: {
    [boutiqueApi.reducerPath]: boutiqueApi.reducer,
    [carouselApi.reducerPath]: carouselApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      boutiqueApi.middleware,
      carouselApi.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
