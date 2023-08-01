"use client";
import NoDataForAUserWishlist from "@/components/WishlistComponents/NoDataForAUserWishlist";
import NoUserWishlist from "@/components/WishlistComponents/NoUserWishlist";
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
import Link from "next/link";

export default function Wishlist() {
  const { user } = UserAuth();
  const { data, isError, isLoading } = useGetWishlistQuery(user?.uid);
  console.log(data);

  if (!user) {
    return <NoUserWishlist />;
  }

  if (data?.length === 0) {
    return <NoDataForAUserWishlist />;
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
              <div key={item.id} className="flex mb-2">
                <div className="relative mr-4 ">
                  <Image
                    src={item.imageUrl}
                    alt={item.nom}
                    width={120}
                    height={80}
                    className="object-cover w-[100px] h-[80px]"
                  />
                  <MdDeleteForever className="font-bold  text-red-500 absolute top-[-4px] right-[-6px]" />
                </div>
                <div className="flex flex-col justify-between flex-wrap w-2/5 mr-6">
                  <h2 className="text-sm">{item.nom}</h2>
                  <p className="text-sm text-gray-500">{item.prix} €</p>
                </div>
                <div className="flex items-end ">
                  <button className="flex items-center justify-center  bg-lightBlack rounded-md h-8 w-8 text-xl text-white">
                    <TbShoppingCartPlus />
                  </button>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            {/* <Link href="/boutique">
              <Button className="bg-lightBlack text-white">Boutique</Button>
            </Link> */}
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
