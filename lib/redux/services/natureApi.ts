import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase/index";

type NatureItem = {
  id: string;
  nom: string;
  imageUrl: string;
};

export const natureApi = createApi({
  reducerPath: "natureApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getNatureItems: builder.query<NatureItem[], void>({
      async queryFn() {
        try {
          const ref = collection(db, "Nature");
          const querySnapshot = await getDocs(ref);
          let natureItem: NatureItem[] = [];
          querySnapshot?.forEach((doc) => {
            natureItem.push({ id: doc.id, ...doc.data() } as NatureItem);
          });
          return { data: natureItem };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
    }),
  }),
});

export const { useGetNatureItemsQuery } = natureApi;
