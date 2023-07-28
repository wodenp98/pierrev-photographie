"use client";
import React from "react";
import Carousel from "../../components/Carousel/Carousel";
import Portfolio from "../../components/Portfolio/Portfolio";

export default function Home() {
  return (
    <main className="container flex-grow">
      <Carousel />
      <Portfolio />
    </main>
  );
}
