import { GET_SETTINGS, EDIT_SETTINGS, InitialSettings } from '../../constants';
import { Settings, ReduxAction } from '../../types';

const settings = (state: Settings = InitialSettings, action: ReduxAction) => {
  switch (action.type) {
    case GET_SETTINGS:
      return action.payload;
    case EDIT_SETTINGS:
      return action.payload;
    default:
      return state;
  }
};

export default settings;
