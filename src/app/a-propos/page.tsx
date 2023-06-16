import Image from "next/image";

/* eslint-disable react/no-unescaped-entities */
export default function About() {
  return (
    <main>
      <ul className="flex ml-6">
        <li className="text-gray-300">Accueil</li>
        <li className="text-gray-300 mx-2">-</li>
        <li>A propos</li>
      </ul>
      <h1 className="ml-6 mt-6 text-4xl">A propos</h1>
      <section className="flex flex-col items-center ">
        <p className="w-5/6">
          Habitant la côte atlantique, j'aime mettre en valeur les paysages qui
          m'entourent, mais aussi l'architecture et les habitants qui font vivre
          cette belle région. Ainsi, je vous propose une invitation au voyage à
          travers mes clichés. Mon travail est d'offrir à chacun la possibilité
          de trouver une résonnance dans la photographie qu'il contemple. Je
          serai ravi de discuter avec vous si l\ 'envie vous en dit, n'hésitez
          donc pas à me contacter et à suivre mes aventures photographiques sur
          mon compte Instagram ! ​ Bon visionnage ! Pierre V.
        </p>
        <Image
          src="/photo-pierre.jpg"
          alt="Pierre Vigneron"
          width={325}
          height={200}
        />
      </section>
    </main>
  );
}
