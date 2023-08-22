"use client";

import Image from "next/image";
import { useGetBoutiqueItemsQuery } from "../../../lib/redux/services/shopApi";
import Link from "next/link";

export default function Boutique() {
  const { data, isLoading, isError } = useGetBoutiqueItemsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching Carousel items.</div>;
  }
  return (
    <main>
      <ul className="flex ml-6">
        <li className="text-gray-300">Accueil</li>
        <li className="text-gray-300 mx-2">-</li>
        <li>Boutique</li>
      </ul>

      <h1 className="ml-6 mt-6 text-4xl">Boutique</h1>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-5/6 mx-auto mt-6">
        {data?.map((item) => (
          <Link key={item.id} href={`/boutique/${item.id}`}>
            <div key={item.id} className="border rounded-md shadow">
              <div className="image-wrapper">
                <Image
                  key={item.id}
                  src={item.imageUrl}
                  alt={item.nom}
                  width={325}
                  height={200}
                  className="object-cover h-auto w-full rounded-t-md"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl my-2">{item.nom}</h2>
                <p className="text-sm text-gray-400">{item.description}</p>
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
