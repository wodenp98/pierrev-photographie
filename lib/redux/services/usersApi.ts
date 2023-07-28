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
  name: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getUserById: builder.query<User, string>({
      async queryFn(id: string) {
        // const q = query(collection(db, "accounts"), where("userId", "==", id));
        // getDocs(q).then((snapshot) => {
        //   console.log(snapshot.docs[0].data());
        // });

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
          return { error: error.message };
        }
      },
    }),
    deleteUserById: builder.mutation({
      async queryFn(id) {
        try {
          const userRef = doc(db, "users", id);
          await deleteDoc(userRef);
          return { data: "ok" };
        } catch (err: any) {
          return { error: err.message };
        }
      },
    }),
  }),
});

export const { useGetUserByIdQuery, useDeleteUserByIdMutation } = userApi;
