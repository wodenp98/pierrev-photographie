/* eslint-disable react/no-unescaped-entities */
"use client";
import { CgLogOff } from "react-icons/cg";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { UserAuth } from "@/lib/context/AuthContext";
import { useGetUserByIdQuery } from "@/lib/redux/services/usersApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import EmailFormProfil from "@/components/CompteComponents/EmailFormProfil";
import FirstNameFormProfil from "@/components/CompteComponents/FirstNameFormProfil";
import LastNameFormProfil from "@/components/CompteComponents/LastNameFormProfil";
import PasswordFormProfil from "@/components/CompteComponents/PasswordFormProfil";
import DeleteFormProfil from "@/components/CompteComponents/DeleteFormProfil";

export default function Profil() {
  const router = useRouter();
  const { user, logOut, deleteAccount } = UserAuth();
  const { data, isLoading } = useGetUserByIdQuery(user?.uid);

  console.log(user);

  useEffect(() => {
    if (!user) {
      router.push("/compte");
    }
  }, [user, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
    } catch (error) {
      throw error;
    }
  };

  return (
    <section className="flex flex-col items-center mt-4">
      <div className="flex items-end justify-end">
        <div className="relative">
          <Image
            src={data?.image ?? "/photo-utilisateur.jpg"}
            alt="Photo de profil"
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
          <CgLogOff
            className="text-3xl  text-red-500 absolute bottom-[-5px] right-[-5px]"
            onClick={handleSignOut}
          />
        </div>
      </div>

      <div className="text-center my-4">Bonjour {data?.firstName} !</div>
      <Tabs defaultValue="informations" className="w-11/12">
        <TabsList
          className="grid w-full h-10 grid-cols-2"
          style={{ backgroundColor: "rgb(244 244 245)" }}
        >
          <TabsTrigger value="informations">Informations</TabsTrigger>
          <TabsTrigger value="commandes">Commandes</TabsTrigger>
        </TabsList>
        <TabsContent value="informations">
          <Card>
            <CardHeader className="flex flex-col">
              <CardTitle>Informations Personnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <EmailFormProfil userId={user?.uid} />
              <LastNameFormProfil userId={user?.uid} />
              <FirstNameFormProfil userId={user?.uid} />
              {user?.providerData[0].providerId === "password" && (
                <PasswordFormProfil userId={user?.uid} />
              )}
            </CardContent>
            <CardFooter>
              <DeleteFormProfil userId={user?.uid} />
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="commandes">
          <Card>
            <CardHeader>
              <CardTitle>Commandes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* data? aucune commande : previous commande */}
              <div className="flex flex-col items-center text-center">
                <p>Vous n'avez pas encore effectué d'achat sur notre site!</p>
                <span>Mais vous pouvez changer ça 😉</span>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/boutique">
                <Button className="bg-lightBlack text-white">BOUTIQUE</Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
