import {
  GET_TRANSACTIONS,
  ADD_TRANSACTION,
  EDIT_TRANSACTION,
  DELETE_TRANSACTION,
  ADD_MULTIPLE_TRANSACTIONS,
} from '../../constants';
import {toggleIsFetching, setError, showToast} from './ui';
import {Transaction, NewTransaction, ReduxThunk} from '../../types';
import fetch from '../../event_emitters/rendererEmitters';


export function getTransactions(): ReduxThunk {
  return async (dispatch, getState) => {
    if (!getState().isFetching) {
      dispatch(toggleIsFetching(true));
      try {
        const payload = await fetch(GET_TRANSACTIONS, null);

        if (payload.error) {
          throw (payload.error);
        }

        dispatch(toggleIsFetching(false));
        dispatch({
          type: GET_TRANSACTIONS,
          payload: payload
        });
      } catch (error) {
        dispatch(toggleIsFetching(false));
        dispatch(setError(error));
      }
    }
  };
}

export function addTransaction(newTransaction: NewTransaction): ReduxThunk {
  return async (dispatch, getState) => {
    if (!getState().isFetching) {
      dispatch(toggleIsFetching(true));
      try {
        const payload = await fetch(ADD_TRANSACTION, newTransaction);

        if (payload.error) {
          throw (payload.error);
        }

        dispatch(toggleIsFetching(false));
        dispatch({
          type: ADD_TRANSACTION,
          payload: payload
        });
        dispatch(showToast('Successfully added transaction', 'success'));
      } catch (error) {
        dispatch(toggleIsFetching(false));
        dispatch(setError(error));
      }
    }
  };
}

export function editTransaction(newTransaction: Transaction): ReduxThunk {
  return async (dispatch, getState) => {
    if (!getState().isFetching) {
      dispatch(toggleIsFetching(true));
      try {
        const payload = await fetch(EDIT_TRANSACTION, newTransaction);

        if (payload.error) {
          throw (payload.error);
        }

        dispatch(toggleIsFetching(false));
        dispatch({
          type: EDIT_TRANSACTION,
          payload: payload
        });
        dispatch(showToast('Successfully edited transaction', 'success'));
      } catch (error) {
        dispatch(toggleIsFetching(false));
        dispatch(setError(error));
      }
    }
  };
}

export function deleteTransaction(id: number): ReduxThunk {
  return async (dispatch, getState) => {
    if (!getState().isFetching) {
      dispatch(toggleIsFetching(true));
      try {
        const payload = await fetch(DELETE_TRANSACTION, id);

        if (payload.error) {
          throw (payload.error);
        }

        dispatch(toggleIsFetching(false));
        dispatch({
          type: DELETE_TRANSACTION,
          payload: payload.transactionId
        });
        dispatch(showToast('Successfully deleted transaction', 'success'));
      } catch (error) {
        dispatch(toggleIsFetching(false));
        dispatch(setError(error));
      }
    }
  };
}

export function addMultipleTransactions(newTransactions: NewTransaction[]): ReduxThunk {
  return async (dispatch, getState) => {
    if (!getState().isFetching) {
      dispatch(toggleIsFetching(true));
      try {
        const payload = await fetch(ADD_MULTIPLE_TRANSACTIONS, newTransactions);

        if (payload.error) {
          throw (payload.error);
        }

        dispatch(toggleIsFetching(false));
        dispatch({
          type: ADD_MULTIPLE_TRANSACTIONS,
          payload: payload
        });
        dispatch(showToast('Successfully added transactions', 'success'));
      } catch (error) {
        dispatch(toggleIsFetching(false));
        dispatch(setError(error));
      }
    }
  };
}
