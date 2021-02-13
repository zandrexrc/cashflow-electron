const { ipcMain } = require('electron');
const queries = require('../database/queries');

// ACCOUNTS
ipcMain.on('GET_ACCOUNTS', async (event) => {
  const result = await queries.accounts.getAccounts();
  event.reply('FETCH_REPLY', result);
});

ipcMain.on('ADD_ACCOUNT', async (event, arg) => {
  const result = await queries.accounts.addAccount(arg);
  event.reply('FETCH_REPLY', result);
});

ipcMain.on('EDIT_ACCOUNT', async (event, arg) => {
  const result = await queries.accounts.editAccount(arg);
  event.reply('FETCH_REPLY', result);
});

ipcMain.on('DELETE_ACCOUNT', async (event, arg) => {
  const result = await queries.accounts.deleteAccount(arg);
  event.reply('FETCH_REPLY', result);
});

ipcMain.on('ADD_MULTIPLE_ACCOUNTS', async (event, arg) => {
  const result = await queries.accounts.addMultipleAccounts(arg);
  event.reply('FETCH_REPLY', result);
});

// SUBSCRIPTIONS
ipcMain.on('GET_SUBSCRIPTIONS', async (event) => {
  const result = await queries.subscriptions.getSubscriptions();
  event.reply('FETCH_REPLY', result);
});

ipcMain.on('ADD_SUBSCRIPTION', async (event, arg) => {
  const result = await queries.subscriptions.addSubscription(arg);
  event.reply('FETCH_REPLY', result);
});

ipcMain.on('EDIT_SUBSCRIPTION', async (event, arg) => {
  const result = await queries.subscriptions.editSubscription(arg);
  event.reply('FETCH_REPLY', result);
});

ipcMain.on('DELETE_SUBSCRIPTION', async (event, arg) => {
  const result = await queries.subscriptions.deleteSubscription(arg);
  event.reply('FETCH_REPLY', result);
});

ipcMain.on('ADD_MULTIPLE_SUBSCRIPTIONS', async (event, arg) => {
  const result = await queries.subscriptions.addMultipleSubscriptions(arg);
  event.reply('FETCH_REPLY', result);
});

// TRANSACTIONS
ipcMain.on('GET_TRANSACTIONS', async (event) => {
  const result = await queries.transactions.getTransactions();
  event.reply('FETCH_REPLY', result);
});

ipcMain.on('ADD_TRANSACTION', async (event, arg) => {
  const result = await queries.transactions.addTransaction(arg);
  event.reply('FETCH_REPLY', result);
});

ipcMain.on('EDIT_TRANSACTION', async (event, arg) => {
  const result = await queries.transactions.editTransaction(arg);
  event.reply('FETCH_REPLY', result);
});

ipcMain.on('DELETE_TRANSACTION', async (event, arg) => {
  const result = await queries.transactions.deleteTransaction(arg);
  event.reply('FETCH_REPLY', result);
});

ipcMain.on('ADD_MULTIPLE_TRANSACTIONS', async (event, arg) => {
  const result = await queries.transactions.addMultipleTransactions(arg);
  event.reply('FETCH_REPLY', result);
});

// SETTINGS
ipcMain.on('GET_SETTINGS', async (event) => {
  const result = await queries.settings.getSettings();
  event.reply('FETCH_REPLY', result);
});

ipcMain.on('EDIT_SETTINGS', async (event, arg) => {
  const result = await queries.settings.editSettings(arg);
  event.reply('FETCH_REPLY', result);
});
