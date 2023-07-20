"use client";
import { signIn, useSession } from "next-auth/react";
import React from "react";

import Carousel from "../../components/Carousel/Carousel";
import Portfolio from "../../components/Portfolio/Portfolio";

export default async function Home() {
  const session = useSession();
  console.log(session);
  return (
    <main className="container flex-grow">
      <button onClick={() => signIn("google")}>Login with google</button>
      <Carousel />
      <Portfolio />
    </main>
  );
}
