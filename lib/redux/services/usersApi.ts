import {
  createApi,
  fakeBaseQuery,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase/index";

interface User {
  id: string;
  email: string;
  emailVerified: boolean | null;
  image: string | null;
  firstName: string;
  lastName: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getUserById: builder.query<User, string>({
      async queryFn(id: string) {
        try {
          const userRef = doc(db, "users", id);
          const userSnapshot = await getDoc(userRef);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            const user: User = {
              id: id,
              email: userData.email,
              emailVerified: userData.emailVerified,
              image: userData.image,
              firstName: userData.firstName,
              lastName: userData.lastName,
            };

            return { data: user };
          } else {
            throw new Error("Utilisateur introuvable.");
          }
        } catch (error: any) {
          return { error: error.message };
        }
      },
    }),
  }),
});

export const { useGetUserByIdQuery } = userApi;
