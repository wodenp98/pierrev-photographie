/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { UserAuth } from "@/lib/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  EmailUpdateFormValues,
  PasswordUpdateFormValues,
  emailUpdateFormSchema,
  passwordUpdateFormSchema,
} from "./ProfilTypes";
import { BsCheck2Circle, BsPencil } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { Button } from "../ui/button";
import { useGetUserByIdQuery } from "@/lib/redux/services/usersApi";
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithPopup,
} from "firebase/auth";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DialogHeader, DialogFooter } from "../ui/dialog";
import { Label } from "@/components/ui/label";

export default function DeleteFormProfil({ userId }: { userId: string }) {
  const {
    user,
    updateEmailUser,
    reauthenticateWithGoogle,
    reauthenticate,
    deleteAccount,
  } = UserAuth();
  const getUser = useGetUserByIdQuery(userId);
  const data = getUser.data;
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const lastSignInTimestamp =
    Date.now() - new Date(user?.metadata.lastSignInTime).getTime();

  const passwordForm = useForm<PasswordUpdateFormValues>({
    resolver: zodResolver(passwordUpdateFormSchema),
    defaultValues: {
      password: "",
    },
    mode: "onChange",
  });

  const handleDeleteAccount = async () => {
    if (user?.providerData[0]?.providerId === "password") {
      setIsPasswordModalOpen(true);
    } else {
      await reauthenticateWithGoogle();
      await deleteAccount();
    }
  };

  const handlePasswordModalSubmit = async (data: PasswordUpdateFormValues) => {
    const credential = EmailAuthProvider.credential(user?.email, data.password);
    await reauthenticate(credential);
    await deleteAccount();
    setIsPasswordModalOpen(false);
  };

  return (
    <>
      <Button className="bg-red-600 text-white" onClick={handleDeleteAccount}>
        Supprimer votre profil
      </Button>

      <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vérification de l'identité requise</DialogTitle>
            <DialogDescription>
              Veuillez entrer votre mot de passe
            </DialogDescription>
          </DialogHeader>

          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(handlePasswordModalSubmit)}
              className="space-y-4"
            >
              <FormField
                control={passwordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Mot de passe"
                        type="password"
                        {...field}
                        disabled={!isEditMode}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />

                    <Button type="submit" className="bg-lightBlack text-white">
                      Confirmer
                    </Button>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
