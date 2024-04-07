// Tink types
export * from './tink';

// Database types

export interface IUser {
  // Tink properties
  permanentUserId: string;
  // Credentials
  firstName: string;
  lastName: string;
  email: string;
  // consents: boolean;
}
