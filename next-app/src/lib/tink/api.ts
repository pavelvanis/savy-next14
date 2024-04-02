import {
  TinkAccessToken,
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
 * Get client access token for the client
 * @returns Access token for the client
 */
const getClientAccessToken = async () => {
  const scopes = [
    "authorization:grant,user:read,user:create", // needed for creating permanent users
    "credentials:read", // needed for fetching user credentials
    "payment:read", // needed for fetching payment request transfers
    "link-session:read", // reading sessions
    "accounts:read", // needed for fetching account details
  ].join(",");

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

  log("\n\nCreate client access token:", clientAccessToken);

  return clientAccessToken;
};

/**
 * Creates a new permanent user in Tink.
 *
 * @param {string} accessToken - The access token.
 * @returns {Promise<Object>} The new permanent user.
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
 * Creates a new permanent user.
 *
 * @param {string} accessToken - The access token.
 * @returns {Promise<Object>} The newly created user.
 */
const getAuthorizationCode = async (
  userId: string,
  clientAccessToken: string
) => {
  const scopes = [
    "providers:read,user:read,authorization:read", // base tink link scopes
    "credentials:read,credentials:refresh,credentials:write", // needed to enable add/refresh/authenticate credentials
    "payment:read,transfer:read,transfer:execute", // needed for executing payment requests - creating a transfers
    "link-session:read", // reading sessions
    "accounts:read,transactions:read,balances:read", // needed for fetching account details
  ].join(",");

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

  log("\n\nCreate authorization code:", authorizationCode);

  return authorizationCode;
};

/**
 * Gets the user's grant authorization code.
 *
 * @param {string} userId - The user's ID.
 * @param {string} clientAccessToken - The client access token.
 * @returns {Promise<Object>} The grant authorization code.
 */
const getUserGrantAuthorizationCode = async (
  userId: string,
  clientAccessToken: string
) => {
  console.log("Getting grant authorization code for: ", userId);
  const grantAuthorizationResponse = await TinkApiAxios.post(
    `/api/v1/oauth/authorization-grant`,
    `user_id=${userId}&scope=credentials:read,accounts:read`,
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
 * Retrieves the user's access token.
 *
 * @param {string} code - The authorization code.
 * @returns {Promise<Object>} The user's access token.
 */
const getUserAccessToken = async (code: string) => {
  const userAccessTokenResponse = await TinkApiAxios.post(
    `/api/v1/oauth/token`,
    `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=authorization_code&scope=credentials:read,credentials:write&code=${code}`,
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
 * @returns {Promise<Object>} The user's credentials.
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

  log("\n\nUser credentials were fetched:", userCredentials);

  return userCredentials;
};

// TODO: Getting user accounts and balances (+transactions)
const getUserAccounts = async (userAccessToken: string) => {
  const userAccountsResponse = await TinkApiAxios.get(`/data/v2/accounts`, {
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
    },
  });
};

const api = {
  getClientAccessToken,
  createPermanentUser,
  getAuthorizationCode,
  getUserGrantAuthorizationCode,
  getUserAccessToken,
  getUserCredentials,
  getUserAccounts,
};

export default api;
