import { log } from "@/lib/utils";
import { TinkApiAxios } from "@/lib/axios";
import {
  TinkAccount,
  TinkAccounts,
  TinkBalances,
  TinkCategories,
  TinkCredentials,
  TinkEnrichedTransactions,
  TinkTransactions,
} from "@/types/types";

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

  const userCredentials: TinkCredentials = userCredentialsResponse.data;

  // Reverse the credentials to show the most recent first.
  userCredentials.credentials.reverse();

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
  const userBalancesResponse = await TinkApiAxios.get(
    `/api/v1/accounts/${accountId}/balances`,
    {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    }
  );

  const userBalancesById: TinkBalances = userBalancesResponse.data;

  log("User balances were fetched:", userBalancesById);

  return userBalancesById;
};

/**
 * Retrieves the user's transactions.
 *
 * @scopes `transactions:read`
 * @param {string} userAccessToken - The user's access token.
 * @returns {Promise<TinkTransactions>} The user's transactions.
 */
const fetchUserTransactions = async (
  userAccessToken: string
): Promise<TinkTransactions> => {
  const userTransactionsResponse = await TinkApiAxios.get(
    "/data/v2/transactions",
    {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    }
  );

  const userTransactions: TinkTransactions = userTransactionsResponse.data;

  log("User transactions were fetched:", userTransactions);

  return userTransactions;
};

/**
 * Retrieves the user's categories.
 *
 * @scopes `user:read`
 * @param {string} userAccessToken - The user's access token.
 * @returns {Promise<TinkCategories>} The user's categories.
 */
const fetchCategories = async (
  userAccessToken: string
): Promise<TinkCategories> => {
  const categoriesResponse = await TinkApiAxios.get("/api/v1/categories", {
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
    },
  });

  const categories: TinkCategories = categoriesResponse.data;

  log("Categories were fetched:", categories);

  return categories;
};

const fetchUserEnrichedTransactions = async (
  userAccessToken: string
): Promise<TinkEnrichedTransactions> => {
  const enrichedTransactionsResponse = await TinkApiAxios.get(
    "/enrichment/v1/transactions",
    { headers: { Authorization: `Bearer ${userAccessToken}` } }
  );

  const enrichedTransactions: TinkEnrichedTransactions =
    enrichedTransactionsResponse.data;

  log("Enriched transactions were fetched:", enrichedTransactions);

  return enrichedTransactions;
};

export {
  fetchUserCredentials,
  fetchUserAccounts,
  fetchUserAccountById,
  fetchUserBalancesById,
  fetchUserTransactions,
  fetchUserEnrichedTransactions,
  fetchCategories,
};
