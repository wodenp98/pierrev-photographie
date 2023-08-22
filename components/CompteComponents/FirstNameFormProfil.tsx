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
  FirstNameUpdateFormValues,
  firstNameUpdateFormSchema,
} from "./ProfilTypes";
import { BsCheck2Circle, BsPencil } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { Button } from "../ui/button";
import { useGetUserByIdQuery } from "@/lib/redux/services/usersApi";
import { useState } from "react";

export default function EmailFormProfil({ userId }: { userId: string }) {
  const { user, updateFirstNameUser } = UserAuth();
  const getUser = useGetUserByIdQuery(userId);
  const data = getUser.data;

  const emailForm = useForm<FirstNameUpdateFormValues>({
    resolver: zodResolver(firstNameUpdateFormSchema),
    defaultValues: {
      firstName: data?.firstName,
    },
    mode: "onChange",
  });
  const [isEditMode, setIsEditMode] = useState(false);

  // require recent login meme apres peu de temps de co?
  const onSubmitLogin = async (data: FirstNameUpdateFormValues) => {
    if (data.firstName !== user?.displayName.split(" ")[0]) {
      await updateFirstNameUser(data.firstName).then(() => {
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
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <div className="flex">
                  <Input
                    className="w-10/12"
                    placeholder={data?.firstName}
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
