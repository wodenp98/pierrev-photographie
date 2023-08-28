import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase/index";

export type HistoryCommandType = {
  id: string;
  nom: string;
  price: number;
  imageUrl: string;
  format: string;
  rendu: string;
  impression: string;
  createdAt: string;
};
export const historyCommandApi = createApi({
  reducerPath: "historyCommandApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getHistoryCommand: builder.query<HistoryCommandType[], string>({
      async queryFn(id: string) {
        try {
          const userHistoryCommandRef = collection(db, "users", id, "history");
          const querySnapshot = await getDocs(userHistoryCommandRef);

          let historyCommand: HistoryCommandType[] = [];
          querySnapshot.forEach((doc) => {
            const historyCommandData = doc.data() as HistoryCommandType;
            const historyCommandWithId = { ...historyCommandData, id: doc.id };
            historyCommand.push(historyCommandWithId);
          });
          return { data: historyCommand };
        } catch (error: any) {
          return { error: error.message };
        }
      },
    }),
  }),
});

export const { useGetHistoryCommandQuery } = historyCommandApi;
