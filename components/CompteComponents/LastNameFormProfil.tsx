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
import { useForm } from "react-hook-form";
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
  emailUpdateFormSchema,
  lastNameUpdateFormSchema,
  LastNameUpdateFormValues,
} from "./ProfilTypes";
import { BsCheck2Circle, BsPencil } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { Button } from "../ui/button";
import { useGetUserByIdQuery } from "@/lib/redux/services/usersApi";

export default function EmailFormProfil({ userId }: { userId: string }) {
  const { user, updateLastNameUser } = UserAuth();
  const getUser = useGetUserByIdQuery(userId);
  const data = getUser.data;

  const emailForm = useForm<LastNameUpdateFormValues>({
    resolver: zodResolver(lastNameUpdateFormSchema),
    defaultValues: {
      lastName: data?.lastName,
    },
    mode: "onChange",
  });
  const [isEditMode, setIsEditMode] = useState(false);

  // require recent login meme apres peu de temps de co?
  const onSubmitLogin = async (data: LastNameUpdateFormValues) => {
    if (data.lastName !== user?.displayName.split(" ")[1]) {
      await updateLastNameUser(data.lastName).then(() => {
        getUser.refetch();
      });
      setIsEditMode(false);
    } else {
      console.log("error");
    }
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
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <div className="flex">
                  <Input
                    className="w-10/12"
                    placeholder={data?.lastName}
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
    </Form>
  );
}
