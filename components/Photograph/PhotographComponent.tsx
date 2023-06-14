"use client";

import Image from "next/image";
import PhotoPierre from "/public/photo-pierre.jpg";
import { useGetPhotographItemsQuery } from "../../lib/redux/services/photographApi";
import Link from "next/link";

export default function PhotographComponent() {
  const { data, isLoading, isError } = useGetPhotographItemsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching photograph items.</div>;
  }

  return (
    <section className="bg-lightBlue h-screen">
      <h1 className="flex items-center justify-center text-4xl pt-8">
        Le photographe
      </h1>

      <div className="flex items-center flex-col mt-24 bg-white rounded-t-[40px] h-5/6">
        <div className="relative top-[-12%] w-36 h-36 mb-[-50px]">
          <Image
            className="rounded-full"
            src={PhotoPierre}
            alt="Photo Pierre"
            fill={true}
            object-fit="cover"
          />
        </div>
        <h2 className="text-lg text-center">
          Mon travail est d’offrir à chacun la possibilité de trouver une
          résonnence dans la photographie qu’il contemple
        </h2>
        <div className="grid grid-cols-3 gap-4 mt-6 p-4">
          {data?.map((item) => (
            // {`/boutique/${item.id}`}
            <Link href={`/boutique`} key={item.id}>
              <Image
                src={item.imageUrl}
                alt={item.nom}
                key={item.id}
                width={200}
                height={150}
                className="rounded-lg col-span-1 w-full h-full object-cover"
              />
            </Link>
          ))}
        </div>{" "}
        <div className="w-full flex justify-center p-4 z-10">
          <Link href="/boutique">
            <button className="bg-lightBlue rounded-lg text-xl text-black  py-2 px-4 ">
              VOIR PLUS
            </button>
          </Link>
        </div>{" "}
      </div>
    </section>
  );
}
