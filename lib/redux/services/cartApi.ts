import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  doc,
  getDoc,
  deleteDoc,
  setDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../lib/firebase/index";

export type CartType = {
  id: string;
  nom: string;
  price: number;
  imageUrl: string;
  format: string;
  rendu: string;
  impression: string;
};
export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    addToCart: builder.mutation<CartType, { userId: string; cart: CartType }>({
      async queryFn({ userId, cart }) {
        try {
          const userCartRef = doc(db, "users", userId, "panier", cart.id);
          await setDoc(userCartRef, cart);
          return { data: cart };
        } catch (error: any) {
          throw new Error("Failed to add product to cart.");
        }
      },
    }),

    getCart: builder.query<CartType[], string>({
      async queryFn(id: string) {
        try {
          const userCartRef = collection(db, "users", id, "panier");
          const querySnapshot = await getDocs(userCartRef);

          let cart: CartType[] = [];
          querySnapshot.forEach((doc) => {
            const cartData = doc.data() as CartType;
            cart.push(cartData);
          });
          return { data: cart };
        } catch (error: any) {
          return { error: error.message };
        }
      },
    }),
    deleteToCart: builder.mutation<
      CartType,
      { userId: string; cart: CartType }
    >({
      async queryFn({ userId, cart }) {
        try {
          const userCartRef = doc(db, "users", userId, "panier", cart.id);
          await deleteDoc(userCartRef);
          return { data: cart };
        } catch (error: any) {
          throw new Error("Failed to delete product from cart.");
        }
      },
    }),
    deleteAllCart: builder.mutation<CartType[], string>({
      async queryFn(id: string) {
        try {
          const userCartRef = doc(db, "users", id, "panier");
          await deleteDoc(userCartRef);
          return { data: [] };
        } catch (error: any) {
          return { error: error.message };
        }
      },
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetCartQuery,
  useDeleteToCartMutation,
  useDeleteAllCartMutation,
} = cartApi;
