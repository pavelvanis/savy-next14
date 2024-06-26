"use server";

import { tinkApi } from "@/actions/api";
import { tinkErrorHandler } from "@/lib/api";
import { TinkAccount, TinkAccounts, TinkResponse } from "@/types/types";

/**
 * Fetches the accounts of a specific user.
 *
 * @param {string} userId - The ID of the user whose accounts are to be fetched.
 * @returns {Promise<TinkResponse<TinkAccounts>>} A Promise that resolves with the user's accounts.
 */
const getAccounts = async (
  userId: string
): Promise<TinkResponse<TinkAccounts>> => {
  try {
    const clientAccessToken = await tinkApi.fetchClientAccessToken(
      "authorization:grant"
    );
    const userGrantAuthorizationCode =
      await tinkApi.fetchUserGrantAuthorizationCode(
        userId,
        clientAccessToken.access_token,
        "accounts:read"
      );
    const userAccessToken = await tinkApi.fetchUserAccessToken(
      userGrantAuthorizationCode.code
    );
    const userAccounts: TinkAccounts = await tinkApi.fetchUserAccounts(
      userAccessToken.access_token
    );

    return { data: userAccounts };
  } catch (error) {
    return tinkErrorHandler(error, "Error while fetching accounts");
  }
};

/**
 * Fetches a specific account of a user.
 *
 * @param {string} userId - The ID of the user.
 * @param {string} accountId - The ID of the account to fetch.
 * @returns {Promise<TinkResponse<TinkAccount>>} A Promise that resolves with the account, or null if an error occurs.
 */
const getAccountById = async (
  userId: string,
  accountId: string
): Promise<TinkResponse<TinkAccount>> => {
  try {
    const clientAccessToken = await tinkApi.fetchClientAccessToken(
      "authorization:grant",
      "accounts:read"
    );
    const userGrantAuthorizationCode =
      await tinkApi.fetchUserGrantAuthorizationCode(
        userId,
        clientAccessToken.access_token,
        "accounts:read"
      );
    const userAccessToken = await tinkApi.fetchUserAccessToken(
      userGrantAuthorizationCode.code
    );
    const account: TinkAccount = await tinkApi.fetchUserAccountById(
      userAccessToken.access_token,
      accountId
    );

    return { data: account };
  } catch (error) {
    return tinkErrorHandler(error, "Error while fetching account");
  }
};

export { getAccounts, getAccountById };
