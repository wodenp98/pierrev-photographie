/* eslint-disable react/no-unescaped-entities */
"use client";

import CardHistoryItem from "@/components/CardHistoryItem/CardHistoryItem";
import DeleteFormProfil from "@/components/CompteComponents/DeleteFormProfil";
import EmailFormProfil from "@/components/CompteComponents/EmailFormProfil";
import FirstNameFormProfil from "@/components/CompteComponents/FirstNameFormProfil";
import LastNameFormProfil from "@/components/CompteComponents/LastNameFormProfil";
import Image from "next/image";
import PasswordFormProfil from "@/components/CompteComponents/PasswordFormProfil";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { UserAuth } from "@/lib/context/AuthContext";
import { useGetHistoryCommandQuery } from "@/lib/redux/services/historyCommandApi";
import { useGetUserByIdQuery } from "@/lib/redux/services/usersApi";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { CgLogOff } from "react-icons/cg";
import { Skeleton } from "@/components/ui/skeleton";

export default function Compte() {
  const { user, isLoading, logOut } = UserAuth();
  const router = useRouter();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const { data } = useGetUserByIdQuery(user?.uid);
  const { data: historyCommand } = useGetHistoryCommandQuery(user?.uid);

  useEffect(() => {
    if (user) {
      console.log("render if");
      console.log(user, "user if");
      setTimeout(() => setIsPageLoading(false), 2000);
    } else if (!isLoading) {
      console.log("render else");
      console.log(user, "user else");
      router.push("/login");
    }
  }, [user, router, isLoading]);

  const sortedArray = historyCommand
    ?.slice()
    .sort((a, b) => parseInt(b.createdAt) - parseInt(a.createdAt));

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      throw error;
    }
  };

  return (
    <main>
      <ul className="flex ml-6">
        <li className="text-gray-300">Accueil</li>
        <li className="text-gray-300 mx-2">-</li>
        <li>Compte</li>
      </ul>

      <section className="flex flex-col items-center justify-center mt-4">
        {isPageLoading || isLoading ? (
          <div className="flex flex-col items-center justify-center space-y-4 w-full">
            {/* <Skeleton className="w-16 h-16 bg-zinc-500 rounded-full" /> */}
            <Tabs defaultValue="login" className="w-11/12 lg:w-8/12">
              <TabsList
                className="grid w-full h-10 grid-cols-2"
                style={{ backgroundColor: "rgb(244 244 245)" }}
              >
                <Skeleton className="w-full h-full bg-zinc-500" />
              </TabsList>
              <TabsContent value="login">
                <Card>
                  <CardHeader className="h-20">
                    <Skeleton className="w-1/3 h-full bg-zinc-500" />
                  </CardHeader>
                  <CardContent className="h-96">
                    <Skeleton className="w-full h-full bg-zinc-500" />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <>
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
                  className="text-3xl  text-red-500 cursor-pointer absolute bottom-[-5px] right-[-5px]"
                  onClick={handleSignOut}
                />
              </div>
            </div>

            <div className="text-center my-4">Bonjour {data?.firstName} !</div>
            <Tabs defaultValue="informations" className="w-11/12 lg:w-8/12">
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
                    {historyCommand?.length === 0 ? (
                      <div className="flex flex-col items-center text-center">
                        <p>
                          Vous n'avez pas encore effectué d'achat sur notre
                          site!
                        </p>
                        <span>Mais vous pouvez changer ça 😉</span>
                      </div>
                    ) : (
                      sortedArray?.map((command) => (
                        <div key={command.id}>
                          <CardHistoryItem historyCommand={command} />
                          <Separator className="my-4 bg-gray-500 h-[1px]" />
                        </div>
                      ))
                    )}
                  </CardContent>
                  <CardFooter>
                    <Link href="/boutique">
                      <Button className="bg-lightBlack text-white">
                        BOUTIQUE
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </section>
    </main>
  );
}
