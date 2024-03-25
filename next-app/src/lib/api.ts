import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "../types/types";
import { getServerSession } from "next-auth";
import authOptions from "./authOptions";
import { getCsrfToken } from "next-auth/react";

// If SESSION_AUTHORIZE is set to false, it will skip the session authorization process. In production, it should be set to true.
let SESSION_AUTHORIZE = false;

// If CSRF_AUTHORIZE is set to false, it will skip the csrf authorization process. In production, it should be set to true.
let CSRF_AUTHORIZE = true;

if (process.env.NODE_ENV === "production") {
  CSRF_AUTHORIZE = true;
  SESSION_AUTHORIZE = true;
}

/**
 * Authorize the user before accessing the protected route. Check the session and CSRF token.
 * @param req NextRequest
 * @param res NextResponse
 * @param next Function
 * @returns ApiResponse
 */
export const Authorize = async (
  req: NextRequest,
  res: NextResponse,
  next: (body: any) => Promise<ApiResponse>
) => {
  const session = await getServerSession(authOptions);
  const sessionCsrfToken = await getCsrfToken();

  const { csrfToken, ...body } = await req.json();

  console.log(`[${req.url}] \n- ${sessionCsrfToken}\n- ${csrfToken}`);

  if (csrfToken !== sessionCsrfToken && CSRF_AUTHORIZE) {
    console.log("Invalid CSRF token.");
    return NextResponse.json(
      { message: "Invalid CSRF token." },
      { status: 401 }
    );
  }

  if (!session && SESSION_AUTHORIZE) {
    console.log("No session was founded.");
    return NextResponse.json(
      { message: "No session was founded." },
      { status: 401 }
    );
  }

  console.log("Success");

  return next(body);
};

/**
 * Sanitize the data before saving it to the database.
 */
export const sanitize = (params: any) => {
  // TODO: Create function to sanitize data
  return params;
};

/**
 * Handle the error and return the error message.
 */
export const errorHandler = () => {
  // TODO: Create function to handle errors
};
