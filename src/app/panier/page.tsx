"use client";
import { UserAuth } from "@/lib/context/AuthContext";
import { BsCreditCard } from "react-icons/bs";
import {
  useGetCartQuery,
  useDeleteToCartMutation,
} from "@/lib/redux/services/cartApi";
import CartItem from "@/components/CartItem/CartItem";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import NoUserWishlist from "@/components/NoAccessComponents/NoUser";
import NoDataForAUserWishlist from "@/components/NoAccessComponents/NoDataForAUser";

export default function Panier() {
  const { user } = UserAuth();
  const { data: userCart, isError, isLoading } = useGetCartQuery(user?.uid);

  if (!userCart) {
    return (
      <NoUserWishlist
        title="Mon panier"
        description="pouvoir créer un panier"
      />
    );
  }

  if (userCart?.length === 0) {
    return <NoDataForAUserWishlist title="Mon panier" description="panier" />;
  }

  const totalPrice = userCart?.reduce((acc, item) => acc + item.price, 0);

  return (
    <main>
      <ul className="flex ml-6">
        <li className="text-gray-300">Accueil</li>
        <li className="text-gray-300 mx-2">-</li>
        <li>Panier</li>
      </ul>
      <h1 className="ml-6 mt-6 text-4xl">Panier</h1>
      <section className="flex flex-col items-center mt-4">
        <Card className="w-11/12">
          <CardHeader>
            <CardTitle>Vos articles</CardTitle>
          </CardHeader>
          <CardContent>
            {userCart?.map((item) => (
              <CartItem item={item} key={item.id} id={user.uid} />
            ))}
          </CardContent>
          <CardFooter className="flex flex-col">
            <Separator className="my-4 bg-gray-500" />
            <div className="w-full flex justify-between">
              <span className="uppercase font-bold text-lg">Total</span>
              <span className="text-lg">{totalPrice} €</span>
            </div>
            <Button className="bg-lightBlack text-white mt-8 w-1/2">
              <div className="flex items-center justify-center ">
                <p>Paiement</p>
                <BsCreditCard className="ml-4 w-5 h-5 text-center" />
              </div>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}
