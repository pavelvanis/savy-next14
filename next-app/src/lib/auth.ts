import NextAuth from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./auth.config";
import { DEFAULT_UNAUTHORIZED_REDIRECT } from "@/config/routes";

// ------------------------------------------------------------
// NextAuth Handlers

export const {
  handlers: { GET, POST },
  auth,
  update,
  signIn,
  signOut,
} = NextAuth({ ...authOptions });

// ------------------------------------------------------------
// Session Authorize

type VerifySessionResponse = { validSession: boolean; message: string };

/**
 * Check if session of user exists.
 * If `skip` in options parameter is set to true, it will skip the CSRF token verification.
 * @returns The response of the session verification.
 */
export const checkSession = async (
  options: { skip?: boolean } = { skip: false },
  callback?: (res: VerifySessionResponse) => void
): Promise<VerifySessionResponse> => {
  const session = await auth();

  let response: VerifySessionResponse = {
    validSession: true,
    message: "Session is valid",
  };

  if (options?.skip) {
    response = { validSession: true, message: "Skipped session check" };
  } else {
    if (!session) {
      response = { validSession: false, message: "No session was founded." };
    }
  }

  callback?.(response);
  return response;
};

// ------------------------------------------------------------
// Session handler

/**
 * Return a session of the user. If the session is not found, it will redirect to the unauthorized page.
 * @param {string} redirectUrl The URL to redirect if the session is not found. Default value could be set in the config as `DEFAULT_UNAUTHORIZED_REDIRECT`.
 * @returns The session of the user.
 */
export const getAuthSession = async (
  redirectUrl: string = DEFAULT_UNAUTHORIZED_REDIRECT
) => {
  const session = await auth();

  if (!session) {
    redirect(redirectUrl);
  }

  return session;
};
