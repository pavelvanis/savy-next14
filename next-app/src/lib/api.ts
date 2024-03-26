import { ApiResponse } from "../types/types";
import { NextRequest, NextResponse } from "next/server";

import { checkCsrfToken, checkSession } from "@/lib/auth";

// Help methods for api routes

// If SESSION_AUTHORIZE is set to true, it will skip the session authorization process. In production, it should be set to false.
let SESSION_AUTHORIZE = false;

// If CSRF_AUTHORIZE is set to true, it will skip the csrf authorization process. In production, it should be set to false.
let SKIP_CSRF = false;

if (process.env.NODE_ENV === "production") {
  SKIP_CSRF = false;
  SESSION_AUTHORIZE = false;
}

/**
 * Authorize the user before accessing the protected route. Checks the session and CSRF token.
 */
export const Authorize = async (
  req: NextRequest,
  res: NextResponse,
  next: (body: any) => Promise<ApiResponse>
) => {
  const { csrfToken, ...body } = await req.json();

  // Verify CSRF token
  const { validCsrf, ...csrfMessage } = await checkCsrfToken(csrfToken, {
    skip: SKIP_CSRF,
  });

  if (!validCsrf) {
    console.log("message:  ", csrfMessage);
    return NextResponse.json({ ...csrfMessage }, { status: 401 });
  }

  // Verify session
  const { validSession, ...sessionMessage } = await checkSession({
    skip: SESSION_AUTHORIZE,
  });

  if (!validSession) {
    console.log("message:  ", sessionMessage);
    return NextResponse.json({ ...sessionMessage }, { status: 401 });
  }

  console.log("Successfully authorized the request.");

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
