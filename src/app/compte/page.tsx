"use client";

// import Profil from "@/components/CompteComponents/Profil";
import Login from "@/components/CompteComponents/Login";
import { UserAuth } from "@/lib/context/AuthContext";
import { redirect } from "next/navigation";

export default function Compte() {
  const { user } = UserAuth();

  return (
    <main>
      <ul className="flex ml-6">
        <li className="text-gray-300">Accueil</li>
        <li className="text-gray-300 mx-2">-</li>
        <li>Compte</li>
      </ul>
      <h1 className="ml-6 mt-6 text-4xl">Compte</h1>

      {!user ? <Login /> : redirect("/profil")}
    </main>
  );
}
