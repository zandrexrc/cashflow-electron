import { createMuiTheme } from '@material-ui/core/styles';

const lightTheme = createMuiTheme();
lightTheme.palette = {
  ...lightTheme.palette,
  type: 'light',
  primary: {
    light: '#80e27e',
    main: '#43a047',
    dark: '#00701a',
    contrastText: '#fff',
  },
  secondary: {
    light: '#fff350',
    main: '#ffc107',
    dark: '#c79100',
    contrastText: '#fff',
  },
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.54)',
    disabled: 'rgba(0, 0, 0, 0.38)',
    hint: 'rgba(0, 0, 0, 0.38)',
  },
  divider: 'rgba(0, 0, 0, 0.12)',
  background: {
    paper: '#fff',
    default: '#fafafa',
  },
  action: {
    active: 'rgba(0, 0, 0, 0.54)',
    hover: 'rgba(0, 0, 0, 0.04)',
    hoverOpacity: 0.04,
    selected: 'rgba(0, 0, 0, 0.08)',
    selectedOpacity: 0.08,
    disabled: 'rgba(0, 0, 0, 0.26)',
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
    disabledOpacity: 0.38,
    focus: 'rgba(0, 0, 0, 0.12)',
    focusOpacity: 0.12,
    activatedOpacity: 0.12,
  },
};

export default lightTheme;
