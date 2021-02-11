import React from 'react';

import {Button, Paper, TextField, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';

import {addAccount} from '../../redux/actions/accounts';
import {
  getAccountNames,
  isValidCurrencyAmount,
  validateAccount,
} from '../../utils';


const useStyles = makeStyles((theme) => ({
  root: {
    'display': 'flex',
    'flexFlow': 'column nowrap',
    'justifyContent': 'center',
    'alignItems': 'center',
    'width': '100%',
    'height': '100vh',
    'backgroundColor': theme.palette.background.default,
    '& .description': {
      width: '500px',
      marginBottom: '20px',
    },
    '& .form': {
      'display': 'flex',
      'flexFlow': 'column nowrap',
      'alignItems': 'flex-end',
      'width': '460px',
      'padding': '20px',
      '& .formDetails': {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
      },
      '& .button': {
        marginTop: '20px',
      },
    },
  },
}));


interface IProps {
  currency: string;
  next: () => void;
}


const AccountForm = ({currency, next}: IProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const accountNames = Object.values(getAccountNames());

  const [accountState, setAccountState] = React.useState({
    name: 'Name',
    type: 'Type',
    balance: 0,
  });

  const [nameError, setNameError] = React.useState('');

  const setName = (name: string) =>
    setAccountState({...accountState, name: name});

  const setType = (type: string) =>
    setAccountState({...accountState, type: type});

  const setBalance = (balance: string) =>
    setAccountState({...accountState, balance: parseFloat(balance)});

  const changeName = (name: string) => {
    if (name.trim().length === 0) {
      setNameError('*Required');
    } else if (accountNames.includes(name)) {
      setNameError('An account with the same name already exists');
    } else {
      setNameError('');
      setName(name);
    }
  };

  const saveChanges = () => {
    const accountIsValid = validateAccount(accountState);

    if (accountIsValid) {
      dispatch(addAccount(accountState));
      next();
    }
  };

  return (
    <div className={classes.root}>
      <div className="description">
        <Typography variant="h3" color="primary" gutterBottom>
          Create an account
        </Typography>
        <Typography variant="body2" color="textSecondary">
          It is where your transactions and subscriptions are recorded. <br/>
          You can create more later, but you need at least one
          to get started.
        </Typography>
      </div>
      <Paper className="form">
        <TextField
          label="Name"
          margin="normal"
          variant="outlined"
          fullWidth
          defaultValue={accountState.name}
          onBlur={(event) => changeName(event.target.value)}
          error={Boolean(nameError)}
          helperText={nameError}
        />
        <div className="formDetails">
          <TextField
            label="Type"
            margin="normal"
            defaultValue={accountState.type}
            onBlur={(event) => setType(event.target.value)}
            error={accountState.type.trim().length === 0}
            helperText={
              accountState.type.trim().length === 0 ?
              '*Required' : '(e.g. Checking, Savings)'
            }
          />
          <TextField
            label="Balance"
            margin="normal"
            defaultValue={accountState.balance}
            onBlur={(event) => setBalance(event.target.value)}
            error={!isValidCurrencyAmount(accountState.balance.toString())}
            helperText={
              !isValidCurrencyAmount(accountState.balance.toString()) ?
              'Invalid amount' : ''
            }
            InputProps={{endAdornment: currency}}
          />
        </div>
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

AccountForm.propTypes = {
  /** The currency symbol */
  currency: PropTypes.string.isRequired,
  /** Function to continue on to the next slide */
  next: PropTypes.func.isRequired,
};

export {AccountForm};
