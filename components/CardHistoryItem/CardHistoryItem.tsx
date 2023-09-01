import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";

import Image from "next/image";

export default function CardHistoryItem({ historyCommand }: any) {
  const date = new Date(historyCommand.createdAt * 1000);
  const dateLocale = date.toLocaleDateString("fr-FR");

  return (
    <div key={historyCommand.id}>
      <p className="font-bold text-sm">Le {dateLocale}</p>
      <div className="flex mt-5 w-full">
        <div className="flex-shrink-0">
          <Image
            key={historyCommand.id}
            src={historyCommand.imageUrl}
            alt={historyCommand.nom}
            width={100}
            height={100}
            className="object-cover w-28 h-28 sm:w-36 sm:h-36"
          />
        </div>
        <div className="flex-grow ml-4">
          <p className="text-xl font-bold">{historyCommand.nom}</p>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-sm text-gray-500">
                Détails
              </AccordionTrigger>
              <AccordionContent className="text-xs">
                {historyCommand.format}
              </AccordionContent>
              <AccordionContent className="text-xs">
                {historyCommand.impression}
              </AccordionContent>
              <AccordionContent className="text-xs">
                {historyCommand.rendu}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="flex flex-col items-end justify-between ml-4">
          <span className="text-lg">{historyCommand.price} €</span>
        </div>
      </div>
    </div>
  );
}
