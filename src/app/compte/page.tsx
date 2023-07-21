/* eslint-disable react/no-unescaped-entities */
"use client";

import { FcGoogle } from "react-icons/fc";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { signIn, signOut, useSession } from "next-auth/react";
import { useGetUserByIdQuery } from "@/lib/redux/services/usersApi";

// si user === logged, link to profil/id
interface UserData {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  id?: string | null | undefined;
}

export default function Compte() {
  const session = useSession();
  const userId = (session.data?.user as UserData)?.id;
  const { data, isLoading, isError } = useGetUserByIdQuery(userId || "");

  // url sort profil/undefined
  if (session) {
    console.log(data?.id);
    
  }

  return (
    <main>
      <ul className="flex ml-6">
        <li className="text-gray-300">Accueil</li>
        <li className="text-gray-300 mx-2">-</li>
        <li>Compte</li>
      </ul>
      <h1 className="ml-6 mt-6 text-4xl">Compte</h1>
      <section className="flex flex-col items-center mt-4">
        <Tabs defaultValue="login" className="w-11/12">
          <TabsList
            className="grid w-full h-10 grid-cols-2"
            style={{ backgroundColor: "rgb(244 244 245)" }}
          >
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="createaccount">Create Account</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you're
                  done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="email" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" defaultValue="password" />
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-20 h-0.5 bg-gray-300 mr-2"></div>
                  <div className="text-md">Ou avec</div>
                  <div className="w-20 h-0.5 bg-gray-300 ml-2"></div>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => signIn("google")}
                >
                  <FcGoogle className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </CardContent>
              <CardFooter>
                <Button className="bg-lightBlack text-white">
                  Save changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="createaccount">
            <Card>
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="nom">Nom</Label>
                  <Input id="nom" defaultValue="nom" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="prenom">Prénom</Label>
                  <Input id="prenom" defaultValue="prenom" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="email" />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" defaultValue="password" />
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-20 h-0.5 bg-gray-300 mr-2"></div>
                  <div className="text-md">Ou avec</div>
                  <div className="w-20 h-0.5 bg-gray-300 ml-2"></div>
                </div>
                <Button variant="outline" className="w-full">
                  <FcGoogle
                    className="mr-2 h-4 w-4"
                    onClick={() => signIn("google")}
                  />
                  Google
                </Button>
              </CardContent>
              <CardFooter>
                <Button className="bg-lightBlack text-white">
                  Save changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
