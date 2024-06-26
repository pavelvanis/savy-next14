"use server";

import * as z from "zod";
import { signin } from "./signin";
import { sanitize } from "@/lib/api";
import { RegisterSchema } from "@/schemas";
import { connectDB } from "@/lib/connect-db";
import { UserModel } from "@/database/models";
import {
  isRedirectError,
  redirect,
} from "next/dist/client/components/redirect";
import { DEFAULT_LOGIN_REDIRECT } from "@/config/routes";
import { createPermanentUser } from "@/actions/server/data/user";

/**
 * This server action is used to register a new user.
 * @param values - An object containing the user's information. It should match the shape of the RegisterSchema.
 * @returns An object indicating the success or failure of the registration process.
 */
export const registration = async (values: z.infer<typeof RegisterSchema>) => {
  try {
    // Zod validation
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    // Sanitation
    const sanitizedFields = sanitize(validatedFields.data);

    const { email } = sanitizedFields;

    // Connect to database
    await connectDB();

    // Check if user exist in database
    const existingUser = await UserModel.findOne({
      email,
    });

    if (existingUser) {
      return { error: "User with this email is already exist!" };
    }

    // Create permanent user (Tink API)
    const permanentUser = await createPermanentUser();

    if (!permanentUser) return { error: "Failed to create permanent user!" };

    // Create user (database)
    const createdUser = await UserModel.create({
      permanentUserId: permanentUser.data?.user_id,
      ...sanitizedFields,
    });

    if (createdUser) {
      const loginResponse = await signin({
        email: createdUser.email,
        password: sanitizedFields.password,
      });
      return { error: loginResponse.error };
    }

    return { success: "You have been registred!" };
  } catch (error) {
    if (isRedirectError(error)) {
      redirect(DEFAULT_LOGIN_REDIRECT);
    } else {
      console.log("Error in register action:");
      console.log(error);
      return { error: "Something went wrong!" };
    }
  }
};
