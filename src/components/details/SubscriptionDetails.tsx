import React from 'react';

import { IconButton, Paper, Slide, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PropTypes from 'prop-types';

import { getAccountName, printDate } from '../../utils';
import { Subscription } from '../../types';

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
      '& .date': {
        display: 'flex',
        alignItems: 'center',
      },
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
      '& .tags:nth-of-type(2)': {
        paddingTop: '0',
        borderTop: 'none',
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
  subscription: Subscription | null | undefined;
}

const SubscriptionDetails = ({
  close,
  currency,
  dateFormat,
  deleteItem,
  isOpen,
  openFormTab,
  subscription,
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
        {subscription && (
          <div className="details">
            <Typography className="date" variant="body1" color="textSecondary">
              <ScheduleIcon className="icon" />
              {printDate(subscription.nextBillingDate, dateFormat)}
            </Typography>
            <Typography variant="h5">{subscription.name}</Typography>
            <Typography
              variant="h3"
              className={subscription.amount < 0 ? 'neg' : 'pos'}
            >
              {subscription.amount < 0
                ? `- ${currency}
                  ${Math.abs(subscription.amount).toFixed(2)}`
                : `${currency} ${subscription.amount.toFixed(2)}`}
            </Typography>
            <div className="tags">
              <div className="tag">
                <Typography variant="body2" color="textSecondary">
                  First billing date
                </Typography>
                <Typography variant="h6">
                  {printDate(subscription.firstBillingDate, dateFormat)}
                </Typography>
              </div>
              <div className="tag">
                <Typography variant="body2" color="textSecondary">
                  Billing cycle
                </Typography>
                <Typography variant="h6">{subscription.cycle}</Typography>
              </div>
            </div>
            <div className="tags">
              <div className="tag">
                <Typography variant="body2" color="textSecondary">
                  Category
                </Typography>
                <Typography variant="h6">
                  {subscription.category
                    ? subscription.category
                    : 'Uncategorized'}
                </Typography>
              </div>
              <div className="tag">
                <Typography variant="body2" align="right" color="textSecondary">
                  Account
                </Typography>
                <Typography variant="h6" align="right">
                  {getAccountName(subscription.accountId)}
                </Typography>
              </div>
            </div>
          </div>
        )}
      </Paper>
    </Slide>
  );
};

SubscriptionDetails.propTypes = {
  /** Function to close the component */
  close: PropTypes.func.isRequired,
  /** The currency symbol */
  currency: PropTypes.string.isRequired,
  /** A valid date-fns format for displaying the date */
  dateFormat: PropTypes.string.isRequired,
  /** Function called when deleting the Subscription */
  deleteItem: PropTypes.func.isRequired,
  /** If true, the component is open */
  isOpen: PropTypes.bool.isRequired,
  /** Function to open the corresponding Form for editing the Subscription */
  openFormTab: PropTypes.func.isRequired,
  /** The Subscription to be displayed */
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

SubscriptionDetails.defaultProps = {
  subscription: null,
};

export default SubscriptionDetails;
