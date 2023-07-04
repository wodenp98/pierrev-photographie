import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase/index";

type ArchitectureItem = {
  id: string;
  nom: string;
  imageUrl: string;
};

export const architectureApi = createApi({
  reducerPath: "architectureApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getArchitectureItems: builder.query<ArchitectureItem[], void>({
      async queryFn() {
        try {
          const ref = collection(db, "Architecture");
          const querySnapshot = await getDocs(ref);
          let architectureItem: ArchitectureItem[] = [];
          querySnapshot?.forEach((doc) => {
            architectureItem.push({
              id: doc.id,
              ...doc.data(),
            } as ArchitectureItem);
          });
          return { data: architectureItem };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
    }),
  }),
});

export const { useGetArchitectureItemsQuery } = architectureApi;
