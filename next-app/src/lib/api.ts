import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "../types/types";
import { getServerSession } from "next-auth";
import authOptions from "./authOptions";

import { csrf } from "@/lib/auth";

// If SESSION_AUTHORIZE is set to false, it will skip the session authorization process. In production, it should be set to true.
let SESSION_AUTHORIZE = false;

// If CSRF_AUTHORIZE is set to false, it will skip the csrf authorization process. In production, it should be set to true.
let CSRF_AUTHORIZE = false;

if (process.env.NODE_ENV === "production") {
  CSRF_AUTHORIZE = true;
  SESSION_AUTHORIZE = true;
}

/**
 * Authorize the user before accessing the protected route. Check the session and CSRF token.
 */
export const Authorize = async (
  req: NextRequest,
  res: NextResponse,
  next: (body: any) => Promise<ApiResponse>
) => {
  console.log("Headers: ", req.headers);
  console.log("Cookies: ", req.headers.get("cookie"));

  const session = await getServerSession(authOptions);
  const { csrfToken, ...body } = await req.json();

  // Get the CSRF token of the current session.
  const { checkCsrfToken } = await csrf();

  checkCsrfToken(csrfToken, { skip: false }, ({ authorized, message }) => {
    if (!authorized) {
      console.log("message:  ", message);
      return NextResponse.json({ message }, { status: 401 });
    }
  });

  if (!session && SESSION_AUTHORIZE) {
    console.log("No session was founded.");
    return NextResponse.json(
      { message: "No session was founded." },
      { status: 401 }
    );
  }

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
