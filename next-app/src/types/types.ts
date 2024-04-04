// Tink types
export * from './tink';

// Database types

export interface IUser {
  // Tink properties
  permanentUserId: string;
  credentialsId: string;
  //
  emailVerified: boolean;
  // Credentials
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  // consents: boolean;
}
