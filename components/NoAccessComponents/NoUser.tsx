import Link from "next/link";
import { BiUserX } from "react-icons/bi";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function NoUserWishlist() {
  return (
    <section className="flex flex-col items-center mt-4 ">
      <Card className="w-11/12 h-[400px]">
        <CardHeader>
          <CardTitle>Mon Panier</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-center">
            <BiUserX className="w-20 h-20 mx-auto text-gray-500" />
            <p className="mt-8">
              Vous devez avoir un compte pour pouvoir créer un panier
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/compte">
            <Button className="bg-lightBlack text-white">
              Créer un compte ?
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
}
