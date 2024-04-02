import { NextRequest, NextResponse } from "next/server";

import { checkSession } from "@/lib/auth";

// Help methods for api routes

// If SESSION_AUTHORIZE is set to true, it will skip the session authorization process. In production, it should be set to false.
let SESSION_AUTHORIZE = false;

if (process.env.NODE_ENV === "production") {
  SESSION_AUTHORIZE = false;
}

/**
 * Authorize the user before accessing the protected route. Checks the session and CSRF token.
 *
 * Returns `401` if the session is invalid.
 */
export const Authorize = async (
  req: NextRequest,
  res: NextResponse,
  next: (body: any) => any
) => {
  const { ...body } = await req.json();

  // Verify session
  const { validSession, ...sessionMessage } = await checkSession({
    skip: SESSION_AUTHORIZE,
  });

  if (!validSession) {
    // TODO: Add logger
    console.log("message:  ", sessionMessage);
    return NextResponse.json({ ...sessionMessage }, { status: 401 });
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
