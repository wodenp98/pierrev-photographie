/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { UserAuth } from "@/lib/context/AuthContext";

export default function Login() {
  const { googleSignIn } = UserAuth();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      throw error;
    }
  };

  return (
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
                onClick={handleSignIn}
              >
                <FcGoogle className="mr-2 h-4 w-4" />
                Google
              </Button>
            </CardContent>
            <CardFooter>
              <Button className="bg-lightBlack text-white">Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="createaccount">
          <Card>
            <CardHeader>
              <CardTitle>Create Account</CardTitle>
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
                <FcGoogle className="mr-2 h-4 w-4" />
                Google
              </Button>
            </CardContent>
            <CardFooter>
              <Button className="bg-lightBlack text-white">Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
