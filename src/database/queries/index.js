const accounts = require('./accounts');
const settings = require('./settings');
const subscriptions = require('./subscriptions');
const transactions = require('./transactions');

const queries = {
  accounts,
  transactions,
  subscriptions,
  settings,
};

module.exports = queries;
