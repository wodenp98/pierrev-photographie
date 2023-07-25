/* eslint-disable react/no-unescaped-entities */
"use client";

import { signOut, useSession } from "next-auth/react";
import { DefaultSession } from "next-auth";
import { CgLogOff } from "react-icons/cg";
import { BsPencil } from "react-icons/bs";
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

import {
  useGetUserByIdQuery,
  useDeleteUserByIdMutation,
} from "@/lib/redux/services/usersApi";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import Profil from "@/components/Profil/Profil";

interface DefaultSessionWithId extends DefaultSession {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}
export default function Compte() {
  const { data: session, status } = useSession();
  const dataWithProps = session as DefaultSessionWithId;

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <main>
      <ul className="flex ml-6">
        <li className="text-gray-300">Accueil</li>
        <li className="text-gray-300 mx-2">-</li>
        <li>Compte</li>
      </ul>
      <h1 className="ml-6 mt-6 text-4xl">Compte</h1>
      <Profil propsId={dataWithProps.user.id} />
    </main>
  );
}
