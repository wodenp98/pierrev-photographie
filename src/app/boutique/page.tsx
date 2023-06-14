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

      <section className="flex justify-center flex-col w-5/6 mx-auto">
        {data?.map((item) => (
          <Link key={item.id} href={`/boutique/${item.id}`}>
            <div key={item.id} className="border rounded-md my-4 shadow">
              <div className="image-wrapper landscape:flex portrait:flex">
                <Image
                  key={item.id}
                  src={item.imageUrl}
                  alt={item.nom}
                  object-fit="cover"
                  width={325}
                  height={200}
                  className="object-cover h-auto w-full rounded-t-md"
                />
              </div>
              <div className="flex flex-col ml-2">
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
