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
  PasswordUpdateFormValues,
  passwordUpdateFormSchema,
} from "./ProfilTypes";
import { BsCheck2Circle, BsPencil } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { Button } from "../ui/button";
import { useGetUserByIdQuery } from "@/lib/redux/services/usersApi";
import { useState } from "react";

export default function PasswordFormProfil({ userId }: { userId: string }) {
  const { user, updatePasswordUser } = UserAuth();
  const getUser = useGetUserByIdQuery(userId);
  const data = getUser.data;

  const emailForm = useForm<PasswordUpdateFormValues>({
    resolver: zodResolver(passwordUpdateFormSchema),
    defaultValues: {
      password: "",
    },
    mode: "onChange",
  });
  const [isEditMode, setIsEditMode] = useState(false);

  // require recent login meme apres peu de temps de co?
  const onSubmitLogin = async (data: PasswordUpdateFormValues) => {
    await updatePasswordUser(data.password);
    setIsEditMode(false);
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
    </Form>
  );
}
