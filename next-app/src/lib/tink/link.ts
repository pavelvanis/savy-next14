import { TinkConfig } from "@/config/tink";

const TEST = process.env.NODE_ENV === "production" ? "false" : "true";
const CLIENT_ID = process.env.TINK_CLIENT_ID;

/**
 * Generates a URL for authenticating credentials in the Tink system.
 * Read more about Tink Link initialization parameters: https://docs.tink.com/api/#initialization-parameters
 */

/**
 * Generates a URL for authenticating credentials in the Tink system.
 */
export const authenticateCredentialsLink = (
  authorizationCode: string,
  userId: string,
  credentialsId: string,
  callbackUrl: string = TinkConfig.defaultCallback
) => {
  const scopes = [
    `client_id=${CLIENT_ID}`,
    `redirect_uri=${callbackUrl}`,
    "scope=user:read,credentials:read,transactions:read,balances:read,accounts:read",
    `market=${TinkConfig.market}`,
    `locale=${TinkConfig.locale}`,
    `state=${userId}`,
    `authorization_code=${authorizationCode}`,
    `credentials_id=${credentialsId}`,
    `test=${TEST}`,
  ];

  return `${TinkConfig.linkBaseUrl}/1.0/credentials/authenticate?${scopes.join(
    "&"
  )}`;
};

/**
 * Generates a URL for adding credentials in the Tink system.
 */
export const addCredentialsLink = (
  authorizationCode: string,
  userId: string,
  callbackUrl: string = TinkConfig.defaultCallback
) => {
  const scopes = [
    `client_id=${CLIENT_ID}`,
    `redirect_uri=${callbackUrl}`,
    "scope=user:read,credentials:read,transactions:read,balances:read,accounts:read",
    `market=${TinkConfig.market}`,
    `locale=${TinkConfig.locale}`,
    `state=${userId}`,
    `authorization_code=${authorizationCode}`,
    `test=${TEST}`,
  ];

  return `${TinkConfig.linkBaseUrl}/1.0/credentials/add?${scopes.join("&")}`;
};

export const authorizeCredentialsLink = (
  authorizationCode: string,
  userId: string,
  credentialsId: string,
  callbackUrl: string = TinkConfig.defaultCallback
) => {
  const scopes = [
    `client_id=${CLIENT_ID}`,
    `redirect_uri=${callbackUrl}`,
    "scope=user:read,credentials:read,transactions:read,balances:read,accounts:read",
    `market=${TinkConfig.market}`,
    `locale=${TinkConfig.locale}`,
    `state=${userId}`,
    `authorization_code=${authorizationCode}`,
    `test=${TEST}`,
  ];

  return `${TinkConfig.linkBaseUrl}/1.0/credentials/authenticate?${scopes.join(
    "&"
  )}`;
};
