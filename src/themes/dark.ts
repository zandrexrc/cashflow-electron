import { createMuiTheme } from '@material-ui/core/styles';

const darkTheme = createMuiTheme();
darkTheme.palette = {
  ...darkTheme.palette,
  type: 'dark',
  primary: {
    light: '#60ad5e',
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
    primary: '#fff',
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
    hint: 'rgba(255, 255, 255, 0.5)',
  },
  divider: 'rgba(255, 255, 255, 0.12)',
  background: {
    paper: '#313131',
    default: '#212121',
  },
  action: {
    active: '#fff',
    hover: 'rgba(255, 255, 255, 0.08)',
    hoverOpacity: 0.08,
    selected: 'rgba(255, 255, 255, 0.16)',
    selectedOpacity: 0.16,
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
    disabledOpacity: 0.38,
    focus: 'rgba(255, 255, 255, 0.12)',
    focusOpacity: 0.12,
    activatedOpacity: 0.24,
  },
};

export default darkTheme;
