import React from 'react';

import {IconButton, Paper, Slide, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';

import {
  getAccountNames,
  isValidCurrencyAmount,
  validateAccount,
} from '../../utils';
import {Account, NewAccount} from '../../types';


const useStyles = makeStyles((theme) => ({
  root: {
    'width': 'calc(50%)',
    'height': '100vh',
    'minWidth': '500px',
    'maxHeight': '100vh',
    'display': 'flex',
    'flexFlow': 'column nowrap',
    'position': 'absolute',
    'right': '0',
    'overflow': 'auto',
    '& .header': {
      width: 'calc(100% - 30px)',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      padding: '0 10px 0 20px',
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    '& .details': {
      'width': 'calc(100% - 80px)',
      'height': 'calc(100% - 64px)',
      'display': 'flex',
      'flexFlow': 'column nowrap',
      'alignItems': 'flex-start',
      'margin': '0 auto',
      '& .datepicker': {
        margin: '20px 0',
      },
      '& .tags': {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
        paddingTop: '20px',
        borderTop: `1px solid ${theme.palette.text.secondary}`,
      },
    },
  },
}));


interface IProps {
  account: Account | null;
  close: () => void;
  currency: string;
  isOpen: boolean;
  submit(a: Account): void;
  submit(a: NewAccount): void;
};

const newAccount: NewAccount = {
  name: '',
  type: '',
  balance: 0,
};


const AccountForm = ({
  account,
  close,
  currency,
  isOpen,
  submit,
}: IProps) => {
  const classes = useStyles();
  const accountNames = Object.values(getAccountNames());

  const [state, setState] = React.useState(newAccount);

  const [nameError, setNameError] = React.useState('Required');

  React.useEffect(() => {
    setState(account ? account : newAccount);
    setNameError(account ? '' : 'Required' );
  }, [account, setState]);

  const setName = (name: string) =>
    setState({...state, name: name});

  const setType = (type: string) =>
    setState({...state, type: type});

  const setBalance = (balance: string) =>
    setState({...state, balance: parseFloat(balance)});

  const changeName = (name: string) => {
    if (name.trim().length === 0) {
      setNameError('Required');
    } else if (account === null && accountNames.includes(name)) {
      setNameError('An account with the same name already exists');
    } else {
      setNameError('');
      setName(name);
    }
  };

  const cancelChanges = () => {
    setState(account ? account : newAccount);
    setNameError('');
    close();
  };

  const saveChanges = () => {
    const accountIsValid = validateAccount(state);

    if (accountIsValid && !nameError) {
      submit(state);
    }
  };

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      saveChanges();
    }
  };

  return (
    <Slide direction="left" in={isOpen} mountOnEnter unmountOnExit>
      <Paper className={classes.root} square elevation={10}>
        <div className="header">
          <IconButton onClick={cancelChanges}>
            <CloseIcon />
          </IconButton>
          <IconButton onClick={saveChanges}>
            <CheckIcon />
          </IconButton>
        </div>
        <div className="details">
          <TextField
            label="Type"
            margin="normal"
            defaultValue={state.type}
            onChange={(event) => setType(event.target.value)}
            error={state.type.trim().length === 0}
            helperText={
              state.type.trim().length === 0 ?
              'Required' : ''
            }
            onKeyPress={handleKeyPress}
          />
          <TextField
            label="Name"
            margin="normal"
            fullWidth
            defaultValue={state.name}
            onChange={(event) => changeName(event.target.value)}
            error={Boolean(nameError)}
            helperText={nameError}
            onKeyPress={handleKeyPress}
          />
          <TextField
            label="Balance"
            margin="normal"
            variant="filled"
            fullWidth
            defaultValue={state.balance}
            onChange={(event) => setBalance(event.target.value)}
            error={!isValidCurrencyAmount(state.balance.toString())}
            helperText={
              !isValidCurrencyAmount(state.balance.toString()) ?
              'Invalid amount' : ''
            }
            InputProps={{endAdornment: currency}}
            onKeyPress={handleKeyPress}
          />
        </div>
      </Paper>
    </Slide>
  );
};

AccountForm.propTypes = {
  /** The account to be edited (if null, create a new account) */
  account: PropTypes.object,
  /** Function to close the component */
  close: PropTypes.func.isRequired,
  /** The currency symbol */
  currency: PropTypes.string.isRequired,
  /** If true, the component is open */
  isOpen: PropTypes.bool.isRequired,
  /** Function called when submitting the form */
  submit: PropTypes.func.isRequired,
};

export {AccountForm};
