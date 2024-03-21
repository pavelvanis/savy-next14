import { headers } from "next/headers";
import { TinkApiAxios } from "../axios";

export const addAccount = async () => {
  console.log("Creating account...");
  const token = await accessToken();
  if (!token) return;
  const user = await createUser(token);
  if (!user) return;
  const code = await authorizationGrant(token, user);
  if (!code) return;
};

// access token (credentials)
const accessToken = async (): Promise<string | undefined> => {
  try {
    const response = await TinkApiAxios.post(
      "/oauth/token",
      {
        client_id: process.env.TINK_CLIENT_ID,
        client_secret: process.env.TINK_CLIENT_SECRET,
        grant_type: "client_credentials",
        scope: "authorization:grant,user:create",
      },
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const access_token = response.data.access_token;
    console.log("Access token:", access_token);
    return access_token;
  } catch (error) {
    console.log(error);
  }
};

// create user
const createUser = async (token: string): Promise<string | undefined> => {
  try {
    const response = await TinkApiAxios.post(
      "/user/create",
      { locale: "en_US", market: "SE" },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );
    const user_id = response.data.user_id;
    console.log("User was created:", user_id);
    return user_id;
  } catch (error) {
    console.log(error);
  }
};

// authorization-grant
const authorizationGrant = async (
  token: string,
  user_id: string
): Promise<string | undefined> => {
  try {
    const response = await TinkApiAxios.post(
      "/authorization-grant",
      {
        user_id: user_id,
        scope:
          "accounts:read,transactions:read,credentials:read,credentials:refresh,credentials:write,providers:read,user:read,authorization:read",
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const code = response.data.code;

    console.log("Authorization grant:", code);

    return code;
  } catch (error) {
    console.log(error);
  }
};

// access token (code)

// authorization-grant/delegate

// Tink Link
