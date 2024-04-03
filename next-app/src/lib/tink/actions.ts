"use server";
import api from "./api";
import { TinkAccount, TinkAccounts } from "@/types/types";

if (!process.env.TINK_CLIENT_ID) {
  console.log("ID: ", process.env.TINK_CLIENT_ID);
  throw Error("Environment variable `TINK_CLIENT_ID` is not set.");
}

if (!process.env.TINK_CLIENT_SECRET) {
  throw Error("Environment variable `TINK_CLIENT_SECRET` is not set.");
}

/**
 * Fetches the client access token and create new permanent user.
 *
 * @returns {Promise<TinkPermanentUser>} The new permanent user.
 */
const createPermanentUser = async () => {
  try {
    const token = await api.getClientAccessToken("user:create");
    const permanent_user = await api.createPermanentUser(token.access_token);

    return permanent_user;
  } catch (error) {
    // TODO: Handle error & Create logger
    console.log(error);
    return null;
  }
};

/**
 * Gets an authorization code for a user.
 *
 * @param {string} userId The user ID.
 * @returns {Promise<TinkAuthorizationCode>} The authorization code.
 */
const generateAuthorizationCode = async (userId: string) => {
  try {
    const token = await api.getClientAccessToken("authorization:grant");
    const authorization_code = await api.getAuthorizationCode(
      userId,
      token.access_token,
      "providers:read,user:read,authorization:read",
      "credentials:read,credentials:refresh,credentials:write"
    );

    return authorization_code;
  } catch (error) {
    // TODO: Handle error & Create logger
    console.log(error);
    return null;
  }
};

/**
 * Gets the credentials for a user.
 *
 * @param {string} userId The permanent user ID.
 * @returns {Promise<TinkCredentails>} The user credentials.
 */
const getCredentials = async (userId: string) => {
  try {
    console.log("Getting credentials...");
    const clientAccessToken = await api.getClientAccessToken(
      "authorization:grant",
      "accounts:read"
    );
    const userGrantAuthorizationCode = await api.getUserGrantAuthorizationCode(
      userId,
      clientAccessToken.access_token,
      "credentials:read"
    );
    const userAccessToken = await api.getUserAccessToken(
      userGrantAuthorizationCode.code
    );
    const userCredentials = await api.getUserCredentials(
      userAccessToken.access_token
    );

    return userCredentials;
  } catch (error) {
    // TODO: Handle error & Create logger
    console.log(error);
    return null;
  }
};

/**
 * Fetches the accounts of a specific user.
 *
 * @param userId - The ID of the user whose accounts are to be fetched.
 * @returns A Promise that resolves with the user's accounts.
 */
const getAccounts = async (userId: string) => {
  try {
    const clientAccessToken = await api.getClientAccessToken(
      "authorization:grant"
    );
    const userGrantAuthorizationCode = await api.getUserGrantAuthorizationCode(
      userId,
      clientAccessToken.access_token,
      "accounts:read"
    );
    const userAccessToken = await api.getUserAccessToken(
      userGrantAuthorizationCode.code
    );
    const userAccounts: TinkAccounts = await api.getUserAccounts(
      userAccessToken.access_token
    );

    return userAccounts;
  } catch (error) {
    // TODO: Handle error & Create logger
    console.log(error);
    return null;
  }
};

/**
 * Fetches a specific account of a user.
 *
 * @param userId - The ID of the user.
 * @param accountId - The ID of the account to fetch.
 * @returns A Promise that resolves with the account, or null if an error occurs.
 */
const getAccountById = async (userId: string, accountId: string) => {
  try {
    const clientAccessToken = await api.getClientAccessToken(
      "authorization:grant",
      "accounts:read"
    );
    const userGrantAuthorizationCode = await api.getUserGrantAuthorizationCode(
      userId,
      clientAccessToken.access_token,
      "accounts:read"
    );
    const userAccessToken = await api.getUserAccessToken(
      userGrantAuthorizationCode.code
    );
    const account: TinkAccount = await api.getUserAccountById(
      userAccessToken.access_token,
      accountId
    );

    return account;
  } catch (error) {
    // TODO: Handle error & Create logger
    console.log(error);
    return null;
  }
};

/**
 * Fetches the balances of a specific account of a user.
 *
 * @param userId - The ID of the user.
 * @param accountId - The ID of the account to fetch the balances for.
 * @returns A Promise that resolves with the balances, or null if an error occurs.
 */
const getAccountBalancesById = async (userId: string, accountId: string) => {
  try {
    const clientAccessToken = await api.getClientAccessToken(
      "authorization:grant",
      "accounts:read,transactions:read,user:read,balances:read"
    );
    const userGrantAuthorizationCode = await api.getUserGrantAuthorizationCode(
      userId,
      clientAccessToken.access_token,
      "accounts:read,transactions:read,user:read,balances:read"
    );
    const userAccessToken = await api.getUserAccessToken(
      userGrantAuthorizationCode.code,
      "accounts:read,transactions:read,user:read,balances:read"
    );
    const balances: TinkAccount = await api.getUserBalancesById(
      userAccessToken.access_token,
      accountId
    );

    return balances;
  } catch (error) {
    // TODO: Handle error & Create logger
    console.log(error);
    return null;
  }
};

export {
  createPermanentUser,
  generateAuthorizationCode,
  getCredentials,
  getAccounts,
  getAccountById,
  getAccountBalancesById,
};
