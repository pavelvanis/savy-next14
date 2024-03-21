import { TinkConfig } from "@/config/tink";

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

  const link = `${TinkConfig.url}${endpoint}?${params}`;

  console.log(link);

  return `${TinkConfig.url}${endpoint}?${params}`;
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
