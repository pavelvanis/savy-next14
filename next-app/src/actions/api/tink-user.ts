import { TinkConfig } from "@/config/tink";
import { TinkApiAxios } from "@/lib/axios";
import { checkEnv, log } from "@/lib/utils";
import { TinkPermanentUser } from "@/types/types";

const LOCALE = TinkConfig.locale;
const MARKET = TinkConfig.market;

checkEnv(
  "TINK_CLIENT_ID",
  "TINK_CLIENT_SECRET",
  "DELEGATED_TINK_LINK_CLIENT_ID"
);

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

export { createPermanentUser };
