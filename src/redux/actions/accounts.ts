
import {
  GET_ACCOUNTS,
  ADD_ACCOUNT,
  EDIT_ACCOUNT,
  DELETE_ACCOUNT,
  DELETE_SUBSCRIPTIONS_IN_ACCOUNT,
  DELETE_TRANSACTIONS_IN_ACCOUNT,
  UPDATE_ACCOUNT_BALANCE,
  ADD_MULTIPLE_ACCOUNTS,
} from '../../constants';
import {toggleIsFetching, setError, showToast} from './ui';
import {Account, NewAccount, ReduxThunk} from '../../types';
import fetch from '../../event_emitters/rendererEmitters';


export function getAccounts(): ReduxThunk {
  return async (dispatch, getState) => {
    if (!getState().isFetching) {
      dispatch(toggleIsFetching(true));
      try {
        const payload = await fetch(GET_ACCOUNTS, null);

        if (payload.error) {
          throw (payload.error);
        }

        dispatch(toggleIsFetching(false));
        dispatch({
          type: GET_ACCOUNTS,
          payload: payload
        });
      } catch (error) {
        dispatch(toggleIsFetching(false));
        dispatch(setError(error));
      }
    }
  };
}

export function addAccount(newAccount: NewAccount): ReduxThunk {
  return async (dispatch, getState) => {
    if (!getState().isFetching) {
      dispatch(toggleIsFetching(true));
      try {
        const payload = await fetch(ADD_ACCOUNT, newAccount);

        if (payload.error) {
          throw (payload.error);
        }

        dispatch(toggleIsFetching(false));
        dispatch({
          type: ADD_ACCOUNT,
          payload: payload
        });
        dispatch(showToast('Successfully added account', 'success'));
      } catch (error) {
        dispatch(toggleIsFetching(false));
        dispatch(setError(error));
      }
    }
  };
}

export function editAccount(newAccount: Account): ReduxThunk {
  return async (dispatch, getState) => {
    if (!getState().isFetching) {
      dispatch(toggleIsFetching(true));
      try {
        const payload = await fetch(EDIT_ACCOUNT, newAccount);

        if (payload.error) {
          throw (payload.error);
        }

        dispatch(toggleIsFetching(false));
        dispatch({
          type: EDIT_ACCOUNT,
          payload: payload
        });
        dispatch(showToast('Successfully edited account', 'success'));
      } catch (error) {
        dispatch(toggleIsFetching(false));
        dispatch(setError(error));
      }
    }
  };
}

export function deleteAccount(id: number): ReduxThunk {
  return async (dispatch, getState) => {
    if (!getState().isFetching) {
      dispatch(toggleIsFetching(true));
      try {
        const payload = await fetch(DELETE_ACCOUNT, id);

        if (payload.error) {
          throw (payload.error);
        }

        dispatch(toggleIsFetching(false));
        dispatch({
          type: DELETE_TRANSACTIONS_IN_ACCOUNT,
          payload: payload.accountId
        });
        dispatch({
          type: DELETE_SUBSCRIPTIONS_IN_ACCOUNT,
          payload: payload.accountId
        });
        dispatch({
          type: DELETE_ACCOUNT,
          payload: payload.accountId
        });
        dispatch(showToast('Successfully deleted account', 'success'));
      } catch (error) {
        dispatch(toggleIsFetching(false));
        dispatch(setError(error));
      }
    }
  };
}

export const updateAccountBalance = (id: number, amount: number) => ({
  type: UPDATE_ACCOUNT_BALANCE,
  payload: {id, amount},
});

export function addMultipleAccounts(newAccounts: NewAccount[]): ReduxThunk {
  return async (dispatch, getState) => {
    if (!getState().isFetching) {
      dispatch(toggleIsFetching(true));
      try {
        const payload = await fetch(ADD_MULTIPLE_ACCOUNTS, newAccounts);

        if (payload.error) {
          throw (payload.error);
        }

        dispatch(toggleIsFetching(false));
        dispatch({
          type: ADD_MULTIPLE_ACCOUNTS,
          payload: payload
        });
        dispatch(showToast('Successfully added accounts', 'success'));
      } catch (error) {
        dispatch(toggleIsFetching(false));
        dispatch(setError(error));
      }
    }
  };
}
