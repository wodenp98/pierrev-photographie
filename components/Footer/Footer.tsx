import Image from "next/image";
import Link from "next/link";
import { LinkInstagram } from "../LinkPlatform/LinkInstagram";
import { LinkGmail } from "../LinkPlatform/LinkGmail";

export default function Footer() {
  return (
    <footer className="bg-lightBlack mt-5">
      <div className="flex justify-center">
        <Link href="/">
          <div
            style={{ width: "150px", height: "150px", position: "relative" }}
          >
            <Image
              src="/logo-footer-pierre-photographie.jpg"
              alt="Logo"
              width={130}
              height={130}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        </Link>
      </div>

      <div className="flex flex-col p-4 text-white gap-4">
        <Link href="/mentions-legales">Mentions légales</Link>
        <Link href="/CGVU">CGVU</Link>
        <LinkInstagram />
        <LinkGmail />
      </div>

      <div className="border-b"></div>

      <div className="text-white flex justify-center p-2">
        © 2023 Pierre Vigneron
      </div>
    </footer>
  );
}
