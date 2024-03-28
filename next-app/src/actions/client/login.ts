"use client";

import * as z from "zod";
import { signIn } from "next-auth/react";
import { LoginSchema } from "@/schemas";
import { loginValidation } from "./login-validation";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  try {
    const validation = await loginValidation(values);

    if (validation?.error) {
      return validation;
    }

    const response = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    if (!response?.ok) {
      return { error: "Invalid password" };
    }

    return { success: "You have been logged in!" };
  } catch (error) {
    return { error: "An error occurred. Please try again." };
  }
};
