"use server";

import api from "@/lib/tink/api";
import { AxiosError } from "axios";

type GetCredentialsProps = {
  permanentUserId: string;
  credentialsId: string;
};

type Credentials = [
  {
    id: string;
    providerName: string;
    type: string;
    status: string;
    statusUpdated: number;
    statusPayload: string;
    updated: number;
    fields: {};
    sessionExpiryDate: number;
    userId: string;
  }
];

/**
 * Gets the credentials for a user.
 *
 * @param {string} userId The user ID.
 * @returns {Promise<Object>} The user credentials.
 */
const getCredentials = async (userId: string) => {
  try {
    console.log("User id", userId);
    const clientAccessToken = await api.getClientAccessToken();
    console.log("CLIENT ACCESS TOKEN\n\n", clientAccessToken);
    const userGrantAuthorizationCode = await api.getUserGrantAuthorizationCode(
      userId,
      clientAccessToken.access_token
    );
    console.log("USER GRANT", userGrantAuthorizationCode);
    const userAccessToken = await api.getUserAccessToken(
      userGrantAuthorizationCode.code
    );
    console.log("USER ACCESS\n\n", userAccessToken);
    const userCredentials = await api.getUserCredentials(userAccessToken.access_token);

    console.log("List of credentials:", userCredentials);

    return userCredentials as Credentials;
  } catch (error) {
    // console.log(error);
    if (error instanceof AxiosError) {
      console.log("Error when getting credentails:  ", error);
    } else {
      console.log("Error in getCredentials");
    }
    return null;
  }
};

export { getCredentials };
