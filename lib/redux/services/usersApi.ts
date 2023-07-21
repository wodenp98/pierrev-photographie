import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase/index";

type User = {
  id: string;
  email: string;
  emailVerified: boolean | null;
  image: string | null;
  name: string;
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getUserById: builder.query<User, string>({
      async queryFn(id) {
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
              name: userData.name,
            };

            return { data: user };
          } else {
            throw new Error("Utilisateur introuvable.");
          }
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
    }),
  }),
});

export const { useGetUserByIdQuery } = userApi;
