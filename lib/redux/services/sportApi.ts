import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase/index";

type SportItem = {
  id: string;
  nom: string;
  imageUrl: string;
};

export const sportApi = createApi({
  reducerPath: "sportApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getSportItems: builder.query<SportItem[], void>({
      async queryFn() {
        try {
          const ref = collection(db, "Sport");
          const querySnapshot = await getDocs(ref);
          let sportItem: SportItem[] = [];
          querySnapshot?.forEach((doc) => {
            sportItem.push({ id: doc.id, ...doc.data() } as SportItem);
          });
          return { data: sportItem };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
    }),
  }),
});

export const { useGetSportItemsQuery } = sportApi;
