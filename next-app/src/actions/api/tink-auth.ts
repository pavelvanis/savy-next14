import { checkEnv, log } from "@/lib/utils";
import { TinkApiAxios } from "@/lib/axios";
import { TinkAccessToken, TinkAuthorizationCode } from "@/types/types";

const CLIENT_ID = process.env.TINK_CLIENT_ID;
const CLIENT_SECRET = process.env.TINK_CLIENT_SECRET;
const DELEGATED_TINK_LINK_CLIENT_ID = process.env.DELEGATED_TINK_LINK_CLIENT_ID;

checkEnv(
  "TINK_CLIENT_ID",
  "TINK_CLIENT_SECRET",
  "DELEGATED_TINK_LINK_CLIENT_ID"
);

/**
 * Fetches a client access token from the Tink API.
 *
 * @param {string[]} scopes - The scopes for which the access token is requested. Multiple scopes can be passed.
 * @returns {Promise<TinkAccessToken>} The client access token.
 */
const fetchClientAccessToken = async (...scopes: string[]) => {
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
 * Retrieves the user's access token.
 *
 * @param {string} code - The authorization code.
 * @param {string[]} scopes - The scopes for which the access token is requested. Multiple scopes can be passed.
 * @returns {Promise<TinkAccessToken>} The user's access token.
 */
const fetchUserAccessToken = async (code: string, ...scopes: string[]) => {
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
 * Fetches an authorization code for a user from the Tink API.
 *
 * @param {string} userId - The ID of the user.
 * @param {string} clientAccessToken - The access token of the client.
 * @param {string[]} scopes - The scopes for which the authorization code is requested. Multiple scopes can be passed.
 * @returns {Promise<TinkAuthorizationCode>} A Promise that resolves with the authorization code.
 */
const fetchAuthorizationCode = async (
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
const fetchUserGrantAuthorizationCode = async (
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

export {
  fetchClientAccessToken,
  fetchAuthorizationCode,
  fetchUserAccessToken,
  fetchUserGrantAuthorizationCode,
};
