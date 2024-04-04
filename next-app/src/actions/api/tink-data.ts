import { log } from "@/lib/utils";
import { TinkApiAxios } from "@/lib/axios";
import { TinkAccount, TinkAccounts, TinkBalances, TinkCredentails } from "@/types/types";

/**
 * Retrieves the user's credentials.
 *
 * @param {string} userAccessToken - The user's access token.
 * @returns {Promise<TinkCredentails>} The user's credentials.
 */
const fetchUserCredentials = async (userAccessToken: string) => {
  const userCredentialsResponse = await TinkApiAxios.get(
    `/api/v1/credentials/list`,
    {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  const userCredentials: TinkCredentails = userCredentialsResponse.data;

  log("User credentials were fetched:", userCredentials);

  return userCredentials;
};

/**
 * Retrieves the user's accounts.
 *
 * @param {string} userAccessToken - The user's access token.
 * @returns {Promise<TinkAccounts>} The user's accounts.
 */
const fetchUserAccounts = async (userAccessToken: string) => {
  const userAccountsResponse = await TinkApiAxios.get(`/data/v2/accounts`, {
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
    },
  });

  const userAccounts: TinkAccounts = userAccountsResponse.data;

  log("User accounts were fetched:", userAccounts);

  return userAccounts;
};

/**
 * Retrieves the user's account filtered by id.
 *
 * @param {string} userAccessToken - The user's access token.
 * @param {string} accountId - The account id.
 * @returns {Promise<TinkAccount>} The filtered account.
 */
const fetchUserAccountById = async (
  userAccessToken: string,
  accountId: string
) => {
  const userAccountsResponse = await TinkApiAxios.get(
    `/data/v2/accounts/${accountId}`,
    {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    }
  );

  const userAccount: TinkAccount = userAccountsResponse.data;

  log("User account was fetched:", userAccount);

  return userAccount;
};

/**
 * Retrieves balances for the account filtered by id.
 *
 * @param {string} userAccessToken - The user's access token.
 * @param {string} accountId - The account id.
 * @returns {Promise<TinkBalances>} The balances for filtered account.
 */
const fetchUserBalancesById = async (
  userAccessToken: string,
  accountId: string
) => {
  const getUserBalancesResponse = await TinkApiAxios.get(
    `/api/v1/accounts/${accountId}/balances`,
    {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    }
  );

  const userBalancesById: TinkBalances = getUserBalancesResponse.data;

  log("User balances were fetched:", userBalancesById);

  return userBalancesById;
};

export {
  fetchUserCredentials,
  fetchUserAccounts,
  fetchUserAccountById,
  fetchUserBalancesById,
};