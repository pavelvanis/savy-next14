import { NextRequest, NextResponse } from "next/server";

import UserModel from "@/database/models/user";
import { Authorize, sanitize } from "@/lib/api";
import { connectDB } from "@/lib/connect-db";
import { createPermanentUser } from "@/lib/tink/actions";
import { ApiResponse, TinkPermanentUser } from "@/types";
import { ZodUser } from "@/types/zod/mongoose";

/**
 * Sanitizing is enable by default in mongoose and can be disabled by setting the `sanitizeFilter` option to false.
 * Password is automatically hashed before saving to the database.
 */
export const POST = async (
  req: NextRequest,
  res: NextResponse
): Promise<ApiResponse> =>
  Authorize(req, res, async () => {
    try {
      const body = await req.json();

      // Validate data
      const validBody = ZodUser.safeParse(body);

      // If data is invalid, return all errors
      if (validBody.success === false) {
        const {
          fieldErrors: { ...errors },
        } = validBody.error.flatten();

        return NextResponse.json({ errors: errors }, { status: 400 });
      }

      // Sanitize data
      const cleanBody = sanitize(validBody.data);

      // Connect to database
      await connectDB();

      // Check if user exist in database
      const userExist = await UserModel.findOne({
        email: cleanBody.email,
      });

      if (userExist) {
        return NextResponse.json(
          { message: "User already exist!" },
          { status: 400 }
        );
      }

      // Create permanent user (Tink API)
      const permanentUserId: TinkPermanentUser = await createPermanentUser();

      // Create user (database)
      const createdUser = await UserModel.create({
        ...validBody.data,
        user_id: permanentUserId.user_id,
      });

      return NextResponse.json({
        message: "User was succesfuly created!",
        data: createdUser,
      });
    } catch (error) {
      // TODO: Error handling
      console.log(error);
      return NextResponse.json(
        { message: "Something went wrong!" },
        { status: 500 }
      );
    }
  });
