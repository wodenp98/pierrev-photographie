/* eslint-disable react/no-unescaped-entities */

import { CgLogOff } from "react-icons/cg";
import { BsPencil } from "react-icons/bs";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import Image from "next/image";
import Link from "next/link";
import { UserAuth } from "@/lib/context/AuthContext";
import { $CombinedState } from "@reduxjs/toolkit";

export default function Profil() {
  const { user, logOut, deleteAccount } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex flex-col items-center mt-4">
      <div className="flex items-end justify-end">
        <div className="relative">
          <Image
            src={user.photoURL as string}
            alt={user.displayName as string}
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

      <div className="text-center my-4">Bonjour {user.displayName} !</div>
      <Tabs defaultValue="informations" className="w-11/12">
        <TabsList
          className="grid w-full h-10 grid-cols-3"
          style={{ backgroundColor: "rgb(244 244 245)" }}
        >
          <TabsTrigger value="informations">Informations</TabsTrigger>
          <TabsTrigger value="commandes">Commandes</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
        </TabsList>
        <TabsContent value="informations">
          <Card>
            <CardHeader className="flex justify-between">
              <CardTitle>Informations personnelles</CardTitle>
              <BsPencil className="text-2xl" />
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="nom">Nom</Label>
                {/* <Input id="nom" defaultValue={lastName} /> */}
              </div>
              <div className="space-y-1">
                <Label htmlFor="prenom">Prénom</Label>
                {/* <Input id="prenom" defaultValue={firstName} /> */}
              </div>
              <div className="space-y-1">
                <Label htmlFor="numero">Numéro</Label>
                <Input id="numero" defaultValue="numero" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                {/* <Input id="email" defaultValue={email} /> */}
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Mot de passe</Label>
                <Input id="password" defaultValue="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="address">Adresse</Label>
                <Input id="address" defaultValue="address" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="codepostal">Code Postal</Label>
                <Input id="codepostal" defaultValue="codepostal" />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="bg-red-600 text-white"
                onClick={handleDeleteAccount}
              >
                Supprimer votre profil
              </Button>
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
        <TabsContent value="wishlist">
          <Card>
            <CardHeader>
              <CardTitle>Wishlist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* data? aucune wishlist : la wishlist */}
              <div className="flex flex-col items-center">
                <p>Vous n'avez pas de wishlist!</p>
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