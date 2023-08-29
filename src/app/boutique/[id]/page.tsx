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
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface Props {
  params: {
    id: string;
  };
}
export default function BoutiqueItemId({ params: { id } }: Props) {
  const { toast } = useToast();
  const { data, isError, isLoading } = useGetBoutiqueItemByIdQuery(id);

  // const images = [
  //   {
  //     id: 1,
  //     nom: "1",
  //     imageUrl: data?.imageUrl,
  //   },
  //   {
  //     id: 2,
  //     nom: "2",
  //     imageUrl: data?.imagePreview,
  //   },
  // ];

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
      <section className="w-11/12 mt-6 flex items-center justify-center flex-col mx-auto">
        {/* <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          loop={true}
          className="h-1/2 w-1/2"
        >
          {images?.map((slide) => (
            <SwiperSlide key={slide.id}>
              <Image
                src={slide?.imageUrl as string}
                alt={slide?.nom}
                width={325}
                height={325}
                object-fit="cover"
                priority={true}
              />
            </SwiperSlide>
          ))}
        </Swiper> */}
        <div>
          <Image
            src={data?.imagePreview as string}
            alt={data?.nom as string}
            width={400}
            height={200}
            className="object-cover"
          />
        </div>

        <div className="mt-3">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl">{data?.nom}</h1>
          </div>

          <p className="text-sm mt-6 text-gray-500">{data?.description}</p>
        </div>
        <ShopForm
          product={{
            id: data?.id,
            nom: data?.nom,
            imageUrl: data?.imageUrl,
          }}
        />
      </section>
    </main>
  );
}
