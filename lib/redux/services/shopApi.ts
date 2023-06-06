import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase/index";

type BoutiqueItem = {
  id: string;
  nom: string;
  prix: number;
  description: string;
  imageUrl: string;
};

export const boutiqueApi = createApi({
  reducerPath: "boutiqueApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getBoutiqueItems: builder.query<BoutiqueItem[], void>({
      async queryFn() {
        try {
          const ref = collection(db, "Boutique");
          const querySnapshot = await getDocs(ref);
          let boutiqueItem: BoutiqueItem[] = [];
          querySnapshot?.forEach((doc) => {
            boutiqueItem.push({ id: doc.id, ...doc.data() } as BoutiqueItem);
          });
          return { data: boutiqueItem };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
    }),
  }),
});

export const { useGetBoutiqueItemsQuery } = boutiqueApi;
