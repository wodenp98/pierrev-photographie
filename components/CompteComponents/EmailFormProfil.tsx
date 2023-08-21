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

  // si provider = google on peut pas modifier l'email

  const onSubmitLogin = async (data: EmailUpdateFormValues) => {
    if (data.email !== user?.email) {
      setIsPasswordModalOpen(true);
    } else {
      console.log("error");
    }
  };

  // reproduire comme pour le email
  const handlePasswordModalSubmit = async (data: PasswordUpdateFormValues) => {
    const credential = EmailAuthProvider.credential(user?.email, data.password);
    await reauthenticate(credential);

    // emailForm.getValues("email")
    await updateEmailUser(user.email).then(() => {
      getUser.refetch();
    });

    setIsEditMode(false);
    setIsPasswordModalOpen(false); // Fermer la modal après la confirmation
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
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>Please enter your password</DialogDescription>
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

                    <Button type="submit">Confirmer</Button>
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