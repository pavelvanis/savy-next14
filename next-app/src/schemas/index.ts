import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z
    .string()
    .min(4, {
      message: "Password is too small",
    })
    .max(100, { message: "Password is too long" }),
});

export const RegisterSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name is too small" })
      .max(100, "First name is too long"),
    lastName: z
      .string()
      .min(2, { message: "Last name is too small" })
      .max(100, "Last name is too long"),
    email: z.string().email({
      message: "Email is required",
    }),
    password: z
      .string()
      .min(4, {
        message: "Password is too small",
      })
      .max(100, { message: "Password is too long" }),
    confirmPassword: z
      .string()
      .min(4, "You must confirm your password")
      .max(100, "Password is too long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
