// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { useGetBoutiqueItemByIdQuery } from "@/lib/redux/services/shopApi";
// import {
//   useGetWishlistQuery,
//   useDeleteToWishlistMutation,
//   useAddToWishlistMutation,
// } from "@/lib/redux/services/wishlistApi";
// import { UserAuth } from "@/lib/context/AuthContext";
// import Image from "next/image";
// import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
// import ShopForm from "@/components/Form/Form";

// interface Props {
//   params: {
//     id: string;
//   };
// }

// const Navigation: React.FC = () => {
//   return (
//     <ul className="flex ml-6">
//       <li className="text-gray-300">Accueil</li>
//       <li className="text-gray-300 mx-2">-</li>
//       <li className="text-gray-300">Boutique</li>
//       <li className="text-gray-300 mx-2">-</li>
//     </ul>
//   );
// };

// const ProductInfo: React.FC<{ data: any }> = ({ data }) => {
//   const [isLiked, setIsLiked] = useState(false);
//   const { user } = UserAuth();
//   const router = useRouter();
//   const { data: userWishlist } = useGetWishlistQuery(user?.uid);
//   const [deleteToWishlist] = useDeleteToWishlistMutation();
//   const [addToWishlist] = useAddToWishlistMutation();

//   useEffect(() => {
//     if (userWishlist) {
//       setIsLiked(userWishlist.some((item) => item.id === data?.id));
//     }
//   }, [userWishlist, data]);

//   const handleAddToWishlist = () => {
//     if (!user) {
//       return router.push("/compte");
//     }
//     if (data) {
//       const product = {
//         id: data.id,
//         nom: data.nom,
//         prix: data.prix,
//         description: data.description,
//         imageUrl: data.imageUrl,
//       };

//       if (isLiked) {
//         deleteToWishlist({
//           userId: user.uid,
//           product,
//         });
//         setIsLiked(false);
//       } else {
//         addToWishlist({
//           userId: user.uid,
//           product,
//         });
//         setIsLiked(true);
//       }
//     }
//   };

//   return (
//     <div className="mt-3">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl">{data?.nom}</h1>
//         {isLiked ? (
//           <AiFillHeart
//             className="text-2xl text-red-600"
//             onClick={handleAddToWishlist}
//           />
//         ) : (
//           <AiOutlineHeart className="text-2xl" onClick={handleAddToWishlist} />
//         )}
//       </div>
//       <p className="text-sm mt-6 text-gray-500">{data?.description}</p>
//     </div>
//   );
// };

// const BoutiqueItemId: React.FC<Props> = ({ params: { id } }) => {
//   const { data, isError, isLoading } = useGetBoutiqueItemByIdQuery(id);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error fetching Carousel items.</div>;
//   }

//   return (
//     <main>
//       <Navigation />
//       <section className="w-11/12 mt-6 flex justify-center flex-col mx-auto">
//         <div>
//           <Image
//             src={data?.imageUrl as string}
//             alt={data?.nom as string}
//             width={400}
//             height={200}
//             className="object-cover"
//           />
//         </div>
//         <ProductInfo data={data} />
//         <ShopForm />
//       </section>
//     </main>
//   );
// };

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
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Props {
  params: {
    id: string;
  };
}
export default function BoutiqueItemId({ params: { id } }: Props) {
  const { user } = UserAuth();
  const router = useRouter();
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
      } else {
        addToWishlist({
          userId: user.uid,
          product,
        });
        setIsLiked(true);
      }
    }
  };

  const addToCart = {
    id: data?.id,
    nom: data?.nom,
    imageUrl: data?.imageUrl,
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
        <ShopForm product={addToCart} />
      </section>
    </main>
  );
}
