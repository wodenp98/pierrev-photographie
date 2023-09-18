"use client";

import Image from "next/image";
import { useGetBoutiqueItemsQuery } from "../../../lib/redux/services/shopApi";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Boutique() {
  const { data, isLoading, isError } = useGetBoutiqueItemsQuery();

  if (isLoading) {
    return (
      <main>
        <ul className="flex ml-6">
          <li className="text-gray-300">Accueil</li>
          <li className="text-gray-300 mx-2">-</li>
          <li>Boutique</li>
        </ul>

        <h1 className="ml-6 mt-6 text-4xl">Boutique</h1>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-5/6 mx-auto mt-6">
          {[...Array(6)].map((_, index) => (
            <Skeleton
              key={index}
              className="border rounded-md shadow bg-zinc-500 h-full w-full"
            >
              <div className="h-96 w-full rounded-t-md" />
            </Skeleton>
          ))}
        </section>
      </main>
    );
  }

  if (isError) {
    return <div>Error fetching Boutique items.</div>;
  }

  return (
    <main>
      <ul className="flex ml-6">
        <li className="text-gray-300">Accueil</li>
        <li className="text-gray-300 mx-2">-</li>
        <li>Boutique</li>
      </ul>

      <h1 className="ml-6 mt-6 text-4xl">Boutique</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-5/6 mx-auto mt-6">
        {data?.map((item) => (
          <Link key={item.id} href={`/boutique/${item.id}`}>
            <div key={item.id} className="border rounded shadow h-full w-full">
              <Image
                key={item.id}
                src={item.imageUrl}
                alt={item.nom}
                width={1080}
                height={1080}
                className="object-cover h-96 w-full rounded-t"
              />

              <div className="p-4">
                <h2 className="text-xl my-2">{item.nom}</h2>
                <span className="text-black-400 my-2">
                  {item.prix} € - 450 €
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
