import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Account, Settings, Subscription, Transaction } from './objects';
import { ToastState } from './ui';

export type ReduxAction = {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
};

export type ReduxState = {
  activePage: number;
  isFetching: boolean;
  dataIsLoaded: boolean;
  error: string | null;
  toastState: ToastState;
  settings: Settings;
  accounts: Account[];
  subscriptions: Subscription[];
  transactions: Transaction[];
};

export type ReduxThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action<string>
>;
