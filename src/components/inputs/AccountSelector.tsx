import React from 'react';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

import {ReduxState} from '../../types';


interface IProps {
  selectedAccount: null | string;
  setAccount: (id: string) => void;
  enableSelectAll: undefined | null | boolean;
};


const AccountSelector = ({
  selectedAccount,
  setAccount,
  enableSelectAll
}: IProps) => {
  const accounts = useSelector((state: ReduxState) => state.accounts);

  let error;
  if (accounts.length === 0) {
    error = 'No account found. Please create an account first.';
  } else if (!selectedAccount) {
    error = 'Required.';
  } else {
    error = '';
  }

  return (
    <FormControl
      error={error.length > 0 && !enableSelectAll}
      style={{minWidth: '40%'}}
    >
      <InputLabel id="account-filter-label">Account</InputLabel>
      <Select
        labelId="account-filter-label"
        id="account-filter"
        value={selectedAccount}
        onChange={(event) => setAccount('' + event.target.value)}
      >
        {
          enableSelectAll &&
          <MenuItem value={'All'}>All</MenuItem>
        }
        {accounts.map((obj, index) => (
          <MenuItem key={index} value={obj.accountId.toString()}>
            {obj.name}
          </MenuItem>
        ))}
      </Select>
      {
        error && !enableSelectAll &&
        <FormHelperText>{error}</FormHelperText>
      }
    </FormControl>
  );
};

AccountSelector.propTypes = {
  /** ID of the selected account (as string) */
  selectedAccount: PropTypes.string,
  /** Function to change the selected account */
  setAccount: PropTypes.func.isRequired,
  /** If true, the option to select all accounts is enabled */
  enableSelectAll: PropTypes.bool,
};

export {AccountSelector};
