import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-lightBlack mt-5">
      <div className="flex justify-center">
        <Link href="/">
          <Image
            src="/logo-footer-pierre-photographie.jpg"
            alt="Logo Pierre Photographie"
            width={150}
            height={150}
          />
        </Link>
      </div>

      <div className="flex flex-col p-4 text-white gap-4">
        <Link href="/dashboard">Mentions légales</Link>
        <Link href="/dashboard">FAQ</Link>
        <Link href="/dashboard">CGVU</Link>
        <Link href="/dashboard" className="flex">
          <Image
            src="/icon-instagram.svg"
            alt="Instagram"
            width={40}
            height={40}
            className="pr-4"
          />
          <p>@pierrev.photographie</p>
        </Link>
        <Link href="/dashboard" className="flex">
          <Image
            src="/icon-gmail.svg"
            alt="Gmail"
            width={40}
            height={40}
            className="pr-4"
          />
          <p>pierrev.photographie@gmail.com</p>
        </Link>
      </div>

      <div className="border-b"></div>

      <div className="text-white flex justify-center p-2">
        © 2023 Pierre Vigneron
      </div>
    </footer>
  );
}
