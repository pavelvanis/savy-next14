// Tink types
export * from './tink';

export interface IUser {
  // Tink properties
  permanentUserId: string;
  // Credentials
  firstName: string;
  lastName: string;
  email: string;
  // consents: boolean;
}
