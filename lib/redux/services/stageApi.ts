import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase/index";

type StageItem = {
  id: string;
  nom: string;
  imageUrl: string;
};

export const stageApi = createApi({
  reducerPath: "stageApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getStageItems: builder.query<StageItem[], void>({
      async queryFn() {
        try {
          const ref = collection(db, "Stage");
          const querySnapshot = await getDocs(ref);
          let stageItem: StageItem[] = [];
          querySnapshot?.forEach((doc) => {
            stageItem.push({ id: doc.id, ...doc.data() } as StageItem);
          });
          return { data: stageItem };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
    }),
  }),
});

export const { useGetStageItemsQuery } = stageApi;
