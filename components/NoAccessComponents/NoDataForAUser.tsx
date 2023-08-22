/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";

export default function NoDataForAUserWishlist({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="flex flex-col items-center mt-4">
      <Card className="w-11/12 h-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-center">
            <p>Vous n'avez pas d'article dans votre {description}</p>
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
