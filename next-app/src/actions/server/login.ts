"use server";

import * as z from "zod";
import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";
import { LoginSchema } from "@/schemas";
import { connectDB } from "@/lib/connect-db";
import { UserModel } from "@/database/models";
import { DEFAULT_LOGIN_REDIRECT } from "@/config/routes";
import {
  isRedirectError,
  redirect,
} from "next/dist/client/components/redirect";

export const login = async (credentials: z.infer<typeof LoginSchema>) => {
  try {
    const validatedFields = LoginSchema.safeParse(credentials);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    await connectDB();

    const { email } = validatedFields.data;

    const existingUser = await UserModel.findOne({
      email,
    });

    if (!existingUser) {
      return { error: "User with this email does not exist!" };
    }

    return await signIn("credentials", {
      ...credentials,
      redirectTo: "/",
    });
  } catch (error) {
    if (isRedirectError(error)) {
      redirect(DEFAULT_LOGIN_REDIRECT);
    }
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid password!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    return { error: "An error occurred. Please try again." };
  }
};
