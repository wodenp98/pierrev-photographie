import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase/index";

type ModeItem = {
  id: string;
  nom: string;
  imageUrl: string;
};

export const modeApi = createApi({
  reducerPath: "modeApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getModeItems: builder.query<ModeItem[], void>({
      async queryFn() {
        try {
          const ref = collection(db, "Mode");
          const querySnapshot = await getDocs(ref);
          let modeItem: ModeItem[] = [];
          querySnapshot?.forEach((doc) => {
            modeItem.push({ id: doc.id, ...doc.data() } as ModeItem);
          });
          return { data: modeItem };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
    }),
  }),
});

export const { useGetModeItemsQuery } = modeApi;
