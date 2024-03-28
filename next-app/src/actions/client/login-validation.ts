"use server";

import * as z from "zod";

import { LoginSchema } from "@/schemas";
import { connectDB } from "@/lib/connect-db";
import { UserModel } from "@/database/models";

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
export const loginValidation = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  try {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    await connectDB();

    const { email } = validatedFields.data;

    const existingUser = await UserModel.findOne({
      email,
    });

    if (!existingUser || !existingUser.password) {
      return { error: "User does not exist!" };
    }

    return 
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong!" };
  }
};
