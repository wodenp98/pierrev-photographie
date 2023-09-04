"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Navigation, Pagination, EffectCoverflow } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogHeader } from "../ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group">
          <div className="relative overflow-hidden h-full cursor-pointer">
            <Image
              src={src}
              alt={alt}
              height={300}
              width={300}
              className="rounded-md col-span-1 w-full h-full  object-cover"
            />
            <div className="rounded-md absolute h-full w-full bg-black/50 flex items-center justify-center group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <p className="text-white font-bold text-xl py-2 px-5 sm:text-2xl md:text-3xl lg:text-4xl">
                {theme}
              </p>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] sm:max-h-[750px] md:max-w-[800px] md:max-h-[800px] lg:max-w-[900px] lg:max-h-[900px] bg-transparent border-none shadow-none">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {data?.map((item) => (
            <SwiperSlide key={item.id}>
              <Image
                src={item.imageUrl}
                alt={item.nom}
                height={800}
                width={800}
                className="rounded-md  w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </DialogContent>
    </Dialog>
  );
};
