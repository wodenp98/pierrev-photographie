import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase/index";

type CarouselItem = {
  id: string;
  nom: string;
  imageUrl: string;
};

export const carouselApi = createApi({
  reducerPath: "carouselApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getCarouselItems: builder.query<CarouselItem[], void>({
      async queryFn() {
        try {
          const ref = collection(db, "Carousel");
          const querySnapshot = await getDocs(ref);
          let carouselItem: CarouselItem[] = [];
          querySnapshot?.forEach((doc) => {
            carouselItem.push({ id: doc.id, ...doc.data() } as CarouselItem);
          });
          return { data: carouselItem };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
    }),
  }),
});

export const { useGetCarouselItemsQuery } = carouselApi;
