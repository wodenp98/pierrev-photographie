"use client";
import Image from "next/image";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useGetBoutiqueItemByIdQuery } from "../../../../lib/redux/services/shopApi";
import {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useDeleteToWishlistMutation,
} from "@/lib/redux/services/wishlistApi";
import { ShopForm } from "../../../../components/Form/Form";
import { UserAuth } from "@/lib/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ToastAction } from "@/components/ui/toast";

interface Props {
  params: {
    id: string;
  };
}
export default function BoutiqueItemId({ params: { id } }: Props) {
  const { user } = UserAuth();
  const router = useRouter();
  const { toast } = useToast();
  const { data, isError, isLoading } = useGetBoutiqueItemByIdQuery(id);
  const { data: userWishlist } = useGetWishlistQuery(user?.uid);
  const [deleteToWishlist] = useDeleteToWishlistMutation();
  const [addToWishlist] = useAddToWishlistMutation();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (userWishlist) {
      setIsLiked(userWishlist.some((item) => item.id === id));
    }
  }, [userWishlist, id]);

  const handleAddToWishlist = () => {
    if (!user) {
      return router.push("/compte");
    }
    if (data) {
      const product = {
        id: data.id,
        nom: data.nom,
        prix: data.prix,
        description: data.description,
        imageUrl: data.imageUrl,
      };

      if (isLiked) {
        deleteToWishlist({
          userId: user.uid,
          product,
        });
        setIsLiked(false);
        toast({
          className: "bg-red-500 text-white",
          title: `${product.nom} a été retiré de votre wishlist`,
          duration: 3000,
        });
      } else {
        addToWishlist({
          userId: user.uid,
          product,
        });
        setIsLiked(true);
        toast({
          className: "bg-green-500 text-white",
          title: `${product.nom} a été ajouté à votre wishlist`,
          duration: 3000,
        });
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching Carousel items.</div>;
  }

  return (
    <main>
      <ul className="flex ml-6">
        <li className="text-gray-300">Accueil</li>
        <li className="text-gray-300 mx-2">-</li>
        <li className="text-gray-300">Boutique</li>
        <li className="text-gray-300 mx-2">-</li>
        <li>{data?.nom}</li>
      </ul>
      <section className="w-11/12 mt-6 flex justify-center flex-col mx-auto">
        <div>
          <Image
            src={data?.imageUrl as string}
            alt={data?.nom as string}
            width={400}
            height={200}
            className="object-cover"
          />
        </div>
        <div className="mt-3">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl">{data?.nom}</h1>
            {/* onclick ici */}
            {isLiked ? (
              <AiFillHeart
                className="text-2xl text-red-600"
                onClick={handleAddToWishlist}
              />
            ) : (
              <AiOutlineHeart
                className="text-2xl"
                onClick={handleAddToWishlist}
              />
            )}
          </div>

          <p className="text-sm mt-6 text-gray-500">{data?.description}</p>
        </div>
        <ShopForm
          product={{ id: data?.id, nom: data?.nom, imageUrl: data?.imageUrl }}
        />
      </section>
    </main>
  );
}
