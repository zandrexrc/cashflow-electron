import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';

import {ConfirmationDialog} from '../components/alerts/ConfirmationDialog';
import {AccountDetails} from '../components/details/AccountDetails';
import {AccountForm} from '../components/forms/AccountForm';
import {ImportFileDialog} from '../components/inputs/ImportFileDialog';
import {AccountList} from '../components/lists/AccountList';
import {AccountStatistics} from '../components/statistics/AccountStatistics';
import {SampleAccount} from '../constants';
import {
  addAccount,
  editAccount,
  deleteAccount,
  addMultipleAccounts,
} from '../redux/actions/accounts';
import {setError} from '../redux/actions/ui';
import {
  accountsToCsv,
  createAccountsGraphData,
  csvToAccounts,
  generateSampleCsv,
} from '../utils';
import {ReduxState, Account, NewAccount} from '../types';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    minWidth: '100%',
    maxWidth: '100%',
  },
});

const Accounts = () => {
  const classes = useStyles();

  // Local state
  const [selectedAccount, setSelectedAccount] = React.useState<Account | null>(null);
  const [ui, setUi] = React.useState({
    confirmationDialogIsOpen: false,
    detailsTabIsOpen: false,
    formTabIsOpen: false,
    importFileDialogIsOpen: false,
  });

  // Fetch items from Redux store
  const dispatch = useDispatch();
  const accounts = useSelector((state: ReduxState) => state.accounts);
  accounts.sort((a, b) => b.balance - a.balance);
  const currency = useSelector((state: ReduxState) => state.settings.currency);
  const chartData = createAccountsGraphData(accounts);
  const sampleFile = generateSampleCsv([SampleAccount, SampleAccount]);

  // Manage state
  const openDetailsTab = (account: Account) => {
    setSelectedAccount(account);
    setUi({...ui, detailsTabIsOpen: true});
  };

  const closeDetailsTab = () => {
    setSelectedAccount(null);
    setUi({...ui, detailsTabIsOpen: false});
  };

  const toggleFormTab = () => {
    setUi({...ui, formTabIsOpen: !ui.formTabIsOpen});
  };

  const toggleConfirmationDialog = () => {
    setUi({...ui, confirmationDialogIsOpen: !ui.confirmationDialogIsOpen});
  };

  const toggleImportFileDialog = () => {
    setUi({...ui, importFileDialogIsOpen: !ui.importFileDialogIsOpen});
  };

  // Manage data
  const addData = (newData: NewAccount) => {
    dispatch(addAccount(newData));
    toggleFormTab();
  };

  const editData = (newData: Account) => {
    dispatch(editAccount(newData));
    setSelectedAccount(newData);
    toggleFormTab();
  };

  const deleteData = () => {
    if (selectedAccount) {
      dispatch(deleteAccount(selectedAccount.accountId));
    }
    setUi({...ui, detailsTabIsOpen: false, confirmationDialogIsOpen: false});
    setSelectedAccount(null);
  };

  const exportData = () => {
    accountsToCsv(accounts);
  };

  const importData = (file: File) => {
    csvToAccounts(file, (error, result) => {
      if (error) {
        dispatch(setError(error));
      } else {
        dispatch(addMultipleAccounts(result));
      }
    });
  };

  return (
    <div className={classes.root}>
      <AccountStatistics chartData={chartData} />
      <AccountList
        items={accounts}
        currency={currency}
        exportData={exportData}
        openDetailsTab={openDetailsTab}
        openFormTab={toggleFormTab}
        openImportFileDialog={toggleImportFileDialog}
      />
      <AccountDetails
        account={selectedAccount}
        close={closeDetailsTab}
        currency={currency}
        deleteItem={toggleConfirmationDialog}
        isOpen={ui.detailsTabIsOpen}
        openFormTab={toggleFormTab}
      />
      <AccountForm
        close={toggleFormTab}
        currency={currency}
        isOpen={ui.formTabIsOpen}
        submit={selectedAccount ? editData : addData}
        account={selectedAccount}
      />
      <ConfirmationDialog
        cancel={toggleConfirmationDialog}
        confirm={deleteData}
        isOpen={ui.confirmationDialogIsOpen}
        message={
          `This will also delete all transactions and subscriptions that are
          associated with the account.`
        }
        title="Delete account?"
      />
      <ImportFileDialog
        cancel={toggleImportFileDialog}
        importData={importData}
        isOpen={ui.importFileDialogIsOpen}
        sampleFile={sampleFile}
      />
    </div>
  );
};

export {Accounts};
