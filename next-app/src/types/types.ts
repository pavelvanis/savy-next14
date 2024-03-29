// ----------------------------------------------------------------------
// Database types

export interface IUser {
  permanentUserId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// ----------------------------------------------------------------------
// Tink API types

export type TinkPermanentUser = {
  user_id: string;
  external_user_id: string;
};
