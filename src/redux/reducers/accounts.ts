import {
  GET_ACCOUNTS,
  ADD_ACCOUNT,
  EDIT_ACCOUNT,
  DELETE_ACCOUNT,
  UPDATE_ACCOUNT_BALANCE,
  ADD_MULTIPLE_ACCOUNTS,
} from '../../constants';
import { Account, ReduxAction } from '../../types';

const editAccount = (items: Account[], newItem: Account) => {
  const updatedItems = [...items];
  const index = updatedItems.findIndex(
    (a) => a.accountId === newItem.accountId
  );
  updatedItems[index] = newItem;
  return updatedItems;
};

const updateBalance = (items: Account[], id: number, amount: number) => {
  const account = items.find((a) => a.accountId === id);
  if (account) {
    account.balance += amount;
    return editAccount(items, account);
  }
  return null;
};

const accounts = (state: Account[] = [], action: ReduxAction) => {
  switch (action.type) {
    case GET_ACCOUNTS:
      return action.payload;
    case ADD_ACCOUNT:
      return [...state, action.payload];
    case EDIT_ACCOUNT:
      return editAccount(state, action.payload);
    case DELETE_ACCOUNT:
      return state.filter((a) => a.accountId !== action.payload);
    case UPDATE_ACCOUNT_BALANCE:
      return updateBalance(state, action.payload.id, action.payload.amount);
    case ADD_MULTIPLE_ACCOUNTS:
      return state.concat(action.payload);
    default:
      return state;
  }
};

export default accounts;
