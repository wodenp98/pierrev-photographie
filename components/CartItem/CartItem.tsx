import { useDeleteToCartMutation } from "@/lib/redux/services/cartApi";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import Image from "next/image";

export default function CartItem({ item, id }: any) {
  const [deleteToCart] = useDeleteToCartMutation();
  const handleDeleteFromCart = () => {
    deleteToCart({ userId: id, cart: item }).then(() => {
      window.location.reload();
    });
  };

  return (
    <div key={item.id} className="flex mt-5">
      <Image
        key={item.id}
        src={item.imageUrl}
        alt={item.nom}
        width={100}
        height={100}
        className="object-cover w-[100px] h-[100px]"
      />
      <div className="w-4/6 flex justify-around">
        <div className="flex flex-col w-full ml-4 ">
          <p className="text-xl font-bold">{item.nom}</p>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-sm text-gray-500">
                Détails
              </AccordionTrigger>
              <AccordionContent className="text-xs">
                {item.format}
              </AccordionContent>
              <AccordionContent className="text-xs">
                {item.impression}
              </AccordionContent>
              <AccordionContent className="text-xs">
                {item.rendu}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="flex flex-col items-end justify-between">
          <span className="text-lg">{item.price} €</span>
          <button
            onClick={handleDeleteFromCart}
            className="text-gray-500 text-xs"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
