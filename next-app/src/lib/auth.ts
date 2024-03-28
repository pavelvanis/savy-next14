import getServerSession from "next-auth";
import authOptions from "./authOptions";
import NextAuth from "next-auth";

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