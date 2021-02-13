import React from 'react';

import { Button, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    backgroundColor: theme.palette.background.default,
    '& .description': {
      width: '500px',
      marginBottom: '20px',
    },
    '& .form': {
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'flex-end',
      width: '460px',
      padding: '20px',
      '& .button': {
        marginTop: '20px',
      },
    },
  },
}));

interface IProps {
  currency: string;
  setCurrency: (c: string) => void;
  next: () => void;
}

const SettingsForm = ({ currency, setCurrency, next }: IProps) => {
  const classes = useStyles();

  const [currencyState, setCurrencyState] = React.useState(currency);

  const currencyIsValid = (c: string) => {
    return c.length > 0 && c.length <= 3;
  };

  const saveChanges = () => {
    if (currencyIsValid(currencyState)) {
      setCurrency(currencyState);
      next();
    }
  };

  return (
    <div className={classes.root}>
      <div className="description">
        <Typography variant="h6" color="primary" gutterBottom>
          Before we start, let's talk about
        </Typography>
        <Typography variant="h3" color="primary" gutterBottom>
          Currency.
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Which currency do you use? It can be either a symbol ($) or a code
          (USD). <br />
          You can also change this later in the Settings page.
        </Typography>
      </div>
      <Paper className="form">
        <TextField
          label="Currency"
          margin="normal"
          fullWidth
          defaultValue={currencyState}
          onBlur={(event) => setCurrencyState(event.target.value)}
          error={!currencyIsValid(currencyState)}
          helperText="Max 3 characters"
        />
        <Button
          className="button"
          variant="contained"
          color="primary"
          disableElevation
          onClick={saveChanges}
        >
          Submit
        </Button>
      </Paper>
    </div>
  );
};

SettingsForm.propTypes = {
  /** A currency symbol */
  currency: PropTypes.string.isRequired,
  /** Function to change the currency symbol */
  setCurrency: PropTypes.func.isRequired,
  /** Function to continue on to the next slide */
  next: PropTypes.func.isRequired,
};

export default SettingsForm;
