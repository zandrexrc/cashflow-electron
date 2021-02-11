import {GET_SETTINGS, EDIT_SETTINGS} from '../../constants';
import {toggleIsFetching, setError, showToast} from './ui';
import {Settings, ReduxThunk} from '../../types';
import fetch from '../../event_emitters/rendererEmitters';


export function getSettings(): ReduxThunk {
  return async (dispatch, getState) => {
    if (!getState().isFetching) {
      dispatch(toggleIsFetching(true));
      try {
        const payload = await fetch(GET_SETTINGS, null);

        if (payload.error) {
          throw (payload.error);
        }

        dispatch(toggleIsFetching(false));
        dispatch({
          type: GET_SETTINGS,
          payload: payload
        });
      } catch (error) {
        dispatch(toggleIsFetching(false));
        dispatch(setError(error));
      }
    }
  };
}

export function editSettings(newSettings: Settings): ReduxThunk {
  return async (dispatch, getState) => {
    if (!getState().isFetching) {
      dispatch(toggleIsFetching(true));
      try {
        const payload = await fetch(EDIT_SETTINGS, newSettings);

        if (payload.error) {
          throw (payload.error);
        }

        dispatch(toggleIsFetching(false));
        dispatch({
          type: EDIT_SETTINGS,
          payload: payload
        });
        dispatch(showToast('Settings saved', 'success'));
      } catch (error) {
        dispatch(toggleIsFetching(false));
        dispatch(setError(error));
      }
    }
  };
}
