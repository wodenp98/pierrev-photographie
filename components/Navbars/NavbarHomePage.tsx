"use client";

import { useState, useEffect } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import {
  AiOutlineHome,
  AiOutlineShoppingCart,
  AiOutlineInfoCircle,
  AiOutlinePhone,
  AiOutlineHeart,
} from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";

import Link from "next/link";
import { Divide as Hamburger } from "hamburger-react";
import Image from "next/image";
import { LinkInstagram } from "../LinkPlatform/LinkInstagram";

export default function Navbar() {
  const [isOpen, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!isOpen);
  };

  const closeMenu = () => {
    setOpen(false);
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
      className={`flex items-center justify-between w-full h-[97.5px] bg-white z-50 ${
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
      <Link href="/" onClick={closeMenu}>
        <div style={{ width: "130px", height: "130px", position: "relative" }}>
          <Image
            src="/logo-home-pierre-photographie.png"
            alt="Logo"
            width={130}
            height={130}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      </Link>
      <div className="p-4">
        <Link href="/panier" onClick={closeMenu}>
          <HiOutlineShoppingBag
            className="w-[35px] h-[35px]"
            strokeWidth={0.975}
          />
        </Link>
      </div>
      {isOpen && (
        <div
          className={`fixed flex items-center justify-center top-[97.5px] left-0 right-0 bottom-0 bg-white ${
            isOpen ? "w-full" : "w-1/5 md:w-2/5 lg:w-1/5"
          }`}
        >
          <div className="absolute top-0 w-4/5">
            <div className="h-[1px] bg-gray-400 mx-auto my-4"></div>
            <Link
              href="/"
              className="uppercase flex items-center justify-between"
              onClick={closeMenu}
            >
              Accueil
              <AiOutlineHome className="w-[20px] h-[20px]" />
            </Link>
            <div className="h-[1px] bg-gray-400 mx-auto my-4"></div>
            <Link
              href="/boutique"
              className="uppercase flex items-center justify-between"
              onClick={closeMenu}
            >
              Boutique
              <AiOutlineShoppingCart className="w-[20px] h-[20px]" />
            </Link>
            <div className="h-[1px] bg-gray-400 mx-auto my-4"></div>
            <Link
              href="/apropos"
              className="uppercase flex items-center justify-between"
              onClick={closeMenu}
            >
              A propos
              <AiOutlineInfoCircle className="w-[20px] h-[20px]" />
            </Link>
            <div className="h-[1px] bg-gray-400 mx-auto my-4"></div>
            <Link
              href="/contact"
              className="uppercase flex items-center justify-between"
              onClick={closeMenu}
            >
              Contact
              <AiOutlinePhone className="w-[20px] h-[20px]" />
            </Link>
            <div className="h-[1px] bg-gray-400 mx-auto my-4"></div>
            <Link
              href="/compte"
              className="uppercase flex items-center justify-between"
              onClick={closeMenu}
            >
              Compte
              <VscAccount className="w-[20px] h-[20px]" />
            </Link>
          </div>
          <div className="absolute bottom-10 w-4/5" onClick={closeMenu}>
            <LinkInstagram />
          </div>
        </div>
      )}
    </header>
  );
}
