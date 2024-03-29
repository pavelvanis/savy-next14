import { Session, getServerSession } from "next-auth";
import authOptions from "./authOptions";
import { redirect } from "next/navigation";
import { DEFAULT_UNAUTHORIZED_REDIRECT } from "@/config/routes";

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
  const session = await getServerSession(authOptions);

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
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(DEFAULT_UNAUTHORIZED_REDIRECT);
  }

  return session;
};
