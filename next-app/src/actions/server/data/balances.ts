"use server";

import { checkEnv } from "@/lib/utils";
import { tinkErrorHandler } from "@/lib/api";
import { TinkBalances, TinkResponse } from "@/types/types";
import { tinkApi } from "@/actions/api";

// Check if the required environment variables are set
checkEnv("TINK_CLIENT_ID", "TINK_CLIENT_SECRET");

/**
 * Fetches the balances of a specific account of a user.
 *
 * @param {string} userId - The ID of the user.
 * @param {string} accountId - The ID of the account to fetch the balances for.
 * @returns {Promise<TinkResponse<TinkBalances>>} The balances, or error if an error occurs.
 */
const getAccountBalancesById = async (
  userId: string,
  accountId: string
): Promise<TinkResponse<TinkBalances>> => {
  try {
    const clientAccessToken = await tinkApi.getClientAccessToken(
      "authorization:grant",
      "accounts:read,transactions:read,user:read,balances:read"
    );
    const userGrantAuthorizationCode =
      await tinkApi.getUserGrantAuthorizationCode(
        userId,
        clientAccessToken.access_token,
        "accounts:read,transactions:read,user:read,balances:read"
      );
    const userAccessToken = await tinkApi.getUserAccessToken(
      userGrantAuthorizationCode.code,
      "accounts:read,transactions:read,user:read,balances:read"
    );
    const balances: TinkBalances = await tinkApi.getUserBalancesById(
      userAccessToken.access_token,
      accountId
    );

    return { data: balances };
  } catch (error) {
    return tinkErrorHandler(error, "Error while fetching account balances");
  }
};

export { getAccountBalancesById };
