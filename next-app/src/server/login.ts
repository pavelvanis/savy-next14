"use server";

import * as z from "zod";
import { signIn } from "next-auth/react";

import { LoginSchema } from "@/schemas";
import { connectDB } from "@/lib/connect-db";
import { UserModel } from "@/database/models";
import { DEFAULT_LOGIN_REDIRECT } from "@/config/routes";

/**
 * Asynchronously logs in a user.
 *
 * @param {Object} values - The user's login information. The object structure is inferred from the `LoginSchema`.
 * @param {string} [callbackUrl=null] - A URL to redirect to after successful login. If not provided, the user is redirected to the `DEFAULT_LOGIN_REDIRECT` URL.
 *
 * @returns {Promise<Object>} If the validation fails, it returns a promise that resolves to an object with a `errors` property, which is an object containing the validation errors.
 * If the user does not exist, it returns a promise that resolves to an object with a `message` property with the value "User does not exist!".
 * If the login is successful, it does not return anything.
 */
export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    const {
      fieldErrors: { ...errors },
    } = validatedFields.error.flatten();

    return { errors: errors };
  }

  await connectDB();

  const { email, password } = validatedFields.data;

  const existingUser = await UserModel.findOne({
    email,
  });

  if (!existingUser || !existingUser.password) {
    return { message: "User does not exist!" };
  }

  await signIn("credentials", {
    email,
    password,
    redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
  });
};
