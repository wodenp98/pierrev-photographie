"use client";
import { useEffect } from "react";
import { UserAuth } from "@/lib/context/AuthContext";
import { useGetCartQuery } from "@/lib/redux/services/cartApi";
import { db } from "@/lib/firebase";
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";

export default function CustomerDetails({ customerDetails }: any) {
  const { user } = UserAuth();
  const getCart = useGetCartQuery(user?.uid);

  useEffect(() => {
    if (customerDetails) {
      getCart?.data?.forEach(async (item: any) => {
        await deleteDoc(doc(db, "users", user?.uid, "panier", item.id));
        getCart.refetch();
      });

      const timestamp = new Date().toLocaleDateString("fr-FR");

      getCart?.data?.forEach((item: any) => {
        const itemWithTimestamp = { ...item, timestamp: timestamp };
        return addDoc(
          collection(db, "users", user?.uid, "history"),
          itemWithTimestamp
        );
      });
    }
  }, [customerDetails, getCart, user?.uid]);

  return <div>CustomerDetails</div>;
}
