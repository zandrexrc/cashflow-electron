export type Account = {
  accountId: number;
  name: string;
  type: string;
  balance: number;
};

export type Subscription = {
  subscriptionId: number;
  name: string;
  firstBillingDate: string;
  nextBillingDate: Date;
  cycle: string;
  category: string | null;
  amount: number;
  accountId: number;
};

export type Transaction = {
  transactionId: number;
  date: string;
  description: string;
  category: string | null;
  amount: number;
  accountId: number;
};

export type Settings = {
  currency: string;
  dateFormat: string;
  appTheme: string;
  firstTimeUser?: boolean | null | undefined;
};

// Forms
export type NewAccount = {
  name: string;
  type: string;
  balance: number;
};

export type NewSubscription = {
  name: string;
  firstBillingDate: string;
  cycle: string;
  category: string | null;
  amount: number;
  accountId: number | null;
};

export type NewTransaction = {
  date: string;
  description: string;
  category: string | null;
  amount: number;
  accountId: number | null;
};
