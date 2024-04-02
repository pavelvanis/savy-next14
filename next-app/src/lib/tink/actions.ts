import api from "./api";
import { TinkAuthorizationCode, TinkCredentails, TinkPermanentUser } from "@/types/types";

if (!process.env.TINK_CLIENT_ID) {
  throw Error("Environment variable `TINK_CLIENT_ID` is not set.");
}

if (!process.env.TINK_CLIENT_SECRET) {
  throw Error("Environment variable `TINK_CLIENT_SECRET` is not set.");
}

/**
 * Fetches the client access token and create new permanent user.
 *
 * @returns {Promise<TinkPermanentUser>} The new permanent user.
 */
const createPermanentUser = async () => {
  try {
    const token = await api.getClientAccessToken();
    const permanent_user = await api.createPermanentUser(token.access_token);

    return permanent_user;
  } catch (error) {
    // TODO: Handle error & Create logger
    console.log(error);
    return null;
  }
};

/**
 * Gets an authorization code for a user.
 *
 * @param {string} userId The user ID.
 * @returns {Promise<TinkAuthorizationCode>} The authorization code.
 */
const generateAuthorizationCode = async (userId: string) => {
  try {
    const token = await api.getClientAccessToken();
    const authorization_code = await api.getAuthorizationCode(
      userId,
      token.access_token
    );

    return authorization_code;
  } catch (error) {
    // TODO: Handle error & Create logger
    console.log(error);
    return null;
  }
};

/**
 * Gets the credentials for a user.
 *
 * @param {string} userId The permanent user ID.
 * @returns {Promise<TinkCredentails>} The user credentials.
 */
const getCredentials = async (userId: string) => {
  try {
    const clientAccessToken = await api.getClientAccessToken();
    const userGrantAuthorizationCode = await api.getUserGrantAuthorizationCode(
      userId,
      clientAccessToken.access_token
    );
    const userAccessToken = await api.getUserAccessToken(
      userGrantAuthorizationCode.code
    );
    const userCredentials = await api.getUserCredentials(
      userAccessToken.access_token
    );

    return userCredentials;
  } catch (error) {
    // TODO: Handle error & Create logger
    console.log(error);
    return null;
  }
};

// TODO: Implement getAccounts
const getAccounts = async (userId: string) => {
  // TODO
  const clientAccessToken = await api.getClientAccessToken();
  const userGrantAuthorizationCode = await api.getUserGrantAuthorizationCode(
    userId,
    clientAccessToken.access_token
  );
  const userAccessToken = await api.getUserAccessToken(
    userGrantAuthorizationCode.code
  );
};

export {
  createPermanentUser,
  generateAuthorizationCode,
  getCredentials,
  getAccounts,
};
