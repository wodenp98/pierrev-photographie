"use client";

import { CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { UserAuth } from "@/lib/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetUserByIdQuery } from "@/lib/redux/services/usersApi";
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
import { GenericForm } from "./GenericForm";

export default function ProfilForm({ userId }: { userId: string }) {
  const { user } = UserAuth();
  const { data, isLoading } = useGetUserByIdQuery(userId);

  const emailUpdateForm = useForm<EmailUpdateFormValues>({
    resolver: zodResolver(emailUpdateFormSchema),
    defaultValues: {
      email: data?.email,
    },
    mode: "onChange",
  });

  const lastNameUpdateForm = useForm<LastNameUpdateFormValues>({
    resolver: zodResolver(lastNameUpdateFormSchema),
    defaultValues: {
      lastName: data?.lastName,
    },
    mode: "onChange",
  });

  const firstNameUpdateForm = useForm<FirstNameUpdateFormValues>({
    resolver: zodResolver(firstNameUpdateFormSchema),
    defaultValues: {
      firstName: data?.firstName,
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
    console.log("email", data);
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

  return (
    <CardContent className="space-y-2">
      <GenericForm
        defaultValue={data?.email}
        form={emailUpdateForm}
        onSubmit={onSubmitEmailUpdate}
        label="Email"
        name="email"
      />
      <GenericForm
        defaultValue={data?.lastName}
        form={lastNameUpdateForm}
        onSubmit={onSubmitLastNameUpdate}
        label="Nom"
        name="lastName"
      />
      <GenericForm
        defaultValue={data?.firstName}
        form={firstNameUpdateForm}
        onSubmit={onSubmitFirstNameUpdate}
        label="Prénom"
        name="firstName"
      />

      {user.providerData[0].providerId === "password" && (
        <GenericForm
          defaultValue="password"
          form={passwordUpdateForm}
          onSubmit={onSubmitPasswordUpdate}
          label="Mot de passe"
          name="password"
        />
      )}
    </CardContent>
  );
}
