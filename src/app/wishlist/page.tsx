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
import { useGetWishlistQuery } from "@/lib/redux/services/wishlistApi";

import WishlistItem from "@/components/Wishlist/WishlistItem";

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
                <WishlistItem item={item} userId={user?.uid} />
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
