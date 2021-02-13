import { Theme } from '@material-ui/core/styles/createMuiTheme';
import darkTheme from './dark';
import lightTheme from './light';

function getTheme(type: string): Theme {
  return type === 'light' ? lightTheme : darkTheme;
}

export default getTheme;
