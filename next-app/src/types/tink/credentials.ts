export type CredentialStatus =
  | "CREATED"
  | "UPDATED"
  | "DELETED"
  | "UPDATING"
  | "AUTHENTICATING"
  | "AWAITING_MOBILE_BANKID_AUTHENTICATION"
  | "AWAITING_SUPPLEMENTAL_INFORMATION"
  | "AWAITING_THIRD_PARTY_APP_AUTHENTICATION"
  | "AUTHENTICATION_ERROR"
  | "SESSION_EXPIRED"
  | "TEMPORARY_ERROR"
  | "PERMANENT_ERROR";

export type TinkCredential = {
  id: string;
  providerName: string;
  type: string;
  status: CredentialStatus;
  statusUpdated: number;
  statusPayload: string;
  updated: number;
  fields: Record<string, unknown>; // Same as fields: {}
  sessionExpiryDate: number;
  userId: string;
};

export type TinkCredentials = { credentials: TinkCredential[] };
