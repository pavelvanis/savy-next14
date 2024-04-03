import {
  TinkAccessToken,
  TinkAccount,
  TinkAccounts,
  TinkAuthorizationCode,
  TinkCredentails,
  TinkPermanentUser,
} from "@/types/types";
import { TinkApiAxios } from "../axios";

const CLIENT_ID = process.env.TINK_CLIENT_ID;
const CLIENT_SECRET = process.env.TINK_CLIENT_SECRET;
const DELEGATED_TINK_LINK_CLIENT_ID = "df05e4b379934cd09963197cc855bfe9";
// TODO: make it more configurable
const MARKET = "CZ";
const LOCALE = "cs_CZ";

// TODO: Create logger
/**
 * Function which logs the arguments to the console.
 * Does not log in production.
 */
const log = function (...args: any[]) {
  if (process.env.NODE_ENV === "production") return;
  args.forEach((arg) => {
    console.log(arg);
  });
  console.log("\n\n");
};

// Methods to interact with Tink API

/**
 * Fetches a client access token from the Tink API.
 *
 * @param {string[]} scopes - The scopes for which the access token is requested. Multiple scopes can be passed.
 * @returns {Promise<TinkAccessToken>} The client access token.
 */
const getClientAccessToken = async (...scopes: string[]) => {
  scopes.join(",");

  const clientAccessTokenResponse = await TinkApiAxios.post(
    `/api/v1/oauth/token`,
    `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials&scope=${scopes}`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
    }
  );
  const clientAccessToken: TinkAccessToken = clientAccessTokenResponse.data;

  log("Create client access token:", clientAccessToken);

  return clientAccessToken;
};

/**
 * Creates a new permanent user in Tink.
 *
 * @param {string} accessToken - The access token.
 * @returns {Promise<TinkPermanentUser>} The new permanent user.
 */
const createPermanentUser = async (accessToken: string) => {
  const userResponse = await TinkApiAxios.post(
    `/api/v1/user/create`,
    {
      locale: LOCALE,
      market: MARKET,
    },
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const permanentUser: TinkPermanentUser = userResponse.data;

  log("\n\nCreate permanent user:", permanentUser);

  return permanentUser;
};

/**
 * Fetches an authorization code for a user from the Tink API.
 *
 * @param {string} userId - The ID of the user.
 * @param {string} clientAccessToken - The access token of the client.
 * @param {string[]} scopes - The scopes for which the authorization code is requested. Multiple scopes can be passed.
 * @returns {Promise<TinkAuthorizationCode>} A Promise that resolves with the authorization code.
 */
const getAuthorizationCode = async (
  userId: string,
  clientAccessToken: string,
  ...scopes: string[]
) => {
  scopes.join(",");

  const idHint = "John Doe"; // TODO: change to the user's name

  const authorizationCodeResponse = await TinkApiAxios.post(
    `/api/v1/oauth/authorization-grant/delegate`,
    `response_type=code&user_id=${userId}&id_hint=${idHint}&actor_client_id=${DELEGATED_TINK_LINK_CLIENT_ID}&scope=${scopes}`,
    {
      headers: {
        Authorization: `Bearer ${clientAccessToken}`,
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
    }
  );

  const authorizationCode: TinkAuthorizationCode =
    authorizationCodeResponse.data;

  log("Create authorization code:", authorizationCode);

  return authorizationCode;
};

/**
 * Gets the user's grant authorization code.
 *
 * @param {string} userId - The user's ID.
 * @param {string} clientAccessToken - The client access token.
 * @param {string[]} scopes - The scopes for which the authorization code is requested. Multiple scopes can be passed.
 * @returns {Promise<TinkAuthorizationCode>}The grant authorization code.
 */
const getUserGrantAuthorizationCode = async (
  userId: string,
  clientAccessToken: string,
  ...scopes: string[]
) => {
  scopes.join(",");

  const grantAuthorizationResponse = await TinkApiAxios.post(
    `/api/v1/oauth/authorization-grant`,
    `user_id=${userId}&scope=${scopes}`,
    {
      headers: {
        Authorization: `Bearer ${clientAccessToken}`,
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
    }
  );

  const grantAuthorization: TinkAuthorizationCode =
    grantAuthorizationResponse.data;

  log("\n\nCreate grant authorization:", grantAuthorization);

  return grantAuthorization;
};

/**
 * Retrieves the user's access token. You must put needed scopes into function when generating authorization code.
 *
 * @param {string} code - The authorization code.
 * @returns {Promise<TinkAccessToken>} The user's access token.
 */
const getUserAccessToken = async (code: string, ...scopes: string[]) => {
  scopes.join(",");

  const userAccessTokenResponse = await TinkApiAxios.post(
    `/api/v1/oauth/token`,
    `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=authorization_code&code=${code}&scope=${scopes}`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
    }
  );

  const userAccessToken: TinkAccessToken = userAccessTokenResponse.data;

  log("\n\nCreate user access token", userAccessToken);

  return userAccessToken;
};

/**
 * Retrieves the user's credentials.
 *
 * @param {string} userAccessToken - The user's access token.
 * @returns {Promise<TinkCredentails>} The user's credentials.
 */
const getUserCredentials = async (userAccessToken: string) => {
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
const getUserAccounts = async (userAccessToken: string) => {
  const userAccountsResponse = await TinkApiAxios.get(`/data/v2/accounts`, {
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
    },
  });

  log("User accounts were fetched:", userAccountsResponse.data);

  const userAccounts: TinkAccounts = userAccountsResponse.data;

  return userAccounts;
};

/**
 * Retrieves the user's account filtered by id.
 *
 * @param {string} userAccessToken - The user's access token.
 * @param {string} accountId - The account id.
 * @returns {Promise<TinkAccount>} The filtered account.
 */
const getUserAccountById = async (
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

  log("User account was fetched:", userAccountsResponse.data);

  const userAccount: TinkAccount = userAccountsResponse.data;

  return userAccountsResponse.data;
};

/**
 * Retrieves balances for the account filtered by id.
 *
 * @param {string} userAccessToken - The user's access token.
 * @param {string} accountId - The account id.
 * @returns {Promise<any>} The balances for filtered account.
 */
const getUserBalancesById = async (
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

  log("User balances were fetched:", getUserBalancesResponse.data);

  const userBalancesById = getUserBalancesResponse.data;

  return userBalancesById;
};

const api = {
  getClientAccessToken,
  createPermanentUser,
  getAuthorizationCode,
  getUserGrantAuthorizationCode,
  getUserAccessToken,
  getUserCredentials,
  getUserAccounts,
  getUserAccountById,
  getUserBalancesById,
};

export default api;
