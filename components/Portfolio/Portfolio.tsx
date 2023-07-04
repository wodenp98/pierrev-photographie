import Link from "next/link";
import { PortfolioImageComponents } from "./PortfolioImageComponents";

export default function PhotographComponent() {
  return (
    <section className="bg-white">
      <h1 className="flex items-center justify-center text-2xl pt-8">
        Bonjour, je suis Pierre Vigneron
      </h1>
      <h2 className="flex items-center justify-center text-gray-400 text-xl pt-8">
        Découvrez mon travail
      </h2>

      <div className="flex items-center flex-col  bg-white h-5/6">
        <div className="grid grid-cols-2 gap-4 mt-6 p-4">
          <PortfolioImageComponents
            src="/assets/portfolioAssets/cascade.jpg"
            alt="Cascade"
            theme="PAYSAGE"
          />
          <PortfolioImageComponents
            src="/assets/portfolioAssets/fille5.jpg"
            alt="Fille 5"
            theme="MODE"
          />
          <PortfolioImageComponents
            src="/assets/portfolioAssets/immeublenoiretblanc2.jpg"
            alt="Immeuble"
            theme="ARCHITECTURE"
          />
          <PortfolioImageComponents
            src="/assets/portfolioAssets/maya2.jpg"
            alt="Maya"
            theme="ANIMALIER"
          />
          <PortfolioImageComponents
            src="/assets/portfolioAssets/montre3.jpg"
            alt="Montre"
            theme="STUDIO"
          />
          <PortfolioImageComponents
            src="/assets/portfolioAssets/surf2.jpg"
            alt="Surf"
            theme="SPORT"
          />
        </div>
        <div className="w-full flex justify-center p-4 z-10">
          <Link href="/boutique">
            <button className="bg-lightBlue rounded-lg text-xl text-black  py-2 px-4 ">
              VOIR PLUS
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
