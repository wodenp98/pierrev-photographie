import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";

import Image from "next/image";

export default function CardHistoryItem({ historyCommand }: any) {
  console.log(historyCommand);
  return (
    <div key={historyCommand.id}>
      <p className="font-bold text-sm">Le {historyCommand.createdAt}</p>
      <div className="flex mt-5 w-full">
        <Image
          key={historyCommand.id}
          src={historyCommand.imageUrl}
          alt={historyCommand.nom}
          width={100}
          height={100}
          className="object-cover w-[100px] h-[100px]"
        />

        <div className="w-full flex justify-between">
          <div className="flex flex-col w-5/6 ml-2 ">
            <p className="text-base font-bold">{historyCommand.nom}</p>
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
          <div className="flex w-1/6">
            <span className="text-sm text-gray-500">
              {historyCommand.price}€
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
