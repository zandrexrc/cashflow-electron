import React from 'react';

import { IconButton, Paper, Slide, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';

import { getAccountName, printDate } from '../../utils';
import { Transaction } from '../../types';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
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
      justifyContent: 'space-between',
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
      '& .pos': {
        color: theme.palette.success.main,
      },
      '& .neg': {
        color: theme.palette.error.main,
      },
      '& .MuiTypography-body1': {
        margin: '20px 0',
        padding: '10px',
        border: `1px solid ${theme.palette.text.secondary}`,
      },
      '& .MuiTypography-h5': {
        minHeight: '1.4em',
        maxHeight: '50%',
        margin: '10px 0',
        overflow: 'auto',
      },
      '& .MuiTypography-h3': {
        fontWeight: 'bold',
      },
      '& .icon': {
        marginRight: '10px',
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
  dateFormat: string;
  deleteItem: () => void;
  isOpen: boolean;
  openFormTab: () => void;
  transaction: Transaction | null | undefined;
}

const TransactionDetails = ({
  close,
  currency,
  dateFormat,
  deleteItem,
  isOpen,
  openFormTab,
  transaction,
}: IProps) => {
  const classes = useStyles();

  return (
    <Slide direction="left" in={isOpen} mountOnEnter unmountOnExit>
      <Paper className={classes.root} square elevation={10}>
        <div className="header">
          <IconButton onClick={close}>
            <ChevronLeftIcon />
          </IconButton>
          <div className="actions">
            <IconButton onClick={openFormTab}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={deleteItem}>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        {transaction && (
          <div className="details">
            <Typography variant="body1" align="right" color="textSecondary">
              {printDate(transaction.date, dateFormat)}
            </Typography>
            <Typography variant="h5">{transaction.description}</Typography>
            <Typography
              variant="h3"
              className={transaction.amount < 0 ? 'neg' : 'pos'}
            >
              {transaction.amount < 0
                ? `- ${currency}
                  ${Math.abs(transaction.amount).toFixed(2)}`
                : `${currency} ${transaction.amount.toFixed(2)}`}
            </Typography>
            <div className="tags">
              <div className="tag">
                <Typography variant="body2" color="textSecondary">
                  Category
                </Typography>
                <Typography variant="h6">
                  {transaction.category
                    ? transaction.category
                    : 'Uncategorized'}
                </Typography>
              </div>
              <div className="tag">
                <Typography variant="body2" align="right" color="textSecondary">
                  Account
                </Typography>
                <Typography variant="h6" align="right">
                  {getAccountName(transaction.accountId)}
                </Typography>
              </div>
            </div>
          </div>
        )}
      </Paper>
    </Slide>
  );
};

TransactionDetails.propTypes = {
  /** Function to close the component */
  close: PropTypes.func.isRequired,
  /** The currency symbol */
  currency: PropTypes.string.isRequired,
  /** A valid date-fns format for displaying the date */
  dateFormat: PropTypes.string.isRequired,
  /** Function called when deleting the Transaction */
  deleteItem: PropTypes.func.isRequired,
  /** If true, the component is open */
  isOpen: PropTypes.bool.isRequired,
  /** Function to open the corresponding Form for editing the Transaction */
  openFormTab: PropTypes.func.isRequired,
  /** The Transasction to be displayed */
  transaction: PropTypes.shape({
    transactionId: PropTypes.number,
    date: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    amount: PropTypes.number,
    accountId: PropTypes.number,
  }),
};

TransactionDetails.defaultProps = {
  transaction: null,
};

export default TransactionDetails;
