/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
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
import { toast } from "@/components/ui/use-toast";
import { redirect, useRouter } from "next/navigation";

const profileFormSchema = z
  .object({
    firstName: z
      .string()
      .nonempty("Field is required")
      .regex(/[a-zA-Z]/, {
        message: "Must be a valid first name",
      }),
    lastName: z
      .string()
      .nonempty("Field is required")
      .regex(/[a-zA-Z]/, {
        message: "Must be a valid last name",
      }),
    email: z
      .string()
      .nonempty("Field is required")
      .email({ message: "Must be a valid email" }),
    password: z
      .string()
      .refine(
        (value) =>
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[`~<>?,./!@#$%^&*()\[\];:\\-_+="'|{}]).{8,}$/.test(
            value
          ),
        {
          message: ` Must contain at least 8 characters, one uppercase, one lowercase, one number and one special character`,
        }
      ),

    confirmPassword: z
      .string()
      .refine(
        (value) =>
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[`~<>?,./!@#$%^&*()\[\];:\\-_+="'|{}]).{8,}$/.test(
            value
          ),
        {
          message: ` Must contain at least 8 characters, one uppercase, one lowercase, one number and one special character`,
        }
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmpassword"],
  });

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const loginFormSchema = z.object({
  email: z
    .string()
    .nonempty("Field is required")
    .email({ message: "Must be a valid email" }),
  password: z
    .string()
    .refine(
      (value) =>
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[`~<>?,./!@#$%^&*()\[\];:\\-_+="'|{}]).{8,}$/.test(
          value
        ),
      {
        message: ` Must contain at least 8 characters, one uppercase, one lowercase, one number and one special character`,
      }
    ),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function Login() {
  const { user, createUser, googleSignIn, signIn, isLoading } = UserAuth();
  const router = useRouter();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      router.push("/compte");
    }
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      await createUser(
        data.email,
        data.password,
        data.firstName,
        data.lastName
      );
      toast({
        className: "bg-green-500 text-white",
        title: "User created",
        duration: 3000,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitLogin = async (data: LoginFormValues) => {
    await signIn(data.email, data.password);
  };

  const handleSignIn = () => {
    googleSignIn();
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
              <Form {...loginForm}>
                <form
                  onSubmit={loginForm.handleSubmit(onSubmitLogin)}
                  className="space-y-4 mb-8"
                >
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mot de passe</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="shadcn"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />
                  <Link href="/forgotpassword">
                    <p className="text-xs text-gray-600 underline cursor-pointer mt-4">
                      Mot de passe oublié?
                    </p>
                  </Link>
                  <Button
                    className="bg-lightBlack w-full text-white"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Se connecter"}
                  </Button>
                </form>
              </Form>
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
          </Card>
        </TabsContent>
        <TabsContent value="createaccount">
          <Card>
            <CardHeader>
              <CardTitle>Create Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 mb-8"
                >
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mot de passe</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="shadcn"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmez votre mot de passe</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="shadcn"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />

                  <Button className="bg-lightBlack w-full text-white">
                    Save changes
                  </Button>
                </form>
              </Form>
              <div className="flex items-center justify-center ">
                <div className="w-20 h-0.5 bg-gray-300 mr-2"></div>
                <div className="text-md">Ou avec</div>
                <div className="w-20 h-0.5 bg-gray-300 ml-2"></div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <FcGoogle className="mr-2 h-4 w-4" />
                Google
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
