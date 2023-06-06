"use client";

import Image from "next/image";
import { useGetBoutiqueItemsQuery } from "../../../lib/redux/services/shopApi";

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

      <section className="ml-6 mt-6">
        {data?.map((item) => (
          <div key={item.id} className="w-screen mb-3">
            <Image
              key={item.id}
              src={item.imageUrl}
              alt={item.nom}
              object-fit="cover"
              width={325}
              height={200}
              style={{ height: "200px" }}
            />
            <p className="text-2xl my-2">{item.nom}</p>
            <span className="text-gray-400 my-2">{item.prix} € - 450 €</span>
          </div>
        ))}
      </section>
    </main>
  );
}
