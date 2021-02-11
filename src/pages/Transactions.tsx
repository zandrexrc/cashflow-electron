import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';

import {ConfirmationDialog} from '../components/alerts/ConfirmationDialog';
import {TransactionDetails} from '../components/details/TransactionDetails';
import {TransactionForm} from '../components/forms/TransactionForm';
import {ImportFileDialog} from '../components/inputs/ImportFileDialog';
import {TransactionList} from '../components/lists/TransactionList';
import {
  TransactionStatistics,
} from '../components/statistics/TransactionStatistics';
import {SampleTransaction} from '../constants';
import {updateAccountBalance} from '../redux/actions/accounts';
import {
  addTransaction,
  editTransaction,
  deleteTransaction,
  addMultipleTransactions,
} from '../redux/actions/transactions';
import {setError} from '../redux/actions/ui';
import {
  createTransactionsGraphData,
  csvToTransactions,
  filterTransactions,
  generateSampleCsv,
  transactionsToCsv,
} from '../utils';
import {ReduxState, Filters, Transaction, NewTransaction} from '../types';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    minWidth: '100%',
    maxWidth: '100%',
  },
});

const initialFilters: Filters = {
  account: 'All',
  category: 'All',
  date: {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  },
};

const Transactions = () => {
  const classes = useStyles();

  // Local state
  const [filters, setFilters] = React.useState(initialFilters);
  const [selectedTransaction, setSelectedTransaction] = React.useState<Transaction | null>(null);
  const [ui, setUi] = React.useState({
    confirmationDialogIsOpen: false,
    detailsTabIsOpen: false,
    formTabIsOpen: false,
    importFileDialogIsOpen: false,
  });

  // Fetch items from Redux store
  const dispatch = useDispatch();
  const currency = useSelector((state: ReduxState) => state.settings.currency);
  const dateFormat = useSelector((state: ReduxState) => state.settings.dateFormat);
  const transactions = useSelector((state: ReduxState) => state.transactions);
  const displayedTransactions = filterTransactions(transactions, filters);
  const chartData = createTransactionsGraphData(displayedTransactions);
  const sampleFile = generateSampleCsv([SampleTransaction, SampleTransaction]);

  // Manage state
  const openDetailsTab = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setUi({...ui, detailsTabIsOpen: true});
  };

  const closeDetailsTab = () => {
    setSelectedTransaction(null);
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
  const addData = async (newData: NewTransaction) => {
    await dispatch(addTransaction(newData));
    if (newData.accountId) {
      dispatch(updateAccountBalance(newData.accountId, newData.amount));
    }
    setFilters(initialFilters);
    toggleFormTab();
  };

  const editData = async (newData: Transaction) => {
    await dispatch(editTransaction(newData));
    if (selectedTransaction && newData.accountId) {
      dispatch(updateAccountBalance(
        newData.accountId, (newData.amount - selectedTransaction.amount)),
      );
    }
    setSelectedTransaction(newData);
    toggleFormTab();
  };

  const deleteData = async () => {
    if (selectedTransaction) {
      await dispatch(deleteTransaction(selectedTransaction.transactionId));
      dispatch(updateAccountBalance(selectedTransaction.accountId, -selectedTransaction.amount));
      setUi({...ui, detailsTabIsOpen: false, confirmationDialogIsOpen: false});
      setSelectedTransaction(null);
    }
  };

  const exportData = () => {
    transactionsToCsv(displayedTransactions);
  };

  const importData = (file: File) => {
    csvToTransactions(file, (error, result) => {
      if (error) {
        dispatch(setError(error));
      } else {
        dispatch(addMultipleTransactions(result));
      }
    });
  };

  return (
    <div className={classes.root}>
      <TransactionStatistics
        chartData={chartData}
        filters={filters}
        setFilters={setFilters}
      />
      <TransactionList
        currency={currency}
        exportData={exportData}
        openDetailsTab={openDetailsTab}
        openFormTab={toggleFormTab}
        openImportFileDialog={toggleImportFileDialog}
        items={displayedTransactions}
      />
      <TransactionDetails
        close={closeDetailsTab}
        currency={currency}
        dateFormat={dateFormat}
        deleteItem={toggleConfirmationDialog}
        isOpen={ui.detailsTabIsOpen}
        openFormTab={toggleFormTab}
        transaction={selectedTransaction}
      />
      <TransactionForm
        close={toggleFormTab}
        currency={currency}
        isOpen={ui.formTabIsOpen}
        submit={selectedTransaction ? editData : addData}
        transaction={selectedTransaction}
      />
      <ConfirmationDialog
        cancel={toggleConfirmationDialog}
        confirm={deleteData}
        isOpen={ui.confirmationDialogIsOpen}
        message="This action cannot be undone."
        title="Delete transaction?"
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

export {Transactions};
