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

export const RegisterSchema = z.object({
  name: z.string().min(2, { message: "Name is too small" }),
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
