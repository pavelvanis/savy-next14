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

//
// ----------------------------- Account -----------------------------

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

export type TinkAccounts = { accounts: TinkAccount[]; nextPageToken: string };

//
// ----------------------------- Balances -----------------------------

export type TinkBalances = {
  accountId: string;
  refreshed: number;
  balances: {
    booked: Balance;
    available: Balance;
    creditLimit: Balance | null;
  };
};

//
// ----------------------------- Transactions -----------------------------

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

export type TinkTransactions = {
  nextPageToken: string;
  transactions: TinkTransaction[];
};

//
// ----------------------------- Enrich Transactions -----------------------------

type EnrichedData = {
  brandIdentification: {
    id: string;
    logoUri: string;
    name: string;
    status: {
      code: string;
      message: string;
    };
  };
  categories: {
    pfm: {
      id: string;
    };
    status: {
      code: string;
      message: string;
    };
  };
  sustainability: {
    co2InGrams: string;
    status: {
      code: string;
      message: string;
    };
  };
};

export type TinkEnrichedTransaction = Omit<TinkTransaction, "categories"> & {
  bookedDateTime: string;
  enrichedData: EnrichedData;
};

export type TinkEnrichedTransactions = {
  nextPageToken: string;
  transactions: TinkEnrichedTransaction[];
};

//
// ----------------------------- Category -----------------------------

export type TinkCategory = {
  code: string;
  defaultChild: boolean;
  id: string;
  parent: string | null;
  primaryName: string | null;
  searchTerms: string | null;
  secondaryName: string | null;
  sortOrder: number;
  type: string;
  typeName: string;
};

export type TinkCategories = TinkCategory[];
