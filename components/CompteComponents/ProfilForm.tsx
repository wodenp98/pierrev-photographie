"use client";

import { BsPencil, BsCheck2Circle } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { UserAuth } from "@/lib/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  EmailUpdateFormValues,
  LastNameUpdateFormValues,
  emailUpdateFormSchema,
  lastNameUpdateFormSchema,
  passwordUpdateFormSchema,
  PasswordUpdateFormValues,
  firstNameUpdateFormSchema,
  FirstNameUpdateFormValues,
} from "./ProfilTypes";
import { $CombinedState } from "@reduxjs/toolkit";

type ProfilFormValues = {
  defaultEmail: string | undefined;
  defaultLastName: string | undefined;
  defaultFirstName: string | undefined;
};

export default function ProfilForm({
  defaultLastName,
  defaultEmail,
  defaultFirstName,
}: ProfilFormValues) {
  const { user } = UserAuth();
  const [isEditMode, setIsEditMode] = useState(false);

  const emailUpdateForm = useForm<EmailUpdateFormValues>({
    resolver: zodResolver(emailUpdateFormSchema),
    defaultValues: {
      email: defaultEmail,
    },
    mode: "onChange",
  });

  const lastNameUpdateForm = useForm<LastNameUpdateFormValues>({
    resolver: zodResolver(lastNameUpdateFormSchema),
    defaultValues: {
      lastName: defaultLastName,
    },
    mode: "onChange",
  });

  const firstNameUpdateForm = useForm<FirstNameUpdateFormValues>({
    resolver: zodResolver(firstNameUpdateFormSchema),
    defaultValues: {
      firstName: defaultFirstName,
    },
    mode: "onChange",
  });

  const passwordUpdateForm = useForm<PasswordUpdateFormValues>({
    resolver: zodResolver(passwordUpdateFormSchema),
    defaultValues: {
      password: "",
    },
    mode: "onChange",
  });

  const onSubmitEmailUpdate = async (data: EmailUpdateFormValues) => {
    console.log(data);
  };

  const onSubmitLastNameUpdate = async (data: LastNameUpdateFormValues) => {
    console.log(data);
  };

  const onSubmitFirstNameUpdate = async (data: FirstNameUpdateFormValues) => {
    console.log(data);
  };

  const onSubmitPasswordUpdate = async (data: PasswordUpdateFormValues) => {
    console.log(data);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <CardContent className="space-y-2">
      <Form {...emailUpdateForm}>
        <form
          onSubmit={emailUpdateForm.handleSubmit(onSubmitEmailUpdate)}
          className="space-y-4 mb-8"
        >
          <FormField
            control={emailUpdateForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder={defaultEmail}
                    {...field}
                    disabled={!isEditMode}
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          {isEditMode ? (
            <>
              <Button
                className="bg-red-600 w-full text-white"
                onClick={toggleEditMode}
              >
                <MdOutlineCancel />
              </Button>
              <Button className="bg-green-500 w-full text-white" type="submit">
                <BsCheck2Circle />
              </Button>
            </>
          ) : (
            <Button
              className="bg-lightBlack w-full text-white"
              onClick={toggleEditMode}
            >
              <BsPencil />
            </Button>
          )}
        </form>
      </Form>

      <Form {...lastNameUpdateForm}>
        <form
          onSubmit={lastNameUpdateForm.handleSubmit(onSubmitLastNameUpdate)}
          className="space-y-4 mb-8"
        >
          <FormField
            control={lastNameUpdateForm.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input
                    placeholder={defaultLastName}
                    {...field}
                    disabled={!isEditMode}
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          {isEditMode ? (
            <>
              <Button
                className="bg-red-600 w-full text-white"
                onClick={toggleEditMode}
              >
                <MdOutlineCancel />
              </Button>
              <Button className="bg-green-500 w-full text-white" type="submit">
                <BsCheck2Circle />
              </Button>
            </>
          ) : (
            <Button
              className="bg-lightBlack w-full text-white"
              onClick={toggleEditMode}
            >
              <BsPencil />
            </Button>
          )}
        </form>
      </Form>

      <Form {...firstNameUpdateForm}>
        <form
          onSubmit={firstNameUpdateForm.handleSubmit(onSubmitFirstNameUpdate)}
          className="space-y-4 mb-8"
        >
          <FormField
            control={firstNameUpdateForm.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input
                    placeholder={defaultFirstName}
                    {...field}
                    disabled={!isEditMode}
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
        </form>
      </Form>

      {user.providerData[0].providerId === "password" && (
        <Form {...passwordUpdateForm}>
          <form
            onSubmit={passwordUpdateForm.handleSubmit(onSubmitPasswordUpdate)}
            className="space-y-4 mb-8"
          >
            <FormField
              control={passwordUpdateForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shadcn"
                      {...field}
                      disabled={!isEditMode}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      )}
    </CardContent>
  );
}
