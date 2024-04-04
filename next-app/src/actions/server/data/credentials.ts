"use server";

import { tinkApi } from "@/actions/api";
import { checkEnv } from "@/lib/utils";
import { tinkErrorHandler } from "@/lib/api";
import { TinkCredentails, TinkResponse } from "@/types/types";

// Check if the required environment variables are set
checkEnv("TINK_CLIENT_ID", "TINK_CLIENT_SECRET");

/**
 * Gets the credentials for a user.
 *
 * @param {string} userId The permanent user ID.
 * @returns {Promise<TinkResponse<TinkCredentails>>} The user credentials.
 */
const getCredentials = async (
  userId: string
): Promise<TinkResponse<TinkCredentails>> => {
  try {
    const clientAccessToken = await tinkApi.fetchClientAccessToken(
      "authorization:grant",
      "accounts:read"
    );
    const userGrantAuthorizationCode =
      await tinkApi.fetchUserGrantAuthorizationCode(
        userId,
        clientAccessToken.access_token,
        "credentials:read"
      );
    const userAccessToken = await tinkApi.fetchUserAccessToken(
      userGrantAuthorizationCode.code
    );
    const userCredentials = await tinkApi.fetchUserCredentials(
      userAccessToken.access_token
    );

    return { data: userCredentials };
  } catch (error) {
    return tinkErrorHandler(error, "Error while fetching user credentials");
  }
};

export { getCredentials };
