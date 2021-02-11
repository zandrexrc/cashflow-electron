// Accounts
export const SampleAccount = Object.freeze({
  name: 'Personal',
  type: 'Checking',
  balance: 4200.42,
});

// Subscriptions
export const SampleSubscription = Object.freeze({
  name: 'Netflix',
  firstBillingDate: '2020-07-11',
  cycle: 'monthly',
  account: 'Personal',
  category: 'Entertainment',
  amount: -89,
});

// Transactions
export const SampleTransaction = Object.freeze({
  date: '2020-07-11',
  description: 'Lunch with Alice and Bob',
  account: 'Personal',
  category: 'Food',
  amount: -99.99,
});

// Settings
export const InitialSettings = Object.freeze({
  currency: 'NOK',
  dateFormat: 'dd.MM.yyyy',
  appTheme: 'light',
});
