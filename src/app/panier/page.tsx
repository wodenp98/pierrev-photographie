"use client";
import { UserAuth } from "@/lib/context/AuthContext";
import { loadStripe } from "@stripe/stripe-js";
import { BsCreditCard } from "react-icons/bs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import NoDataForAUserWishlist from "@/components/NoAccessComponents/NoDataForAUser";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";

const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`
);

type CartItem = {
  id: string;
  nom: string;
  price: number;
  imageUrl: string;
  format: string;
  rendu: string;
  impression: string;
};

export default function Panier() {
  const { user } = UserAuth();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const cartItem = getCookie("cart");
    if (cartItem) {
      try {
        const parsedCartItem = JSON.parse(cartItem);
        setCart(parsedCartItem);
        setIsPageLoading(false);
      } catch (error) {
        console.error("Error parsing cart item:", error);
      }
    }
    setIsPageLoading(false);
  }, []);

  if (cart.length === 0 && !isPageLoading) {
    return <NoDataForAUserWishlist />;
  }
  const handleDeleteFromCart = (id: string) => {
    const cartCookie = getCookie("cart");
    const cart = cartCookie ? JSON.parse(cartCookie) : [];
    console.log(cart);
    const updatedCart = cart.filter((item: any) => item.id !== id);

    console.log(updatedCart);

    setCookie("cart", JSON.stringify(updatedCart));

    setCart(updatedCart);
  };

  const totalPrice = cart?.reduce((acc, item: any) => acc + item.price, 0);

  const handleCheckout = async () => {
    if (!user) {
      return toast({
        variant: "destructive",
        className: "bg-red-500 text-white",
        title: "Vous devez avoir un compte pour passer commande.",
        action: (
          <Link href={"/compte"}>
            <ToastAction altText="Go to account">Compte</ToastAction>
          </Link>
        ),
      });
    }

    const stripe = await stripePromise;
    const response = await fetch("/api/payment", {
      method: "POST",
      body: JSON.stringify({
        cart: cart,
        userId: user?.uid,
        email: user?.email,
      }),
    });

    const responseData = await response.json();

    const result = await stripe?.redirectToCheckout({
      sessionId: responseData.id,
    });

    if (result?.error) {
      console.log(result.error.message);
    }
  };

  return (
    <main>
      <ul className="flex ml-6">
        <li className="text-gray-300">Accueil</li>
        <li className="text-gray-300 mx-2">-</li>
        <li>Panier</li>
      </ul>
      <h1 className="ml-6 mt-6 text-4xl">Panier</h1>
      <section className="flex flex-col items-center mt-4">
        {isPageLoading ? (
          <Card className="w-11/12 h-96 lg:w-9/12">
            <Skeleton className="w-full h-full bg-zinc-500" />
          </Card>
        ) : (
          <Card className="w-11/12 lg:w-9/12">
            <CardHeader>
              <CardTitle>Vos articles</CardTitle>
            </CardHeader>
            <CardContent>
              {cart?.map((item: any) => (
                <div key={item.id} className="flex mt-5">
                  <div className="flex-shrink-0">
                    <Image
                      key={item.id}
                      src={item.imageUrl}
                      alt={item.nom}
                      width={360}
                      height={360}
                      className="object-cover w-28 h-28 sm:w-36 sm:h-36"
                    />
                  </div>
                  <div className="flex-grow ml-4">
                    <p className="text-sm lg:text-xl font-bold">{item.nom}</p>
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
                  <div className="flex flex-col items-end justify-between ml-4">
                    <span className="text-sm lg:text-xl">{item.price} €</span>
                    <button
                      onClick={() => handleDeleteFromCart(item.id)}
                      className="text-gray-500 text-xs mt-2"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex flex-col">
              <Separator className="my-4 bg-gray-500" />
              <div className="w-full flex justify-between">
                <span className="uppercase font-bold text-lg">Total</span>
                <span className="text-lg">{totalPrice} €</span>
              </div>
              <Button
                className="bg-lightBlack text-white mt-8 w-1/2"
                onClick={handleCheckout}
              >
                <div className="flex items-center justify-center ">
                  <p>Paiement</p>
                  <BsCreditCard className="ml-4 w-5 h-5 text-center" />
                </div>
              </Button>
            </CardFooter>
          </Card>
        )}
      </section>
    </main>
  );
}
