import {
  GET_SUBSCRIPTIONS,
  ADD_SUBSCRIPTION,
  EDIT_SUBSCRIPTION,
  DELETE_SUBSCRIPTION,
  ADD_MULTIPLE_SUBSCRIPTIONS,
} from '../../constants';
import {toggleIsFetching, setError, showToast} from './ui';
import {Subscription, NewSubscription, ReduxThunk} from '../../types';
import {calcNextBillingDate} from '../../utils';
import fetch from '../../event_emitters/rendererEmitters';


export function getSubscriptions(): ReduxThunk {
  return async (dispatch, getState) => {
    if (!getState().isFetching) {
      dispatch(toggleIsFetching(true));
      try {
        const payload = await fetch(GET_SUBSCRIPTIONS, null);

        if (payload.error) {
          throw (payload.error);
        }

        // Calculate next billing date
        for (let i = 0; i < payload.length; i++) {
          const nextBillingDate = calcNextBillingDate(
              payload[i].firstBillingDate, payload[i].cycle,
          );
          payload[i] = {...payload[i], nextBillingDate};
        }

        dispatch(toggleIsFetching(false));
        dispatch({
          type: GET_SUBSCRIPTIONS,
          payload: payload
        });
      } catch (error) {
        dispatch(toggleIsFetching(false));
        dispatch(setError(error));
      }
    }
  };
}

export function addSubscription(newSubscription: NewSubscription): ReduxThunk {
  return async (dispatch, getState) => {
    if (!getState().isFetching) {
      dispatch(toggleIsFetching(true));
      try {
        const payload = await fetch(ADD_SUBSCRIPTION, newSubscription);

        if (payload.error) {
          throw (payload.error);
        }

        // Calculate next billing date
        const nextBillingDate = calcNextBillingDate(
            payload.firstBillingDate, payload.cycle,
        );
        const subscription = {...payload, nextBillingDate};

        dispatch(toggleIsFetching(false));
        dispatch({
          type: ADD_SUBSCRIPTION,
          payload: subscription
        });
        dispatch(showToast('Successfully added subscription', 'success'));
      } catch (error) {
        dispatch(toggleIsFetching(false));
        dispatch(setError(error));
      }
    }
  };
}

export function editSubscription(newSubscription: Subscription): ReduxThunk {
  return async (dispatch, getState) => {
    if (!getState().isFetching) {
      dispatch(toggleIsFetching(true));
      try {
        const payload = await fetch(EDIT_SUBSCRIPTION, newSubscription);

        if (payload.error) {
          throw (payload.error);
        }

        // Calculate next billing date
        const nextBillingDate = calcNextBillingDate(
            payload.firstBillingDate, payload.cycle,
        );
        const subscription = {...payload, nextBillingDate};

        dispatch(toggleIsFetching(false));
        dispatch({
          type: EDIT_SUBSCRIPTION,
          payload: subscription
        });
        dispatch(showToast('Successfully edited subscription', 'success'));
      } catch (error) {
        dispatch(toggleIsFetching(false));
        dispatch(setError(error));
      }
    }
  };
}

export function deleteSubscription(id: number): ReduxThunk {
  return async (dispatch, getState) => {
    if (!getState().isFetching) {
      dispatch(toggleIsFetching(true));
      try {
        const payload = await fetch(DELETE_SUBSCRIPTION, id);

        if (payload.error) {
          throw (payload.error);
        }

        dispatch(toggleIsFetching(false));
        dispatch({
          type: DELETE_SUBSCRIPTION,
          payload: payload.subscriptionId
        });
        dispatch(showToast('Successfully deleted subscription', 'success'));
      } catch (error) {
        dispatch(toggleIsFetching(false));
        dispatch(setError(error));
      }
    }
  };
}

export function addMultipleSubscriptions(newSubscriptions: NewSubscription[]): ReduxThunk {
  return async (dispatch, getState) => {
    if (!getState().isFetching) {
      dispatch(toggleIsFetching(true));
      try {
        const payload = await fetch(ADD_MULTIPLE_SUBSCRIPTIONS, newSubscriptions);

        if (payload.error) {
          throw (payload.error);
        }

        // Calculate next billing dates
        for (let i = 0; i < payload.length; i++) {
          const nextBillingDate = calcNextBillingDate(
              payload[i].firstBillingDate, payload[i].cycle,
          );
          payload[i] = {...payload[i], nextBillingDate};
        }

        dispatch(toggleIsFetching(false));
        dispatch({
          type: ADD_MULTIPLE_SUBSCRIPTIONS,
          payload: payload
        });
        dispatch(showToast('Successfully added subscriptions', 'success'));
      } catch (error) {
        dispatch(toggleIsFetching(false));
        dispatch(setError(error));
      }
    }
  };
}
