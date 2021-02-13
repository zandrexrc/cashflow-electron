import React from 'react';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

import LineChart from '../components/charts/LineChart';
import { DATE_FORMAT_MONTH_YEAR } from '../constants';
import { setActivePage } from '../redux/actions/ui';
import {
  calcMonthlySubscriptions,
  calcMostUsedAccounts,
  calcNetIncome,
  createActivityGraphData,
  printDate,
} from '../utils';
import { ReduxState } from '../types';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 'calc(100% - 40px)',
    padding: '15px 20px 20px 20px',
    backgroundColor: theme.palette.background.default,
    '& .title': {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const Overview = () => {
  const classes = useStyles();
  const today = new Date();

  // Fetch items from Redux store
  const dispatch = useDispatch();
  const accounts = useSelector((state: ReduxState) => state.accounts);
  const currency = useSelector((state: ReduxState) => state.settings.currency);
  let subscriptions = useSelector((state: ReduxState) => state.subscriptions);
  subscriptions = subscriptions.filter(
    (s) =>
      s.cycle === 'monthly' ||
      parseInt(s.firstBillingDate.substring(5, 7), 10) === today.getMonth() + 1
  );
  let transactions = useSelector((state: ReduxState) => state.transactions);
  transactions = transactions.filter((t) => {
    return (
      parseInt(t.date.substring(5, 7), 10) === today.getMonth() + 1 &&
      parseInt(t.date.substring(0, 4), 10) === today.getFullYear()
    );
  });

  // Card values
  const accountsData = calcMostUsedAccounts(accounts, transactions);
  const subscriptionsData = calcMonthlySubscriptions(subscriptions);
  const transactionsData = calcNetIncome(transactions);
  const activityData = createActivityGraphData(
    transactions,
    today.getMonth(),
    today.getFullYear()
  );

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item alignItems="flex-start" spacing={1} xs={12}>
          <Grid item xs={4}>
            {/* Title */}
            <Card className="title">
              <CardContent>
                <Typography variant="h5">Monthly overview</Typography>
                <Typography variant="h2">
                  {printDate(today, DATE_FORMAT_MONTH_YEAR)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            {/* Accounts */}
            <Card>
              <CardContent>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="subtitle1"
                >
                  Accounts
                </Typography>
                <Divider />
                {accountsData.length === 0 ? (
                  <Typography variant="h5">No records to display.</Typography>
                ) : (
                  accountsData.map((account) => (
                    <div key={account?.accountId}>
                      <Typography color="textPrimary" variant="subtitle1">
                        {account ? account.name : ''}
                      </Typography>
                      <Typography variant="h5">
                        {account
                          ? `${currency} ${account.balance.toFixed(2)}`
                          : ''}
                      </Typography>
                    </div>
                  ))
                )}
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => dispatch(setActivePage(3))}
                >
                  More details
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={4}>
            {/* Subscriptions */}
            <Card>
              <CardContent>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="subtitle1"
                >
                  Subscriptions
                </Typography>
                <Divider />
                <div>
                  <Typography color="textPrimary" variant="subtitle1">
                    Remaining expenses for this month
                  </Typography>
                  <Typography variant="h5">
                    {`${currency}
                      ${subscriptionsData.remainingExpenses.toFixed(2)}`}
                  </Typography>
                </div>
                <div>
                  <Typography color="textPrimary" variant="subtitle1">
                    Total expenses for this month
                  </Typography>
                  <Typography variant="h5">
                    {`${currency}
                      ${subscriptionsData.totalExpenses.toFixed(2)}`}
                  </Typography>
                </div>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => dispatch(setActivePage(2))}
                >
                  More details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        <Grid container item alignItems="flex-start" spacing={1} xs={12}>
          <Grid item xs={4}>
            {/* Transactions */}
            <Card>
              <CardContent>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="subtitle1"
                >
                  Transactions
                </Typography>
                <Divider />
                <div>
                  <Typography color="textPrimary" variant="subtitle1">
                    Income
                  </Typography>
                  <Typography variant="h5">
                    {`${currency} ${transactionsData.totalIncome.toFixed(2)}`}
                  </Typography>
                </div>
                <div>
                  <Typography color="textPrimary" variant="subtitle1">
                    Expenses
                  </Typography>
                  <Typography variant="h5">
                    {`${currency} ${transactionsData.totalExpenses.toFixed(2)}`}
                  </Typography>
                </div>
                <div>
                  <Typography color="textPrimary" variant="subtitle1">
                    Net income
                  </Typography>
                  <Typography variant="h5">
                    {`${currency} ${transactionsData.netIncome.toFixed(2)}`}
                  </Typography>
                </div>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => dispatch(setActivePage(1))}
                >
                  More details
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={8}>
            {/* Activity graph */}
            <Card>
              <CardContent>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="subtitle1"
                >
                  Activity
                </Typography>
                <Divider />
                <LineChart
                  width="auto"
                  height="100"
                  data={activityData}
                  xAxisLabel={`Date (${today.getFullYear()})`}
                  yAxisLabel={`Amount (${currency})`}
                />
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => dispatch(setActivePage(4))}
                >
                  More details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Overview;
