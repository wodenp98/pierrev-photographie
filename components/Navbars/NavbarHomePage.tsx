import Image from "next/image";
import { RiMenu4Fill } from "react-icons/ri";
import { HiOutlineShoppingBag } from "react-icons/hi";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between w-full">
      <div className="p-4">
        <RiMenu4Fill className="w-[30px] h-[33px]" />
      </div>

      <Image
        src="/logo Pierre Photographie.png"
        alt="Logo"
        width={130}
        height={100}
        priority={true}
      />
      <div className="p-4">
        <HiOutlineShoppingBag
          className="w-[30px] h-[30px]"
          strokeWidth={0.975}
        />
      </div>
    </header>
  );
}
