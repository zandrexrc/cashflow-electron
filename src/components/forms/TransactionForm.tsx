import React from 'react';

import {IconButton, Paper, Slide, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';

import {DATE_FORMAT_ISO} from '../../constants';
import {
  validateTransaction,
  isValidCurrencyAmount,
  printDate,
} from '../../utils';
import {AccountSelector} from '../inputs/AccountSelector';
import {CategorySelector} from '../inputs/CategorySelector';
import {DateSelector} from '../inputs/DateSelector';
import {Transaction, NewTransaction} from '../../types';


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
  close: () => void;
  currency: string;
  isOpen: boolean;
  submit(a: Transaction): void;
  submit(a: NewTransaction): void;
  transaction: Transaction | null;
};

const newTransaction: NewTransaction = {
  date: printDate(new Date(), DATE_FORMAT_ISO),
  description: '',
  accountId: null,
  category: '',
  amount: 0,
};


const TransactionForm = ({
  close,
  currency,
  isOpen,
  submit,
  transaction,
}: IProps) => {
  const classes = useStyles();

  const [state, setState] = React.useState(newTransaction);

  React.useEffect(() => {
    setState(transaction ? transaction : newTransaction);
  }, [transaction, setState]);

  const setDate = (date: string) =>
    setState({...state, date: date});

  const setDescription = (description: string) =>
    setState({...state, description: description});

  const setAmount = (amount: string) =>
    setState({...state, amount: parseFloat(amount)});

  const setAccount = (accountId: string) =>
    setState({...state, accountId: parseInt(accountId)});

  const setCategory = (category: string) =>
    setState({...state, category: category});

  const cancelChanges = () => {
    setState(transaction ?  transaction : newTransaction);
    close();
  };

  const saveChanges = () => {
    const transactionIsValid = validateTransaction(state);

    if (transactionIsValid) {
      submit(state);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
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
          <DateSelector
            selectedDate={state.date}
            setDate={setDate}
          />
          <TextField
            label="Description"
            margin="normal"
            variant="outlined"
            multiline
            rows={2}
            fullWidth
            defaultValue={state.description}
            onBlur={(event) => setDescription(event.target.value)}
            error={state.description.trim().length === 0}
            helperText={
              state.description.trim().length === 0 ?
              'Required' : ''
            }
          />
          <TextField
            label="Amount"
            margin="normal"
            variant="filled"
            fullWidth
            defaultValue={state.amount}
            onChange={(event) => setAmount(event.target.value)}
            error={!isValidCurrencyAmount(state.amount.toString())}
            helperText={
              !isValidCurrencyAmount(state.amount.toString()) ?
              'Invalid amount' : ''
            }
            InputProps={{endAdornment: currency}}
            onKeyPress={handleKeyPress}
          />
          <div className="tags">
            <CategorySelector
              type="transactions"
              selectedCategory={state.category ? state.category : ''}
              setCategory={setCategory}
              enableSelectAll
              showUncategorized
            />
            <AccountSelector
              enableSelectAll={false}
              selectedAccount={
                state.accountId ?
                state.accountId.toString() :
                ''
              }
              setAccount={setAccount}
            />
          </div>
        </div>
      </Paper>
    </Slide>
  );
};

TransactionForm.propTypes = {
  /** Function to close the component */
  close: PropTypes.func.isRequired,
  /** The currency symbol */
  currency: PropTypes.string.isRequired,
  /** If true, the component is open */
  isOpen: PropTypes.bool.isRequired,
  /** Function called when submitting the form */
  submit: PropTypes.func.isRequired,
  /** The transaction to be edited (if null, create a new transaction) */
  transaction: PropTypes.object,
};

export {TransactionForm};
