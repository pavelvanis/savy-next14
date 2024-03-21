import { TinkApiAxios } from "../axios";

type CreateUserProps = {
  locale?: string;
  market?: string;
};

type TinkApiUser = {
  user_id: string;
  external_user_id?: string;
};

/**
 * Create a new user in Tink API. Default `locale` is "cs_CZ" and `market` is "CZ"
 *
 * ```typescript
 * {locale: "cs_CZ", market: "CZ"}
 * ```
 */
export const createUser = async ({
  locale = "cs_CZ",
  market = "CZ",
}: CreateUserProps): Promise<TinkApiUser | undefined> => {
  try {
    const access_token = await getAccessToken();

    const response = await TinkApiAxios.post(
      "/user/create",
      { locale, market },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );
    const user = response.data as TinkApiUser;

    return user;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Get access token from Tink API only with `user:create` scope.
 */
export const getAccessToken = async (): Promise<string | undefined> => {
  try {
    const response = await TinkApiAxios.post("/oauth/token", {
      client_id: process.env.TINK_CLIENT_ID,
      client_secret: process.env.TINK_CLIENT_SECRET,
      grant_type: "client_credentials",
      scope: "user:create",
    });

    const token = response.data.access_token;

    return token;
  } catch (error) {
    console.error(error);
  }
};
