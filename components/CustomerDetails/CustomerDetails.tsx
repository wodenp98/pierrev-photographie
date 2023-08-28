"use client";

import { UserAuth } from "@/lib/context/AuthContext";
import { useGetCartQuery } from "@/lib/redux/services/cartApi";
import { db } from "@/lib/firebase";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { VscLoading } from "react-icons/vsc";
import Image from "next/image";

export default function CustomerDetails({ customerDetails }: any) {
  const { user } = UserAuth();
  const getCart = useGetCartQuery(user?.uid);

  if (customerDetails && getCart?.data && user) {
    getCart?.data?.forEach(async (item: any) => {
      await deleteDoc(doc(db, "users", user?.uid, "panier", item.id));
      getCart.refetch();
    });

    customerDetails?.forEach(async (item: any) => {
      const itemHistory = {
        id: item.id,
        nom: item.name,
        price: item.price,
        imageUrl: item.imageUrl,
        format: item.details.split(" - ")[0],
        rendu: item.details.split(" - ")[1],
        impression: item.details.split(" - ")[2],
        createdAt: item.createdAt,
      };
      const userCartRef = doc(db, "users", user?.uid, "history", item.id);
      await setDoc(userCartRef, itemHistory);
    });
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>
      {customerDetails.length > 0 ? (
        customerDetails.map((item: any, index: number) => (
          <div key={index} className="flex flex-col mb-4">
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={100}
              height={100}
              className="w-32 h-32 object-cover"
            />
            <div className="flex flex-col ml-4">
              <p className="text-lg font-bold">{item.name}</p>
              <p className="text-gray-500">{item.details}</p>
              <p className="text-gray-500">{item.price} €</p>
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center">
          <VscLoading className="animate-spin mr-2" />
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}
