"use server";

import { tinkApi } from "@/actions/api";
import { checkEnv } from "@/lib/utils";
import { tinkErrorHandler } from "@/lib/api";
import {
  TinkAuthorizationCode,
  TinkPermanentUser,
  TinkResponse,
} from "@/types/types";

// Check if the required environment variables are set
checkEnv("TINK_CLIENT_ID", "TINK_CLIENT_SECRET");

/**
 * Fetches the client access token and create new permanent user.
 *
 * @returns {Promise<TinkResponse<TinkPermanentUser>>} The new permanent user.
 */
const createPermanentUser = async (): Promise<
  TinkResponse<TinkPermanentUser>
> => {
  try {
    const token = await tinkApi.fetchClientAccessToken("user:create");
    const permanentUser = await tinkApi.fetchNewPermanentUser(
      token.access_token
    );

    return { data: permanentUser };
  } catch (error) {
    return tinkErrorHandler(error, "Error while creating permanent user");
  }
};

/**
 * Gets an authorization code for a user.
 *
 * @param {string} userId The user ID.
 * @returns {Promise<TinkResponse<TinkAuthorizationCode>>} The authorization code.
 */
const generateAuthorizationCode = async (
  userId: string
): Promise<TinkResponse<TinkAuthorizationCode>> => {
  try {
    const token = await tinkApi.fetchClientAccessToken("authorization:grant");
    const authorizationCode = await tinkApi.fetchAuthorizationCode(
      userId,
      token.access_token,
      "providers:read,user:read,authorization:read",
      "credentials:read,credentials:refresh,credentials:write"
    );

    return { data: authorizationCode };
  } catch (error) {
    return tinkErrorHandler(error, "Error while generating authorization code");
  }
};

export { createPermanentUser, generateAuthorizationCode };
