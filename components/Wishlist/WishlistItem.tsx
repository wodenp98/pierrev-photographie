import { MdDeleteForever } from "react-icons/md";
import { useDeleteToWishlistMutation } from "@/lib/redux/services/wishlistApi";
import Image from "next/image";
import { toast } from "../ui/use-toast";

export default function Wishlist({
  item,
  userId,
}: {
  item: any;
  userId: string;
}) {
  const [deleteToWishlist] = useDeleteToWishlistMutation();
  const handleDeleteToWishlist = () => {
    deleteToWishlist({ userId, product: item });
    toast({
      className: "bg-red-500 text-white",
      title: `${item.nom} a été retiré de votre wishlist`,
      duration: 3000,
    });
  };

  return (
    <div className="flex justify-around mb-2">
      <div className="mr-4 ">
        <Image
          src={item.imageUrl}
          alt={item.nom}
          width={120}
          height={80}
          className="object-cover w-[100px] h-[80px]"
        />
      </div>
      <div className="flex flex-col justify-between flex-wrap w-2/5 mr-6">
        <h2 className="text-sm">{item.nom}</h2>
        <p className="text-xs text-gray-500 truncate w-full">
          {item.description}
        </p>
        <p className="text-sm text-gray-500">{item.prix} €</p>
      </div>
      <div className="flex items-end">
        <MdDeleteForever
          onClick={handleDeleteToWishlist}
          className="font-bold text-xl  text-red-500"
        />
      </div>
    </div>
  );
}
