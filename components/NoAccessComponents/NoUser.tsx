import Link from "next/link";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function NoUserWishlist({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="flex flex-col items-center mt-4 ">
      <Card className="w-11/12">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-center">
            <p>Vous devez avoir un compte pour {description}</p>
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
