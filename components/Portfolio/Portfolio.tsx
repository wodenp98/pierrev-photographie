"use client";
import Link from "next/link";
import PortfolioSkeleton from "./LoadingSkeleton";
import { PortfolioImageComponents } from "./PortfolioImageComponents";
import { useGetAnimalsItemsQuery } from "@/lib/redux/services/animalsApi";
import { useGetArchitectureItemsQuery } from "@/lib/redux/services/architectureApi";
import { useGetModeItemsQuery } from "@/lib/redux/services/modeApi";
import { useGetNatureItemsQuery } from "@/lib/redux/services/natureApi";
import { useGetSportItemsQuery } from "@/lib/redux/services/sportApi";
import { useGetStageItemsQuery } from "@/lib/redux/services/stageApi";

export default function PhotographComponent() {
  const { data: animalsData, isLoading, isError } = useGetAnimalsItemsQuery();
  const { data: architectureData } = useGetArchitectureItemsQuery();
  const { data: modeData } = useGetModeItemsQuery();
  const { data: natureData } = useGetNatureItemsQuery();
  const { data: sportData } = useGetSportItemsQuery();
  const { data: stageData } = useGetStageItemsQuery();

  return (
    <section className="bg-white">
      <h1 className="flex items-center justify-center text-2xl pt-8">
        Bonjour, je suis Pierre Vigneron
      </h1>
      <h2 className="flex items-center justify-center text-gray-400 text-xl pt-4">
        Découvrez mon travail
      </h2>

      <div className="flex items-center flex-col bg-white h-5/6 ">
        {isLoading ? (
          <PortfolioSkeleton />
        ) : (
          <div className="grid grid-cols-2 w-10/12 h-10/12 md:grid-cols-2 lg:grid-cols-3 xl:w-2/3  gap-4 mt-6 p-4">
            <PortfolioImageComponents
              src="/assets/portfolioAssets/cascade.jpg"
              alt="Cascade"
              theme="PAYSAGE"
              data={natureData}
            />
            <PortfolioImageComponents
              src="/assets/portfolioAssets/fille5.jpg"
              alt="Fille 5"
              theme="MODE"
              data={modeData}
            />
            <PortfolioImageComponents
              src="/assets/portfolioAssets/immeublenoiretblanc2.jpg"
              alt="Immeuble"
              theme="ARCHITECTURE"
              data={architectureData}
            />
            <PortfolioImageComponents
              src="/assets/portfolioAssets/maya2.jpg"
              alt="Maya"
              theme="ANIMALIER"
              data={animalsData}
            />
            <PortfolioImageComponents
              src="/assets/portfolioAssets/montre3.jpg"
              alt="Montre"
              theme="STUDIO"
              data={stageData}
            />
            <PortfolioImageComponents
              src="/assets/portfolioAssets/surf2.jpg"
              alt="Surf"
              theme="SPORT"
              data={sportData}
            />
          </div>
        )}

        <div className="w-full flex justify-center p-4 z-10">
          <Link href="/boutique">
            <button className="bg-lightBlue rounded-lg text-xl text-black py-2 px-4">
              VOIR PLUS
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
