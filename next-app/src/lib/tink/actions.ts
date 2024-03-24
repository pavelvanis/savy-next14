import api from "./api";

if (!process.env.TINK_CLIENT_ID) {
  throw Error("Environment variable `TINK_CLIENT_ID` is not set.");
}

if (!process.env.TINK_CLIENT_SECRET) {
  throw Error("Environment variable `TINK_CLIENT_SECRET` is not set.");
}

/**
 * Creates a new user in Tink.
 *
 * @returns {Promise<Object>} The new user.
 */
const createPermanentUser = async () => {
  const token = await api.getClientAccessToken();
  const permanent_user = await api.createPermanentUser(token);

  return permanent_user;
};

/**
 * Gets an authorization code for a user.
 *
 * @param {string} userId The user ID.
 * @returns {Promise<Object>} The authorization code.
 */
const generateAuthorizationCode = async (userId: string) => {
  const token = await api.getClientAccessToken();
  const authorization_code = await api.getAuthorizationCode(userId, token);

  return authorization_code;
};

/**
 * Gets the credentials for a user.
 *
 * @param {string} userId The user ID.
 * @returns {Promise<Object>} The user credentials.
 */
const getCredentials = async (userId: string) => {
  const clientAccessToken = await api.getClientAccessToken();
  const userGrantAuthorizationCode = await api.getUserGrantAuthorizationCode(
    userId,
    clientAccessToken
  );
  const userAccessToken = await api.getUserAccessToken(
    userGrantAuthorizationCode.code
  );
  const userCredentials = await api.getUserCredentials(
    userAccessToken
  );

  return userCredentials;
};

const getAccounts = async (userId: string) => {
  const clientAccessToken = await api.getClientAccessToken();
  const userGrantAuthorizationCode = await api.getUserGrantAuthorizationCode(
    userId,
    clientAccessToken
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
