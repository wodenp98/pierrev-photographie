import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase/index";

type AnimalsItem = {
  id: string;
  nom: string;
  imageUrl: string;
};

export const animalsApi = createApi({
  reducerPath: "animalsApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getAnimalsItems: builder.query<AnimalsItem[], void>({
      async queryFn() {
        try {
          const ref = collection(db, "Animaux");
          const querySnapshot = await getDocs(ref);
          let animalsItem: AnimalsItem[] = [];
          querySnapshot?.forEach((doc) => {
            animalsItem.push({ id: doc.id, ...doc.data() } as AnimalsItem);
          });
          return { data: animalsItem };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
    }),
  }),
});

export const { useGetAnimalsItemsQuery } = animalsApi;
