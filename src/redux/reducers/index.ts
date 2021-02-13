import { combineReducers } from 'redux';

import accounts from './accounts';
import settings from './settings';
import subscriptions from './subscriptions';
import transactions from './transactions';
import { activePage, isFetching, error, dataIsLoaded, toastState } from './ui';
import { ReduxState } from '../../types';

const rootReducer = combineReducers({
  activePage,
  isFetching,
  dataIsLoaded,
  error,
  toastState,
  settings,
  accounts,
  subscriptions,
  transactions,
});

const initialState: ReduxState = {
  activePage: 0,
  isFetching: false,
  dataIsLoaded: false,
  error: '',
  toastState: {
    isOpen: false,
    message: '',
    severity: 'success',
  },
  settings: {
    currency: 'NOK',
    dateFormat: 'dd.MM.yyyy',
    appTheme: 'light',
  },
  accounts: [],
  subscriptions: [],
  transactions: [],
};

export { rootReducer, initialState };
