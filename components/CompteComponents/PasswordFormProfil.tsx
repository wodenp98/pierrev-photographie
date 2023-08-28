/* eslint-disable react/no-unescaped-entities */
import { Input } from "../ui/input";
import { UserAuth } from "@/lib/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  PasswordUpdateFormValues,
  passwordUpdateFormSchema,
} from "./ProfilTypes";
import { BsCheck2Circle, BsPencil } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { Button } from "../ui/button";
import { useGetUserByIdQuery } from "@/lib/redux/services/usersApi";
import { useState } from "react";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { EmailAuthProvider } from "firebase/auth";

export default function PasswordFormProfil({ userId }: { userId: string }) {
  const { user, updatePasswordUser, reauthenticateWithGoogle, reauthenticate } =
    UserAuth();
  const getUser = useGetUserByIdQuery(userId);
  const data = getUser.data;
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const emailForm = useForm<PasswordUpdateFormValues>({
    resolver: zodResolver(passwordUpdateFormSchema),
    defaultValues: {
      password: "",
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

  const onSubmitLogin = async (data: PasswordUpdateFormValues) => {
    if (lastSignInTimestamp <= 60 * 60 * 1000) {
      await updatePasswordUser(data.password).then(() => {
        getUser.refetch();
      });

      setIsEditMode(false);
    } else {
      setIsPasswordModalOpen(true);
    }
  };

  const handlePasswordModalSubmit = async (data: PasswordUpdateFormValues) => {
    const credential = EmailAuthProvider.credential(user?.email, data.password);
    await reauthenticate(credential);

    // emailForm.getValues("email")
    await updatePasswordUser(passwordForm.getValues("password")).then(() => {
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <div className="flex">
                  <Input
                    className="w-10/12"
                    placeholder="Mot de passe"
                    type="password"
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
    </Form>
  );
}
