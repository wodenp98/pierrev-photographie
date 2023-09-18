"use client";
import Image from "next/image";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useGetBoutiqueItemByIdQuery } from "../../../../lib/redux/services/shopApi";
import { ShopForm } from "../../../../components/Form/Form";
import { UserAuth } from "@/lib/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ToastAction } from "@/components/ui/toast";
import { AccordionShop } from "@/components/Accordion/Accordion";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  params: {
    id: string;
  };
}
export default function BoutiqueItemId({ params: { id } }: Props) {
  const { toast } = useToast();
  const { data, isLoading, isError } = useGetBoutiqueItemByIdQuery(id);

  if (isLoading) {
    return (
      <main>
        <ul className="flex ml-6">
          <li className="text-gray-300">Accueil</li>
          <li className="text-gray-300 mx-2">-</li>
          <li className="text-gray-300">Boutique</li>
          <li className="text-gray-300 mx-2">-</li>
          <li>Loading...</li>
        </ul>
        <section className="w-11/12 mt-6 mx-auto">
          <div className="flex flex-col lg:flex-row md:items-center">
            <div className="lg:w-1/2  flex md:justify-center">
              <Skeleton className="object-cover bg-zinc-500 min-w-[300px] min-h-[300px] md:min-w-[500px] md:min-h-[500px]" />
            </div>

            <div className="lg:w-1/2 mt-3 lg:ml-6 h-full">
              <Skeleton
                className="text-3xl bg-zinc-500"
                style={{ height: "30px", width: "200px" }}
              />
              <Skeleton className="text-sm bg-zinc-500 mt-6 text-gray-500" />
              <Skeleton
                className="mt-6 bg-zinc-500"
                style={{ width: "200px", height: "40px" }}
              />
              <Skeleton
                className="object-cover mt-6 bg-zinc-500 h-full w-full"
                style={{ width: "300px", height: "200px" }}
              />
            </div>
          </div>

          <div className="flex items-center justify-center mt-6">
            <AccordionShop />
          </div>
        </section>
      </main>
    );
  }

  if (isError) {
    return <div>Error fetching Boutique item.</div>;
  }

  return (
    <main>
      <ul className="flex ml-6">
        <li className="text-gray-300">Accueil</li>
        <li className="text-gray-300 mx-2">-</li>
        <li className="text-gray-300">Boutique</li>
        <li className="text-gray-300 mx-2">-</li>
        <li>{data?.nom}</li>
      </ul>
      <section className="w-11/12 mt-6 mx-auto">
        {/* ci dessous taille du composant? */}
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2  flex justify-center">
            <Image
              src={data?.imageUrl as string}
              alt={data?.nom as string}
              width={1080}
              height={1080}
              // object contain?
              className="object-contain h-full w-full"
            />
          </div>

          <div className="lg:w-1/2 mt-3 lg:ml-6 h-full">
            <h1 className="text-3xl">{data?.nom}</h1>
            <p className="text-sm mt-6 text-gray-500">{data?.description}</p>
            <ShopForm
              product={{
                id: data?.id,
                nom: data?.nom,
                imageUrl: data?.imageUrl,
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-center mt-6">
          <AccordionShop />
        </div>
      </section>
    </main>
  );
}
