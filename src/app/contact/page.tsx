/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { IoMdPaperPlane } from "react-icons/io";
import { BiPhoneCall } from "react-icons/bi";
import Link from "next/link";

export default function Contact() {
  return (
    <main>
      <ul className="flex ml-6">
        <li className="text-gray-300">Accueil</li>
        <li className="text-gray-300 mx-2">-</li>
        <li>Contact</li>
      </ul>
      <h1 className="ml-6 mt-6 text-4xl">Contact</h1>
      <section className="flex flex-col items-center">
        <h2 className="w-10/12 m-3 text-center">
          Pour toute question, n'hésitez pas à me contacter ! Je vous répondrai
          dans les meilleurs délais. A bientôt !
        </h2>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 w-10/12 place-items-center">
          <a
            href={`mailto:pierrev.photographie@gmail.com`}
            className="relative w-full h-full my-1"
            rel="noopener noreferrer"
          >
            <Image
              src="/assets/mailfond.jpg"
              alt="Votre image"
              className="w-full h-full"
              width={325}
              height={325}
            />

            <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center">
              <IoMdPaperPlane className="text-4xl text-grey-900" />
              <p className="text-grey-900 text-lg md:text-xs lg:text-base xs:text-xs font-bold">
                pierre.v.photographie@gmail.com
              </p>
            </div>
          </a>
          <div className="relative w-full h-full my-1">
            <Image
              src="/assets/phonefond.jpg"
              alt="Votre image"
              className="w-full h-full"
              width={325}
              height={325}
            />
            <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center">
              <BiPhoneCall className="text-4xl text-grey-900" />
              <p className="text-grey-900 text-lg font-bold">06 14 25 39 12</p>
            </div>
          </div>
          <Link
            href="https://www.instagram.com/pierrev.photographie"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-full h-full my-1"
          >
            <Image
              src="/assets/instafond.jpg"
              alt="Votre image"
              className="w-full h-full"
              width={325}
              height={325}
            />

            <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center">
              <Image
                src="/icon-instagram.svg"
                alt="Instagram"
                width={40}
                height={40}
                className="text-4xl text-grey-900"
              />
              <p className="text-grey-900 text-lg font-bold">
                @pierre.v.photographie
              </p>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
