import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase/index";

type PhotographItem = {
  id: string;
  nom: string;
  imageUrl: string;
};

export const photographApi = createApi({
  reducerPath: "photographApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getPhotographItems: builder.query<PhotographItem[], void>({
      async queryFn() {
        try {
          const ref = collection(db, "Photographe");
          const querySnapshot = await getDocs(ref);
          let photographItem: PhotographItem[] = [];
          querySnapshot?.forEach((doc) => {
            photographItem.push({
              id: doc.id,
              ...doc.data(),
            } as PhotographItem);
          });
          return { data: photographItem };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
    }),
  }),
});

export const { useGetPhotographItemsQuery } = photographApi;
