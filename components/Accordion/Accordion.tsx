/* eslint-disable react/no-unescaped-entities */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const AccordionShop = () => {
  return (
    <Accordion type="single" collapsible className="w-10/12">
      <AccordionItem value="item-1">
        <AccordionTrigger>LA SUBLIGAPHIE</AccordionTrigger>
        <AccordionContent>
          Tirage haut de gamme direct sur un support rigide en aluminium. Cela
          donne un effet de profondeur et de réalisme à la photo. C'est assez
          époustouflant
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>FINE ART</AccordionTrigger>
        <AccordionContent>
          Impression sur un papier de grande qualité. Rendu parfait pour
          exprimer les perceptions et les émotions.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>ALU DIBOND</AccordionTrigger>
        <AccordionContent>
          Impression Fine Art fixée sur une plaque d'aluminium avec crochet
          intégré. Idéal pour afficher votre photo sans cadre.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
