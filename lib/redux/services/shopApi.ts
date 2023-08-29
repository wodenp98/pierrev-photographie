import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase/index";

type BoutiqueItem = {
  id: string;
  nom: string;
  prix: number;
  description: string;
  imageUrl: string;
  imagePreview: string;
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
    getBoutiqueItemById: builder.query<BoutiqueItem, string>({
      async queryFn(id: string) {
        try {
          const ref = collection(db, "Boutique");
          const docSnapshot = await getDoc(doc(ref, id));
          if (docSnapshot.exists()) {
            const boutiqueItem = {
              id: docSnapshot.id,
              ...docSnapshot.data(),
            } as BoutiqueItem;
            return { data: boutiqueItem };
          } else {
            throw new Error("Article introuvable");
          }
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
    }),
  }),
});

export const { useGetBoutiqueItemsQuery, useGetBoutiqueItemByIdQuery } =
  boutiqueApi;
