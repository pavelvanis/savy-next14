// ----------------------------------------------------------------------
// Database types

export interface IUser {
  // Tink properties
  permanentUserId: string;
  credentialsId: string;
  // Credentials
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  // consents: boolean;
}

// ----------------------------------------------------------------------
// Tink API types

export type TinkPermanentUser = {
  user_id: string;
  external_user_id: string;
};
