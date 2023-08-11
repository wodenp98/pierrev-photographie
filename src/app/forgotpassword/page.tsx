"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const resetPasswordFormSchema = z.object({
  email: z
    .string()
    .nonempty("Field is required")
    .email({ message: "Must be a valid email" }),
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>;
export default function ForgotPassword() {
  const { resetPassword } = UserAuth();
  const resetPasswordForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });
  const router = useRouter();

  const onSubmitResetPassword = async (data: ResetPasswordFormValues) => {
    console.log(data);
    try {
      await resetPassword(data.email).then(() => {
        toast({
          className: "bg-green-500 text-white",
          title: "Email envoyé",
          duration: 3000,
        });
        router.push("/compte");
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-col">
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Vous souhaitez réinitialiser votre mot de passe ?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...resetPasswordForm}>
          <form
            onSubmit={resetPasswordForm.handleSubmit(onSubmitResetPassword)}
            className="space-y-4 mb-8"
          >
            <FormField
              control={resetPasswordForm.control}
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

            <Button className="bg-lightBlack w-full text-white">
              Envoyer email
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
