import React from 'react';

import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import {BarChart} from '../charts/BarChart';


const useStyles = makeStyles((theme) => ({
  root: {
    'width': 'calc(50% - 1px)',
    'height': '100vh',
    'minWidth': '500px',
    'display': 'flex',
    'flexFlow': 'column nowrap',
    'justifyContent': 'center',
    'alignItems': 'center',
    'borderRight': `1px solid ${theme.palette.divider}`,
    'position': 'relative',
    '& .header': {
      width: 'calc(100% - 20px)',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '20px',
      borderBottom: `1px solid ${theme.palette.divider}`,
      position: 'absolute',
      top: 0,
    },
    '& .contents': {
      'width': '100%',
      'height': 'calc(100% - 64px)',
      'display': 'flex',
      'flexFlow': 'column nowrap',
      'justifyContent': 'center',
      'alignItems': 'center',
      '& .stats': {
        textTransform: 'uppercase',
        color: theme.palette.text.primary,
      },
    },
  },
}));


const calcTotalBalance = (balances: any[]) => {
  let sum = 0;
  for (let i = 0; i < balances.length; i++) {
    sum += parseFloat(balances[i]);
  }
  return sum.toFixed(2);
};


interface IProps {
  chartData: any;
};

const AccountStatistics = ({chartData}: IProps) => {
  const classes = useStyles();
  const balances = chartData.datasets[0].data;

  return (
    <div className={classes.root}>
      <div className="header">
        <Typography variant="h6" color="textPrimary">
          Accounts
        </Typography>
      </div>
      <div className="contents">
        <BarChart
          width='auto'
          height='auto'
          data={chartData}
        />
        <div className="stats">
          <Typography
            variant="overline"
            color="textSecondary"
            align="center"
          >
            {'Total balance'}
          </Typography>
          <Typography
            variant="body1"
            align="center"
          >
            {calcTotalBalance(balances)}
          </Typography>
        </div>
      </div>
    </div>
  );
};

AccountStatistics.propTypes = {
  /** The data to be displayed in the chart
   * (refer to utils/graphUtils.js) */
  chartData: PropTypes.object.isRequired,
};

export {AccountStatistics};
