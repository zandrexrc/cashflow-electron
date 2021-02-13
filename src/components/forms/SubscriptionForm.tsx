import React from 'react';

import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slide,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';

import { DATE_FORMAT_ISO } from '../../constants';
import {
  isValidCurrencyAmount,
  printDate,
  validateSubscription,
} from '../../utils';
import AccountSelector from '../inputs/AccountSelector';
import CategorySelector from '../inputs/CategorySelector';
import DateSelector from '../inputs/DateSelector';
import { Subscription, NewSubscription } from '../../types';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'calc(50%)',
    height: '100vh',
    minWidth: '500px',
    maxHeight: '100vh',
    display: 'flex',
    flexFlow: 'column nowrap',
    position: 'absolute',
    right: '0',
    overflow: 'auto',
    '& .header': {
      width: 'calc(100% - 30px)',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      padding: '0 10px 0 20px',
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    '& .details': {
      width: 'calc(100% - 80px)',
      height: 'calc(100% - 64px)',
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'flex-start',
      margin: '0 auto',
      '& .dates': {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
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
  submit(a: Subscription): void;
  submit(a: NewSubscription): void;
  subscription: Subscription | null;
}

const newSubscription: NewSubscription = {
  name: '',
  firstBillingDate: printDate(new Date(), DATE_FORMAT_ISO),
  cycle: 'monthly',
  accountId: null,
  category: '',
  amount: 0,
};

const SubscriptionForm = ({
  close,
  currency,
  isOpen,
  submit,
  subscription,
}: IProps) => {
  const classes = useStyles();

  const [state, setState] = React.useState(newSubscription);

  React.useEffect(() => {
    setState(subscription || newSubscription);
  }, [subscription, setState]);

  const setFirstBillingDate = (date: string) =>
    setState({ ...state, firstBillingDate: date });

  const setName = (name: string) => setState({ ...state, name });

  const setCycle = (cycle: string) => setState({ ...state, cycle });

  const setAmount = (amount: string) =>
    setState({ ...state, amount: parseFloat(amount) });

  const setAccount = (accountId: string) =>
    setState({ ...state, accountId: parseInt(accountId, 10) });

  const setCategory = (category: string) => setState({ ...state, category });

  const cancelChanges = () => {
    setState(subscription || newSubscription);
    close();
  };

  const saveChanges = () => {
    const subscriptionIsValid = validateSubscription(state);

    if (subscriptionIsValid) {
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
          <div className="dates">
            <DateSelector
              selectedDate={state.firstBillingDate}
              setDate={setFirstBillingDate}
            />
            <FormControl>
              <InputLabel id="cycle-select-label">Cycle</InputLabel>
              <Select
                labelId="cycle-select-label"
                id="cycle-select"
                value={state.cycle}
                onChange={(event) => setCycle(event.target.value as string)}
              >
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="yearly">Yearly</MenuItem>
              </Select>
            </FormControl>
          </div>
          <TextField
            label="Name"
            margin="normal"
            variant="outlined"
            fullWidth
            defaultValue={state.name}
            onChange={(event) => setName(event.target.value)}
            error={state.name.trim().length === 0}
            helperText={state.name.trim().length === 0 ? 'Required' : ''}
            onKeyPress={handleKeyPress}
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
              !isValidCurrencyAmount(state.amount.toString())
                ? 'Invalid amount'
                : ''
            }
            InputProps={{ endAdornment: currency }}
            onKeyPress={handleKeyPress}
          />
          <div className="tags">
            <CategorySelector
              type="subscriptions"
              selectedCategory={state.category ? state.category : ''}
              setCategory={setCategory}
              enableSelectAll
              showUncategorized
            />
            <AccountSelector
              enableSelectAll={false}
              selectedAccount={
                state.accountId ? state.accountId.toString() : ''
              }
              setAccount={setAccount}
            />
          </div>
        </div>
      </Paper>
    </Slide>
  );
};

SubscriptionForm.propTypes = {
  /** Function to close the component */
  close: PropTypes.func.isRequired,
  /** The currency symbol */
  currency: PropTypes.string.isRequired,
  /** If true, the component is open */
  isOpen: PropTypes.bool.isRequired,
  /** Function called when submitting the form */
  submit: PropTypes.func.isRequired,
  /** The subscription to be edited (if null, create a new subscription) */
  subscription: PropTypes.shape({
    subscriptionId: PropTypes.number,
    name: PropTypes.string,
    firstBillingDate: PropTypes.string,
    nextBillingDate: PropTypes.instanceOf(Date),
    cycle: PropTypes.string,
    category: PropTypes.string,
    amount: PropTypes.number,
    accountId: PropTypes.number,
  }),
};

SubscriptionForm.defaultProps = {
  subscription: null,
};

export default SubscriptionForm;
