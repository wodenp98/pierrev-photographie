"use client";
import Link from "next/link";
import NoDataForAUserWishlist from "@/components/NoAccessComponents/NoDataForAUser";
import NoUserWishlist from "@/components/NoAccessComponents/NoUser";
import Image from "next/image";
import { TbShoppingCartPlus } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { UserAuth } from "@/lib/context/AuthContext";
import {
  useGetWishlistQuery,
  useDeleteToWishlistMutation,
} from "@/lib/redux/services/wishlistApi";

export default function Wishlist() {
  const { user } = UserAuth();
  const { data, isError, isLoading } = useGetWishlistQuery(user?.uid);

  if (!user) {
    return (
      <NoUserWishlist
        title="Ma Wishlist"
        description="pouvoir créer une wishlist"
      />
    );
  }

  if (data?.length === 0) {
    return (
      <NoDataForAUserWishlist title="Ma Wishlist" description="wishlist" />
    );
  }

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
        <li>Wishlist</li>
      </ul>
      <section className="flex flex-col items-center mt-4">
        <Card className="w-11/12">
          <CardHeader>
            <CardTitle>Ma Wishlist</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col">
            {data?.map((item) => (
              <Link key={item.id} href={`/boutique/${item.id}`}>
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
                    <p className="text-sm text-gray-500">{item.prix} €</p>
                  </div>
                  <div className="flex items-end">
                    <MdDeleteForever className="font-bold text-xl  text-red-500" />
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
          <CardFooter>
            <Link href="/boutique">
              <Button className="bg-lightBlack text-white">Boutique</Button>
            </Link>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}

{
  /* <div className="flex flex-col  ">
<h2 className="text-base">{item.nom}</h2>
<p className="text-sm text-gray-500">{item.prix} €</p>
</div>

<div className="flex flex-col justify-between items-end">
<Button className="bg-lightBlack text-white w-auto h-auto">
  <TbShoppingCartPlus />
</Button>
<Button className="bg-red-600 text-white w-auto h-auto">
  <MdDeleteForever />
</Button>
</div> */
}
