import store from '../redux/store';
import { isValidCurrencyAmount } from './miscUtils';
import { Account, NewAccount, Transaction, ReduxState } from '../types';

/**
 * Returns the name of the account given by the account ID
 * @param {number} accountId: the account ID
 * @return {string}: name of the account (empty string if no account matched )
 */
function getAccountName(accountId: number) {
  const { accounts } = store.getState() as ReduxState;
  const account = accounts.find((a) => a.accountId === accountId);
  return account ? account.name : '';
}

/**
 * Creates a mapping of accountIDs to their respective account names
 * @return {Object}: a map of account IDs and names
 */
function getAccountNames() {
  const { accounts } = store.getState();
  const accountNames: { [key: string]: string } = {};

  for (let i = 0; i < accounts.length; i++) {
    const index = accounts[i].accountId;
    if (index !== null) {
      accountNames[index] = accounts[i].name;
    }
  }

  return accountNames;
}

/**
 * Creates a mapping of account names to their respective account IDs
 * @return {Object}: a map of account names and IDs
 */
function getAccountIds() {
  const { accounts } = store.getState();
  const accountIds: { [key: string]: number | null } = {};

  for (let i = 0; i < accounts.length; i++) {
    accountIds[accounts[i].name] = accounts[i].accountId;
  }

  return accountIds;
}

/**
 * Returns the two most used accounts based on the given transactions.
 * @param {Array<Account>} accounts: a list of accounts
 * @param {Array<Transaction>} transactions: a list of transactions
 * @return {Array<Account>}: the two most used accounts
 */
function calcMostUsedAccounts(
  accounts: Account[],
  transactions: Transaction[]
) {
  // Track the number of occurences of each account
  const accountsCounter: { [key: string]: number } = {};
  for (let i = 0; i < transactions.length; i++) {
    const id = transactions[i].accountId;
    accountsCounter[id] = accountsCounter[id] ? accountsCounter[id] + 1 : 1;
  }

  // Sort accounts by their occurences
  const sortedAccounts: string[] = Object.keys(accountsCounter).sort((a, b) => {
    return -(accountsCounter[a] - accountsCounter[b]);
  });
  let mostUsedAccounts = sortedAccounts.map((id) =>
    accounts.find((a) => a.accountId !== null && a.accountId.toString() === id)
  );

  // Fallback to default order if not enough accounts
  if (mostUsedAccounts[0] === undefined || mostUsedAccounts.length < 2) {
    mostUsedAccounts = accounts;
  }
  return mostUsedAccounts.slice(0, 2);
}

/**
 * Checks if an account has valid values and attributes
 * @param {Account} account: the account to be validated
 * @return {boolean}: true if the account is valid, false otherwise
 */
function validateAccount(account: NewAccount) {
  let isValid = false;

  const hasAllRequiredAttributes =
    account.name && account.type && account.balance;

  if (hasAllRequiredAttributes) {
    const nameIsValid = account.name.trim().length > 0;
    const typeIsValid = account.type.trim().length > 0;
    const balanceIsValid = isValidCurrencyAmount(account.balance.toString());
    isValid = nameIsValid && typeIsValid && balanceIsValid;
  }

  return isValid;
}

export {
  getAccountName,
  getAccountNames,
  getAccountIds,
  calcMostUsedAccounts,
  validateAccount,
};
