// -----------------------------------------------
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

// ----------------------------------------------
// Tink API types

// Tink objects
export type TinkPermanentUser = {
  user_id: string;
  external_user_id: string;
};

export type TinkAccessToken = {
  token_type: string;
  expires_in: number;
  access_token: string;
  scope: string;
  id_hint: string | null;
};

export type TinkAuthorizationCode = {
  code: string;
};

// - - - - - - - - - - - - - - - - - - - - - - - -
// Credentials

export type TinkCredential = {
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
};

export type TinkCredentails = TinkCredential[];

// - - - - - - - - - - - - - - - - - - - - - - - -
// Account

type TinkAmount = {
  currencyCode: string;
  value: {
    scale: string;
    unscaledValue: string;
  };
};

type TinkBalances = {
  booked: {
    amount: TinkAmount;
  };
};

type TinkDates = {
  lastRefreshed: string;
};

type TinkIdentifiers = {
  financialInstitution: {
    accountNumber: string;
  };
  iban: {
    bban: string;
    iban: string;
  };
  pan: {
    masked: string;
  };
};

export type TinkAccount = {
  balances: TinkBalances;
  customerSegment: string;
  dates: TinkDates;
  financialInstitutionId: string;
  id: string;
  identifiers: TinkIdentifiers;
  name: string;
  type: string;
};

export type TinkAccounts = {
  accounts: TinkAccount[];
  nextPageToken: string;
};

// - - - - - - - - - - - - - - - - - - - - - - - -
// Balances
