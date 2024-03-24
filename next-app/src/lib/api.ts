import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "../types/types";
import { getServerSession } from "next-auth";
import authOptions from "./authOptions";

// If AUTHORIZE is set to false, it will skip the authorization process.
const AUTHORIZE = false;

/**
 * Authorize the user before accessing the protected route. Check the session and return an error if no session was found.
 * @param req NextRequest
 * @param res NextResponse
 * @param next Function
 * @returns ApiResponse
 */
export const Authorize = async (
  req: NextRequest,
  res: NextResponse,
  next: () => Promise<ApiResponse>
) => {
  const session = await getServerSession(authOptions);

  if (!session && AUTHORIZE) {
    return NextResponse.json(
      { message: "No session was founded." },
      { status: 401 }
    );
  }

  return next();
};
