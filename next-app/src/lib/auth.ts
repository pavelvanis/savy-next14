import { getServerSession } from "next-auth";
import authOptions from "./authOptions";

// ------------------------------------------------------------
// CSRF Verification

// Define the type of the response.
type VerifyCsrfResponse = { validCsrf: boolean; message: string };

/**
 * Get the CSRF token of the current session.
 * @returns The CSRF token of the current session.
 */
export const csrfToken = async (): Promise<string | undefined> => {
  const session = await getServerSession(authOptions);
  return session?.csrfToken;
};

/**
 * Compare the CSRF token of the current session with the token passed in the request.
 * If `skip` in options parameter is set to true, it will skip the CSRF token verification.
 * @param passedToken Token to verify
 * @param options Options to CSRF token verification
 * @param callback Function to execute after the token is verified
 * @returns The response of the CSRF token verification.
 */
export const checkCsrfToken = async (
  passedToken: string,
  options: { skip?: boolean } = { skip: false },
  callback?: (res: VerifyCsrfResponse) => void
): Promise<VerifyCsrfResponse> => {
  const sessionToken = await csrfToken();

  let response: VerifyCsrfResponse;

  if (options?.skip) {
    response = { validCsrf: true, message: "Skipped CSRF token check" };
  } else if (!sessionToken) {
    response = { validCsrf: false, message: "No CSRF token found" };
  } else if (sessionToken !== passedToken) {
    response = { validCsrf: false, message: "Invalid CSRF token" };
  } else {
    response = { validCsrf: true, message: "Valid CSRF token" };
  }

  callback?.(response);
  return response;
};

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

