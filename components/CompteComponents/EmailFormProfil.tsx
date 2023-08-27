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

export default function EmailFormProfil({ userId }: { userId: string }) {
  const { user, updateEmailUser, reauthenticateWithGoogle, reauthenticate } =
    UserAuth();
  const getUser = useGetUserByIdQuery(userId);
  const data = getUser.data;
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const emailForm = useForm<EmailUpdateFormValues>({
    resolver: zodResolver(emailUpdateFormSchema),
    defaultValues: {
      email: data?.email,
    },
    mode: "onChange",
  });

  const passwordForm = useForm<PasswordUpdateFormValues>({
    resolver: zodResolver(passwordUpdateFormSchema),
    defaultValues: {
      password: "",
    },
    mode: "onChange",
  });

  const lastSignInTimestamp =
    Date.now() - new Date(user?.metadata.lastSignInTime).getTime();

  if (lastSignInTimestamp <= 60 * 60 * 1000) {
    console.log("oui");
  } else {
    console.log("non");
  }

  // reauthenticatewithgoogle

  const onSubmitLogin = async (data: EmailUpdateFormValues) => {
    if (data.email !== user?.email) {
      if (lastSignInTimestamp <= 60 * 60 * 1000) {
        console.log("oui");
        await updateEmailUser(data.email).then(() => {
          getUser.refetch();
        });

        setIsEditMode(false);
      } else {
        setIsPasswordModalOpen(true);
      }
    } else {
      console.log("error");
    }
  };

  const handlePasswordModalSubmit = async (data: PasswordUpdateFormValues) => {
    const credential = EmailAuthProvider.credential(user?.email, data.password);
    await reauthenticate(credential);

    await updateEmailUser(emailForm.getValues("email")).then(() => {
      getUser.refetch();
    });

    setIsEditMode(false);
    setIsPasswordModalOpen(false);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <Form {...emailForm}>
      <form
        onSubmit={emailForm.handleSubmit(onSubmitLogin)}
        className="space-y-4"
      >
        <FormField
          control={emailForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="flex">
                  <Input
                    className="w-10/12"
                    placeholder={data?.email}
                    {...field}
                    disabled={!isEditMode}
                  />
                  {isEditMode ? (
                    <>
                      <Button
                        className="w-2/12 text-red-600"
                        onClick={toggleEditMode}
                      >
                        <MdOutlineCancel />
                      </Button>
                      <Button className=" w-2/12 text-green-600" type="submit">
                        <BsCheck2Circle />
                      </Button>
                    </>
                  ) : (
                    <Button
                      className=" w-2/12 text-lightBlack"
                      onClick={toggleEditMode}
                    >
                      <BsPencil />
                    </Button>
                  )}
                </div>
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
      </form>

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
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                    <div className="flex justify-center">
                      <Button
                        type="submit"
                        className="bg-lightBlack text-white w-1/4 mt-2"
                      >
                        Confirmer
                      </Button>
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </Form>
  );
}
