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

type Product = {
  id: string;
  nom: string;
  prix: number;
  description: string;
  imageUrl: string;
};
export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    addToWishlist: builder.mutation<
      Product,
      { userId: string; product: Product }
    >({
      async queryFn({ userId, product }) {
        try {
          const userWishlistRef = doc(
            db,
            "users",
            userId,
            "wishlist",
            product.id
          );
          await setDoc(userWishlistRef, product);
          return { data: product };
        } catch (error: any) {
          throw new Error("Failed to add product to wishlist.");
        }
      },
    }),

    getWishlist: builder.query<Product[], string>({
      async queryFn(id: string) {
        try {
          const userWishlistRef = collection(db, "users", id, "wishlist");
          const querySnapshot = await getDocs(userWishlistRef);

          let wishlist: Product[] = [];
          querySnapshot.forEach((doc) => {
            const productData = doc.data() as Product;
            wishlist.push(productData);
          });
          return { data: wishlist };
        } catch (error: any) {
          return { error: error.message };
        }
      },
    }),
    deleteToWishlist: builder.mutation<
      Product,
      { userId: string; product: Product }
    >({
      async queryFn({ userId, product }) {
        try {
          const userWishlistRef = doc(
            db,
            "users",
            userId,
            "wishlist",
            product.id
          );
          await deleteDoc(userWishlistRef);
          return { data: product };
        } catch (error: any) {
          throw new Error("Failed to delete product from wishlist.");
        }
      },
    }),
  }),
});

export const {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useDeleteToWishlistMutation,
} = wishlistApi;
