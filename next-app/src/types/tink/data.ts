type CurrencyValue = {
  currencyCode: string;
  value: {
    scale: string | number;
    unscaledValue: string | number;
  };
};

type Balance = {
  unscaledValue: number;
  scale: number;
  currencyCode: string;
};

type Identifiers = {
  iban: {
    iban: string;
    bban: string;
  };
  financialInstitution: {
    accountNumber: string;
    referenceNumbers: Record<string, unknown>; // Same as referenceNumbers: {}
  };
};

export type TinkCredential = {
  id: string;
  providerName: string;
  type: string;
  status: string;
  statusUpdated: number;
  statusPayload: string;
  updated: number;
  fields: Record<string, unknown>; // Same as fields: {}
  sessionExpiryDate: number;
  userId: string;
};

export type TinkAccount = {
  id: string;
  name: string;
  type: string;
  balances: {
    booked: { amount: CurrencyValue };
    available: { amount: CurrencyValue };
  };
  identifiers: Identifiers;
  dates: {
    lastRefreshed: string;
  };
  financialInstitutionId: string;
  customerSegment: string;
};

export type TinkBalances = {
  accountId: string;
  refreshed: number;
  balances: {
    booked: Balance;
    available: Balance;
    creditLimit: Balance | null;
  };
};

export type TinkTransaction = {
  accountId: string;
  amount: CurrencyValue;
  categories: {
    pfm: {
      id: string;
      name: string;
    };
  };
  dates: {
    booked: string;
    value: string;
  };
  descriptions: {
    display: string;
    original: string;
  };
  id: string;
  identifiers: {
    providerTransactionId: string;
  };
  merchantInformation: {
    merchantCategoryCode: string;
    merchantName: string;
  };
  providerMutability: string;
  reference: string;
  status: string;
  types: {
    financialInstitutionTypeCode: string;
    type: string;
  };
};

export type TinkCredentials = TinkCredential[];
export type TinkAccounts = { accounts: TinkAccount[]; nextPageToken: string };
export type TinkTransactions = {
  nextPageToken: string;
  transactions: TinkTransaction[];
};
