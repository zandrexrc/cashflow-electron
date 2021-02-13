import { isValid as isValidDate } from 'date-fns';

import { isValidCurrencyAmount } from './miscUtils';
import { Transaction, NewTransaction, Subscription, Filters } from '../types';

/**
 * Returns a list of all the categories in the transactions.
 * @param {Array<Transaction>} transactions: a list of transactions
 * @return {Array<string>}: a list of categories
 */
function getCategories(transactions: Transaction[] | Subscription[]) {
  const categories: string[] = [];
  for (let i = 0; i < transactions.length; i++) {
    const { category } = transactions[i];
    if (category && !categories.includes(category)) {
      categories.push(category);
    }
  }
  return categories;
}

/**
 * Calculates the total amount of each category.
 * @param {Array<Transaction|Subscription>} items: a list of transactions or subscriptions
 * @return {Object}: an object containing all categories and their total amounts
 */
function calcCategoryAmounts(items: Transaction[] | Subscription[]) {
  const categoryAmounts: { [key: string]: number } = {};
  for (let i = 0; i < items.length; i++) {
    const ctg = items[i].category;
    if (ctg !== null) {
      const category = ctg.toLowerCase();
      categoryAmounts[category] = categoryAmounts[category]
        ? categoryAmounts[category] + items[i].amount
        : items[i].amount;
    } else {
      categoryAmounts.uncategorized = categoryAmounts.uncategorized
        ? categoryAmounts.uncategorized + items[i].amount
        : items[i].amount;
    }
  }
  return categoryAmounts;
}

/**
 * Returns a list of all the years in which the transactions are logged.
 * @param {Array<Transaction>} transactions: a list of transactions
 * @return {Array<number>}: a list of years
 */
function getTransactionYears(transactions: Transaction[]) {
  const years: number[] = [];
  for (let i = 0; i < transactions.length; i++) {
    const year = parseInt(transactions[i].date.substring(0, 4), 10);
    if (!years.includes(year)) {
      years.push(year);
    }
  }
  return years;
}

/**
 * Determines if a transaction passes the account filter.
 * @param {String} term: the account filter ("all" or accountId)
 * @param {Transaction} transaction: a transaction object
 * @return {boolean}: true if the transaction passes the filter, false if not
 */
const filterByAccount = (term: string, transaction: Transaction) => {
  return term === 'All' || parseInt(term, 10) === transaction.accountId;
};

/**
 * Determines if a transaction passes the category filter.
 * @param {String} term: the category filter ("all" or category name)
 * @param {Transaction} transaction: a transaction object
 * @return {boolean}: true if the transaction passes the filter, false if not
 */
const filterByCategory = (term: string, transaction: Transaction) => {
  if (transaction.category) {
    return term === 'All' || transaction.category === term;
  }
  return term === 'All' || term === 'Uncategorized';
};

/**
 * Determines if a transaction passes the date filter.
 * @param {Object} term: the date filter with month and year fields
 * @param {Transaction} transaction: a transaction object
 * @return {boolean}: true if the transaction passes the filter, false if not
 */
const filterByDate = (
  term: { month: number; year: number },
  transaction: Transaction
) => {
  const date = new Date(transaction.date);
  if (term.month === -1) {
    return term.year === date.getFullYear();
  }
  return term.month === date.getMonth() && term.year === date.getFullYear();
};

/**
 * Converts a Date into milliseconds since epoch time
 * @param {Date} date: the date to be converted
 * @return {number}: the date in milliseconds since epoch time
 */
function getDateTime(date: Date | undefined | null) {
  if (date !== null && date !== undefined) {
    return date.getTime();
  }
  return 0;
}

/**
 * Filter the transactions list based on a given set of filtering conditions.
 * @param {Array<Transaction>} transactions: a list of transactions
 * @param {Object} filters: the filter conditions to be used
 * @return {Array<Transaction>}: the filtered list of transactions
 */
function filterTransactions(transactions: Transaction[], filters: Filters) {
  return transactions
    .filter(
      (t) =>
        filterByAccount(filters.account, t) &&
        filterByCategory(filters.category, t) &&
        filterByDate(filters.date, t)
    )
    .sort(
      (a, b) => getDateTime(new Date(b.date)) - getDateTime(new Date(a.date))
    );
}

/**
 * Checks if a transaction has valid values and attributes
 * @param {Transaction} transaction: the transaction to be validated
 * @return {boolean}: true if the transaction is valid, false otherwise
 */
function validateTransaction(transaction: NewTransaction) {
  let isValid = false;

  const hasAllRequiredAttributes =
    transaction.date &&
    transaction.description &&
    transaction.amount &&
    transaction.accountId;

  if (hasAllRequiredAttributes) {
    const dateisValid = isValidDate(new Date(transaction.date));
    const descriptionIsValid = transaction.description.trim().length > 0;
    const amountIsValid = isValidCurrencyAmount(transaction.amount.toString());
    isValid = dateisValid && descriptionIsValid && amountIsValid;
  }

  return isValid;
}

/**
 * Calculates the income, expenses, and net income from the transactions
 * @param {Array<Transaction>} transactions: a list of transactions
 * @return {Object}: an object containing the income, expenses, and net income
 */
function calcNetIncome(transactions: Transaction[]) {
  let totalIncome = 0;
  let totalExpenses = 0;

  for (let i = 0; i < transactions.length; i++) {
    const { amount } = transactions[i];
    if (amount < 0) {
      totalExpenses += Math.abs(amount);
    } else {
      totalIncome += amount;
    }
  }

  const netIncome = totalIncome - totalExpenses;
  return { totalIncome, totalExpenses, netIncome };
}

export {
  getTransactionYears,
  getCategories,
  calcCategoryAmounts,
  filterTransactions,
  validateTransaction,
  calcNetIncome,
};
