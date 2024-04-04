"use server";

import { checkEnv } from "@/lib/utils";
import { tinkErrorHandler } from "@/lib/api";
import { TinkCredentails, TinkResponse } from "@/types/types";
import { tinkApi } from "@/actions/api";

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
    const clientAccessToken = await tinkApi.getClientAccessToken(
      "authorization:grant",
      "accounts:read"
    );
    const userGrantAuthorizationCode =
      await tinkApi.getUserGrantAuthorizationCode(
        userId,
        clientAccessToken.access_token,
        "credentials:read"
      );
    const userAccessToken = await tinkApi.getUserAccessToken(
      userGrantAuthorizationCode.code
    );
    const userCredentials = await tinkApi.getUserCredentials(
      userAccessToken.access_token
    );

    return { data: userCredentials };
  } catch (error) {
    return tinkErrorHandler(error, "Error while fetching user credentials");
  }
};

export { getCredentials };
