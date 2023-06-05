import Image from "next/image";
import { RiMenu4Fill } from "react-icons/ri";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import LogoPierre from "/logo-home-pierre-photographie.png";

export default function Navbar() {
  return (
    <header className="flex items-center justify-evenly w-full">
      <div className="w-[80px]">
        <IoIosArrowBack className="w-[30px] h-[30px]" strokeWidth={0.05} />
      </div>
      <Image
        src={LogoPierre}
        alt="Logo Pierre Photographie"
        width={130}
        height={100}
        priority={true}
      />
      <div className="w-[80px] flex justify-evenly">
        <HiOutlineShoppingBag
          className="w-[30px] h-[30px]"
          strokeWidth={0.975}
        />
        <RiMenu4Fill className="w-[30px] h-[33px]" />
      </div>
    </header>
  );
}
