"use server";

import { tinkApi } from "@/actions/api";
import { tinkErrorHandler } from "@/lib/api";
import { TinkResponse, TinkTransactions } from "@/types/types";

/**
 * Fetches the transactions of a specific user.
 *
 * @param {string} userId - The ID of the user whose transactions are to be fetched.
 * @returns {Promise<TinkResponse<TinkTransactions>>} A Promise that resolves with the user's transactions.
 */
const getTransactions = async (
  userId: string
): Promise<TinkResponse<TinkTransactions>> => {
  try {
    const clientAccessToken = await tinkApi.fetchClientAccessToken(
      "authorization:grant"
    );
    const userGrantAuthorizationCode =
      await tinkApi.fetchUserGrantAuthorizationCode(
        userId,
        clientAccessToken.access_token,
        "transactions:read"
      );
    const userAccessToken = await tinkApi.fetchUserAccessToken(
      userGrantAuthorizationCode.code
    );
    const userTransactions: TinkTransactions =
      await tinkApi.fetchUserTransactions(userAccessToken.access_token);

    return { data: userTransactions };
  } catch (error) {
    return tinkErrorHandler(error, "Error while fetching transactions");
  }
};

export { getTransactions };
