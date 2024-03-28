"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { sanitize } from "@/lib/api";
import { connectDB } from "@/lib/connect-db";
import { UserModel } from "@/database/models";
import { createPermanentUser } from "@/lib/tink/actions";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
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

  // Create user (database)
  const createdUser = await UserModel.create({
    ...sanitizedFields,
    user_id: permanentUser.user_id,
  });

  return { success: "You have been registred!" };
};
