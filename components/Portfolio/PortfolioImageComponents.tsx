"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { AiOutlineClose } from "react-icons/ai";
import { Navigation, Pagination } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

type DataItem = {
  id: string;
  nom: string;
  imageUrl: string;
};

type PortfolioImage = {
  src: string;
  alt: string;
  theme: string;
  data: DataItem[] | undefined;
};

export const PortfolioImageComponents = ({
  src,
  alt,
  theme,
  data,
}: PortfolioImage) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen]);

  return (
    <>
      <div className="group">
        <div
          className="relative overflow-hidden h-full cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <Image
            src={src}
            alt={alt}
            height={300}
            width={300}
            className="rounded-md col-span-1 w-full h-full object-cover"
          />
          <div className="rounded-md absolute h-full w-full bg-black/50 flex items-center justify-center  group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <p className=" text-white font-bold text-xl py-2 px-5">{theme}</p>
          </div>
        </div>
      </div>
      <Modal open={isModalOpen}>
        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          loop={true}
          className={`rounded-md w-5/6 h-1/2`}
        >
          {data?.map((slide: DataItem) => (
            <SwiperSlide key={slide.id}>
              <div className="relative h-full">
                <AiOutlineClose
                  className="absolute z-50 top-2 right-2 text-2xl text-white"
                  onClick={() => setIsModalOpen(false)}
                />
                <Image
                  src={slide.imageUrl}
                  alt={slide.nom}
                  fill={true}
                  object-fit="cover"
                  className="object-cover h-auto w-full"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Modal>
    </>
  );
};
