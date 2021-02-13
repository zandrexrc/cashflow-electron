import React from 'react';

import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

import { DateFormats } from '../constants';
import { editSettings } from '../redux/actions/settings';
import { showToast } from '../redux/actions/ui';
import { ReduxState } from '../types';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.default,
    '& .MuiToolbar-root': {
      maxWidth: '100%',
      borderBottom: `solid 1px ${theme.palette.divider}`,
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.default,
    },
    '& .MuiGrid-container': {
      maxWidth: 'calc(100% - 40px)',
      margin: '20px',
    },
    '& .MuiFormControl-root': {
      minWidth: '100%',
    },
  },
}));

const Settings = () => {
  // Fetch items from Redux store
  const dispatch = useDispatch();
  const settings = useSelector((state: ReduxState) => state.settings);

  // Local component state
  const [state, setState] = React.useState({ ...settings });

  // Manage local state
  const setCurrency = (c: string) => setState({ ...state, currency: c });

  const setDateFormat = (df: string) => setState({ ...state, dateFormat: df });

  const setAppTheme = (t: string) => setState({ ...state, appTheme: t });

  const validateCurrency = (c: string) => {
    return c.length > 0 && c.length <= 3;
  };

  const saveSettings = () => {
    if (validateCurrency(state.currency)) {
      dispatch(editSettings(state));
    } else {
      dispatch(showToast('Currency code must be 1-3 characters', 'error'));
    }
  };

  // Apply styles
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Toolbar>
        <Typography variant="h6">Settings</Typography>
      </Toolbar>
      <Grid container direction="column" item spacing={1} xs={12}>
        <Grid item xs={12}>
          {/* Currency */}
          <Card>
            <CardContent>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="subtitle1"
              >
                Currency
              </Typography>
              <FormControl>
                <TextField
                  error={!validateCurrency(state.currency)}
                  helperText="Currency symbol or code (max 3 characters)"
                  onBlur={(event) => setCurrency(event.target.value)}
                  defaultValue={state.currency}
                />
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          {/* Date format */}
          <Card>
            <CardContent>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="subtitle1"
              >
                Date format
              </Typography>
              <FormControl component="fieldset">
                <Select
                  onChange={(event) =>
                    setDateFormat(event.target.value as string)
                  }
                  value={state.dateFormat}
                >
                  {DateFormats.map((format) => (
                    <MenuItem key={format} value={format}>
                      {format.toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          {/* Theme */}
          <Card>
            <CardContent>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="subtitle1"
              >
                Theme
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  name="theme"
                  onChange={(event) => setAppTheme(event.target.value)}
                  value={state.appTheme}
                >
                  <FormControlLabel
                    control={<Radio />}
                    label="Dark"
                    value="dark"
                  />
                  <FormControlLabel
                    control={<Radio />}
                    label="Light"
                    value="light"
                  />
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          {/* Save button */}
          <Button
            color="primary"
            onClick={saveSettings}
            size="small"
            variant="contained"
          >
            Apply changes
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
