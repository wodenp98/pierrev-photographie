import { configureStore } from "@reduxjs/toolkit";
import { boutiqueApi } from "./services/shopApi";
import { carouselApi } from "./services/carouselApi";
import { animalsApi } from "./services/animalsApi";
import { architectureApi } from "./services/architectureApi";
import { modeApi } from "./services/modeApi";
import { natureApi } from "./services/natureApi";
import { sportApi } from "./services/sportApi";
import { stageApi } from "./services/stageApi";
import { userApi } from "./services/usersApi";
import { wishlistApi } from "./services/wishlistApi";
import { cartApi } from "./services/cartApi";

export const store = configureStore({
  reducer: {
    [boutiqueApi.reducerPath]: boutiqueApi.reducer,
    [carouselApi.reducerPath]: carouselApi.reducer,
    [animalsApi.reducerPath]: animalsApi.reducer,
    [architectureApi.reducerPath]: architectureApi.reducer,
    [modeApi.reducerPath]: modeApi.reducer,
    [natureApi.reducerPath]: natureApi.reducer,
    [sportApi.reducerPath]: sportApi.reducer,
    [stageApi.reducerPath]: stageApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      boutiqueApi.middleware,
      carouselApi.middleware,
      animalsApi.middleware,
      architectureApi.middleware,
      modeApi.middleware,
      natureApi.middleware,
      sportApi.middleware,
      stageApi.middleware,
      userApi.middleware,
      wishlistApi.middleware,
      cartApi.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
