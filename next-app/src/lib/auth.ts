import { getCsrfToken } from "next-auth/react";

type AuthorizedProps = {
  skip?: boolean;
};

type AuthorizedResponse = { authorized: boolean; message: string };

// Saved CSRF token
let token: string | undefined;

/**
 * Create a new CSRF token
 * @returns CSRF token
 */
const createToken = async (): Promise<string | undefined> => {
  token = await getCsrfToken();
  return token;
};

/**
 * Check if CSRF token is valid
 * @param passedToken CSRF token passed by client
 * @param skip Skip CSRF token check. Default is false. Useful for development.
 * @param callback Callback function
 * @returns Authorized response
 */
const checkCsrfToken = (
  passedToken: string,
  { skip = false }: AuthorizedProps,
  callback?: (res: AuthorizedResponse) => void
): AuthorizedResponse => {

  const response: AuthorizedResponse = !token
    ? {
        authorized: false,
        message: "No CSRF token was founded on server session.",
      }
    : token !== passedToken
    ? { authorized: false, message: "Invalid CSRF token." }
    : { authorized: true, message: "Valid CSRF token." };

  if (skip) {
    response.authorized = true;
    response.message = "Skipped CSRF token check.";
  }

  callback?.(response);
  return response;
};

export const csrf = async () => {
  return { token, create: await createToken(), checkCsrfToken };
};
