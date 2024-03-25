import { TinkConfig } from "@/config/tink";

const TEST = process.env.NODE_ENV === "production" ? "false" : "true";
const CLIENT_ID = process.env.TINK_CLIENT_ID;

/**
 * TinkLinkProps is a type that represents the properties required to create a Tink Link.
 * It includes mandatory properties like endpoint, client_id, and redirect_uri, and optional properties like scope, market, locale, etc.
 */
type TinkLinkProps = {
  endpoint: string;
  client_id: string;
  redirect_uri: string;
} & Partial<{
  scope: string;
  market: string;
  locale: string;
  state: string;
  session_id: string;
  input_username: string;
  input_provider: string;
  iframe: string;
  app_uri: string;
  theme: "DARK" | "LIGHT";
}>;

/**
 * createTinkLink is a function that takes a TinkLinkProps object and returns a Tink Link.
 */
export const createTinkLink = ({
  endpoint,
  redirect_uri,
  ...props
}: TinkLinkProps) => {
  const params = makeParams({
    redirect_uri: encodeURIComponent(redirect_uri),
    ...Object.fromEntries(
      Object.entries(props).map(([key, value]) => [
        key,
        encodeURIComponent(value),
      ])
    ),
  });

  const link = `${TinkConfig.linkBaseUrl}${endpoint}?${params}`;

  return link;
};

/**
 * makeParams is a helper function that takes an object of key-value pairs and returns a URL-encoded string.
 * It is used by createTinkLink to create the query string for the Tink Link.
 */
const makeParams = (params: Record<string, string>) => {
  return Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
};

export const authenticateCredentialsLink = (
  authorizationCode: string,
  userId: string,
  credentialsId: string
) => {
  // Read more about Tink Link initialization parameters: https://docs.tink.com/api/#initialization-parameters
  const params = [
    `client_id=${CLIENT_ID}`,
    `redirect_uri=${TinkConfig.callback}`,
    "scope=user:read,credentials:read",
    `market=${TinkConfig.market}`,
    `locale=${TinkConfig.locale}`,
    `state=${userId}`,
    `authorization_code=${authorizationCode}`,
    `credentials_id=${credentialsId}`,
    `test=${TEST}`,
  ];

  return `${TinkConfig.linkBaseUrl}/1.0/credentials/authenticate?${params.join(
    "&"
  )}`;
};

export const addCredentialsLink = (
  authorizationCode: string,
  userId: string
) => {
  const params = [
    `client_id=${CLIENT_ID}`,
    `redirect_uri=${TinkConfig.callback}`,
    "scope=user:read,credentials:read",
    `market=${TinkConfig.market}`,
    "locale=en_US",
    `state=${userId}`,
    `authorization_code=${authorizationCode}`,
    `test=${TEST}`,
  ];

  return `${TinkConfig.linkBaseUrl}/1.0/credentials/add?${params.join("&")}`;
};
