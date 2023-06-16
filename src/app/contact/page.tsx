/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { IoMdPaperPlane } from "react-icons/io";

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
        <h2 className="w-4/5">
          Pour toute question, n'hésitez pas à me contacter ! Je vous répondrai
          dans les meilleurs délais. A bientôt !
        </h2>
        <div className="relative w-full">
          <Image
            src="/assets/mailfond.jpg"
            alt="Votre image"
            className="w-full h-auto"
            width={325}
            height={325}
          />
          <div className="absolute inset-0 bg-gray-400 bg-opacity-40 flex flex-col items-center justify-center">
            <IoMdPaperPlane className="text-4xl text-gray-900" />
            <p className="text-gray-900 text-lg font-bold">
              pierre.v.photographie@gmail.com
            </p>
          </div>
        </div>
        <div className="relative w-full">
          <Image
            src="/assets/mailfond.jpg"
            alt="Votre image"
            className="w-full h-auto"
            width={325}
            height={325}
          />
          <div className="absolute inset-0 bg-gray-400 bg-opacity-40 flex flex-col items-center justify-center">
            <IoMdPaperPlane className="text-4xl text-gray-900" />
            <p className="text-gray-900 text-lg font-bold">
              pierre.v.photographie@gmail.com
            </p>
          </div>
        </div>
        <div className="relative w-full">
          <Image
            src="/assets/mailfond.jpg"
            alt="Votre image"
            className="w-full h-auto"
            width={325}
            height={325}
          />
          <div className="absolute inset-0 bg-gray-400 bg-opacity-40 flex flex-col items-center justify-center">
            <IoMdPaperPlane className="text-4xl text-gray-900" />
            <p className="text-gray-900 text-lg font-bold">
              pierre.v.photographie@gmail.com
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
