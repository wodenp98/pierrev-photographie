"use client";

import { useGetCarouselItemsQuery } from "../../lib/redux/services/carouselApi";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Skeleton } from "../ui/skeleton";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import Link from "next/link";

export default function Carousel() {
  const { data, isLoading, isError } = useGetCarouselItemsQuery();

  if (isError) {
    return <div>Error fetching Carousel items.</div>;
  }

  return (
    <div className="relative h-[calc(100vh-97.5px)]">
      {isLoading ? (
        <Skeleton className="w-full h-full absolute inset-0 bg-zinc-500 rounded-none" />
      ) : (
        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          loop={true}
          className="h-full"
        >
          {data?.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative h-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={slide.imageUrl}
                    alt={slide.nom}
                    className="object-cover object-center w-full h-full"
                    width={2000}
                    height={2000}
                    priority={true}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className="absolute bottom-0 left-0 w-full flex justify-center p-14 z-10">
        <Link href="/boutique">
          <button className="bg-lightBlack text-xl text-white  py-2 px-4 ">
            BOUTIQUE
          </button>
        </Link>
      </div>
    </div>
  );
}
