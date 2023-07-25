import {
  createApi,
  fakeBaseQuery,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
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
      async query({ id }) {
        try {
          const userRef = doc(db, "users", id);
          await deleteDoc(userRef);
        } catch (error: any) {
          return { error: error.message };
        }
      },
    }),
  }),
});

export const { useGetUserByIdQuery, useDeleteUserByIdMutation } = userApi;

// src/features/scores/scoresSlice.ts
// import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
// import {
//   arrayUnion,
//   collection,
//   doc,
//   updateDoc,
//   getDocs,
// } from "firebase/firestore";
// import { firestore } from "../../firebase";
// import { ScoresTable, ScoresTables } from "../../types";

// export const firestoreApi = createApi({
//   baseQuery: fakeBaseQuery(),
//   tagTypes: ["Score"],
//   endpoints: (builder) => ({
//     fetchHighScoresTables: builder.query<ScoresTables, void>({
//       async queryFn() {
//         try {
//           const ref = collection(firestore, "scoresTables");
//           const querySnapshot = await getDocs(ref);
//           let scoresTables: ScoresTables = [];
//           querySnapshot?.forEach((doc) => {
//             scoresTables.push({ id: doc.id, ...doc.data() } as ScoresTable);
//           });
//           return { data: scoresTables };
//         } catch (error: any) {
//           console.error(error.message);
//           return { error: error.message };
//         }
//       },
//       providesTags: ["Score"],
//     }),
//     setNewHighScore: builder.mutation({
//       async queryFn({ scoresTableId, newHighScore }) {
//         try {
//           await updateDoc(doc(firestore, "scoresTables", scoresTableId), {
//             scores: arrayUnion(newHighScore),
//           });
//           return { data: null };
//         } catch (error: any) {
//           console.error(error.message);
//           return { error: error.message };
//         }
//       },
//       invalidatesTags: ["Score"],
//     }),
//   }),
// });

// export const { useFetchHighScoresTablesQuery, useSetNewHighScoreMutation } =
//   firestoreApi
