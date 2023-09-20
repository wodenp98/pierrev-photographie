/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { BsCartX } from "react-icons/bs";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";

export default function NoDataForAUserWishlist() {
  return (
    <section className="flex flex-col  items-center mt-4">
      <Card className="w-11/12 h-[70vh]">
        <CardHeader>
          <CardTitle>Mon Panier</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center">
          <div className="text-center">
            <BsCartX className="w-20 h-20 mx-auto  text-gray-500" />
            <p className="mt-8">Vous n'avez pas d'article dans votre panier</p>
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/boutique">
            <Button className="bg-lightBlack text-white">Boutique</Button>
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
}
