"use client";
import { z } from "zod";

export const emailUpdateFormSchema = z.object({
  email: z
    .string()
    .nonempty("Field is required")
    .email({ message: "Must be a valid email" }),
});
export type EmailUpdateFormValues = z.infer<typeof emailUpdateFormSchema>;

export const lastNameUpdateFormSchema = z.object({
  lastName: z
    .string()
    .nonempty("Field is required")
    .regex(/[a-zA-Z]/, {
      message: "Must be a valid last name",
    }),
});

export type LastNameUpdateFormValues = z.infer<typeof lastNameUpdateFormSchema>;

export const firstNameUpdateFormSchema = z.object({
  firstName: z
    .string()
    .nonempty("Field is required")
    .regex(/[a-zA-Z]/, {
      message: "Must be a valid first name",
    }),
});

export type FirstNameUpdateFormValues = z.infer<
  typeof firstNameUpdateFormSchema
>;

export const passwordUpdateFormSchema = z.object({
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

export type PasswordUpdateFormValues = z.infer<typeof passwordUpdateFormSchema>;
