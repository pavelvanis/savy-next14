import UserModel from "@/database/models/user";
import { Authorize } from "@/lib/api";
import authOptions from "@/lib/authOptions";
import { connectDB } from "@/lib/connect-db";
import { createPermanentUser } from "@/lib/tink/actions";
import { ApiResponse, TinkPermanentUser } from "@/types/types";
import { ZodUser } from "@/types/zod/mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * Sanitizing is enable by default in mongoose and can be disabled by setting the `sanitizeFilter` option to false.
 * Create a new user.
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

      // TODO: Sanitize data

      // If data is invalid, return all errors
      if (validBody.success === false) {
        const {
          fieldErrors: { ...errors },
        } = validBody.error.flatten();

        return NextResponse.json({ errors: errors }, { status: 400 });
      }

      // Connect to database
      await connectDB();

      // Check if user exist in database
      const userExist = await UserModel.findOne({
        email: validBody.data.email,
      });

      if (userExist) {
        return NextResponse.json(
          { message: "User already exist!" },
          { status: 400 }
        );
      }

      // TODO: Check if password match
      // TODO: Hash password

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
    }
  });
