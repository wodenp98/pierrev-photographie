"use client";

import { useState, useEffect } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import Link from "next/link";
import { Divide as Hamburger } from "hamburger-react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <header
      className={`flex items-center justify-between w-full bg-white z-50 fixed top-0 ${
        isOpen ? "overflow-hidden" : ""
      }`}
    >
      <div className="p-4">
        <Hamburger
          toggled={isOpen}
          toggle={toggleMenu}
          duration={0.8}
          size={26}
          label="Voir menu"
        />
      </div>
      <Link href="/">
        <Image
          src="/logo-home-pierre-photographie.png"
          alt="Logo"
          width={130}
          height={100}
          priority={true}
        />
      </Link>
      <div className="p-4">
        <HiOutlineShoppingBag
          className="w-[35px] h-[35px]"
          strokeWidth={0.975}
        />
      </div>
      {isOpen && (
        <div className="fixed flex items-center justify-center top-[97.5px] left-0 right-0 bottom-0 bg-white ">
          <div className="absolute top-0 w-4/5">
            <div className="h-[1px] bg-gray-400 mx-auto my-4"></div>
            <Link href="/page1" className="uppercase">
              Accueil
            </Link>
            <div className="h-[1px] bg-gray-400 mx-auto my-4"></div>
            <Link href="/page2" className="uppercase">
              Boutique
            </Link>
            <div className="h-[1px] bg-gray-400 mx-auto my-4"></div>
          </div>
        </div>
      )}
    </header>
  );
}
