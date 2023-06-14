"use client";
import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";
import { useGetBoutiqueItemByIdQuery } from "../../../../lib/redux/services/shopApi";
import { ShopForm } from "../../../../components/Form/Form";

interface Props {
  params: {
    id: string;
  };
}
export default function Page({ params: { id } }: Props) {
  const { data, isError, isLoading } = useGetBoutiqueItemByIdQuery(id);
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
        <li className="text-gray-300">Boutique</li>
        <li className="text-gray-300 mx-2">-</li>
        <li>{data?.nom}</li>
      </ul>
      <section className="w-11/12 mt-6 flex justify-center flex-col mx-auto">
        <div>
          <Image
            src={data?.imageUrl as string}
            alt={data?.nom as string}
            width={400}
            height={200}
            className="object-cover"
          />
        </div>
        <div className="mt-3">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl">{data?.nom}</h1>
            <AiOutlineHeart className="text-2xl" />
          </div>

          <p className="text-sm mt-6 text-gray-500">{data?.description}</p>
          <p className="text-xl mt-6">{data?.prix} €</p>
        </div>
        <ShopForm />
      </section>
    </main>
  );
}
