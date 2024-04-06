import NextAuth from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "./authOptions";
import { DEFAULT_UNAUTHORIZED_REDIRECT } from "@/config/routes";

// ------------------------------------------------------------
// NextAuth Handlers

export const {
  handlers: { GET, POST },
  auth,
  unstable_update,
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

/**
 * Return a session of the user. If the session is not found, it will redirect to the unauthorized page.
 * @returns The session of the user.
 */
export const getAuthSession = async () => {
  const session = await auth();

  if (!session) {
    redirect(DEFAULT_UNAUTHORIZED_REDIRECT);
  }

  return session;
};
