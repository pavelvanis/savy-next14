import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import authOptions from "@/lib/authOptions";
import { ZodLoginUser } from "@/types/zod/auth";
import { UserModel } from "@/database/models/";
import { connectDB } from "@/lib/connect-db";
import { Authorize } from "@/lib/api";

/**
 * Sanitizing is enable by default in mongoose and can be disabled by setting the `sanitizeFilter` option to false.
 * Login a user.
 */
export const POST = async (req: NextRequest, res: NextResponse) =>
  Authorize(req, res, async () => {
    try {
      const body = await req.json();

      // Validate data
      const validBody = ZodLoginUser.safeParse(body);

      // If data is invalid, return all errors
      if (validBody.success === false) {
        const {
          fieldErrors: { ...errors },
        } = validBody.error.flatten();

        return NextResponse.json({ errors: errors }, { status: 400 });
      }

      await connectDB();

      // Check if user exist in database
      const userExist = await UserModel.findOne({
        email: validBody.data.email,
      }).setOptions({ sanitizeFilter: true });

      if (!userExist) {
        return NextResponse.json(
          { message: "User does not exist!" },
          { status: 400 }
        );
      }

      // Check if password match ..
      // const passwordMatch = await userExist.comparePassword(
      //   validBody.data.password
      // );

      // if (!passwordMatch) {
      //   return NextResponse.json(
      //     { message: "Password does not match!" },
      //     { status: 400 }
      //   );
      // }

      // Generate JWT
      // TODO: generate JWT

      return NextResponse.json({
        message: "You were successfuly logged in!",
        data: userExist,
      });
    } catch (error) {
      console.error(error);
    }
  });
